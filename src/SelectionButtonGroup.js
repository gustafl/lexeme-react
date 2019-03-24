import React, { Component } from 'react';
import SelectionButton from './SelectionButton';
import './SelectionButtonGroup.scss';

class SelectionButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: Array(props.buttons.length).fill(false)
        };
    }

    handleClick(index) {
        const buttons = this.state.buttons.slice();
        let clickedButton = buttons[index];
        buttons.fill(false);
        buttons[index] = !clickedButton;
        this.setState({buttons: buttons});
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
