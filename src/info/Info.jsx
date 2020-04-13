import React from "react";

class Info extends React.PureComponent {
  state = {
    mes: "",
    name: "",
  };

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="info">
        <input
          id="name"
          onChange={this.changeValue}
          name="name"
          type="text"
          placeholder="Введите имя"
        />
        <input
          id="mes"
          onChange={this.changeValue}
          name="mes"
          type="text"
          placeholder="Ваше сообщение"
        />
        <button
          type="button"
          onClick={() => {
            send(this.state.name, this.state.mes);
          }}
        >
          Отправить
        </button>
      </div>
    );
  }
}

export default Info;
