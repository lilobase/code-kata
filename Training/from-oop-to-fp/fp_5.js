const sides_surface = ([a, b, c], acc = []) => (acc.length == 3) ? acc : sides_surface([b, c, a], acc.concat([a * b * 2]));
const gift_surface = (sides) => ((((s) => (s.reduce((a, i) => (a + i)) + Math.min(...s) / 2))(sides_surface(sides))));
