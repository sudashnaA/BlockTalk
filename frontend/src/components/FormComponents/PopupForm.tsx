import { ReactNode } from "react";

type Props = {
    children: ReactNode[] | ReactNode;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
};


const PopupForm = ({children, setOpen}: Props) => {
    return(
        <div tabIndex={-1} className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-2rem)] max-h-full">
            <div className="relative inset-x-0 mx-auto top-1/6 p-4 w-full max-w-md max-h-full">
                <div className="relative bg-neutral-200 rounded-lg shadow-lg">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200">
                        <button onClick={() => setOpen(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div> 
    );
};

export default PopupForm;