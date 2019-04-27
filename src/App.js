import React, { Component } from 'react';
import HtmlContent from './HtmlContent';
import Introduction from './Introduction';
import ImportText from './ImportText';
import Form from './Form';
import './App.scss';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            introButtonClicked: false,
            content: '',
            currentTextSelection: null,
            languages: [],
            selectedLanguage: null
        };
        this.handleIntro = this.handleIntro.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
        this.loadLanguages = this.loadLanguages.bind(this);
        this.handleLanguageSelection = this.handleLanguageSelection.bind(this);
    }

    handleIntro(content) {
        this.setState({introButtonClicked: true});
    }

    handleImport(content) {
        this.setState({content: content});
        this.setState({languages: undefined});
    }

    handleSelection(text) {
        this.setState({currentTextSelection: text});
    }

    handleLanguageSelection(code) {
        this.setState({selectedLanguage: code});
    }

    componentDidMount() {
        if (this.state.languages.length === 0) {
            this.loadLanguages();
        }
    }

    loadLanguages() {
        let url = 'http://127.0.0.1:3001/language';
        fetch(url, {mode: "cors"})
        .then(function(response) {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Network response was not ok.');
        })
        .then(myJson => {
            if (myJson.length > 0) {
                this.setState({languages: myJson});
                this.setState({selectedLanguage: myJson[0]});
            } else {
                throw new Error('No available languages.');
            }
        }).catch(function(error) {
            console.log(`The fetch from ${url} failed: ${error.message}`);
        });
    }

    render() {
        return (
        <div className="wrapper">
            <header className="header">Header</header>
            <article className="main">
                { (this.state.introButtonClicked === false) ? <Introduction onClick={this.handleIntro} /> : null }
                { (this.state.introButtonClicked === true && this.state.content.length === 0) ? <ImportText languages={this.state.languages} onImport={this.handleImport} onLanguageSelection={this.handleLanguageSelection} /> : null }
                { (this.state.content.length > 0) ? <HtmlContent content={this.state.content} onSelection={this.handleSelection} /> : null }
            </article>
            <aside className="form">
                { (this.state.content.length > 0) ? <Form language={this.state.selectedLanguage} textSelection={this.state.currentTextSelection}/> : null }
            </aside>
            <footer className="footer">Footer</footer>
        </div>
        );
    }
}

export default App;
