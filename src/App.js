import React from "react";
import "./App.css";
import ItemList from "./components/ItemList";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            currentItem: {
                text: "",
                key: "",
            },
        };
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    handleInput(e) {
        this.setState({
            currentItem: {
                text: e.target.value,
                key: Date.now(),
            },
        });
    }

    addItem(e) {
        e.preventDefault();
        const newItem = this.state.currentItem;
        console.log(newItem);
        if (newItem.text !== "") {
            const newItems = [...this.state.items, newItem];
            this.setState({
                items: newItems,
                currentItem: {
                    text: "",
                    key: "",
                },
            });
        }
        console.log(this.state.items);
    }

    deleteItem(key) {
        const filteredItems = this.state.items.filter(
            (item) => item.key !== key
        );
        this.setState({
            items: filteredItems,
        });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <form id="todo" onSubmit={this.addItem}>
                        <input
                            type="text"
                            placeholder="Enter text"
                            value={this.state.currentItem.text}
                            onChange={this.handleInput}
                        />
                        <button type="submit">Add note</button>
                    </form>
                </header>
                <ItemList
                    items={this.state.items}
                    deleteItem={this.deleteItem}
                />
            </div>
        );
    }
}

export default App;
