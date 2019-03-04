import {Definition, NoteDefinition, NotePoint, Point} from "./";

const TYPE_KEY = "TYPE";

// type Serialised<T extends Component> = SerialisedValue<typeof   T>;
export type Serialised<T> = {}; // TODO: refactor hacks. fix multiple extensions

export interface SerialisedValue<T extends { [TYPE_KEY]: string }> {
    type: T[keyof { [TYPE_KEY]: string } ]
}

export interface SerialisedPoint extends SerialisedValue<typeof Point>, Serialised<NotePoint> {
    body: string
}

export interface SerialisedDefinition extends SerialisedValue<typeof Definition>, Serialised<NotePoint> {
    title: string
    body: string
}

export interface SerialisedNotePoint extends SerialisedValue<typeof NotePoint>, Serialised<NotePoint> {
    title: SerialisedPoint
    body: SerialisedComponent[]
}

export interface SerialisedNoteDefinition extends SerialisedValue<typeof NoteDefinition>, Serialised<NotePoint> {
    title: SerialisedDefinition
    body: SerialisedComponent[]
}

export type SerialisedComponent = SerialisedNotePoint | SerialisedDefinition | SerialisedPoint;