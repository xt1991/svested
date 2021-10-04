import PropTypes from 'prop-types';
import React from 'react';
import { Modal } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';


function PieChart({data, show, handleClose}) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pie Chart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Pie
            height={ 500}
            width={500}
            data={data}
          />
        </Modal.Body>
      </Modal>
  );
}

PieChart.propTypes = {
  data: PropTypes.object,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
};

export default React.memo(PieChart);
