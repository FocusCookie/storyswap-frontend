import React from "react";
import { Offer } from "./Offer";

export default {
  title: "Components/Offer",
  component: Offer,
};

const offer = {
  provider: {
    sub: "auth0|619e62c7a3a386006ab8d2b9",
    nickname: "Tester",
    picture:
      "https://s.gravatar.com/avatar/f84d37ce99493155ee296c2b746191d0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
  },
  zip: 10409,
  city: "test",
  state: "pending",
  _id: "61b86a950daa0da5c9fe3f69",
  createdAt: "2021-12-14T09:57:41.226Z",
  book: {
    _id: "61b86a790daa0da5c9fe3f66",
    title: "Clean Agile: Back to Basics",
    isbn: "0135781868",
    isbn13: "9780135781869",
    authors: ["Martin, Robert", "Martin, Robert C."],
    image: "https://images.isbndb.com/covers/18/69/9780135781869.jpg",
  },
};

const Template = (args) => <Offer {...args} />;

export const Default = Template.bind({});
Default.args = {
  offer: offer,
};
