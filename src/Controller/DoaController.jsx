import doaService from "../services/doaService";

class DoaController {
  async getOneDoa(id = 1) {
    return doaService.getDoaById(id);
  }
}

export default DoaController;
