import React, { Component } from 'react';
import './TranslationInput.scss';

class TranslationInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'fr',
            languageSelection: ['fr', 'sv', 'en'],
        };
    }

    render() {
        return (
            <div className="translation-input">
                <button className="language" type="button" name="language" value={this.state.language}>{this.state.language}</button>
                <input className="translation" type="text" name="translation" autoFocus />
                <button className="add" type="button" name="add" onClick={this.handleClick}>add</button>
            </div>
        );
    }
}

export default TranslationInput;
