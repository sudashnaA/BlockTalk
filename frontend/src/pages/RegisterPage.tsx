import { Link } from "react-router-dom";
import { useState } from "react";
import userService from "../services/userService";
import FormErrors from "../components/FormComponents/FormErrors";
import { FormError } from "../types";
import MainForm from "../components/FormComponents/MainForm";
import Container from "../components/Container";
import axios from "axios";

const RegisterPage = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmpassword, setConfirmPassword] = useState<string>('');
    const [error, setError] = useState<FormError[]>([]);

    const submitForm = async (e: React.SyntheticEvent) => {
        setError([]);
        e.preventDefault();
        try {
            await userService.register({username, password, confirmpassword});
        } catch (error: unknown){
            if (axios.isAxiosError(error)) {
                setError(error.response?.data.error);
            };
        };
    }


    return(
        <Container>
            <h1 className="text-5xl">Register</h1>
            {error.length > 0 && <FormErrors errors={error}/>}
            <MainForm OnSubmit={(e) => submitForm(e)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Username</label>
                    <input onChange={(e) => setUsername(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                    <input onChange={e => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpassword">Confirm Password</label>
                    <input onChange={e => setConfirmPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="cpassword" type="password" placeholder="Confirm Password"/>
                </div>
                <div className="flex flex-col items-center">
                    <input className="bg-blue-800 hover:bg-blue-950 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" value="Register"></input>
                </div>
            </MainForm>
            <Link className="inline-block align-baseline font-bold text-sm text-blue-800 hover:text-blue-850" to="/login">
                Already have an account?
            </Link>
        </Container>
    );
};

export default RegisterPage;