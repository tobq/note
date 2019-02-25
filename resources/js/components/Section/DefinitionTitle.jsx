import React from "react";
import PropTypes from "prop-types";
import Editable from "./Editable";

export default class DefinitionTitle extends Editable {
    static propTypes = {
        children: PropTypes.string.isRequired
    };

    get value() {
        return this.state.value;
    }

    render() {
        return this.state.edit ?
            <div className="definition-title">{this.getInput()}</div> :
            <div className="definition-title" tabIndex={0} onFocus={e => this.edit()}>
                {this.state.value}
            </div>
    }
}