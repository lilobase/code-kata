import React from "react";
import {connect} from "react-redux";
import {actions} from "../../chat/chatDuck";

class Chat extends React.PureComponent {

    textInput = null;
    state = {
        value: ""
    };

    onSubmit = () => {
        this.props.addMessage(this.props.author,this.value());
        this.setState({value:""});
    };

    onChange = (event) => {

        const taboo = "shit";
        const value = event.target.value;

        if(value.includes(taboo)) return;

        this.setState({
            value: event.target.value
        });
    };

    value = () => this.state.value;

    componentDidMount() {
        this.textInput.focus();
    }

    render() {
        return (
            <div>
                <input style={{width: 250}} type="text" value={this.value()} onChange={this.onChange} ref={e => this.textInput = e}/>
                <input type="submit" onClick={this.onSubmit} disabled={this.value() === ""}/>
            </div>
        );
    }
}

export default connect(state => ({author: state.author}), actions)(Chat);