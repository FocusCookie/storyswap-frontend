import React from "react";
import { Modal } from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
};

const Template = (args) => (
  <div
    className="w-screen h-screen"
    style={{ backgroundImage: "url(https://source.unsplash.com/800x600/)" }}
  >
    <Modal {...args}>content in modal</Modal>
  </div>
);

export const Default = Template.bind({});

export const NoPaddingInCard = Template.bind({});
NoPaddingInCard.args = { paddingoff: true };
