import React from "react";
import {
  Accordion,
  AccordionItemHeading,
  AccordionItem,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";

import "./forecast.css";

const week = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const Forecast = ({ data }) => {
  const dayInWeek = new Date().getDay();
  const forecastDays = week
    .slice(dayInWeek, week.lenght)
    .concat(week.slice(0, dayInWeek));

  console.log(forecastDays);
  return (
    <>
      <label className="title">Daily forecast</label>
      <Accordion allowZeroExpanded>
        {data.list.splice(0, 7).map((item, id) => (
          <AccordionItem key={id}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="weather"
                    className="icon-small"
                  />
                  <label className="day">{forecastDays[id]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {(item.main.temp - 273.15).toFixed(1)} °C Average
                    temperature
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel></AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
