import httpClient from "./httpclient";
import { Location } from "models/location";

export const getLocations = ():Promise<Location[]> => httpClient.get('/locations');
