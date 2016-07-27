import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Resevoir Dogs', 'Kill Bill Vol. 2'];

ReactDOM.render(
	<Voting pair={pair} />,
	document.getElementById('app')
);