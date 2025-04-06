import axios from "axios";

const httpClient = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        // accept: "application/json",
        "Content-Type": "application/json",
    }
})

export default httpClient;