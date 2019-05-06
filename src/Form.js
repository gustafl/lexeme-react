import React, { Component } from 'react';
import SelectedWord from './SelectedWord';
import SimilarWords from './SimilarWords';
import Translations from './Translations';
import LexicalCategory from './LexicalCategory';
import GrammaticalCategories from './GrammaticalCategories';
import './Form.scss';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grammar: {},
            lexicalCategory: "",
            grammaticalCategories: []
        };
        this.loadLanguage = this.loadLanguage.bind(this);
        this.handleLexicalCategoryChange = this.handleLexicalCategoryChange.bind(this);
        this.handleGrammaticalCategoryChange = this.handleGrammaticalCategoryChange.bind(this);
    }

    componentDidMount() {
        if (!this.state.grammar.hasOwnProperty('language')) {
            this.loadLanguage(this.props.language);
        }
    }

    loadLanguage(language) {
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
            this.setState({grammar: myJson});
        }).catch(function(error) {
            console.log(`The fetch from ${url} failed: ${error.message}`);
        });
    }

    handleLexicalCategoryChange(lexicalCategory) {
        console.log('Now setting lexical category and resetting grammatical categories.');
        this.setState({lexicalCategory: lexicalCategory});
        this.setState({grammaticalCategories: []});
    }

    handleGrammaticalCategoryChange(grammaticalCategories) {
        this.setState({grammaticalCategories: grammaticalCategories});
    }

    render() {
        return (
            <div>
                <SelectedWord word={this.props.textSelection} />
                { (this.props.textSelection) ? <SimilarWords word={this.props.similarWords} /> : null }
                { (this.props.textSelection) ? <Translations data={this.props.translations} /> : null }
                { (this.props.textSelection) ? <LexicalCategory grammar={this.state.grammar} onChange={this.handleLexicalCategoryChange} /> : null }
                { (this.state.lexicalCategory) ? <GrammaticalCategories grammar={this.state.grammar} lexicalCategory={this.state.lexicalCategory} onChange={this.handleGrammaticalCategoryChange} /> : null }
            </div>
        );
    }
}

export default Form;
