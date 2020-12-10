const multirec = ({indivisible, value, divide, combine}) => function rec(input) {
    if (indivisible(input)) return value(input);

    const parts = divide(input);
    const solutions = mapWith(rec)(parts);

    return combine(solutions);
};

const quadTreeToArray = multirec({
    indivisible: isSmallestActualSquare,
    value: asTwoDimensionalArray,
    divide: regions,
    combine: combineFlatArrays
});

const firstHalf = a => a.slice(0, a.length / 2);
const secondHalf = a => a.slice(a.length / 2);
const isString = something => typeof something === 'string';

const divideSquareIntoRegions = square => {
    const upperHalf = firstHalf(square);
    const lowerHalf = secondHalf(square);

    const upperLeft = upperHalf.map(firstHalf);
    const upperRight = upperHalf.map(secondHalf);
    const lowerRight = lowerHalf.map(secondHalf);
    const lowerLeft = lowerHalf.map(firstHalf);

    return [upperLeft, upperRight, lowerRight, lowerLeft];
};

const contentsOfOneByOneArray = array => array[0][0];

const isOneByOneArray = something =>
    Array.isArray(something) && something.length === 1 &&
    Array.isArray(something[0]) && something[0].length === 1;

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

const W = '⚪';
const B = '⚫';

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

const KEY = Symbol('Key');
const simpleKey = something => isString(something) ? something : something[KEY];

const compositeKey = (...regions) => regions.map(simpleKey).join('');

const quadtree = memoized((ul, ur, lr, ll) => ({ul, ur, lr, ll, [KEY]: compositeKey(ul, ur, lr, ll)}), compositeKey);

const regionsToQuadTree = ([ul, ur, lr, ll]) =>
    quadtree(ul, ur, lr, ll);

const arrayToQuadTree = multirec({
    indivisible: isOneByOneArray,
    value: contentsOfOneByOneArray,
    divide: divideSquareIntoRegions,
    combine: regionsToQuadTree
});

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

const upperleft = square => square.ul;
const upperright = square => square.ur;
const lowerright = square => square.lr;
const lowerleft = square => square.ll;
const uppercentre = square => quadtree(square.ul.ur, square.ur.ul, square.ur.ll, square.ul.lr);
const rightmiddle = square => quadtree(square.ur.ll, square.ur.lr, square.lr.ur, square.lr.ul);
const lowercentre = square => quadtree(square.ll.ur, square.lr.ul, square.lr.ll, square.ll.lr);
const leftmiddle = square => quadtree(square.ul.ll, square.ul.lr, square.ll.ur, square.ll.ul);
const middlecentre = square => quadtree(square.ul.lr, square.ur.ll, square.lr.ul, square.ll.ur);

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

const is2x2 = square => isString(square.ul);

const divideQuadTreeIntoRegion = ({ul, ur, lr, ll}) => [ul, ur, lr, ll];

const blank4x4 = quadtree(W, W, W, W);

const blankCopy = memoizedMultiRec({
    indivisible: is2x2,
    value: () => blank4x4,
    divide: divideQuadTreeIntoRegion,
    combine: regionsToQuadTree
});

const double = square => {
    const padding = blankCopy(square.ul);
    const ul = quadtree(padding, padding, square.ul, padding);
    const ur = quadtree(padding, padding, padding, square.ur);
    const lr = quadtree(square.lr, padding, padding, padding);
    const ll = quadtree(padding, square.ll, padding, padding);

    return quadtree(ul, ur, lr, ll);
};

function automaton({Br, Sr}) {
    const applyRuleToCell = (pixel, blackNeighbours) => (pixel === W) ?
        Br.includes(blackNeighbours) ? B : W :
        Sr.includes(blackNeighbours) ? B : W;

    const applyRuleTo4x4 = (sq) => quadtree(
        applyRuleToCell(sq.ul.lr, countNeighbouringBlack(neighboursOfUlLr(sq))),
        applyRuleToCell(sq.ur.ll, countNeighbouringBlack(neighboursOfUrLl(sq))),
        applyRuleToCell(sq.lr.ul, countNeighbouringBlack(neighboursOfLrUl(sq))),
        applyRuleToCell(sq.ll.ur, countNeighbouringBlack(neighboursOfLlUr(sq)))
    );

    return memoizedDoubleMultirec({
        indivisible: is4x4,
        value: applyRuleTo4x4,
        divide: divideQuadtreeIntoNine,
        subcombine: combineNineIntoNonetTree,
        subdivide: divideNonetTreeIntoQuadTrees,
        combine: regionsToQuadTree
    })
}

const conwaysGameOfLife = automaton({Br: [3], Sr: [2, 3]});

const origin = arrayToQuadTree([
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚫', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
    ['⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪', '⚪'],
]);

let currentGen = double(origin);
setInterval(() => {
    console.clear();
    let display = quadTreeToArray(currentGen).map(item => item.join(" ")).join("\n");
    console.log(display);
    console.log("\n");
    currentGen = conwaysGameOfLife(double(currentGen));
}, 1000);