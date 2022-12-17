import axios from "axios";

const TOKEN = "472c154ffe7c4e8988f210324221712";

export default axios.create({
  baseURL: " https://api.weatherapi.com/v1",
  params: {
    key: TOKEN,
  },
});
