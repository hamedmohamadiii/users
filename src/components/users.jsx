import { Component } from "react";
import axios from "axios";
import LoadingUsers from "./loading/loadingUsers";
import "react-loading-skeleton/dist/skeleton.css";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


class Users extends Component {
  state = {
    users: [],
    isLoading: true,
  };


  async componentDidMount() {
    const response = await axios.get("https://reqres.in/api/users");

    this.setState({ users: response.data.data, isLoading: false });
  }
  render() {
 
    return (
      <>
      <Outlet></Outlet>
        <button onClick={this.handleCreate} className="btn btn-lg btn-primary">
          create
        </button>
        <div className="row">
          {this.state.isLoading ? (
            <LoadingUsers></LoadingUsers>
          ) : (
            this.state.users.map((user) => {
              return (
                <div className="col-4 text-center p-5">
                  <img
                    src={user.avatar}
                    style={{ border: "50%", width: "100px" }}
                    alt=""
                  />
                  <Link to={`/users/${user.id}`}>
                  <h4>
                    {user.first_name}
                    {user.last_name}
                  </h4>
                  </Link>
                
                  <h5>{user.email}</h5>
                  <div className="row">
                    <div className="col-6">
                      <button
                        onClick={() => this.handleUpdate(user)}
                        className="btn btn-info btn-sm"
                      >
                        update
                      </button>
                    </div>
                    <div className="col-6">
                      <button
                        onClick={() => this.handleDelete(user)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
       
      </>
    );
  }
  handleCreate = async () => {
    const newUser = {
      
      first_name: "hamed",
      last_name: "mohamadi",
      email: "hamedd09013236346@gamil.com",
      avatar: " https://picsum.photos/200",
    };
    const response = await axios.post("https://reqres.in/api/users", newUser);
    this.setState({users:[...this.state.users,newUser]})
  };

  handleUpdate = async(user) => {
    user.first_name='update'
    const response= await axios.put(`https://reqres.in/api/users/${user.id}`,user );
   const updatedUsers=[...this.state.users];
   const index =updatedUsers.indexOf(user);
   updatedUsers[index]={...user}
   this.setState({users:updatedUsers})
};
  
  handleDelete =async (user) => {
const response=await axios.delete(`https://reqres.in/api/users/${user.id}`)
const newUsers=this.state.users.filter(u=>u.id!==user.id)
this.setState({users:newUsers})
};
}

export default Users;
