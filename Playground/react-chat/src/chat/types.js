//@flow

export type Message = {|
    author: string,
    date: Date,
    text: string
|};

export type ChatState = {|
    messages: Array<Message>,
    author: string
|};