import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";
import { useContext } from "react";
import { useEffect } from "react";

const Logout = () => {
    const { setAuth } = useContext(AuthContext);

    useEffect(() => {
        setAuth(false);
        localStorage.setItem("jwt", "null");
    }, []);

    return(
        <>
          <Navigate to="/" />
        </>
    );
}

export default Logout;