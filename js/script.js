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
	$rootScope.userRating;
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


/**
 * Create a controller to interact with the UI.
 */
MachineLearningRecommender.controller('videoCtrl', ['$scope', '$location', '$sce', '$http', '$uibModal', '$log', '$rootScope', function ($scope, $location, $sce, $http, $uibModal, $log, $rootScope) {

	$scope.queries = [];
	$scope.resultsPerPage = [];
	$scope.dropOptions = $scope.queries; //$scope.queries is assigned to the items from the drop down option
	$scope.result_id = 1;
	$scope.method_id = 1; //1 for ConceptBased method; and 2 for BOW
	$scope.query_id;
	$scope.query_desc;
	$scope.docID = "";
	$scope.selectedDocs = [];
	$scope.theSelectedDocuments = [];
	$scope.selectedDocIndices = [];
	$scope.selectedDocIndicesShuffled = [];

	var expandedQuery = " ";

	// Initialize the scope defaults. 
	$scope.concepts = []; //An array of concepts
	$scope.top3concepts = []; //An array of concepts
	$scope.allConcepts = []; //An array to hold ALL the concepts, don't know if this is a repetition of $scope.concepts
	$scope.allConceptLabels = []; // An array to hold ALL the concept labels
	$scope.page = 0; // A counter to keep track of our current page
	$scope.allResults = false; // Whether or not all results have been found.
	$scope.allDocuments = []; //To hold all the documents in our collection
	$scope.userCounter = 17; //To generate an ID for users	
	$scope.user_id;

	$scope.user = {};
	$scope.question = {
		consent: ['yes'],
		qualification: ['No Degree', 'BSc', 'MSc', 'PhD'],
		role: ['MSc Student', 'PhD Student', 'Post Doctorate', 'Researcher', 'Lecturer'],
		experience: ['Less than one year', 'One to two years', 'Three To five years', 'Over five years', 'Over ten years'],
		expertise: ['beginner', 'competent', 'expert']
			//selectedOption: ['Select your role'] //This sets the default value of the select in the ui
	};

	$scope.conceptlabelsArray = ["activation function", "adaboost", "adaptive resonance theory", "affinity analysis", "anomaly detection", "apriori algorithm", "artificial neural network", "association rule learning", "association rule mining", "backpropagation", "bagging", "baum welch algorithm", "bayesian inference", "bayesian linear regression", "bayesian network", "beam search", "biclustering", "binary classification", "bioinformatics", "birch", "boosting", "canonical analysis", "case based reasoning", "causality", "cca", "classification", "cluster analysis", "clustering", "clustering high dimensional data", "collaborative filtering", "committee machine", "competitive learning", "complete linkage clustering", "compressed sensing", "computational learning theory", "concept learning", "conceptual clustering", "conditional random field", "confusion matrix", "data analysis", "data preprocessing", "dbscan", "decision rules", "decision tree learning", "decision tree", "decision trees", "deep learning", "delta rule", "dimensionality reduction", "eager learning", "empirical risk minimization", "ensemble learning", "expectation maximization algorithm", "expectation propagation", "explanation based learning", "exploratory data analysis", "factor analysis", "feature extraction", "feature selection", "feature space", "feed forward", "fitness function", "fuzzy clustering", "gaussian process", "genetic algorithm", "genetic programming", "gibbs sampling", "graphical model", "gradient descent", "gsp algorithm", "hidden markov model", "hierarchical clustering", "hinge loss", "hopfield network", "inductive bias", "inductive logic programming", "information retrieval", "instance based learning", "isomap", "kernel methods", "kernel principal component analysis", "kernel trick", "kullback leibler divergence", "latent variable", "lazy learning", "learning automata", "learning theory", "learning vector quantization", "linear classifier", "linear discriminant analysis", "linear model", "linear regression", "logistic regression", "logitboost", "loss function", "markov chain monte carlo", "markov decision process", "markov model", "markov random field", "maximum likelihood", "medical diagnosis", "minimum description length", "mixture model", "multi task learning", "multiclass classification", "multidimensional scaling", "multivariate adaptive regression splines", "mutual information", "naive bayes classifier", "neural network", "nonlinear regression", "novelty detection", "occams razor", "online learning", "optics", "outlier detection", "overfitting", "pac learning", "perceptron", "principal component analysis", "rademacher complexity", "radial basis function", "randomized weighted majority algorithm", "receiver operating characteristic", "recommender system", "regression analysis", "reinforcement learning", "relevance vector machine", "rule induction", "sarsa", "semi supervised learning", "sentiment analysis", "sigmoid function", "single linkage clustering", "spectral clustering", "speech recognition", "statistical inference", "statistics", "stochastic gradient descent", "structural risk minimization", "structured prediction", "supervised learning", "support vector machine", "temporal difference learning", "text mining", "topic model", "training set", "unsupervised learning", "variational message passing", "version space", "web mining", "weighted majority algorithm", "winnow algorithm"];

	var idx = 0;

	//function to retrieve Queries from the sql database
	$scope.retrieveQueries = function () {
		console.log("$scope.user_id in retrieve: " + $scope.user_id);
		$http.get("php/retrieveQueries.php")
			.then(function (response) {
				$scope.queries = response.data.theQueries;

				// And, a random search term to start if none was present on page load.
				idx = Math.floor(Math.random() * $scope.queries.length);
				$scope.searchTerm = $scope.queries[idx]['query_desc'];
				$scope.query_id = $scope.queries[idx]['query_id'];
				console.log("$scope.searchTerm :" + $scope.searchTerm + ", id = " + $scope.query_id);

				//$scope.conceptTerm = $location.search().q || concepts[idx];

				$scope.randomQuery = $scope.queries[idx]['query_desc']; //Show a random query on start
				// initial search at startup

			});
	};
	//	console.log("$scope.retrieveQueries is called");
	$scope.retrieveQueries(); //retrieve $scope.queries from the DB table

	//	function to retrieve Full SearchResults from the sql database; takes in the query_id
	$scope.retrieveFullSearchResult = function (query_id) {
		console.log("$scope.query_id in retrieveFullSearchResult: " + $scope.query_id);
		$scope.selectedDocIndices = [];
		$scope.selectedDocIndicesShuffled = [];

		var req = {
			method: 'POST',
			url: 'php/retrieveFullSearchResult.php',
			data: {
				'query_id': $scope.query_id, //the id of the current query
			}
		};

		$http(req).then(function (response) {
			$scope.selectedDocs = response.data.theDocs;

			/*Here i'm assigning what we retrieve from DB into fullChapter variable*/
			$scope.fullChapter = $scope.selectedDocs;

			var ii = 0;
			for (; ii < $scope.selectedDocs.length; ii++) {
				$scope.selectedDocIndices.push($scope.selectedDocs[ii]["docID"]);
//				console.log($scope.selectedDocs[ii].docID + "," + $scope.selectedDocs[ii].title + "," + $scope.selectedDocs[ii].url + "," + $scope.selectedDocs[ii].shortSummary);
			}

			//We Shuffle the selectedDoc indices using _.shuffle from Underscore.js which is a version of the Fisher-Yates shuffle, and we get back a randomized list to show to the user
			$scope.selectedDocIndicesShuffled = _.shuffle($scope.selectedDocIndices);

		}, function (error) {
			alert("Sorry! Data Couldn't be retrieved!");
			console.error(error);

		});
	};

	//declare a chapter variable to hold a chapter url and title, useful for our modal
	$scope.chapter = {
		url: "{{chapter.url}}",
		title: "{{chapter.title}}",
		docID: "{{chapter.docID}}",
		shortSummary: "{{chapter.shortSummary}}"
	};

	//This function is used in Line 802. it's a function to log the selected chapter or video(if Youtube videos)
	$scope.selectedResource = function (fullChapter) {
		$log.info(fullChapter); // see clicked resource 
		//$scope.insertdata(chapter.title); //call insert function to insert the selected resource in the DB
	};

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
		$scope.retrieveFullSearchResult($scope.query_id); //Call the method to retrieve the search results from the DB	
		console.log("In $scope.evaluateQuery method after DB" + $scope.query_id);
		$scope.listOfDocuments = !$scope.listOfDocuments; //show the list of documents for evaluation
		$scope.buttonChoice = !$scope.buttonChoice; // Hide the button choices, so the learner focuses on the listOfDocuments shown
	};

	//Function to call next query
	$scope.evaluateNextQuery = function () {
		$scope.insertPostEvaluation();
		console.log("Post evaluation feedback " + $scope.feedback);
		$scope.feedback = ""; //clear the user feedback to receive a new one
		$scope.skipQuery();
		$scope.retrieveFullSearchResult($scope.query_id); //Call the method to retrieve the search results from the DB
		$scope.listOfDocuments = !$scope.listOfDocuments; //show the list of documents for evaluation
		$scope.buttonChoice = !$scope.buttonChoice; // Hide the button choices, so the learner focuses on the listOfDocuments shown
	}

	$scope.endEvaluation = function () {
			$scope.listOfDocuments = !$scope.listOfDocuments; //hide the list of documents
			$scope.queryScreen = !$scope.queryScreen; //hide the query screen
			$scope.completionScreen = !false; //show the completion screen
			$scope.insertPostEvaluation();
			$scope.feedback = ""; //clear the user feedback to receive a new one	
		}
		/*End of hide and show sections for user interface*/

	$scope.myFilterBy = function (e) {
		var theResult;
		theResult = filterBy.indexOf(e.code) !== -1;
		return theResult;
	}

	// A method to shuffle array elements. //Another way to shuffle is using _.shuffle from Underscore.js which is a version of the Fisher-Yates shuffle.
	//	//*** I use this one. Another method to select the documents to display from an intersection of allDocuments and selectedDocs based on same docID
	$scope.myFilterByFunction = function (e) {
			return $scope.selectedDocIndicesShuffled.indexOf(e.docID) !== -1;
		}
		///////////////////////////////////////////////

	/*New method of calling script to insert into DB*/
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


	$scope.insertPostEvaluation = function () {
		var req = {
			method: 'POST',
			url: 'php/insertPostEvaluation.php',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: $.param({
				'user_id': $scope.user_id, //the id of the current user 
				'query_id': $scope.query_id, //the id of the current query
				'feedback': $scope.feedback //the user's response to the postEvaluation question			 
			})
		}

		$http(req).then(function (resonse) {
			console.log("feedback received succesfully");
		}, function (error) {
			alert("Sorry! Data could not be inserted into DB!");
			console.error(error);
		});
	}; //end of insertPostEvaluation method

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

	$scope.ratingCheckCounter = []; //new Array($scope.selectedDocIndices.length);
	// For AngularUI Modal. I am just replacing video with chapter for now, as I use the chapters from eBooks
	$scope.open = function (size, fullChapter, index) {
		//		$scope.checkRating = false;

		$scope.showRating = false; //Hide the span that shows the rating given by the user for a document
		$scope.ratedDocument = false;
		$scope.selectedResource(fullChapter); // execute function for selected document to save to database 
		$scope.selectedChapter = fullChapter.url; // get the selected chapter's url link
		$scope.docID = fullChapter.docID;
		$scope.title = fullChapter.title;
		$scope.rating = fullChapter.userRating;
		console.log("fullChapter.title = " + fullChapter.title + ",fullChapter.userRating = " + fullChapter.userRating);
		$scope.documentRated = fullChapter.documentRated;
		//		$scope.documentRated = chapter.documentRated;

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'modal.html', // model view
			controller: 'ModalCtrl', // modal controller
			size: size, //The size of the modal, we use large: 'lg' 
			resolve: {
				resource: function () {
					return {
						'url': $scope.selectedChapter, // pass link to modal's controller
						'query': $scope.searchTerm, //The current query
						'query_id': $scope.query_id, //The ID of the current query
						'refined_query': $scope.refined_query, //The refined query
						'docID': $scope.docID, //The ID of the current document
						'title': $scope.title, //The title of the current document
						'rating': $scope.rating || 0, //The rating a user gives to a document
						'displayIndex': index + 1 //The order in which the documents are displayed to the user
					}
				}
			}
		});


		modalInstance.result.then(function (selectedItem) {
				$scope.selected = selectedItem;
				//				console.log("$scope.selectedDocIndices.length = " + $scope.selectedDocIndices.length);

				for (var i = 0; i < $scope.fullChapter.length; i++) {
					if ($scope.fullChapter[i].docID == $scope.selected.docID) {
						$scope.fullChapter[i].userRating = $scope.selected.rating;

						console.log("$scope.selected.rating " + $scope.fullChapter[i].userRating);
						if (($scope.fullChapter[i].userRating) > 0) {
							$scope.fullChapter[i].documentRated = "true";
						}
						//						console.log($scope.allDocuments[i]);
						break;
					}
				}


			},
			function () {
				$scope.showRating = true; //show the span with a user's rating for a document
				$log.info('Modal dismissed at: ' + new Date());
			});

	}; //end of scope.open


	$scope.checkRating = function () {
			console.log("in the check rating function");
			console.log("$scope.selectedDocIndices[j]" + $scope.selectedDocIndices[0]);
			//			console.log("checkRating_userRating_1" + $scope.theSelectedDocuments[0]['userRating']);
			//			var output = false;
			//					if ($scope.conceptlabelsArray.some(function (v) {
			//								if (currentQuery.indexOf(v) >= 0) {
			//									console.log("Found: " + $scope.conceptlabelsArray[$scope.conceptlabelsArray.indexOf(v)]);

			//			console.log("docID is: " + $scope.selectedDocIndicesShuffled[$scope.selectedDocIndicesShuffled.indexOf(e.docID)]);
			//			for (var i = 0; i < $scope.allDocuments.length; i++) { //for the length of the selected Documents
			//				if ($scope.allDocuments[i].docID)
			//					console.log("theSelectedDocument " + i + " is: " + $scope.theSelectedDocuments);
			//			}
			//			return output;
		} //end of checkRating function

			}]); //end of MachineLearningRecommender controller

