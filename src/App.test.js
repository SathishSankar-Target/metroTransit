import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import App from './App';
import DepatureList from './depatureList'
import fetchApi from './apiCalls'


afterEach(cleanup);

it("matches snapshot", () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});


test('render the page title', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Real-time Departures/i);
  expect(titleElement).toBeInTheDocument();
});

const departureList = {
  "Stop": {
      "StopId": 17897,
      "Latitude": 44.972836,
      "Longitude": -93.262431,
      "Description": "7th - Park Station"
  },
  "Departures": [
    {
      "Actual": true,
      "BlockNumber": 1443,
      "DepartureText": "6 Min",
      "DepartureTime": "2020-01-04T16:10:00",
      "Description": " Brklyn Ctr Tc / Rapid",
      "Gate": "",
      "RouteId": "C Line",
      "DirectionId": 4,
      "DirectionText": "NORTHBOUND",
      "Terminal": "",
      "Latitude": 44.97129,
      "Longitude": -93.26141
    },
    {
        "Actual": true,
        "BlockNumber": 1438,
        "DepartureText": "16 Min",
        "DepartureTime": "2020-01-04T16:20:00",
        "Description": " Brklyn Ctr Tc / Rapid",
        "Gate": "",
        "RouteId": "C Line",
        "DirectionId": 4,
        "DirectionText": "NORTHBOUND",
        "Terminal": "",
        "Latitude": 44.97777,
        "Longitude": -93.27639
    },
    {
        "Actual": false,
        "BlockNumber": 1441,
        "DepartureText": "4:30",
        "DepartureTime": "2020-01-04T16:30:00",
        "Description": " Brklyn Ctr Tc / Rapid",
        "Gate": "",
        "RouteId": "C Line",
        "DirectionId": 4,
        "DirectionText": "NORTHBOUND",
        "Terminal": "",
        "Latitude": 44.98426,
        "Longitude": -93.29731
    },
    {
        "Actual": false,
        "BlockNumber": 1444,
        "DepartureText": "4:40",
        "DepartureTime": "2020-01-04T16:40:00",
        "Description": " Brklyn Ctr Tc / Rapid",
        "Gate": "",
        "RouteId": "C Line",
        "DirectionId": 4,
        "DirectionText": "NORTHBOUND",
        "Terminal": "",
        "Latitude": 45.01653,
        "Longitude": -93.30832
    }
    ]
  }

  test(`has rendered a the items passed correctly`, () => {
    const { getByRole } = render(<DepatureList departureList = {departureList} />)
    let listItems = getByRole('list')
    expect(listItems.children.length).toEqual(3)
  })

  test('show more/less button when the list length is more than 3', () => {
    const { getByText } = render(<DepatureList departureList = {departureList} />);
    const showMore = getByText(/Show more depature time/i);
    expect(showMore).toBeInTheDocument();
  });

  test('Check the stop description', () => {
    const { getByText } = render(<DepatureList departureList = {departureList} />);
    const stopDescription = getByText(/7th - Park Station/i);
    expect(stopDescription).toBeInTheDocument();
  });

  test('Check the stop number', () => {
    const { getByText } = render(<DepatureList departureList = {departureList} />);
    const stopNumber = getByText(/Stop 17897/i);
    expect(stopNumber).toBeInTheDocument();
  });

  test('Check the button text change when clickeds on show more depture time', () => {
    const { getByText } = render(<DepatureList departureList = {departureList} />);
    fireEvent.click(getByText(/Show more depature time/i));
    const showLess = getByText(/Show less depature time/i);
    expect(showLess).toBeInTheDocument();
  });

  test('Check increase depature list length after clicking on show more depature time', () => {
    const { getByText, getByRole } = render(<DepatureList departureList = {departureList} />);
    fireEvent.click(getByText(/Show more depature time/i));
    let listItems = getByRole('list')
    expect(listItems.children.length).toEqual(4)
  });

  it('Check on intial load has a Select route select box rendred', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Select route/i)).toBeInTheDocument();
  });


  