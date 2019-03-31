import React, { Component } from 'react';
import './TranslationInput.scss';

class TranslationInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'sv',
            text: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({text: event.target.value});
    }

    getTranslation() {
        return {
            language: this.state.language,
            text: this.state.text
        }
    }

    render() {
        return (
            <div className="translation-input">
                <button type="button" value={this.state.language} className="language">{this.state.language}</button>
                <input type="text" value={this.state.text} onChange={this.handleChange} className="translation" autoFocus />
                <button type="button" onClick={() => this.props.handleAdd(this.getTranslation())} className="add">add</button>
            </div>
        );
    }
}

export default TranslationInput;
