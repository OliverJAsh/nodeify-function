/* global it */

import nodeifyFunction from '.';
import sinon from 'sinon';
import chai from 'chai';

var { expect } = chai;

// integration tests

it('should call the callback with the fulfilled value as success when the promise is fulfilled', done => {
    var fulfilledValue = 'foo';
    var fn = () => Promise.resolve(fulfilledValue);
    var nodeifiedFunction = nodeifyFunction(fn);

    var callback = sinon.spy();

    nodeifiedFunction(callback);

    // Promise resolution is always async
    setTimeout(() => {
        expect(callback.callCount).to.equal(1);
        expect(callback.firstCall.args).to.eql([null, fulfilledValue]);
        done();
    });
});

it('should call the callback with the rejected value as error when the promise is fulfilled', done => {
    var rejectedValue = 'bar';
    var fn = () => Promise.reject(rejectedValue);
    var nodeifiedFunction = nodeifyFunction(fn);

    var callback = sinon.spy();

    nodeifiedFunction(callback);

    // Promise resolution is always async
    setTimeout(() => {
        expect(callback.callCount).to.equal(1);
        expect(callback.firstCall.args).to.eql([rejectedValue]);
        done();
    });
});
