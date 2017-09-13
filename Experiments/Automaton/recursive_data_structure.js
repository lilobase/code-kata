const mapWith = fn => function* (iterable) {
    for (const element of iterable)
        yield fn(element);
};

const multirec = ({indivisible, value, divide, combine}) => function rec(input) {
    if (indivisible(input)) return value(input);

    const parts = divide(input);
    const solutions = mapWith(rec)(parts);

    return combine(solutions);
};

const hasLengthOne = square => square.length === 1;
const itself = something => something;
const firstHalf = a => a.slice(0, a.length / 2);
const secondHalf = a => a.slice(a.length / 2);

const divideSquareIntoRegions = square => {
    const upperHalf = firstHalf(square);
    const lowerHalf = secondHalf(square);

    const upperLeft = upperHalf.map(firstHalf);
    const upperRight = upperHalf.map(secondHalf);
    const lowerRight = lowerHalf.map(secondHalf);
    const lowerLeft = lowerHalf.map(firstHalf);

    return [upperLeft, upperRight, lowerRight, lowerLeft];
};

const split = iterable => {
    const iterator = iterable[Symbol.iterator]();
    const {done, value: first} = iterator.next();

    if (done) return {rest: []};

    return {first, rest: iterator};
};

const join = function* (first, rest) {
    yield first;
    yield* rest;
};

const zipWith = function* (fn, ...iterables) {
    const asSplits = iterables.map(split);

    if (asSplits.every(asSplit => asSplit.hasOwnProperty('first'))) {
        const firsts = asSplits.map(asSplit => asSplit.first);
        const rests = asSplits.map(asSplit => asSplit.rest);

        yield* join(fn(...firsts), zipWith(fn, ...rests));
    }
};

const concat = (...arrays) => arrays.reduce((acc, a) => acc.concat(a));

const rotateAndCombineArrays = ([upperLeft, upperRight, lowerRight, lowerLeft]) => {
    [upperLeft, upperRight, lowerRight, lowerLeft] = [lowerLeft, upperLeft, upperRight, lowerRight];

    const upperHalf = [...zipWith(concat, upperLeft, upperRight)];
    const lowerHalf = [...zipWith(concat, lowerLeft, lowerRight)];

    return concat(upperHalf, lowerHalf);
};

const square = [
    ['⚪️', '⚪️', '⚪️', '⚪️'],
    ['⚪️', '⚪️', '⚪️', '⚪️'],
    ['⚪️', '⚪️', '⚪️', '⚫️'],
    ['⚪️', '⚪️', '⚪️', '⚫️']
];

const rotate = multirec({
    indivisible: hasLengthOne,
    value: itself,
    divide: divideSquareIntoRegions,
    combine: rotateAndCombineArrays
});

const quadTree = {
    ul: {ul: '⚪️', ur: '⚫️', lr: '⚪️', ll: '⚪️'},
    ur: {ul: '⚪️', ur: '⚪️', lr: '⚪️', ll: '⚫️'},
    lr: {ul: '⚫️', ur: '⚪️', lr: '⚪️', ll: '⚪️'},
    ll: {ul: '⚫️', ur: '⚫️', lr: '⚪️', ll: '⚪️'}
};

const isString = something => typeof something === 'string';
const quadTreeToRegions = qt => [qt.ul, qt.ur, qt.lr, qt.ll];
const regionsToRotateQuadTree = ([ur, lr, ll, ul]) => ({ul, ur, lr, ll});

const rotateQuadTree = multirec({
    indivisible: isString,
    value: itself,
    divide: quadTreeToRegions,
    combine: regionsToRotateQuadTree
});

const isOneByOneArray = something =>
    Array.isArray(something) && something.length === 1 &&
    Array.isArray(something[0]) && something[0].length === 1;

const contentsOfOneByOneArray = array => array[0][0];
const regionsToQuadTree = ([ul, ur, lr, ll]) => ({ul, ur, lr, ll});

const arrayToQuadTree = multirec({
    indivisible: isOneByOneArray,
    value: contentsOfOneByOneArray,
    divide: divideSquareIntoRegions,
    combine: regionsToQuadTree
});

