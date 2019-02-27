import React from "react";
import PropTypes from "prop-types";
import "./Section.scss"

export default class Definition extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
        onCreate: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
    };

    title = React.createRef();
    body = React.createRef();

    get value() {
        return {
            type: "definition",
            title: this.title.current.textContent,
            value: this.body.current.textContent
        };
    }

    focus() {
        this.title.current.focus();
    }

    componentDidMount() {
        this.body.current.focus()
    }

    onTitleKeyDown(e) {
        if (e.keyCode === 8) {
            if (this.title.current.textContent.length === 0) {
                e.preventDefault();
                this.props.onRemove(this);
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            this.body.current.focus();
        }
    }

    onBodyKeyDown(e) {
        if (e.keyCode === 8) {
            if (this.body.current.textContent.length === 0) {
                e.preventDefault();
                this.props.onCreate(this, this.value.title).then(e =>
                    this.props.onRemove(this));
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            this.props.onCreate(this);
        }
    }

    render() {
        return <div className="definition">
            <div
                className="definition-title"
                contentEditable suppressContentEditableWarning
                tabIndex={0}
                onKeyDown={e => this.onTitleKeyDown(e)}
                ref={this.title}
            >{this.props.title}</div>
            <div
                className="definition-body"
                contentEditable suppressContentEditableWarning
                tabIndex={0}
                onKeyDown={e => this.onBodyKeyDown(e)}
                ref={this.body}
            >{this.props.children}</div>
        </div>;
    }
}