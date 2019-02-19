import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        <header className="header">Header</header>
        <article className="main">
          <h2>1. Un écueil fuyant</h2>
          <p>L'année 1866 fut marquée par un événement <span>bizarre</span>, un phénomène inexpliqué et inexplicable que personne n'a sans doute oublié. Sans parler des rumeurs qui agitaient les populations des ports et surexcitaient l'esprit public à l'intérieur des continents les gens de mer furent particulièrement émus. Les négociants, armateurs, capitaines de navires, skippers et masters de l'Europe et de l'Amérique, officiers des marines militaires de tous pays, et, après eux, les gouvernements des divers États des deux continents, se préoccupèrent de ce fait au plus haut point.</p>
          <p>En effet, depuis quelque temps, plusieurs navires s'étaient rencontrés sur mer avec « une chose énorme » un objet long, fusiforme, parfois phosphorescent, infiniment plus vaste et plus rapide qu'une baleine.</p>
        </article>
        <aside className="form">Form</aside>
        <footer className="footer">Footer</footer>
      </div>
    );
  }
}

export default App;
