import React from "react";
import "./directory.style.scss";

import { connect } from "react-redux";

import { selectDirectorySections } from "../../redux/directory/directory.selector";

import MenuItem from "../menu-item/menu-item.component";

const Directory = ({ sections }) => {
  return (
    <div className="directory-menu">
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem className="menu-item" id={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  sections: selectDirectorySections(state),
});

export default connect(mapStateToProps, null)(Directory);
