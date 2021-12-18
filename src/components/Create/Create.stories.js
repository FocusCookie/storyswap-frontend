import React from "react";
import { Create } from "./Create";

export default {
  title: "Components/Create",
  component: Create,
};

const Template = (args) => <Create {...args} />;

export const Default = Template.bind({});

export const WithError = Template.bind({});
WithError.args = {
  error: "Buch mit ISBN konnte nicht gefunden werden.",
};
