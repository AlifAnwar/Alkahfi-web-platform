import { api, getApiErrorMessage } from "./api";

export const DEFAULT_LOCATION_CODE =
  import.meta.env.VITE_LOCATION_CODE || "0501";

export const DEFAULT_LOCATION_NAME =
  import.meta.env.VITE_LOCATION_NAME || "Bintan";

const formatDateForApi = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const normalizeSholatError = (error) => {
  throw new Error(getApiErrorMessage(error));
};

export const getSholatToday = async ({
  locationCode = DEFAULT_LOCATION_CODE,
  date = new Date(),
} = {}) => {
  try {
    const response = await api.get(
      `/sholat/jadwal/${locationCode}/${formatDateForApi(date)}`
    );

    return response.data?.data?.jadwal || null;
  } catch (error) {
    normalizeSholatError(error);
  }
};

export const getSholatMonth = async ({
  locationCode = DEFAULT_LOCATION_CODE,
  year = new Date().getFullYear(),
  month,
} = {}) => {
  const selectedMonth = String(month || new Date().getMonth() + 1).padStart(
    2,
    "0"
  );

  try {
    const response = await api.get(
      `/sholat/jadwal/${locationCode}/${year}/${selectedMonth}`
    );

    return response.data?.data?.jadwal || [];
  } catch (error) {
    normalizeSholatError(error);
  }
};
