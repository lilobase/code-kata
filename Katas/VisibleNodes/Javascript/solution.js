const higherThan = ({l, r, v}, highestValue = 0) => {
    let acc = 0;

    if (v >= highestValue) {
        highestValue = v;
        acc = acc + 1;
    }

    if(l !== null) acc = acc + higherThan(l, highestValue);
    if(r !== null) acc = acc + higherThan(r, highestValue);

    return acc;
};

console.log(higherThan(tree));
