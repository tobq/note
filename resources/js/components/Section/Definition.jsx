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

    render() {
        return <div className="section point definition">
            <div className="definition-title" contentEditable tabIndex={0} ref={this.title}>{this.props.title}</div>
            <div className="definition-body" contentEditable tabIndex={0} ref={this.body}>{this.props.children}</div>
        </div>;
    }
}