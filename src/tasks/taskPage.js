// import App from "../App";
// import './login.css'
import {Component} from "react";
import {Navigate} from "react-router-dom";
import {logOut} from "../App";
import {loggedIn} from "../App";
import {Button} from "@mui/material";

export default class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            username: localStorage.getItem("username"),
        }
    }

    componentDidMount() {
        fetch("https://localhost:8888")
    }

    render() {
        return (
            loggedIn() ? <div>
                    <h1>Welcome to my site, {this.state.username}!</h1>
                    <p>You successfully logged in!</p>
                <Button variant={"contained"} onClick={logOut}>LogOut</Button>
                    {/*<input type={"button"} value={"LogOut"} onClick={logOut}/>*/}
                </div> :
                <Navigate to={"/login"}/>
        );
    }
}