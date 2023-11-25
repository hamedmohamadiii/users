import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import queryString from "query-string";

const User = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const firstname = useRef(null);
  const handleClick = () => {
    navigate("/users");
  };

  useEffect(async () => {
    const response = await axios.get(`https://reqres.in/api/users/${id}`);
    setUser(response.data.data);
  }, []);

  const location = useLocation();
  const myParam = location.search;
  // console.log(queryString.parse(myParam));
  // console.log(firstname.current );

  return (
    <>
      <center>
        <Link
          to={{
            search: "?myParam=myValue",
          }}
        >
          ?????
        </Link>

        <h1>
          {" "}
          <img src={user.avatar} style={{ border: "50%", width: "100px" }} alt="" />
          <h4 ref={firstname}>
            {user.first_name}
            {user.last_name}
          </h4>
          <h5>{user.email}</h5>
        </h1>
        <hr />
      </center>
    </>
  );
};

export default User;
