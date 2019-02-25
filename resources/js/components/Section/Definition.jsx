import React from "react";
import PropTypes from "prop-types";
import "./Section.scss"
import Point from "./Point";
import DefinitionTitle from "./DefinitionTitle";

export default class Definition extends Point {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.string.isRequired,
    };

    title = React.createRef();

    get value() {
        return {
            type: "definition",
            title: this.title.current.value,
            value: this.props.children
        }
    }

    render() {
        return <div className="section point definition">
            <DefinitionTitle ref={this.title}>{this.props.title}</DefinitionTitle>
            <div className="definition-body">{this.props.children}</div>
        </div>;
    }
}