/* eslint-disable eqeqeq */
import React from 'react';
import  { useTheme } from '@material-ui/core/styles'
import Plot from 'react-plotly.js';
import * as localeDictionary from 'plotly.js/lib/locales/es'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  plot: {
      height: '20vh',
      width: '100%'
  },
}))


const configSettings = {
  modeBarButtonsToRemove: ['toImage', 'lasso2d', 'select2d', 'autoScale2d'],
  locales: {'es': localeDictionary},
  locale: 'es'
}

const PlotlyChart = (props) => {
  const theme = useTheme()
  const classes = useStyles()

  const trace1 = {
    x: props.chartData.dateArray,
    y: props.chartData.alertArray, 
    mode: 'markers',
    name: 'Etiquetas de alerta',
    marker: {
      color: 'rgb(219, 64, 82)',
      size: 9
    },
  };
  
  const trace2 = {
    x: props.chartData.dateArray,
    y:  props.chartData.dataArray,
    mode: 'lines',
    name: props.chartData.dataTag,
    line: {
      color: theme.palette.primary.main,
      width: 3
    }
  };
  
  const data = [trace1, trace2];

  const layout = {
  title: props.chartData.dataTag,
  xaxis: {
    autorange: true,
    //rangeslider: {},
    type: 'date',
  //  showgrid: false,
  },
  yaxis: {
  //  showgrid: false,
  //  title:"Temp"
  },
  margin: {
    t: 40,
    b: 20,
  },
  // la leyenda se ve mal cuando el dispositivo es pequeño, quizas cambiar el showlegend usando un state que dependa del tamaño?
  showlegend: false,
  legend: {
    x: 0,
    y:1,
  },

  }
  return (
      <Plot
      data={data}
      layout={layout}
      useResizeHandler={true}
      className={classes.plot}
      config={configSettings}
    />
  )
}

export { PlotlyChart }

