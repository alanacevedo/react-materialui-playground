/* eslint-disable eqeqeq */
import React from 'react';
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
  const classes = useStyles()
  
  const data = props.chartTraces;

  const layout = {
  title: props.dataTag, //no ta
  xaxis: {
    autorange: true,
    //rangeslider: {},
    uirevision: 'time', // evita que se resetee el eje x en cada renderizado
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

