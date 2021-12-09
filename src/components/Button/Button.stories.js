import React from "react";
import { Button } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const Template = (args) => <Button {...args}>Label Text</Button>;

export const Default = Template.bind({});

export const WithIcon = Template.bind({});
WithIcon.args = { icon: "🥳" };
