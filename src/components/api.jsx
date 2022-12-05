import axios from "axios";



const TOKEN = "4987e93328234a7eacd145029220512"

export default axios.create({
    baseURL: " https://api.weatherapi.com/v1",
    params: {
        key: TOKEN
    }
  })