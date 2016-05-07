# the blogging logic
* currently this is a web app, that stores a list of users, and a list of posts, preferably blog posts. a user has multiple blog posts and it just stores the data and shows it to the web ui. nothing more complicated

# goal of project
* making a true perfect example micro-service sample, with the minimum amount of transport and other complications dependencies
* simulate a correct deployment process and data management, scaling . with the least ammount of overhead in terms of things to learn abbout senea 

# in node
* make two seneca micro-services that are independent, 
* run them on separate node processes,
* eah expose its available actions on a certain port, which clients will have to connect to, when issueing commands to the services
* the services are independent ie. if users needs to access any posts, he cannat call the database directly , it will pass through the api exposed by the posts api

# for data
* each has to have its own independednt cassandra table and if possible, its own database entirely
* eah service has its own data struture and exposes an api for consumptions
* each service has its own logging , monitoring, dependency list(package.json) ,running process , maybe docker instance(future), to allow independent deployment and management

# run locally
* install cassandra db, in whatever OS you have. make sure it runs on `127.0.0.1`
* create two keyspaces `post_k1` and `user_k1`, where each seriice will independently store its schema
* run `npm install` in `/clients` ,`/posts`, `/users` to install all the dependencies
* run `npm start` in all the three folders independently, to start each service, and the clients to power the ui
* visit `localhost:3000` on your browser and see the magic
* add a few users and a few posts

