import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Filter.css";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const Filter = ({ onFilter, ...props }) => {
  const [open, setOpen] = useState(false);

  function handleOpen() {
    setOpen((open) => !open);
  }
  function handleClose() {
    setOpen((open) => !open);
  }

  return (
    <div className="filter">
      {!open && (
        <div className="filter__open__btn">
          <Button variant="secondary" onClick={handleOpen}>
            Filter
          </Button>
        </div>
      )}

      {open && (
        <Card className="filter__content">
          <Input onChange={(v) => console.log(v)} label="ISBN" />
          <Input onChange={(v) => console.log(v)} label="Author" />
          <Input onChange={(v) => console.log(v)} label="Postleitzahl" />
          <Input onChange={(v) => console.log(v)} label="Stadt" />
          <Button onClick={() => console.log("filter")}>Filtern</Button>
          <Button size="sm" variant="text" onClick={() => console.log("reset")}>
            zurücksetzen
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            schliessen
          </Button>
        </Card>
      )}
    </div>
  );
};

Filter.propTypes = {
  /**
   * executed then filter btn is clicked
   */
  onFilter: PropTypes.func,
};

Filter.defaultProps = {
  onFilter: undefined,
};
