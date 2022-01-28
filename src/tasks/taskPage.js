// import App from "../App";
// import './login.css'
import {Component} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {logOut} from "../App";
import {loggedIn} from "../App";
import {Button, Container, Fab, Grid, Link, Stack, Typography} from "@mui/material";
import Task from "./task";

export default class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            email: localStorage.getItem("email")

        }
    }

    componentDidMount() {
        let loginData = {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email
        }

        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(loginData)
        }

        fetch("http://localhost:8888/tasks", requestOptions).then(
            res => {
                return res.json();
            }
        ).then(res => {
                this.setState({tasks: res});
            }
        );


    }

    render() {
        console.log(this.state)
        return (
            loggedIn() ? <div>
                    <Container maxWidth="sm">


                        <Typography>Welcome to neidenToDo,

                            <NavLink to={'/settings'}>{this.state.username}</NavLink>

                            !</Typography>
                        <br/>

                        <Stack>
                            {this.state.tasks.map(task => {
                                return (<Task title={task.title}/>);
                            })}

                        </Stack>


                        {/*<input type={"button"} value={"LogOut"} onClick={logOut}/>*/}
                    </Container>
                </div> :
                <Navigate to={"/login"}/>
        );
    }
}