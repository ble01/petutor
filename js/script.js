/**
 * Create the module. Set it up to use html5 mode.
 */
window.MachineLearningRecommender = angular.module('machineLearningRecommender', ['elasticsearch', 'angular.filter', 'ui.bootstrap', 'ngTagCloud']);

MachineLearningRecommender.run(function ($rootScope) {
	var d = new Date().getTime();
	$rootScope.user_id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		var r = (d + Math.random() * 16) % 16 | 0;
		d = Math.floor(d / 16);
		return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
	});
});

MachineLearningRecommender.directive('starRating', function () {
	return {
		restrict: 'A',
		template: '<ul class="rating">' +
			'<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
			'\u2605' +
			'</li>' +
			'</ul>',
		scope: {
			ratingValue: '=',
			max: '=',
			onRatingSelected: '&'
		},
		link: function (scope, elem, attrs) {

			var updateStars = function () {
				scope.stars = [];
				for (var i = 0; i < scope.max; i++) {
					scope.stars.push({
						filled: i < scope.ratingValue
					});
				}
			};

			scope.toggle = function (index) {
				scope.ratingValue = index + 1;
				scope.onRatingSelected({
					rating: index + 1
				});
			};

			scope.$watch('ratingValue', function (oldVal, newVal) {
				if (newVal) {
					updateStars();
				}
			});
		}
	}
});

/**
 * Create a service to power calls to Elasticsearch. We only need to use the _search endpoint.
 */
MachineLearningRecommender.factory('videoService', ['$q', 'esFactory', '$location', function ($q, elasticsearch, $location) {
	var client = elasticsearch({
		host: $location.host() + ":9201"
	});


	/**
	 * Given a term, search on the pseudoDocuments of concepts and return all 150 concepts.
	 * Given a term, load a set of 3 concepts.       
	 * Returns a promise.
	 */
	var searchConcept = function (term) {
		var deferred = $q.defer();
		var queryConcept = {
			"multi_match": {
				"query": term,
				"fields": ["conceptLabel", "conceptDescription"]
			}
		};

		client.search({
			"index": 'data',
			"type": 'concept',
			"body": {
				"size": 3, //This is also the number of concepts that would be used for refining the query
				"from": 0,
				"query": queryConcept
			}
		}).then(function (result) {
			var aggDocs = [];
			var ii = 0,
				hits_in, hits_out = [];
			hits_in = (result.hits || {}).hits || [];
			for (; ii < hits_in.length; ii++) {
				hits_out.push(hits_in[ii]._source);
				aggDocs.push({
					"conceptLabel": hits_in[ii]._source.conceptLabel,
					"simScore": hits_in[ii]._score
				}); //add new data to aggsDoc array
			}
			deferred.resolve(aggDocs);
			//	deferred.resolve(hits_out);
		}, deferred.reject).catch(function (e) {
			console.log(e);
		});

		return deferred.promise;
	};

	/**
	 * Given a term, search on all the Documents and return all 504 docs.
	 * Returns a promise.
	 */
	var searchDocument = function () {
		var deferred = $q.defer();
		var queryDocument = {
			"match_all": {}
		};

		client.search({
			"index": 'data',
			"type": 'chapter',
			"body": {
				"size": 504, //This is the total number of documents
				"from": 0,
				"query": queryDocument
			}
		}).then(function (result) {
			var ii = 0,
				hits_in, hits_out = [];
			hits_in = (result.hits || {}).hits || [];
			for (; ii < hits_in.length; ii++) {
				hits_out.push(hits_in[ii]._source);
			}
			deferred.resolve(hits_out);
		}, deferred.reject);

		return deferred.promise;
	};

	/**
	 * Given a term and an offset, load another round of 10 documents.       
	 * Returns a promise.
	 */
	var search = function (term, offset) {
		var deferred = $q.defer();

		var query = {
			"multi_match": {
				"query": term,
				"type": "cross_fields",
				"fields": ["title", "description"]
			}
		};

		client.search({
			"index": 'data',
			"type": 'chapter',
			"body": {
				"size": 10,
				"from": (offset || 0) * 10,
				"query": query
			}
		}).then(function (result) {
			var ii = 0,
				hits_in, hits_out = [];
			hits_in = (result.hits || {}).hits || [];

			for (; ii < hits_in.length; ii++) {
				hits_out.push(hits_in[ii]._source);
				//				console.log((ii + 1) + " -> " + hits_in[ii]._source.title + " --> " + hits_in[ii]._score);
				//				console.log((ii + 1) + " -> " + " 1 -> " + hits_in[ii]._source.title + " -> " + hits_in[ii]._source.docID + " -> " + (ii + 1)); //$scope is not yet available here
			}
			deferred.resolve(hits_out);
		}, deferred.reject);

		return deferred.promise;
	};

	return {
		"search": search,
		"searchConcept": searchConcept,
		"searchDocument": searchDocument
	};

}]);

