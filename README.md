How to run an application on your local machine.
1. Preconditions
- node.js
- npm
- java17
- maven
2. Run "mvn clean install" from the root directory. Under the hood it does the following operations:
- npm install
- npm run build
- clean resources/static/public in spring-boot project
- copy new reactjs build to resources/static/public
- build spring boot application
3. Run spring boot application
4. Enjoy

By default, app uses in-memory DB.
There are two hardcoded users in the app
user1 / password [ROLE_ALLOW_EDIT]
user2 / password [ROLE_READ_ONLY]