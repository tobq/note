import * as React from "react";
import "./Style.scss"
import {Serialised,} from "./Serial";

const nav = document.querySelector("nav");

// type RefObject<T extends Component> = React.RefObject<ComponentView<T>>;
//
export type Ref<T extends Component> = { ref: React.RefObject<T>, component: JSX.Element };

export abstract class Component<Props = any, State = any> extends React.Component<Props, State> {
    private static instantiations = 0;
    public readonly key = Component.instantiations++;

    abstract get value(): Serialised<this>;

    abstract focus(): void;

    abstract render(): JSX.Element;
}

type contextType = {
    add: asyncBoundNewCallback
    remove: asyncBoundCallback
    next: boundCallback
    before: boundCallback
    replace: replaceCallback
};
const CallbackContext = React.createContext<contextType>(null);

type asyncBoundNewCallback = (newComponent: Component) => Promise<void>;
type replaceCallback = (...newComponent: Component[]) => Promise<void>; // TODO: FIX ANY USAGE - generic
type asyncBoundCallback = () => Promise<void>;
type boundCallback = () => void;

// export interface ViewProps {
//     add: asyncBoundNewCallback
//     remove: asyncBoundCallback
//     next: boundCallback
//     before: boundCallback
//     replace: replaceCallback
// }

type DefinitionProps = { title: string, children: string };

export class Definition extends Component<DefinitionProps, DefinitionProps> {
    public static readonly TYPE = "definition";

    state = this.props;
    title = React.createRef<HTMLDivElement>();
    body = React.createRef<HTMLDivElement>();

    get value() {
        return {
            type: Definition.TYPE,
            title: this.state.title,
            body: this.state.children
        };
    }

    focus(): void {
        this.title.current.focus();
    }

    componentDidMount(): void {
        this.body.current.focus()
    }

