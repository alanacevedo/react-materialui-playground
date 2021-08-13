import React from 'react';
import PropTypes from 'prop-types';
import { Hidden, Toolbar } from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EstacionesTab from './EstacionesTab';
import InfoTab from './InfoTab';
import DatosTab from './DatosTab';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Tabs value={value} onChange={handleChange} centered >
            <Tab label="Estaciones" {...a11yProps(0)} />
            <Tab label="Datos" {...a11yProps(1)} />
            <Tab label="Información" {...a11yProps(2)} />
          </Tabs>
          <Hidden mdUp>
              <IconButton edge="end"  color="inherit" aria-label="close" onClick={props.handleDrawerToggle}>
                  <ChevronLeftIcon />
              </IconButton>
          </Hidden>
        </Toolbar>
      </AppBar>
        <TabPanel value={value} index={0}>
          <EstacionesTab/>
          
        </TabPanel>

        <TabPanel value={value} index={1}>
          <DatosTab/>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <InfoTab/>
        </TabPanel>
    </div>
  );
}
