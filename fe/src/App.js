// @ts-nocheck
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import BarChart from './components/barChart';
import CreateChart from './components/createChart';
import DataTable from './components/dataTable';
import PieChart from './components/pieChart';
import Sevice from './service';

function App() {
  const [pieData, setPieData] = useState({});
  const [barData, setBarData] = useState({});
  const [chartData, setChartData] = useState([]);

  const [chartPending, setChartPending] = React.useState(true);

  const [show, setShow] = useState(false);
  const [showPieChart, setShowPieChart] = useState(false);
  const [showBarChart, setShowBarChart] = useState(false);

  const [alert, setAlert] = useState({
    variant: '',
    text: '',
    isShow: false

  });

  const handleClose = () => setShow(false);
  const handleClosePieChart = () => setShowPieChart(false);
  const handleCloseBarChart = () => setShowBarChart(false);

  const handleShow = () => setShow(true);
  const handleShowPiChart = () => setShowPieChart(true);
  const handleShowBarChart = () => setShowBarChart(true);

  const { register, handleSubmit, formState: { errors }, control } = useForm();

  const fetchData = useCallback(
    () => {
      Sevice.fetchData().then(res => {
        setPieData(res.pieData);
        setBarData(res.barData);
        setChartData(res.chartData);
        setChartPending(false);
      });
    },
    [pieData, barData,chartData],
  );
  
  const onSubmit = data => {
    Sevice.createChart(data).then(res => {
      setShow(false);
      if (res.status === 200) {
        fetchData();
      }
      const riseAlert = res.status === 200 ? {
        variant: 'success',
        text: 'Successfully',
        isShow: true
      } : {
        variant: 'danger',
        text: 'There are unexpected error',
        isShow: true
      };
      setAlert(riseAlert);
    }).catch (() => {
     setAlert({
        variant: 'danger',
        text: 'There are unexpected error',
        isShow: true
      });
    });
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShow}>
            Add new
          </Button>{' '}
          <Button variant="primary" onClick={handleShowPiChart}>
            Open Pie Chart
          </Button>{' '}
          <Button variant="primary" onClick={handleShowBarChart}>
            Open Bar Chart
          </Button>{' '}
          {
            alert.isShow ? (
            <Alert  variant={alert.variant} onClose={() => setAlert({...alert, isShow:false })}  dismissible>
              {alert.text}
            </Alert>
            ) : null
          }
          <CreateChart
            show={show}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            errors={errors}
            register={register}
            control={control}
          />
          <PieChart
            data={pieData}
            show={showPieChart}
            handleClose={handleClosePieChart}
          />
          <BarChart
            data={barData}
            show={showBarChart}
            handleClose={handleCloseBarChart}
          />
        </Col>
      </Row>
      <DataTable data={chartData} progressPending={chartPending} />
      
    </Container>
  );
}

export default App;
