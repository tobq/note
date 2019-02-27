import React from "react";
import PropTypes from "prop-types";
import "./Section.scss"
import SectionBuilder from "./util/SectionBuilder";

export default class Section extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.array.isRequired,
    };

    title = React.createRef();
    state = {
        sections: this.props.children.map(section => this.buildSection(section))
    };

    get value() {
        return {
            type: "section",
            title: this.title.current.textContent,
            sections: this.state.sections.map(sectionBuilder => sectionBuilder.ref.current.value)
        }
    }

    focus() {
        this.title.current.focus();
    }

    async create(element, value = "") {
        // TODO: duplicate detection
        await this.addSectionAfter(element, {type: "point", value: value});
    }

    createLast() {
        // TODO: duplicate detection
        this.addSection({type: "point", value: ""});
    }

    remove(element, cb) {
        // TODO: duplicate detection
        console.log(">>>>>>>>>>>", element);
        const sections = this.state.sections.filter(
            section => section.ref.current.ref.current !== element
        );
        this.setState({sections: sections}, cb);
    }

    toDefinition(element, title, value) {
        // TODO: duplicate detection
        this.replaceSection(element, {type: "definition", title: title, value: value});
    }

    toSection(element, title) {
        this.replaceSection(element, {
            type: "section",
            title: title,
            sections: [{
                type: "point",
                value: ""
            }]
        });
    }

    addSection(section) {
        const sections = this.state.sections;
        const sectionBuilder = this.buildSection(section);
        this.setState({sections: [...sections, sectionBuilder]});
    }

    replaceSection(element, section) {
        const sections = this.state.sections;
        const children = sections.map(x => x.ref.current.ref.current);
        const index = children.indexOf(element);
        const newSection = this.buildSection(section);
        this.setState({sections: [...sections.slice(0, index), newSection, ...sections.slice(index + 1)]});
    }

    async addSectionAfter(element, section) {
        return new Promise(resolve => {
            const sections = this.state.sections;
            const children = sections.map(x => x.ref.current.ref.current);
            const index = children.indexOf(element) + 1;
            const newSection = this.buildSection(section);
            this.setState({sections: [...sections.slice(0, index), newSection, ...sections.slice(index)]}, resolve);
        });
    }

    focus() {
        this.title.current.focus();
    }

    componentDidMount() {
        this.focus();
    }

    buildSection(section) {
        return <SectionBuilder
            ref={React.createRef()}
            key={JSON.stringify(section)}
            defaultValue={section}
            onCreate={this.create.bind(this)}
            onRemove={this.remove.bind(this)}
            toDefinition={this.toDefinition.bind(this)}
            toSection={this.toSection.bind(this)}
        />
    }

    onKeyDown(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            this.createLast();
        }
    }

    render() {
        return <div className="section">
            <div className="section-body">
                <div
                    className="section-title"
                    contentEditable suppressContentEditableWarning
                    tabIndex={0}
                    onKeyDown={e => this.onKeyDown(e)}
                    ref={this.title}
                >{this.props.title}</div>
                <div className="section-children">
                    {this.state.sections}
                </div>
            </div>
        </div>
    }
}