import { getSholatMonth, getSholatToday } from "../services/sholatService";

class SholatController {
  async getSholatToday() {
    return getSholatToday();
  }

  async getSholatMonth(month) {
    return getSholatMonth({ month });
  }
}

export default SholatController;
