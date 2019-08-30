class Year {
    constructor(year) {
        this.year = year;
    }

    isLeap() {
        const isIntroducedEvery4years = x => x % 4 === 0;
        const butSkippedEvery100years = x => x % 100 !== 0;
        const andReintroducedEvery400years = x => x % 400 === 0;

        const isLeap = x => isIntroducedEvery4years(x) && (butSkippedEvery100years(x) || andReintroducedEvery400years(x));

        return isLeap(this.year);
    }
}

module.exports = Year;
