var koa = require('koa');
var app = koa()

// $ serve files, setup
var views = require("co-views");
var serve = require('koa-static');
var render = views("public", {
  map: {
    html: 'swig'
  }
});
var router = require('koa-router')();

// $ make the folder public
app.use(serve(__dirname + "/ui"));

//$ setup logic to log when the request is done
app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  this.set('X-Responce-Time',ms + "ms")
});

app.use(function *(next){
  var start = new Date;
  yield next;
  var ms = new Date - start;
  console.log('%s %s - %s',this.method,this.url,ms)
})

// $ the routers , split by with the routes
require("./rest/user_management/user.js")(router)
require("./rest/user_management/posts.js")(router)


app
  .use(router.routes())
  .use(router.allowedMethods());

//start the server
app.listen(3000,function(err){
  if(err) console.log(err)
  console.log("ui started on 3000")
})
