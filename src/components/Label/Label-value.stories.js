import React from "react";
import { Label } from "./Label";

export default {
  title: "Components/Label/Value",
  component: Label,
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const CustomValue = Template.bind({});
CustomValue.args = { value: "Hello World!" };
