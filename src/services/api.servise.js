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
  sendPasswordChangeMail: async (token) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const changePasswordMailSent = await instance.post(
        "user/password",
        {},
        {
          headers: authHeader,
        }
      );

      return changePasswordMailSent.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteAccount: async (token) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const isDeleted = await instance.delete(
        "user",
        {},
        {
          headers: authHeader,
        }
      );

      return isDeleted.data;
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

  create: async (token, options) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (
        !options ||
        typeof options !== "object" ||
        Array.isArray(options) ||
        !options.book ||
        !options.zip ||
        !options.city
      )
        throw new TypeError("invalid options");

      const offer = await instance.post(`offers/`, options, {
        headers: authHeader,
      });

      return offer.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  delete: async (token, id) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (!id || typeof id !== "string")
        throw new TypeError("invalid offer id");

      const isDeleted = await instance.delete(`offers/${id}`, {
        headers: authHeader,
      });

      return isDeleted.data;
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

const books = {
  checkIsbn: async (token, isbn) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (
        !isbn ||
        typeof isbn !== "string" ||
        isbn.length < 9 ||
        isbn.length > 13
      )
        throw new TypeError("invalid isbn");

      const isbnFilter = { isbn: isbn, isbn13: isbn };

      if (isbn.length > 10) {
        delete isbnFilter.isbn;
      } else {
        delete isbnFilter.isbn13;
      }

      const book = await instance.post("books", isbnFilter, {
        headers: authHeader,
      });

      if (book.status === 200) return book.data;

      return false;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const chats = {
  getMyChats: async (token) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const chats = await instance.get("chats/my", {
        headers: authHeader,
      });

      return chats.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getById: async (token, chatId) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (!chatId || typeof chatId !== "string")
        throw new TypeError("invalid chatId");

      const chat = await instance.get(`chats/${chatId}`, {
        headers: authHeader,
      });

      return chat.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getByReceiverUserSub: async (token, receiverSub) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (!receiverSub || typeof receiverSub !== "string")
        throw new TypeError("invalid receiverSub");

      const chat = await instance.get(`chats/sub/${receiverSub}`, {
        headers: authHeader,
      });

      return chat.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getMessages: async (token, chatId) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const messages = await instance.get(`/chats/${chatId}/messages`, {
        headers: authHeader,
      });

      return messages.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getMessagesAfterMessageId: async (token, chatId, messageId) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const messages = await instance.get(
        `/chats/${chatId}/messages/${messageId}`,
        {
          headers: authHeader,
        }
      );

      return messages.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getLastMessage: async (token, chatId) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      const message = await instance.get(`/chats/${chatId}/last-message`, {
        headers: authHeader,
      });

      return message.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  create: async (token, receiver) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (
        !receiver ||
        typeof receiver !== "object" ||
        Array.isArray(receiver) ||
        !receiver.sub ||
        !receiver.nickname ||
        !receiver.picture
      )
        throw new TypeError("invalid receiver");

      const chat = await instance.post(
        `chats/`,
        { receiver: receiver },
        {
          headers: authHeader,
        }
      );

      return chat.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

const messages = {
  create: async (token, options) => {
    try {
      const authHeader = createAuthenticationHeader(token);

      if (
        !options ||
        typeof options !== "object" ||
        Array.isArray(options) ||
        !options.content ||
        !options.chat
      )
        throw new TypeError("invalid options");

      const createdMessage = await instance.post("messages/", options, {
        headers: authHeader,
      });

      return createdMessage.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export { user, offers, reservations, books, chats, messages };
