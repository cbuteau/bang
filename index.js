
var defaultOptions = {
  settings: {
    isNodeJS: false
  },
  modules:[
    {
      amd: 'https://unpkg.com/typecodes@1.1.0/typecodes.min.js',
      prop: 'tc'
    }
  ]
};

var defaultOptionsNJS = {
  settings: {
    isNodeJS: true
  },
  modules:[
    {
      amd: 'typecodes',
      prop: 'tc'
    }
  ]
};



function detectPlatform() {
  if (typeof exports === 'object') {
    // node js
    return true;
  } else {
    // web
    return false;
  }
}

var exposed = {
  configure: function(options) {
    if (!options) {
      var isNodeJS = detectPlatform();
      var opts = defaultOptions;
      if (isNodeJS) {
        opts = defaultOptionsNJS;
      }

      this._config(opts);
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
