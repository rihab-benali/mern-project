import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // Retrieve the token from localStorage (or cookies)
      const token = localStorage.getItem("authToken");
      setLoading(true);
      try {
        const res = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Data received:", res.data); // Debugging line
        setData(res.data);
      } catch (err) {
        console.log("Error:", err); // Error logging for debugging
        setError(err);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const parsedUserDetails = JSON.parse(user).otherDetails;

      const res = await axios.get(url, {
        headers: {
          user: parsedUserDetails._id,
        },
      });

      setData(res.data);
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  return { data, loading, error, reFetch };
};

export default useFetch;
