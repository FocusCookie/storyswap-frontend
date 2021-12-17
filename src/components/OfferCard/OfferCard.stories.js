import React from "react";
import { OfferCard } from "./OfferCard";

export default {
  title: "Components/OfferCard",
  component: OfferCard,
};

const reservedOffer = {
  _id: "61bb516aaf2dadd8d80673a6",
  provider: {
    sub: "auth0|619e62c7a3a386006ab8d2b8",
    nickname: "PROVIDER",
    picture:
      "https://s.gravatar.com/avatar/f84d37ce99493155ee296c2b746191d0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
    _id: "61bb516aaf2dadd8d80673a7",
  },
  book: {
    _id: "61b86a790daa0da5c9fe3f66",
    title: "Clean Agile: Back to Basics (Robert C. Martin Series)",
    title_long: "Clean Agile: Back to Basics (Robert C. Martin Series)",
    isbn: "0135781868",
    isbn13: "9780135781869",
    binding: "Paperback",
    publisher: "Pearson",
    language: "en_US",
    date_published: "2019-10-17T00:00:01.000Z",
    edition: "1",
    pages: 240,
    dimensions:
      "Height: 9 Inches, Length: 7 Inches, Weight: 0.8708259349 Pounds, Width: 0.7 Inches",
    image: "https://images.isbndb.com/covers/18/69/9780135781869.jpg",
    msrp: 37.99,
    authors: ["Martin, Robert", "Martin, Robert C."],
    subjects: [],
    reviews: [],
    prices: [],
    __v: 0,
  },
  coordinates: [13.436831, 52.547466],
  zip: 10409,
  city: "Berlin",
  state: "reserved",
  createdAt: "2021-12-16T14:47:06.571Z",
  __v: 0,
  reservation: {
    _id: "61bcde73d7edad8f46ebe17c",
    collector: {
      sub: "auth0|619e62c7a3a386006ab8d2b9",
      nickname: "collector",
      picture:
        "https://s.gravatar.com/avatar/f84d37ce99493155ee296c2b746191d0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
      _id: "61bcde73d7edad8f46ebe17d",
    },
    until: "2022-12-30T00:00:00.000Z",
    offer: "61bcb0f6bf084da4cc0f014e",
    state: "reserved",
    __v: 0,
  },
};
const unreservedOffer = { ...reservedOffer, state: "pending" };
delete unreservedOffer.reservation;

const Template = (args) => <OfferCard {...args} />;

export const UnreservedOffer = Template.bind({});
UnreservedOffer.args = {
  offer: unreservedOffer,
};

export const ReservedOffer = Template.bind({});
ReservedOffer.args = {
  offer: reservedOffer,
};
