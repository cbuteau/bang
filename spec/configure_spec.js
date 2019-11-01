
var bang = require('../');

describe('Testing configure method', function() {
  beforeAll(function() {
    bang.configure({
      modules: [
        {
          amd: 'underscore',
          prop: '_'
        }
      ]
    });
  });

  it ('Quick test', function() {
    expect(bang._.max([5,4,3,2,1])).toBe(5);
  });
});
