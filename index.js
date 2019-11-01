
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

function detectRequireJs() {
  if (typeof define === 'function' && define.amd) {
    return true;
  } else {
    return false;
  }
}

// to use in web without requirejs.
function loadScript(url, callback) {
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
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
  },
  _configNode: function(options) {

  },
  _configWeb: function(options) {
    if (detectRequireJs()) {
      this._configRequireJs(options);
    } else {
      for (var i = 0; i < options.modules.length; i++) {
        var current = options.modules[i];
        var mod = require(current.amd);
        this[current.prop] = mod;
      }
    }
  },
  _configRequireJs: function(options) {
    for (var i = 0; i < options.modules.length; i++) {
      var current = options.modules[i];
      var that = this;
      require([current.amd], function(module) { //jshint ignore:line
        that[current.prop] =  module;
      });
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
