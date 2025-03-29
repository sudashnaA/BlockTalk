import { ReactNode } from "react";

type Props = {
    children: ReactNode[] | ReactNode;
};

const Container = ({children}: Props) => {
    return(
        <div className="container mx-auto min-h-screen px-8 flex flex-col gap-5 items-center mb-20">
            {children}
        </div>
    );
};

export default Container;