import React from "react";
import "./styles/App.css";
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
        this.editItem = this.editItem.bind(this);
        this.saveStateToLocalStorage = this.saveStateToLocalStorage.bind(this);
        this.saveJSON = this.saveJSON.bind(this);
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
        // console.log(newItem);
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
        // console.log(this.state.items);
    }

    deleteItem(key) {
        const filteredItems = this.state.items.filter(
            (item) => item.key !== key
        );
        this.setState({
            items: filteredItems,
        });
    }

    editItem(text, key) {
        const newItem = this.state.items;
        newItem.forEach((item) => {
            if (item.key === key) {
                item.text = text;
            }
        });
        this.setState({
            items: newItem,
        });
    }

    saveStateToLocalStorage = () => {
        localStorage.setItem("state", JSON.stringify(this.state.items));
    };

    getStateFromLocalStorage = () => {
        let data = localStorage.getItem("state");
        if (data !== undefined) {
            this.setState(JSON.parse(data));
        }
    };

    componentDidMount() {
        this.getStateFromLocalStorage();
    }

    saveJSON = (filename) => {
        const fileData = JSON.stringify(this.state.items);
        // const fileData = JSON.stringify(localStorage.getItem("state"));
        const blob = new Blob([fileData], {
            type: "text/plain",
        });
        // const blob = new Blob(
        //     [JSON.stringify(localStorage.getItem("state"), null, 2)],
        //     { type: "application/json" }
        // );
        // const blob = new Blob([JSON.stringify(obj, null, 2)], {type : 'application/json'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${filename}.json`;
        link.href = url;
        link.click();
    };

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
                        <button
                            type="button"
                            onClick={this.saveStateToLocalStorage}
                        >
                            LocalStrg
                        </button>
                        <button type="button" onClick={this.saveJSON}>
                            to JSON
                        </button>
                    </form>
                </header>
                <ItemList
                    items={this.state.items}
                    deleteItem={this.deleteItem}
                    editItem={this.editItem}
                />
            </div>
        );
    }
}

export default App;
