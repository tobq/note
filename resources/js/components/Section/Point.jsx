import React from "react";
import PropTypes from "prop-types";
import cursorPosition from "./util/cursorPosition";

export default class Point extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        onCreate: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        toDefinition: PropTypes.func.isRequired,
        toSection: PropTypes.func.isRequired,
    };

    ref = React.createRef();

    get value() {
        return {
            type: "point",
            value: this.ref.current.textContent
        };
    }

    onKeyDown(e) {
        console.log(e.keyCode);
        const textContent = this.ref.current.textContent;
        const empty = textContent.length === 0;
        if (e.keyCode === 13) {
            e.preventDefault();
            if (e.ctrlKey) {
                this.props.toSection(this, textContent);
            } else {
                if (!empty) this.props.onCreate(this);
            }
        } else if (e.keyCode === 8) {
            if (empty) {
                e.preventDefault();
                this.props.onRemove(this);
            }
        } else if (e.shiftKey && e.keyCode === 186) {
            e.preventDefault();
            const index = cursorPosition();
            const title = textContent.substr(0, index).trim();
            const body = textContent.substr(index).trim();
            this.props.toDefinition(this, title, body);
        }
    }

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.ref.current.focus();
    }

    onBlur(e) {
        if (this.ref.current.textContent.length === 0) this.props.onRemove(this);
    }

    render() {
        return <div className="point">
            <div
                className="point-body"
                tabIndex={0}
                contentEditable suppressContentEditableWarning
                ref={this.ref}
                onBlur={e => this.onBlur(e)}
                onKeyDown={e => this.onKeyDown(e)}
            >{this.props.children}</div>
        </div>
    }
}