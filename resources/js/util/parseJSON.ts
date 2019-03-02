import {ComponentTypes, Definition, Note, Point} from "../Note";
import {string} from "prop-types";

type serial = {
    type: ComponentTypes
    title?: string;
    body?: string | serial;
};
export default function parseJSON(json: serial) {
    switch (json.type) {
        case Point.TYPE:
            return new Point(json.body);
        case Note.TYPE:
            return new Note(json.title, json.body.map(parseJSON));
        case Definition.TYPE:
            return new Definition(json.title, json.body);
    }
}