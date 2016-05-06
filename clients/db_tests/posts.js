var seneca = require('seneca')();

var client = seneca.client()

//ping the post micro-service
client.act("role:post, cmd:ping",function(err, responce){
  if(err) throw err
  console.log(responce)
})

//create a post,
//the object you send will be checked by joi,
//if it passes the test needed for the data to be stored, otherwise a boom //will happen
client.act({
  role:"post",
  cmd:"create",
  postid:"uuid",
  first_name:"caroline",
  last_name:"Gitomeh",
  emails:['f@baggins.com', 'baggins@gmail.com']
},function(err, responce){
  if(err) throw err
  console.log(responce)
})

//feth all posts
.act("role:post, cmd:find",function(err, responce){
  if(err) throw err
  console.log(responce.result.rows)
})

//find a sinle post
.act("role:post, cmd:findOne, postid:uuid",function(err, responce){
  if(err) throw err
  console.log(responce.result.rows)
})

//update the record of that post
.act({
  role:"post",
  cmd:"update",
  postid:"uuid",
  first_name:"bae",
  last_name:"nyambu",
  emails:["sirbranson@gmail.com"]
},function(err, responce){
  if(err) throw err
  console.log(responce)
})

// find sinle aain to confirm that the post exists
.act("role:post, cmd:findOne, postid:uuid",function(err, responce){
  if(err) throw err
  console.log(responce.result.rows)
})
