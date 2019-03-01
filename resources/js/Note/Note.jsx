import React from "react";
import isIterable from "../util/isIterable";
import Point from "./Point";
import NoteComponent from "./components/Note";

export default class Note {
    static TYPE = "note";

    constructor(title, subNotes) {
        // if (!(title instanceof Point)) throw `Title ${title} is not an instance of Point`;
        // TODO: POINT IMPLEMENTATION ON TITLE

        if (isIterable(subNotes)) throw `subNotes, ${subNotes}, is not iterable`;
        for (let subNote of subNotes)
            if (!(subNote instanceof Note || subNote instanceof Point))
                throw `subNote, ${subNote}, is not an instance of ${Note} | ${Point}`;

        this.title = title;
        this.body = subNotes;
    }

    get value() {
        return {
            type: Note.TYPE,
            title: this.title,
            body: this.body.map(subNote => subNote.value)
        }
    }

    getComponent(add = null, remove = null) {
        return <NoteComponent
            key={JSON.stringify(this.value)}
            add={add}
            remove={remove}
            ref={React.createRef()}
            title={this.title}
        >{this.body}</NoteComponent>;
    }
}