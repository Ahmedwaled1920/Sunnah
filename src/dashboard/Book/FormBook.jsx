import React, { useState } from "react";
import "../dashboard.css";
import Cookies from "js-cookie";
import Dialog from "@mui/material/Dialog";
const FormBook = ({
    open,
    setOpen,
    id,
    getBookData,
    addSubBook,
    setAddSubBook,
}) => {
    const url = "http://localhost:9000/api/v1/sunnah/website/book";
    const mainUrl = "http://localhost:9000/api/v1/sunnah/website/subBook";
    const [status, setStatus] = useState(null);
    const [title, setTitle] = useState(null);
    const [authorName, setAuthorName] = useState(null);
    const [description, setDescription] = useState(null);
    const [bookFile, setBookFile] = useState(null);
    const token = Cookies.get("token");

    // ADD BOOK Data (BOOK)
    const handleSubmitted = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", authorName);
        formData.append("description", description);
        formData.append("book", bookFile);
        await fetch(`${url}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((json) => {
                setStatus("Add is Success");
                getBookData?.();
                setOpen(false);
            });
    };
    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("author", authorName);
        formData.append("description", description);
        formData.append("book", bookFile);
        await fetch(`${url}/${id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((json) => {
                setStatus("Edit is Success");
                getBookData?.();
                setOpen(false);
            });
    };

    const addSubBookItem = async (bookId, target) => {
        target.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("book", bookFile);
        await fetch(`${mainUrl}/${bookId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((json) => {
                setStatus("Add is Success");
                getBookData?.();
                setOpen(false);
                setAddSubBook({ bookId: null });
            });
    };

    const updateSubBookItem = async (bookId, target) => {
        target.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        await fetch(`${mainUrl}/${bookId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
            .then((response) => response.json())
            .then((json) => {
                setStatus("update is Success");
                getBookData?.();
                setOpen(false);
                setAddSubBook({ bookId: null, editSubBook: false });
            });
    };

    const handleForm = (e) => {
        if (addSubBook?.bookId && !addSubBook?.editSubBook) {
            addSubBookItem(addSubBook?.bookId, e);
            return;
        }
        if (addSubBook?.bookId && addSubBook?.editSubBook) {
            updateSubBookItem(addSubBook?.bookId, e);
            return;
        }
        if (!id || id === null || id === undefined) {
            handleSubmitted(e);
        } else {
            handleSubmitEdit(e);
        }
    };
    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
                setAddSubBook({ bookId: null, editSubBook: false });
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"xs"}
        >
            {" "}
            <form
                className="form  justify-content-center d-flex flex-wrap text-end"
                onSubmit={handleForm}
            >
                <h5 className="m-2  fw-bolder w-100">
                    {addSubBook?.bookId && !addSubBook?.editSubBook
                        ? "اضافة جزء لكتاب "
                        : addSubBook?.bookId && addSubBook?.editSubBook  ? "تعديل جزء الكتاب"
                        : !id
                        ? "اضافه  معلومات الكتاب"
                        : "تعديل معلومات الكتاب"}
                </h5>
                {((!addSubBook?.bookId && !addSubBook?.editSubBook) || (addSubBook?.bookId && !addSubBook?.editSubBook) )  && (
                    <div className="col-10 my-2">
                        <label className="d-block fw-bolder"> :الكتاب</label>   
                        <input
                            type="file"
                            accept=".pdf"
                            className="w-100 border p-1"
                            // style={{ borderRadius: "30px" }}
                            // value={title}
                            onChange={(e) => {
                                setBookFile(e.target.files[0]);
                            }}
                        />
                    </div>
                )}

                <div className="col-10 my-2">
                    <label className="d-block fw-bolder"> :الاسم</label>
                    <input
                        type="text"
                        className="w-100 border p-1"
                        style={{ borderRadius: "30px" }}
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>
                {!addSubBook?.bookId && (
                    <div className="col-10 my-2">
                        <label className="d-block fw-bolder">
                            :اسم مألف الكتاب
                        </label>
                        <input
                            type="text"
                            className="w-100 border p-1"
                            style={{ borderRadius: "30px" }}
                            value={authorName}
                            onChange={(e) => {
                                setAuthorName(e.target.value);
                            }}
                        />
                    </div>
                )}
                {((!addSubBook?.bookId && !addSubBook?.editSubBook) || (addSubBook?.bookId && !addSubBook?.editSubBook) )  && (
                    <div className="col-10 my-2">
                        <label className="d-block fw-bolder">
                            :تاريخ الاصدار
                        </label>
                        <div className="d-flex justify-content-end gap-3">
                            {" "}
                            <input
                                type="text"
                                className=" border text-center p-1 col-4"
                                style={{ borderRadius: "10px" }}
                                placeholder="السنه"
                                value={new Date().getFullYear()}
                                onChange={(e) => {
                                    setAuthorName(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className=" border text-center p-1 col-3"
                                style={{ borderRadius: "10px" }}
                                value={new Date().getMonth() + 1}
                                placeholder="الشهر"
                                onChange={(e) => {
                                    setAuthorName(e.target.value);
                                }}
                            />
                            <input
                                type="text"
                                className=" border text-center p-1 col-2"
                                style={{ borderRadius: "10px" }}
                                value={new Date().getUTCDay() + 24}
                                placeholder="اليوم"
                                onChange={(e) => {
                                    setAuthorName(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                )}

                {((!addSubBook?.bookId && !addSubBook?.editSubBook) || (addSubBook?.bookId && !addSubBook?.editSubBook) )  && (
                    <div className="col-10 my-2">
                        <label className="d-block fw-bolder">:الوصف</label>
                        <input
                            type="text"
                            className="w-100 border p-1"
                            style={{ borderRadius: "30px", height: "130px" }}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                            }}
                        />
                    </div>
                )}
                <div className="col-10 justify-content-around d-flex align-items-center my-3">
                    <button
                        className="col-3 btn fw-bold rest"
                        style={{ borderRadius: "30px" }}
                    >
                        اعادة
                    </button>
                    <button
                        className="col-3 btn fw-bold text-light"
                        style={{
                            borderRadius: "30px",
                            backgroundColor: "#116746",
                        }}
                        type="submit"
                    >
                        حفظ
                    </button>
                </div>
                <span className="text-success">{status}</span>
            </form>
        </Dialog>
    );
};

export default FormBook;
