import React, { useState } from 'react'
import './Forget.css'
import { Link } from 'react-router-dom';
const Forget = () => {

    const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email
    };

    try {
      const response = await fetch('http://localhost:9000/api/v1/sunnah/app/auth/forgetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      console.log('تم إرسال طلب استعادة كلمة المرور بنجاح');
      setCode(true)
      setForget(false)

    } catch (error) {
      console.error('حدث خطأ:', error);
      setError('حدث خطأ أثناء معالجة طلب استعادة كلمة المرور');
    }
  };


  const [forget ,setForget] = useState(true);
  const [code , setCode] = useState(false);
  return (
    
    <>
    <img src="/logo.png" alt="" width={40} />
    
    <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column" , alignItems:"center", margin:"30px auto" , padding:"20px" }}>


    {/* <div>
      <h2>نسيت كلمة المرور؟</h2>       <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">إرسال طلب استعادة كلمة المرور</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div> */}
      
      <div style={{display:"flex" ,alignItems:"center" , gap:"50px"}}>
</div>


{forget &&

<form onSubmit={handleSubmit}  style={{border:"2px solid #116746" , textAlign:"left" , padding:"20px 40px"}}>
  
  <h2> <b> Reset your password </b>  </h2>
  
  <p> If the account exists, we’ll email you <br /> instructions to rest the password </p>


  <div>
          <label htmlFor="email"> <b>Email:</b> </label> <br /><br />
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            } }
            required
          />
        </div>

     <div style={{ marginTop:"170px " , padding:"20px"}}>
         <button type="submit" className='btnn5' style={{backgroundColor:"#116746" ,borderRadius:"10px"  , color:"#fff" , transition:".5s", padding:"10px" , width:"100%"}} 
        
         onClick={() => {
          setCode(true)//
           setForget(false)
         }
         }> reset password </button>


     </div>
        <Link to={"/login"} style={{ textDecoration:"none" , color:"#000" ,textAlign:"center", display:"flex" , justifyContent:"center"}}>
           <button className='btnn4' style={{all:"unset"}}> <b>return to login</b></button>
        </Link>
  
     {error && <p style={{ color: 'red' }}>{error}</p>}

</form>
}






{code &&


<div style={{border:"2px solid #116746" , textAlign:"left" , padding:"20px 40px"}}>
    <h2> Done! </h2>
    <p style={{backgroundColor:"#58ae8d" , color:"#fff" , padding:"20px" , marginTop:"150px"}}> We’ve sent an email to mohmed23@gmail.com  with <br /> instructions</p>
  

  
  <div style={{ marginTop:"170px " , padding:"20px"}}>

       <Link to={"/login"}>
          <button type="submit" className='btnn5' style={{backgroundColor:"#116746" ,borderRadius:"10px"  , color:"#fff" , transition:".5s", padding:"10px" , width:"100%"}} > return to login </button>
          
       </Link>
  </div>
  


  
</div>
}



    </div>
    </>
  )
}

export default Forget












// import React, { useState } from 'react';

// const ForgetPasswordForm = () => {

//   return (
//   
//   );
// };

// export default ForgetPasswordForm;
