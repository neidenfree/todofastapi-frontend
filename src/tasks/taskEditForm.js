import TaskForm from "./taskForm";
import {Box, Button, Container, Modal, TextField, Typography} from "@mui/material";


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

export default class TaskEditForm extends TaskForm {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: localStorage.getItem("username"),
                password: localStorage.getItem("password"),
                email: localStorage.getItem("email")
            },
            title: this.props.title,
            description: this.props.description,
            done: this.props.done,
            open: this.props.open
        };
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();

        let updatedTaskData = {
            user: {
                username: localStorage.getItem("username"),
                email: localStorage.getItem("email"),
                password: localStorage.getItem("password")
            }, task: {
                task_id: this.props.taskId,
                title: this.state.title,
                description: this.state.description,
                done: this.state.done
            }
        }

        const requestOptions = {
            method: 'PUT', headers: {'content-type': 'application/json'}, body: JSON.stringify(updatedTaskData)
        }

        fetch("http://localhost:8888/task", requestOptions).then(res => res.json()).then(res => console.log(res))
            .then(() => {
                this.props.smoothEditHandler(updatedTaskData.task)
            });
        this.props.parentHandleClose();

    }

    handleClose(event) {
        // this.setState();
        this.setState({open: false});
        this.props.parentHandleClose();
    }

    componentDidMount() {
        this.setState({
            open: this.props.open
        });
    }

    render() {

        return (
            <Container>
                <Modal open={true} onClose={this.handleClose}>
                    <Box sx={style} component={"form"} onSubmit={this.handleSubmit}>
                        <Typography>Edit task</Typography>
                        <TextField value={this.state.title} onChange={this.handleChange}
                                   margin="normal" required fullWidth id="email" name="title"
                                   label="Title" type={"text"} autoFocus/>
                        <TextField value={this.state.description} onChange={this.handleChange} multiline
                                   margin="normal" fullWidth id="email" name="description"
                                   label="Description" type={"text"}/>
                        <Button type={"submit"}>Ok</Button>
                    </Box>
                </Modal>
            </Container>);

    }

}