import React from "react";
import { Label } from "../Label";

export default {
  title: "Components/Label/Align",
  component: Label,
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const Left = Template.bind({});
Left.args = { align: "left" };

export const Center = Template.bind({});
Center.args = { align: "center" };

export const Right = Template.bind({});
Right.args = { align: "right" };
