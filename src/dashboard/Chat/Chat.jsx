import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../dashboard.css";
import profile from "../../images/profile photo.png";
import chip from "../../images/chip.png";
import infinty from "../../images/infinty.png";
import Cookies from "js-cookie";
import ChatModal from "./ChatModal";

const token = Cookies.get("token");

const Chat = () => {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUserMessages();
  }, [userId]);

  const fetchUserMessages = async () => {
    try {
      const response = await fetch(`http://localhost:9000/api/v1/sunnah/website/message/chat/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log("Data:", data);
      if (data && data.data) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching user messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch("http://localhost:9000/api/v1/sunnah/website/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: newMessage,
          to: userId,
        }),
      });
      const data = await response.json();
      console.log("Sent Data:", data);

      setMessages((prevMessages) => [...prevMessages, data.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleUserClick = (userId) => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div style={{ height: "100vh" }} className="pt-3 px-3">
      <div className="chatGround h-100" style={{ position: "relative" }}>
        <div className="w-100 bg-light chatHeader">
          <div className="mx-5">
            <img src={profile} alt="Chat" style={{ width: "60px" }} />
            <span className="fw-bold mx-3">المرسل</span>
          </div>
        </div>
        <div className="container">
          {messages.map((message, index) => (
            <div key={index} className={`d-flex justify-content-${message.from._id === userId ? "end" : "start"}`}>
              <div
                className="bg-light justify-content-end  d-flex align-items-end justify-content-between mt-3"
                style={{
                  maxWidth: "50%",
                  borderRadius: "30px",
                  position: "relative",
                  right: message.from._id === userId ? "0px" : "auto",
                }}
              >
                <span className="p-3">{message.content}</span>
                <small className="p-2">{message.time}</small>
                <img
                  src={chip}
                  alt="Chat"
                  style={{
                    width: "25px",
                    position: "absolute",
                    left: message.from._id === userId ? "25px" : "auto",
                    right: message.from._id !== userId ? "25px" : "auto",
                    bottom: "-15px",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="m-auto inputChat mt-3 d-flex  bg-light"
          style={{
            width: "100%",
            position: "absolute",
            bottom: "0px",
          }}
        >
          <div className="d-flex align-items-center justify-content-around">
            <img
              src={infinty}
              alt="Infinti"
              style={{ width: "25px", height: "25px", margin: "0px 10px" }}
            />
          </div>
          <input
            type="text"
            placeholder="اكتب رسالتك"
            className="h-100 rounded border-0 p-3 "
            style={{ width: "90%", backgroundColor: "lightgray" }}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage} style={{ display: "none" }}></button>
        </div>
      </div>
      <ChatModal
        show={showModal}
        handleClose={handleCloseModal}
        messages={messages}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        sendMessage={sendMessage}
        profile={profile}
        userId={userId}
        chip={chip}
        infinty={infinty}
      />
    </div>
  );
};

export default Chat;
