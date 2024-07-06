import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
        flexWrap: "wrap",
      }}
    >
      <img
        src="/logo.png"
        alt=""
        width={50}
        height={50}
        style={{ margin: "15px" }}
      />
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            marginTop: "170px",
            marginRight: "30px",
            flexDirection: "column",
          }}
        >
          <div>
            <img src="/title.png" alt="" width={200} />
            <p className="p-Home">
             
            دعونا نتعلم الأحاديث النبوية ونعرف
            </p>
            <p className="p-Home">
            
            التفسير والنطق الصحيح جنبا إلى جنب مع{" "}
            </p>
            <p className="p-Home"> Sunnah</p>
          </div>

          <div style={{ margin: "40px auto" }}>
          

            <Link to={"/login"}>
              <button className="btn1"> تسجيل الدخول </button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <div className="img" />
      </div>
    </div>
  );
};

export default Home;
