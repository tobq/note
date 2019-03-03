import "../sass/main.scss";
import parseJSON from "./util/parseJSON";
import * as ReactDOM from "react-dom";
import {SerialisedNote} from "./Note/Serial";
import {Note, NoteView} from "./Note";

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const title = document.getElementById("title");
const NAV_STICK_CLASSNAME = "active";

const bodyContent = document.getElementById("body-content");

const defaultConfig: SerialisedNote = {
    type: "note",
    title: "TOP",
    body: [
        {
            type: "note",
            title: "Section",
            body: [
                {type: "point", body: "First Point"},
                {type: "point", body: "Second Point"},
                {type: "point", body: "Another Point"},
            ]
        }, {
            type: "definition",
            title: "definition",
            body: "An example of a definition, placed in a sub-note, as a child"
        },
        {type: "point", body: "First Point"},
        {type: "point", body: "Second Point"},
        {type: "point", body: "Another Point"},
    ]
};
const note: Note = parseJSON(defaultConfig) as Note;
const noteRedView = note.getRefView(null, null);

ReactDOM.render(noteRedView.view, bodyContent);

function getView(): NoteView {
    return noteRedView.ref.current;
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