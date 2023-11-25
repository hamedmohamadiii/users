import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";

const Protect = ({ component: Component, ...resProps }) => {
  const isAuth = localStorage.getItem("token");
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route {...resProps} render={(props)=>{
           return isAuth?<Component {...props}/> :<Navigate to='/login'/>}}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Protect;
