import React from "react";
import { Button } from "../Button";

export default {
  title: "Components/Button/Variants",
  component: Button,
};

const Template = (args) => <Button {...args}>Label Text</Button>;

export const DefaultVariant = Template.bind({});

export const Primary = Template.bind({});
Primary.args = { variant: "primary" };

export const Accent = Template.bind({});
Accent.args = { variant: "accent" };

export const Secondary = Template.bind({});
Secondary.args = { variant: "secondary" };

export const White = Template.bind({});
White.args = { variant: "white" };

export const Text = Template.bind({});
Text.args = { variant: "text" };
