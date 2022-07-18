import { Environment } from "../models/environment";

export const environment: Environment = {
    apiURL: process.env.REACT_APP_API_URL || 'http://localhost:3004'
}