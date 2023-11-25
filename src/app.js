import { Component } from "react";
import Users from "./components/users";
import Navbar from "./components/navbar"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import User from "./components/user";
import NotFound from "./components/notFound";
import Dashboard from "./components/dashboard";
import Logout from "./components/logout";


class App extends Component {
    state = {
        user: null
       
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        if (!token) {
            this.setState({ user: null });
            return;
        }
        const response = {
            data: {
                user: {
                    name: 'mohamad ',
                    email: "mohamad@gamil.com"
                }
            }
        }
        if (!response.data.user) {
            this.setState({ user: null })
            return;
        }
        this.setState({user:response.data.user})
    }
    render() {

        return (
            <>

                <div className="container mt-3">
                    <Router>
                        <Navbar user={this.state.user }></Navbar>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/users/:id" element={<User />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/not-found " element={<NotFound />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/logout" element={<Logout />} />
                        </Routes>
                    </Router>
                </div>
            </> 
        );
    }
}

export default App;