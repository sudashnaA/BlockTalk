import { ReactNode } from "react";

type Props = {
    children: ReactNode[] | ReactNode;
    itemsEnd: boolean
};

const ButtonsContainer = ({children, itemsEnd}: Props) => {
    return(
        <div className={`flex flex-row gap-5 w-full ${itemsEnd ? "justify-end" : "justify-normal"}`}>
            {children}
        </div>
    )
}

export default ButtonsContainer;