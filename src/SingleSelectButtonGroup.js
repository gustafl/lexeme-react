import React, { Component } from 'react';
import './SingleSelectButtonGroup.scss';

class SingleSelectButtonGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttons: props.buttons
        };
    }

    getNumberOfColumns() {
        switch (this.state.buttons.length) {
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
        this.props.buttons.forEach((button) => {
            rows.push(
                <button type="button" key={button.id} className={button.id} style={style}>{button.text}</button>
            );
        });
        return (
            <div className="button-group">{rows}</div>
        );
    }
}

export default SingleSelectButtonGroup;
