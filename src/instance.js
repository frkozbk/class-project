import axios from "axios";

// axios istekleri için bir base location belirle
var instance = axios.create({
  baseURL: "http://localhost:5000"
});



export default instance