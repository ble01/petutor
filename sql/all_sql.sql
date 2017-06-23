SELECT distinct(docID) FROM `result` WHERE rank between 1 and 3 and query_id = 25;

ALTER TABLE user_input DROP PRIMARY KEY