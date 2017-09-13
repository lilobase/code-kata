const {multirec, mapWith, isOneByOneArray, divideSquareIntoRegions, contentsOfOneByOneArray, itself, isString, quadTreeToRegions, regionsToRotateQuadTree, quadTreeToArray} = module.require('./recursive_data_structure');

const W = '⚪️';
const B = '⚫️';

const memoized = (fn, keymaker = JSON.stringify) => {
    const lookupTable = new Map();

    return (...args) => {
        const key = keymaker.apply(this, args);
        return lookupTable[key] || (lookupTable[key] = fn.apply(this, args));
    };
};

const memoizedMultiRec = ({indivisible, value, divide, combine, key}) => {
    const myself = memoized(input => {
        if (indivisible(input)) return value(input);

        const parts = divide(input);
        const solutions = mapWith(myself)(parts);

        return combine(solutions);
    }, key);

    return myself;
};

const catenateKeys = (keys) => keys.join('');

const multiRecSimpleKey = multirec({
    indivisible: isString,
    value: itself,
    divide: quadTreeToRegions,
    combine: catenateKeys
});

const KEY = Symbol('Key');
const simpleKey = something => isString(something) ? something : something[KEY];

const memoizedRotateQuadTree = memoizedMultiRec({
    indivisible: isString,
    value: itself,
    divide: quadTreeToRegions,
    combine: regionsToRotateQuadTree,
    key: simpleKey
});

const compositeKey = (...regions) => regions.map(simpleKey).join('');

const quadtree = memoized((ul, ur, lr, ll) => ({ul, ur, lr, ll, [KEY]: compositeKey(ul, ur, lr, ll)}), compositeKey);

const regionsToQuadTree = ([ul, ur, lr, ll]) =>
    quadtree(ul, ur, lr, ll);

const regionsToRotatedQuadTree = ([ur, lr, ll, ul]) => quadtree(ul, ur, lr, ll);

const arrayToQuadTree = multirec({
    indivisible: isOneByOneArray,
    value: contentsOfOneByOneArray,
    divide: divideSquareIntoRegions,
    combine: regionsToQuadTree
});

const sq = arrayToQuadTree([
    ['0', '1', '2', '3'],
    ['4', '5', '6', '7'],
    ['8', '9', 'A', 'B'],
    ['C', 'D', 'E', 'F']
]);



const neighboursOfUlLr = (square) => [
    square.ul.ul, square.ul.ur, square.ur.ul, square.ur.ll,
    square.lr.ul, square.ll.ur, square.ll.ul, square.ul.ll
];

const neighboursOfUrLl = (square) => [
    square.ul.ur, square.ur.ul, square.ur.ur, square.ur.lr,
    square.lr.ur, square.lr.ul, square.ll.ur, square.ul.lr
];

const neighboursOfLrUl = (square) => [
    square.ul.lr, square.ur.ll, square.ur.lr, square.lr.ur,
    square.lr.lr, square.lr.ll, square.ll.lr, square.ll.ur
];

const neighboursOfLlUr = (square) => [
    square.ul.ll, square.ul.lr, square.ur.ll, square.lr.ul,
    square.lr.ll, square.ll.lr, square.ll.ll, square.ll.ul
];

const countNeighbouringBlack = neighbours => neighbours.reduce((c, n) => n === B ? c + 1 : c, 0);

const BP = [5, 6, 7, 8];
const WP = [4, 5, 6, 7, 8];

const averagedPixel = (pixel, blackNeighbours) => (pixel === W)
    ? BP.includes(blackNeighbours) ? B : W
    : WP.includes(blackNeighbours) ? B : W;

const averageOf4x4 = (sq) => quadtree(
    averagedPixel(sq.ul.lr, countNeighbouringBlack(neighboursOfUlLr(sq))),
    averagedPixel(sq.ur.ll, countNeighbouringBlack(neighboursOfUrLl(sq))),
    averagedPixel(sq.lr.ul, countNeighbouringBlack(neighboursOfLrUl(sq))),
    averagedPixel(sq.ll.ur, countNeighbouringBlack(neighboursOfLlUr(sq)))
);

/*
const averaged = averageOf4x4(
    arrayToQuadTree([
        ['⚫️', '⚪️', '⚪️', '⚪️'],
        ['⚪️', '⚫️', '⚫️', '⚪️'],
        ['⚪️', '⚫️', '⚪️', '⚫️'],
        ['⚫️', '⚪️', '⚫️', '⚪️']
    ])
);
*/

const upperleft = square => square.ul;
const upperright = square => square.ur;
const lowerright = square => square.lr;
const lowerleft = square => square.ll;
const uppercentre = square => quadtree(square.ul.ur, square.ur.ul, square.ur.ll, square.ul.lr);
const rightmiddle = square => quadtree(square.ur.ll, square.ur.lr, square.lr.ur, square.lr.ul);
const lowercentre = square => quadtree(square.ll.ur, square.lr.ul, square.lr.ll, square.ll.lr);
const leftmiddle = square => quadtree(square.ul.ll, square.ul.lr, square.ll.ur, square.ll.ul);
const middlecentre = square => quadtree(square.ul.lr, square.ur.ll, square.lr.ul, square.ll.ur);

const from8x8to6x6 = sq => ({
    ul: averageOf4x4(upperleft(sq)),
    uc: averageOf4x4(uppercentre(sq)),
    ur: averageOf4x4(upperright(sq)),
    lm: averageOf4x4(leftmiddle(sq)),
    mc: averageOf4x4(middlecentre(sq)),
    rm: averageOf4x4(rightmiddle(sq)),
    ll: averageOf4x4(lowerleft(sq)),
    lc: averageOf4x4(lowercentre(sq)),
    lr: averageOf4x4(lowerright(sq)),
});

const decompose = ({ul, uc, ur, lm, mc, rm, ll, lc, lr}) => ({
    ul: quadtree(ul, uc, mc, lm),
    ur: quadtree(uc, ur, rm, mc),
    lr: quadtree(mc, rm, lr, lc),
    ll: quadtree(lm, mc, lc, ll)
});

const averages = ({ul, ur, lr, ll}) => ({
    ul: averageOf4x4(ul),
    ur: averageOf4x4(ur),
    lr: averageOf4x4(lr),
    ll: averageOf4x4(ll)
});

const centre4x4 = ({ul, ur, lr, ll}) => quadtree(ul, ur, lr, ll);

const is4x4 = square => isString(square.ul.ul);

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
    ({ul, uc, ur, lm, mc, rm, ll, lc, lr});

const divideNonetTreeIntoQuadTrees = ({ul, uc, ur, lm, mc, rm, ll, lc, lr}) => [
    quadtree(ul, uc, mc, lm), // ul
    quadtree(uc, ur, rm, mc), // ur
    quadtree(mc, rm, lr, lc), // lr
    quadtree(lm, mc, lc, ll)  // ll
];

const memoizedDoubleMultirec = ({indivisible, value, divide, subcombine, subdivide, combine, key}) => {
    const myself = memoized(input => {
        if (indivisible(input)) return value(input);

        const parts = divide(input);
        const solutions = mapWith(myself)(parts);
        const subcombined = subcombine(solutions);
        const subparts = subdivide(subcombined);
        const subsolutions = mapWith(myself)(subparts);

        return combine(subsolutions);
    }, key);

    return myself;
};

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