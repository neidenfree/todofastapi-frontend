import TaskForm from "./taskForm";


export default class TaskEditForm extends TaskForm {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            description: this.props.description,
            done: this.props.done,
            openedNewTask: true
        }
    }

    handleSubmit(event) {
        super.handleSubmit(event);
    }

    render() {

    }

}