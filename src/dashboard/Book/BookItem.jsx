import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Menu,
    MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Cookies from "js-cookie";

const BookItem = ({
    e,
    inx,
    saveAs,
    handleModal,
    handleSetID,
    modal,
    id,
    handelEdit,
    deleteBookData,
    setOpenBook,
    setAddSubBook,
}) => {
    const token = Cookies.get("token");
    const [subBooks, setSubBooks] = useState([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const getAllSubBooksForMyBook = async (bookId) => {
        await fetch(
            `http://localhost:9000/api/v1/sunnah/website/subBook/${bookId}/all`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
            .then((response) => response.json())
            .then((res) => {
                setSubBooks(res?.data?.length ? res?.data : []);
            });
    };

    const deleteSubBook = async (subBookId) => {
        try {
            await fetch(
                `http://localhost:9000/api/v1/sunnah/website/subBook/${subBookId}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            getAllSubBooksForMyBook(subBookId);
        } catch (error) {
            console.log("error in deleting");
        }
    };

    return (
        <>
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        <img
                            src={saveAs}
                            alt="Save As"
                            className="mx-2"
                            value={e._id}
                            onClick={(e) => {
                                handleModal(e.target.getAttribute("value"));
                            }}
                        />
                        <span
                            class="btn "
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#book${e._id}`}
                            aria-expanded="false"
                            className="text-light fw-bold"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                getAllSubBooksForMyBook(
                                    e.target.getAttribute("value")
                                );
                            }}
                            value={e._id}
                        >
                            {e.title}{" "}
                        </span>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* all sub books */}
                        {subBooks?.map((subBook, ind) => {
                            return (
                                <div className="flex-wrap d-flex align-items-center">
                                    <div
                                        onClick={(e) => {
                                            handleClick(e);
                                        }}
                                        id="basic-button"
                                        aria-controls={
                                            open ? "basic-menu" : undefined
                                        }
                                        aria-haspopup="true"
                                        aria-expanded={
                                            open ? "true" : undefined
                                        }
                                    >
                                        <img
                                            src={saveAs}
                                            alt="Save As"
                                            className="mx-2"
                                        />
                                    </div>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        MenuListProps={{
                                            "aria-labelledby": "basic-button",
                                        }}
                                    >
                                        <MenuItem
                                            onClick={() => {
                                                setOpenBook(true);
                                                setAddSubBook({
                                                    bookId: subBook._id,
                                                    editSubBook : true,
                                                });
                                                handleClose();
                                            }}
                                            
                                        >
                                            تعديل
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => {
                                                deleteSubBook(subBook._id);
                                                handleClose();
                                            }}
                                        >
                                            حذف
                                        </MenuItem>
                                    </Menu>
                                    <p
                                        key={ind}
                                        class="btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#book${e._id}`}
                                        aria-expanded="false"
                                        className="text-light fw-bold"
                                        style={{
                                            cursor: "pointer",
                                        }}
                                        value={subBook._id}
                                        onClick={(e) => {
                                            handleSetID(
                                                e.target.getAttribute("value")
                                            );
                                        }}
                                    >
                                        {subBook?.title}
                                    </p>
                                </div>
                            );
                        })}
                    </AccordionDetails>
                </Accordion>
            </div>
            {modal ? (
                <div
                    className="bg-light form d-flex flex-wrap justify-content-center align-items-center"
                    style={{
                        width: "170px",
                        height: "150px",
                        position: "absolute",
                        zIndex: "10000000000",
                        left: "-10%",
                        top: "10%",
                        borderRadius: "20px",
                    }}
                >
                    <button
                        className="col-8 btn bg-success text-light fw-bold btn-sm"
                        style={{ borderRadius: "30px" }}
                        value={id}
                        onClick={(e) => {
                            handelEdit(e.target.getAttribute("value"));
                        }}
                    >
                        تعديل
                    </button>
                    <button
                        className="col-8 btn bg-light text-dark fw-bold btn-sm form"
                        style={{ borderRadius: "30px" }}
                        value={id}
                        onClick={(e) => {
                            setOpenBook(true);
                            setAddSubBook({
                                bookId: e.target.getAttribute("value"),
                            });
                        }}
                    >
                        اضافة جزء
                    </button>
                    <button
                        className="col-8 btn bg-danger text-light fw-bold btn-sm"
                        style={{ borderRadius: "30px" }}
                        onClick={() => {
                            deleteBookData();
                        }}
                    >
                        حذف
                    </button>
                </div>
            ) : (
                ""
            )}
        </>
    );
};

export default BookItem;

/*
<div
key={inx}
className="col-12 text-center"
value={e._id}
>
// {/* <div
// class="collapse"
// id={`book${e._id}`}
// >
// <div
// className="d-flex flex-wrap text-center SideBar w-100"
// style={{
// overflowY: "scroll",
// maxHeight: "250px",
// }}
// >
// {getHadith.length > 0 &&
// getHadith !== undefined
// ? getHadith.map(
// (e, inx) => (
// <p
//   className="col-12 text-light"
//   style={{
//       cursor: "pointer",
//   }}
//   value={
//       e._id
//   }
//   onClick={(
//       e
//   ) => {
//       handleSetIDHadith(
//           e.target.getAttribute(
//               "value"
//           )
//       );
//   }}
// >
//   {
//       e.hadith_ar
//   }
// </p>
// )
// )
// : ""}
// </div>
// </div> 
</div>
*/
