import React from "react";
import "./App.css";

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
            </div>
        );
    }
}

export default App;
