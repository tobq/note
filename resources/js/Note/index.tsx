import * as React from "react";
import "./Style.scss"
import cursorPosition from "../util/cursorPosition";
import {SerialisedComponent, SerialisedDefinition, SerialisedNote, SerialisedPoint} from "./Serial";

type RefView = { ref: React.RefObject<ComponentView>, view: JSX.Element };

export abstract class Component {
    body: any;


    protected get key(): string {
        return null; //JSON.stringify(this.value);
    }
    abstract get value(): SerialisedComponent;

    abstract getElement(add: addCallback, remove: removeCallback): RefView;
}

export type addCallback = (newNote: Component, element?: ComponentView) => Promise<void>;
export type removeCallback = (element: ComponentView) => Promise<void>;

export interface ViewProps {
    add: addCallback
    remove: removeCallback
}

export abstract class ComponentView<T extends ViewProps = ViewProps, S = {}> extends React.Component<T, S> {
    abstract get value(): Component

    abstract focus(): void
}

export enum ComponentTypes {
    Definition = "definition",
    Point = "point",
    Note = "note"
}

export class Definition extends Component {
    readonly title: string;

    constructor(title: string, body: string) {
        super();
        this.title = title;
        this.body = body;
    }

    get value(): SerialisedDefinition {
        return {
            title: this.title,
            body: this.body
        };
    }

    getElement(add: addCallback, remove: removeCallback) {
        const ref = React.createRef<DefinitionView>();
        return {
            ref: ref,
            view: <DefinitionView
                key={this.key}
                add={add}
                remove={remove}
                ref={ref}
                title={this.title}
            >{this.body}</DefinitionView>
        };
    }
}

interface DefinitionProps extends ViewProps {
    title: string,
    children: string,
}

export class Point extends Component {
    readonly body: string;


    constructor(body: string) {
        super();
        this.body = body;
    }

    get value(): SerialisedPoint {
        return {
            body: this.body
        };
    }

    getElement(add: addCallback, remove: removeCallback) {
        const ref = React.createRef<PointView>();
        return {
            ref: ref,
            view: <PointView
                key={JSON.stringify(this.value)}
                add={add}
                remove={remove}
                ref={ref}
            >{this.body}</PointView>
        };
    }
}

interface PointProps extends ViewProps {
    children: string
}

class PointView extends ComponentView<PointProps> {
    ref = React.createRef<HTMLDivElement>();

    get value() {
        return new Point(this.ref.current.textContent);
    }

    onKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
        async e => {
            console.log(e.keyCode);
            const textContent = this.ref.current.textContent;
            const empty = textContent.length === 0;
            const add = this.props.add;
            const remove = this.props.remove;
            if (e.keyCode === 13) {
                e.preventDefault();
                if (e.ctrlKey) {
                    await add(new Note(textContent, []), this);
                    await remove(this);
                } else {
                    if (!empty) {
                        await add(new Point(""), this);
                    }
                }
            } else if (e.keyCode === 8) {
                if (empty) {
                    e.preventDefault();
                    await remove(this);
                }
            } else if (e.shiftKey && e.keyCode === 186) {
                e.preventDefault();
                const index = cursorPosition();
                const title = textContent.substr(0, index).trim();
                const body = textContent.substr(index).trim();
                await add(new Definition(title, body), this);
                await remove(this);
            }
        };

    componentDidMount(): void {
        this.focus();
    }

    focus(): void {
        this.ref.current.focus();
    }

    onBlur: React.FocusEventHandler = async e => {
        if (this.ref.current.textContent.length === 0)
            await this.props.remove(this);
    };

    render(): any {
        return <div className="point">
            <div
                className="point-body"
                tabIndex={0}
                contentEditable suppressContentEditableWarning
                ref={this.ref}
                onBlur={this.onBlur}
                onKeyDown={this.onKeyDown}
            >{this.props.children}</div>
        </div>
    }
}

class DefinitionView extends ComponentView<DefinitionProps> {
    title = React.createRef<HTMLDivElement>();
    body = React.createRef<HTMLDivElement>();

    get value(): Definition {
        return new Definition(this.title.current.textContent, this.body.current.textContent);
    }

