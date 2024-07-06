import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Divider, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';

const Admin = ({ open, setOpen }) => {
    const [loggedInAdmin, setLoggedInAdmin] = useState(null);
    const [editingSubAdmin, setEditingSubAdmin] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchLoggedInAdmin = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/v1/sunnah/website/user/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setLoggedInAdmin(data.data);
                } else {
                    console.error('Failed to fetch logged-in admin:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchLoggedInAdmin();
    }, [open, token]);

    const handleEdit = (admin) => {
        setEditingSubAdmin(admin);
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/sunnah/website/user/${editingSubAdmin._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(editingSubAdmin)
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Admin updated successfully');
                setOpen(false);
            } else {
                console.error('Failed to update admin:', data);
            }
        } catch (error) {
            console.error('Error updating admin:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditingSubAdmin({
            ...editingSubAdmin,
            [name]: value
        });
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={modalStyle}>
                <Divider />
                <Box sx={{ mt: 2 }}>
                    {loggedInAdmin && (
                        <Box sx={subAdminBoxStyle}>
                            <Typography variant="h6" align="center" sx={{ mb: 2 }} gutterBottom>
                                المشرف الحالي
                            </Typography>
                            <Divider />
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="subtitle1" sx={{ direction: 'rtl' }}>
                                    الاسم: {loggedInAdmin.firstName} {loggedInAdmin.lastName}
                                </Typography>
                                <Typography variant="body1" sx={{ direction: 'rtl' }}>
                                    الايميل: {loggedInAdmin.email}
                                </Typography>
                                <Typography variant="body1" sx={{ direction: 'rtl' }}>
                                    رقم الهاتف: {loggedInAdmin.phone}
                                </Typography>
                                <Typography variant="body1" sx={{ direction: 'rtl' }}>
                                    تاريخ الميلاد: {loggedInAdmin.birthday}
                                </Typography>
                                <Button onClick={() => handleEdit(loggedInAdmin)} variant="outlined" sx={{ mt: 1 }}>
                                    تعديل
                                </Button>
                                {editingSubAdmin && editingSubAdmin._id === loggedInAdmin._id && (
                                    <Box sx={{ mt: 2 }}>
                                        <Typography variant="h6" align="center" sx={{ mb: 2 }} gutterBottom>
                                            تحديث المشرف
                                        </Typography>
                                        <Divider />
                                        <Box sx={{ mt: 2 }}>
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="firstName"
                                                label="الاسم الاول"
                                                value={editingSubAdmin.firstName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="lastName"
                                                label="الاسم الثاني"
                                                value={editingSubAdmin.lastName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="email"
                                                label="البريد الالكتروني"
                                                type="email"
                                                value={editingSubAdmin.email}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="phone"
                                                label="الهاتف"
                                                value={editingSubAdmin.phone}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <TextField
                                                fullWidth
                                                margin="normal"
                                                name="birthday"
                                                label="تاريخ الميلاد"
                                                type="text"
                                                value={editingSubAdmin.birthday}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <Button
                                                onClick={handleUpdate}
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{ mt: 2 }}
                                            >
                                                تحديث
                                            </Button>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    )}
                </Box>
            </Box>
        </Modal>
    );
};

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    width: 500,
    height: 'auto',
    overflow: 'auto',
    maxHeight: '90vh',
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarColor: 'green',
    scrollBehavior: 'smooth',
    scrollbarWidth: 'thin',

    '&::-webkit-scrollbar': {
        width: '5px',
        height: '5px'
    },
};

const subAdminBoxStyle = {
    mb: 2,
    border: '1px solid #ccc',
    p: 2,
    position: 'relative',
};

export default Admin;
