import React, { Component } from 'react';
import SelectionButtonGroup from './SelectionButtonGroup';
import './LexicalCategory.scss';

class LexicalCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(obj) {
        if (obj.hasOwnProperty('lexicalCategory')) {
            this.props.onChange(obj.lexicalCategory);
        }
    }

    render() {
        

        return (
            <div>
                <SelectionButtonGroup buttons={this.props.buttons} onClick={this.handleClick}/>
            </div>
        );
    }
}

export default LexicalCategory;
