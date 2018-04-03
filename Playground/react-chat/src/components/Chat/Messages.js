import React from "react";
import {connect} from "react-redux";

const Message = ({author, date, text}) => (
    <li><em>{`[${author}] le ${date.toLocaleString()}: `}</em> {text}</li>
);

const Messages = ({messages}) => (
    <ul>
        {messages.map((item, i) => (
            <Message key={i} {...item} />
        ))}
    </ul>
);

export default connect(
    state => ({
        messages: state.messages
    })
)(Messages);