/**
 * Create a controller to interact with the UI.
 */
MachineLearningRecommender.controller('videoCtrl', ['videoService', '$scope', '$location', '$sce', '$http', '$uibModal', '$log', function (data, $scope, $location, $sce, $http, $uibModal, $log) {


	$scope.queries = [];
	$scope.resultsPerPage = [];
	$scope.dropOptions = $scope.queries; //$scope.queries is assigned to the items from the drop down option
	$scope.result_id = 1;
	$scope.method_id = 2; //1 for ConceptBased method; and 2 for BOW
	$scope.query_id;
	$scope.docID = "";
	$scope.selectedDocs = [];
	$scope.selectedDocIndices = [];
	$scope.selectedDocIndicesShuffled = [];

	var expandedQuery = " ";

	var idx = 0;

	// Initialize the scope defaults.
	$scope.data = []; // An array of results to display
	$scope.concepts = []; //An array of concepts
	$scope.allConcepts = []; //An array to hold ALL the concepts, don't know if this is a repetition of $scope.concepts
	$scope.page = 0; // A counter to keep track of our current page
	$scope.allResults = false; // Whether or not all results have been found.
	$scope.allDocuments = []; //To hold all the documents in our collection
	$scope.userCounter = 17; //To generate an ID for users	
	$scope.user_id;
	$scope.user = {};
	$scope.question = {
		consent: ['yes'],
		qualification: ['No Degree', 'BSc', 'MSc', 'PhD'],
		role: ['BSc Student', 'MSc Student', 'PhD Student', 'Researcher', 'Academic Staff'],
		experience: ['Less than one year', 'One to two years', 'Three To five years', 'Over five years', 'Over ten years'],
		expertise: ['Beginner', 'Competent', 'Expert']
			//selectedOption: ['Select your role'] //This sets the default value of the select in the ui
	};

	//User variables from Survey Form
	//	$scope.consent = 'yes';
	//	$scope.role = "";
	//	$scope.qualification = "";

	//function to retrieve Queries from the sql database
	$scope.retrieveQueries = function () {
		console.log("$scope.user_id in retrieve: " + $scope.user_id);
		$http.get("php/retrieveQueries.php")
			.then(function (response) {
				$scope.queries = response.data.theQueries;

				// And, a random search term to start if none was present on page load.
				idx = Math.floor(Math.random() * $scope.queries.length);
				$scope.searchTerm = $location.search().q || $scope.queries[idx]['query_desc'];
				$scope.query_id = $scope.queries[idx]['query_id'];
				//				console.log("$scope.searchTerm :" + $scope.searchTerm + ", id = " + $scope.query_id);

				//$scope.conceptTerm = $location.search().q || concepts[idx];

				$scope.randomQuery = $scope.queries[idx]['query_desc']; //Show a random query on start
				// initial search at startup
				//$scope.loadMore($scope.searchTerm, $scope.page);
				//				console.log("First load more");
				$scope.searchConcept();
				//				console.log(response);
			});
	};
	//	console.log("$scope.retrieveQueries is called");
	$scope.retrieveQueries(); //retrieve $scope.queries from the DB table

	//	function to retrieve SearchResults from the sql database; takes in the query_id
	$scope.retrieveSearchResult = function (query_id) {
		console.log("$scope.query_id in retrieveSearchResult: " + $scope.query_id);
		$scope.selectedDocIndices = [];
		$scope.selectedDocIndicesShuffled = [];
		var req = {
			method: 'POST',
			url: 'php/retrieveSearchResult.php',
			data: {
				'query_id': $scope.query_id, //the id of the current query
			}
		};

		$http(req).then(function (response) {
			$scope.selectedDocs = response.data.theDocs;
			//			$scope.docID = $scope.selectedDocs[0]['docID'];
			//Next thing is to retrieve URLs of chapters based on selected docIDs

			var ii = 0;
			for (; ii < $scope.selectedDocs.length; ii++) {
				$scope.selectedDocIndices.push($scope.selectedDocs[ii]["docID"]);
				//				console.log("Top : " + $scope.selectedDocIndices[ii]);
			}

			//We Shuffle the selectedDoc indices using _.shuffle from Underscore.js which is a version of the Fisher-Yates shuffle, and we get back a randomized list to show to the user
			$scope.selectedDocIndicesShuffled = _.shuffle($scope.selectedDocIndices);

			//*** I use this one. Another method to select the documents to display from an intersection of allDocuments and selectedDocs based on same docID

			var k = 0;
			for (; k < $scope.selectedDocIndicesShuffled.length; k++) {
				//				console.log("shuffled: " + $scope.selectedDocIndicesShuffled[k]);
			}
		}, function (error) {
			alert("Sorry! Data Couldn't be retrieved!");
			console.error(error);

		});
	};
	//	$scope.retrieveSearchResult(); //retrieve retrieveSearchResult from the DB table

	//declare a chapter variable to hold a chapter url and title, useful for our modal
	$scope.chapter = {
		url: "{{chapter.url}}",
		title: "{{chapter.title}}",
		docID: "{{chapter.docID}}"
	};

	//This function is used in Line 802. it's a function to log the selected chapter or video(if Youtube videos)
	$scope.selectedResource = function (chapter) {
		//		$log.info(chapter); // see clicked resource 
		//$scope.insertdata(chapter.title); //call insert function to insert the selected resource in the DB
	};

	/////////////////////////////////////////////

	/*Beginning of hide and show sections for user interface*/
	$scope.briefingNotes = true;
	$scope.questionnaire = true;
	$scope.queryScreen = true; //hide the query screen
	$scope.buttonChoice = true;
	$scope.listOfDocuments = true;
	$scope.completionScreen = false; //hide the completion thank you screen

	//Function to continue to Questionnaire
	$scope.continueToQuestionnaire = function () {
		$scope.briefingNotes = !$scope.briefingNotes; //hide the briefing notes when the "Continue" button is clicked
		$scope.questionnaire = !$scope.questionnaire; //show the questionnaire when the "Continue" button is clicked
	}

	// Function to continue to the evaluation page and write questionnaire results to DB
	$scope.continueToEval = function () {
		console.log("About to write Survey to DB!");
		console.log($scope.user_id + "," + $scope.user.consent + "," + $scope.user.role + "," + $scope.user.qualification + "," + $scope.user.experience + "," + $scope.user.experience + "," + $scope.user.expertise);
		$scope.queryScreen = !$scope.queryScreen; // show the header when the "Continue to Evaluation" button is clicked
		$scope.questionnaire = !$scope.questionnaire; //hide the questionnaire

		var req = {
			method: 'POST',
			url: 'php/insertSurvey.php',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $.param({
				'user_id': $scope.user_id, //the id of the current user 
				'consent': $scope.user.consent,
				'role': $scope.user.role,
				'qualification': $scope.user.qualification,
				'experience': $scope.user.experience,
				'expertise': $scope.user.expertise
			})
		}

		$http(req).then(function (response) {
			//			console.log("Survey data Inserted Successfully");
		}, function (error) {
			alert("Sorry! survey data Couldn't be inserted!");
			console.error(error);
		});
	}

	$scope.skipQuery = function () {
		rand = Math.floor(Math.random() * $scope.queries.length); //I changed this from idx... Hmm...
		$scope.randomQuery = $scope.queries[rand]['query_desc']; //Show a random query on start
		$scope.searchTerm = $scope.randomQuery;
		$scope.query_id = $scope.queries[rand]['query_id'];
		console.log("Query in skipQuery is: " + $scope.query_id + ": " + $scope.searchTerm);
	};

	//Function to evaluate a query. The function is called when a user clicks the Evaluate button 
	$scope.evaluateQuery = function () {
		console.log("In $scope.evaluateQuery method, query_id = " + $scope.query_id);
		$scope.retrieveSearchResult($scope.query_id); //Call the method to retrieve the search results from the DB
		$scope.listOfDocuments = !$scope.listOfDocuments; //show the list of documents for evaluation
		$scope.buttonChoice = !$scope.buttonChoice; // Hide the button choices, so the learner focuses on the listOfDocuments shown
	};

	//Function to call next query
	$scope.evaluateNextQuery = function () {
		console.log("In $scope.evaluateNextQuery method");
		console.log("$scope.queryScreen in: " + $scope.queryScreen);
		$scope.skipQuery();
		$scope.retrieveSearchResult($scope.query_id); //Call the method to retrieve the search results from the DB
		$scope.listOfDocuments = !$scope.listOfDocuments; //show the list of documents for evaluation
		$scope.buttonChoice = !$scope.buttonChoice; // Hide the button choices, so the learner focuses on the listOfDocuments shown
	}

	$scope.endEvaluation = function () {
		$scope.listOfDocuments = !$scope.listOfDocuments; //hide the list of documents
		$scope.queryScreen = !$scope.queryScreen; //hide the query screen
		$scope.completionScreen = !false; //show the completion screen
	}

	/*End of hide and show sections for user interface*/
	/////////////////////////////////////////////

	/*** A fresh search. Reset the scope variables to their defaults, set the q query parameter, and load more results.  */
	$scope.search = function (theCall) {
		//		console.log("$scope.firstCall is: " + theCall);
		$scope.page = 0;
		$scope.data = [];
		$scope.allResults = false;
		//$location.search({'q': $scope.searchTerm});

		if (theCall) {
			$scope.searchConcept();
		} else {
			$scope.loadMore($scope.searchTerm, $scope.page);
			console.log("Second load more");
		}
		//$scope.insertdata();
	};

	$scope.dropdownSelect = function (val) {
		$scope.searchTerm = val;
		$scope.search();
	};

	//	$scope.dropdownSelectLink = function (val) {
	//		return data.searchConcept(val);
	//	};

	$scope.searchConcept = function () {
		data.searchConcept($scope.searchTerm).then(function (results) {
			if (results.length > 0) {
				$scope.concepts = results;
				$http({
					method: 'POST',
					url: 'http://localhost:8080/eTutor/api/newquery',
					data: $scope.concepts,
					responseType: 'text'
				}).then(function (response) {

					$scope.loadMore($scope.searchTerm, $scope.page);
					console.log("Method: BOW");



				}, function (error) {
					console.log("error");
					console.log(error);
				});
			}
		});
	};

	$scope.searchDocument = function () {
		data.searchDocument().then(function (results) {
			var ii = 0;
			for (; ii < results.length; ii++) {
				$scope.allDocuments.push(results[ii]);
			}
		});
	};

	//A method to select the documents to display from an intersection of allDocuments and selectedDocs based on same docID
	$scope.filteredDocuments = function () {
		console.log("in filteredDocuments");
		return $scope.allDocuments.filter(function (doc) {
			return $scope.selectedDocIndicesShuffled.indexOf(doc.docID) !== -1;
		});
	};

	///////////////////////////////////////////////	 

	$scope.fullList = [{
		"code": 70,
		"name": "example 10"
	}, {
		"code": 40,
		"name": "example 40"
	}, {
		"code": 750,
		"name": "example 50"
	}, {
		"code": 60,
		"name": "example 60"
	}];
	var filterBy1 = [750, 70];
	var filterBy = _.shuffle(filterBy1);

	$scope.myFilterBy = function (e) {
		var theResult;
		theResult = filterBy.indexOf(e.code) !== -1;
		return theResult;
	}

	// A method to shuffle array elements. //Another way to shuffle is using _.shuffle from Underscore.js which is a version of the Fisher-Yates shuffle.
	//Bad method to do a random shuffle of array elements
	$scope.list = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
	$scope.randomFunction = function () {
		return 0.5 - Math.random();
	}

	function randomizeItems(items) {
		var cached = items.slice(0),
			temp, i = cached.length,
			rand;
		while (--i) {
			rand = Math.floor(i * Math.random());
			temp = cached[rand];
			cached[rand] = cached[i];
			cached[i] = temp;
		}
		return cached;
	}

	$scope.randomizeList = function () {
		var list = document.getElementById("myItems");
		var nodes = list.children,
			i = 0;
		nodes = Array.prototype.slice.call(nodes);
		nodes = randomizeItems(nodes);
		while (i < nodes.length) {
			list.appendChild(nodes[i]);
			++i;
		}
		list.style.display = "block";
	}

	//	//*** I use this one. Another method to select the documents to display from an intersection of allDocuments and selectedDocs based on same docID
	$scope.myFilterByFunction = function (e) {
			return $scope.selectedDocIndicesShuffled.indexOf(e.docID) !== -1;
		}
		///////////////////////////////////////////////

	/*
	 * shuffles the array
	 * @param {Array} myArray array to shuffle
	 */
	function shuffleArray(myArray) {
		for (var i = myArray.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = myArray[i];
			myArray[i] = myArray[j];
			myArray[j] = temp;
		}
		return myArray;
	}

	var $ul, $li, li_content, li_list;
	// find all lists to shuffle
	$("#contact_div > ul").each(function () {
		$ul = $(this);
		li_list = [];
		// shuffle only elements that don't have "group" class
		$ul.find("li[class!='group']").each(function () {
			// add content to the array and remove item from the DOM
			li_list.push($(this).html());
			$(this).remove();
		});

		// shuffle the list
		li_list = shuffleArray(li_list);
		while (li_content = li_list.pop()) {
			// create <li> element and put it back to the DOM
			$li = $("<li />").html(li_content);
			$ul.append($li);
		}
	});

	$("#contact_div").show();


	///////////////////////////////
	$scope.appendQuery = function (val) {
		$scope.searchTerm = $scope.searchTerm + " and " + val;
		$scope.search(false); //performing standard search, so I set firstCall to false
	};


	//function to show top 3 most similar concepts to a query
	$scope.expandQuery = function () {
		var txt = ""; //console.log($scope.concepts[0].conceptLabel);
		if ($scope.concept0) {
			txt += $scope.concepts[0].conceptLabel;
		}
		if ($scope.concept1) {
			txt += ' ' + $scope.concepts[1].conceptLabel;
		}
		if ($scope.concept2) {
			txt += ' ' + $scope.concepts[2].conceptLabel;
		}
		//		console.log(txt);
		$scope.conceptTerm = $scope.searchTerm + ' ' + txt;
		//		$scope.searchTerm = $scope.conceptTerm + " and " + txt;	
		$scope.data = [];
		$scope.allResults = false;
		$scope.loadMore($scope.conceptTerm, 0);
		//document.getElementById("my-checkbox").checked = true;
		$scope.concept0 = false;
		$scope.concept1 = false;
		$scope.concept2 = false;
	};

	/**
	 * Load the next page of results, incrementing the page counter.
	 * When query is finished, push results onto $scope.data and decide
	 * whether all results have been returned (i.e. were 10 results returned?)
	 */
	$scope.loadMore = function (searchText, page) {
		data.search(searchText, page++).then(function (results) {
				if (results.length !== 10) {
					$scope.allResults = true;
				}

				var ii = 0;
				for (; ii < results.length; ii++) {
					$scope.data.push(results[ii]);
				}
				var rank1 = 1;
				var rank2 = 2;
				var rank3 = 3;
				//$scope.docID = results[0].docID; 
				//print out the results
				//				var k = 0;
				//				for (; k < 5; k++) {
				//					//					$scope.result_id = (k + 1); //this should be a counter; incremented each time
				//					$scope.method_id = 2; //the current method we are running i.e 1 for CB, and 2 for BOW
				//					$scope.query_id = $scope.query_id; //the id of the query 
				//					$scope.docID = results[k].docID;
				//					$scope.rank = (k + 1); 
				//
				//					//Call the insertTableData method to write the Recommendations to the sql DB Table
				//					//$scope.insertTableData();
				//					//console.log((k + 1) + " -> " + results[k].title);
				//				}
				console.log("Query_" + $scope.query_id + " : " + $scope.searchTerm);
				console.log("$scope.user_id in Search: " + $scope.user_id);
				$scope.searchDocument();
				$scope.getTag(); //call getTag method from below
				$scope.getConcept(); //call getConcept method from below
			})
			.catch(function (e) {
				console.log(e);
			});
		//can we write to DB here
	};


	/*New method of calling script to insert into DB, yet to implement*/
	$scope.insertdata = function (resource) {
		var req = {
			method: 'POST',
			url: 'php/insertData.php',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $.param({
				'searchTerm': $scope.searchTerm,
				'resource': resource
			})
		}

		$http(req).then(function (response) {
			console.log("Data Inserted Successfully");
		}, function (error) {
			alert("Sorry! Data Couldn't be inserted!");
			console.error(error);

		});
	};

	$scope.insertTableData = function () {
		var req = {
			method: 'POST',
			url: 'php/insertTableData.php',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $.param({
				//				'result_id': $scope.result_id, //this should be a counter; auto-incremented each time
				'method_id': $scope.method_id, //the current method we are running i.e 1 for CB, and 2 for BOW
				'query_id': $scope.query_id, //the id of the query 
				'docID': $scope.docID,
				'rank': $scope.rank
			})
		}

		$http(req).then(function (response) {
			//			console.log("Data Inserted Successfully");
		}, function (error) {
			alert("Sorry! Data Couldn't be inserted!");
			console.error(error);
		});
	};


	$scope.allTag = []; // all selected tags
	$scope.topKtags = []; //top K tags e.g if K = 10; then top10tags

	//For each retrieval page, get the conceptSimilarity field of the documents
	$scope.getTag = function () {
		//		console.log("Length of $scope.data = " + $scope.data.length);
		angular.forEach($scope.data, function (val, key) {
			var res = _.sortBy(val.conceptSimilarity, 'simScore').reverse(); //For each retrieved result, sort its entire conceptSimilarity Array
			var max = res.length > 5 ? 5 : res.length; //if there are NOT up to 5 elements in the conceptSimilarity array, use the number of elements as the max			 
			for (var i = 0; i < max; i++) {
				$scope.addTag(res[i]);
			}
		});

		$scope.allTag = _.sortBy($scope.allTag, 'weight').reverse(); //allTag holds, the conceptLabel and simScore
		$scope.topKtags = $scope.allTag.slice(0, 12); // We slice the sorted tags, and take the top 10 and store in topKtags		 
	};

	//Function to add a conceptLabel and simScore to the array, if they don't exist already
	$scope.addTag = function (tag) {
		var pos = $scope.allTag.map(function (e) {
			return e.text
		}).indexOf(tag.conceptLabel);
		//			console.log("Current: " + $scope.allTag[pos]);
		if (pos == -1) {
			$scope.allTag.push({
				"text": tag.conceptLabel,
				"weight": tag.simScore,
				//				"link": $scope.dropdownSelect(tag.conceptLabel) 
				"link": "https://en.wikipedia.org/wiki/" + (tag.conceptLabel)
			}); //add new to array
			//				console.log('Adding new: ' + tag.conceptLabel);
		} else {
			$scope.allTag[pos].weight = $scope.allTag[pos].weight + tag.simScore; // update simScore if conceptLabel already exists i.e add the simScore
			//			console.log("allTag.weight = " + $scope.allTag[pos].weight);
			//				console.log('Updating existing: ' + tag.conceptLabel);
		}
	};

	//************* Using TF-IDF Aggregation for Similar Concepts ***********
	$scope.allConcept = []; // all selected concepts
	$scope.allConceptCounter = []; // all selected concepts
	$scope.allConceptTFIDF = []; // all selected concepts
	$scope.topKconcepts = []; //top K concepts e.g if K = 10; then top10concepts


	//For each retrieval page, get the conceptSimilarity field of the documents
	$scope.getConcept = function () {
		$scope.allCount = 0;
		$scope.count = 0.0;

		//		console.log("Length of $scope.data = " + $scope.data.length);
		angular.forEach($scope.data, function (val, key) {
			var res = _.sortBy(val.conceptSimilarity, 'simScore').reverse(); //For each retrieved result, sort its entire conceptSimilarity Array
			var max = res.length > 1 ? 1 : res.length; //if there are NOT up to 5 elements in the conceptSimilarity array, use the number of elements as the max 
			for (var i = 0; i < max; i++) {
				//				console.log("res[i] = " + res[i]);
				$scope.addConcept(res[i]);
			}
		}); //end of forEach

		$scope.allConcept = _.sortBy($scope.allConcept, 'weight').reverse(); //allConcept holds, the conceptLabel and simScore
		$scope.topKconcepts = $scope.allConcept.slice(0, 15); // We slice the sorted concepts, and take the top 10 and store in topKconcepts
		$scope.allConceptCounter = _.sortBy($scope.allConceptCounter, 'count').reverse();
		$scope.allConceptTFIDF = _.sortBy($scope.allConceptTFIDF, 'count').reverse();

		//		console.log("------------allConceptCounter---------------------");
		for (var i = 0; i < $scope.allConceptCounter.length; i++) {
			//			console.log($scope.allConceptCounter[i].text + "--> " + $scope.allConceptCounter[i].count);
		}
		//		console.log("========== IDF ================");
		for (var i = 0; i < $scope.allConcept.length; i++) {
			//			console.log($scope.allConcept[i].text + "--> " + $scope.allConcept[i].weight);
		}
		//		console.log("========== TF-IDF ================");
		for (var i = 0; i < $scope.allConceptTFIDF.length; i++) {
			//			console.log($scope.allConceptTFIDF[i].text + "--> " + $scope.allConceptTFIDF[i].weight);
		}

		//		console.log("allCount = " + $scope.allCount);
	};

	//Function to add a conceptLabel and simScore to the array, if they don't exist already
	$scope.addConcept = function (concept) {
		var pos = $scope.allConcept.map(function (e) {
			return e.text
		}).indexOf(concept.conceptLabel);

		var conceptWeight = 0.0;
		var theCount = 0.0;
		var theConceptLabel;

		if (pos == -1) { //if the concept is not in the allConcept[], push it to the array
			$scope.count = 1.0; //this is the first occurence of the concept
			//conceptWeight = ($scope.data.length / $scope.count); //IDF Only--> update simScore if conceptLabel already exists 
			theConceptLabel = concept.conceptLabel;
			conceptWeight = 1.0;

			$scope.allConcept.push({
				"text": theConceptLabel,
				"weight": conceptWeight,
				//				"weight": concept.simScore,
				"link": "https://en.wikipedia.org/wiki/" + (concept.conceptLabel)
			}); //add new to array

			theCount = 1.0;
			$scope.allConceptCounter.push({
				"text": theConceptLabel,
				"count": theCount,
				//				"weight": concept.simScore,
				"link": "https://en.wikipedia.org/wiki/" + (concept.conceptLabel)
			}); //add new to array

			$scope.allConceptTFIDF.push({
				"text": theConceptLabel,
				"weight": conceptWeight,
				//				"weight": concept.simScore,
				"link": "https://en.wikipedia.org/wiki/" + (concept.conceptLabel)
			}); //add new to array

			$scope.allCount++;
		} else {
			$scope.allConceptCounter[pos].count = $scope.allConceptCounter[pos].count + 1.0;
			$scope.allConceptTFIDF[pos].weight = concept.simScore * ($scope.data.length / $scope.allConceptCounter[pos].count); //TF * IDF
			$scope.allConcept[pos].weight = ($scope.data.length / $scope.allConceptCounter[pos].count);
			$scope.allCount++;
		} //end of else 
	};

	//************* END of Using TF-IDF Aggregation for Similar Concepts ***********//



	// For AngularUI Modal. I am just replacing video with chapter for now, as I use the PDFs from chapters
	$scope.open = function (size, chapter) {
		$scope.selectedResource(chapter); // execute function for selected document to save to database 
		$scope.selectedChapter = chapter.url; // get the selected chapter's url link
		$scope.docID = chapter.docID;

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modal.html', // model view
			controller: 'ModalCtrl', // modal controller
			size: size,
			resolve: {
				resource: function () {
					return {
						'url': $scope.selectedChapter, // pass link to modal's controller
						'query': $scope.searchTerm,
						'query_id': $scope.query_id,
						'docID': $scope.docID
					}
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
			},
			function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
	};
			}]); //end of MachineLearningRecommender.controller

// Modal controller: content and actions in open modal
MachineLearningRecommender.controller('ModalCtrl', ['$scope', '$http', '$uibModalInstance', 'resource', function ($scope, $http, $uibModalInstance, resource) {
	$scope.selected = resource;

	/*Beginning of Star rating section*/
	//	$scope.rating = 5;
	$scope.rating = 0;
	$scope.ratings = [{
		current: 1,
		max: 5
    }];

	console.log("$scope.user_id modal: " + $scope.user_id);

	$scope.getSelectedRating = function (rating) {
			console.log("rating: " + rating);
			var req = {
				method: 'POST',
				url: 'php/insertRating.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: $.param({
					'user_id': $scope.user_id, //the id of the current user 
					'query_id': $scope.selected.query_id, //the id of the current query 
					'docID': $scope.selected.docID, //docID of the document being rated
					'rating': rating //star rating made by the learner 
				})
			}

			$http(req).then(function (response) {
				console.log("Star Rating Inserted Successfully");
			}, function (error) {
				alert("Sorry! Rating Couldn't be inserted!");
				console.error(error);

			});
		}
		/*End of Star rating section*/

	// actions on click event in modal
	$scope.ok = function () { // executes on modal close using close button
		$uibModalInstance.close($scope.selected.item);
	};

	$scope.cancel = function () { // executes on modal close using top-right [x] 
		$uibModalInstance.dismiss('cancel');

	};

}]);


//MachineLearningRecommender.directive('myYoutube', function ($sce) {
//	return {
//		restrict: 'EA',
//		scope: {
//			code: '='
//		},
//		replace: true,
//		template: '<div style="height:400px;"><iframe style="overflow:hidden;height:100%;width:100%" width="100%" height="100%" src="{{url}}" frameborder="0" allowfullscreen></iframe></div>',
//		link: function (scope) {
//			//			console.log('Just a test!!!!!');
//			scope.$watch('code', function (newVal) {
//				if (newVal) {
//					scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
//				}
//			});
//		}
//	};
//});

angular.module('myAppWithSceDisabledmyApp', []).config(function ($sceProvider) {
	// Completely disable SCE.  For demonstration purposes only!
	// Do not use in new projects.
	$sceProvider.enabled(false);
});