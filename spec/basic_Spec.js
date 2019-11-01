
var bang = require('../');

describe('Basic tests', function() {
  it ('Tc quick', function() {
    expect(bang.tc.is(1, bang.tc.CODES.NUMBER)).toBe(true);
  });
});
