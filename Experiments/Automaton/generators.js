const Empty = function* () {};

const just = function* (...values) {
    yield * values;
};

const first = iterable => {
    const iterator = iterable[Symbol.iterator]();
    const {done, value} = iterator.next();
    if(!done) return value;
};

const rest = function* (iterable) {
    const iterator = iterable[Symbol.iterator]();
    iterator.next();
    yield * iterator;
};

const split = iterable => {
    const iterator = iterable[Symbol.iterator]();
    const {done, value: first} = iterator.next();

    if(done) return { rest: []};

    return {
        first,
        rest: iterator
    };
};

const join = function* (first, rest) {
    yield first;
    yield * rest;
};

const take = function* (takeNumber, iterable) {
    const iterator = iterable[Symbol.iterator]();

    for(let i = 0; i < takeNumber; i++) {
        const { done, value } = iterator.next();
        if(done) return;

        yield value;
    }
};

const inifiniteNumberOf = function* (n) {
    yield * join(n, inifiniteNumberOf(n));
};

const from = function* (first, increment = 1) {
    yield * join(first, from(first + increment, increment));
};

const sequence = function* (first, nextFn = e => e) {
    yield * join(first, sequence(nextFn(first), nextFn));
};

const sequencePairs = function* (first, second, nextFn = (x, y) => y) {
    yield * join(first, sequencePairs(second, nextFn(first, second), nextFn));
};

const mapWithDummy = function* (fn, iterable) {
    const {first, rest} = split(iterable);

    if(first === undefined) return;

    yield * join(fn(first), mapWith(fn, rest));
};

const filterWith = function* (fn, iterable) {
    const {first, rest} = split(iterable);

    if(fn(first))
        yield first;

    yield * filterWith(fn, rest);
};

const primes = function* (numbers = from(2)) {
    const {first, rest} = split(numbers);

    yield * join(first, filterWith(n => n % first !==0, primes(rest)));
};

const zipWith = function* (fn, ...iterables) {
    const asSplits = iterables.map(split);

    if(asSplits.every(asSplit => asSplit.hasOwnProperty('first'))) {
        const firsts = asSplits.map(asSplit => asSplit.first);
        const rests = asSplits.map(asSplit => asSplit.rest);

        yield * join(fn(...firsts), zipWith(fn, ...rests));
    }
};

const mapWith = zipWith;

const greetings = zipWith(
    (x,y) => `${x} ${y}`,
    ['hello', 'bonjour', 'hej'],
    ['frenck', 'arnaud', 'pascal']
);

const fibonacci2 = function* () {
    yield 0;
    yield 1;
    yield * zipWith(
        (x,y) => x + y,
        fibonacci2(),
        rest(fibonacci2())
    );
};

const phi = function* () {
    yield * rest(
        zipWith(
            (x, y) => x / y,
            rest(fibonacci2()),
            fibonacci2()
        )
    )
};

const reciprocals = zipWith(n => 1/n, phi());

const zipWithStateful = function* (fn, ...iterables) {
    const iterators = iterables.map(iterable => iterable[Symbol.iterator]());

    while(true) {
        const pairs = iterators.map(iterator => iterator.next());
        const values = pairs.map(pair => pair.value);
        const dones = pairs.map(pair => pair.done);

        if(dones.find(e => e)) return;

        yield fn(...values);
    }
};

const slices = function*(length, iterable) {
    const iterator = iterable[Symbol.iterator]();
    let buffer = [...take(length, iterator)];

    if (buffer.length < length) return;

    let nextElementIndex = 0;

    while(true) {
        yield buffer;

        const {value, done} = iterator.next();
        if(done) return;

        buffer = buffer.slice(1);
        buffer.push(value);
    }
};

const fibonacci3 = function* () {
    yield 0;
    yield 1;
    yield * mapWith(
        ([a, b]) => a + b,
        slices(2, fibonacci3())
    );
};

const phi2 = function* () {
    yield * rest(
        mapWith(
            ([a, b]) => a / b,
            slices(2, fibonacci3())
        )
    );
};

const within = tolerance => ([a, b]) => Math.abs(a - b) <= tolerance;

//const firstWhen = (fn, iterable) => first(filterWith(fn, iterable));

const compose = (a, b) => (...args) => a(b(...args));

const firstWhen = compose(first, filterWith);


const pairsOfPhi = slices(2, phi2());
const firstPairWithinTolerance = firstWhen(within(0.0000001), pairsOfPhi);
const [_, estimate] = firstPairWithinTolerance;

/*
const restWhen = function* (fn, iterable) {
    yield * rest(filterWith(fn, iterable));
};
*/

const restWhen = compose(rest, filterWith);

const squares = mapWith(a => a * a, from(1));
const isOdd = n => n % 2 === 1;

const infiniteNumberOfImp = something => {
    while(true) {
        yield something;
    }
};

const plentyOf = something => () => something;

const exponentsOfTwo = function* () {
    let exponent = 0;

    while(true) {
        yield Math.pow(2, exponent++);
    }
};

const powersOfTwo = () => {
    let exponent = 0;

    return () => Math.pow(2, exponent++);
};



for(something of restWhen(isOdd, squares))
    console.log(something);