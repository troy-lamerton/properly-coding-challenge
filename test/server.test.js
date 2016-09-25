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
			t.is(data.length, 2);
			t.is(data[0].name, 'John');
			t.is(data[1].name, 'Mary');
	    t.true(data[0].rating > data[1].rating);
		})
		.catch( err => {
			t.fail(`The request resulted in the error: ${err}`);
		});
})