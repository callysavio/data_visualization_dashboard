import React, { useEffect, useRef, useContext } from 'react';
import * as d3 from 'd3';
import { GlobalContext } from '../../context';

const BarChart = () => {
  const chartRef = useRef();

  const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    // Clear any existing chart content
    d3.select(chartRef.current).selectAll('*').remove();

    // Check if data is available
    if (records.length === 0) {
      return;
    }

    // Set up chart dimensions
    const margin = { top: 20, right: 0, bottom: 30, left: 40 };
    const width = 340 - margin.left - margin.right;
    const height = 340 - margin.top - margin.bottom;

    // Extract and format data
    const topics = records.filter(item => item.sector === 'Energy');
    const formattedData = topics
      .map(item => ({
        topic: item.topic,
        intensity: item.intensity,
      }))
      .sort((a, b) => b.intensity - a.intensity) // Sort by intensity in descending order
      .slice(3, 15); // Take only the top 10 topics

    // Set up scales
    const xScale = d3.scaleBand().domain(formattedData.map(d => d.topic)).range([0, width]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(formattedData, d => d.intensity)]).range([height, 0]);

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create bars
    svg
      .selectAll('rect')
      .data(formattedData)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.topic))
      .attr('y', d => yScale(d.intensity))
      .attr('width', xScale.bandwidth())
      .attr('height', d => height - yScale(d.intensity))
      .attr('fill', 'orangered')
      .attr('cursor', 'pointer')
      .on('mouseover', (event, d) => {
        // Show tooltip on hover
        const tooltip = svg.append('text').attr('class', 'tooltip').text(`Intensity: ${d.intensity}`);
        tooltip.attr('x', xScale(d.topic) + xScale.bandwidth() / 2).attr('y', yScale(d.intensity) - 5).attr('text-anchor', 'middle');
      })
      .on('mouseout', () => {
        // Remove tooltip on mouseout
        svg.select('.tooltip').remove();
      });

    // Add axes
    svg.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(xScale));
    svg.append('g').call(d3.axisLeft(yScale));
  }, [records]);

  return <div id="Barchart" ref={chartRef}></div>;
};

export default BarChart;
