import React from "react";
import PropTypes from "prop-types";
import "./Section.scss"
import SectionTitle from "./SectionTitle";

export default class Section extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.instanceOf(Section).isRequired),
    };

    title = React.createRef();

    get value() {
        return {
            type: "section",
            title: this.title.current.value,
            sections: this.props.children.map(x => x.ref.current.value)
        }
    }

    edit() {
        this.setState({edit: true})
    }

    render() {
        return <div className="section">
            <div className="section-body">
                <SectionTitle
                    ref={this.title}
                >{this.props.title}</SectionTitle>
                <div className="section-children">{this.props.children}</div>
            </div>
        </div>
    }
}