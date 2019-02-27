import React from "react";
import PropTypes from "prop-types";
import Point from "../Point";
import Section from "../Section";
import Definition from "../Definition";

export default class SectionBuilder extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.object.isRequired,
        onCreate: PropTypes.func.isRequired,
        onRemove: PropTypes.func.isRequired,
        toDefinition: PropTypes.func.isRequired,
        toSection: PropTypes.func.isRequired,
    };

    ref = React.createRef();

    get value() {
        return this.ref.current.value;
    }

    focus() {
        this.ref.current.focus();
    }

    render() {
        let json = this.props.defaultValue;
        switch (json.type) {
            case "point":
                return <Point
                    ref={this.ref}
                    onCreate={this.props.onCreate}
                    onRemove={this.props.onRemove}
                    toDefinition={this.props.toDefinition}
                    toSection={this.props.toSection}
                >{json.value}</Point>;
            case "section":
                return <Section ref={this.ref} title={json.title}>
                    {json.sections}
                </Section>;
            case "definition":
                return <Definition
                    ref={this.ref}
                    title={json.title}
                    onRemove={this.props.onRemove}
                    onCreate={this.props.onCreate}
                >{json.value}</Definition>;
            default:
                return null;
        }
    }
}