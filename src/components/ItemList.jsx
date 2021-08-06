import React from "react";

class ItemList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ul className="list">
                {this.state.items.map(function (item, index) {
                    return <Item />;
                })}
            </ul>
        );
    }
}

export default ItemList;
