import React from "react";
import { Navigation } from "./Navigation";

export default {
  title: "Components/Navigation",
  component: Navigation,
};

const Template = (args) => <Navigation {...args} />;

export const Default = Template.bind({});

export const MessagesSelected = Template.bind({});
MessagesSelected.args = { select: "messages" };
