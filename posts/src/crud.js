var assert = require('assert');
const cassandra = require('cassandra-driver');

//connect to the database, ensure the keyspace we need exists
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'post_k1'
});


module.exports = function(options){
  this.add("role:post, cmd:ping",ping)
  this.add("role:post, cmd:create",create)
  this.add("role:post, cmd:find",find)
  this.add("role:post, cmd:findOne",findOne)
  this.add("role:post, cmd:update",update)
  this.add("role:post, cmd:deleteOne",deleteOne)


  //ping, for testing communications
  function ping(args,callback){
    callback(null, {result:"We are still alive @ " + new Date()})
  }

  function create(args, callback){
    var params = []
    var postid, first_name, last_name, emails;

    for(x in args){
      if(x == "postid") postid = args[x], params.push(postid);
      if(x == "first_name") first_name = args[x], params.push(first_name);
      if(x == "last_name") last_name = args[x], params.push(last_name);
      if(x == "emails") emails = args[x], params.push(emails)
    }

    const insertQuery = `INSERT INTO posts (
      postid,
      first_name,
      last_name,
      emails
    ) VALUES(?,?,?,?);`

    client.execute(insertQuery,params,function(err, result) {
      //check if the  creation failed
      assert.ifError(err);
      callback(null, {result:"'We successfully made the record in the table in the keyspace"})
    });
  }

  function find(args, callback){
    //this is the query that will be executed
    const findQuery = `SELECT * from posts`

    client.execute(findQuery, function(err, result) {
      assert.ifError(err);
      callback(null, {result:result.rows})
    });
  }

  function findOne(args, callback){
    console.log("finding one student")
    //this is the query that will be executed
    const findOneQuery = `SELECT * FROM posts WHERE postid = ?`

    client.execute(findOneQuery,[args.postid],{prepare:true}, function(err, result) {
      assert.ifError(err);
      callback(null, {result:result})
    });
  }

  function findOne(args, callback){
    console.log("finding one student")
    //this is the query that will be executed
    const findOneQuery = `SELECT * FROM posts WHERE postid = ?`

    client.execute(findOneQuery,[args.postid],{prepare:true}, function(err, result) {
      assert.ifError(err);
      callback(null, {result:result})
    });
  }

  function deleteOne(args, callback){
    console.log("deleteing a post")
    //this is the query that will be executed
    const deleteQuery = `DELETE  FROM posts WHERE postid = ?`

    client.execute(deleteQuery,[String(args.postid)], function(err, result) {
      assert.ifError(err);
      console.log(result)
      callback(null, {result:result})
    });
  }

  function update(args, callback){
    var params = []
    var head = 'UPDATE posts SET '

    for(x in args){
      if(x == "first_name") {
        first_name = args[x],
        params.push(first_name),
        head = head + "first_name=?, "
        // console.log(args.indexof(x))
        console.log(x)
        // console.log(args)
      };
      if(x == "last_name") last_name = args[x], params.push(last_name), head = head + "last_name=?, ";
      if(x == "emails") emails = args[x], params.push(emails), head = head + " emails=? "
    }

    for(x in args){
      //the pk comes last in the check
      if(x == "postid") postid = args[x], params.push(postid), head = head + "WHERE postid=?";
    }

    // var tail = "WHERE postid=?"

    var full = head
    console.log(full)


    // const query = 'UPDATE post_profiles SET birth=? WHERE key=?';
    // const params = [new Date(1942, 10, 1), 'jimi-hendrix'];
    //Set the prepare flag in the query options
    client.execute(full, params, { prepare: true }, function(err) {
      assert.ifError(err);
      console.log('Row updated on the cluster');
      callback(err,{result:"success"})
    });
  }
}
