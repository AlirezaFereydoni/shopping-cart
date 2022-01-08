import styled from "styled-components";
import { IconButton } from "@mui/material";

const AppWrapper = styled.main`
  margin: 40px;
`;

const StyledButton = styled(IconButton)`
  position: fixed;
  z-index: 100;
  right: 20px;
  top: 20px;
`;

export { AppWrapper, StyledButton };
