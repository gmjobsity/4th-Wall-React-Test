import axios from 'axios';
import {environment} from '../environment';

const sleep = (ms = 2000): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const httpClient = axios.create({
    baseURL: environment.apiURL,
    headers: {
      'Content-Type': 'application/json',
    },
});

httpClient.interceptors.response.use(
    async (response) => {
        await sleep();
        return response.data;
    },
    (error) => {
        throw error;
    }
);

export default httpClient;
