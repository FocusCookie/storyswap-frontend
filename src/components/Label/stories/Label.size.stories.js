import React from "react";
import { Label } from "../Label";

export default {
  title: "Components/Label/Size",
  component: Label,
};

const Template = (args) => <Label {...args} />;

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
