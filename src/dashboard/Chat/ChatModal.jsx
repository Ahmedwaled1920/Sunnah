import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import profile from "../../images/profile photo.png";
import chip from "../../images/chip.png";
import infinty from "../../images/infinty.png";
import "../dashboard.css";

const ChatModal = ({ participant, closeModal, token }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageToDelete, setMessageToDelete] = useState(null); // State for the message to be deleted
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (participant) {
      fetchChatMessages();
    }
  }, [participant]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchChatMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/v1/sunnah/website/message/chat/${participant.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(response.data.data);
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    try {
      const response = await axios.post(
        "http://localhost:9000/api/v1/sunnah/website/message",
        {
          content: newMessage,
          to: participant.id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages((prevMessages) => [...prevMessages, response.data.data]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await axios.delete(
        `http://localhost:9000/api/v1/sunnah/website/message/${messageId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After deletion, fetch the updated messages
      fetchChatMessages();
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setMessageToDelete(null); // Close the confirmation popup
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="chatGround">
      <div className="chatHeader bg-light">
        <div className="mx-5">
          <img src={profile} alt="Chat" style={{ width: "60px" }} />
          <span className="fw-bold mx-3">{participant.name}</span>
        </div>
      </div>
      <div
        className="container"
        style={{ height: "70vh", overflowY: "scroll", paddingBottom: "20px" }}
      >
        {messages.map((message, index) => {
          // Check if message or message.from is undefined before rendering
          if (!message || !message.from || typeof message.from._id === 'undefined') {
            return null;
          }

          return (
            <div
              key={index}
              className={`d-flex justify-content-${
                message.from._id === participant.id ? "end" : "start"
              }`}
            >
              <div
                className="bg-light justify-content-end d-flex align-items-end justify-content-between mt-3"
                style={{
                  maxWidth: "50%",
                  borderRadius: "30px",
                  position: "relative",
                  right: message.from._id === participant.id ? "0px" : "auto",
                }}
              >
                <span onClick={() => setMessageToDelete(message._id)}
                 style={{
                 cursor: "pointer",
                }}
                 className="p-3">{message.content}</span>
                <small className="p-2">{message.time}</small>
                <img
                  src={chip}
                  alt="Chat"
                  style={{
                    width: "25px",
                    position: "absolute",
                    left: message.from._id === participant.id ? "25px" : "auto",
                    right: message.from._id !== participant.id ? "25px" : "auto",
                    bottom: "-15px",
                  }}
                />
              
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="inputChat bg-light d-flex align-items-center justify-content-between">
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
          className="rounded border-0 p-3"
          style={{ width: "90%", backgroundColor: "lightgray" }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>ارسال</button>
      </div>
      {messageToDelete && (
        <div className="confirmationPopup">
          <p>Are you sure you want to delete this message?</p>
          <button onClick={() => deleteMessage(messageToDelete)}>Yes</button>
          <button onClick={() => setMessageToDelete(null)}>No</button>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
