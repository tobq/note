import React from "react";
import PropTypes from "prop-types";
import "./Section.scss"
import Point from "./Point";

export default class Definition extends Point {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    };

    title = React.createRef();

    get value() {
        return {
            type: "definition",
            title: this.title.current.textContent,
            value: this.props.children
        };
    }

    render() {
        return <div className="section point definition">
            <div className="definition-title" contentEditable tabIndex={0} ref={this.title}>{this.props.title}</div>
            <div className="definition-body">{this.props.children}</div>
        </div>;

    }
}