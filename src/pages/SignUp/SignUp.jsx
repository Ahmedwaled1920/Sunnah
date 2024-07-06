import React, { useState } from 'react'
import './SignUp.css'
import {Link} from 'react-router-dom'


const SignUp = () => {

      const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        passwordConfirm: ''
      });
      const [message, setMessage] = useState('');
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch('http://localhost:9000/api/v1/sunnah/app/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: '*/*'
            },
            body: JSON.stringify(formData)
          });
          const data = await response.json();
          console.log(data);
          setMessage(data.message);
          

        } catch (error) {
          console.error('An error occurred:', error);
          setMessage('An error occurred. Please try again.');
        }
      };
    
  return (

<div>
  
      <form onSubmit={handleSubmit}  style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin:"30px auto"
        }}>
          
  
  <div style={{display:"flex" ,alignItems:"center" , gap:"50px"}}>
      <img src="/logo.png" alt="" width={50} /> <img src="/title.png" alt="" width={150} />
  </div>
  <h2> Sign up for free  </h2>
  
  <div>
  
        <div>
          <button className="btn4">
            <img src="/facebook.png" alt="" width={10} /> Sign up with Facebook {" "}
          </button>
        </div>
  
          <button className="btn7">
            <img src="/google.png" alt="" width={20} /> Sign up with Google {" "}
          </button>
        </div>
  <div style={{display:"flex" , alignItems:"center"}}>
      
            <div className="line1"/> 
           <div > or </div> 
      
            <div className="line1" /> 
      
  </div>
        <div style={{ textAlign: "left" }}>
          <h3> Your First name </h3>
          <input
           name="firstName"
            value={formData.firstName}
             onChange={handleChange}
              required 
              type="text"
              id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder="Your First name"
          />
        </div>
  
        <div style={{ textAlign: "left" }}>
          <h3> Your last name </h3>
          <input
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
          required
            type="text"
            id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder="Your last name"
          />
        </div>
  
        <div style={{ textAlign: "left" }}>
          <h3> What's your email? </h3>
          <input
          name="email"
           value={formData.email}
            onChange={handleChange} 
            required
            type="email"
            id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder="Email or Username"
          />
  
  
       <div style={{margin:"10px auto"}}>
             <Link to="/phone" style={{color:"#000"}}>
             Use your phone number instead.
             </Link>
       </div>
  
  
  
        </div>
  
        <div style={{ textAlign: "left" }}>
          {/* <h3> Create your password? </h3> */}
          <h3>  phone Number  </h3>
          <input
            type="Enter Ur phone "
            name="phone"
             value={formData.phone}
              onChange={handleChange} 
              required 
            id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder=" phone Number "
          />
        </div>
  
  
        <div style={{ textAlign: "left" }}>
          {/* <h3> Create your password? </h3> */}
          <h3>  password? </h3>
          <input
          name="password"
           value={formData.password}
            onChange={handleChange}
             required
            type="password"
            id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder=" password?"
          />
        </div>
  
  
        <div style={{ textAlign: "left" }}>
          {/* <h3> Create your password? </h3> */}
          <h3> Confirm password? </h3>
          <input
           name="passwordConfirm"
            value={formData.passwordConfirm}
             onChange={handleChange}
              required
            type="password"
            id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder="Confirm password? "
          />
        </div>
  
        <button type="submit" className="btn6" style={{ padding: "5px 50px" , marginTop:"20px" }}>
         Sign Up
        </button>
  
      </form>
        {message && <p>{message}</p>}
  
</div>

  )
}


export default SignUp









// import React, { useState } from 'react';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     phone: '',
//     email: '',
//     password: '',
//     passwordConfirm: ''
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:9000/api/v1/sunnah/app/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: '*/*'
//         },
//         body: JSON.stringify(formData)
//       });
//       const data = await response.json();
//       console.log(data);
//       setMessage(data.message);
//     } catch (error) {
//       console.error('An error occurred:', error);
//       setMessage('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label>First Name:</label>
//         <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
//         <br />

//         <label>Last Name:</label>
//         <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
//         <br />

//         <label>Phone:</label>
//         <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
//         <br />

//         <label>Email:</label>
//         <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         <br />

//         <label>Password:</label>
//         <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         <br />

//         <label>Confirm Password:</label>
//         <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required />
//         <br />

//         <button type="submit">Register</button>
//       </form>

//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default RegisterForm;















