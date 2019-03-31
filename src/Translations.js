import React, { Component } from 'react';
import TranslationTable from './TranslationTable';
import TranslationInput from './TranslationInput';
import './Translations.scss';

class Translations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            readyForInput: false,
            translations: [
                { language: 'sv', text: 'bisarr' },
                { language: 'sv', text: 'konstig' },
                { language: 'sv', text: 'underlig' }
            ]
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleClick() {
        this.setState({readyForInput: !this.state.readyForInput})
    }

    handleAdd(translation) {
        let translations = this.state.translations.slice();
        translations.push(translation);
        this.setState({translations: translations});
        this.setState({readyForInput: false});
    }

    handleRemove(translation) {
        let translations = this.state.translations.slice();
        var filtered = translations.filter(function(el) { return el.text !== translation; });
        this.setState({translations: filtered});
    }

    render() {
        return (
            <div className="translation-section">
                { (this.state.translations.length > 0) ? <TranslationTable translations={this.state.translations} handleRemove={this.handleRemove} /> : null }
                { this.state.readyForInput ? <TranslationInput handleAdd={this.handleAdd} /> : null }
                <button type="button" onClick={this.handleClick}>
                    { !this.state.readyForInput ? 'add translation' : 'cancel translation' }
                </button>
            </div>
        );
    }
}

export default Translations;
