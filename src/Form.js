import React, { Component } from 'react';
import SelectedWord from './SelectedWord';
import SimilarWords from './SimilarWords';
import Translations from './Translations';
//import SelectionButtonGroup from './SelectionButtonGroup';
import './Form.scss';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grammar: null
        };
        this.loadLanguage = this.loadLanguage.bind(this);
    }

    componentDidMount() {
        if (!this.state.grammar) {
            this.loadLanguage(this.props.language);
        }
    }

    loadLanguage(code) {
        if (!code) {
            return;
        }
        let url = 'http://127.0.0.1:3001/language/' + code;
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

    render() {
        return (
            <div>
                <SelectedWord word={this.props.textSelection} />
                { (this.props.similarWords && this.props.similarWords.length > 0) ? <SimilarWords word={this.props.similarWords} /> : null }
                { (this.props.translations && this.props.translations.length > 0) ? <Translations data={this.props.translations} /> : null }
            </div>
        );
    }
}

export default Form;
