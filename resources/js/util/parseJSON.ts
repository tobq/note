import {Definition, Note, Point} from "../Note/Index.tsx";

export default function parseJSON(json) {
    switch (json.type) {
        case Point.TYPE:
            return new Point(json.body);
        case Note.TYPE:
            return new Note(json.title, json.body.map(parseJSON));
        case Definition.TYPE:
            return new Definition(json.title, json.body);
    }
}