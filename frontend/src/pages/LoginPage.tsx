import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import userService from "../services/userService";
import Container from "../components/Container";
import MainForm from "../components/FormComponents/MainForm";
import FormErrors from "../components/FormComponents/FormErrors";
import axios from "axios";
import { FormError } from "../types";
import { AuthContext } from "../context";
import { useContext } from "react";
import Title from "../components/Title";

const LoginPage = () => {
    const { setAuth } = useContext(AuthContext);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<FormError[]>([]);
    const navigate = useNavigate();

    const submitForm = async (e: React.SyntheticEvent) => {
        setError([]);
        e.preventDefault();
        try {
            const data = await userService.login({username, password});
            localStorage.setItem("jwt", data.token);
            setAuth(true);
            navigate("/home");
        } catch (error: unknown){
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.error);
            };
        };
    }

    return(
        <Container>
            <Title text="Login" />
            {error.length > 0 && <FormErrors errors={error}/>}
            <MainForm full={false} OnSubmit={(e) => submitForm(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                </div>
                <div className="flex flex-col items-center">
                    <input className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Login"></input>
                </div>
            </MainForm>
            <Link className="inline-block align-baseline font-bold text-sm text-blue-800 hover:text-blue-850" to="/register">
                Dont have an account?
            </Link>
        </Container>
    );
};

export default LoginPage;