import React, { Component } from 'react';
import './Word.scss';

class Word extends Component {
    render() {
        return (
            <div className="word">{this.props.word}</div>
        );
    }
}

export default Word;
