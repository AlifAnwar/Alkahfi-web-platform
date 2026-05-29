import axios from 'axios';
import { DOA_API_BASE_URL } from './api';

const doaClient = axios.create({
  baseURL: DOA_API_BASE_URL,
  timeout: 10000,
});

class DoaService {
  async getDoaList() {
    const response = await doaClient.get('/doa');
    return response.data?.data || [];
  }

  async getDoaById(id) {
    const response = await doaClient.get(`/doa/${id}`);
    return response.data?.data || null;
  }

  async searchDoa(query) {
    const response = await doaClient.post('/vector', {
      cari: query,
      tipe: ['doa'],
    });

    const results = response.data?.hasil || [];
    return results
      .map((item) => {
        const data = item.data || {};
        return {
          id: data.id_doa,
          grup: data.grup,
          nama: data.judul,
          ar: data.teks_arab,
          tr: data.teks_latin,
          idn: data.terjemahan,
          tentang: data.catatan || data.sumber || '',
        };
      })
      .filter((item) => item.id != null);
  }
}

export default new DoaService();
