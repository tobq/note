export enum SerialTypes {
    Point = "point",
    Definition = "definition",
    Note = "note"
}

export interface SerialType {
    type: SerialTypes
}

export interface SerialisedPoint extends SerialType {
    type: SerialTypes.Point
    body: string
}

export interface SerialisedDefinition extends SerialType {
    type: SerialTypes.Definition
    title: string
    body: string
}

export interface SerialisedNote extends SerialType {
    type: SerialTypes.Note
    title: string
    body: SerialisedComponent[]
}

export type SerialisedComponent = SerialisedNote | SerialisedDefinition | SerialisedPoint;