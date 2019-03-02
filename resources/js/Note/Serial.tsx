export interface SerialisedPoint {
    type?: "point"
    body: string
}

export interface SerialisedDefinition {
    type?: "definition"
    title: string
    body: string
}

export interface SerialisedNote {
    type?: "note"
    title: string
    body: SerialisedComponent[]
}

export type SerialisedComponent = SerialisedNote | SerialisedDefinition | SerialisedPoint;