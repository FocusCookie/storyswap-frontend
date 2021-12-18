import React from "react";
import { User } from "./User";

export default {
  title: "Components/User",
  component: User,
};

const user = {
  sub: "auth0|619e62c7a3a386006ab8d2b9",
  nickname: "Collector",
  picture:
    "https://s.gravatar.com/avatar/f84d37ce99493155ee296c2b746191d0?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fte.png",
  _id: "61bc75aceee5774783f09860",
};

const Template = (args) => <User user={user} {...args} />;

export const Default = Template.bind({});
