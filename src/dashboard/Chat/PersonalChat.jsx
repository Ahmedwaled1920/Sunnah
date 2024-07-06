import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";
import profile from "../../images/profile photo.png";
import chatIcone from "../../images/chaticon.png";
import ChatModal from "./ChatModal";

const token = Cookies.get("token");

const PersonalChat = () => {
  const [userMessages, setUserMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  useEffect(() => {
    fetchUserMessages();
  }, []);

  const fetchUserMessages = async () => {
    try {
      const response = await fetch("http://localhost:9000/api/v1/sunnah/website/message", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data && data.data) {
        setUserMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching user messages:", error);
    }
  };

  const handleUserClick = (participant) => {
    setSelectedParticipant(participant);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedParticipant(null);
  };

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {/* <div className="menu d-flex flex-wrap align-items-center col-9 text-light fw-bold">
        <NavLink className="container text-light text-decoration-none col-6 p-3" to={"/dashboard"}>
          <img src={profile} className="profile" alt="profile" style={{ width: "30px" }} />
          <span className="px-2">الاساسيه</span>
        </NavLink>
        <NavLink className="container text-light text-decoration-none col-6 p-3">
          <img src={chatIcone} className="profile" alt="profile" style={{ width: "30px" }} />
          <span className="px-2">م
          [/span>
        </NavLink>
      </div> */}
      <div className="bg-light col-3 mt-3 " style={{ borderRadius: "30px" }}>
        <div className="m-auto p-3" style={{ position: "relative" }}>
          <input className="h-100 p-0 text-dark w-100 m-auto input" placeholder="بحث" />
          <div className="text-dark" style={{ position: "absolute", right: "35px", top: "15px" }}>
            <FaSearch fontSize={"large"} className="fs-6" />
          </div>
        </div>
        <div style={{ overflowY: "scroll", height: "65vh" }} className="SideBar">
          {userMessages.map((conversation) => {
            const lastMessage = conversation.messages[conversation.messages.length - 1];
            const otherParticipant = conversation.participants.find(
              (participant) => participant.id !== "65db5bc983a883c20c5266b9"
            );
            return (
              <div key={lastMessage._id} style={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
                <div className="d-flex justify-content-around my-3" onClick={() => handleUserClick(otherParticipant)}>
                  <div className="col-2">
                    <img src={profile} alt="PersonalImage" className="chat" style={{ width: "45px" }} />
                  </div>
                  <div className="d-flex flex-wrap text-center col-4">
                    <strong className="col-12">{otherParticipant.name}</strong>
                    <small className="col-12">{lastMessage.content}</small>
                  </div>
                  <div className="d-flex flex-wrap justify-content-center col-4 text-center">
                    <span className="col-10">{lastMessage.time}</span>
                    <span className="col-10 justify-content-center d-flex">
                      <small className="bg-success col-3 rounded-circle text-light">3</small>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="col-9 mt-3 pt-3 ">
        {showModal && selectedParticipant && (
          <ChatModal
            participant={selectedParticipant}
            closeModal={handleCloseModal}
            token={token}
          />
        )}
      </div>
    </div>
  );
};

export default PersonalChat;
