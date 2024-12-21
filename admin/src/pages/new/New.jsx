import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [info, setInfo] = useState({});
  const [file, setFile] = useState(null); // File input is still here, but not used for Cloudinary

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    // If you want to handle file uploads or data that doesn't require cloudinary
    const newUser = {
      ...info,
      img: file ? file.name : "", // If there's a file, store the file name (or adjust this as needed)
    };

    try {
      // Retrieve the token from localStorage (or cookies)
      const token = localStorage.getItem("authToken");

      // Sending the form data without Cloudinary
      await axios.post("http://localhost:8800/api/auth/register", newUser, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers
        },
      });
      console.log("User created successfully", newUser);
      // Reset the form
      setInfo({});
      setFile(null);
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {/* You can still display the file preview if needed */}
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="Preview"
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">Image: </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
