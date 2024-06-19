import { API, http } from "@api";
import { ICityGetAllResponse } from "@interfaces";
import { AxiosResponse } from "axios";

export const CitiesService = {
  getAll: (
    offset: number,
    limit: number = 5,
    namePrefix?: string
  ): Promise<AxiosResponse<ICityGetAllResponse>> => {
    let queries = `?countryIds=IN&offset=${offset}&limit=${limit}`;
    if (namePrefix) queries += `&namePrefix=${namePrefix}`;
    const response = http.get<ICityGetAllResponse>(API.CITIES + queries);
    return response;
  },
};
