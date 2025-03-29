import Container from "../components/Container";
import { useParams } from "react-router-dom";
import BoardCard from "../components/BoardCard";
import boardsService from "../services/boardsService";
import { useGetData } from "../utils";
import { Board } from "../types";
import ButtonsContainer from "../components/ButtonsContainer";

const ViewBoardPage = () => {
    const { name } = useParams();
    const {data, errors, loading } = useGetData<Board>(() => boardsService.getBoardByName((name) ? name : ""));
    
    return(
        <Container>
            {data && <BoardCard board={data} />}
            <ButtonsContainer>
                <button className="bg-blue-800 hover:bg-blue-950 text-white font-semibold hover:text-white py-2 px-4 border-2 border-black">Join</button>
                <button className="bg-transparent hover:bg-blue-800 text-blue-800 font-semibold hover:text-white py-2 px-4 border-2 border-blue-800 hover:border-transparent rounded">Create Post</button>
            </ButtonsContainer>
            <h1 className="text-4xl">Posts:</h1>
        </Container>
    );
};

export default ViewBoardPage;