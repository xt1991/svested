### BE

- Required : Nodejs, npm, MongoDB
- Set up "cd be & npm i"
- Seed "npm run seed"
- run test "npm run test"
- run test cov "npm run test:cov"
- run start "npm run start"

Note:

- I prefer use mongoDB for BE
- Run test use mongodb-memory-server , so you no need set up DB for E2E testing
- I don't have too much time for code test , so the BE lack of Auth
- The unit test cov must be above 90%

### FE

- Required : Nodejs, npm
- Set up "cd fe & npm i"
- run start "npm run start"

Note:

- The BE need start first then FE after
- I don't have too much time for code test , so the BE lack of unit test and the layout not look pretty
