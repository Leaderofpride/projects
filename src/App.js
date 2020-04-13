import React from "react";
import { secret, unsecret } from "./rsa.js";
import Info from "./info/Info.jsx";
import Chat from "./chat/Chat.jsx";
import "./App.css";
import "./style.css";

class App extends React.PureComponent {
  state = {
    data: [],
  };

  async componentDidMount() {
    this.timer = setInterval(() => this.tick(), 3000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  async tick() {
    this.setState({ data: await getAll() });
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <Chat data={this.state.data} />
          <Info />
        </div>
      </div>
    );
  }
}

async function send(name, mes) {
  const obj = {
    name: name,
    message: secret(mes),
  };
  fetch(`http://localhost:3000/data`, {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  });
  document.getElementById("name").value = "";
  document.getElementById("mes").value = "";
}

async function getAll() {
  const data = await fetch(`http://localhost:3000/data`);
  const mes = await data.json();
  return mes;
}

export default App;
