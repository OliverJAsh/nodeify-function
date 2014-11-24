# nodeify-function

Q helper for nodeifying a promise returning function.

This method is useful for creating dual promise/callback APIs, i.e. APIs that
return promises but also accept Node.js-style callbacks. [Q provides a helper
for nodeifying promises:
`promise.nodeify(callback)`](https://github.com/kriskowal/q/wiki/API-Reference#promisenodeifycallback).
This function is the inverse: rather than nodeifying the promise, we can simply
nodeify the function containing the promise. For example:

``` js
var createUser = function (userName, userData) {
    return database.ensureUserNameNotTaken(userName)
        .then(function () {
            return database.saveUserData(userName, userData);
        });
}

createUser('Bob', { age: 42 })
    .then(function (result) {
        // …
    }, function (error) {
        // …
    });

// Without `nodeifyFunction`

var createUserNodeified = function (userName, userData, callback) {
    createUser(userName, userData)
        .nodeify(callback);
};

// With `nodeifyFunction`: a Q helper that abstracts the above into a
// higher-order function

var nodeifyFunction = require('nodeify-function');

var createUserNodeified = nodeifyFunction(createUser);

createUserNodified('Bob', { age: 42 }, function (error, result) {
    // …
});
```

## Installation

```
npm install nodeify-function
```
