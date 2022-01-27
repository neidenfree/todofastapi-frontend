import './login.css';

import {Component} from "react";
import {Redirect, useNavigate} from "react-router-dom";
import {Navigate} from "react-router-dom";
// import {loggedId} from "../App";
import {loggedIn} from "../App";
// import loggedIn from app

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "username": "", "password": "", "email": "", message: ""
        }
        this.loggedIn = loggedIn();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange(event) {
        this.setState({message: ""})
        this.setState({[event.target.name]: event.target.value});
    }


    async handleSubmit(event) {
        event.preventDefault();
        let loginData;
        if (this.state.email === "") {
            loginData = {
                "password": this.state.password,
                "username": this.state.username
            }
        } else if (this.state.username === "") {
            loginData = {
                "password": this.state.password,
                "email": this.state.email
            }
        } else {
            loginData = {
                "password": this.state.password,
                "email": this.state.email
            }
        }

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(loginData)
        }

        // try{
        const response = await fetch('http://localhost:8888/login/', requestOptions).then(
            (res) => {
                if (!res.ok) {
                    return {
                        "ok": false,
                        "message": "Wrong username/password!"
                    };
                }
                return res.json()
            }
        );

        if ('ok' in response) {
            this.setState({
                message: "Wrong username/password!"
            });
        } else {
            localStorage.setItem("username", response.username);
            localStorage.setItem("password", this.state.password);
            localStorage.setItem("email", response.email);
            window.location.reload();
            // this.props.navigate("/tasks");
        }

    }


    render() {


        return (
            !this.loggedIn ?
                <div className={"loginForm"}>
                    <form>
                        <input className={"inputField"} type={"text"} placeholder={"Username"} name={"username"}
                               value={this.state.username} onChange={this.handleChange}/>
                        <input className={"inputField"} type={"email"} placeholder={"Email"} name={"email"}
                               value={this.state.email} onChange={this.handleChange}/>
                        <input className={"inputField"} type={"password"} placeholder={"password"} name={"password"}
                               value={this.state.password} onChange={this.handleChange}/>
                        <input className={"button"} type={"button"} value={"OK"} onClick={this.handleSubmit}/>
                        <div>{this.state.message}</div>
                    </form>
                </div>
            :<Navigate to={"/tasks"}/>

        )
    }
}

// export function LoginWithNavigate(props) {
//     let navigate = useNavigate();
//     return <Login {...props} navigate={navigate}/>;
// }