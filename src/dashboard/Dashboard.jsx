import React, { useEffect, useState } from "react";
import "./dashboard.css";
import profile from "../images/profile photo.png";
import home from "../images/home icon.png";
import chatIcone from "../images/chaticon.png";
import library from "../images/library.png";
import search from "../images/search.png";
import saveAs from "../images/SaveAs.png";
import cover from "../images/cover.png";
import setting from "../images/setting.png";
import FormHadith from "./Hadith/FormHadith";
import FormBook from "./Book/FormBook";
import FormSubAdmin from "./subadmin/FormSubAdmin";  // Import FormSubAdmin
import AllSubAdmin from "./subadmin/allsubAdmin";  // Import FormSubAdmin
import Admin from "./Admin/Admin";  // Import FormSubAdmin
import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import HadithItem from "./Hadith/HadithItem";
import BookItem from "./Book/BookItem";

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Dashboard = () => {
    const [openBook, setOpenBook] = useState(false);
    const [openHadith, setOpenHadith] = useState(false);
    const [openSubAdmin, setOpenSubAdmin] = useState(false);  // State for SubAdmin modal
    const [openAdmin, setOpenAdmin] = useState(false);  // State for SubAdmin modal
    const [openAllSubAdmin, setOpenAllSubAdmin] = useState(false);  // State for SubAdmin modal
    const [getBook, setGetBook] = useState([]);
    const [status, setStatus] = useState(null);
    const [getHadith, setGetHadith] = useState([]);
    const [modal, setModal] = useState(false);
    const [hadithModel, setHadithModel] = useState(false);
    const [searchToggle, setSearch] = useState(false);
    const [edit, setEdit] = useState(null);
    const [isHadithEdit, setIsHadithEdit] = useState(false);
    const [editHadithId, setEditHadithId] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [addSubBook, setAddSubBook] = useState({
        bookId : null,
    });

    const [id, setID] = useState(null);
    const [idHadith, setIDHadith] = useState(null);

    const handleSetID = (id) => {
        getHadithData(id);
        setID(id);
    };

    const handleModal = (id) => {
        setModal(!modal);
        setID(id);
    };

    const handleSetIDHadith = (id) => {
        setIDHadith(id);
    };

    const handelEdit = (e) => {
        setEdit(e);
        setOpenBook(true);
        setModal(false);
    };

    const handelEditHadith = (e) => {
        setOpenHadith(true);
        setHadithModel(false);
        setEditHadithId(e);
    };

    const token = Cookies.get("token");
    const loggedInUserId = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    const getBookData = async () => {
        const response = await fetch(
            "http://localhost:9000/api/v1/sunnah/website/book",
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        setGetBook(data.data);
    };

    const getHadithData = async (id) => {
        await id;
        const response = await fetch(
            `http://localhost:9000/api/v1/sunnah/website/hadith?book=${id}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        const data = await response.json();
        setGetHadith(data.data);
    };

    const deleteBookData = async () => {
        await fetch(`http://localhost:9000/api/v1/sunnah/website/book/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }).then(() => {
            setStatus("تم حذف الكتاب بنجاح");
            setModal(false);
            getBookData();
        });
    };

    const deleteHadithData = async (id) => {
        await fetch(
            `http://localhost:9000/api/v1/sunnah/website/hadith/${id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        ).then(() => {
            setStatus("تم حذف الحديث بنجاح");
            setHadithModel(false);
            getBookData();
            getHadithData(id);
        });
    };

    useEffect(() => {
        getBookData();
    }, []);

    return (
        <div style={{ padding: "50px" }} className="parent d-flex  pt-2">
            <div className="container  col-3">
                <div className="menu d-flex flex-wrap align-items-center  text-light fw-bold">
                    <NavLink className="container text-light text-decoration-none col-12 p-3">
                        <img
                            src={home}
                            className="profile"
                            alt="profileimage pt-2"
                        />
                        <span className="px-2">الاساسيه</span>
                    </NavLink>
                    <NavLink
                        className="container  text-light text-decoration-none col-12 p-3"
                        to={"/chat"}
                    >
                        <img
                            src={chatIcone}
                            className="profile"
                            alt="profileimage pt-2"
                        />
                        <span className="px-2">محادثه</span>
                    </NavLink>
                    <div className="container  text-light text-decoration-none col-12 p-3">
                    <span
                            style={{ fontSize: "30px", cursor: "pointer" }}
                            onClick={() => setOpenSubAdmin(true)}
                        >
                            +
                        </span>
                        <span className="px-2">اضافه مشرف</span>

                        
                    </div>
                    <div className="container  text-light text-decoration-none col-12 p-3">
                    <span
                            style={{ fontSize: "30px", cursor: "pointer" }}
                            onClick={() => setOpenAllSubAdmin(true)}
                        >
                            +
                        </span>
                        <span className="px-2">عرض المشرفين</span>

                        
                    </div>
                </div>
                <div style={{ height: "80%" }} className="mt-3 menu ">
                    <div className=" container d-flex flex-wrap justify-content-between align-items-center text-end text-light fw-bold">
                        <div>
                            <img
                                src={library}
                                className="profile"
                                alt="profileimage pt-2"
                            />
                            <span>المكتبه</span>
                        </div>

                        <span
                            style={{ fontSize: "50px", cursor: "pointer" }}
                            onClick={() => setOpenBook(true)}
                        >
                            +
                        </span>
                    </div>

                    <Box sx={{ width: "100%" }}>
                        <Tabs
                            value={activeTab}
                            onChange={(value, newVale) => setActiveTab(newVale)}
                            aria-label="basic tabs example"
                        >
                            <Tab
                                style={{
                                    borderRadius: "25px",
                                    cursor: "pointer",
                                    width: "fit-content",
                                }}
                                className={
                                    activeTab === 0
                                        ? "bg-success m-2 text-light fw-bold p-1"
                                        : "bg-light m-2 text-success fw-bold  p-1"
                                }
                                label="كتب كامله"
                            />
                            
                        </Tabs>
                        <TabPanel value={activeTab} index={0}>
                            <div className="m-2" >
                                
                                {searchToggle ? (
                                    <input
                                        className=" border"
                                        type="text"
                                        style={{ borderRadius: "25px" }}
                                        placeholder="بحث"
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                            <div
                                className="d-flex justify-content-center flex-wrap SideBar"
                                style={{
                                    position: "relative",
                                    top: "0px",
                                    overflowY: "scroll"
                                }}
                            >
                                {getBook.length > 0
                                    ? getBook.map((e, inx) => (
                                          <BookItem
                                              e={e}
                                              handleSetID={handleSetID}
                                              inx={inx}
                                              saveAs={saveAs}
                                              handleModal={handleModal}
                                              modal={modal}
                                              id={id}
                                              setOpenBook={setOpenBook}
                                              handelEdit={handelEdit}
                                              deleteBookData={deleteBookData}
                                              setAddSubBook={setAddSubBook}
                                          />
                                      ))
                                    : "لايوجد كتب"}
                            </div>
                        </TabPanel>
                        <TabPanel value={activeTab} index={1}>
                            لا توجد كتب بالاجزاء
                        </TabPanel>
                    </Box>
                </div>
            </div>
            <div className="container col-7 pt-2 menu">
                <div className="text-start">
                    <img
                        src={"/logo.png"}
                        alt="profileimage pt-1"
                        style={{ width: "50px", height: "50px" }}
                    />
                </div>

                <div className="d-flex justify-content-around">
                    <div className="col-3">
                        <img src={cover} alt="cover" className="w-100 h-100" />
                    </div>
                    <div className="col-8">
                        <strong className="text-light d-block">
                            الاربعين النوويه
                        </strong>
                        <span className="text-light d-block">الوصف:</span>
                        <p
                            className="text-dark d-block bg-light p-2 "
                            style={{ borderRadius: "30px", fontSize: "12px" }}
                        >
                            وكل كتاب في صحيح البخاري يتضمَّن أبوابًا يَذكر
                            فيها البخاري بعضَ الآيات المناسِبة للباب،
                            ويروي في كلِّ باب عددًا من الأحاديث بإسناده،
                            ويكرِّر غالبًا الحديثَ الواحد في أكثر من باب؛
                            ليستخرج منه بعضَ الأحكام الفقهية وبعضَ الفوائد
                            المستنبَطة؛ ولذلك قال العلماء: فِقهُ البخاري
                            في تَراجِمه؛ أي: في الأبواب التي عقَدها في صحيحه 
                        </p>
                        <div className="d-flex text-light justify-content-between">
                            <small className="fw-bold">
                                المألف :يحيى بن شرف النووي
                            </small>
                            <small className="fw-bold">
                                تاريخ الإصدار : 668 هـ.{" "}
                            </small>
                        </div>
                        <div className="d-flex justify-content-end align-items-center text-start mt-5">
                            <div
                                className="bg-success p-1 col-2 text-center fw-bold text-light BtnAdd "
                                style={{
                                    borderRadius: "30px",
                                    cursor: "pointer",
                                }}
                                onClick={() => {
                                    setOpenHadith(true);
                                }}
                            >
                                {" "}
                                <span className="px-2">اضافه</span>
                                <span>+</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="text-light d-flex flex-wrap">
                    <div className=" col-12 ">
                        <div className="d-flex  col-12 text-center justify-content-around ">
                            <p className="col-4">الاحاديث</p>
                            <p className="col-4">تصنيف</p>
                            <p className="col-4">تاريخ الاضافه</p>
                        </div>
                    </div>
                    <div
                        className="d-flex flex-wrap text-center SideBar w-100"
                        style={{ overflowY: "auto", maxHeight: "250px" }}
                    >
                        {getHadith.length > 0 && getHadith !== undefined
                            ? getHadith.map((e, inx) => {
                                  return (
                                      <HadithItem
                                          handleSetIDHadith={handleSetIDHadith}
                                          handelEditHadith={handelEditHadith}
                                          setIsHadithEdit={setIsHadithEdit}
                                          deleteHadithData={deleteHadithData}
                                          idHadith={idHadith}
                                          e={e}
                                          key={inx}
                                      />
                                  );
                              })
                            : ""}
                    </div>
                </div>
            </div>
            {loggedInUserId !== "65db5bc983a883c20c5266b9" && (
            <img
                src={setting}
                alt="Setting"
                style={{
                    width: "60px",
                    height: "60px",
                    position: "absolute",
                    bottom: "25px",
                    right: "25px",
                }}
                onClick={() => setOpenAdmin(true)}
            />
            )}
            <FormBook
                open={openBook}
                id={edit}
                getBookData={getBookData}
                setOpen={() => {
                    setOpenBook(false);
                }}
                addSubBook={addSubBook}
                setAddSubBook={setAddSubBook}
            />
            <FormHadith
                open={openHadith}
                getBookData={getHadithData}
                setOpen={() => {
                    setOpenHadith(false);
                }}
                id={id}
                isHadithEdit={isHadithEdit}
                editHadithId={editHadithId}
                idEdit={idHadith}
                setEditHadithId={setEditHadithId}
                setIsHadithEdit={setIsHadithEdit}
            />
            <FormSubAdmin
                open={openSubAdmin}
                setOpen={() => {
                    setOpenSubAdmin(false);
                }}
                getAdminsData={getBookData}  // Assuming getBookData will also fetch admins; if not, create a separate function
            />
            <AllSubAdmin
                open={openAllSubAdmin}
                setOpen={() => {
                    setOpenAllSubAdmin(false);
                }}
                getAdminsData={getBookData}  // Assuming getBookData will also fetch admins; if not, create a separate function
            />
            <Admin
                open={openAdmin}
                setOpen={() => {
                    setOpenAdmin(false);
                }}
               
            />
            <span
                className="fw-bold text-success"
                style={{ position: "absolute", left: "15px", bottom: "15px" }}
            >
                {status}
            </span>
        </div>
    );
};

export default Dashboard;
