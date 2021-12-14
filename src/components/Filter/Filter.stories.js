import React from "react";
import { Filter } from "./Filter";

export default {
  title: "Components/Filter",
  component: Filter,
};

const Template = (args) => <Filter {...args} />;

export const Default = Template.bind({});

export const InitializedFilters = Template.bind({});
InitializedFilters.args = {
  initFilters: { city: "Berlin", zip: "10409" },
};
