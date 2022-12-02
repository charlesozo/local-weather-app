import axios from "axios";

const TOKEN = "e1fa33cc22574f9fb79132218222111"
export default axios.create({
    baseURL: " http://api.weatherapi.com/v1",
    params: {
        key: TOKEN
    }
  })