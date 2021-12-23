import axios from "axios";

const BASE_URL = "https://127.0.0.1:3443/";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

const createAuthenticationHeader = (token) => {
  if (!token) throw new Error("Token is required.");
  if (typeof token !== "string") throw new TypeError("Invalid token");

  return { Authorization: `Bearer ${token}` };
};

const user = {
  getMetadata: async (token) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const metadata = await instance.get("user/metadata", {
        headers: authHeader,
      });

      return metadata.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { user };
