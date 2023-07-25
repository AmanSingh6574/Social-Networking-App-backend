import { setaddpost, setallpost } from "../../reducers/slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { postendpoint } from "../../services/apis";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Addpost() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [textarea, settextareadata] = useState("");
  const [tags, settags] = useState([]);
  const [File, setFiledata] = useState("");
  // console.log("tags" , tags)
  const { POST_API, GET_ALL_POST_API } = postendpoint;

  const FileHandler = (e) => {
    const file = e.target.files[0];
    setFiledata(file);
    toast.success("File added");
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData();
      formData.append("description", textarea);
      formData.append("tags", JSON.stringify(tags));
      formData.append("file", File);
      // console.log(formData.get("file"));
      const response = await axios.post(POST_API, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        dispatch(setaddpost(response?.data?.data));
        getallPost();
        toast.success("New Post Added");
        clearForm();
      }
    } catch (e) {
      toast.error("Error uploading post");
      console.log(e);
    }
    toast.dismiss(toastId);
  };

  const getallPost = async () => {
    const response = await axios.get(GET_ALL_POST_API);
    dispatch(setallpost(response?.data?.data));
  };

  useEffect(() => {
    getallPost();
  }, [dispatch]);

  const clearForm = () => {
    settextareadata("");
    settags([]);
    setFiledata(null);
  };

  return (
    <>
      <div className="mt-10 p-4 font-inter">
        <div>
          <h2 className="font-bold mb-4 text-center text-yellow-50">
            ADD POST
          </h2>
          <div className="md:w-[400px] w-full text-sm md:text-base" >
            <form
              className="border border-richblack-300 hover:border-richblack-900 bg-richblack-600 rounded-md p-3 md:p-4 flex flex-col  duration-200 transition-all "
              onSubmit={HandleSubmit}
            >
              <div>
                <label>
                  <h4 className="font-semibold mb-2 text-white">
                    Say Something !!!
                  </h4>
                  <textarea
                    className="text-richblack-800 outline-none p-2 rounded-md w-[230px] md:w-full"
                    autoFocus
                    required
                    name="textbox"
                    id="textbox"
                    cols="40"
                    rows="2"
                    placeholder="Connect to Everyone"
                    value={textarea} // Add the value prop here
                    onChange={(e) => settextareadata(e.target.value)}
                  ></textarea>
                </label>
              </div>

              <div className="mb-2">
                <label
                  htmlFor="file"
                  className="block font-semibold mb-2 text-white"
                >
                  Add Picture or Video
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    accept="image/*, video/*" // Allow both image and video files
                    onChange={FileHandler}
                    className="hidden"
                  />
                  {File &&
                    (File.type.includes("image") ? ( // Check if the selected file is an image
                      <img
                        className="max-w-full rounded-md"
                        src={URL.createObjectURL(File)}
                      />
                    ) : (
                      // If not an image, render a video
                      <video
                        controls
                        className="max-w-full rounded-md"
                        src={URL.createObjectURL(File)}
                      />
                    ))}
                  {!File ? ( // Show the label to choose picture or video if no file is selected
                    <label
                      htmlFor="file"
                      className="block px-4 py-2 bg-richblack-800 text-richblack-200 rounded-md cursor-pointer hover:bg-richblack-700 focus:outline-none focus:ring focus:ring-offset-1 focus:ring-yellow-500"
                    >
                      Choose Picture or Video
                    </label>
                  ) : (
                    // If a file is selected, show the "Clear" button
                    <button
                      onClick={() => setFiledata(null)}
                      className="absolute top-0 right-0 m-2 text-richblack-200 hover:text-yellow-50 rounded-xl bg-richblack-800 px-2"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label>
                  <h4 className="font-semibold mb-2 text-white">Tags</h4>
                  <input
                    className="text-richblack-800 outline-none p-2 rounded-md"
                    type="text"
                    name="tags"
                    id="tags"
                    placeholder="Tags"
                    value={tags.join(" ")} // Add the value prop here
                    onChange={(e) => settags(e.target.value.split(" "))}
                  />
                  <p className="text-pink-300 text-xs mt-2">
                    <sup>*</sup> Enter Tags without , or double spaces
                  </p>
                </label>
              </div>
              <div>
                {token ? (
                  <button
                    type="submit"
                    className="outline-none bg-yellow-50 text-richblack-900 px-4 py-2 font-bold mt-4 rounded-xl"
                  >
                    POST
                  </button>
                ) : (
                  <div className="mt-4">
                    {" "}
                    <Link
                      to="/login"
                      className="outline-none bg-richblack-800 hover:bg-richblack-700 px-4 py-2 mt-4 rounded-xl"
                    >
                      Please Login First{" "}
                    </Link>{" "}
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addpost;
