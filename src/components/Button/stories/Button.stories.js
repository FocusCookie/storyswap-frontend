import React from "react";
import { Button } from "../Button";
import { HiCheckCircle } from "react-icons/hi";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Label Text</Button>;

export const Default = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = { disabled: true };

export const Loading = Template.bind({});
Loading.args = { loading: true };

export const EmojiAsIcon = Template.bind({});
EmojiAsIcon.args = { icon: "😀" };

export const ReactIcon = Template.bind({});
ReactIcon.args = { icon: <HiCheckCircle /> };

export const WithIconReversedOrder = Template.bind({});
WithIconReversedOrder.args = { icon: "😀", reverse: true };
