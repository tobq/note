import {Component, Definition} from "../Note";
import {SerialisedComponent, SerialTypes} from "../Note/Serial";

export default function parseJSON(json: SerialisedComponent): Component {
    switch (json.type) {
        case SerialTypes.Point:
            return new Point(json.body);
        case SerialTypes.NotePoint:
            return new NotePoint(json.title, json.body.map(parseJSON));
        case SerialTypes.Definition:
            return new Definition(json.title, json.body);
    }
}