import {dropDownMenu} from "./dropDownMenu.js";
import { scatterPlot } from './scatterPlot.js';

const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

let data;
let xColumn;
let yColumn;

const onXColumnClicked = column => {
  xColumn = column;
  render();
};

const onYColumnClicked = column => {
  yColumn = column;
  render();
};

const render = () => {
  
  d3.select('#x-menu')
    .call(dropDownMenu, {
      options: data.columns,
      onOptionClicked: onXColumnClicked,
      selectedOption: xColumn
    });
  
  d3.select('#y-menu')
    .call(dropDownMenu, {
      options: data.columns,
      onOptionClicked: onYColumnClicked,
      selectedOption: yColumn
    });
  
  svg.call(scatterPlot, {
    xValue: d => d[xColumn],
    xAxisLabel: xColumn,
    yValue: d => d[yColumn],
    circleRadius: 10,
    yAxisLabel: yColumn,
    margin: { top: 10, right: 40, bottom: 88, left: 150 },
    width,
    height,
    data
  });
};

d3.csv('auto-mpg.csv')
  .then(loadedData => {
    data = loadedData;
    data.forEach(d => {
      d.mpg = +d.mpg;
      d.cylinders = +d.cylinders;
      d.displacement = +d.displacement;
      d.horsepower = +d.horsepower;
      d.weight = +d.weight;
      d.acceleration = +d.acceleration;
      d.year = +d.year;  
    });
    xColumn = data.columns[4];
    yColumn = data.columns[0];
    render();
  });