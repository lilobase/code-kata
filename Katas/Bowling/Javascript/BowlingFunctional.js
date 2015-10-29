// use it with jasmine-es6

function bowling_score(rolls) {

    function score_by_frame(rolls) {
        if(rolls[0] === 10) return [rolls.slice(0, 3), rolls.slice(1)];

        if(rolls[0] + rolls[1] === 10) return [rolls.slice(0, 3), rolls.slice(2)];

        return [rolls.slice(0, 2), rolls.slice(2)];
    }

    function score_accumulator(rolls, scores = []) {
        if(rolls.length <= 0) return Array.prototype.concat.apply([], scores.slice(0, 10)); //flatten the tenth first scores

        const [score, new_rolls] = score_by_frame(rolls);
        scores.push(score);

        return score_accumulator(new_rolls, scores);
    }

    return score_accumulator(rolls).reduce( (acc, score) => {
        return acc + score;
    }, 0);
}



describe('Bowling', function(){

    it('has the correct score for roll without spare or strike', function(){
        const score_only_one = Array(20).fill(1, 0);
        expect(bowling_score(score_only_one)).toEqual(20);
    });

    it('has the correct score for only zero', function() {
        const score_only_zero = Array(20).fill(0, 0);
        expect(bowling_score(score_only_zero)).toEqual(0);
    });

    it('has the correct score with only one strike', function() {
        const score_with_only_one_strike = [10, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        expect(bowling_score(score_with_only_one_strike)).toEqual(30);
    });

    it('has the correct score with only one spare', function() {
        const score_with_only_one_strike = [9, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        expect(bowling_score(score_with_only_one_strike)).toEqual(29);
    });

    it('has only spares', function(){
        const score_with_only_spares = Array(21).fill(5, 0);
        expect(bowling_score(score_with_only_spares)).toEqual(150);
    });

    it('has only strike', function(){
        const score_with_only_spares = Array(12).fill(10, 0);
        expect(bowling_score(score_with_only_spares)).toEqual(300);
    });
});