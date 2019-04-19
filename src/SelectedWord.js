import React, { Component } from 'react';
import './SelectedWord.scss';

class SelectedWord extends Component {
    render() {
        return (
            <div className="selected-word">{this.props.word}</div>
        );
    }
}

export default SelectedWord;
