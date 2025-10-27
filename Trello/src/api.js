
import axios from "axios";

const username = "root";
const password = "ROOT";
const token = btoa(`${username}:${password}`);

const api = axios.create({
  baseURL: "http://localhost:2000/wp-json/wp/v2/",
  headers: {
    "Authorization": `Basic ${token}`,
    "Content-Type": "application/json"
  }
});

export default api;
