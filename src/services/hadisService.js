import { api, getApiErrorMessage } from './api';

const HADIS_REQUEST_DELAY_MS = 350;

const delay = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

class HadisService {
  constructor() {
    this.hadisCache = new Map();
    this.perawiCache = null;
  }

  /**
   * Fetch list of hadits scholars (perawi)
   */
  async getPerawiList() {
    if (this.perawiCache) {
      return this.perawiCache;
    }

    try {
      const response = await api.get('/hadits/perawi');
      this.perawiCache = response.data.data;
      return this.perawiCache;
    } catch (error) {
      console.error('Error fetching perawi list:', error);
      throw new Error(getApiErrorMessage(error));
    }
  }

  /**
   * Fetch hadits by perawi slug and number
   * @param {string} slug - Scholar slug (e.g., 'bukhari')
   * @param {number} number - Hadits number
   */
  async getHadisBySlugnNumber(slug, number) {
    const cacheKey = `${slug}:${number}`;

    if (this.hadisCache.has(cacheKey)) {
      return this.hadisCache.get(cacheKey);
    }

    try {
      const response = await api.get(`/hadits/${slug}/${number}`);
      const hadis = response.data.data;
      this.hadisCache.set(cacheKey, hadis);
      return hadis;
    } catch (error) {
      console.error(`Error fetching hadis ${slug}/${number}:`, error);
      if (error.response?.status === 429) {
        throw new Error('Terlalu banyak request ke API Hadits. Tunggu sebentar lalu coba lagi.');
      }

      throw new Error(getApiErrorMessage(error));
    }
  }

  /**
   * Fetch all hadits from a specific perawi
   * This requires pagination - fetching numbers 1 to total
   * Note: API doesn't have direct "get all" endpoint, so we fetch individually
   * For performance, we'll implement lazy loading in the component
   */
  async getHadisByPerawi(slug, pageSize = 6, pageNumber = 1) {
    try {
      const startNumber = (pageNumber - 1) * pageSize + 1;
      const endNumber = pageNumber * pageSize;
      const hadis = [];

      for (let i = startNumber; i <= endNumber; i++) {
        const cacheKey = `${slug}:${i}`;
        const shouldWait = i > startNumber && !this.hadisCache.has(cacheKey);

        if (shouldWait) {
          await delay(HADIS_REQUEST_DELAY_MS);
        }

        try {
          const data = await this.getHadisBySlugnNumber(slug, i);
          hadis.push(data);
        } catch (error) {
          if (error.message.includes('Terlalu banyak request')) {
            if (hadis.length > 0) {
              return hadis;
            }

            throw error;
          }

          console.warn(`Hadis ${slug}/${i} dilewati:`, error);
        }
      }

      return hadis;
    } catch (error) {
      console.error('Error fetching hadits by perawi:', error);
      throw error;
    }
  }
}

export default new HadisService();
