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
  setMetadata: async (token, metadata) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (!metadata || typeof metadata !== "object" || Array.isArray(metadata))
        throw new TypeError("invalid metadata");

      const updatedMetadata = await instance.patch("user/metadata", metadata, {
        headers: authHeader,
      });

      return updatedMetadata.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  setUser: async (token, user) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (!user || typeof user !== "object" || Array.isArray(user))
        throw new TypeError("invalid metadata");

      const updatedUser = await instance.patch("user", user, {
        headers: authHeader,
      });

      return updatedUser.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { user };