    focus(): void {
        this.title.current.focus();
    }

    componentDidMount(): void {
        this.body.current.focus()
    }

    onTitleKeyDown: React.KeyboardEventHandler = async e => {
        if (e.keyCode === 8) {
            if (this.title.current.textContent.length === 0) {
                e.preventDefault();
                await this.props.remove(this);
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            this.body.current.focus();
        }
    };

    onBodyKeyDown: React.KeyboardEventHandler = async e => {
        const add = this.props.add;
        const remove = this.props.remove;
        if (e.keyCode === 8) {
            if (this.body.current.textContent.length === 0) {
                e.preventDefault();
                const point = new Point(this.value.title);
                await add(point, this);
                await remove(this);
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            await add(new Point(""), this);
        }
    };

    render(): any {
        return <div className="definition">
            <div
                className="definition-title"
                contentEditable suppressContentEditableWarning
                tabIndex={0}
                onKeyDown={this.onTitleKeyDown}
                ref={this.title}
            >{this.props.title}</div>
            <div
                className="definition-body"
                contentEditable suppressContentEditableWarning
                tabIndex={0}
                onKeyDown={this.onBodyKeyDown}
                ref={this.body}
            >{this.props.children}</div>
        </div>;
    }
}

export class Note extends Component {
    body: Component[];
    private readonly title: string;

    constructor(title: string, children: Component[]) {
        super();
        // if (!(title instanceof Point)) throw `Title ${title} is not an instance of Point`;
        // TODO: POINT IMPLEMENTATION ON TITLE

        this.title = title;
        this.body = children;
    }

    get value(): SerialisedNote {
        return {
            title: this.title,
            body: this.body.map(child => child.value)
        }
    }

    getElement(add: addCallback, remove: removeCallback) {
        const ref = React.createRef<NoteView>();
        return {
            ref: ref,
            view: <NoteView
                key={this.key}
                add={add}
                remove={remove}
                ref={ref}
                title={this.title}
            >{this.body}</NoteView>
        };
    }
}

interface NoteState {
    children: RefView[]
}

interface NoteProps extends ViewProps {
    title: string
    children: Component[]
}

class NoteView extends ComponentView<NoteProps, NoteState> {
    title = React.createRef<HTMLDivElement>();

    get value(): Note {
        const children = this.state.children.map(note => note.ref.current.value);
        return new Note(this.title.current.textContent, children)
    }

    add: addCallback = async (newChild, child) =>
        await new Promise(resolve => {
            console.log(newChild);
            const children = this.state.children;
            let subView = this.getElement(newChild);
            if (child) {
                const index = children.map(rf => rf.ref.current).indexOf(child) + 1;
                this.setState({
                    children: [
                        ...children.slice(0, index),
                        subView,
                        ...children.slice(index)
                    ]
                }, resolve);
            } else {
                this.setState({children: [...children, subView]}, resolve);
            }
        });

    remove: removeCallback = async oldChild =>
        await new Promise(resolve => {
            // TODO: duplicate detection
            console.log("REMOVE:", oldChild);
            console.log("FROM:", this.state.children);
            const filteredSubNotes = this.state.children.filter(
                child => child.ref.current !== oldChild
            );
            this.setState({children: filteredSubNotes}, resolve);
            // TODO: BIND TO EACH ELEMENT, SO NO ELEMENT REQUIRED.
        });

    getElement: (view: Component) => RefView = // TODO: INFER RETURN TYPE
        view => view.getElement(this.add, this.remove);

    state = {children: this.props.children.map(this.getElement)};

    focus(): void {
        this.title.current.focus();
    }

    componentDidMount(): void {
        this.focus();
    }

    onKeyDown: React.KeyboardEventHandler = async (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            await this.add(new Point(""), undefined);
        }
    };

    render(): any {
        return <div className="note">
            <div className="note-body">
                <div
                    className="note-title"
                    contentEditable suppressContentEditableWarning
                    tabIndex={0}
                    onKeyDown={this.onKeyDown}
                    ref={this.title}
                >{this.props.title}</div>
                <div className="note-children">
                    {this.state.children.map(rv => rv.view)}
                </div>
            </div>
        </div>
    }
}