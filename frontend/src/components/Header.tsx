import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";

const Header = () => {
    const { Auth } = useContext(AuthContext);
    
    return(
        <header className="bg-white p-4">
        <div className="mx-auto flex h-l6 max-w-screen items-center gap-8 px-4 sm:px-6 lg:px-8">
          <Link className="block text-blue-800" to={Auth ? "/home" : "/"}>
            <span className="sr-only">Home</span>
            <img className="h-10 w-10 object-contain" src="/alt-chain-svgrepo-com.svg"/>
          </Link>
          <h1 className="text-lg">BlockTalk</h1>
      
          <div className="flex flex-1 items-center justify-end">
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                <Link className="block rounded-md bg-blue-800 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-950" to={Auth ? "/logout" : "/login"} >{Auth ? "Logout" : "Login"}</Link>
                { !Auth && <Link className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-blue-800 transition hover:text-blue-950 sm:block" to="/register">Register</Link>}
              </div>
            </div>
          </div>
        </div>
      </header>
    )
}

export default Header;