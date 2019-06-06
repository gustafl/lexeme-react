import React, { Component } from 'react';
import './SelectionButtonGroup.scss';

/**
 * Show a group of buttons, where only one at a time can be toggled on.
 * 
 * Props
 *     name -- The name of the button group.
 *     buttons -- An array of 'button' objects (see below).
 *     onClick -- The callback function for click events.
 * 
 * Objects
 *     button = {
 *         id: string -- Identifies the button.
 *         text: string -- The button label.
 *         value: bool -- The toggle status of the button.
 *     }
 */

class SelectionButtonGroup extends Component {
    
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

    handleClick(button) {
        let obj = {};
        obj.group = this.props.name;
        obj.id = button.id;
        this.props.onClick(obj);
    }

    render() {
        const rows = [];
        let columns = this.getNumberOfColumns();
        let style = { flexBasis: 100 / columns + '%' };
        this.props.buttons.forEach((button, index) => {
            rows.push(
                <button
                    type="button"
                    key={index}
                    name={button.id}
                    style={style}
                    onClick={() => this.handleClick(button)}
                    className={(button.isOn) ? 'on' : undefined}
                >
                    {button.text}
                </button>
            );
        });
        return (
            <div className="button-group">{rows}</div>
        );
    }
}

export default SelectionButtonGroup;
