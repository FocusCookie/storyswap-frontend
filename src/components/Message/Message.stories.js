import React from "react";
import { Message } from "./Message";

export default {
  title: "Components/Message",
  component: Message,
};

const message = {
  message:
    " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis expedita temporibus, a dignissimos quibusdam impedit aperiam aliquid perferendis quis ad. Dicta asperiores libero sit enim officia, in nam distinctio ratione!",
  timestamp: "17.11.2021 19:39 Uhr",
};

const Template = (args) => (
  <Message message={message.message} timestamp={message.timestamp} {...args} />
);

export const Default = Template.bind({});

export const CreatorMessage = Template.bind({});
CreatorMessage.args = {
  creator: true,
};
