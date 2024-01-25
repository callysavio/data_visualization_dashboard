// CountryBarChart.js
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useContext } from 'react';
import { GlobalContext } from '../../context';

const CountryBarChart = () => {
  const chartRef = useRef();
  const hasRendered = useRef(false);

  const store = useContext(GlobalContext)
  const { records } = store

  useEffect(() => {
    if (!records || records.length === 0 || hasRendered.current) return;

    // Count the occurrences of each country
    const countryCounts = records.reduce((counts, item) => {
      counts[item.country] = (counts[item.country] || 0) + 1;
      return counts;
    }, {});

    // Convert counts object to an array of objects
    const countryData = Object.keys(countryCounts).map((country) => ({
      country,
      count: countryCounts[country],
    }));

    // Sort the data by count in descending order
    countryData.sort((a, b) => b.count - a.count);

    // Limit to the top 15 countries
    const top15Countries = countryData.slice(0, 12);

    // Create SVG container
    const svg = d3.select(chartRef.current).append('svg').attr('width', 800).attr('height', 500);

    // Create scales
    const xScale = d3.scaleBand().domain(top15Countries.map((d) => d.country)).range([50, 750]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(top15Countries, (d) => d.count)]).range([400, 50]);

    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Append axes to SVG
    svg.append('g').attr('transform', 'translate(0, 400)').call(xAxis).append('text').text('Countries').attr('x', 400).attr('y', 40).attr('text-anchor', 'middle').attr('font-family', 'sans-serif').attr('font-size', '14px').attr('fill', 'black');

    svg
      .append('g')
      .attr('transform', 'translate(50, 0)')
      .call(yAxis)
      .append('text')
      .text('Occurrences')
      .attr('transform', 'rotate(-90)')
      .attr('x', -200)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '14px')
      .attr('fill', 'black');

    // Create bars
    svg
      .selectAll('rect')
      .data(top15Countries)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(d.country))
      .attr('y', (d) => yScale(d.count))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => 400 - yScale(d.count))
      .attr('fill', 'steelblue')
      .on('mouseover', (event, d) => {
        // Show tooltip on mouseover
        const tooltip = svg.append('text').text(`${d.country}: ${d.count} occurrences`).attr('x', xScale(d.country) + xScale.bandwidth() / 2).attr('y', yScale(d.count) - 5).attr('text-anchor', 'middle').attr('font-family', 'sans-serif').attr('font-size', '12px').attr('fill', 'black');
        setTimeout(() => tooltip.remove(), 2000); // Remove tooltip after 2 seconds
      });

    // Add labels
    svg
      .selectAll('text')
      .data(top15Countries)
      .enter()
      .append('text')
      .text((d) => `${d.country}: ${d.count}`)
      .attr('x', (d) => xScale(d.country) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.count) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '12px')
      .attr('fill', 'black');

    // Add chart title
    svg
      .append('text')
      .text('Distribution of Occurrences by Country (Top 15)')
      .attr('x', 400)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('font-weight', 'bold')
      .attr('fill', 'black');

    hasRendered.current = true;
  }, [records, hasRendered]);

  return <div ref={chartRef}></div>;
};

export default CountryBarChart;
