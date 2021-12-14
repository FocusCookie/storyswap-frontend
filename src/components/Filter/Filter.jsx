import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Filter.css";
import { Card } from "../Card/Card";
import { Input } from "../Input/Input";
import { Button } from "../Button/Button";

export const Filter = ({ onFilter, initFilters, ...props }) => {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState(initFilters || {});

  function handleOpen() {
    setOpen((open) => !open);
  }

  function handleClose() {
    setOpen((open) => !open);
  }

  function handleResetFilter() {
    setFilters({});
    onFilter({});
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
    setOpen(false);
  }

  //TODO: Eigene badge componente bauen

  return (
    <div className="filter" {...props}>
      {!open && (
        <div className="filter__open__btn">
          <Button variant="secondary" onClick={handleOpen}>
            <div className="filter__open__btn__content">
              {Object.keys(filters).length > 0 && (
                <div className="filter__badge">
                  {Object.keys(filters).length}
                </div>
              )}
              Filter
            </div>
          </Button>
        </div>
      )}

      {open && (
        <Card className="filter__content">
          <Input
            onChange={(v) => handleNewFilter({ isbn: v.toLowerCase() })}
            label="ISBN"
            value={filters.isbn ? filters.isbn : ""}
          />
          <Input
            onChange={(v) => handleNewFilter({ author: v.toLowerCase() })}
            label="Author"
            value={filters.author ? filters.author : ""}
          />
          <Input
            onChange={(v) => handleNewFilter({ zip: v.toLowerCase() })}
            label="Postleitzahl"
            value={filters.zip ? filters.zip : ""}
          />
          <Input
            onChange={(v) => handleNewFilter({ city: v.toLowerCase() })}
            label="Stadt"
            value={filters.city ? filters.city : ""}
          />

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
   * executed when the filter btn is clicked
   */
  onFilter: PropTypes.func,
  /**
   * initialize the filters
   */
  initFilters: PropTypes.shape({
    isbn: PropTypes.string,
    author: PropTypes.string,
    zip: PropTypes.string,
    city: PropTypes.string,
  }),
};

Filter.defaultProps = {
  onFilter: undefined,
  initFilters: {},
};
