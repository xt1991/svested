import PropTypes from 'prop-types';
import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Controller } from 'react-hook-form';


function CreateChart({show, handleClose, handleSubmit, onSubmit, errors, register, control }) {
  return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Member</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" {...register('name', { required: true })} />
              {errors.name && <span>This field is required</span>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAge">
              <Form.Label>Age</Form.Label>
              <Form.Control type="number" placeholder="Enter age" {...register('age', { required: true })} />
              {errors.age && <span>This field is required</span>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Controller
                name="gender"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ field }) => <>
                <Form.Check {...field}
                  inline
                  label="Male"
                  value="M"
                  type={'radio'} />
                  <Form.Check {...field}
                  inline
                  label="Female"
                  value="F"
                  type={'radio'} />
                </>}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
  );
}

CreateChart.propTypes = {
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  register: PropTypes.func,
  control: PropTypes.object,
  show: PropTypes.bool,
  errors: PropTypes.object,
};

export default React.memo(CreateChart);
