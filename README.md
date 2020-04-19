# unit-dom-protractor-test-poc
This Repo showcase the POC for Various Tests in Angular

This POC showcase below test:
Unit Test - This test is written using Jasmine and Karma
DOM Test- This test is written using Jasmine and Karma
E2E Test- This test is written using Protractor, Cucumber and Chai. This also uses protractor-cucumber-framework NPM framework which eases the configuration.

What is Jasmine and Karma?
Jasmine is a Behavior Driven Development (BDD) testing framework for JavaScript. It does not rely on any browsers, DOM, or JavaScript frameworks. Therefore, it’s suited for websites, Node.js projects, or anywhere JavaScript can run on. It also has runners in Python and Ruby, which  can assist you incredibly if you want to run your client-side tests alongside your server-side ones.
Karma is essentially a simple open source tool that allows you to execute JavaScript code in multiple browsers. It spawns a web server that executes source code against test code for each of the browsers connected. The results of each test against each browser are examined and displayed via the command line to the developer in order to reveal which browsers and tests passed or failed.
Jasmine
Jasmine is full of handy matchers:

Jasmine jQuery– Provides matchers for jQuery objects, and an easy way to build HTML fixtures to test with.
Underscore Matchers for Jasmine– Provides matchers based on the methods in Underscore.js. Particularly useful for Backbone projects.
AngularJS Matchers- Provides matchers for working with the AngularJS framework.
You can write your own customized matchers.
Matcher	Description
toBe	Compares actual and expected with ===
toEqual	Compares simple object literals that === cannot
toMatch	Compares actual value against a regular expression
toBeDefined	Checks to see if the actual value is defined
toBeUndefined	Checks to see if the actual value is undefined
toBeNull	Checks to see if the actual value is null
toBeTruthy	Checks to see if the actual value coerces to true
toBeFalsy	Checks to see if the actual value coerces to false
toContain	Checks to see if an array contains the expected value
toBeLessThan	Self-explanatory
toBeGreaterThan	Self-explanatory
toBeCloseTo	For precision math comparisons on floating point numbers
toThrow	Checks to see if an error is thrown
toHaveBeenCalled	Checks to see if the spy was called
toHaveBeenCalledWith	Checks to see if the spy was called with the expected parameters
jasmine.any- A helper that lets you match against a constructor or “class”.
Spies- Are incredibly powerful, they can be used to fake objects and functions in more ways than we have time to cover.
Async testing support- Jasmine offers a handy function called “callFake()”. In your beforeEach, you can setup the functions to spyOn, but you can also add a callFake- you are able to inject a call into the end of the function, and tell Jasmine the test is done, by calling done.
Jasmine’s introduction- Is mostly good; although, it isn’t the simplest if you’re new to Jasmine. The greatest thing about it is the fully descriptive examples.
Writing specs in CoffeeScript makes them easier to read. Specs can run as part of CI test suite, just like your back end code. You don’t have to run a browser to see what’s going on- you can automatically kick start your specs every time you save and the ability to get an instant feedback makes it much easier to keep moving you forward in your process.

Reference: https://blog.testproject.io/2016/08/14/javascript-unit-testing-with-tdd-jasmine-and-karma/








