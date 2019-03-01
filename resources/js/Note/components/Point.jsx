import React from "react";
import PropTypes from "prop-types";
import cursorPosition from "../../util/cursorPosition";
import Note from "../Note";
import PointClass from "../Point";
import Definition from "../Definition";

export default class Point extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
        add: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
    };

    ref = React.createRef();

    get value() {
        return new PointClass(this.ref.current.textContent);
    }

    onKeyDown = async e => {
        console.log(e.keyCode);
        const textContent = this.ref.current.textContent;
        const empty = textContent.length === 0;
        const add = this.props.add;
        const remove = this.props.remove;
        if (e.keyCode === 13) {
            e.preventDefault();
            if (e.ctrlKey) {
                await add(new Note(title, []), this);
                remove(this);
            } else {
                if (!empty) {
                    const pointClass = new PointClass();
                    console.log(pointClass);
                    add(pointClass, this);
                }
            }
        } else if (e.keyCode === 8) {
            if (empty) {
                e.preventDefault();
                remove(this);
            }
        } else if (e.shiftKey && e.keyCode === 186) {
            e.preventDefault();
            const index = cursorPosition();
            const title = textContent.substr(0, index).trim();
            const body = textContent.substr(index).trim();
            await add(new Definition(title, body), this);
            remove(this);
        }
    };

    componentDidMount() {
        this.focus();
    }

    focus() {
        this.ref.current.focus();
    }

    onBlur = e => {
        if (this.ref.current.textContent.length === 0) this.props.remove(this);
    };

    render() {
        return <div className="point">
            <div
                className="point-body"
                tabIndex={0}
                contentEditable suppressContentEditableWarning
                ref={this.ref}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
            >{this.props.children}</div>
        </div>
    }
}