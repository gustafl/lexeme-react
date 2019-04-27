import React, { Component } from 'react';
import PreviewText from './PreviewText';
import LanguageSelection from './LanguageSelection';
import './ImportText.scss';

class ImportText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPreview: false,
            previewHtml: '',
            textAreaHeight: 200,
            language: undefined
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePreview = this.handlePreview.bind(this);
        this.handleImport = this.handleImport.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
    }

    handleChange(event) {
        this.setState({previewHtml: event.target.value});
        this.setState({scrollHeight: event.target.scrollHeight});
    }

    handlePreview() {
        let preview = !this.state.showPreview;
        this.setState({showPreview: preview});
    }

    handleImport() {
        let html = this.state.previewHtml;
        this.props.onImport(html);
    }

    handleLanguageChange(languageCode) {
        this.props.onLanguageSelection(languageCode);
    }

    cleanHtml(html) {
        let div = document.createElement('div');
        div.innerHTML = html;
        let text = div.textContent || div.innerText || '';
        return text;
    }

    render() {
        let textAreaHeight = {height: this.state.textAreaHeight + 'px'};
        let previewHtml = {__html: this.state.previewHtml};
        return (
            <div className="import-text">
                <h1>Import text</h1>
                <p>Paste some text into the area below. HTML tags will be stripped, but markdown will be honored. When you click the button below, you can't change the text.</p>
                <textarea value={this.state.previewHtml} onChange={this.handleChange} style={textAreaHeight} />
                { (this.state.showPreview === true) ? <PreviewText content={previewHtml} onClick={this.handlePreview}/> : null }
                <LanguageSelection languages={this.props.languages} onLanguageSelection={this.handleLanguageChange} />
                <div>
                    <button type="button" onClick={this.handlePreview}>preview</button>
                    <button type="button" onClick={this.handleImport}>import</button>
                </div>
            </div>
        );
    }
}

export default ImportText;




