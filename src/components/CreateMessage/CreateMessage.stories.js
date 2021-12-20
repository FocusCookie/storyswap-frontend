import React from "react";
import { CreateMessage } from "./CreateMessage";

export default {
  title: "Components/CreateMessage",
  component: CreateMessage,
};

const Template = (args) => <CreateMessage {...args} />;

export const Default = Template.bind({});

export const IsSending = Template.bind({});
IsSending.args = {
  sending: true,
};
