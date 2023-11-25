import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <h1>HOME</h1>
      <button
        className="btn btn-info mt-3"
        onClick={() => {
          navigate("/users");
        }}
      >users</button>
    </>
  );
};

export default Home;
