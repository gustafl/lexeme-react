import React, { Component } from 'react';
import './HtmlContent.scss';

class HtmlContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.isValidLetter = this.isValidLetter.bind(this);
        this.getSelectedText = this.getSelectedText.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    isValidLetter(character) {
        character = character.replace(/[^a-zA-Z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u00FF]/, '');
        return (character !== '');
    }

    getSelectedText() {
        
        const SELECTION_MAX_LENGTH = 100;
    
        // Get selection object
        let selection = window.getSelection();
    
        // Make sure anchor and focus nodes are the same
        if (selection.anchorNode !== selection.focusNode) {
            console.warn('The anchor and focus nodes are different.');
            selection.removeAllRanges();
            return;
        }

        // Get anchor node object
        let node = selection.anchorNode;

        // Make sure the parent of this textnode is not a <span>
        if (node.parentNode.nodeName === 'SPAN') {
            console.warn('There is already a highlight here.');
            selection.removeAllRanges();
            return;
        }

        // Make sure it's a text node
        if (node.nodeType !== 3) {
            console.warn('The node is not a text node.');
            selection.removeAllRanges();
            return;
        }

        // Get start and end of selection
        let start = selection.anchorOffset;
        let end = selection.focusOffset;

        // Make sure we got a proper mousedown-drag-mouseup selection
        if (start === end) {
            console.warn('At least one character must be selected.');
            selection.removeAllRanges();
            return;
        }

        // Reverse start and end if user made a backwards selection
        if (start > end) {
            let temp = end;
            end = start;
            start = temp;
        }

        // Make sure selection is not too long
        if ((end - start) > SELECTION_MAX_LENGTH) {
            console.warn('The selection is too long.');
            selection.removeAllRanges();
            return;
        }

        // Get selected text
        let selectedText = node.nodeValue.substring(start, end);

        // Make sure all characters in selection are valid letters or spaces
        let numberOfValidLetters = 0;
        for (let i = 0; i < selectedText.length; i++) {
            if (this.isValidLetter(selectedText[i]) || selectedText[i] === ' ') {
                if (selectedText[i] !== ' ') {
                    numberOfValidLetters++;
                }
            } else {
                console.warn('The selection contains invalid characters.');
                selection.removeAllRanges();
                return;
            }
        }

        // Move selection start right until the first non-space character
        while (start >= 0 && node.nodeValue.substring(start, start + 1) === ' ') {
            start++;
        }

        // Move selection end left until the first non-space character
        while (end <= node.nodeValue.length && node.nodeValue.substring(end - 1, end) === ' ') {
            end--;
        }

        // Move selection start left while there are valid letters
        while (start >= 0 && this.isValidLetter(node.nodeValue.substring(start - 1, start))) {
            start--;
        }

        // Move selection end right while there are valid letters
        while (end <= node.nodeValue.length - 1 && this.isValidLetter(node.nodeValue.substring(end, end + 1))) {
            end++;
        }

        // Adjust selection
        selection.collapse(node, start);
        selection.extend(node, end);

        // Make sure selection has at least one valid letter
        if (numberOfValidLetters === 0) {
            console.warn('The selection must have at least one valid letter.');
            selection.removeAllRanges();
            return;
        }

        // Get adjusted selected text
        var adjustedSelectedText = node.nodeValue.substring(start, end);
        console.info('A selection was made: %s (%d:%d)', adjustedSelectedText, start, end);
        //this.setState({selection: adjustedSelectedText});
        return adjustedSelectedText;

        // Remember this selection (in case we need to restore it)
        //window.lastSelection.node = node;
        //window.lastSelection.start = start;
        //window.lastSelection.end = end;

        // Adjust form according to selection
        //changeWord(adjustedSelectedText);
    }

    handleMouseUp() {
        let selection = this.getSelectedText();
        this.props.onSelection(selection);
    }

    render() {
        let html = {__html: this.props.content};
        return (
            <div className="html-content" dangerouslySetInnerHTML={html} onMouseUp={this.handleMouseUp}/>
        );
    }
}

export default HtmlContent;

/*
<span data-word="sv.valmöjlighet">
*/