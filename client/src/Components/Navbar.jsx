import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToken , setuserData } from "../reducers/slices/userSlice";
import toast from "react-hot-toast";
import image from "../assets/favicon.png"

function Navbar() {
  const { token, user } = useSelector((state) => state.auth);

  // console.log(user);
  const dispatch = useDispatch()  ;
  const navigate = useNavigate() ;

  const LogoutHandler = () =>{
    dispatch(setToken(null))
    dispatch(setuserData(null))
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast.success("Logged Out")
    navigate("/")
  }

  return (
    <div className="fixed z-10 w-full flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 bg-richblack-800 text-gray-200 font-inter">
      <nav className="w-11/12 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xl text-richblack-25">
          <div>
            <img src={image} alt="img" loading="lazy" width={30} />
          </div>
          <Link to="/" className="font-edu-sa text-2xl" >Connect</Link>
        </div>

        <div>
          {token === null ? (
            <ul className="flex gap-4 text-lg text-richblack-25">
              <li>
                <Link to="/login" className="border-yellow-50 border text-richblack-50  font-semibold sm:font-bold rounded-xl py-1 px-1 sm:px-4 hover:bg-richblack-700 hover:text-richblack-25 duration-200 transition-all ">Log In</Link>
              </li>
              <li>
                <Link to="/signup" className="bg-yellow-50 text-richblack-900 px-1 sm:px-4 py-1  font-semibold sm:font-bold rounded-xl hover:brightness-105 duration-200 transition-all">Sign Up</Link>
              </li>
            </ul>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={ user ? "/profile" : "/login" }>
              <img
                src={user?.profileImage}  loading="lazy"
                alt="userImag"
                className="aspect-square w-[30px] rounded-full object-cover"
              />
              </Link>
              <div>
                <button onClick={LogoutHandler} className="bg-yellow-50 text-richblack-900 px-4 py-1 font-bold rounded-xl"> Log Out</button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
