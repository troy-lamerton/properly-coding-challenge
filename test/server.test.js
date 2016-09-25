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

			const firstAverageRating = cleanerJohn.ratings.reduce((sum, number) => {
				return sum + number;
			}) / cleanerJohn.ratings.length;
			let secondAverageRating = cleanerMary.ratings.reduce((sum, number) => {
				return sum + number;
			}) / cleanerMary.ratings.length;

	    t.true(firstAverageRating >= secondAverageRating);
		})
		.catch( err => {
			t.fail(`The request resulted in the error: ${err}`);
		});
})