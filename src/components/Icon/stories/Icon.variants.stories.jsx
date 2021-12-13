import React from "react";
import { Icon } from "../Icon";
import { HiBadgeCheck } from "react-icons/hi";

export default {
  title: "Components/Icon/Variants",
  component: Icon,
};

const Template = (args) => (
  <Icon {...args}>
    <HiBadgeCheck />
  </Icon>
);

export const Default = Template.bind({});
Default.args = { size: "xl" };

export const Primary = Template.bind({});
Primary.args = { size: "xl", variant: "primary" };

export const Accent = Template.bind({});
Accent.args = { size: "xl", variant: "accent" };

export const White = Template.bind({});
White.args = { size: "xl", variant: "white" };

export const Medium = Template.bind({});
Medium.args = { size: "xl", variant: "medium" };
