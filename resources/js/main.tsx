import "../sass/main.scss";
import parseJSON from "./util/parseJSON";
import * as ReactDOM from "react-dom";
import {SerialisedNotePoint, SerialTypes} from "./Note/Serial";
import {NotePoint, NotePointView} from "./Note";
import * as React from "react";

// const appContext = React.createContext<Context>(this.getContext());

const nav = document.querySelector("nav");
const title = document.getElementById("title");
const NAV_STICK_CLASSNAME = "active";

const bodyContent = document.getElementById("body-content");

const defaultConfig: SerialisedNotePoint = {
    type: SerialTypes.NotePoint,
    title: "TOP",
    body: [
        {
            type: SerialTypes.NotePoint,
            title: "Section",
            body: [
                {type: SerialTypes.Point, body: "First Point"},
                {type: SerialTypes.Point, body: "Second Point"},
                {type: SerialTypes.Point, body: "Another Point"},
            ]
        }, {
            type: SerialTypes.Definition,
            title: "definition",
            body: "An example of a definition, placed in a sub-note, as a child"
        },
        {type: SerialTypes.Point, body: "First Point"},
        {type: SerialTypes.Point, body: "Second Point"},
        {type: SerialTypes.Point, body: "Another Point"},
    ]
};
const rootNote: NotePoint = parseJSON(defaultConfig) as NotePoint;
const rootNoteRefView = rootNote.getView(null, null, null,null, null);

ReactDOM.render(rootNoteRefView.view, bodyContent);

function getView(): NotePointView {
    return rootNoteRefView.ref.current;
}

window.addEventListener("keydown", e => {
    if (e.keyCode === 27) {
        const serialised = getView().value.value;
        console.log(JSON.stringify(serialised, null, `\t`));
    }
});

const titleElement = <span className="title-node-content">Tobi</span>;

function clearTitle() {
    ReactDOM.render(titleElement, title);
}

function getTitles() {
    const view = getView();
    if (view.inView()) {
        nav.classList.add(NAV_STICK_CLASSNAME);
        const viewTree = view.buildViewTree();
        console.log(viewTree.map(note => note.getTitle()).join(" > "));

        const nodes = viewTree.map(note => note.renderNode());
        ReactDOM.render([titleElement, ...nodes], title);
    } else {
        nav.classList.remove(NAV_STICK_CLASSNAME);
        clearTitle();
    }
}

clearTitle();
getTitles();
document.addEventListener("scroll", getTitles);

// interface AppState {
//
// }
//
// interface Context {
//     state: AppState
//     setState: Function
// }
//
// class Provider extends React.Component<AppState> {
//     state = {};
//
//     private getContext(): Context {
//         return {
//             state: this.state,
//             setState: this.setState,
//         };
//     }
//
//     render() {
//         return <appContext.Provider value={this.getContext()}>{this.props.children}</appContext.Provider>
//     }
// }
