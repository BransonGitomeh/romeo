/*****************************************************************************************************
 
this file mainly exposes the crud & other functionality of the user type. it calls the service that handles 
the logic and interacts with the db, therefore this file will not hold any logic, but is only a rest exposure 
of the services underneath

********************************************************************************************************/

var seneca = require('seneca')();

seneca.client({
	port:8081,
	pin:'role:user'
})

var koaBody = require('koa-body')()

// $ call the workers from the senecas
module.exports = function(router){
    // $ setup the router to respond with a html file
	router.all('/', function *(next) {
	  this.body = yield render("ui/index.html");
	});

	// $ makin a new user
	router.post("/users",koaBody,function *(next){
		//keep outer this safe
		var self = this

		//make a thunk around seneca action
		function queryThunk(){
			return function(callback){
				seneca.act({
			  	  role:"user",
				  cmd:"create",
				  userid:self.request.body.first_name + Math.random(),
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

	// $ getting all users/paginated
	router.get("/users",function *(next){

		function finderthunk(){
			return function(callback){
				seneca.act("role:user, cmd:find",function(err, responce){
				  if(err) throw err
				  callback(err,responce)
				})
			}
		}

		var responce = yield finderthunk()
		this.body = responce;
	})

	// $ delting a user via the pk
	router.delete("/user/:userid",function *(next){
		console.log(this.params.userid)

		function finderthunk(){
			return function(callback){
				seneca.act("role:user, cmd:deleteOne, userid:" + this.params.userid,function(err, responce){
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