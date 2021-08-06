import React from "react";

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <li
                className={`list__item ${colorClass} ${checkedClass}`}
                data-id={this.props.id}
            ></li>
        );
    }
}

export default Item;
