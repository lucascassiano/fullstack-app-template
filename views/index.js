import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./index.less";

import Button from "./components/Button";
import UserProfile from "./components/UserProfile";
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

        return <div className="content">
            <UserProfile type="A" name="Stan Lee" />
           this.state.counter: {this.state.counter}s
         
        </div>;
    }
}


ReactDOM.render(<App />, document.getElementById('root'));