import { IMG_API_URL, WORD_API_URL, NUM_RESULTS } from "../constants";

// Handler for all get functionality
export const GET = {
  // Send a standard get request and return response data
  sendGetRequest(url) {
    return fetch(url, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        return data;
      });
  },
  // Fetch images from api based on index and number of results
  getImageSearchResults(search_string, start) {
    return this.sendGetRequest(
      `${IMG_API_URL}&q=${search_string}&searchType=image&key=${process.env.API_KEY}&start=${start}&num=${NUM_RESULTS}`
    );
  },
  // Fetch a random word from an api
  async getRandomWord() {
    return this.sendGetRequest(WORD_API_URL).then(data => {
      return data.ord
    })
  },
};
