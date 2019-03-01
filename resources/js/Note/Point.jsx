import React from "react";
import PointComponent from "./components/Point";

export default class Point {
    static TYPE = "point";

    constructor(body = "") {
        this.body = body;
    }

    get value() {
        return {
            type: Point.TYPE,
            body: this.body
        };
    }

    getComponent(add, remove) {
        return <PointComponent
            key={JSON.stringify(this.value)}
            add={add}
            remove={remove}
            ref={React.createRef()}
        >{this.body}</PointComponent>;
    }
}