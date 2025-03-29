import { ReactNode } from "react";

type Props = {
    children: ReactNode[] | ReactNode;
};

const ButtonsContainer = ({children}: Props) => {
    return(
        <div className="flex flex-row gap-5 w-full justify-end">
            {children}
        </div>
    )
}

export default ButtonsContainer;