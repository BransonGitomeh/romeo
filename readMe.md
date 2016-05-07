## Blogging logic
* currently this is a web app, that stores a list of users, and a list of posts, preferably blog posts. A user has multiple blog posts and it just stores the data and shows it to the web ui. nothing complicated.

## Goal of project
* make a true perfect example micro-service sample, with the minimum amount of overhead
* create a correct deployment process , propper data management, scaling with the least ammount of overhead in terms of things to learn abbout seneca

## Processing Logic
* Make two seneca micro-services that are independent, 
* Run them on separate node processes,
* Each expose its available actions on a certain port, which clients will have to connect to, when issueing commands to the services
* The services are independent ie. if users needs to access any posts, he cannat call the database directly , it will pass through the api exposed by the posts api

## Data Goal
* Each has to have its own independednt cassandra table and if possible, its own database entirely
* Eah service has its own data struture and exposes an api for consumptions
* Each service has its own logging , monitoring, dependency list(package.json) ,running process , maybe docker instance(future), to allow independent deployment and management

## Run locally
* Install cassandra db, in whatever OS you have. make sure it runs on `127.0.0.1`
* Create two keyspaces `post_k1` and `user_k1`, where each seriice will independently store its schema
* Run `npm install` in `/clients` ,`/posts`, `/users` to install all the dependencies
* Run `npm start` in all the three folders independently, to start each service, and the clients to power the ui
* Visit `localhost:3000` on your browser and see the magic
* Add a few users and a few posts

