import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const IntensityHeatmap = () => {
  const chartRef = useRef();

   const store = useContext(GlobalContext)
  const { records } = store


  useEffect(() => {
    if (!records || records.length === 0) return;

    // Extract the top 15 topics
    const topTopics = records.slice(0, 15).map((entry) => entry.topic);

    // Filter the data for the top 15 topics
    const filteredData = records.filter((entry) => topTopics.includes(entry.topic));

    // Clear previous content
    d3.select(chartRef.current).selectAll('*').remove();

    // Create SVG container
    const svg = d3.select(chartRef.current).append('svg').attr('width', 600).attr('height', 500);

    // Create scales
    const xScale = d3.scaleBand().domain(filteredData.map((d) => d.topic)).range([50, 900]).padding(0.3);
    const yScale = d3.scaleBand().domain(filteredData.map((d) => d.country)).range([50, 450]).padding(0.1);
    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([-50, d3.max(filteredData, (d) => d.intensity)]);

    // Create heatmap
    svg
      .selectAll('rect')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.topic))
      .attr('y', (d) => yScale(d.country))
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .style('fill', (d) => colorScale(d.intensity));

    // Add axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g').attr('transform', 'translate(0, 460)').call(xAxis).append('text').text('Topics').attr('x', 400).attr('y', 30).attr('text-anchor', 'middle').attr('font-family', 'sans-serif').attr('font-size', '16px').attr('fill', 'black');

    svg
      .append('g')
      .attr('transform', 'translate(100, 0)')
      .call(yAxis)
      .append('text')
      .text('Countries')
      .attr('transform', 'rotate(-90)')
      .attr('x', -200)
      .attr('y', -80)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '16px')
      .attr('fill', 'black');

    // Chart title
    svg
      .append('text')
      .text('Intensity Heatmap: Top 15 Topics and Countries')
      .attr('x', 400)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', 'black');
  }, [records]);

  return <div ref={chartRef} id="topics-chart"></div>;
};

export default IntensityHeatmap;
