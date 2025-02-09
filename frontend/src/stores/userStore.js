import {create} from "zustand";
import axios from "../lib/axios";
import {toast} from "react-hot-toast";

export const userStore = create((set, get) => ({
    user : null,
    loading : false,
    checkingAuth : true,

    signup : async ({name, email, password, confirmPassword}) => {
        if(password !== confirmPassword){
            return toast.error("Passwords do not match");
        }
        
        try {
            const res = await axios.post("/auth/signup", {name, email, password});
            set({user : res.data});
        } catch (error) {
            toast.error(error.response.data.message || "An error occured");
        }
    },
    login : async ({email, password}) => {
        
        try {
            const res = await axios.post("/auth/login", {email, password});
            set({user : res.data});
        } catch (error) {
            toast.error(error.response.data.message || "An error occured");
        }
    },
    logout : async () => {
        try {
            await axios.post("/auth/logout");
            set({user : null});
        } catch (error) {
            toast.error(error.response?.data?.message || "an error occured during logout");
        }
    },
    checkAuth : async () => {
        set({checkingAuth : true});
        try {
            const response = await axios.get("/auth/profile");
            set({user : response.data, checkingAuth : false});
        } catch (error) {
            // console.log(error.message);
            set({checkingAuth : false, user : null});
        }
    },
    refreshToken: async () => {
		// Prevent multiple simultaneous refresh attempts
		if (get().checkingAuth) return;

		set({ checkingAuth: true });
		try {
			const response = await axios.post("/auth/refresh-token");
			set({ checkingAuth: false });
			return response.data;
		} catch (error) {
			set({ user: null, checkingAuth: false });
			throw error;
		}
	},
}))


let refreshPromise = null;

axios.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				// If a refresh is already in progress, wait for it to complete
				if (refreshPromise) {
					await refreshPromise;
					return axios(originalRequest);
				}

				// Start a new refresh process
				refreshPromise = userStore.getState().refreshToken();
				await refreshPromise;
				refreshPromise = null;

				return axios(originalRequest);
			} catch (refreshError) {
				// If refresh fails, redirect to login or handle as needed
				userStore.getState().logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);