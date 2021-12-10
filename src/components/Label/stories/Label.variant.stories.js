import React from "react";
import { Label } from "../Label";

export default {
  title: "Components/Label/Variant",
  component: Label,
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const Base = Template.bind({});
Base.args = { variant: "base" };

export const Highlight = Template.bind({});
Highlight.args = { variant: "highlight" };
