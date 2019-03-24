import React, { Component } from 'react';
import TranslationTableRow from './TranslationTableRow';
import './TranslationTable.scss';

class TranslationTable extends Component {
    render() {
        const rows = [];
        this.props.translations.forEach((translation, index) => {
            rows.push(
                <TranslationTableRow
                    key={index}
                    language={translation.language}
                    text={translation.text}
                    onClick={this.handleRemove} />
                
            );
        });
        return (
            <div className="translation-table">{rows}</div>
        );
    }
}

export default TranslationTable;
