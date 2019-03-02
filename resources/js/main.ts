import "../sass/main.scss";
import parseJSON from "./util/parseJSON";
import * as ReactDOM from "react-dom";
import {SerialisedComponent} from "./Note/Serial";

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const NAV_STICK_CLASSNAME = "stick";
const bodyContent = document.getElementById("body-content");

const defaultConfig: SerialisedComponent = {
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
const note = parseJSON(defaultConfig);
const noteComponent = note.getElement(null, null);

ReactDOM.render(noteComponent.view, bodyContent);

window.addEventListener("keydown", e => {
    if (e.keyCode === 27) console.log(noteComponent.ref.current.value);
});

document.addEventListener("scroll", e => {
    if (header.getBoundingClientRect().bottom < 0) nav.classList.add(NAV_STICK_CLASSNAME);
    else nav.classList.remove(NAV_STICK_CLASSNAME)
});