import {actions, reducer} from "./chatDuck";

describe("reducer", () => {

    it("has an init state", () => {
        const initState = reducer(undefined, {});

        expect(initState).toMatchObject({
            messages: [],
            author: "Damien"
        });
    });

    it("add a message", () => {
        const initState = reducer(undefined, {});
        let action = actions.addMessage("Arnaud", "text");
        const expectedState = reducer(initState, action);

        expect(expectedState).toMatchObject({
           messages: [{
               author: "Arnaud",
               date: action.payload.date,
               text: "text"
           }],
            author: "Damien"
        });
    });
});