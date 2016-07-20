import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		const action = {type : 'SET_ENTRIES', entries : ['Resevoir Dogs']};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries : ['Resevoir Dogs']
		}));
	});

	it('handles NEXT', () => {
		const initialState = fromJS({
			entries : ['Resevoir Dogs', 'Jackie Brown', 'Hateful Eight']
		});
		const action = {type : 'NEXT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote : {
				pair : ['Resevoir Dogs', 'Jackie Brown']
			},
			entries : ['Hateful Eight']
		}));
	});

	it('handles VOTE', () => {
		const initialState = fromJS({
                vote: {
                    pair : ['Resevoir Dogs', 'Jackie Brown']
                },
                entries : []
            });

		const action = {type : 'VOTE', entry : 'Jackie Brown'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
                vote: {
                    pair : ['Resevoir Dogs', 'Jackie Brown'],
                    tally : {'Jackie Brown' : 1}
                },
                entries : []
                
        }));
	});

	it('has an initial state', () => {
		const action = {type : 'SET_ENTRIES', entries : ['Resevoir Dogs']};
		const nextState = reducer(undefined, action);
		expect(nextState).to.equal(fromJS({
			entries : ['Resevoir Dogs']
		}));
	});

	it('can reduce a collection of actions', () => {
		const actions = [
			{type : 'SET_ENTRIES', entries : ['Resevoir Dogs', 'Hateful Eight']}, 
			{type : 'NEXT'},
			{type : 'VOTE', entry : 'Hateful Eight'},
			{type : 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());
		expect(finalState).to.equal(fromJS({
			winner : 'Hateful Eight'
		}));
	});


});