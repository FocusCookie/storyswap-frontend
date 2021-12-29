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

const offers = {
  getOffersWithFilter: async (token, filter) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (!filter || typeof filter !== "object" || Array.isArray(filter))
        throw new TypeError("invalid filter");

      const filteredOffers = await instance.post("offers/filter", filter, {
        headers: authHeader,
      });

      return filteredOffers.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  getMyOffers: async (token) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const myOffers = await instance.get("offers/my", {
        headers: authHeader,
      });

      return myOffers.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  reserveOffer: async (token, options) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (
        !options ||
        typeof options !== "object" ||
        Array.isArray(options) ||
        !options.id ||
        !options.until
      )
        throw new TypeError("invalid options");

      const reserved = await instance.post(
        `offers/${options.id}/reserve`,
        { until: options.until },
        {
          headers: authHeader,
        }
      );

      return reserved.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  unreserveOffer: async (token, offerId) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      console.log("offerID", offerId);

      if (!offerId || typeof offerId !== "string")
        throw new TypeError("invalid offer id");

      const unreserved = await instance.post(
        `offers/${offerId}/unreserve`,
        {},
        {
          headers: authHeader,
        }
      );

      return unreserved.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  wasPickedup: async (token, id) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const reservations = await instance.post(
        `offers/${id}/pickedup`,
        {},
        {
          headers: authHeader,
        }
      );

      return reservations.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const reservations = {
  getMyReservations: async (token) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const reservations = await instance.get("reservations", {
        headers: authHeader,
      });

      return reservations.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  wasPickedup: async (token, id) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const reservations = await instance.post(
        `reservations/${id}/pickedup`,
        {},
        {
          headers: authHeader,
        }
      );

      return reservations.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { user, offers, reservations };
