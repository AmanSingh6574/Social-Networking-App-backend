
import {useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Allpost from "../pages/Post/Allpost";
import Addpost from "../pages/Post/Addpost";
function Social() {
  const { user } = useSelector((state) => state.auth);
  // console.log("user" , user);
  const { token } = useSelector((state) => state.auth);
  
  return (
    <div className="min-h-screen rounded-md  bg-richblack-800 text-richblack-25 lg:w-11/12 w-full ">
      {token && (
        <div className="mb-4">
          <div className="flex justify-between p-4 items-center rounded-sm">
            <h1 className="font-semibold text-xl ">
              {user.firstname} {user.lastname}
            </h1>
            <Link to={ user ? "/profile" : "/login" }  >
            <img
              src={user?.profileImage}  loading="lazy"
              alt="user-image"
              className="aspect-square w-[40px] rounded-full object-cover"
            />
            </Link>
            
          </div>
        </div>
      )}

      <div className="border-b border-richblack-600" ></div>

      <div className="flex flex-wrap-reverse rounded-sm justify-evenly p-6">
        <Allpost/>
        <Addpost/>
      </div>
    </div>
  );
}

export default Social;
