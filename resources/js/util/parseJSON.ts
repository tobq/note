import {Component, Definition, Note, Point} from "../Note";
import {SerialisedComponent} from "../Note/Serial";

export default function parseJSON(json: SerialisedComponent): Component {
    switch (json.type) {
        case "point":
            return new Point(json.body);
        case "note":
            return new Note(json.title, json.body.map(parseJSON));
        case "definition":
            return new Definition(json.title, json.body);
    }
}