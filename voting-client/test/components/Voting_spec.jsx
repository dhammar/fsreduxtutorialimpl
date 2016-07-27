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
			<Voting pair = {['Resevoir Dogs', 'Kill Bill Vol. 2']}
				vote={vote}/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		Simulate.click(buttons[1]);

		expect(votedWith).to.equal('Kill Bill Vol. 2');
	});

	it('disables buttons after user casts vote', () => {
		const component = renderIntoDocument(
			<Voting pair={['Resevoir Dogs', 'Kill Bill Vol. 2']}
			hasVoted='Resevoir Dogs'/>
		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(2);
		expect(buttons[0].hasAttribute('disabled')).to.equal(true);
		expect(buttons[1].hasAttribute('disabled')).to.equal(true);
	});

	it('adds label to voted upon entry', () => {
		const component = renderIntoDocument(
			<Voting pair={['Resevoir Dogs', 'Kill Bill Vol. 2']}
			hasVoted='Resevoir Dogs'/>
		);
		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons[0].textContent).to.contain('Vote Cast');
	});

	it('renders just the winner when one exists', () => {
		const component = renderIntoDocument(
			<Voting winner="Resevoir Dogs" />
		);

		const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
		expect(buttons.length).to.equal(0);

		const winner = ReactDOM.findDOMNode(component.refs.winner);
		expect(winner).to.be.ok;
		expect(winner.textContent).to.contain('Resevoir Dogs');

	});


});