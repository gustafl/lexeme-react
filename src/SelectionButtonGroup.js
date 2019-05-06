import React, { Component } from 'react';
import SelectionButton from './SelectionButton';
import './SelectionButtonGroup.scss';

/**
 * A group of buttons.
 * 
 * Props
 *   groupName -- The name of the property that the button group represents. Returned along with the current selection.
 *   buttons -- An array of button objects.
 *   onClick() -- Event handler for button clicks. Returns an object with groupId and groupValue properties.
 * 
 * State
 *   buttons -- holds the toggle state of each button
 */

class SelectionButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: Array(props.buttons.length).fill(false)
        };
    }

    handleClick(index) {
        const buttons = this.state.buttons.slice();             // Make copy of buttons array
        let clickedButtonState = buttons[index];                // Get the boolean value of the clicked button
        buttons.fill(false);                                    // Reset all buttons to false
        buttons[index] = !clickedButtonState;                   // Toggle the clicked button
        this.setState({buttons: buttons});                      // Update the buttons array
        let obj = {};
        if (buttons[index]) {                                   // If the last button-click resulted in an active button
            obj[this.props.groupName] = this.props.buttons[index].id;
        }
        this.props.onClick(obj);
    }

    getNumberOfColumns() {
        switch (this.props.buttons.length) {
            case 0:
            case 1:
                return 1;
            case 2:
            case 4:
                return 2;
            default:
                return 3;
        }
    }

    render() {
        const rows = [];
        let columns = this.getNumberOfColumns();
        let style = { flexBasis: 100 / columns + '%' };
        this.props.buttons.forEach((button, index) => {
            rows.push(
                <SelectionButton
                    key={button.id}
                    name={button.id}
                    style={style}
                    text={button.text}
                    onClick={() => this.handleClick(index)}
                    className={(this.state.buttons[index]) ? 'on' : undefined}
                />
            );
        });
        return (
            <div className="button-group">{rows}</div>
        );
    }
}

export default SelectionButtonGroup;
