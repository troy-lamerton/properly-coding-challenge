import test from 'tape';
import rp from 'request-promise';

const appUrl = 'http://localhost:3000';

test('get best cleaners', t => {
  return rp(appUrl + '/cleaners/best')
  	.then( body => {
  		return JSON.parse(body);
  	}).then( data => {
  		t.true(data instanceof Array);

	    let splitData = [
        [],
        [],
        []
      ];

      // split all the cleaners into three arrays of the best, good and average cleaners
      splitData[0] = data.filter(cleaner => {
        return cleaner.rating >= 4;
      });
      splitData[1] = data.filter(cleaner => {
        return cleaner.rating >= 3 && cleaner.rating < 4;
      });
      splitData[2] = data.filter(cleaner => {
        return cleaner.rating >= 2 && cleaner.rating < 3;
      });

      // order the cleaners in each array by responseRate
      splitData = splitData.forEach(cleaners => {
        return cleaners.sort((a, b) => {
          return b.responseRate - a.responseRate;
        });
      });

	    // concat the three cleaners arrays
      console.log(splitData);
	    const bestCleaners = [].concat.apply([], splitData);

	    // compare this array to the original array received, they should be equivalent 
	    t.deepEqual(data, bestCleaners);

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
			t.false(cleanerJohn);
			t.false(cleanerMary);

	    t.true(cleanerJohn.rating >= cleanerMary.rating);
		})
		.catch( err => {
			t.fail(`The request resulted in the error: ${err}`);
		});
})