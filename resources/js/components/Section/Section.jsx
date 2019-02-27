import React from "react";
import PropTypes from "prop-types";
import "./Section.scss"
import SectionBuilder from "./SectionBuilder";

export default class Section extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(PropTypes.instanceOf(Section).isRequired),
    };

    title = React.createRef();

    get value() {
        return {
            type: "section",
            title: this.title.current.textContent,
            sections: this.props.children.map(x => x.ref.current.value)
        }
    }

    save(){
        new Blob([this.value], {type: "application/json"});
        var url  = URL.createObjectURL(blob)
    onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.createLast();
        }
    }

    render() {
        return <div className="section">
            <div className="section-body">
                <div className="section-title" contentEditable tabIndex={0} ref={this.title}>{this.props.title}</div>
                <div className="section-children">{this.props.children}</div>
            </div>
        </div>
    }
}