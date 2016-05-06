var seneca = require('seneca')();

var client = seneca.client(8080).client(8081)

//ping the user micro-service
client.act("role:user, cmd:ping",function(err, responce){
  if(err) throw err
  console.log(responce)
})

//create a user,
//the object you send will be checked by joi,
//if it passes the test needed for the data to be stored, otherwise a boom //will happen
client.act({
  role:"user",
  cmd:"create",
  userid:"uuid",
  first_name:"caroline",
  last_name:"Gitomeh",
  emails:['f@baggins.com', 'baggins@gmail.com']
},function(err, responce){
  if(err) throw err
  console.log(responce)
})

//feth all users
.act("role:user, cmd:find",function(err, responce){
  if(err) throw err
  console.log(responce.result.rows)
})

//find a sinle user
.act("role:user, cmd:findOne, userid:uuid",function(err, responce){
  if(err) throw err
  console.log(responce.result.rows)
})

//update the record of that user
.act({
  role:"user",
  cmd:"update",
  userid:"uuid",
  first_name:"bae",
  last_name:"nyambu",
  emails:["sirbranson@gmail.com"]
},function(err, responce){
  if(err) throw err
  console.log(responce)
})

// find sinle aain to confirm that the user exists
.act("role:user, cmd:findOne, userid:uuid",function(err, responce){
  if(err) throw err
  console.log(responce.result.rows)
})
