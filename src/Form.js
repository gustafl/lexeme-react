import React, { Component } from 'react';
import Word from './Word';
import SelectionButtonGroup from './SelectionButtonGroup';
import './Form.scss';

class Form extends Component {
    render() {

        const lexicalCategoryButtons = [
            { id: 'noun', text: 'noun' },
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
            { id: 'massNoun', text: 'mass noun' }
        ];

        const word = 'bizarre';

        return (
            <div>
                <Word word={word} />
                <SelectionButtonGroup buttons={lexicalCategoryButtons} />
                <SelectionButtonGroup buttons={genderButtons} />
                <SelectionButtonGroup buttons={numberButtons} />
                <SelectionButtonGroup buttons={properCommonButtons} />
                <SelectionButtonGroup buttons={abstractConcreteButtons} />
                <SelectionButtonGroup buttons={countableUncountableButtons} />
                <SelectionButtonGroup buttons={collectiveNounButtons} />
                <SelectionButtonGroup buttons={massNounButtons} />
            </div>
        );
    }
}

export default Form;
