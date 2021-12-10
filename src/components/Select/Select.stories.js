import React from "react";
import { Select } from "./Select";

export default {
  title: "Components/Select",
  component: Select,
};

const items = [
  { label: "first" },
  { label: "sec", icon: "😀" },
  { label: "third", icon: "😀", reverse: true },
];

const Template = (args) => <Select {...args} />;
const TemplateWithItems = (args) => <Select {...args} items={items} />;

export const Default = Template.bind({});

export const WithItems = TemplateWithItems.bind({});

export const PreselectedItem = TemplateWithItems.bind({});
PreselectedItem.args = { preselected: items[1].label };

export const PrimaryWithItems = TemplateWithItems.bind({});
PrimaryWithItems.args = { variant: "primary" };

export const AccentWithItems = TemplateWithItems.bind({});
AccentWithItems.args = { variant: "accent" };
