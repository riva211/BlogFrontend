import { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { IF, URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "/api/users/" + user._id);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUserUpdate = async () => {
    setUpdated(false);

    try {
      // const response = await axios.put(
      //   `http://localhost:8000/api/users/${user._id}`,
      //   JSON.stringify({ username, email, password }), // Send the data as an object
      //   {
      //     headers: {
      //       'Content-Type': 'application/json', // Set the Content-Type header to application/json
      //     },
      //     withCredentials: true
      //   }
      // );
      const response=await fetch(`/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }),
      });

      console.log(response.data);
      setUpdated(true);
    } catch (error) {
      console.log(error);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete("/api/users/" + user._id, {
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };



  useEffect(() => {
    fetchProfile();
   
  }, [param]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh]   px-8 md:px-[200px] mt-8 flex justify-center items-center ">
        
        <div className=" border p-3 text-center	  align-middle flex justify-center   w-[50%] md:w-[30%]  shadow-2xl shadow-gray-500  ">
          <div className=" 	flex flex-col space-y-4 justify-center text-center items-start">
            <h1 className="text-xl justify-center text-center font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none justify-center flex   py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none  py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none  py-2 text-gray-500"
              placeholder="Your password"
              type="password"
            />
            <div className="flex items-center space-x-6 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;