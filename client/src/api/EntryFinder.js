
import axios from "axios";

const usersRequest = axios.create({
  baseURL: "http://localhost:3001/users",
});
const albumsRequest = axios.create({
  baseURL: "http://localhost:3001/albums",
});

export {usersRequest,albumsRequest}

