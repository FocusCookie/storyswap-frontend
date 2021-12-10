import React from "react";
import { Card } from "./Card";

export default {
  title: "Components/Card",
  component: Card,
};

const Template = (args) => (
  <Card {...args}>
    <h1 className="font-bold text-xl">Headline Lorem</h1>
    <p>
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo nam rerum
      quam ducimus, autem magnam placeat illo tempora enim hic harum provident
      unde aliquam praesentium, porro maxime illum nesciunt. Hic!
    </p>
  </Card>
);

export const Default = Template.bind({});

export const PaddingOff = Template.bind({});
PaddingOff.args = { paddingoff: true };
