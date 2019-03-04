import {Component, Definition, Ref} from "../Note";
import * as React from "react";
import {SerialisedComponent} from "../Note/Serial";

export default function parseJSON(json: SerialisedComponent): Ref<Component> {
    switch (json.type) {
        // case SerialTypes.Point:
        //     return new Point(json.body);
        // case SerialTypes.NotePoint:
        //     return new NotePoint(json.title, json.body.map(parseJSON));
        case Definition.TYPE:
            const ref = React.createRef<Definition>();
            return {
                ref: ref,
                component: <Definition title={json.title} ref={ref}>{json.body}</Definition>
            };
    }
}