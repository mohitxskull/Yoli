import { env } from "@/config/env";
import axios from "axios";

const apiClient = axios.create({
  baseURL: env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
