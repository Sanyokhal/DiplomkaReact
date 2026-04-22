import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
});

export default async function request(path = "/", method = "get", data = {}) {
    try {
        const res = await api({
            url: path,
            method,
            ...(method.toLowerCase() === "get"
                ? { params: data }
                : { data }),
        });

        return res.data;
    } catch (err) {
        if (err.response) {
            throw err.response.data;
        }

        throw { message: "Network error" };
    }
}