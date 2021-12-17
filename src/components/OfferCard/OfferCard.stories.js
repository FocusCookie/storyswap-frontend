import React from "react";
import { OfferCard } from "./OfferCard";

export default {
  title: "Components/OfferCard",
  component: OfferCard,
};

const Template = (args) => <OfferCard {...args} />;

export const Default = Template.bind({});
