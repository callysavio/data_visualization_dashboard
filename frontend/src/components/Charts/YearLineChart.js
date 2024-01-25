// YearLineChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const YearLineChart = () => {
  const chartRef = useRef();
   const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    if (!records || records.length === 0) return;

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Set up SVG container dimensions
    const width = 750;
    const height = 600;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    // Extract unique years from the data
    const uniqueYears = [...new Set([...records.map((item) => item.start_year), ...records.map((item) => item.end_year)])];

    // Create scales
    const xScale = d3.scaleBand().domain(uniqueYears).range([50, width - 20]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(records, (d) => d.intensity)]).range([height - 50, 50]);

    // Create a linear gradient for the line
    const gradient = svg
      .append('linearGradient')
      .attr('id', 'line-gradient')
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', 0)
      .attr('y1', yScale(0))
      .attr('x2', 0)
      .attr('y2', yScale(d3.max(records, (d) => d.intensity)));

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', 'steelblue')
      .attr('stop-opacity', 1);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', 'white')
      .attr('stop-opacity', 0);

    // Create line generator
    const line = d3
      .line()
      .x((d) => xScale(d.start_year))
      .y((d) => yScale(d.intensity));

    // Draw the line
    svg
      .append('path')
      .datum(records)
      .attr('fill', 'none')
      .attr('stroke', 'url(#line-gradient)')
      .attr('stroke-width', 2)
      .attr('d', line);

    // Draw circles for start_year
    svg
      .selectAll('.start-year-circle')
      .data(records)
      .enter()
      .append('circle')
      .attr('class', 'start-year-circle')
      .attr('cx', (d) => xScale(d.start_year))
      .attr('cy', (d) => yScale(d.intensity))
      .attr('r', 5) // Radius of the circle
      .attr('fill', 'green');

    // Draw rectangles for end_year
    svg
      .selectAll('.end-year-rect')
      .data(records)
      .enter()
      .append('rect')
      .attr('class', 'end-year-rect')
      .attr('x', (d) => xScale(d.end_year) - 5) // Adjust the position for centering
      .attr('y', (d) => yScale(d.intensity) - 5) // Adjust the position for centering
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'red');

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to SVG
    svg
      .append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis)
      .append('text')
      .text('Year')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', 'black');

    svg
      .append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis)
      .append('text')
      .text('Intensity')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', 'black');

    // Add chart title
    svg
      .append('text')
      .text('Intensity Over the Years')
      .attr('x', width / 2)
      .attr('y', 25)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', 'black');

    // Add legend
    const legend = svg.append('g').attr('transform', 'translate(550, 10)');

    // Legend for start_year circle
    legend
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 10)
      .attr('r', 5)
      .attr('fill', 'green');

    legend
      .append('text')
      .text('Start Year')
      .attr('x', 15)
      .attr('y', 15)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', 'black');

    // Legend for end_year rectangle
    legend
      .append('rect')
      .attr('x', 0)
      .attr('y', 30)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', 'red');

    legend
      .append('text')
      .text('End Year')
      .attr('x', 15)
      .attr('y', 40)
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', 'black');
  }, [records]);

  return <div id="year-line-chart-container" ref={chartRef}></div>;
};

export default YearLineChart;
