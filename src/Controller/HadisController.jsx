import axios from "axios";
import { API_BASE_URL } from "../services/api";
class HadisController {
  async getRandomHadis() {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/hadits/perawi/acak`
      );
      return response.data;
    } catch (error) {
      console.error("Error Fetching Data", error);
      throw error;
    }
  }
}

export default HadisController;