// Modal controller: content and actions in open modal
MachineLearningRecommender.controller('ModalCtrl', ['$scope', '$http', '$uibModalInstance', 'resource', '$rootScope', function ($scope, $http, $uibModalInstance, resource, $rootScope) {
	$scope.selected = resource;
	//	$scope.showRating = false; //Hide the span that shows the rating given by the user for a document

	/*Beginning of Star rating section*/
	//	$scope.rating = 5;
	//	$scope.selected.rating = 0;
	$scope.ratings = [{
		current: $scope.selected.rating == 0 ? 1 : $scope.selected.rating,
		max: 5
    }];

	$scope.getSelectedRating = function (rating) {
			$scope.selected.rating = rating;
			console.log("Learner rated: " + rating + " userRating = " + $scope.selected.rating);

			var req = {
				method: 'POST',
				url: 'php/insertRating.php',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				data: $.param({
					'user_id': $scope.user_id, //the id of the current user 
					'query_id': $scope.selected.query_id, //the id of the current query 
					'query_desc': $scope.selected.query, //The original learner query 
					'refined_query': $scope.selected.refined_query, //The refined learner query 
					'docID': $scope.selected.docID, //docID of the document being rated
					'rating': rating, //star rating made by the learner 
					'displayIndex': $scope.selected.displayIndex //The order in which the documents are displayed to the user
				})
			}

			$http(req).then(function (response) {
				//				console.log("Star Rating Inserted Successfully");
			}, function (error) {
				alert("Sorry! Rating Couldn't be inserted!");
				console.error(error);

			});
		}
		/*End of Star rating section*/

	// actions on click event in modal
	$scope.ok = function () { // executes on modal close using close button
		console.log("Modal close button pressed!");
		$uibModalInstance.close($scope.selected);
	};

	$scope.cancel = function () { // executes on modal close using top-right [x]
		$scope.ok();
		$uibModalInstance.dismiss('cancel');
		//		console.log("showRating Before = " + $scope.showRating);
		$scope.showRating = !false; //show the span with a user's rating for a document 
	};
}]);

angular.module('myAppWithSceDisabledmyApp', []).config(function ($sceProvider) {
	// Completely disable SCE.  For demonstration purposes only!
	// Do not use in new projects.
	$sceProvider.enabled(false);
});