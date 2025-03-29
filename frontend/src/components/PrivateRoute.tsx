import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useGetData } from "../utils";
import userService from "../services/userService";
import { passportUser } from "../types";
import { AuthContext } from "../context";
import { useContext } from "react";

type Props = {
    children: ReactNode[] | ReactNode;
};

const PrivateRoute = ({children}: Props) => {
    const { setAuth } = useContext(AuthContext);
    const { errors, loading } = useGetData<passportUser>(userService.verify);

    if (errors){
        setAuth(false);
        localStorage.setItem("jwt", "null");
    };

    return(
        <>
            {(!loading) && ((errors) ? <Navigate to="/" /> : <>{ children }</>)}
        </>
    );
}

export default PrivateRoute;