// @ts-nocheck
import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';

const barOptions = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

function BarChart({data, show, handleClose}) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pie Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Bar
            height={ 500}
            width={500}
            data={data}
            options={barOptions}
          />
        </Modal.Body>
      </Modal>
  );
}

BarChart.propTypes = {
  data: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default React.memo(BarChart);
