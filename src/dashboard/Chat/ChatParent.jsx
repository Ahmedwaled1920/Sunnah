import React from "react";
import PersonalChat from "./PersonalChat";
import setting from "../../images/setting.png";

const ChatParent = () => {
  return (
    <div className="d-flex parent justify-content-around">
      <div className="col-12">
        <PersonalChat />
      </div>
      
     
    </div>
  );
};

export default ChatParent;
