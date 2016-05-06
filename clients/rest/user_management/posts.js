/*****************************************************************************************************
 
this file mainly exposes the crud & other functionality of the post type. it calls the service that handles 
the logic and interacts with the db, therefore this file will not hold any logic, but is only a rest exposure 
of the services underneath

********************************************************************************************************/

var seneca = require('seneca')();

var client = seneca.client(8080)
var koaBody = require('koa-body')()

// $ call the workers from the clients
module.exports = function(router){
    // $ setup the router to respond with a html file
	router.all('/', function *(next) {
	  this.body = yield render("ui/index.html");
	});

	// $ makin a new post
	router.post("/posts",koaBody,function *(next){
		//keep outer this safe
		var self = this

		//make a thunk around seneca action
		function queryThunk(){
			return function(callback){
				client.act({
			  	  role:"post",
				  cmd:"create",
				  postid:self.request.body.first_name + Math.random(),
				  first_name:self.request.body.first_name,
				  last_name:self.request.body.last_name,
				  emails:['f@baggins.com', 'baggins@gmail.com']
				},callback)
			}
		}

		//run the thunk :-p
		var responce = yield queryThunk()
		// complete the res
		this.body = responce;

	})

	// $ getting all posts/paginated
	router.get("/posts",function *(next){

		function finderthunk(){
			return function(callback){
				client.act("role:post, cmd:find",function(err, responce){
				  if(err) throw err
				  callback(err,responce)
				})
			}
		}

		var responce = yield finderthunk()
		this.body = responce;
	})

	// $ delting a post via the pk
	router.delete("/post/:postid",function *(next){
		console.log(this.params.postid)

		function finderthunk(){
			return function(callback){
				client.act("role:post, cmd:deleteOne, postid:" + this.params.postid,function(err, responce){
				  if(err) throw err
				  // console.log(responce.result.rows)
				  callback(err,responce)
				})
			}
		}

		var responce = yield finderthunk()

		this.body = responce;
	})
}