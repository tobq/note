import React from "react";
import PropTypes from "prop-types";

export default class Editable extends React.Component {
    static propTypes = {
        children: PropTypes.string.isRequired,
    };

    state = {
        value: this.props.children
    };

    input = React.createRef();

    get value() {
        return this.state.value
    }

    edit() {
        this.setState({edit: true});
        // this.input.current.focus();
    }

    save() {
        this.setState({
            value: this.input.current.value,
        })
        this.reset();
    }

    reset() {
        this.setState({
            edit: false
        })
    }

    getInput() {
        return <input
            defaultValue={this.state.value}
            autoFocus ref={this.input}
            onKeyDown={e => {
                if (e.keyCode === 13) this.save();
            }}
            onBlur={e => this.reset()}
        />
    }

    render() {
        return this.state.edit ?
            <div className="point section">
            </div> :
            <div className="point section">
                <div className="section-body" tabIndex={0} onFocus={e => this.edit()}>{this.state.value}</div>
            </div>
    }
}