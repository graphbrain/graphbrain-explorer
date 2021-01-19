import React from "react";
import { render, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom/extend-expect';

import Maps from "../components/map/Maps";


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
    const { container } = render(<Maps />);
    expect(container.querySelector('.loader')).toBeTruthy();
  })

  it ("gets you back to landing page when clicking back", async () => {
    setTimeout(() => {
      const { container, getByRole } = render(<Maps/>);
      const backButton  = getByRole('button', {name: "backIcon"});
      fireEvent.click(backButton);
      expect(container.querySelector('.mapsArea')).toBeNull();
    }, 500)
   
  })

  it('renders the map once data is fetched', async () => {
    const { container } = render(<Maps />);
    setTimeout(() => {
      expect(container.querySelector('.contentArea')).toBeTruthy();
    }, 500)
  })

});

