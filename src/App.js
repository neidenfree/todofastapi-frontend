import './App.css';
import Login from "./auth/login";
import {Routes, Route, Link, Router, BrowserRouter} from "react-router-dom";
import {Navigate} from 'react-router-dom';
import Startup from "./startup";
import TaskPage from "./tasks/taskPage";
import Signup from "./auth/signup";
import LoginWithNavigate from "./auth/login";
import ChangePassword from "./auth/changePassword";
import Settings from "./settings/settings";

export function loggedIn() {
    let a = localStorage.getItem("username");
    return a !== null;
}

// export const backend = "http://localhost:8888/";
// export const backend = "http://23.111.121.144:8888/";
export const backend = "http://23.111.121.27:8888/";


export function logOut(){
    localStorage.clear();
    window.location.reload();
}

function App() {


    return (
        <BrowserRouter>
            <main>

                <div className="App">
                    <Routes>
                        <Route path={"/"} element={<Startup/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/signup"} element={<Signup/>}/>
                        <Route path={"/tasks"} element={<TaskPage/>}/>
                        <Route path={"/change-password"} element={<ChangePassword/>}/>
                        <Route path={"/settings"} element={<Settings/>}/>
                        {/*<Route exact path={"/signup"} component={Login}/>*/}
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;
