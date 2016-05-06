var assert = require('assert');
const cassandra = require('cassandra-driver');

//connect to the database, ensure the keyspace we need exists
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  keyspace: 'user_k1'
});


module.exports = function(options){
  this.add("role:user, cmd:ping",ping)
  this.add("role:user, cmd:create",create)
  this.add("role:user, cmd:find",find)
  this.add("role:user, cmd:findOne",findOne)
  this.add("role:user, cmd:update",update)
  this.add("role:user, cmd:deleteOne",deleteOne)


  //ping, for testing communications
  function ping(args,callback){
    callback(null, {result:"We are still alive @ " + new Date()})
  }

  function create(args, callback){
    var params = []
    var userid, first_name, last_name, emails;

    for(x in args){
      if(x == "userid") userid = args[x], params.push(userid);
      if(x == "first_name") first_name = args[x], params.push(first_name);
      if(x == "last_name") last_name = args[x], params.push(last_name);
      if(x == "emails") emails = args[x], params.push(emails)
    }

    const insertQuery = `INSERT INTO users (
      userid,
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
    const findQuery = `SELECT * from users`

    client.execute(findQuery, function(err, result) {
      assert.ifError(err);
      callback(null, {result:result.rows})
    });
  }

  function findOne(args, callback){
    console.log("finding one student")
    //this is the query that will be executed
    const findOneQuery = `SELECT * FROM users WHERE userid = ?`

    client.execute(findOneQuery,[args.userid],{prepare:true}, function(err, result) {
      assert.ifError(err);
      callback(null, {result:result})
    });
  }

  function findOne(args, callback){
    console.log("finding one student")
    //this is the query that will be executed
    const findOneQuery = `SELECT * FROM users WHERE userid = ?`

    client.execute(findOneQuery,[args.userid],{prepare:true}, function(err, result) {
      assert.ifError(err);
      callback(null, {result:result})
    });
  }

  function deleteOne(args, callback){
    console.log("deleteing a user")
    //this is the query that will be executed
    const deleteQuery = `DELETE  FROM users WHERE userid = ?`

    client.execute(deleteQuery,[String(args.userid)], function(err, result) {
      assert.ifError(err);
      console.log(result)
      callback(null, {result:result})
    });
  }

  function update(args, callback){
    var params = []
    var head = 'UPDATE users SET '

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
      if(x == "userid") userid = args[x], params.push(userid), head = head + "WHERE userid=?";
    }

    // var tail = "WHERE userid=?"

    var full = head
    console.log(full)


    // const query = 'UPDATE user_profiles SET birth=? WHERE key=?';
    // const params = [new Date(1942, 10, 1), 'jimi-hendrix'];
    //Set the prepare flag in the query options
    client.execute(full, params, { prepare: true }, function(err) {
      assert.ifError(err);
      console.log('Row updated on the cluster');
      callback(err,{result:"success"})
    });
  }
}
