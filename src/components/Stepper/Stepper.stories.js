import React from "react";
import { Stepper } from "./Stepper";

export default {
  title: "Components/Stepper",
  component: Stepper,
};

const Template = (args) => <Stepper {...args} />;

export const Default = Template.bind({});

export const MinToMinusOne = Template.bind({});
MinToMinusOne.args = { min: -1 };

export const MaxToSix = Template.bind({});
MaxToSix.args = { max: 6 };

export const CustomUnit = Template.bind({});
CustomUnit.args = { unit: "liter" };
