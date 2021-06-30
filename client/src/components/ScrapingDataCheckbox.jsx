import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import styled from "styled-components";

const ScrapingDataCheckbox = ({
  cbIndex,
  checkState,
  setCheckState,
  platform,
}) => {
  let checkboxKey;
  let checkboxValue;

  if (Object.keys(checkState)[cbIndex]) {
    checkboxKey = Object.keys(checkState)[cbIndex];
    checkboxValue = checkState[Object.keys(checkState)[cbIndex]];
  } else {
    checkboxKey = `${platform}checkbox${cbIndex}`;
    checkboxValue = false;
  }

  const handleCheckChange = (e) => {
    const { name, checked } = e.target;

    setCheckState({ ...checkState, [name]: checked });
  };

  return (
    <StyledCheckbox>
      {checkState && (
        <Checkbox
          checked={checkboxValue}
          onChange={handleCheckChange}
          name={checkboxKey}
          size="small"
          color="primary"
        />
      )}
    </StyledCheckbox>
  );
};

export default ScrapingDataCheckbox;

const StyledCheckbox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
