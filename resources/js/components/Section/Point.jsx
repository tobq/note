import React from "react";
import PropTypes from "prop-types";

export default class Point extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
    };

    text = React.createRef();

    get value() {
        return {
            type: "point",
            value: this.text.current.textContent
        };
    }

    render() {
        return <div className="point section">
            <div className="section-body" tabIndex={0} contentEditable ref={this.text}>{this.props.children}</div>
        </div>
    }
}