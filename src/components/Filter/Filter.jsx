import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Filter.css";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const Filter = ({ onFilter, ...props }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({});

  function handleOpen() {
    setOpen((open) => !open);
  }

  function handleClose() {
    setOpen((open) => !open);
  }

  function handleResetFilter() {
    setFilters({});
  }

  function handleNewFilter(filter) {
    const currentFilters = Object.assign({}, filters);
    const key = Object.keys(filter)[0];

    // remove filter if value is empty
    if (filter[key] === "" && currentFilters[key]) {
      delete currentFilters[key];
    }

    const newFilter =
      filter[key] === "" ? currentFilters : { ...currentFilters, ...filter };

    setFilters(newFilter);
  }

  function handleFilter() {
    onFilter(filters);
  }

  //TODO: Uncontrolled inputs gerade, values müssen gegeben werden. also doch isbn etc als eigene states und mit use effect zusammenbauen als gesamt filter

  //TODO: wenn filter active diese mittels badge icon (zahl in kreis ) im filter öffnen button einblenden

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
          <Input onChange={(v) => handleNewFilter({ isbn: v })} label="ISBN" />
          <Input
            onChange={(v) => handleNewFilter({ author: v })}
            label="Author"
          />
          <Input
            onChange={(v) => handleNewFilter({ zip: v })}
            label="Postleitzahl"
          />
          <Input onChange={(v) => handleNewFilter({ city: v })} label="Stadt" />
          <Button onClick={handleFilter}>Filtern</Button>
          <Button size="sm" variant="text" onClick={handleResetFilter}>
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
