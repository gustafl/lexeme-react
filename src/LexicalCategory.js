import React, { Component } from 'react';
import SelectionButtonGroup from './SelectionButtonGroup';
import './LexicalCategory.scss';

class LexicalCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(obj) {
        if (obj.hasOwnProperty('lexicalCategory')) {
            this.props.onChange(obj.lexicalCategory);
        }
    }

    render() {
        let grammar = this.props.grammar;
        let groupName = 'lexicalCategory';
        let buttons = [];

        if (grammar.hasOwnProperty('lexicalCategories')) {
            let lexicalCategories = grammar.lexicalCategories;
            for (let lc in lexicalCategories) {
                let lexicalCategory = lexicalCategories[lc];
                if (lexicalCategory.display) {
                    buttons.push({
                        id: lexicalCategory.name,
                        text: lexicalCategory.label
                    });
                }
            }
        }

        return (
            <div>
                <SelectionButtonGroup groupName={groupName} buttons={buttons} onClick={this.handleClick}/>
            </div>
        );
    }
}

export default LexicalCategory;
