// import App from "../App";
// import './login.css'
import {Component} from "react";
import {Navigate} from "react-router-dom";
import {logOut} from "../App";
import {loggedIn} from "../App";


export default class TaskPage extends Component {
    render() {
        return (
            loggedIn() ? <div>
                    <h1>Welcome to my site!</h1>
                    <p>You successfully logged in!</p>
                    <input type={"button"} value={"LogOut"} onClick={logOut}/>
                </div> :
                <Navigate to={"/login"}/>
        );
    }
}