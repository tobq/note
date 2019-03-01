import Note from "../Note/Note";
import Point from "../Note/Point";
import Definition from "../Note/Definition";

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