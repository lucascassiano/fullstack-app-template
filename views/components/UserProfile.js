import React, { Component } from 'react';
import Button from "./Button";

export default class UserProfile extends Component {

    render() {
        let { name, type } = this.props;
        //stanLee photo
        let imgUrl = "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2018%2F11%2Fstan-lee-portrait-0001.jpg?q=75&w=800&cbr=1&fit=max";

        return <div className="card">
            <div className="card-image"><img src={imgUrl} /></div>
            <div className="name">{name}    <Button>😎</Button></div>
            <div></div>
        </div>
    }
}