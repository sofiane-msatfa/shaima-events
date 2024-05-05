import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import type { AdresseGouvResponse } from "@common/dto/adresse-gouv-response";

// @see https://adresse.data.gouv.fr/api-doc/adresse
export interface AdresseGouvParams {
  q: string;
  limit?: number;
  autocomplete?: number;
  type?: "housenumber" | "street" | "locality" | "municipality";
  lat?: number;
  lon?: number;
}

export const fetchAddress = async (params: AdresseGouvParams) => {
  const response = await axios.get<AdresseGouvResponse>(
    "https://api-adresse.data.gouv.fr/search/",
    { params },
  );
  const { features } = response.data;
  return features;
};

export const useAddress = (search: string, opts?: Omit<AdresseGouvParams, "q">) => {
  const params = { q: search, ...opts };
  return useQuery({
    queryKey: ["address", params],
    queryFn: () => fetchAddress(params),
    enabled: params.q.length > 3,
  });
};
