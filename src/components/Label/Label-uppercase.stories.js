import React from "react";
import { Label } from "./Label";

export default {
  title: "Components/Label/Uppercase",
  component: Label,
};

const Template = (args) => <Label {...args} />;

export const Default = Template.bind({});

export const On = Template.bind({});
On.args = { uppercase: true };

export const Off = Template.bind({});
Off.args = { uppercase: false };
