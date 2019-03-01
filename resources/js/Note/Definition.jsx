import React from "react";
import Point from "./Point";
import DefinitionComponent from "./components/Definition";

export default class Definition extends Point {
    static TYPE = "definition";

    constructor(title, body) {
        super(body);
        this.title = title;
    }

    get value() {
        return {
            type: Definition.TYPE,
            title: this.title,
            body: this.body
        };
    }

    getComponent(add, remove) {
        return <DefinitionComponent
            key={JSON.stringify(this.value)}
            add={add}
            remove={remove}
            ref={React.createRef()}
            title={this.title}
        >{this.body}</DefinitionComponent>;
    }
}