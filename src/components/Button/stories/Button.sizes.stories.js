import React from "react";
import { Button } from "../Button";

export default {
  title: "Components/Button/Sizes",
  component: Button,
};

const Template = (args) => <Button {...args}>Label Text</Button>;

export const DefaultSize = Template.bind({});
DefaultSize.args = { icon: "😀" };

export const XSmall = Template.bind({});
XSmall.args = { size: "xs", icon: "😀" };

export const Small = Template.bind({});
Small.args = { size: "sm", icon: "😀" };

export const Base = Template.bind({});
Base.args = { size: "base", icon: "😀" };

export const Large = Template.bind({});
Large.args = { size: "lg", icon: "😀" };

export const XLarge = Template.bind({});
XLarge.args = { size: "xl", icon: "😀" };

export const Full = Template.bind({});
Full.args = { size: "full", icon: "😀" };
