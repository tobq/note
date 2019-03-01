import React from "react";
import PropTypes from "prop-types";
import "../Note.scss"
import NoteCass from "../Note";
import Point from "../Point";


export default class Note extends React.Component {
    static propTypes = {
        title: PropTypes.string.isRequired,
        children: PropTypes.arrayOf(Note).isRequired,
        add: PropTypes.func,
        remove: PropTypes.func,
    };
    title = React.createRef();

    get value() {
        const subNotes = this.state.subNotes.map(note => note.ref.current.value);
        return new NoteCass(this.title.current.textContent, subNotes)
    }

    add = async (element, subNote) => await new Promise(resolve => {
        console.log(subNote);
        const subNotes = this.state.subNotes;
        // TODO: IMPLEMENT INITIALISATION HERE >
        subNote = this.getComponent(subNote);
        if (element) {
            const children = subNotes.map(x => x.ref.current);
            const index = children.indexOf(element) + 1;
            this.setState({subNotes: [...subNotes.slice(0, index), subNote, ...subNotes.slice(index)]}, resolve);
        } else {
            this.setState({subNotes: [...subNotes, subNote]}, resolve);
        }
    });

    remove = (element, cb) => {
        // TODO: duplicate detection
        console.log(">>>>>>>>>>>", element, this.state.subNotes);
        const filteredSubNotes = this.state.subNotes.filter(
            subNote => subNote.ref.current !== element
        );
        this.setState({subNotes: filteredSubNotes}, cb);
        // TODO: BIND TO EACH ELEMENT, SO NO ELEMNT REQUIRED.
        // TODO: ASYNC
    };

    getComponent = subNote => subNote.getComponent(this.add, this.remove);

    state = {subNotes: this.props.children.map(this.getComponent)};

    focus() {
        this.title.current.focus();
    }

    componentDidMount() {
        this.focus();
    }

    onKeyDown = async e => {
        if (e.keyCode === 13) {
            e.preventDefault();
            await this.add(new Point());
        }
    };

    render() {
        return <div className="note">
            <div className="note-body">
                <div
                    className="note-title"
                    contentEditable suppressContentEditableWarning
                    tabIndex={0}
                    onKeyDown={this.onKeyDown}
                    ref={this.title}
                >{this.props.title}</div>
                <div className="note-children">
                    {this.state.subNotes}
                </div>
            </div>
        </div>
    }

}