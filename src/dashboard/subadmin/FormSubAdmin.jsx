import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import Cookies from 'js-cookie';

const FormSubAdmin = ({ open, setOpen, getAdminsData }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        birthday: '',
        gender: '',
    });
    const token = Cookies.get('token');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:9000/api/v1/sunnah/website/user/addSubAdmin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (response.ok) {
            getAdminsData();
            setOpen(false);
        } else {
            console.error('Error adding sub-admin:', data);
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ ...style, width: 400 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    اضافه مشرف
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        name="firstName"
                        label="الاسم الاول"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="lastName" 
                        label="الاسم الثاني"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                     <TextField
                        fullWidth
                        margin="normal"
                        name="email"
                        label="البريد الالكتروني"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="phone"
                        label="الهاتف"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                   
                    <TextField
                        fullWidth
                        margin="normal"
                        name="birthday"
                        label="تاريخ الميلاد"
                        type="text"
                        value={formData.birthday}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        name="gender"
                        label="النوع"
                        type="text"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        حفظ
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default FormSubAdmin;
