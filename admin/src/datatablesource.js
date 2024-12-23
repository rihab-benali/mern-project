export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "username",
    headerName: "User",
    width: 230,
    //   renderCell: (params) => {
    //     return (
    //       <div className="cellWithImg">
    //         <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
    //         {params.row.username}
    //       </div>
    //     );
    //   },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const reservationColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  { field: "user", headerName: "Customer", width: 200 },
  { field: "room", headerName: "Room", width: 150 },
  { field: "checkInDate", headerName: "Check-In", width: 150 },
  { field: "checkOutDate", headerName: "Check-Out", width: 150 },
  { field: "totalPrice", headerName: "Price", width: 120 },
];
