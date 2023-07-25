import { userendpoints } from "../services/apis";
import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { postendpoint } from "../services/apis";
import { useNavigate } from "react-router-dom";
import { TbEdit } from "react-icons/tb";
import { setuserData } from "../reducers/slices/userSlice"
import toast from "react-hot-toast";
function Profile() {
  const { DELETE_POST_API } = postendpoint;
  const { token, user } = useSelector((state) => state.auth);
  const [userdata, setuserdata] = useState({});
  const { USER_PROFILE_API, USER_UPDATE_API } = userendpoints;
  const navigate = useNavigate();
  const dispatch = useDispatch() ;
  const [editMode, setEditMode] = useState(false);
  const [editedUserData, setEditedUserData] = useState({});

  // Function to handle changes to the input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditProfile = () => {
    setEditMode(true);
    setEditedUserData({
      firstname: userdata?.firstname,
      lastname: userdata?.lastname,
      email: userdata?.email,
    });
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(USER_UPDATE_API, editedUserData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getuserdata();
      // console.log(response);

      setEditMode(false);
    } catch (error) {
      console.log("Error updating profile:", error);
    }
  };
  // console.log(user)
  const getuserdata = async () => {
    
    try {
      const response = await axios.get(USER_PROFILE_API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setuserdata(response?.data?.data);
      // console.log(response?.data?.data?.firstname)
      const storedUser = JSON.parse(localStorage.getItem("user"));
      storedUser.profileImage = response?.data?.data?.profileImage;
      storedUser.firstname = response?.data?.data?.firstname;
      storedUser.lastname = response?.data?.data?.lastname;
      localStorage.setItem("user", JSON.stringify(storedUser));
      dispatch(setuserData(storedUser));
      // console.log(response?.data?.data?.profileImage)
    } catch (error) {
      console.log(error);
    }
    
  };

  const DeleteHandler = async (postId, userId) => {
    try {
      const response = await axios.delete(`${DELETE_POST_API}${postId}`, {
        userId,
      });
      getuserdata();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  useEffect(() => {
    getuserdata();
  }, []);

  const handleGoBack = () => {
    navigate("/");
  };

  // console.log(userdata?.profileImage)
  return (
    <div className="text-richblack-25 bg-richblack-800 pt-20 min-h-screen">
      <div className="max-w-lg mx-auto rounded-lg shadow-lg p-6">
        <div>
          {userdata?.profileImage && (
            <div className="relative mx-auto mb-4 w-24 h-24 md:w-32 md:h-32 rounded-full">
              <img
                src={userdata?.profileImage}
                loading="lazy"
                alt="Profile Picture"
                className="w-full h-full rounded-full object-cover"
              />
              <button
                onClick={handleEditProfile}
                className="left-[100%] md:bottom-0 absolute md:mb-[-16px]"
              >
                <TbEdit size={20} />
              </button>
            </div>
          )}
          <div className="flex flex-wrap justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {userdata?.firstname} {userdata?.lastname}
              </h2>
              <p className="text-gray-500 mb-4">{userdata?.email}</p>
            </div>

            <div className="mt-4">
              <button
                className="bg-yellow-50 text-richblack-900 px-4 py-2 font-bold rounded-xl"
                onClick={handleGoBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>

        {editMode ? (
          // Render the form for editing user details
          <div className="mb-4">
            <div className="mb-4">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-richblack-25"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={editedUserData.firstname || ""}
                onChange={handleInputChange}
                className="border rounded-lg p-2 w-full text-richblack-400"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-richblack-25"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={editedUserData.lastname || ""}
                onChange={handleInputChange}
                className="border text-richblack-400 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-richblack-25"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editedUserData.email || ""}
                onChange={handleInputChange}
                className="border text-richblack-400 rounded-lg p-2 w-full"
              />
            </div>

            <div className="flex justify-between items-center mb-2 mt-2">
              <button
                className="bg-richblack-700 text-richblack-50 hover:border border-richblack-600 duration-200 transition-all px-4 py-2 font-bold rounded-xl"
                onClick={handleSaveProfile}
              >
                Save
              </button>
              <button
                className="bg-richblack-700 text-richblack-50 hover:border border-richblack-600 duration-200 transition-all px-4 py-2 font-bold rounded-xl"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-semibold mt-2 mb-2">
              Number of Posts: {userdata?.Post?.length}
            </h3>
            {/* Post section */}
            <div className="mt-4">
              {userdata?.Post?.map((post) => (
                <div key={post._id} className="border rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <img
                      className="aspect-square w-[30px] rounded-full object-cover"
                      src={`https://api.dicebear.com/5.x/initials/svg?seed=${post?.Uploadedby}`}
                      loading="lazy"
                      alt="profileImage"
                    />
                    <p className="text-gray-500 ml-2">
                      Posted on :{" "}
                      {new Date(post.datePostedOn).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-richblack-25 mb-4">{post.description}</p>
                  {post?.imageUrl && post?.imageUrl.includes("video") ? (
                    <div className="flex justify-center items-center mb-4 rounded-md overflow-hidden">
                      <video
                        src={post?.imageUrl}
                        controls
                        loading="lazy"
                        alt="vid"
                      ></video>
                    </div>
                  ) : (
                    post?.imageUrl && (
                      <div className="flex justify-center items-center mb-4 rounded-md overflow-hidden">
                        <img
                          className="w-full h-auto"
                          src={post?.imageUrl}
                          loading="lazy"
                          alt="post.imageUrl"
                        />
                      </div>
                    )
                  )}
                  <div className="flex flex-wrap gap-2">
                    {/* Display post tags */}
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-richblack-600 rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex gap-3">
                      <div className="flex items-center">
                        <AiOutlineLike size={23} />
                        <span className="ml-1">{post.likes.length}</span>
                      </div>
                      <div className="flex items-center">
                        <AiOutlineDislike size={23} />
                        <span className="ml-1">{post.dislikes.length}</span>
                      </div>
                    </div>
                    {post.userId === user?._id && (
                      <button
                        className="px-2 py-1 rounded-md text-richblack-200"
                        onClick={() => DeleteHandler(post._id, post?.userId)}
                      >
                        Delete Post
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
