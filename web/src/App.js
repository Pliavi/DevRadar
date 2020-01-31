import React from "react";
import { ReactComponent as MyLocationIcon } from "./icons/MyLocation.svg";
import styled from "styled-components";

const RoundedInput = styled.input`
  display: block;
  width: 100%;
  background: #ffffff;
  color: #6d40bc;
  box-sizing: border-box;
  padding: 16px 24px;
  border: 0;
  border-radius: 25px;
  box-shadow: 2px 2px 4px #0003;
  outline: 0;

  &:focus {
    box-shadow: 2px 2px 4px #0003, 0 0 0 2px #6d40bc;
  }
`;

const FloatingActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #af82ff;
  width: 50px;
  height: 50px;
  border: 0;
  border-radius: 50%;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  outline: 0;

  &:hover {
    background: #a470ff;
  }
  &:active {
    background: #6d40bc;
  }
`;

const FormBackground = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: 1fr 50px;
  grid-template-rows: 50px;
  gap: 20px;
  padding: 20px 20px 0;
  width: 400px;
  height: 160px;
  background: #8e4dff;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 0px 0px 20px 20px;
`;

export default function App() {
  return (
    <FormBackground>
      <RoundedInput type="text" />
      <FloatingActionButton type="submit">
        <MyLocationIcon style={{ fill: "white" }} />
      </FloatingActionButton>
    </FormBackground>
  );
}
