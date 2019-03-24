import React, { Component } from 'react';
import './TranslationTableRow.scss';

class TranslationTableRow extends Component {
    render() {
        return (
            <div className="translation-table-row">
                <div className="language">{this.props.language}</div>
                <div className="translation">{this.props.text}</div>
                <button type="button">remove</button>
            </div>
        );
    }
}

export default TranslationTableRow;
