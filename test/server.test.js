import test from 'tape';
import rp from 'request-promise';

import { averageCleanerRatings, formatOrderCleaners } from '../src/server'

const appUrl = 'http://localhost:3000';

test('get best cleaners', t => {
  // construct array of cleaners
  const cleaners = [
    {
      "name": "Harold",
      "responseRate": 0.6,
      "ratings": [5, 5],
    },
    {
      "name": "Jesse",
      "responseRate": 1.0,
      "ratings": [3, 2],
    },
    {
      "name": "Sarah",
      "responseRate": 0.8,
      "ratings": [5, 4],
    },
    {
      "name": "Trish",
      "responseRate": 0.4,
      "ratings": [3, 4],
    },
  ]

  // expected averaged ratings array of cleaners
  const expectedAverages = [
    {
      "name": "Harold",
      "responseRate": 0.6,
      "rating": 5,
      "ratings": [5, 5]
    },
    {
      "name": "Jesse",
      "responseRate": 1.0,
      "rating": 2.5,
      "ratings": [3, 2]
    },
    {
      "name": "Sarah",
      "responseRate": 0.8,
      "rating": 4.5,
      "ratings": [5, 4]
    },
    {
      "name": "Trish",
      "responseRate": 0.4,
      "rating": 3.5,
      "ratings": [3, 4]
    }
  ]
  const actualAverages = averageCleanerRatings(cleaners);

  t.equal(actualAverages.length, expectedAverages.length, 'Average arrays are same length');
  t.deepEqual(actualAverages, expectedAverages, 'The ratings of cleaners are averaged correctly');
  
  // expected ordered array
  const expectedOrder = [
    {
      "name": "Sarah",
      "responseRate": 0.8,
      "rating": 4.5,
      "ratings": [5, 4]
    },
    {
      "name": "Harold",
      "responseRate": 0.6,
      "rating": 5,
      "ratings": [5, 5]
    },
    {
      "name": "Trish",
      "responseRate": 0.4,
      "rating": 3.5,
      "ratings": [3, 4]
    },
    {
      "name": "Jesse",
      "responseRate": 1.0,
      "rating": 2.5,
      "ratings": [3, 2]
    }
  ]
  const actualResult = formatOrderCleaners(actualAverages);
  t.equal(actualResult.length, expectedOrder.length, 'Averaged array is same length as original');
  t.deepEqual(actualResult, expectedOrder, 'Best cleaners are sorted correctly');
  t.end();
});

test('get nearby cleaners', t => {
	return rp(appUrl + '/cleaners/nearby/37.79/-122.39')
		.then( body => {
  		return JSON.parse(body);
  	}).then( data => {
			t.true(data instanceof Array, '/cleaners/nearby/.../... responds with an array');
			t.true(data.length >= 2, 'Two or more cleaners are returned');
			const cleanerJohn = data.find(cleaner => {
				return cleaner.name === 'John';
			});
			const cleanerMary = data.find(cleaner => {
				return cleaner.name === 'Mary';
			});
			t.true(cleanerJohn, 'John is in the database');
			t.true(cleanerMary, 'Mary is in the database');

	    t.true(cleanerJohn.rating >= cleanerMary.rating, 'John has a higher rating than Mary');
      t.end();
    })
    .catch( err => {
      t.fail(`The request resulted in the error: ${err}`);
      t.end();
    });
})