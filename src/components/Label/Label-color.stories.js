import React from "react";
import { Label } from "./Label";

export default {
  title: "Components/Label/Color",
  component: Label,
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const Primary500 = Template.bind({});
Primary500.args = { color: "primary-500" };

export const Accent500 = Template.bind({});
Accent500.args = { color: "accent-500" };

export const Neutral900 = Template.bind({});
Neutral900.args = { color: "neutral-900" };
