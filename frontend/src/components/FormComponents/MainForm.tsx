import { ReactNode } from "react";

type Props = {
    OnSubmit: (e: any) => void;
    full: boolean
    children: ReactNode[] | ReactNode;
};

const MainForm = ({children, OnSubmit, full}: Props) => {
    return(
        <div className={full ? `w-full`: `w-sm`}>
            <form onSubmit={OnSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {children}
            </form>
        </div>
    );
};

export default MainForm;