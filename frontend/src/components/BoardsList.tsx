import { Board } from "../types";
import BoardView from "./BoardView";

const BoardsList = ({boards}: {boards: Board[]}) => {
    return(
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4 mt-10">
            {boards.map((board: Board) => 
                <BoardView key={board.id} board={board} />
            )}
        </div>
    )
};

export default BoardsList;