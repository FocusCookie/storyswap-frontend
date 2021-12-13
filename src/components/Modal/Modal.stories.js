import React from "react";
import { Modal } from "./Modal";

export default {
  title: "Components/Modal",
  component: Modal,
};

const unsplashUrl =
  "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1590&q=80";

const Template = (args) => (
  <div
    className="w-screen h-screen"
    style={{ backgroundImage: `url(${unsplashUrl})` }}
  >
    <Modal {...args}>content in modal</Modal>
  </div>
);

export const Default = Template.bind({});

export const NoPaddingInCard = Template.bind({});
NoPaddingInCard.args = { paddingoff: true };
