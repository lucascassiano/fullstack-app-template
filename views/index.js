import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.less";
import Button from "./components/Button";
import { type } from 'os';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            counter: 0
        }

        setInterval(this.Count, 1000);
    }

    Count = () => {
        let { counter } = this.state;
        counter++;
        this.setState({ counter });
    }

    render() {
        let data = getCookie('data') || { name: "error" };
        return (<div>Hello from React counter: {this.state.counter}s <Button>{data.name}</Button></div>);
    }
}

function getCookie(cookiename) {
    if (!document.cookie)
        return null;

    var cookiestring = RegExp("" + cookiename + "[^;]+").exec(document.cookie);
    var decoded = decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./, "") : "");
    return JSON.parse(decoded);
}


ReactDOM.render(<App />, document.getElementById('root'));