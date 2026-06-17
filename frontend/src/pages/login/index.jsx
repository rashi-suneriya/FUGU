//rfce
import React, { useEffect, useState } from 'react'
import UserLayout from "@/layout/UserLayout";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./style.module.css"
import { loginUser, registerUser } from '@/config/redux/action/authAction';
import { emptyMessage } from '@/config/redux/reducer/authReducer';

function LoginComponent() {


  const authState = useSelector((state) => state.auth)

  const router = useRouter();

  const dispath = useDispatch();

  // toggle between sign in and sign up forms locally
  const [userLoginMethod, setUserLoginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  const [tokenChecked, setTokenChecked] = useState(false);

 

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  useEffect(() => {
    if (tokenChecked) return; // already ran once
    if (router.isReady) {
      const token = localStorage.getItem("token");
      if (token && token.trim() !== "") {
        if (!authState.loggedIn) {
          console.log("[login] found token but not logged in, clearing stale token");
          localStorage.removeItem("token");
        } else {
          console.log("[login] token present, redirecting to dashboard:", token);
          router.push("/dashboard");
        }
      } else {
        console.log("[login] no token, staying on login page");
      }
      setTokenChecked(true);
    }
  }, [router.isReady, router, tokenChecked]);


 
  useEffect(() => {
     dispath(emptyMessage());
  }, [userLoginMethod])

  const handleRegister = () => {
    console.log("registering..")
    console.log("Data being sent:", {username, password: password ? "present" : "missing", email, name})
    if (!username || !password || !email || !name) {
      alert("All fields are required");
      return;
    }

    dispath(registerUser({username, password, email, name}))
  } 


  const handleLogin = () => {
    console.log("login..")
    dispath(loginUser({ email, password}))
  }

  return (
     <UserLayout>
      <div className={styles.container}>


      <div className={styles.cardContainer}>

       <div className={styles.cardContainer_left}>

        <p className={styles.cardleft_heading}> {userLoginMethod ?  "Sign In" : "Sign Up"}</p>
      <p style={{color: authState.isError ? "red": "green"}}>
        {typeof authState.message === 'string' ? authState.message : authState.message?.message}
      </p>  

        <div className={styles.inputContainers}>

        {!userLoginMethod &&  
        
         <div className={styles.inputRow}>
       
       <input onChange={(e) => setUsername(e.target.value)} className= {styles.inputfield} type="text" placeholder='Username'/>

        <input onChange={(e) => setName(e.target.value)} className={styles.inputfield} type="text" placeholder='Name' />
   </div>}

    <input onChange={(e) => setEmailAddress(e.target.value)} className={styles.inputfield} type="text" placeholder='Email' />

    <input onChange={(e) => setPassword(e.target.value)} className={styles.inputfield} type="password" placeholder='Password' />

<div onClick={() => {
  if (userLoginMethod) {
     handleLogin();
  }else {
    handleRegister();
  }
}}
className={styles.buttonWithOutline}>
  <p> {userLoginMethod ? "Sign In" : "Sign Up"}</p>
  </div>
 </div>
</div>


  <div className={styles.cardContainer_right}>

  {userLoginMethod ? <p>Don't Have an Account?</p> : <p>Already Have an Account?</p> }
        
        <div onClick={() => {
    setUserLoginMethod(!userLoginMethod)
}} style={{color: "black", textAlign: "center"}} className={styles.buttonWithOutline}>
  <p> {userLoginMethod ? "Sign Up" : "Sign In"}</p>
  </div>
          
         </div>
    </div>
</div>

     </UserLayout>
    
  )
}

export default LoginComponent
