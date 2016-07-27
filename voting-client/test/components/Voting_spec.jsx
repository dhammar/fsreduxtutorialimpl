import React from 'react';
import ReactDOM from 'react-dom';
import {
	renderIntoDocument,
	scryRenderedDOMComponentsWithTag,
	Simulate
} from 'react-addons-test-utils';
import Voting from '../../src/components/Voting';
import {expect} from 'chai';

describe('Voting', () => {

	it('renders a pair of buttons', () => {
		const component = renderIntoDocument(
			<Voting pair = {['A', 'B']} />
		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');

		expect(buttons.length).to.equal(2);
		expect(buttons[0].textContent).to.equal('A');
		expect(buttons[1].textContent).to.equal('B');
	});

	it('invokes a callback function on click', () => {
		let votedWith;
		const vote = (entry) => votedWith = entry;

		const component = renderIntoDocument(
			<Voting pair = {['A', 'B']}
				vote={vote}/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[1]);

		expect(votedWith).to.equal('B');
	});
});