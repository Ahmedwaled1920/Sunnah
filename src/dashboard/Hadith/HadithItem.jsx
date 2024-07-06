import React from "react";
import { MdMoreVert } from "react-icons/md";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const HadithItem = ({
    e,
    handleSetIDHadith,
    handelEditHadith,
    setIsHadithEdit,
    deleteHadithData,
    idHadith,
}) => {
    const date = new Date(e.createdAt);
    const formattedDate = date.toISOString().split("T")[0];

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className="col-12 d-flex hadithRow item-center">
            <div
                className="hadithRow__action"
                value={e._id}
                onClick={(e) => {
                    handleSetIDHadith(e.target.getAttribute("value"));
                    handleClick(e);
                }}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
            >
                <MdMoreVert />
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
                c
            >
                <MenuItem
                    // className="col-8 btn bg-success text-light fw-bold btn-sm"
                    // style={{
                    //     borderRadius: "30px",
                    // }}
                    value={e._id}
                    onClick={(e) => {
                        handelEditHadith(e.target.getAttribute("value"));
                        setIsHadithEdit(true);
                        handleClose();
                    }}
                >
                    تعديل
                </MenuItem>
                <MenuItem
                    // className="col-8 btn bg-danger text-light fw-bold btn-sm"
                    // style={{
                    //     borderRadius: "30px",
                    // }}
                    onClick={() => {
                        let id = idHadith || e._id;
                        deleteHadithData(id);
                        handleClose();
                    }}
                >
                    حذف
                </MenuItem>
            </Menu>

            <div className="col-12 border-bottom py-2 d-flex">
                <p className="col-4 px-4 hadithName">{e.hadith_ar}</p>
                <p className="col-4 hadithName">الاعمال</p>
                <p className="col-4 hadithName">{formattedDate}</p>
            </div>
        </div>
    );
};

export default HadithItem;
