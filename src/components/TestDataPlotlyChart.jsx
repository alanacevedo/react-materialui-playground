import React from 'react';
import Plot from 'react-plotly.js';
import { testData } from '../static/testData'

const dataArray = testData['data']

const dateArray = dataArray.map((a) => a[0])
const tempArray = dataArray.map((a) => a[3])
const tempAlertArray = dataArray.map((a) => a[4]==0 ? null:a[3])


var trace1 = {
    x: dateArray,
    y: tempAlertArray,
    mode: 'markers',
    marker: {
      color: 'rgb(219, 64, 82)',
      size: 5
    },
  };
  
  var trace2 = {
    x: dateArray,
    y:  tempArray,
    mode: 'lines',
    line: {
      color: 'rgb(55, 128, 191)',
      width: 3
    }
  };
  
  
  var data = [trace1, trace2];

const TestDataPlotlyChart = () => {
    return (
        <Plot
        data={data}
        layout=
        {{
            title: 'A Fancy Plot',
            xaxis: {
                autorange: true,
                rangeslider: {},
                type: 'date'
            }
        }}
        useResizeHandler={true}
        style={{width: '100%', height: '100%'}}
      />
    )
}

export default TestDataPlotlyChart