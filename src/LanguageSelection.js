import React, { Component } from 'react';
import './LanguageSelection.scss';

class LanguageSelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let languageCode = event.target.value;
        this.props.onLanguageSelection(languageCode);
    }

    render() {
        const languages = this.props.languages;
        const selectItems = languages.map((language, index) => 
            <option key={index} value={language}>{language}</option>
        );
        return (
            <div className="language-selection">
                <select onChange={this.handleChange}>
                    {selectItems}
                </select>
            </div>
        );
    }
}

export default LanguageSelection;
