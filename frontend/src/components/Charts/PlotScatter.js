import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const ScatterPlotMatrix = () => {
  const chartRef = useRef();
  const store = useContext(GlobalContext)
  const { records } = store


  useEffect(() => {
    if (!records || records.length === 0) return;

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Specify dimensions and margins
    const margin = { top: 30, right: 30, bottom: 30, left: 30 };
    const width = 600 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Extract unique countries
    const countries = Array.from(new Set(records.map((d) => d.country)));

    // Create scales
    const xScale = d3.scaleLinear().range([0, width]);
    const yScale = d3.scaleLinear().range([height, 0]);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(countries);

    // Create axis generators
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    // Create scatter plots
    records.forEach((d) => {
      const intensity = +d.intensity;
      const likelihood = +d.likelihood;
      const relevance = +d.relevance;

      // Create circles for each data point
      svg
        .append('circle')
        .attr('cx', xScale(intensity))
        .attr('cy', yScale(likelihood))
        .attr('r', relevance)
        .attr('fill', colorScale(d.country))
        .attr('opacity', 0.7)
        .on('mouseover', (event, d) => {
          // Show tooltip on mouseover
          const tooltip = d3.select('#tooltip');
          tooltip.transition().duration(200).style('opacity', 0.9);
          tooltip.html(`Country: ${d.country}<br>Intensity: ${d.intensity}<br>Likelihood: ${d.likelihood}<br>Relevance: ${d.relevance}`)
            .style('left', event.pageX + 'px')
            .style('top', event.pageY - 28 + 'px');
        })
        .on('mouseout', () => {
          // Hide tooltip on mouseout
          d3.select('#tooltip').transition().duration(500).style('opacity', 0);
        });
    });

    // Add X-axis
    svg.append('g').attr('transform', `translate(0, ${height})`).call(xAxis);

    // Add Y-axis
    svg.append('g').call(yAxis);

    // Add axis labels
    svg
      .append('text')
      .text('Intensity')
      .attr('x', width / 2)
      .attr('y', height + margin.top)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', 'black');

    svg
      .append('text')
      .text('Likelihood')
      .attr('transform', 'rotate(-90)')
      .attr('x', -height / 2)
      .attr('y', -margin.left)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', 'black');

    // Add legend
    const legend = svg
      .append('g')
      .attr('transform', `translate(${width - 120}, ${margin.top})`)
      .selectAll('legend')
      .data(countries)
      .enter()
      .append('g')
      .attr('transform', (d, i) => `translate(0, ${i * 20})`);

    legend
      .append('rect')
      .attr('x', 0)
      .attr('width', 15)
      .attr('height', 15)
      .attr('fill', (d) => colorScale(d));

    legend
      .append('text')
      .text((d) => d)
      .attr('x', 20)
      .attr('y', 10)
      .attr('text-anchor', 'start')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', 'black');

    // Add tooltip container
    d3.select(chartRef.current)
      .append('div')
      .attr('id', 'tooltip')
      .style('position', 'absolute')
      .style('z-index', '10')
      .style('opacity', 0);
  }, [records]);

  return <div ref={chartRef}></div>;
};

export default ScatterPlotMatrix;
