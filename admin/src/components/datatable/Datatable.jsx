import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  userColumns,
  hotelColumns,
  roomColumns,
  reservationColumns,
} from "../../datatablesource";

const Datatable = () => {
  const location = useLocation();
  const { user } = useContext(AuthContext);
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  // Use fetch hook with query parameters for minPrice and maxPrice
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/${path}`
  );
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    setList(data);

    if (path === "users") {
      setColumns(userColumns);
    } else if (path === "hotels") {
      setColumns(hotelColumns);
    } else if (path === "rooms") {
      setColumns(roomColumns);
    } else {
      setColumns(reservationColumns);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      // Retrieve the token from localStorage (or cookies)
      const token = localStorage.getItem("authToken");
      await axios.delete(`http://localhost:8800/api/${path}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Add token to the request headers
        },
      });
      setList(list.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err); // Add an error log for better debugging
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {/* Link to the Edit page with the record ID */}
            <Link
              to={`/rooms/${params.row._id}/edit`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">Update</div>
            </Link>

            {/* Delete functionality */}
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // Render loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render error message if there was an error
  if (error) {
    return <div>Error loading data!</div>;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {list ? (
        <DataGrid
          className="datagrid"
          rows={list || []}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      ) : (
        <div>No data available</div> // Fallback for when `list` is still undefined or empty
      )}
    </div>
  );
};

export default Datatable;