    onTitleKeyDown: React.KeyboardEventHandler = async e => {
        if (e.keyCode === 8) {
            if (this.getBody().length === 0) {
                e.preventDefault();
                // await this.props.context.remove();
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            this.body.current.focus();
        }
    };

    onBodyKeyDown: React.KeyboardEventHandler = async e => {
        if (e.keyCode === 8) {
            if (this.getBody().length === 0) {
                e.preventDefault();
                // await this.props.replace(new Point(this.value.title));
            }
        } else if (e.keyCode === 13) {
            e.preventDefault();
            // await add(new Point(""));
        }
    };

    render() {
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

    private getBody() {
        return this.body.current.textContent;
    }

    private getTitle() {
        return this.title.current.textContent;
    }
}

//
// export class Point extends Component {
//     public static readonly TYPE = "point";
//     readonly body: string;
//
//     constructor(body: string) {
//         super();
//         this.body = body;
//     }
//
//     get value() {
//         return {
//             type: Point.TYPE,
//             body: this.body
//         };
//     }
//
//     getView(ref, add, remove, next, before, replace) {
//         const ref = React.createRef<PointView>();
//         return {
//             ref: ref,
//             component: <PointView
//                 key={this.key}
//                 add={add}
//                 remove={remove}
//                 next={next}
//                 before={before}
//                 replace={replace}
//                 ref={ref}
//             >{this.body}</PointView>
//         };
//     }
// }
//
// interface PointProps extends ViewProps {
//     children: string
// }
//
// class PointView extends ComponentView<Point, PointProps> {
//     ref = React.createRef<HTMLDivElement>();
//
//     get value() {
//         return new Point(this.ref.current.textContent);
//     }
//
//     onKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
//         async e => {
//             console.log(e.keyCode);
//             const textContent = this.ref.current.textContent;
//             if (e.keyCode === 13) {
//                 e.preventDefault();
//                 if (e.ctrlKey) {
//                     const note = new NotePoint(textContent, []);
//                     await this.props.replace(note);
//                 } else {
//                     if (!(textContent.length === 0)) {
//                         await this.props.add(new Point(""));
//                     }
//                 }
//             } else if (e.ctrlKey && e.keyCode === 8) {
//
//                 e.preventDefault();
//                 await this.props.remove();
//             } else if (e.shiftKey && e.keyCode === 186) {
//                 e.preventDefault();
//                 const index = cursorPosition();
//                 const title = textContent.substr(0, index).trim();
//                 const body = textContent.substr(index).trim();
//                 await this.props.replace(new Definition(title, body));
//             }
//         };
//
//     componentDidMount(): void {
//         this.focus();
//     }
//
//     focus(): void {
//         this.ref.current.focus();
//     }
//
//     onBlur: React.FocusEventHandler = async e => {
//         if (this.ref.current.textContent.length === 0)
//             await this.props.remove();
//     };
//
//     render(): any {
//         return <div className="point">
//             <div
//                 className="point-body"
//                 tabIndex={0}
//                 contentEditable suppressContentEditableWarning
//                 ref={this.ref}
//                 onBlur={this.onBlur}
//                 onKeyDown={this.onKeyDown}
//             >{this.props.children}</div>
//         </div>
//     }
// }
//
// class DefinitionView extends ComponentView<Definition, DefinitionProps> {
//     title = React.createRef<HTMLDivElement>();
//     body = React.createRef<HTMLDivElement>();
//
//     get value() {
//         return new Definition(this.getTitle(), this.getBody());
//     }
//
//     focus(): void {
//         this.title.current.focus();
//     }
//
//     componentDidMount(): void {
//         this.body.current.focus()
//     }
//
//     onTitleKeyDown: React.KeyboardEventHandler = async e => {
//         if (e.keyCode === 8) {
//             if (this.getBody().length === 0) {
//                 e.preventDefault();
//                 await this.props.remove();
//             }
//         } else if (e.keyCode === 13) {
//             e.preventDefault();
//             this.body.current.focus();
//         }
//     };
//
//     onBodyKeyDown: React.KeyboardEventHandler = async e => {
//         const add = this.props.add;
//         if (e.keyCode === 8) {
//             if (this.getBody().length === 0) {
//                 e.preventDefault();
//                 await this.props.replace(new Point(this.value.title));
//             }
//         } else if (e.keyCode === 13) {
//             e.preventDefault();
//             await add(new Point(""));
//         }
//     };
//
//     render(): any {
//         return <div className="definition">
//             <div
//                 className="definition-title"
//                 contentEditable suppressContentEditableWarning
//                 tabIndex={0}
//                 onKeyDown={this.onTitleKeyDown}
//                 ref={this.title}
//             >{this.props.title}</div>
//             <div
//                 className="definition-body"
//                 contentEditable suppressContentEditableWarning
//                 tabIndex={0}
//                 onKeyDown={this.onBodyKeyDown}
//                 ref={this.body}
//             >{this.props.children}</div>
//         </div>;
//     }
//
//     private getBody() {
//         return this.body.current.textContent;
//     }
//
//     private getTitle() {
//         return this.title.current.textContent;
//     }
// }
//
// export class NotePoint extends Component {
//     public static readonly TYPE = "note-point";
//     body: Component[];
//     readonly title: string;
//
//     constructor(title: string, children: Component[]) {
//         super();
//         // if (!(title instanceof Point)) throw `Title ${title} is not an instance of Point`;
//         // TODO: POINT IMPLEMENTATION ON TITLE
//
//         this.title = title;
//         this.body = children;
//     }
//
//     get value() {
//         return {
//             type: NotePoint.TYPE,
//             title: this.title,
//             body: this.body.map(child => child.value)
//         }
//     }
//
//     getView(ref, add: asyncBoundNewCallback, remove: asyncBoundCallback, next: asyncBoundCallback, before: asyncBoundCallback, replace: replaceCallback) {
//         return <NotePointView
//             key={this.key}
//             add={add}
//             remove={remove}
//             next={next}
//             before={before}
//             replace={replace}
//             ref={ref}
//             title={this.title}
//         >{this.body}</NotePointView>
//     }
// }
//
// type DefinitionTitle = { title: string, body: string };
//
// export class NoteDefinition extends Component {
//     public static readonly TYPE = "note-definition";
//     body: Component[];
//     readonly title: Definition;
//
//     constructor(title: DefinitionTitle, children: Component[]) {
//         super();
//         // if (!(title instanceof Point)) throw `Title ${title} is not an instance of Point`;
//         // TODO: POINT IMPLEMENTATION ON TITLE
//
//         this.title = new Definition(title.title, title.body);
//         this.body = children;
//     }
//
//     get value() {
//         return {
//             type: NoteDefinition.TYPE,
//             title: this.title.value,
//             body: this.body.map(child => child.value)
//         }
//     }
//
//     getView(add: asyncBoundNewCallback, remove: asyncBoundCallback, next: asyncBoundCallback, before: asyncBoundCallback, replace: replaceCallback) {
//         const ref = React.createRef<NotePointView>();
//         return {
//             ref: ref,
//             component: <NoteDefinitionView
//                 key={this.key}
//                 add={add}
//                 remove={remove}
//                 next={next}
//                 before={before}
//                 replace={replace}
//                 ref={ref}
//                 title={this.title}
//             >{this.body}</NoteDefinitionView>
//         };
//     }
// }
//
// interface NotePointState {
//     children: RefView<Component>[],
//     title: string
// }
//
// interface NotePointProps extends ViewProps {
//     title: string
//     children: Component[],
// }
//
// export class NotePointView extends ComponentView<NotePoint, NotePointProps, NotePointState> {
//     private title = React.createRef<HTMLDivElement>();
//     private root = React.createRef<HTMLDivElement>();
//
//     get value() {
//         const children = this.getChildren();
//         return new NotePoint(this.state.title, children)
//     }
//
//     buildViewTree() {
//         let titles: NotePointView[] = [this];
//         // console.log("CHECKING CHILDREN OF:", this.getTitle());
//         for (let rf of this.state.children) {
//             const child = rf.ref.current;
//             if (child instanceof NotePointView && child.inView()) {
//                 titles = titles.concat(child.buildViewTree());
//                 break;
//             }
//         }
//         return titles;
//     }
//
//     async insertAfter(newComponent: Component, oldChild: ComponentView<Component>) {
//         return await new Promise(resolve => {
//             const children = this.state.children;
//             const newChild = this.awake(newComponent);
//             const newChildren = [];
//             let i = 0;
//             while (i < children.length) {
//                 const child = children[i];
//                 const component = child.ref.current;
//                 newChildren[i] = child;
//                 i++;
//                 if (component === oldChild) {
//                     newChildren[i] = newChild;
//                     break;
//                 }
//             }
//             while (i < children.length) {
//                 newChildren[i + 1] = children[i];
//                 i++;
//             }
//             this.setState({children: newChildren}, resolve);
//         });
//     }
//
//     async replace(oldComponent: ComponentView<Component>, replacements: Component[]) {
//         return await new Promise(resolve => {
//             const children = this.state.children;
//             const newChildren = [];
//             let i = 0;
//             while (i < children.length) {
//                 const child = children[i];
//                 const component = child.ref.current;
//                 if (component !== oldComponent) {
//                     newChildren[i] = child
//                 } else {
//                     for (let j = 0; j < replacements.length; j++)
//                         newChildren.push(this.awake(replacements[j]));
//                     i++;
//                     break;
//                 }
//                 i++;
//             }
//             while (i < children.length) {
//                 newChildren.push(children[i]);
//                 i++;
//             }
//             this.setState({children: newChildren}, resolve);
//         });
//     }
//
//     add = async (newComponent: Component) =>
//         await new Promise(resolve => {
//             const newChild = this.awake(newComponent);
//             this.setState({children: [...this.state.children, newChild]}, resolve);
//         });
//
//     async remove(oldChild: ComponentView<Component>) {
//         return await new Promise(resolve => {
//             // TODO: duplicate detection
//             const children = this.state.children;
//             const newChildren = [];
//             let i = 0;
//             while (i < children.length) {
//                 const child = children[i];
//                 const component = child.ref.current;
//                 if (component === oldChild) {
//                     this.focusBefore(oldChild);
//                     i++;
//                     break;
//                 }
//                 newChildren[i] = child;
//                 i++;
//             }
//             if (i === children.length) resolve();
//             while (i < children.length) {
//                 newChildren[i - 1] = children[i];
//                 i++;
//             }
//             this.setState({children: newChildren}, resolve);
//         });
//     }
//
//     focusBefore(child: ComponentView<Component>) {
//         const children = this.state.children;
//         for (let i = 0; i < children.length; i++) {
//             if (children[i].ref.current === child) {
//                 if (i > 0) children[i - 1].ref.current.focus();
//                 else this.focus();
//                 break;
//             }
//         }
//     }
//
//     focusNext(child: ComponentView<Component>) {
//         const children = this.state.children;
//         for (let i = 0; i < children.length; i++) {
//             if (children[i].ref.current === child) {
//                 if (i > 0) children[i + 1].ref.current.focus();
//                 else if (this.props.next) this.props.next();
//                 break;
//             }
//         }
//     }
//
//     awake: <T extends Component>(component: T) => RefView<T> = // TODO: INFER RETURN TYPE
//         component => {
//             const child = component.getRefView(async (newComponent: Component) => {
//                 await this.insertAfter(newComponent, child.ref.current);
//             }, async () => {
//                 await this.remove(child.ref.current);
//             }, async () => {
//                 await this.focusNext(child.ref.current);
//             }, async () => {
//                 await this.focusBefore(child.ref.current);
//             }, async (...replacement) => {
//                 await this.replace(child.ref.current, replacement);
//             });
//             return child;
//         };
//
//     state = {
//         children: this.props.children.map(this.awake),
//         title: this.props.title
//     };
//
//     getTitle() {
//         return this.state.title;
//     }
//
//     inView(): boolean {
//         const bound = this.root.current.getBoundingClientRect();
//         const navHeight = nav.offsetHeight;
//         return bound.top < navHeight && bound.bottom > navHeight;
//     }
//
//     focus() {
//         this.title.current.focus();
//     }
//
//     componentDidMount() {
//         this.focus();
//     }
//
//     onKeyDown: React.KeyboardEventHandler = async e => {
//         console.log(e.keyCode);
//         if (e.keyCode === 13) {
//             e.preventDefault();
//             await this.add(new Point(""));
//         }
//         if (e.ctrlKey && e.keyCode === 8) {
//             if (this.props.replace) {
//                 e.preventDefault();
//                 await this.props.replace(...this.getChildren());
//             }
//         }
//     };
//
//     renderNode() {
//         return <span className="title-node">
//             <span
//                 onClick={this.focus}
//                 className="title-node-content"
//             >{this.getTitle()}</span>
//         </span>;
//     }
//
//     render(): any {
//         return <div className="note" ref={this.root}>
//             <div className="note-body">
//                 {this.renderTitle()}
//                 <div className="note-children">
//                     {this.state.children.map(rv => rv.component)}
//                 </div>
//             </div>
//         </div>
//     }
//
//     private getChildren() {
//         return this.state.children.map(note => note.ref.current.value);
//     }
//
//     private onInput = (e: React.FormEvent<HTMLDivElement>) => this.setState({title: e.currentTarget.textContent});
//
//     private renderTitle() {
//         return <div
//             className="note-title"
//             contentEditable suppressContentEditableWarning
//             tabIndex={0}
//             onInput={this.onInput}
//             onKeyDown={this.onKeyDown}
//             ref={this.title}
//         >{this.getTitle()}</div>;
//     }
// }