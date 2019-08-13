import React, { Component } from 'react';
import _ from 'lodash';
import SelectedWord from './SelectedWord';
import SimilarWords from './SimilarWords';
import Translations from './Translations';
import SelectionButtonGroup from './SelectionButtonGroup';
import './Form.scss';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grammar: {},
            lexicalCategory: '',
            grammaticalCategories: []
        };
        this.loadGrammar = this.loadGrammar.bind(this);
        this.getLexicalCategoryButtons = this.getLexicalCategoryButtons.bind(this);
        this.getGrammaticalCategories = this.getGrammaticalCategories.bind(this);
        this.getGrammaticalCategoryButtons = this.getGrammaticalCategoryButtons.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setGrammaticalCategory = this.setGrammaticalCategory.bind(this);
        this.updateHighlights = this.updateHighlights.bind(this);
    }

    componentDidMount() {
        if (Object.keys(this.state.grammar).length === 0) {
            this.loadGrammar(this.props.language);
        }
    }

    loadGrammar(language) {
        if (!language) {
            throw new Error('Language was not specified.');
        }
        let url = 'http://127.0.0.1:3001/language/' + language;
        fetch(url, {mode: "cors"})
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(myJson => {
            console.log('Grammar loaded: ' + language);
            this.setState({grammar: myJson});
        }).catch(function(error) {
            console.log(`The fetch from ${url} failed: ${error.message}`);
        });
    }

    getGrammaticalCategories() {
        if (this.state.grammar.hasOwnProperty('lexicalCategories')) {
            let lexicalCategories = this.state.grammar.lexicalCategories;
            for (let lc in lexicalCategories) {
                let lexicalCategory = lexicalCategories[lc];
                if (lexicalCategory.id === this.state.lexicalCategory) {
                    return lexicalCategory.grammaticalCategories;
                }
            }
        }
    }

    setGrammaticalCategory(key, value) {
        let temp = this.state.grammaticalCategories.slice();
        let existing = _.find(temp, key);  // Returns undefined if not found.
        if (existing) {
            existing[key] = value;
        } else {
            let obj = {};
            obj[key] = value;
            temp.push(obj);
        }
        this.setState({grammaticalCategories: temp}, function () {
            console.log(JSON.stringify(this.state.grammaticalCategories));
        });  
    }

    getLexicalCategoryButtons() {
        let grammar = this.state.grammar;
        let buttons = [];

        if (grammar.hasOwnProperty('lexicalCategories')) {
            let lexicalCategories = grammar.lexicalCategories;
            for (let lc in lexicalCategories) {
                let lexicalCategory = lexicalCategories[lc];
                if (lexicalCategory.display) {
                    buttons.push({
                        id: lexicalCategory.id,
                        text: lexicalCategory.name,
                        isOn: (this.state.lexicalCategory === lexicalCategory.id)
                    });
                }
            }
        }

        return buttons;
    }

    getGrammaticalCategoryButtons() {
        console.log('getGrammaticalCategoryButtons() called.');
        let lexicalCategory = this.state.lexicalCategory;
        let grammaticalCategories = this.getGrammaticalCategories(lexicalCategory);
        let rows = [];

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
                        let existing = _.find(this.state.grammaticalCategories, grammaticalCategory.id);
                        let isOn = false;
                        if (existing) {
                            isOn = (existing[grammaticalCategory.id] === grammaticalCategoryValue.id);
                        }
                        // Add the grammatical category value
                        values.push({
                            id: grammaticalCategoryValue.id,
                            text: grammaticalCategoryValue.name,
                            isOn: isOn
                        });
                    }
                }
                // Add the grammatical category
                rows.push({
                    id: grammaticalCategory.id,
                    text: grammaticalCategory.name,
                    values: values
                });
            }
        }

        return rows;
    }

    handleClick(button) {
        if (button.group === 'lexicalCategory') {
            this.setState({lexicalCategory: button.id});
            this.setState({grammaticalCategories: []});
        } else {
            this.setGrammaticalCategory(button.group, button.id);
        }
    }

    handleSave() {
        let key = this.props.language + '.' + this.state.lexicalCategory + '.' + this.props.textSelection
        localStorage.setItem(key, this.state.grammaticalCategories);
        this.updateHighlights();
    }

    updateHighlights() {
        console.log('updateHighlights');
    }

    render() {
        let lexicalCategories = [];
        let rows = [];

        // Don't render anything unless the grammar is loaded
        if (Object.keys(this.state.grammar).length > 0) {
            lexicalCategories = this.getLexicalCategoryButtons();
        }

        if (this.state.lexicalCategory) {
            rows = this.getGrammaticalCategoryButtons();
        }
        
        let buttonRows = [];
        if (rows) {
            // Make one button group for each grammatical category, with buttons for each value
            buttonRows = rows.map((row, index) =>
                <SelectionButtonGroup key={index} name={row.id} buttons={row.values} onClick={this.handleClick} />
            );
            //console.log(JSON.stringify(rows));
            //console.log(JSON.stringify(buttonRows));
        }

    //& 
        
        return (
            <div>
                <SelectedWord word={this.props.textSelection} />
                { (this.props.textSelection) ? <SimilarWords word={this.props.similarWords} /> : null }
                { (this.props.textSelection) ? <Translations data={this.props.translations} /> : null }
                { (this.props.textSelection) ? <SelectionButtonGroup name={'lexicalCategory'} buttons={lexicalCategories} onClick={this.handleClick} /> : null }
                { (this.props.textSelection) ? <div>{buttonRows}</div> : null }
                { (this.props.textSelection && this.state.lexicalCategory) ? <div><button type="button" onClick={() => this.handleSave()}>Save</button></div> : null }
            </div>
        );
    }
}

export default Form;
