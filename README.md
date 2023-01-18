How to run an application on your local machine.
1. Preconditions
- node.js
- npm
- java17
- maven
- docker (optionally)
2. Run "mvn clean install" from the root directory. Under the hood it does the following operations:
- npm install
- npm run build
- clean resources/static/public in spring-boot project
- copy new reactjs build to resources/static/public
- build spring boot application
3. Run application in one of these ways:
- Use your IDE to run it as spring boot application.
- java -jar city-list-back-end/target/city-list-back-end-0.0.1-SNAPSHOT.jar
- Run docker-compose file (if you have docker locally). 
4. Open http://localhost:8080 in a web-browser.

By default, app uses in-memory H2 DB (which is re-created each time when you restart).
But if you start it via "docker compose" it uses Postgres.

There are two hardcoded users in the app
user1 / password [ROLE_ALLOW_EDIT]
user2 / password [ROLE_READ_ONLY]