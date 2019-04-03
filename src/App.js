import React, { Component } from 'react';
import HtmlContent from './HtmlContent';
import Form from './Form';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header className="header">Header</header>
        <article className="main">
          <HtmlContent />
        </article>
        <aside className="form">
          <Form/>
        </aside>
        <footer className="footer">Footer</footer>
      </div>
    );
  }
}

export default App;
