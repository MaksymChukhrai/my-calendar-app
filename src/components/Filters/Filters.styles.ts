import styled from "@emotion/styled";

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: #edeff1;
`;

export const Navigation = styled.div`
  display: flex;
  gap: 8px;
`;

export const NavigationButton = styled.button`
  padding: 0px 15px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: #e3e5e6;
  color: #929496;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #c6cacd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(1px);
  }
  &:disabled {
    background: #f5f5f5;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }

  &.arrow-up > svg {
    margin-top: 12px;
    fill: #929496;
  }

  &.arrow-down > svg {
    transform: rotate(180deg);
    margin-bottom: 6px;
    fill: #929496;
  }
`;

export const Title = styled.h2`
  margin: 0 auto;
  font-family: "Roboto", sans-serif;
  font-size: 25px;
  font-weight: 900;
  line-height: 1.5;
  text-shadow: 0 0 1px currentColor;
  color: #2d3539;
`;
export const TogglePeriod = styled.div`
  display: flex;
  gap: 8px;
`;

export const ViewToggle = styled.button`
  padding: 10px 20px;
  border: 1px solid #dfe1e6;
  border-radius: 4px;
  background: #e3e5e6;

  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: "Roboto", sans-serif;
  font-size: 15px;
  font-weight: 800;
  line-height: 1.5;
  text-shadow: 0 0 1px currentColor;
  color: #2d3539;

  &:hover {
    background: #c6cacd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }
  &:active {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    transform: translateY(1px);
  }
  &:disabled {
    background: #f5f5f5;
    box-shadow: none;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  position: relative;
  margin-right: 100px;
`;
export const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;

  &:focus {
    border-color: #fc8702;
  }
`;

export const SearchIcon = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  // margin-left: 0.5rem;
  // margin-right: 0.5rem;
  position: absolute;
  right: -6px;
  top: -4px;

  svg {
    fill: #767a7b;
  }

  &:hover svg {
    fill: #fc8702;
  }
`;
