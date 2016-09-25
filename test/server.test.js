import test from 'ava';
import rp from 'request-promise';

const appUrl = 'http://localhost:3000';
function getUrl (route) {
	return request(appUrl).get(route);
}

test('get best cleaners', t => {
  return rp(appUrl + '/cleaners/best')
  	.then( body => {
  		return JSON.parse(body);
  	}).then( data => {
  		t.true(data instanceof Array);
	    t.is(data.length, 3);
	    
	    t.true(data[0] instanceof Array);
	    // check that cleaners in the first array have a rating >= 4
	    t.true(data[0].every(cleaner => {
	    	return cleaner.rating >= 4;
	    }));

	    t.true(data[1] instanceof Array);
	    // check that cleaners in the second array have a rating >= 3 and < 4
	    t.true(data[1].every(cleaner => {
	    	return cleaner.rating >= 3 && cleaner.rating < 4;
	    }));

	    t.true(data[2] instanceof Array);
	    // check that cleaners in the third array have a rating >= 2 and < 3
	    t.true(data[2].every(cleaner => {
	    	return cleaner.rating >= 2 && cleaner.rating < 3;
	    }));

	    // concat the three cleaners arrays
	    const bestCleaners = [].concat.apply([], data)
	    // check that cleaners are sorted in descending order by rating
	    bestCleaners.reduce((previous, current) => {
	    	if (previous.rating < current.rating) t.fail('Cleaners are not sorted in descending order by rating');
	    });

  	})
  	.catch( err => {
  		t.fail(`The request resulted in the error: ${err}`);
  	});
});

test('get nearby cleaners', t => {
	return rp(appUrl + '/cleaners/nearby/37.79/-122.39')
		.then( body => {
  		return JSON.parse(body);
  	}).then( data => {
			t.true(data instanceof Array);
			t.true(data.length >= 2);
			const cleanerJohn = data.find(cleaner => {
				return cleaner.name === 'John';
			});
			const cleanerMary = data.find(cleaner => {
				return cleaner.name === 'Mary';
			});
			t.not(cleanerJohn, undefined);
			t.not(cleanerMary, undefined);

	    t.true(cleanerJohn.rating >= cleanerMary.rating);
		})
		.catch( err => {
			t.fail(`The request resulted in the error: ${err}`);
		});
})