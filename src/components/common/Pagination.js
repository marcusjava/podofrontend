import React, { Component } from 'react';
import JwPagination from 'jw-react-pagination';
import PropTypes from 'prop-types';

const customLabels = {
	first: '<<',
	last: '>>',
	previous: '<',
	next: '>',
};

class Pagination extends Component {
	render() {
		return (
			<JwPagination
				items={this.props.items}
				onChangePage={this.props.onChangePage}
				labels={customLabels}
				pageSize={this.props.pageSize}
			/>
		);
	}
}

Pagination.propTypes = {
	items: PropTypes.array.isRequired,
	onChangePage: PropTypes.func.isRequired,
	initialPage: PropTypes.number,
	pageSize: PropTypes.number,
};

Pagination.defaultProps = {
	initialPage: 1,
	pageSize: 10,
};

export default Pagination;
