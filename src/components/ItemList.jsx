import React from "react";
// import Item from "./Item";
import "./ItemList.css";

class ItemList extends React.Component {
    render() {
        const items = this.props.items;
        const listItems = items.map((item) => (
            <div className="list">
                <p key={item.key}>
                    <input
                        type="text"
                        value={item.text}
                        key={item.key}
                        onChange={(e) =>
                            this.props.editItem(e.target.value, item.key)
                        }
                    />

                    <span
                        className="faicons"
                        onClick={() => {
                            this.props.deleteItem(item.key);
                        }}
                    >
                        <i className="far fa-trash-alt"></i>
                    </span>
                </p>
            </div>
        ));

        return <div>{listItems}</div>;
    }
}

// function ItemList(props) {
//     const items = props.items;
//     const listItems = items.map((item) => (
//         <div className="list">
//             <p key={item.key}>
//                 {item.text}

//                 <span
//                     className="faicons"
//                     onClick={() => {
//                         props.deleteItem(item.key);
//                     }}
//                 >
//                     <i className="far fa-trash-alt"></i>
//                 </span>
//             </p>
//         </div>
//     ));

//     return <div>{listItems}</div>;
// }

export default ItemList;
