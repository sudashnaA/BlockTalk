import Container from "../components/Container";
import BoardsList from "../components/BoardsList";
import { useGetData } from "../utils";
import boardsService from "../services/boardsService";
import { Board } from "../types";
import { useState } from "react";

const BoardsPage = () => {
    const {data, errors, loading } = useGetData<Board[]>(boardsService.getBoards);
    const [search, setSearch] = useState("");

    let filteredData: Board[] = [];

    if (!errors && !loading && data){
        filteredData = data.filter(item => item.name.toLowerCase().match(search.trim().toLowerCase()));
    }

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    return(
        <Container>
            <h1 className="text-6xl">Boards:</h1>
            <input className="block p-4 ps-10 mt-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500" type="text" placeholder="Search..."
            onChange={e => handleSearch(e.target.value)}
            ></input>
            { errors && <h2>A network error has occurred</h2> }
            { loading && <h2>Loading...</h2> }
            { data && <BoardsList boards={filteredData} />}
        </Container>
    );
};

export default BoardsPage;