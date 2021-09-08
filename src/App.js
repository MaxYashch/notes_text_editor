import React from "react";
import "./styles/App.css";
import ItemList from "./components/ItemList";
import HashtagList from "./components/HashtagList";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            hashtags: [],
            currentItem: {
                text: "",
                key: "",
            },
        };
        this.handleInput = this.handleInput.bind(this);
        this.addItem = this.addItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.deleteHash = this.deleteHash.bind(this);
        this.editItem = this.editItem.bind(this);
        this.saveJSON = this.saveJSON.bind(this);
        this.getHashtag = this.getHashtag.bind(this);
    }

    getHashtag() {
        const newItem = this.state.currentItem;
        console.log(newItem.text);
        if (newItem.text !== "" && newItem.text.includes("#")) {
            const newHash = newItem.text
                .split(" ")
                .filter((item) => item[0] === "#" && item[1] !== undefined);

            const newHashtag = {
                hashtag: newHash,
                key: Date.now(),
            };
            const newHashtags = [...this.state.hashtags, newHashtag];
            this.setState({
                hashtags: newHashtags,
            });
        }
        console.log(this.state.hashtags);
        // return str
        //     .split(" ")
        //     .filter((item) => item[0] === "#" && item[1] !== undefined);
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

    deleteHash(key) {
        const filteredHashes = this.state.hashtags.filter(
            (hash) => hash.key !== key
        );
        this.setState({
            hashtags: filteredHashes,
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

    saveJSON = (filename) => {
        const fileData = JSON.stringify(this.state.items);
        // const fileData = JSON.stringify(localStorage.getItem("state"));
        const blob = new Blob([fileData], {
            type: "text/plain",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.download = `${filename}.json`;
        link.href = url;
        link.click();
    };

    componentDidUpdate() {
        setTimeout(() => {
            localStorage.setItem("state", JSON.stringify(this.state.items));
        }, 100);
        setTimeout(() => {
            localStorage.setItem(
                "hashtags",
                JSON.stringify(this.state.hashtags)
            );
        }, 100);
    }

    componentDidMount() {
        const data = JSON.parse(localStorage.getItem("state"));
        const dataHash = JSON.parse(localStorage.getItem("hashtags"));
        if (data !== null) {
            this.setState({ items: data });
        }
        if (dataHash !== null) {
            this.setState({ hashtags: dataHash });
        }
    }

    render() {
        return (
            <div className="App">
                {/* <SimpleHashtagEditor /> */}
                <header>
                    <form id="todo" onSubmit={this.addItem}>
                        <input
                            type="text"
                            placeholder="Enter text"
                            value={this.state.currentItem.text}
                            onChange={this.handleInput}
                        />
                        <button type="submit" onClick={this.getHashtag}>
                            Add note
                        </button>
                        <button type="button" onClick={this.saveJSON}>
                            to JSON
                        </button>
                    </form>
                </header>
                <HashtagList
                    items={this.state.items}
                    hashtags={this.state.hashtags}
                    deleteHash={this.deleteHash}
                />
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
