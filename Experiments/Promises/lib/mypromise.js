/*const deferred = () => {
    let value;
    let waiter;
    let immediat = false;
    let inPromise = false;

    const wait = (a, ...b) => {
        waiter = () => a(...b);
    };


    const promise = ({
        resolve: e => {
            console.log('resolve');
            value = e;
            waiter();
        },
        reject: e => {
            console.log('reject');
            value = e;
            waiter();
        },
        then: (a, b) => {
            inPromise = true;
            if(typeof a === 'function'){
                console.log(1, a);
                wait(a, value);
            }
            else if(typeof b === 'function'){
                console.log(2, b);
                wait(b, value);
            }
            else {
                console.log(3);
            }

            if(immediat) {
                console.log('ime');
                waiter();
            }

            return promise;
        }
    });


    return ({
        resolve: e => {
            value = e;
            if(inPromise && !immediat) waiter();
            immediat = true;
        },
        reject: e => {
            value = e;
            if(inPromise && !immediat) waiter();
            immediat = true;
        },
        promise
    });
};
*/


function deferred() {
    let state = "pending";
    let value;
    let onFulfilled;
    let onRejected;

    const waiter = () => {
        let executioner = undefined;
        if (state === "fulfilled" && typeof onFulfilled === 'function') executioner = () => onFulfilled(value);
        if (state === "rejected" && typeof onRejected === 'function') executioner = () => onRejected(value);

        setImmediate(() => {
            if(executioner !== undefined) executioner();
        });
    };

    const resolve = (v) => {
        if(state !== "pending") return;
        value = v;
        state = "fulfilled";
        waiter();
    };

    const reject = (v) => {
        if(state !== "pending") return;
        value = v;
        state = "rejected";
        waiter();
    };

    const promise = () => ({
        then: (onFulfill, onReject) => {
            onRejected = onReject;
            onFulfilled = onFulfill;

            waiter();

            return promise();
        }
    });

    return {
        resolve,
        reject,
        promise: promise()
    };
}

module.exports = {
    deferred
};
