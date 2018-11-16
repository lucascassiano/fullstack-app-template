import React, { Component } from 'react';
import './style.less';

export default class Button extends Component {
    render() {
        return <div className="btn">{this.props.label || this.props.children}</div>
    }
}