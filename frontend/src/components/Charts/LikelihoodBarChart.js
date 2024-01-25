// BarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const BarChart = () => {
  const chartRef = useRef();
   const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    if (!records || records.length === 0) return;

    // Select only the first 12 data points
    const truncatedData = records.slice(0, 12);

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Set up dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Set up scales
    const xScale = d3.scaleBand().domain(truncatedData.map((d) => d.title)).range([margin.left, width - margin.right]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(truncatedData, (d) => d.likelihood)]).range([height - margin.bottom, margin.top]);

    // Create SVG container
    const svg = d3.select(chartRef.current).append('svg').attr('width', width).attr('height', height);

    // Create bars
    svg
      .selectAll('rect')
      .data(truncatedData)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.title))
      .attr('y', (d) => yScale(d.likelihood))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => height - margin.bottom - yScale(d.likelihood))
      .attr('fill', 'steelblue')
      .attr('opacity', 0.7);

    // Add labels
    svg
      .selectAll('text')
      .data(truncatedData)
      .enter()
      .append('text')
      .text((d) => d.likelihood)
      .attr('x', (d) => xScale(d.title) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.likelihood) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '10px')
      .attr('fill', 'black');

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g').attr('transform', `translate(0, ${height - margin.bottom})`).call(xAxis).selectAll('text').attr('transform', 'rotate(-45)').style('text-anchor', 'end');
    svg.append('g').attr('transform', `translate(${margin.left}, 0)`).call(yAxis);

    // Add chart title
    svg
      .append('text')
      .text('Bar Chart: Likelihood (Top 12)')
      .attr('x', width / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '16px')
      .attr('font-weight', 'bold')
      .attr('fill', 'black');
  }, [records]);

  return <div ref={chartRef}></div>;
};

export default BarChart;
