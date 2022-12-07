import axios from "axios";

const TOKEN = "800f69ea8a204c249a1155233220712";

export default axios.create({
  baseURL: " https://api.weatherapi.com/v1",
  params: {
    key: TOKEN,
  },
});
