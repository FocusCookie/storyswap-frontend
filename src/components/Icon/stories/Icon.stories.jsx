import React from "react";
import { Icon } from "../Icon";
import { HiBadgeCheck } from "react-icons/hi";

export default {
  title: "Components/Icon",
  component: Icon,
};

const Template = (args) => <Icon {...args}>😀</Icon>;
const TemplateReactIcon = (args) => (
  <Icon {...args}>
    <HiBadgeCheck />
  </Icon>
);

export const WhithEmoji = Template.bind({});
export const WithReactIcon = TemplateReactIcon.bind({});
