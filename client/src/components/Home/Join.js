import React,{useState} from "react";
import { Link } from "react-router-dom";
// import UserDataContextProvider from "../../context/UserDataContextProvider";
import "./Join.css";

export default function Join() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  // const { name, room, setName, setRoom } = useContext(UserDataContextProvider);

  // const [details, setDetails] = useState({ name: "", room: "" });

  // const handleChange = (event) => {
  //   const { name, value } = event.target;
  //   setDetails((prevState) => {
  //     return { ...prevState, [name]: value };
  //   });
  // };
  return <div>Join</div>;
}


// {
// <div className="joinOuterContainer">
//   <div className="joinInnerContainer">
//     <h1 className="heading">Join</h1>
//     <div>
//       <input
//         type="text"
//         className="joinInput"
//         onChange={(event) => setName(event.target.value)}
//         // onChange={handleChange}
//         placeholder="Name"
//         id="name"
//         name="name"
//         value={name}
//         // value={details.name}
//       />
//     </div>
//     <div>
//       <input
//         type="text"
//         className="joinInput mt-20"
//         onChange={(event) => setRoom(event.target.value)}
//         // onChange={handleChange}
//         placeholder="Room"
//         id="room"
//         name="room"
//         value={room}
//         // value={details.room}
//       />
//     </div>
//     <Link
//       onClick={(event) => (!name || !room ? event.preventDefault() : null)}
//       to={`/chat?name=${name}&room=${room}`}
//     >
//       <button className="button mt-20" type="submit">
//         Sign In
//       </button>
//     </Link>
//   </div>
// </div>;}