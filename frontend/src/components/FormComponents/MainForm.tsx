import { ReactNode } from "react";

type Props = {
    OnSubmit: (e: any) => void;
    children: ReactNode[] | ReactNode;
};

const MainForm = ({children, OnSubmit}: Props) => {
    return(
        <div className="w-full max-w-sm">
            <form onSubmit={OnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {children}
            </form>
        </div>
    );
};

export default MainForm;