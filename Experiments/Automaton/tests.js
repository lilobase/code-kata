//const {multirec, mapWith, isString, itself, quadTreeToRegions, regionsToRotateQuadTree, arrayToQuadTree, quadTreeToArray} = module.require('./recursive_data_structure');

const {mapWith, multirec, isString, arrayToQuadTree} = module.require('./recursive_data_structure.js');

function split (iterable) {
    const iterator = iterable[Symbol.iterator]();
    const { done, value: first } = iterator.next();

    if (done) {
        return { rest: [] };
    } else {
        return { first, rest: iterator };
    }
};

function * join (first, rest) {
    yield first;
    yield * rest;
};

function * zipWith (fn, ...iterables) {
    const asSplits = iterables.map(split);

    if (asSplits.every((asSplit) => asSplit.hasOwnProperty('first'))) {
        const firsts = asSplits.map((asSplit) => asSplit.first);
        const rests = asSplits.map((asSplit) => asSplit.rest);

        yield * join(fn(...firsts), zipWith(fn, ...rests));
    }
}

const concat = (...arrays) => arrays.reduce((acc, a) => acc.concat(a));


const KEY = Symbol('key');


const firstHalf = (array) => array.slice(0, array.length / 2);
const secondHalf = (array) => array.slice(array.length / 2);

const memoized = (fn, keymaker = JSON.stringify) => {
    const lookupTable = new Map();

    return function (...args) {
        const key = keymaker.apply(this, args);

        return lookupTable[key] || (lookupTable[key] = fn.apply(this, args));
    }
};

const simpleKey = (something) =>
    isString(something)
        ? something
        : something[KEY];

const compositeKey = (...regions) => regions.map(simpleKey).join('');

const quadtree = memoized(
    (ul, ur, lr, ll) => ({ ul, ur, lr, ll, [KEY]: compositeKey(ul, ur, lr, ll) }),
    compositeKey
);

const divideSquareIntoRegions = (square) => {
    const upperHalf = firstHalf(square);
    const lowerHalf = secondHalf(square);

    const upperLeft = upperHalf.map(firstHalf);
    const upperRight = upperHalf.map(secondHalf);
    const lowerRight = lowerHalf.map(secondHalf);
    const lowerLeft= lowerHalf.map(firstHalf);

    return [upperLeft, upperRight, lowerRight, lowerLeft];
};

const contentsOfOneByOneArray = (array) => array[0][0];


function memoizedMultirec({ indivisible, value, divide, combine, key }) {
    const myself = memoized((input) => {
        if (indivisible(input)) {
            return value(input);
        } else {
            const parts = divide(input);
            const solutions = mapWith(myself)(parts);

            return combine(solutions);
        }
    }, key);

    return myself;
}

const regionsToQuadTree = ([ul, ur, lr, ll]) =>
    quadtree(ul, ur, lr, ll);

const isOneByOneArray = (something) =>
    Array.isArray(something) && something.length === 1 &&
    Array.isArray(something[0]) && something[0].length === 1;

const neighboursOfUlLr = (square) => [
    square.ul.ul, square.ul.ur, square.ur.ul, square.ur.ll,
    square.lr.ul, square.ll.ur, square.ll.ul, square.ul.ll
];
//=> "0126A984"

const neighboursOfUrLl = (square) => [
    square.ul.ur, square.ur.ul, square.ur.ur, square.ur.lr,
    square.lr.ur, square.lr.ul, square.ll.ur, square.ul.lr
];
//=> "1237BA95"

const neighboursOfLrUl = (square) => [
    square.ul.lr, square.ur.ll, square.ur.lr, square.lr.ur,
    square.lr.lr, square.lr.ll, square.ll.lr, square.ll.ur
];
//=> "567BFED9"

const neighboursOfLlUr = (square) => [
    square.ul.ll, square.ul.lr, square.ur.ll, square.lr.ul,
    square.lr.ll, square.ll.lr, square.ll.ll, square.ll.ul
];
//=> "456AEDC8"


const countNeighbouringBlack = (neighbours) =>
    neighbours.reduce((c, n) => n === '⚫️' ? c + 1 : c, 0);

const B = [5, 6, 7, 8];
const S  = [4, 5, 6, 7, 8];

const averagedPixel = (pixel, blackNeighbours) =>
    (pixel === '⚪️')
        ? B.includes(blackNeighbours) ? '⚫️' : '⚪️'
