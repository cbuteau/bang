
var defaultOptions = {
  settings: {}, //unknown
  modules:[
    {
      amd: 'https://unpkg.com/typecodes@1.1.0/typecodes.min.js',
      prop: 'tc'
    }
  ]
};

var exposed = {
  configure: function(options) {
    if (!options) {
      this._config(defaultOptions);
    } else {
      this._config(options);
    }
  },
  _config: function(options) {
    for (var i = 0; i < options.modules.length; i++) {
      var current = options.modules[i];
      var mod = require(current.amd);
      this[current.prop] = mod;
    }
  }
};


exposed.configure();



if (typeof define === 'function' && define.amd) {
  define(function() {
    return exposed;
  });
} else if (typeof exports === 'object') {
  module.exports = exposed;
} else {
  window.bang = exposed;
}
