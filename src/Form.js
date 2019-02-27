import React, { Component } from 'react';
import SingleSelectButtonGroup from './SingleSelectButtonGroup';
import './Form.scss';

class App extends Component {
    render() {

        const lexicalCategoryButtons = [
            { id: 'noun', text: 'noun', class: 'noun' },
            { id: 'verb', text: 'verb' },
            { id: 'adjective', text: 'adjective' },
            { id: 'pronoun', text: 'pronoun' },
            { id: 'adverb', text: 'adverb' },
            { id: 'determiner', text: 'determiner' },
            { id: 'preposition', text: 'preposition' },
            { id: 'conjugation', text: 'conjugation' },
            { id: 'interjection', text: 'interjection' }
        ];

        const genderButtons = [
            { id: 'masculine', text: 'masculine' },
            { id: 'feminine', text: 'feminine' }
        ];

        const numberButtons = [
            { id: 'singular', text: 'singular' },
            { id: 'plural', text: 'plural' }
        ];

        const properCommonButtons = [
            { id: 'proper', text: 'proper' },
            { id: 'common', text: 'common' }
        ];

        const abstractConcreteButtons = [
            { id: 'abstract', text: 'abstract' },
            { id: 'concrete', text: 'concrete' }
        ];

        const countableUncountableButtons = [
            { id: 'countable', text: 'countable' },
            { id: 'uncountable', text: 'uncountable' }
        ];

        const collectiveNounButtons = [
            { id: 'collectiveNoun', text: 'collective noun' }
        ];

        const massNounButtons = [
            { id: 'masseNoun', text: 'mass noun' }
        ];

        return (
            <form>
                <SingleSelectButtonGroup className="lexical-category" buttons={lexicalCategoryButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={genderButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={numberButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={properCommonButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={abstractConcreteButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={countableUncountableButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={collectiveNounButtons}/>
                <SingleSelectButtonGroup className="lexical-category" buttons={massNounButtons}/>
            </form>
        );
    }
}

export default App;
