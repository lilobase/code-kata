

const sides_surface = ([a, b, c], acc = []) => (acc.length == 3) ? acc : sides_surface([b, c, a], acc.concat([a * b * 2]));
const smallest_side = (sides) => Math.min(...sides);
const gift_surface = (sides) => {
    sides = sides_surface(sides);
    return sides.reduce((a, i) => (a + i)) + smallest_side(sides) / 2;
};



