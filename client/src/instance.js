import axios from "axios";

var instance = axios.create({
  baseURL: "http://localhost:5000"
});



export default instance