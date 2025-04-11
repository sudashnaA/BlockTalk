import { useParams, useNavigate } from "react-router-dom";
import { useGetData } from "../utils";
import { Board } from "../types";

import BoardCard from "../components/BoardCard";
import Container from "../components/Container";
import ButtonsContainer from "../components/ButtonsContainer";
import Load from "../components/Loader/Load";

import boardsService from "../services/boardsService";

type BoardViewData = {
    boardDetails: Board,
    joinStatus: boolean,
    memberCount: number,
}

const ViewBoardPage = () => {
    const { name } = useParams();
    const navigate = useNavigate();
    const {data, setData, errors, loading } = useGetData<BoardViewData>(() => boardsService.getBoardViewData(name ? name : ""));

    const JoinButtonHandler = async () => {
        const { newMemberCount } = (!data?.joinStatus) ?  await boardsService.joinBoard(name ? name : "") : await boardsService.leaveBoard(name ? name : "");
        setData({joinStatus: !data?.joinStatus, boardDetails: data?.boardDetails as Board, memberCount: newMemberCount});
    };

    return(
        <Container>
            <Load errors={errors} loading={loading} />
            {data &&
            <>
                <BoardCard board={data.boardDetails} />
                <ButtonsContainer itemsEnd={true}>
                    <div className="flex items-center font-medium text-2xl">
                        <p>{data?.memberCount} {(data?.memberCount === 1) ? "Member" : "Members"}</p>
                    </div>
                    {   (data?.joinStatus) ? 
                        <button onClick={JoinButtonHandler} className="bg-red-800 hover:bg-red-950 text-white font-semibold hover:text-white py-2 px-4 border-2 border-black">Leave</button>
                        :
                        <button onClick={JoinButtonHandler} className="bg-blue-800 hover:bg-blue-950 text-white font-semibold hover:text-white py-2 px-4 border-2 border-black">Join</button>
                    }
                    <button onClick={() => navigate(`/boards/${name}/createpost`)} className="bg-transparent hover:bg-blue-800 text-blue-800 font-semibold hover:text-white py-2 px-4 border-2 border-blue-800 hover:border-transparent rounded">Create Post</button>
                </ButtonsContainer>
                <h1 className="text-4xl">Posts:</h1>
            </>
            }
        </Container>
    );
};

export default ViewBoardPage;