import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography, Divider, Button, TextField } from '@mui/material';
import Cookies from 'js-cookie';

const AllSubAdmin = ({ open, setOpen }) => {
    const [subAdmins, setSubAdmins] = useState([]);
    const [editingSubAdmin, setEditingSubAdmin] = useState(null);
    const token = Cookies.get('token');

    useEffect(() => {
        const fetchSubAdmins = async () => {
            try {
                const response = await fetch('http://localhost:9000/api/v1/sunnah/website/user', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                });
                const data = await response.json();
                if (response.ok) {
                    setSubAdmins(data.data);
                } else {
                    console.error('Failed to fetch sub-admins:', data);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSubAdmins();
    }, [open, token]);

    const handleEdit = (subAdmin) => {
        setEditingSubAdmin(subAdmin);
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
                console.log('Sub-admin updated successfully');
                // Close the modal after successful update
                setOpen(false);
            } else {
                console.error('Failed to update sub-admin:', data);
            }
        } catch (error) {
            console.error('Error updating sub-admin:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:9000/api/v1/sunnah/website/user/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            });
            const data = await response.json();
            if (response.ok) {
                console.log('Sub-admin deleted successfully');
                // Optionally, update local state or close modal
                setOpen(false);
            } else {
                console.error('Failed to delete sub-admin:', data);
            }
        } catch (error) {
            console.error('Error deleting sub-admin:', error);
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
                <Typography variant="h5" align="center" sx={{ mb: 2 }} gutterBottom>
                    جميع المشرفين
                </Typography>
                <Divider />
                <Box sx={{ mt: 2 }}>
                    {subAdmins.map(subAdmin => (
                        <Box key={subAdmin._id} sx={subAdminBoxStyle}>
                            <Typography variant="subtitle1" sx={{ direction: 'rtl' }}>
                                الاسم: {subAdmin.firstName} {subAdmin.lastName}
                            </Typography>
                            <Typography variant="body1" sx={{ direction: 'rtl' }}>
                                الايميل: {subAdmin.email}
                            </Typography>
                            <Typography variant="body1" sx={{ direction: 'rtl' }}>
                                رقم الهاتف: {subAdmin.phone}
                            </Typography>
                            <Typography variant="body1" sx={{ direction: 'rtl' }}>
                                 تاريخ الميلاد: {subAdmin.birthday}
                            </Typography>
                            <Button onClick={() => handleEdit(subAdmin)} variant="outlined" sx={{ mt: 1 }}>
                                تعديل
                            </Button>
                            <Button onClick={() => handleDelete(subAdmin._id)} variant="outlined" color="error" sx={{ mt: 1, ml: 1 }}>
                                حذف
                            </Button>
                            {editingSubAdmin && editingSubAdmin._id === subAdmin._id && (
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
                    ))}
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

export default AllSubAdmin;
