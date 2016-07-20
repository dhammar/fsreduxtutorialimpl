import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import INITIAL_STATE from '../src/core';
import makeStore from '../src/store';

describe('store', () => {
	it('is configured with the correct reducer', () => {
		const store = makeStore();
		expect(store.getState()).to.equal(INITIAL_STATE);

		store.dispatch({
			type : 'SET ENTRIES',
			entries : ['Resevoir Dogs', 'Hateful Eight']
		});
		expect(store.getState()).to.equal(fromJS({
			entries : ['Resevoir Dogs', 'Hateful Eight']
		}));
	});
});