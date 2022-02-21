import {Component} from "react";
import Login from "../auth/login";
import {Box, Button, Container, Modal, TextField, Typography} from "@mui/material";
import {backend} from "../App";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openedNewTask: false, title: "", description: "",
            user: {
                username: localStorage.getItem("username"),
                password: localStorage.getItem("password"),
                email: localStorage.getItem("email")
            }
        }
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleOpen() {
        this.setState({openedNewTask: true});
    }

    handleClose() {
        this.setState({
            openedNewTask: false,
            description: "", title: ""
        });
    }

    handleChange(event) {
        this.setState({message: ""})
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        let newTaskData = {
            user: this.state.user,
            task: {
                title: this.state.title,
                description: this.state.description,
                done: false
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(newTaskData)
        }

        fetch(backend + "tasks/new", requestOptions).then(
            res => res.json()
        ).then(res => this.props.smoothAddHandler({
            title: res.title, task_id: res.task_id, description: res.description
        })).then(
            res => {
                this.handleClose();
            });
    }


    render() {
        return (<Container>
                <Button onClick={this.handleOpen}>New task</Button>
                <Modal open={this.state.openedNewTask} onClose={this.handleClose}>
                    <Box sx={style} component={"form"} onSubmit={this.handleSubmit}>
                        <Typography>Add new task</Typography>
                        <TextField value={this.state.title} onChange={this.handleChange}
                                   margin="normal" required fullWidth id="email" name="title"
                                   label="Title" type={"text"} autoFocus/>
                        <TextField value={this.state.description} onChange={this.handleChange} multiline
                                   margin="normal" fullWidth id="email" name="description"
                                   label="Description" type={"text"}/>
                        <Button type={"submit"}>Ok</Button>

                    </Box>
                </Modal>
            </Container>
        )
    }
}