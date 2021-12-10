import React from "react";
import { Input } from "./Input";

export default {
  title: "Components/Input",
  component: Input,
};

const Template = (args) => <Input {...args} />;

export const Default = Template.bind({});

export const MailExample = Template.bind({});
MailExample.args = {
  label: "email",
  placeholder: "enter your email",
};

export const MailErrorExample = Template.bind({});
MailErrorExample.args = {
  label: "email",
  placeholder: "enter your email",
  error: "invalid email",
};
