import React, { Component } from 'react';
import './SelectionButton.scss';

class SelectionButton extends Component {
    render() {
        return (
            <button
                type="button"
                key={this.props.id}
                name={this.props.id}
                style={this.props.style}
                onClick={this.props.onClick}
                className={this.props.className}
            >
                {this.props.text}
            </button>
        );
    }
}

export default SelectionButton;
