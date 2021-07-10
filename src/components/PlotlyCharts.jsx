import React from 'react';
import  { useTheme } from '@material-ui/core/styles'
import Plot from 'react-plotly.js';
import { testData } from '../static/testData'
import { makeStyles } from '@material-ui/core/styles'

const dataArray = testData['data']

const dateArray = dataArray.map((a) => a[0])
const tempArray = dataArray.map((a) => a[3])
const tempAlertArray = dataArray.map((a) => a[4]==0 ? null:a[3])
const pressureArray = dataArray.map((a) => a[1])
const pressureAlertArray =  dataArray.map((a) => a[2]==0 ? null:a[1])
const ecArray = dataArray.map((a) => a[5])
const ecAlertArray =  dataArray.map((a) => a[6]==0 ? null:a[5])

const useStyles = makeStyles((theme) => ({
  plot: {
      height: '20vh',
      width: '100%'
  },
}))

const baseLayoutSettings = {

  //title: 'A Fancy Plot',
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

const PlotlyChart = (props) => {
  const theme = useTheme()
  const classes = useStyles()

  const trace1 = {
    x: dateArray,
    y: props.chartData.alertArray, 
    mode: 'markers',
    name: 'Etiquetas de alerta',
    marker: {
      color: 'rgb(219, 64, 82)',
      size: 9
    },
  };
  
  const trace2 = {
    x: dateArray,
    y:  props.chartData.dataArray,
    mode: 'lines',
    name: props.chartData.dataTag,
    line: {
      color: theme.palette.primary.main,
      width: 3
    }
  };
  
  const data = [trace1, trace2];

  const layoutSettings = {title: props.chartData.dataTag,...baseLayoutSettings} // el ... copia el objeto

  return (
      <Plot
      data={data}
      layout={layoutSettings}
      useResizeHandler={true}
      className={classes.plot}
      
    />
  )
}

const TemperatureChart = () => {
  const chartData = {
    dataArray: tempArray,
    alertArray: tempAlertArray,
    dataTag: 'Temperatura (°C)',
  }
  return (
    <>
      <PlotlyChart chartData={chartData}/>
    </>
  )
}

const PressureChart = () => {
  const chartData = {
    dataArray: pressureArray,
    alertArray: pressureAlertArray,
    dataTag: 'Presión [cm H2O]',
  }
  return (
    <>
      <PlotlyChart chartData={chartData}/>
    </>
  )
}

const EcChart = () => {
  const chartData = {
    dataArray: ecArray,
    alertArray: ecAlertArray,
    dataTag: 'EC [µs/cm]',
  }
  return (
    <>
      <PlotlyChart chartData={chartData}/>
    </>
  )
}

export { TemperatureChart, PressureChart, EcChart }

