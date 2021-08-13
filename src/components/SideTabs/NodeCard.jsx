import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
       marginBottom: 5
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

const NodeCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {props.nombreEstacion}
            </Typography>
            <Typography variant="body2" component="p">
              Latitud: {props.coords[0]}
            </Typography>
            <Typography variant="body2" component="p">
              Longitud: {props.coords[1]}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Ver más</Button>
          </CardActions>
        </Card>
      );

}

export default NodeCard