: S.includes(blackNeighbours) ? '⚫️' : '⚪️';

const averageOf4x4 = (sq) => quadtree(
    averagedPixel(sq.ul.lr, countNeighbouringBlack(neighboursOfUlLr(sq))),
    averagedPixel(sq.ur.ll, countNeighbouringBlack(neighboursOfUrLl(sq))),
    averagedPixel(sq.lr.ul, countNeighbouringBlack(neighboursOfLrUl(sq))),
    averagedPixel(sq.ll.ur, countNeighbouringBlack(neighboursOfLlUr(sq)))
);

const upperleft = (square) =>
    square.ul;

const upperright = (square) =>
    square.ur;

const lowerright = (square) =>
    square.lr;

const lowerleft = (square) =>
    square.ll;

const uppercentre = (square) =>
    quadtree(square.ul.ur, square.ur.ul, square.ur.ll, square.ul.lr);

const rightmiddle = (square) =>
    quadtree(square.ur.ll, square.ur.lr, square.lr.ur, square.lr.ul);

const lowercentre = (square) =>
    quadtree(square.ll.ur, square.lr.ul, square.lr.ll, square.ll.lr);

const leftmiddle = (square) =>
    quadtree(square.ul.ll, square.ul.lr, square.ll.ur, square.ll.ul);

const middlecentre = (square) =>
    quadtree(square.ul.lr, square.ur.ll, square.lr.ul, square.ll.ur);

const is4x4 = (square) => isString(square.ul.ul);

const divideQuadtreeIntoNine = (square) => [
    upperleft(square),
    uppercentre(square),
    upperright(square),
    leftmiddle(square),
    middlecentre(square),
    rightmiddle(square),
    lowerleft(square),
    lowercentre(square),
    lowerright(square)
];


const combineNineIntoNonetTree = ([ul, uc, ur, lm, mc, rm, ll, lc, lr]) =>
    ({ ul, uc, ur, lm, mc, rm, ll, lc, lr });


const divideNonetTreeIntoQuadTrees = ({ ul, uc, ur, lm, mc, rm, ll, lc, lr }) =>
    [
        quadtree(ul, uc, mc, lm), // ul
        quadtree(uc, ur, rm, mc), // ur
        quadtree(mc, rm, lr, lc), // lr
        quadtree(lm, mc, lc, ll)  // ll
    ];

function memoizedDoubleMultirec({ indivisible, value, divide, subcombine, subdivide, combine, key }) {
    const myself = memoized((input) => {
        if (indivisible(input)) {
            return value(input);
        } else {
            const parts = divide(input);
            const solutions = mapWith(myself)(parts);
            const subcombined = subcombine(solutions);

            const subparts = subdivide(subcombined);
            const subsolutions = mapWith(myself)(subparts);

            return combine(subsolutions);
        }
    }, key);

    return myself;
}

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

const average = memoizedDoubleMultirec({
    indivisible: is4x4,
    value: averageOf4x4,
    divide: divideQuadtreeIntoNine,
    subcombine: combineNineIntoNonetTree,
    subdivide: divideNonetTreeIntoQuadTrees,
    combine: regionsToQuadTree
});

const eightByEight = arrayToQuadTree([
    ['⚫️', '⚪️', '⚪️', '⚫️', '⚫️', '⚪️', '⚪️', '⚪️'],
    ['⚪️', '⚫️', '⚫️', '⚪️', '⚪️', '⚫️', '⚫️', '⚪️'],
    ['⚪️', '⚫️', '⚪️', '⚫️', '⚪️', '⚫️', '⚪️', '⚫️'],
    ['⚪️', '⚪️', '⚫️', '⚪️', '⚫️', '⚪️', '⚫️', '⚪️'],
    ['⚪️', '⚫️', '⚪️', '⚪️', '⚪️', '⚫️', '⚪️', '⚫️'],
    ['⚫️', '⚪️', '⚫️', '⚪️', '⚫️', '⚪️', '⚫️', '⚪️'],
    ['⚪️', '⚫️', '⚫️', '⚪️', '⚪️', '⚫️', '⚫️', '⚪️'],
    ['⚫️', '⚪️', '⚪️', '⚫️', '⚪️', '⚪️', '⚪️', '⚫️']
]);

const arrays = quadTreeToArray(average(eightByEight));

console.log(arrays);