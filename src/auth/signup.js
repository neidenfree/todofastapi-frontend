import Login from "./login";
// import {useNavigate} from "react-router-dom";


export default class Signup extends Login {
    async handleSubmit(event) {
        alert("А вот хуй тебе на рыло");
    }
}


// export default function SignupWithNavigate(props) {
//     let navigate = useNavigate();
//     return <Signup {...props} navigate={navigate}/>;
// }