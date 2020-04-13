import React from "react";

class Chat extends React.PureComponent {
  render() {
    const { data } = this.props;
    data.splice(0, 1);
    data.reverse();
    return (
      <div className="chat">
        {data.map((item) => (
          <div className="chat-item" key={item.id}>
            <div className="chat-name">{item.name}</div>
            <div className="chat-mes">{unsecret(item.message)}</div>
          </div>
        ))}
      </div>
    );
  }
}

export default Chat;
