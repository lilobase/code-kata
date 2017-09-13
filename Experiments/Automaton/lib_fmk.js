const merge = (a, b) => {
    if(a.length === 0 || b.length === 0) return a.concat(b);

    let head, rest;

    if(a[0] < b[0]) {
        head = a[0];
        rest = [a.slice(1), b]
    } else {
        head = b[0];
        rest = [a, b.slice(1)]
    }

    return [head, ...merge(...rest)];
};

const merged = merge([1, 2, 5, 8], [3, 4, 6, 7]);
console.log('merge', merged);

const sum = list => {
    const indivisible = list => list.length === 0;
    const neutral = () => 0;
    const divide = ([head, ...rest]) => [head, rest];
    const combine = (a, b) => a + b;

    if(indivisible(list)) return neutral();

    const [head, rest] = divide(list);
    const right = sum(rest);

    return combine(head, right);
};

const summed = sum([42, 3 -1]);
console.log('sum', summed);

const linrec = (indivisble, neutral, divide, combine) =>
    function rec(value) {
        if(indivisble(value)) return neutral(value);
        const [head, rest] = divide(value);
        const right = rec(rest);

        return combine(head, right);
};

const sumLinRec = linrec(
    list => list.length === 0,
    () => 0,
    ([head, ...rest]) => [head, rest],
    (a, b) => a + b
);

const summedLinRec = sumLinRec([42, 3 -1]);
console.log('sumLinRec', summedLinRec);

const mergeLinRec = linrec(
    ([a, b]) =>  a.length === 0 || b.length === 0,
    ([a, b]) => a.concat(b),
    (x) => {
        const [a, b] = x;
        let head, rest;

        if(a[0] < b[0]) {
            head = a[0];
            rest = [a.slice(1), b]
        } else {
            head = b[0];
            rest = [a, b.slice(1)]
        }

        return [head, rest];
    },
    (a, b) => [a, ...b]
);

const mergedLinRec = mergeLinRec([[1, 2, 5, 8], [3, 4, 6, 7]]);
console.log('mergeLinRec', mergedLinRec);

const binrec = (indivisble, neutral, divide, combine) =>
    function rec(...value) {
        if(indivisble(...value)) return neutral(...value);
        const [left, right] = divide(...value);
        const recLeft = rec(...left);
        const recRight = rec(...right);

        return combine(recLeft, recRight);
};

const binRecMergeSort = binrec(
    a => a.length === 1,
    a => a,
    a => [[a.slice(0, a.length/2)], [a.slice(a.length/2)]],
    (a, b) => mergeLinRec([a, b])
);

const binRecMergedSort = binRecMergeSort([3, 42, 5, 1]);
console.log('binRecMergeSort', binRecMergedSort);


const mapWith = fn => function* (iterable) {
    for(const element of iterable) {
        yield fn(element);
    }
};

const multirec = (indivisble, neutral, divide, combine) => function rec(values) {
    if(indivisble(values)) return neutral(values);

    const parts = divide(values);
    const solutions = mapWith(rec)(parts);

    return combine(solutions);
};

const multirecMergeSort = multirec(
    a => a.length === 1,
    a => a,
    a => [a.slice(0, a.length/2), a.slice(a.length/2)],
    ([a, b]) => mergeLinRec([a, b])
);

const multirecMergesSort = multirecMergeSort([3, 42, 5, 1]);
console.log('multirecMergeSort', multirecMergesSort);