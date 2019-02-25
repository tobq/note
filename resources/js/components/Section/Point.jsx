import React from "react";
import PropTypes from "prop-types";
import Editable from "./Editable";

export default class Point extends Editable {
    static propTypes = {
        children: PropTypes.string.isRequired,
    };

    get value() {
        return {
            type: "point",
            value: this.state.value
        }
    }

    render() {
        return this.state.edit ?
            <div className="point section">
                {this.getInput()}
            </div> :
            <div className="point section">
                <div className="section-body" tabIndex={0} onFocus={e => this.edit()}>{this.state.value}</div>
            </div>
    }
}