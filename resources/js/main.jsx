import React from "react";
import ReactDOM from "react-dom";
import "../sass/main.scss";
import Section from "./components/Section/Section";
import Definition from "./components/Section/Definition";
import SectionBuilder from "./components/Section/util/SectionBuilder";

const nav = document.querySelector("nav");
const header = document.querySelector("header");
const NAV_STICK_CLASSNAME = "stick";
document.addEventListener("scroll", event => {
    if (header.getBoundingClientRect().bottom < 0) nav.classList.add(NAV_STICK_CLASSNAME);
    else nav.classList.remove(NAV_STICK_CLASSNAME)
});

let ref = React.createRef();
ReactDOM.render(<SectionBuilder ref={ref} defaultValue={{
    type: "section",
    title: "TOP",
    sections: [
        {
            type: "section",
            title: "Section",
            sections: [
                {type: "point", value: "First Point"},
                {type: "point", value: "Second Point"},
                {type: "point", value: "Another Point"},
            ]
        }, {
            type: "definition",
            title: "Definition",
            value: "An example of a definition placed in a section as a child"
        },
        {type: "point", value: "First Point"},
        {type: "point", value: "Second Point"},
        {type: "point", value: "Another Point"},
    ]
}}/>, document.getElementById("body-content"));
console.log(ref.current.value);

//
//