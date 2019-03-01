import React from "react";
import PropTypes from "prop-types";
import "../Note.scss"
import DefinitionClass from "../Definition";
import Point from "../Point";

export default class Definition extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
        add: PropTypes.func.isRequired,
        remove: PropTypes.func.isRequired,
    };

    title = React.createRef();
    body = React.createRef();

    get value() {
        return new DefinitionClass(this.title.current.textContent, this.body.current.textContent);
    }

    focus() {
        this.title.current.focus();
    }

    componentDidMount() {
        this.body.current.focus()
    }

    onTitleKeyDown = e => {
        if (e.keyCode === 8) {
            if (this.title.current.textContent.length === 0) {
                e.preventDefault();
                this.props.remove(this);
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            this.body.current.focus();
        }
    };

    onBodyKeyDown = async e => {
        const add = this.props.add;
        const remove = this.props.remove;
        if (e.keyCode === 8) {
            if (this.body.current.textContent.length === 0) {
                e.preventDefault();
                const point = new Point(this.value.title);
                await add(point, this);
                remove(this);
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            add(new Point(), this);
        }
    };

    render() {
        return <div className="definition">
            <div
                className="definition-title"
                contentEditable suppressContentEditableWarning
                tabIndex={0}
                onKeyDown={this.onTitleKeyDown}
                ref={this.title}
            >{this.props.title}</div>
            <div
                className="definition-body"
                contentEditable suppressContentEditableWarning
                tabIndex={0}
                onKeyDown={this.onBodyKeyDown}
                ref={this.body}
            >{this.props.children}</div>
        </div>;
    }
}