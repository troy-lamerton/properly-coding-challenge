import test from 'ava';
import rp from 'request-promise';

const appUrl = 'http://localhost:3000';
function getUrl (route) {
	return request(appUrl).get(route);
}

test('get best cleaners', t => {
  return rp(appUrl + '/cleaners/best')
  	.then( body => {
  		return JSON.parse(body)
  	}).then( data => {
  		t.true(data instanceof Array);
	    t.is(data.length, 3);
  	})
  	.catch( err => {
  		t.fail(`The request resulted in the error: ${err}`);
  	});
});