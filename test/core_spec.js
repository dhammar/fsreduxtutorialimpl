import {List, Map} from 'immutable';
import {expect} from 'chai';

import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {
    describe('setEntries', () => {
        it('adds entries to the state', () => {
            const state = Map();
            const entries = List.of('Resevoir Dogs', 'Jackie Brown');
            const nextState = setEntries(state, entries);
            expect(nextState).to.equal(Map({
                entries : List.of('Resevoir Dogs', 'Jackie Brown')
            }));
        });

        it('converts to immutable', () => {
          const state = Map();
          const entries = ['Resevoir Dogs', 'Jackie Brown'];
          const nextState = setEntries(state, entries);
          expect(nextState).to.equal(Map({
            entries: List.of('Resevoir Dogs', 'Jackie Brown')
        }));
      });     

    });

    describe('next', () => {
        it('takes the next two entries under those being voted on', () => {
            const state = Map({
                entries : List.of('Resevoir Dogs', 'Jackie Brown', 'Hateful Eight')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown')
                }),
                entries: List.of('Hateful Eight')
            }));
        });

        it('puts winner of vote back into entries', () => {
            const state = Map({
                vote : Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown'),
                    tally : Map({
                        'Resevoir Dogs' : 2,
                        'Jackie Brown' : 1
                    })
                }),
                entries : List.of('Hateful Eight', 'Django Unchained')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of('Hateful Eight', 'Django Unchained')
                }),
                entries : List.of('Resevoir Dogs')
            }));
        });

        it('puts both from pair back on entries if a tie occurs', () => {
            const state = Map({
                vote : Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown'),
                    tally : Map({
                        'Resevoir Dogs' : 2,
                        'Jackie Brown' : 2
                    })
                }),
                entries : List.of('Hateful Eight', 'Django Unchained')
            });
            const nextState = next(state);
            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of('Hateful Eight', 'Django Unchained')
                }),
                entries : List.of('Resevoir Dogs', 'Jackie Brown')
            }));
        });
    });

    describe('vote', () => {
        it('takes a tally of votes for the entry', () => {
            const state = Map({
                vote: Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown')
                }),
                entries : List()
            });
            const nextState = vote(state, 'Jackie Brown');
            expect(nextState).to.equal(Map({
                vote : Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown'),
                    tally : Map({
                        'Jackie Brown' : 1
                    })
                }),
                entries : List()
                
            }));
        });

        it('adds to existing tally for entry', () => {
            const state = Map({
                vote : Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown'),

                    tally : Map({
                        'Resevoir Dogs' : 3,
                        'Jackie Brown' : 2
                    })
                }),
                entries : List()
            });

            const nextState = vote(state, 'Resevoir Dogs');
            expect(nextState).to.equal( Map({
                vote : Map({
                    pair : List.of('Resevoir Dogs', 'Jackie Brown'),
                    tally : Map({
                        'Resevoir Dogs' : 4,
                        'Jackie Brown' : 2
                    })
                }),
                entries : List(),
            }));
        });
    });
});