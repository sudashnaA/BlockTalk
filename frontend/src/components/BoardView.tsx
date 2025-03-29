import { Board } from "../types";
import { NavigateFunction, useNavigate } from "react-router-dom";

const BoardView = ({board}: {board: Board}) => {
    const navigate: NavigateFunction = useNavigate();

    return(
        <div onClick={() => navigate(`/boards/${(board.name).toLowerCase()}`) } className="max-w-sm rounded shadow-lg flex flex-col items-center  hover:shadow-blue-800/50">
            <div className="p-4"><img className="object-scale-down w-full h-30" src={board.logo} alt={board.name}></img></div>
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-center">{board.name}</div>
                <p className="text-gray-700 text-base text-center">{board.description}</p>
            </div>
        </div>
    )
};

export default BoardView;