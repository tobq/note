import React from "react";
import PropTypes from "prop-types";
import Point from "./Section/Point";
import Section from "./Section/Section";
import Definition from "./Section/Definition";

export default class SectionBuilder extends React.Component {
    static propTypes = {
        defaultValue: PropTypes.object.isRequired
    };

    ref = React.createRef();

    get value() {
        return this.ref.current.value;
    }

    render() {
        let json = this.props.defaultValue;
        switch (json.type) {
            case "point":
                return <Point ref={this.ref}>{json.value}</Point>;
            case "section":
                return <Section ref={this.ref} title={json.title}>
                    {json.sections.map(section =>
                        <SectionBuilder ref={React.createRef()} key={JSON.stringify(section)} defaultValue={section}/>
                    )}
                </Section>;
            case "definition":
                return <Definition ref={this.ref} title={json.title}>{json.value}</Definition>;
            default:
                return null;
        }
    }
}