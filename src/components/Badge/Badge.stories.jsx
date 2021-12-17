import React from "react";
import { Badge } from "./Badge";

export default {
  title: "Components/Badge",
  component: Badge,
};

const Template = (args) => <Badge {...args}>badge Text</Badge>;

export const Default = Template.bind({});

export const FullWidth = Template.bind({});
FullWidth.args = { fullwidth: true };

export const White = Template.bind({});
White.args = { variant: "medium" };

export const Primary = Template.bind({});
Primary.args = { variant: "primary" };

export const Accent = Template.bind({});
Accent.args = { variant: "accent" };
