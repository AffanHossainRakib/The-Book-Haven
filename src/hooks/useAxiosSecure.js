import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";
import { useEffect } from "react";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();

  useEffect(() => {
    //   Request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        const token = user?.accessToken;
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    //  Response Interceptor
    axiosInstance.interceptors.response.use((res) => {
      return res;
    });

    //   Error handling from server sent code
    (err) => {
      const status = err.status;
      if (status === 401 || status === 403) {
        console.log("Logging out user for bad request");
        signOutUser.then(() => {
          navigate("/login");
        });
      }
    };

    //   Unmounting when user being logged out
    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject();
    };
  }, [user, signOutUser, navigate]);
};

export default useAxiosSecure;
