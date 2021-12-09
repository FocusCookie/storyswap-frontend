import React from "react";
import { Icon } from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
};

const Template = (args) => <Icon {...args}>🥳</Icon>;

export const Default = Template.bind({});

export const XSmall = Template.bind({});
XSmall.args = { size: "xs" };

export const Small = Template.bind({});
Small.args = { size: "sm" };

export const Base = Template.bind({});
Base.args = { size: "base" };

export const Large = Template.bind({});
Large.args = { size: "lg" };

export const XLarge = Template.bind({});
XLarge.args = { size: "xl" };
