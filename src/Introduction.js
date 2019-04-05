import React, { Component } from 'react';
import './Introduction.scss';

class Introduction extends Component {
    render() {
        return (
            <div className="introduction">
                <h1>Welcome!</h1>
                <p>This page is made for newbies like you. This page is made for newbies like you. This page is made for newbies like you. This page is made for newbies like you. This page is made for newbies like you. This page is made for newbies like you. This page is made for newbies like you.</p>
                <div>
                    <button type="button" onClick={this.props.onClick}>import text</button>
                </div>
            </div>
        );
    }
}

export default Introduction;