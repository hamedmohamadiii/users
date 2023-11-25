import axios from "axios";
import { Component, createRef } from "react";
import Input from "./input";
import * as yup from "yup";
import useNavigate, { Navigate } from "react-router-dom";
import { useEffect } from "react";

class Login extends Component {
  state = {
    account: {
      email: "",
      password: "",
    },
    errors: [],
    sending: false,
    Navigate:[],
   
  };
 
  schema = yup.object().shape({
    email: yup
      .string()
      .email("فرمت ایمیل صحیح نمی باشد")
      .required("فیلد ایمیل الزامی میباشد"),
    password: yup.string().min(4, "پسورد باید حداقل چهار کراکتر باشد"),
  });

  validate = async () => {
    try {
      const result = await this.schema.validate(this.state.account, {
        abortEarly: false,
      });
      return result;
    } catch (error) {
      console.log(error.errors);
      this.setState({ errors: error.errors });
    }
  };

  handlesubmit = async (e) => {
    e.preventDefault();
    const result = await this.validate();
    console.log(result);

    if (result) {
      try {
        this.setState({ sending: true });
        const respones = await axios.post(
          "https://reqres.in/api/login",
          result
        );
        localStorage.setItem("token", respones.data.token);
       
        console.log(respones.data.token);
        // this.state.Navigate= respones.data.token
  window.location="/dashboard"
        this.setState({ sending: false });
      } catch (error) {
        this.setState({ errors: ["ایمیل یا پسورد صحیح نمی باشد"] });
      }
    }
  };

  handleChange = async ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
    console.log({ account });
  };

  // email = createRef();
  // password = createRef();
  // handlesubmit =async (e) => {
  //   e.preventDefault();
  //   console.log("email:", this.email.current.value);
  //   console.log("password:", this.password.current.value);
  //   const account = {
  //     email: this.email.current.value,
  //     password: this.password.current.value,
  //   };
  //   if(account.email&&account.password){
  //     const response=   await axios.post("https://reqres.in/api/login",account)
  //  console.log(response);
  //   }

  render() {
    const { email, password } = this.state.account;
    return (
      <>

{/* {this.state.Navigate[0]?<Navigate to="/dashboard" replace={true} />:''} */}




        {this.state.errors.length !== 0 && (
          <div className="alert alert-danger mt-3">
            <ul>
              {this.state.errors.map((e, i) => (
                <li key={i}>{e} </li>
              ))}
            </ul>
          </div>
        )}


        <form onSubmit={this.handlesubmit}>
          <Input
            name="email"
            value={email}
            lable="email"
            onChangee={this.handleChange}
          />
          <Input
            name="password"
            value={password}
            lable="password"
            onChangee={this.handleChange}
          />
          <button disabled={this.state.sending} className="btn btn-primary">
            login
          </button>
        </form>
      </>
    );
  }
 
    
  
}

export default Login;
