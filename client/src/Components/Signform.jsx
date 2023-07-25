import { useState } from "react";
import axios from "axios";
import { userendpoints } from "../services/apis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast"
function SignupForm() {
  const [formdata, setformdata] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const navigate = useNavigate() ; 
  const dispatch = useDispatch() ; 
 
  const { email, firstname, lastname, password } = formdata;
  const { SIGNUP_API, LOGIN_API } = userendpoints;
  const HandlerOnChange = (e) => {
    setformdata((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleOnsubmit = async (e) => {
    e.preventDefault();
    // const toastId = toast.loading("Loading...")
    try{
      const response = await axios.post(SIGNUP_API, {
        email,
        firstname,
        lastname,
        password,
      });  
      // console.log(response?.data?.message);
      // toast.dismiss(toastId)
      toast.success("SignUp Sucessfully")
      navigate("/login")
    }
    catch(e){
      console.log("error in sigup" , e) ;
      toast.error(e?.response?.data?.message);
    }
    
    
    
    // dispatch(signup({email , password , firstname , lastname}))
  };

  return (

    <div className="min-h-screen w-full flex flex-col bg-richblack-800 text-white font-bold justify-center items-center">
      <h1 className="text-2xl mb-10" >Sign Up</h1>
      <form onSubmit={HandleOnsubmit} className="flex flex-col gap-5 w-[300px] ">
        <label>
          <p>First Name</p>
          <input 
            className="rounded-md w-full p-1 mt-1 shadow-slate-100 shadow-sm outline-none text-black py-2 "
            type="text"
            name="firstname"
            value={firstname}
            onChange={HandlerOnChange}
          />
        </label>
        <label>
          <p>Last Name</p>
          <input
            className="rounded-md p-1 w-full mt-1 shadow-slate-100 shadow-sm outline-none text-black py-2 "
            type="text"
            name="lastname"
            value={lastname}
            onChange={HandlerOnChange}
          />
        </label>
        <label>
          <p>Email</p>
          <input
            className="rounded-md p-1 w-full mt-1 shadow-slate-100 shadow-sm outline-none text-black py-2 "
            type="email"
            name="email"
            value={email}
            onChange={HandlerOnChange}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            className="rounded-md p-1 w-full mt-1 shadow-slate-100 shadow-sm outline-none text-black py-2 "
            type="password"
            name="password"
            value={password}
            onChange={HandlerOnChange}
          />
        </label>
        <div className="text-center" >
          <button
            type="submit"
            className="bg-black py-3 w-[200px] rounded-2xl hover:text-black hover:bg-white duration-300 hover:scale-95 transition-all"
          >
            Sign Up
          </button>
        </div>
      </form>
      <div className="text-sm mt-4 flex gap-2" >
        <p>Already a User ?</p>
        <button onClick={()=>navigate("/login")} >Login</button>
      </div>
    </div>
  );
}

export default SignupForm;
