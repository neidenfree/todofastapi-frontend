import './App.css';
import Login from "./auth/login";
import {Routes, Route, Link, Router, BrowserRouter} from "react-router-dom";
import {Navigate} from 'react-router-dom';
import Startup from "./startup";
import TaskPage from "./tasks/taskPage";
import Signup from "./auth/signup";


function App() {
    function loggedIn() {
        let a = localStorage.getItem("username");
        return a === null;
    }

    return (
        <BrowserRouter>
            <main>

                <div className="App">
                    <Routes>
                        <Route path={"/"} element={<Startup/>}/>
                        <Route path={"/login"} element={<Login/>}/>
                        <Route path={"/signup"} element={<Signup/>}/>
                        {/*<Route exact path={"/signup"} component={Login}/>*/}
                    </Routes>
                    {/*<div className={"loginForm"}>*/}
                    {/*    <Login/>*/}
                    {/*</div>*/}
                </div>
            </main>
        </BrowserRouter>
    );
}

export default App;
