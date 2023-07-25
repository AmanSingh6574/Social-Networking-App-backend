import { setallpost } from "../../reducers/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { postendpoint } from "../../services/apis";
import moment from "moment";
import axios from "axios";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function Allpost() {
  const { GET_ALL_POST_API, GET_VOTE_API, DELETE_POST_API } = postendpoint;

  const { allpost } = useSelector((state) => state.post);
  const { token, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const getallPost = async () => {
    const response = await axios.get(GET_ALL_POST_API);
    dispatch(setallpost(response?.data?.data));
  };

  const VoteHandler = async (postId, userId, value) => {
    if (!token) {
      return toast.success("Login First");
    }
    const response = await axios.put(GET_VOTE_API, {
      postId,
      userId,
      value,
      token,
    });
    getallPost();
  };

  const DeleteHandler = async (postId, userId) => {
    try {
      const response = await axios.delete(`${DELETE_POST_API}${postId}`, {
        userId,
      });
      getallPost();
      toast.success("Post Deleted");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  useEffect(() => {
    getallPost();
  }, [dispatch]);

  return (
    <div>
      <div className="mt-10 p-4 font-inter">
        <h2 className="font-bold mb-4 text-center text-yellow-50">ALL POST</h2>
        <div className="md:w-[400px] sm:mx-auto w-full sm:w-[90%] text-sm md:text-base">
          {allpost.length > 0 ? (
            <div>
              {allpost[0].map((item, index) => {
                // console.log(item);
                return (
                  <div
                    key={index}
                    className="bg-richblack-600 border border-richblack-300 hover:border-richblack-900 rounded-md mb-6 p-3 md:p-4 lg:max-w-[500px] min-h-[200px] duration-200 w-full transition-all "
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex gap-3 items-center">
                        <img
                          className="aspect-square w-[30px] rounded-full object-cover"
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${item?.Uploadedby}`}
                          loading="lazy"
                          alt="profileImage"
                        />
                        <span>{item?.Uploadedby}</span>
                      </div>
                      <div className="text-sm ">
                        <h2>Posted</h2>
                        <h4> {moment(item?.datePostedOn).fromNow()} </h4>
                      </div>
                    </div>
                    <hr className="mt-2" />
                    <div className="flex mt-3 rounded-md mb-2 p-1">
                      <h2 className="text-richblack-25">{item?.description}</h2>
                    </div>

                    {item?.imageUrl && item?.imageUrl.includes("video") ? (
                      <div className="flex justify-center items-center mb-4 rounded-md overflow-hidden">
                        <video
                          src={item?.imageUrl}
                          controls
                          loading="lazy"
                          alt="vid"
                        ></video>
                      </div>
                    ) : (
                      item?.imageUrl && (
                        <div className="flex justify-center items-center mb-4 rounded-md overflow-hidden">
                          <img
                            className="w-full h-auto "
                            src={item?.imageUrl}
                            alt="img"
                            loading="lazy"
                          />
                        </div>
                      )
                    )}

                    <div className="flex flex-wrap gap-2 mb-2">
                      {item?.tags.length > 0 &&
                        item?.tags.map((tag, index) => {
                          return (
                            <div
                              key={index}
                              className="flex w-fit py-1 px-2 rounded-xl bg-yellow-200 text-richblack-800"
                            >
                              {tag}
                            </div>
                          );
                        })}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <button
                          className="flex rounded-md bg-richblack-600 gap-x-1 p-1"
                          onClick={() =>
                            VoteHandler(item._id, item?.userId, "upVote")
                          }
                        >
                          <AiOutlineLike size={23} />
                          <span>{item?.likes.length}</span>
                        </button>

                        <button
                          className="flex rounded-md bg-richblack-600 gap-x-1 p-1"
                          onClick={() =>
                            VoteHandler(item._id, item?.userId, "downVote")
                          }
                        >
                          <AiOutlineDislike size={23} />
                          <span>{item?.dislikes.length}</span>
                        </button>
                      </div>

                      <div className="text-richblack-200">
                        {item?.userId === user?._id && (
                          <button
                            className="px-1"
                            onClick={() =>
                              DeleteHandler(item._id, item?.userId)
                            }
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-white " >
              <h4>No Post Found</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Allpost;
