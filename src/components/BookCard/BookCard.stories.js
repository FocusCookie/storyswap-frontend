import React from "react";
import { BookCard } from "./BookCard";

export default {
  title: "Components/BookCard",
  component: BookCard,
};

const book = {
  title: "Clean Agile: Back to Basics (Robert C. Martin Series)",
  image: "https://images.isbndb.com/covers/18/69/9780135781869.jpg",
};

const Template = (args) => (
  <BookCard
    imageUrl={book.image}
    alt={book.title}
    label="Noch 1 Tag"
    {...args}
  />
);

export const Default = Template.bind({});

export const VariantMedium = Template.bind({});
VariantMedium.args = { variant: "medium" };

export const VariantAccent = Template.bind({});
VariantAccent.args = { variant: "accent" };

export const VariantPrimary = Template.bind({});
VariantPrimary.args = { variant: "primary" };
