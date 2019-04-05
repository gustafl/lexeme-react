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
            currentTextSelection: null
        };
        this.handleIntro = this.handleIntro.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleIntro(content) {
        this.setState({introButtonClicked: true});
    }

    handleImport(content) {
        alert('handleImport');
        this.setState({content: content});
    }

    handleSelection(text) {
        this.setState({currentTextSelection: text});
    }

    render() {
        return (
        <div className="wrapper">
            <header className="header">Header</header>
            <article className="main">
                { (this.state.introButtonClicked === false) ? <Introduction onClick={this.handleIntro}/> : null }
                { (this.state.introButtonClicked === true && this.state.content.length === 0) ? <ImportText onImport={this.handleImport}/> : null }
                { (this.state.content.length > 0) ? <HtmlContent content={this.state.content} onSelection={this.handleSelection} /> : null }
            </article>
            <aside className="form">
                <Form textSelection={this.state.currentTextSelection}/>
            </aside>
            <footer className="footer">Footer</footer>
        </div>
        );
    }
}

export default App;
