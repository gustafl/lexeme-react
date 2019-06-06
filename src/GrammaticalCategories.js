import React, { Component } from 'react';
import SelectionButtonGroup from './SelectionButtonGroup';
import './GrammaticalCategories.scss';

/**
 * This component renders the grammatical category buttons under each lexical category.
 */

class GrammaticalCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(obj) {
        this.props.onChange(obj);
    }

    render() {
        let grammar = this.props.grammar;
        let rows = [];

        // If there's a lexical categories section
        if (grammar.hasOwnProperty('lexicalCategories')) {
            let lexicalCategories = grammar.lexicalCategories;
            // Loop through lexical categories
            for (let lc in lexicalCategories) {
                let lexicalCategory = lexicalCategories[lc];
                // If the lexical category is matching the input property
                if (lexicalCategory.name === this.props.lexicalCategory) {
                    let grammaticalCategories = lexicalCategory.grammaticalCategories;
                    // Loop through grammatical categories
                    for (let gc in grammaticalCategories) {
                        let grammaticalCategory = grammaticalCategories[gc];
                        // If the grammatical category should be displayed
                        if (grammaticalCategory.display) {
                            let grammaticalCategoryValues = grammaticalCategory.values;
                            let values = [];
                            // Loop through the values of the grammatical category
                            for (let gcv in grammaticalCategoryValues) {
                                let grammaticalCategoryValue = grammaticalCategoryValues[gcv];
                                // If the value of the grammatical category should be displayed
                                if (grammaticalCategoryValue.display) {
                                    // Add the grammatical category value
                                    values.push({
                                        id: grammaticalCategoryValue.id,
                                        text: grammaticalCategoryValue.name
                                    });
                                }
                            }
                            // Add the grammatical category
                            rows.push({
                                id: grammaticalCategory.name,
                                text: grammaticalCategory.label,
                                values: values
                            });
                        }
                    }
                }
            }
        }

        // Make one button group for each grammatical category, with buttons for each value
        let buttonRows = rows.map((row, index) => 
            <SelectionButtonGroup key={index} groupName={row.id} buttons={row.values} onClick={this.handleClick}/>
        );

        return (
            <div>
                {buttonRows}
            </div>
        );
    }
}

export default GrammaticalCategories;
