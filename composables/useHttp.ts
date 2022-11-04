import axios from "axios";
import type { Method, AxiosRequestHeaders } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
axios.defaults.baseURL = "http://192.168.178.43:3333"; // use url from .env | Check if issue once Tauri is exported default: localhost
axios.defaults.baseURL += "/api";

axios.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response.status === 401) {
            try {
                await AsyncStorage.removeItem("token");
            } catch(e) {
                // remove error
            }
            console.log('401: redirect to home', error.response);
        }
        return Promise.reject(error);
    }
);

interface ResponseInterface {
    data: string | object;
    message: string;
    status: number;
    errorData: string | object;
    error: boolean;
    original?: any;
}

interface ErrorInterface {
    response: {
        data: {
            data: object;
            error: {
                message: string;
                message_code: string;
            };
            message: string;
        };
        status: number;
    };
    message: string;
}

export function useHttp() {
    const apiVersion = "v1";

    const headers: AxiosRequestHeaders | {} = {};

   async function initAuth() {
       let token;
       try {
           token = await AsyncStorage.getItem("token");
       } catch(e) {
           // read error
       }

       console.log('DEBUG TOKEN', token);
        if (token) {
            (headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
        } else {
            console.warn("Missing token");
        }
   }

    async function fetch<DT = any, PT = any>({
                                                 method,
                                                 version = apiVersion,
                                                 url,
                                                 data,
                                                 params,
                                                 auth = true,
                                                 delay = 0,
                                             }: {
        method: Method;
        version?: string;
        url: string;
        data?: DT;
        params?: PT;
        auth?: boolean;
        delay?: number;
    }): Promise<any> {
        if (auth) {
            await initAuth();
        }

        if (delay) {
            // Fake delay
            await new Promise((resolve: any) => setTimeout(resolve, delay));
        }

        const response: ResponseInterface = {
            data: "",
            message: "",
            status: 0,
            errorData: "",
            error: false,
        };

        try {
            const res = await axios({
                method,
                url: `/${version}/${url}`,
                data,
                params,
                headers,
            });
            response.data = res.data;
            response.status = res.status;
        } catch (e: any) {
            const res = e as ErrorInterface;
            if (res?.response) {
                response.data = res.response.data?.data;
                response.message = res.message;
                response.status = res.response.status;
                response.error = true;
                response.errorData =
                    res.response.data?.error || res.response.data?.message;
                response.original = res.response.data;
            }
        }
        return response;
    }
    return { apiVersion, fetch };
}
