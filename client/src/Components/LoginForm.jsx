import { useState } from "react";
import axios from "axios";
import { userendpoints } from "../services/apis";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setloading  , setuserData , setToken } from "../reducers/slices/userSlice";
import { toast } from "react-hot-toast"


function LoginForm() {

  const [formdata, setformdata] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const { email, password } = formdata;
  const { LOGIN_API } = userendpoints;
  
  const HandlerOnChange = (e) => {
    setformdata((prevdata) => ({
      ...prevdata,
      [e.target.name]: e.target.value,
    }));
  };

  const HandleOnsubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...")
    dispatch(setloading(true));
    try{
      const request = await axios.post(LOGIN_API , {
        email , password
      })
      // console.log(request.data.user) ; 
      dispatch(setuserData(request.data.user)) ;
      dispatch(setToken(request?.data?.token))
      const userImage = request.data?.user?.image
        ? request?.data?.user?.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${request?.data?.user?.firstname} ${request?.data?.user?.lastname}`
      // console.log(userImage)
      dispatch(setuserData({ ...request.data.user, image: userImage }))
      localStorage.setItem("token" , JSON.stringify(request?.data?.token)) ; 
      localStorage.setItem("user" , JSON.stringify(request?.data?.user));
      toast.success("Login Sucessfully")
      navigate("/")
    }
    catch(e){
      console.log("could not log in" , e) ; 
      toast.error(e?.request?.data?.message);
    }
    dispatch(setloading(false)) ; 
    toast.dismiss(toastId) ; 
    
  
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-richblack-800 text-white font-bold justify-center items-center">
      <h1 className="text-2xl mb-10" >Log in</h1>
      <form onSubmit={HandleOnsubmit} className="flex flex-col gap-5 w-[300px]">
        <label>
          <p>Email</p>
          <input
            className="rounded-md w-full p-1 mt-1 shadow-slate-100 shadow-sm outline-none text-black py-2 "
            type="email"
            name="email"
            value={email}
            onChange={HandlerOnChange}
          />
        </label>
        <label>
          <p>Password</p>
          <input
            className="rounded-md w-full p-1 mt-1 shadow-slate-100 shadow-sm outline-none text-black py-2 "
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
            Sign in
          </button>
        </div>
      </form>
      <div className="text-sm mt-4 flex gap-2" >
        <p>Not a User ?</p>
        <button onClick={()=>navigate("/signup")} >Signup</button>
      </div>
    </div>
  );
}

export default LoginForm;
