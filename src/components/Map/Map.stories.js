import React from "react";
import { Map } from "./Map";

export default {
  title: "Components/Map",
  component: Map,
};

const Template = (args) => <Map {...args} />;

export const Default = Template.bind({});

export const CenterSet = Template.bind({});
CenterSet.args = {
  center: [13.436831, 52.547466],
};

export const NoMarker = Template.bind({});
NoMarker.args = {
  marker: false,
};
