import React from "react";

class Item extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <li>
                <p>{this.props.item.text}</p>
            </li>
        );
    }
}

export default Item;
