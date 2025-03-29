import { Board } from "../types";
import { colorParser } from "../utils";

const BoardCard = ({board}: {board: Board}) => {
    const title: string = String(board.name).charAt(0).toUpperCase() + String(board.name).slice(1);
    const {color, textcolor}: {color: string, textcolor: string} = colorParser(board.color.toLowerCase());

    return(
        <div className={`flex flex-row ${color} gap-5 w-screen h-36 p-8 items-center`}>
            <div className="p-4"><img className="object-scale-down w-full h-30" src={board.logo} alt={board.name}></img></div>
            <h1 className={`text-7xl ${textcolor}`}>{title}</h1>
        </div>
    )
}

export default BoardCard;