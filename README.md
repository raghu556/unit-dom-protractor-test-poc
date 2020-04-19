# Unit and E2E Test Poc

This Repo showcase the POC for Various Tests in Angular

## Getting Started

This POC showcase below test:
```
Unit Test - This test is written using Jasmine and Karma
DOM Test- This test is written using Jasmine and Karma
E2E Test- This test is written using Protractor, Cucumber and Chai. This also uses protractor-cucumber-framework NPM framework which eases the configuration.
```

Reference on Syntax for Jasmine and Karma configurations: https://blog.testproject.io/2016/08/14/javascript-unit-testing-with-tdd-jasmine-and-karma/

```
Reference on E2E:
Protractor: http://www.protractortest.org/#/toc
Chai Syntax: https://www.chaijs.com/api/
Cucumber with protractor: https://semaphoreci.com/community/tutorials/getting-started-with-protractor-and-cucumber
```

### Prerequisites

Clone the project and run "npm install"

## Running the tests

For Running the unit test : "npm run test"

### Break down into end to end tests

For Running the e2e test: 
```
1:  "npm run e2e:local" - this starts the application and runs the test which may be bit slower everytime you run it.
2:  "npm run e2e:fastlocal" - 
        - For this First run the application by "npm run start or ng serve"
        - Start the BE application if applicable to your project or else jump to next step.
        - Then run "npm run e2e:fastlocal" command to run the tests.
```

## Authors

* **Raghavendra Nayak** - *Front End Developer since 2010*

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
