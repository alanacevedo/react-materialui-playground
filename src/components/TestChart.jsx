import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '@material-ui/core/styles';

const data = [
    {name: 'A', uv: 400, pv: 2400, amt: 1000},
    {name: 'B', uv: 434, pv: 2454, amt: 1050},
    {name: 'C', uv: 400, pv: 2400, amt: 1800},
    {name: 'D', uv: 434, pv: 2454, amt: 2455},
    {name: 'E', uv: 400, pv: 2400, amt: 1900},
    {name: 'F', uv: 434, pv: 2454, amt: 2455},
    {name: 'G', uv: 400, pv: 2400, amt: 2400},
    
];

const TestChart = () => {
    const theme = useTheme()

    return(
    <>
    <ResponsiveContainer width="99%" height={225}>
        <LineChart width={400} height={400} data={data} >
            <Line type="monotone" dataKey="uv" stroke={theme.palette.primary.main} strokeWidth={2}/>
            <Line type="monotone" dataKey="pv" stroke={theme.palette.secondary.main} strokeWidth={2}/>
            <Line type="monotone" dataKey="amt" stroke={theme.palette.primary.light} strokeWidth={2}/>
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
        </LineChart>
    </ResponsiveContainer>
    </>)

    }

export default TestChart