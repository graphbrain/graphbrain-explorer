import React from "react";
import { render } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';

import LandingPage from "./LandingPage";


describe("<LandingPage />", () => {
  it("renders correctly", () => {   
    const { asFragment } = render(<LandingPage/>);
    expect(asFragment()).toMatchSnapshot();   
  });

  it("renders the about area", async () => {
    const { getByTestId } = render(<LandingPage/>);
    expect(getByTestId('aboutArea')).toHaveTextContent('Artificial Intelligence');
  })
});