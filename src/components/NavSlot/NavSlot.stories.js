import React from "react";
import { NavSlot } from "./NavSlot";

export default {
  title: "Components/Navigation/NavSlot",
  component: NavSlot,
};

const Template = (args) => <NavSlot {...args} />;

export const Default = Template.bind({});

export const Selected = Template.bind({});
Selected.args = { selected: true };

export const NotSelected = Template.bind({});
NotSelected.args = { selected: false };
