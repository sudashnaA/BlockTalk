import { useState } from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <OpenButton open={open} setOpen={ setOpen }/>  
            <div className={`fixed top-0 ${open ? "left-0" : "-left-80"} h-screen w-1/3 md:w-50 flex flex-col bg-gray-200 shadow-lg transition-all`}>   
                <CloseButton setOpen={setOpen} />
                <SideBarItem setOpen={setOpen} text={"Home"} imgpath={"home-svgrepo-com.svg"} />
                <SideBarItem setOpen={setOpen} text={"Boards"} imgpath={"message-circle-lines-svgrepo-com.svg"}  />
            </div>
        </>
    );
};

const CloseButton = ({setOpen}: {setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
        <div onClick={() => setOpen(false)} className="relative flex items-center justify-center h-14 w-14 mt-2 mb-2 mx-auto bg-white hover:bg-gray-600 hover:text-white
        hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group">
            <img className="h-10 w-10 object-contain side-bar-img" src="/close-square-svgrepo-com.svg"/>
            <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 
            text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
            {"Close"}
            </span>
        </div>
    )
};

const OpenButton = ({open, setOpen}: {open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return(
        !open && <button className={`fixed top-1/2 ${open ? "left-36" : "left-0"} transition-all`} onClick={() => setOpen(!open)}><img className="h-5 w-5 object-contain side-bar-img" src="/open-menu-svgrepo-com.svg"/></button>
    )
};

const SideBarItem = ({ text, imgpath, setOpen }: {text: string, imgpath: string, setOpen: React.Dispatch<React.SetStateAction<boolean>>}) => (
    <div className="relative flex items-center justify-center h-14 w-14 mt-2 mb-2 mx-auto bg-white hover:bg-gray-600 hover:text-white
    hover:rounded-xl rounded-3xl transition-all duration-300 ease-linear cursor-pointer shadow-lg group">
        <Link onClick={() => setOpen(false)} to={`/${text}`}><img className="h-10 w-10 object-contain side-bar-img" src={`/${imgpath}`}/></Link>
        <span className="absolute w-auto p-2 m-2 min-w-max left-14 rounded-md shadow-md text-white bg-gray-900 
        text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100">
        {text}
        </span>
    </div>
);

export default SideBar;