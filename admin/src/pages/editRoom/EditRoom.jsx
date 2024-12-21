import "./editRoom.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";

const EditRoom = ({ title }) => {
  const location = useLocation();
  const [roomData, setRoomData] = useState({});
  const [file, setFile] = useState(null); // For file input (e.g., image)
  const roomID = location.pathname.split("/")[2];
  console.log(roomID);

  // Fetch the room data when the component mounts
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/rooms/${roomID}`
        );
        setRoomData(response.data);
      } catch (error) {
        console.log("Error fetching room data", error);
      }
    };
    fetchRoomData();
  }, [roomID]);

  // Handle input field changes
  const handleChange = (e) => {
    setRoomData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle form submission (sending data to the server)
  const handleClick = async (e) => {
    e.preventDefault();
    const updatedRoom = {
      ...roomData,
      img: file ? file.name : "", // If there's a file, store the file name
    };

    // Retrieve the token from localStorage (or cookies)
    const token = localStorage.getItem("authToken");

    try {
      // Send the token in the headers of the PUT request
      await axios.put(
        `http://localhost:8800/api/rooms/${roomID}`,
        updatedRoom,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to the request headers
          },
        }
      );
      console.log("Room updated successfully", updatedRoom);
      // Reset the form
      setRoomData({});
      setFile(null);
    } catch (err) {
      console.error("Error updating room:", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Update Room {roomID} Details</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {/* Image File Input */}
              <div className="formInput">
                <label htmlFor="file">Image: </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              {/* Room Title Input */}
              <div className="formInput">
                <label htmlFor="title">Room Title</label>
                <input
                  type="text"
                  id="title"
                  value={roomData.title || ""}
                  placeholder="Enter room title"
                  onChange={handleChange}
                />
              </div>

              {/* Price Input */}
              <div className="formInput">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={roomData.price || ""}
                  placeholder="Enter room price"
                  onChange={handleChange}
                />
              </div>

              {/* Max People Input */}
              <div className="formInput">
                <label htmlFor="maxPeople">Max People</label>
                <input
                  type="number"
                  id="maxPeople"
                  value={roomData.maxPeople || ""}
                  placeholder="Enter max capacity"
                  onChange={handleChange}
                />
              </div>

              {/* Description Input */}
              <div className="formInput">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  value={roomData.description || ""}
                  placeholder="Enter room description"
                  onChange={handleChange}
                />
              </div>

              {/* Submit Button */}
              <button onClick={handleClick}>Update Room</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
