import axios from "axios";
import { Board } from "../types";
import { apiBaseUrl } from "../constants";

const getBoards = async () => {
    const { data } = await axios.get<Board[]>(`${apiBaseUrl}/boards`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
};

const getBoardByName = async (name: string) => {
    const { data } = await axios.get<Board>(`${apiBaseUrl}/boards/${name}`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
}

export default {
    getBoards,
    getBoardByName,
};