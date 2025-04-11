import { Board } from "../types";
import { useState } from "react";
import { useGetData } from "../utils";

import Container from "../components/Container";
import BoardsList from "../components/BoardsList";
import Load from "../components/Loader/Load";
import Switch from "../components/Switch";

import boardsService from "../services/boardsService";

const BoardsPage = () => {
    const [joinedBoards, SetJoinedBoards] = useState(false);
    const [search, setSearch] = useState("");

    const boardsData = useGetData<Board[]>(boardsService.getBoards);
    const joinedBoardData = useGetData<Board[]>(boardsService.getJoinedBoards);

    const data = (joinedBoards) ? joinedBoardData.data : boardsData.data;
    const errors = (joinedBoards) ? joinedBoardData.errors : boardsData.errors;
    const loading = (joinedBoards) ? joinedBoardData.loading : boardsData.loading;

    let filteredData: Board[] = [];

    if (!errors && !loading && data){
        filteredData = data.filter(item => item.name.toLowerCase().match(search.trim().toLowerCase()));
    }

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    return(
        <Container>
            <Load errors={errors} loading={loading} />
            { data && 
            <>
                <h1 className="text-6xl">{joinedBoards ? "Joined Boards:" : "Boards:" }</h1>
                <div className="mt-5"><Switch joinedBoards={joinedBoards} onSwitch={SetJoinedBoards} /></div>
                <input className="block p-4 ps-10 mt-5 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Search..." onChange={e => handleSearch(e.target.value)}></input>
                <BoardsList boards={filteredData} />
            </>
            }
        </Container>
    );
};

export default BoardsPage;