import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const EnvironmentalRadarChart = () => {
  const chartRef = useRef();

   const store = useContext(GlobalContext)
  const { records } = store
 
  useEffect(() => {
    // Clear any existing chart content
    d3.select(chartRef.current).selectAll('*').remove();

    // Check if data is available
    if (records.length === 0) {
      console.error('No data available for EnvironmentalRadarChart');
      return;
    }

    // Filter data for the "Environment" sector
    const environmentalData = records.filter(item => item.sector === "Environment");

    // Check if data is available and in the expected format
    if (environmentalData.length === 0) {
      console.error('No data found for the "Environment" sector');
      return;
    }

    // Extract relevant data
    const topics = environmentalData.map(item => item.topic);
    const intensities = environmentalData.map(item => item.intensity);
    const relevances = environmentalData.map(item => item.relevance);

    // Set up dimensions
    const width = 350;
    const height = 350;
    const radius = Math.min(width, height) / 2;

    // Create SVG container
    const svg = d3
      .select(chartRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Set up scales
    const angleScale = d3.scaleBand()
      .range([0, 2 * Math.PI])
      .domain(topics);

    const radiusScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, d3.max(intensities)]);

    // Set up color scale
    const colorScale = d3.scaleOrdinal()
      .domain(topics)
      .range(d3.schemeCategory10);

    // Draw radar chart lines
    svg.selectAll('.radar-line')
      .data([{ intensities, relevances }])
      .enter().append('path')
      .attr('class', 'radar-line')
      .attr('d', d3.lineRadial()
        .angle((d, i) => angleScale(topics[i]))
        .radius((d, i) => radiusScale(d))
        .curve(d3.curveLinearClosed))
      .attr('stroke', colorScale('intensity'))
      .attr('stroke-width', 2)
      .attr('fill', colorScale('relevance'))
      .attr('fill-opacity', 0.5);

    // Draw radar chart axes
    svg.selectAll('.radar-axis')
      .data(topics)
      .enter().append('line')
      .attr('class', 'radar-axis')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => {
        const angle = angleScale(d);
        return radiusScale(d3.max(intensities)) * Math.cos(angle - Math.PI / 2);
      })
      .attr('y2', (d, i) => {
        const angle = angleScale(d);
        return radiusScale(d3.max(intensities)) * Math.sin(angle - Math.PI / 2);
      })
      .attr('stroke', 'midnightblue')
      .attr('stroke-dasharray', '5');

    // Add labels
    svg.selectAll('.radar-label')
      .data(topics)
      .enter().append('text')
      .attr('class', 'radar-label')
      .attr('x', (d, i) => {
        const angle = angleScale(d);
        return radiusScale(d3.max(intensities)) * Math.cos(angle - Math.PI / 2);
      })
      .attr('y', (d, i) => {
        const angle = angleScale(d);
        return radiusScale(d3.max(intensities)) * Math.sin(angle - Math.PI / 2);
      })
      .text(d => d)
      .attr('text-anchor', 'middle')
      .attr('dy', -5)
      .style('font-size', '12px')
      .style('fill', '#333');

    // Add explanatory notes
    svg.append('text')
      .attr('x', 0)
      .attr('y', height / 2 + 30)
      .text('Intensity')
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', colorScale('intensity'));

    svg.append('text')
      .attr('x', 0)
      .attr('y', height / 2 + 10)
      .text('Relevance')
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', colorScale('relevance'));

    // Add legend
    const legend = svg.selectAll('.legend')
      .data(topics)
      .enter().append('g')
      .attr('class', 'legend')
      .attr('transform', (d, i) => `translate(0,${i * 20 - height / 2 + 30})`);

    legend.append('rect')
      .attr('x', width / 2 - 10)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', d => colorScale(d));

    legend.append('text')
      .attr('x', width / 2 + 200)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'start')
      .text(d => d);

  }, [records]);

  return <div className="di" ref={chartRef}></div>;
};

export default EnvironmentalRadarChart;
