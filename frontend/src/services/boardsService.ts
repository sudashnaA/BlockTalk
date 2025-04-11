import axios from "axios";
import { Board, joinBoardRes } from "../types";
import { apiBaseUrl } from "../constants";

const getBoards = async () => {
    const { data } = await axios.get<Board[]>(`${apiBaseUrl}/boards`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
};

const getJoinedBoards = async () => {
    const { data } = await axios.get<Board[]>(`${apiBaseUrl}/boards/joined`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
};

const getBoardViewData = async (name: string) => {
    const boardDetails = await axios.get<Board>(`${apiBaseUrl}/boards/${name}`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});
    const joinStatus = await axios.get<boolean>(`${apiBaseUrl}/boards/${name}/joinstatus`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});
    const memberCount = await axios.get<number>(`${apiBaseUrl}/boards/${name}/members`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});


    return {boardDetails: boardDetails.data, joinStatus: joinStatus.data, memberCount: memberCount.data};
};

const joinBoard = async (name: string) => {
    const { data } = await axios.get<joinBoardRes>(`${apiBaseUrl}/boards/${name}/join`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
};

const leaveBoard = async (name: string) => {
    const { data } = await axios.get<joinBoardRes>(`${apiBaseUrl}/boards/${name}/leave`, { headers: {
        'Authorization': localStorage.getItem("jwt"),
    }});

    return data;
};

export default {
    getBoards,
    getJoinedBoards,
    getBoardViewData,
    joinBoard,
    leaveBoard
};