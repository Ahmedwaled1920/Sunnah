import React from "react";
import profile from "../../images/profile photo.png";
import theme from "../../images/theme.png";
import language from "../../images/language.png";
import logOut from "../../images/logout.png";
const Setting = () => {
  return (
    <div className="bg-danger py-3 h-100 bg-light" style={{ borderRadius: "15px 0px 0px 15px"}}>
      <div>
        <div className="d-flex justify-content-around mb-5">
          <div className="col-3">
            <img src={profile} alt="Profile" className="settingImage" />
          </div>
          <div className="col-8">
            <h6>Mohammed Yusef</h6>
            <small className="text-success">@Moh_ Yusef23</small>
          </div>
        </div>
        <div className="m-2">
          <img
            src={profile}
            alt="Profile"
            style={{ width: "40px", height: "40px" }}
          />
          <strong className="mx-2"> Edit Profile</strong>
        </div>
        <div className="d-flex align-items-center m-2 justify-content-between">
          <div>
            <img
              src={theme}
              alt="Profile"
              style={{ width: "40px", height: "40px" }}
            />
            <strong className="mx-2">Change Theme</strong>{" "}
          </div>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked
            />
          </div>
        </div>

        <div className="m-2">
          <img
            src={language}
            alt="Profile"
            style={{ width: "40px", height: "40px" }}
          />
          <strong className="mx-2">Language</strong>
        </div>
        <div style={{ position: "absolute", bottom: "25px", left: "5px" }}>
          <strong className="mx-2">logOut</strong>
          <img
            src={logOut}
            alt="Profile"
            style={{ width: "25px", height: "25px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Setting;
