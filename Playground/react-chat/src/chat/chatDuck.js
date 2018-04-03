//@flow

import type {FSA} from "../common/types";
import type {ChatState, Message} from "./types";

type AddMessage = FSA<"CHAT/ADD_MESSAGE", Message>;
const addMessage = (author: string, text: string): AddMessage => ({
    type: "CHAT/ADD_MESSAGE",
    payload: {
        author,
        text,
        date: new Date()
    }
});

export const reducer = (state: ChatState, action: AddMessage): ChatState => {
    if (typeof state === 'undefined') return {messages: [], author: "Damien"};

    return ({
        messages: state.messages.concat(action.payload),
        author: action.payload.author === "Arnaud" ? "Damien" : "Arnaud"
    });
};

export const actions = {
    addMessage
};