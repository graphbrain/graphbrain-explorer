import React from "react";
import { render, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';

import Maps from "./Maps";


describe("<Maps />", () => {

  const data = {
    links: [{id: "1"}, {id: "2"}],
    nodes:  [{id: "1", faction: 1}, {id: "2", faction: 1}],
    topic_label: "yemen"
  }

  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: data }),
      })
    );
  });

  it("renders correctly", () => {   
    const { asFragment } = render(<Maps />);
    expect(asFragment()).toMatchSnapshot();   
  });

  it('renders a loader while fetching data', () => {
    const { getByTestId } = render(<Maps />);
    expect(getByTestId('loader')).toBeTruthy();
  })

  it ("gets you back to landing page when clicking back", async () => {
    setTimeout(() => {
      const { container, getByTestId } = render(<Maps/>);
      const backButton  = getByTestId('backIcon');
      fireEvent.click(backButton);
      expect(container.querySelector('.mapsArea')).toBeNull();
    }, 500)
   
  })

  it('renders the map once data is fetched', async () => {
    const { getByTestId } = render(<Maps />);
    setTimeout(() => {
      expect(getByTestId('contentArea')).toBeTruthy();
    }, 500)
  })

});

