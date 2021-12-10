import React from "react";
import { Label } from "../Label";

export default {
  title: "Components/Label",
  component: Label,
};

const Template = (args) => <Label {...args} />;
const TemplateWithChildren = (args) => <Label {...args}>Custom Label</Label>;

export const Default = Template.bind({});

export const WithChildren = TemplateWithChildren.bind({});
