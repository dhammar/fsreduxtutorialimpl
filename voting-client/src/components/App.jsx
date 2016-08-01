import React from 'react';
import {List} from 'immutable';

const pair = List.of('Kill Bill Vol. 2', 'Resevoir Dogs');

export default React.createClass({
	render: function() {
		React.cloneElement(this.props.children, {pair: pair});
	}
});