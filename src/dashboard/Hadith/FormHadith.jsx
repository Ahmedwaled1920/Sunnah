import React, { useEffect, useState } from "react";
import "../dashboard.css";
import Cookies from "js-cookie";
import Dialog from "@mui/material/Dialog";
const FormHadith = ({
    open,
    setOpen,
    id,
    idEdit,
    getBookData,
    isHadithEdit,
    editHadithId,
    setIsHadithEdit,
    setEditHadithId,
}) => {
    const token = Cookies.get("token");
    const url = "http://localhost:9000/api/v1/sunnah/website/hadith";
    const [status, setStatus] = useState(null);
    const [textArabic, setTextArabic] = useState(null);
    const [interpretationArabic, setInterpretationArabic] = useState(null);

    // UPDATE / EDIT  SubBook Data (Hadith)

    const handleSubmitted = async (e) => {
        e.preventDefault();
        await fetch(`${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                book: id,
                hadith: textArabic,
                interpretation: interpretationArabic,
            }),
        })
            .then((response) => {
                setOpen(false);
                
            })
            .then((json) => {
                setStatus("Add is Success");
                getBookData(id);
                setOpen(false);
                setIsHadithEdit(false);
                setEditHadithId("");  
            });
    };
    const handleEdit = async (e) => {
        e.preventDefault();
        await fetch(`${url}/${editHadithId || ""}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                book: id,
                hadith: textArabic,
                interpretation: interpretationArabic,
            }),
        })
            .then((response) => {
                setOpen(false);
                setIsHadithEdit(false);
                setEditHadithId("");
            })
            .then((json) => {
                setStatus("Edit is Success");
                getBookData(id);
                setOpen(false);
            });
    };
    const handleForm = (e) => {
        if (!isHadithEdit) {
            handleSubmitted(e);
        } else {
            handleEdit(e);
        }
    };

    useEffect(() => {
        const getHadithEdit = async () => {
            await fetch(`${url}/${editHadithId || ""}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    setTextArabic(data.data?.hadith_ar || "");
                    setInterpretationArabic(data.data?.interpretation_ar || "");
                });
        };

        if (isHadithEdit && editHadithId) {
            getHadithEdit();
        }
    }, [isHadithEdit, editHadithId, token]);

    return (
        <Dialog
            open={open}
            onClose={() => {
                setOpen(false);
                setIsHadithEdit(false);
                setEditHadithId("");
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth={"xs"}
        >
            <form
                className="form  justify-content-center d-flex flex-wrap text-end"
                style={{ height: "600px" }}
                onSubmit={handleForm}
            >
                <h5 className="m-2  fw-bolder w-100">اضافه حديث</h5>
                <div className="col-10">
                    <label className="d-block fw-bolder">:بالغه العربيه</label>
                    <input
                        type="text"
                        className="w-100 border p-2"
                        style={{ borderRadius: "30px" }}
                        value={textArabic}
                        onChange={(e) => {
                            setTextArabic(e.target.value);
                        }}
                    />
                </div>
                <div className="col-10">
                    <label className="d-block fw-bolder">
                        :تفسير الحديث بالغه العربيه
                    </label>
                    <input
                        type="text"
                        className="w-100 border p-2"
                        style={{ borderRadius: "30px", height: "50px" }}
                        value={interpretationArabic}
                        onChange={(e) => {
                            setInterpretationArabic(e.target.value);
                        }}
                    />
                </div>
                <div className="col-10 p-2"></div>
                <div className="col-10 justify-content-around d-flex align-items-center">
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
                    <button
                        className="col-3 btn fw-bold rest"
                        style={{ borderRadius: "30px" }}
                    >
                        اعادة
                    </button>
                </div>
                <span className="text-success">{status}</span>
            </form>
        </Dialog>
    );
};

export default FormHadith;
