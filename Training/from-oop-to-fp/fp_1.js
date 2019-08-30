
const boxes = [[2, 3, 4], [1, 1, 10]];

const sides = ([a, b, c], acc = []) =>
    (acc.length == 3) ? acc
        : sides([b, c, a], acc.concat([a * b]));

const total_box_surface = (acc, box) => (
        sides => acc + sides.reduce(
            (a, b) => a + b
        ) * 2 + Math.min(...sides)
    )(sides(box)
);

const total_surface_area = boxes => boxes.reduce(total_box_surface, 0);

console.log(total_surface_area(boxes));