import Q from 'q';
import toArray from 'lodash-node/modern/collections/toArray';

export default function nodeifyFunction(promiseReturningFn) {
    // ES5 function so we can access the arguments of *this* function
    return function () {
        var callback = arguments[arguments.length - 1];
        var argumentsWithoutCallback = toArray(arguments).slice(0, -1);
        var promise = promiseReturningFn(...argumentsWithoutCallback);
        // Cast to Q so we can use the nodeify helper
        Q(promise).nodeify(callback);
    };
}
