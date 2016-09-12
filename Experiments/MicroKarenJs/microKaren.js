//based on the work of https://github.com/willkurt/microKanren.js/blob/master/microKanren.js and https://github.com/zaach/ukanren.js/blob/master/index.js

class LogicVar {
    constructor(name) {
        this.name = name;
        this.index = this.index.bind(this);
        this.equals = this.equals.bind(this);
        this.toString = this.toString.bind(this);
    }
    index() { return this.name; }
    equals(otherLVar) { return this.index() === otherLVar.index()}
    toString() { return `Lvar: "${this.index()}"`; }
}

const lvarPrettyPrint = (lvar) => (lvar instanceof LogicVar) ? lvar.toString() : lvar;
const lvar = (i) => new LogicVar(i);

const fail = () => [];
const succeed = (subset) => [subset];

const emptySubset = {};
const run = (f) => f(emptySubset);

const extract = (terms, subset) => {
    const term = terms instanceof LogicVar && subset[terms.index()];
    return term ? extract(term, subset) : terms;
};

const extendSubset = (term, value, subset) => {
    const copy = {...subset};
    copy[term.index()] = lvarPrettyPrint(value);
    return copy;
};

const flatten = (arr) => arr.reduce((acc, item) => acc.concat(...item), []);
const and = (f, g) => (subset) => flatten(f(subset).map(g));
const or = (f, g) => (subset) => [...f(subset), ...g(subset)];

const unify = (t1, t2, subset) => {
    t1 = extract(t1, subset);
    t2 = extract(t2, subset);
    return (
        t1 === t2 ? subset :
        t1 instanceof LogicVar ? extendSubset(t1, t2, subset) :
        t2 instanceof LogicVar ? extendSubset(t2, t1, subset) :
        false
    );
};

const equal = (t1, t2) => (subset) => {
    const extendedSubset = unify(t1, t2, subset);
    return extendedSubset ? succeed(extendedSubset) : fail();
};



describe('microKaren', () => {

    it('finds a single value', () => {
        console.log(' ====== finds a single value ===== ');
        const lvar_a = lvar('a');
        const rules = equal(lvar_a, 5);
        expect(
            run(rules)
        ).toEqual([{a: 5}]);
    });

    it('finds a single value by a = b = c', () => {
        const lvar_a = lvar('a');
        const lvar_b = lvar('b');
        const rules = and(equal(lvar_a, lvar_b), equal(lvar_b, 5));
        expect(
            run(rules)
        ).toEqual([{ a: 'Lvar: "b"', b: 5 }]);
    });

    it('finds two values', () => {
        const lvar_a = lvar('a');
        const rules = or(equal(lvar_a, 5), equal(lvar_a, 3));
        expect(
            run(rules)
        ).toEqual([{a: 5}, {a: 3}]);
    });

    it('finds two sets of solutions', () => {
        const lvar_a = lvar('a');
        const lvar_b = lvar('b');
        const rules = and(equal(lvar_a, 7), or(equal(lvar_b, 3), equal(lvar_b, 5)));
        expect(
            run(rules)
        ).toEqual([{a: 7, b: 3}, {a: 7, b: 5}]);
    });

    const father = (x, y) => or(
        and(equal(x, 'mcbob'), equal(y, 'bob')),
        and(equal(x, 'bob'), equal(y, 'bill'))
    );

    const grandfather = (x, y) => {
        const lvar_z = lvar('father');
        return and(father(x,lvar_z), father(lvar_z, y));
    };

    it('finds the grandfather', () => {
        expect(
            run(grandfather(lvar('grandfather'), lvar('grandchildren')))
        ).toEqual([{ grandfather: 'mcbob', father: 'bob', grandchildren: 'bill' }]);

    });

});