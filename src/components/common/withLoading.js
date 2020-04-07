import React from 'react';
import Spinner from './Spinner';

const withLoading = Component => {
	class withLoadindComponent extends React.PureComponent {
		render() {
			if (this.props.loading) return <Spinner />;
			return <Component {...this.props} />;
		}
	}
	return withLoadindComponent;
};

export default withLoading;
