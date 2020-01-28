import React from 'react';
import { useTranslation } from 'react-i18next';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TabPanel from './TabPanel';

export default ({ groupTabs, dataCharts = [] }) => {
  const { t } = useTranslation();

  const [currentTab, setCurrentTab] = React.useState(0);
  const handleTabChange = (event, newValue) => setCurrentTab(newValue);

  const groups = groupTabs || dataCharts.map(
    ({ dataType }) => ({ label: dataType, charts: [dataType] }),
  );

  return (
    <>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          {groups.map(({ charts, ...tabProps }, index) => (
            <Tab
              key={tabProps.label}
              id={`simple-tab-${index}`}
              aria-controls={`simple-tabpanel-${index}`}
              {...tabProps}
            />
          ))}
        </Tabs>
      </AppBar>

      {groups.map(({ label, charts }, index) => (
        <TabPanel value={currentTab} index={index} key={label}>
          {charts.map(currentDataType => {
            const { dataType, data, headers } = dataCharts
              .find(({ dataType: dt }) => dt === currentDataType);

            return (
              <div key={dataType}>
                <h3>{dataType}</h3>
                <LineChart
                  width={764}
                  height={364}
                  data={data}
                  margin={{
                    top: 16, right: 32, left: 32, bottom: 32,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  {/* i18next-extract-disable-next-line */}
                  <Tooltip formatter={(value, name) => ([value, t(name)])} />
                  {headers.map(key => (
                    <Line type="monotone" key={key} dataKey={key} stroke="#8a2542" />
                  ))}
                </LineChart>
              </div>
            );
          })}
        </TabPanel>
      ))}
    </>
  );
};
