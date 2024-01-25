// IntensityAnalysis.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const IntensityAnalysis = () => {
  const chartRef = useRef();
  const store = useContext(GlobalContext);
  const { records } = store;

  useEffect(() => {
    if (!records || records.length === 0) return;

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Extract intensity data
    const intensityData = records.map((item) => item.intensity);

    // Calculate statistics
    const maxIntensity = d3.max(intensityData);
    const minIntensity = d3.min(intensityData);
    const averageIntensity = d3.mean(intensityData);
    const intensityPercentage = (records.filter((item) => item.intensity > 0).length / records.length) * 100;

    // Create SVG container
    const svg = d3.select(chartRef.current).append('svg').attr('width', 500).attr('height', 300);

    // Create scales for x-axis and y-axis
    const xScale = d3.scaleBand().domain(records.map((d, i) => i)).range([0, 500]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, maxIntensity]).range([250, 0]);

    // Create color scale
    const colorScale = d3.scaleLinear().domain([0, maxIntensity]).range(['#cce5ff', '#004085']);

    // Create bars with color gradients
    svg
      .selectAll('rect')
      .data(intensityData)
      .enter()
      .append('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', (d) => yScale(d))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => 250 - yScale(d))
      .attr('fill', (d) => colorScale(d));

    // Display statistics
    svg
      .append('text')
      .attr('x', 10)
      .attr('y', 20)
      .text(`Max Intensity: ${maxIntensity}`);

    svg
      .append('text')
      .attr('x', 10)
      .attr('y', 40)
      .text(`Min Intensity: ${minIntensity}`);

    svg
      .append('text')
      .attr('x', 10)
      .attr('y', 60)
      .text(`Average Intensity: ${averageIntensity.toFixed(2)}`);

    svg
      .append('text')
      .attr('x', 10)
      .attr('y', 80)
      .text(`Intensity Percentage: ${intensityPercentage.toFixed(2)}%`);

    // Add labels and title
    svg
      .append('text')
      .attr('x', 250)
      .attr('y', 280)
      .text('Intensity Analysis')
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('font-weight', 'bold');

    svg
      .append('text')
      .attr('x', 250)
      .attr('y', 290)
      .text('Distribution of Intensity Values')
      .attr('text-anchor', 'middle')
      .style('font-size', '14px');
  }, [records]);

  return <div ref={chartRef}></div>;
};

export default IntensityAnalysis;
