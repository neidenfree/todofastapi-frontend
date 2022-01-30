// import App from "../App";
// import './login.css'
import {Component} from "react";
import {Navigate, NavLink} from "react-router-dom";
import {logOut} from "../App";
import {loggedIn} from "../App";
import {Box, Button, Container, Fab, Grid, Link, Modal, Stack, TextField, Typography} from "@mui/material";
import Task from "./task";
import TaskForm from "./taskForm";


export default class TaskPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            email: localStorage.getItem("email"),
        }
        this.smoothAddHandler = this.smoothAddHandler.bind(this);
        this.smoothDeleteHandler = this.smoothDeleteHandler.bind(this);
        this.smoothDoneHandler = this.smoothDoneHandler.bind(this);

    }

    getTasks() {
        let loginData = {
            username: localStorage.getItem("username"),
            password: localStorage.getItem("password"),
            email: localStorage.getItem("email")
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

    componentDidMount() {
        this.getTasks();
    }

    smoothAddHandler(task) {
        let tasks = this.state.tasks;
        tasks.push(task);
        this.setState({
            tasks: tasks
        })
    }

    smoothDeleteHandler(taskId) {
        console.log('taskId = ', taskId)
        let tasks = this.state.tasks;
        let number = tasks.findIndex(task => task.task_id === taskId);
        tasks.splice(number, 1);
        this.setState({
            tasks: tasks
        });
    }

    smoothDoneHandler(taskId) {
        let t = this.state.tasks;
        console.log('taskId = ', taskId);
        let number = t.findIndex(task => task.task_id === taskId);
        // t[number].done = !t[number].done;
        // this.setState({
        //     tasks: t
        // });

        // t.find(x => x.task_id === taskId).done = !t.find(x => x.task_id === taskId).done;
        // this.setState(
        //     {tasks: t}
        // );
    }


    render() {
        return (
            loggedIn() ? <div>
                    <Container maxWidth="sm">

                        <Typography>Welcome to neidenToDo,
                            <NavLink to={'/settings'}>{this.state.username}</NavLink>
                            !</Typography>
                        <br/>

                        <TaskForm smoothAddHandler={this.smoothAddHandler}/>

                        <Stack spacing={2}>
                            {this.state.tasks.map(task => {
                                return (<Task key={task.task_id} title={task.title} description={task.description}
                                              done={task.done}
                                              smoothDoneHandler={this.smoothDoneHandler}
                                              taskId={task.task_id} smoothDeleteHandler={this.smoothDeleteHandler}/>);
                            })}
                        </Stack>

                    </Container>
                </div> :
                <Navigate to={"/login"}/>
        );
    }
}