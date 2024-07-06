import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import './LoadingPage.css'
const LoadingPage = () => {

  const [progress, setProgress] = useState(0);
  const Navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress === 100) {
          clearInterval(interval);
          Navigate('/home');
        }
        return prevProgress + 20;
      });
    }, 500);
    return () => clearInterval(interval);
  }, [Navigate]);

  return (
   
    <div style={{ textAlign: 'center', marginTop: '50px' }}>

      
      <img src="/logo.png" alt="" />
      {/* <h1>Loading...</h1> */}
      <div style={{ width: '300px', margin: '20px auto' ,  }}>
      <progress  value={progress} max="100" ></progress>
      </div>



    </div>
  );
};

export default LoadingPage;


