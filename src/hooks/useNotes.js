"use client"
import axios from "axios";
import httpClient from "@/lib/axios";



export default function useNotes() {

    const create = async (title, content, visibility) => {
        try {
            const response = await axios.post("/api/notes", {title, content, visibility}, {
                headers: {
                    bearer: localStorage.getItem("auth_token")
                }
            });
            return response.data;
        }
        catch (error) {
            return error.response.data;
        }
    }

    const get = async () => {
        try {
            const response = await axios.get('/api/notes', {
                headers: {
                    bearer: localStorage.getItem("auth_token")
                }
            });
            return response.data;
        }
        catch (error) {
            return error.response.data;
        }
    }

    const update = async (noteID, {title, content, visibility}) => {
        try {
            const response = await axios.patch("/api/notes/"+noteID, {title, content, visibility}, {
                headers: {
                    bearer: localStorage.getItem("auth_token")
                }
            });
            return response.data;
        }
        catch (error) {
            return error.response.data;
        }
    }

    const destroy = async (noteID) => {
        try {
            const response = await axios.delete("/api/notes/"+noteID,{
                headers: {
                    bearer: localStorage.getItem("auth_token")
                }
            });
            return response.data;
        }
        catch (error) {
            return error.response.data;
        }

    }

    const share = async (noteID, recieverID) => {}


    return {create, get, update, destroy, share}
}