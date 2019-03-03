import "../sass/main.scss";
import parseJSON from "./util/parseJSON";
import * as ReactDOM from "react-dom";
import {SerialisedNote, SerialTypes} from "./Note/Serial";
import {Note, NoteView} from "./Note";
import * as React from "react";

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const title = document.getElementById("title");
const NAV_STICK_CLASSNAME = "active";

const bodyContent = document.getElementById("body-content");

const defaultConfig: SerialisedNote = {
    type: SerialTypes.Note,
    title: "TOP",
    body: [
        {
            type: SerialTypes.Note,
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
const rootNote: Note = parseJSON(defaultConfig) as Note;
const rootNoteRefView = rootNote.getRefView(null, null, null);

ReactDOM.render(rootNoteRefView.view, bodyContent);

function getView(): NoteView {
    return rootNoteRefView.ref.current;
}

window.addEventListener("keydown", e => {
    if (e.keyCode === 27) {
        const serialised = getView().value.value;
        console.log(JSON.stringify(serialised, null, `\t`));
    }
});

function getTitles() {
    const view = getView();
    if (view.inView()) {
        nav.classList.add(NAV_STICK_CLASSNAME);
        const titles = view.buildTitles();
        console.log(titles.join(" > "));
        title.innerText = titles.map(title=><div></div>);
    } else {
        nav.classList.remove(NAV_STICK_CLASSNAME);
        title.innerText = "Tobi"
    }
}

getTitles();
document.addEventListener("scroll", getTitles);