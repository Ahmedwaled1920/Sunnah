import React, { useState } from 'react'
import './phone.css'
const Phone = () => {
  const [forget ,setForget] = useState(true);
  const [code , setCode] = useState(false);
  return (
    
    <div style={{display:"flex" , justifyContent:"center" , flexDirection:"column" , alignItems:"center", margin:"30px auto" , padding:"20px"}}>
      
      <div style={{display:"flex" ,alignItems:"center" , gap:"50px"}}>
    <img src="/logo.png" alt="" width={40} /> <img src="/title.png" alt="" width={150} />
</div>


{forget &&

<div>
  
  <h2> Enter your  phone number  </h2>
  
  <div style={{display:"flex" , gap:"20px" , flexWrap:"wrap"}}>
    <div>
      <select name="" id="" style={{height:"40px"}}>
        <option value=""> +20 </option>
        <option value="">  +27 </option>
        <option value=""> +51 </option>
        <option value=""> +52 </option>
        <option value=""> +54 </option>
        <option value=""> +56 </option>
        <option value=""> +57 </option>
        <option value=""> +62 </option>
        <option value=""> +66 </option>
        <option value="">+84 </option>
        <option value="">+91</option>
        <option value="">+212</option>
        <option value="">+213</option>
        <option value="">+234</option>
        <option value="">+245</option>
        <option value="">+255</option>
        <option value="">+256</option>
      </select>
    
    </div>
          <div style={{ textAlign: "left" }}>
            <input
              type="password"
              name=""
              id=""
              style={{
                width: "320px",
                height: "30px",
                border: "2px solid #116746",
                padding: "3px 5px",
              }}
              placeholder="Phone number"
            />
          </div>
    
  </div>
     <div style={{display:"flex" , justifyContent:"center" ,marginTop:"170px " , marginLeft:"300px " , padding:"20px"}}>
         <button className='btnn5' style={{backgroundColor:"#116746" ,width:"70px " , height:"30px" ,borderRadius:"10px"  , color:"#fff" , transition:".5s" }} 
         
         
         onClick={() => {
           setCode(true)
           setForget(false)
         }
         }> Next </button>
     </div>
  
</div>
}






{code &&


<div>
    <h2> Enter your  code </h2>
  
  <div style={{display:"flex" , gap:"20px" , flexWrap:"wrap"}}>
  
        <div style={{ textAlign: "left" }}>
          <input
            type="password"
            name=""
            id=""
            style={{
              width: "320px",
              height: "30px",
              border: "2px solid #116746",
              padding: "3px 5px",
            }}
            placeholder="6-digit code"
          />
        </div>
  
  </div>
  
  <div style={{display:'flex' ,justifyContent:"space-between" , alignItems:"center" }}>
  <button className='but' style={{ marginTop:"170px ",all:"unset"}}>Get new code </button> 
      <div style={{display:"flex" , justifyContent:"space-between" ,marginTop:"170px " , marginLeft:"170px " , padding:"20px"}}>


        <button className='btnn5' style={{backgroundColor:"#116746" ,width:"70px " , height:"30px" ,borderRadius:"10px"  , color:"#fff" , transition:".5s" }}> Next </button>

      </div>
  
  
    
  </div>
  
</div>
}



    </div>
  )
}

export default Phone
