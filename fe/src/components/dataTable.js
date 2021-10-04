import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import DataTable from 'react-data-table-component';

const columns = [
    {
      name: 'Name',
			selector: row => row.name,
			sortable: true,
    },
    {
      name: 'Age',
			selector: row => row.age,
			sortable: true,
    },
    {
      name: 'Gender',
			selector: row => row.gender,
			sortable: true,
    },
];

function Table(props) {
  return (
      <Row>
        <Col>
					<DataTable
						columns={columns}
						progressPending={props.progressPending}
						data={props.data}
				/>
        </Col>
      </Row>
  );
}

Table.propTypes = {
  data: PropTypes.array,
  progressPending: PropTypes.bool,
};

export default React.memo(Table);