const isSmallestActualSquare = square => isString(square.ul);
const asTwoDimensionalArray = ({ul, ur, lr, ll}) => [[ul, ur], [ll, lr]];
const regions = ({ul, ur, lr, ll}) => [ul, ur, lr, ll];

const combineFlatArrays = ([ul, ur, lr, ll]) => {
    const uh = [...zipWith(concat, ul, ur)];
    const lh = [...zipWith(concat, ll, lr)];

    return concat(uh, lh);
};

const quadTreeToArray = multirec({
    indivisible: isSmallestActualSquare,
    value: asTwoDimensionalArray,
    divide: regions,
    combine: combineFlatArrays
});

const superImposeQuadTree = multirec({
    indivisible: ({l, r}) => isString(l),
    value: ({l, r}) => r === '⚫️' ? r : l,
    divide: ({l, r}) => [
        {l: l.ul, r: r.ul},
        {l: l.ur, r: r.ur},
        {l: l.lr, r: r.lr},
        {l: l.ll, r: r.ll}
    ],
    combine: ([ul, ur, lr, ll]) => ({ul, ur, lr, ll})
});

const canvas = [
    ['⚪️', '⚪️', '⚪️', '⚪️'],
    ['⚪️', '⚪️', '⚪️', '⚪️'],
    ['⚪️', '⚪️', '⚪️', '⚫️'],
    ['⚪️', '⚪️', '⚪️', '⚫️']
];

const glider = [
    ['⚪️', '⚪️', '⚪️', '⚪️'],
    ['⚪️', '⚫️', '⚪️', '⚪️'],
    ['⚫️', '⚪️', '⚪️', '⚪️'],
    ['⚫️', '⚫️', '⚫️', '⚪️']
];

const colour = something => {
    if(something.colour !== null) return something.colour;
    if(something === '⚪️') return '⚪️';
    else if(something === '⚫️') return '⚫️';
    else throw "Can't get the colour of this thing";
};

const combinedColour = (...elements) => elements.reduce((acc, element) => acc === element ? element : '❓');

const colouredRegionsToQuadTree = ([ul, ur, lr, ll]) => ({
    ul, ur, lr, ll,
    colour: combinedColour(ul, ur, lr, ll)
});

const colouredArrayToQuadTree = multirec({
    indivisible: isOneByOneArray,
    value: contentsOfOneByOneArray,
    divide: divideSquareIntoRegions,
    combine: regionsToQuadTree
});

const eitherAreEntirelyColoured = ({l, r}) => colour(l) !== '❓' || colour(r) !== '❓';
const superImposedColoured = ({l, r}) => {
    if(colour(l) === '⚪️' || colour(r) === '⚫️') return r;
    else if(colour(l) === '⚫️' || colour(r) === '⚪️') return l;
    else throw "Can't superimpose these things";
};
const divideTwoQuadTrees = ({l, r}) => [
    {l: l.ul, r: r.ul},
    {l: l.ur, r: r.ur},
    {l: l.lr, r: r.lr},
    {l: l.ll, r: r.ll}
];
const combineColouredRegions = ([ul, ur, lr, ll]) => ({
   ul, ur, ll, colour: combinedColour(ul, ur, lr, ll)
});

const superImposeColouredQuadTrees = multirec({
    indivisible: eitherAreEntirelyColoured,
    value: superImposedColoured,
    divide: divideTwoQuadTrees,
    combine: combineColouredRegions
});

const isEntirelyColoured = something => colour(something) !== '❓';

const rotateColouredQuadTree = multirec({
    indivisible: isEntirelyColoured,
    value: itself,
    divide: quadTreeToRegions,
    combine: regionsToRotateQuadTree
});

/*
console.log(quadTreeToArray(
    superImposeQuadTree({
        l: arrayToQuadTree(canvas),
        r: arrayToQuadTree(glider)
    })
));
*/


module.exports = {
    multirec,
    isString,
    mapWith,
    arrayToQuadTree,
    quadTreeToArray,
    isOneByOneArray,
    divideSquareIntoRegions,
    contentsOfOneByOneArray
};