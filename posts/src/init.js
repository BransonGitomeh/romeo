//this file makes sure that everything works well in this service, starting with--if the db keyspace exists

const assert = require('assert');
const cassandra = require('cassandra-driver');

//connect to the database, ensure the keyspace we need exists
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'post_k1'
});

//contact the table we need and ensure that it exists as well as we want it to
const tableQuery = `CREATE TABLE posts (
  postid text PRIMARY KEY,
  first_name text,
  last_name text,
  emails set<text>,
  posts map<timestamp, text>
);`

//run the query to create the table
client.execute(tableQuery, function(err, result) {
  //check if the  creation failed
  // assert.ifError(err);
  if(err){
    process.exit()
  }else{
    console.log('We successfully made the table');
    console.log(result)
  }
});
