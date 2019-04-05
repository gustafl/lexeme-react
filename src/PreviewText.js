import React, { Component } from 'react';
import './PreviewText.scss';

class PreviewText extends Component {
    render() {
        return (
            <div className="preview-modal-background">
                <div className="preview-modal-dialog">
                    <h1>Text preview</h1>
                    <hr />
                    <div className="preview-text" dangerouslySetInnerHTML={this.props.content} />
                    <div className="button-row">
                        <button type="button" onClick={this.props.onClick}>close</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default PreviewText;