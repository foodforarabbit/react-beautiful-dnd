(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-redux')) :
	typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-redux'], factory) :
	(factory((global.ReactBeautifulDnd = {}),global.React,null));
}(this, (function (exports,React,reactRedux) { 'use strict';

	var React__default = 'default' in React ? React['default'] : React;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] : (_global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && _has(exports, key)) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? _ctx(out, _global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) _hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var _library = true;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: _library ? 'pure' : 'global',
	  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var f$1 = Object.getOwnPropertySymbols;

	var _objectGops = {
		f: f$1
	};

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.1 Object.assign(target, source, ...)





	var $assign = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	var _objectAssign = !$assign || _fails(function () {
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var S = Symbol();
	  var K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function (k) { B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = _toObject(target);
	  var aLen = arguments.length;
	  var index = 1;
	  var getSymbols = _objectGops.f;
	  var isEnum = _objectPie.f;
	  while (aLen > index) {
	    var S = _iobject(arguments[index++]);
	    var keys = getSymbols ? _objectKeys(S).concat(getSymbols(S)) : _objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
	  } return T;
	} : $assign;

	// 19.1.3.1 Object.assign(target, source)


	_export(_export.S + _export.F, 'Object', { assign: _objectAssign });

	var assign = _core.Object.assign;

	var assign$1 = assign;

	function _extends() {
	  _extends = assign$1 || function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];

	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }

	    return target;
	  };

	  return _extends.apply(this, arguments);
	}

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	_export(_export.S, 'Object', { create: _objectCreate });

	var $Object = _core.Object;
	var create = function create(P, D) {
	  return $Object.create(P, D);
	};

	var create$1 = create;

	function _inheritsLoose(subClass, superClass) {
	  subClass.prototype = create$1(superClass.prototype);
	  subClass.prototype.constructor = subClass;
	  subClass.__proto__ = superClass;
	}

	function symbolObservablePonyfill(root) {
		var result;
		var Symbol = root.Symbol;

		if (typeof Symbol === 'function') {
			if (Symbol.observable) {
				result = Symbol.observable;
			} else {
				result = Symbol('observable');
				Symbol.observable = result;
			}
		} else {
			result = '@@observable';
		}

		return result;
	}

	/* global window */

	var root;

	if (typeof self !== 'undefined') {
	  root = self;
	} else if (typeof window !== 'undefined') {
	  root = window;
	} else if (typeof global !== 'undefined') {
	  root = global;
	} else if (typeof module !== 'undefined') {
	  root = module;
	} else {
	  root = Function('return this')();
	}

	var result = symbolObservablePonyfill(root);

	/**
	 * These are private action types reserved by Redux.
	 * For any unknown actions, you must return the current state.
	 * If the current state is undefined, you must return the initial state.
	 * Do not reference these action types directly in your code.
	 */
	var ActionTypes = {
	  INIT: '@@redux/INIT' + Math.random().toString(36).substring(7).split('').join('.'),
	  REPLACE: '@@redux/REPLACE' + Math.random().toString(36).substring(7).split('').join('.')
	};

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
	  return typeof obj;
	} : function (obj) {
	  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	};

	var _extends$1 = Object.assign || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

	/**
	 * @param {any} obj The object to inspect.
	 * @returns {boolean} True if the argument appears to be a plain object.
	 */
	function isPlainObject(obj) {
	  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj === null) return false;

	  var proto = obj;
	  while (Object.getPrototypeOf(proto) !== null) {
	    proto = Object.getPrototypeOf(proto);
	  }

	  return Object.getPrototypeOf(obj) === proto;
	}

	/**
	 * Creates a Redux store that holds the state tree.
	 * The only way to change the data in the store is to call `dispatch()` on it.
	 *
	 * There should only be a single store in your app. To specify how different
	 * parts of the state tree respond to actions, you may combine several reducers
	 * into a single reducer function by using `combineReducers`.
	 *
	 * @param {Function} reducer A function that returns the next state tree, given
	 * the current state tree and the action to handle.
	 *
	 * @param {any} [preloadedState] The initial state. You may optionally specify it
	 * to hydrate the state from the server in universal apps, or to restore a
	 * previously serialized user session.
	 * If you use `combineReducers` to produce the root reducer function, this must be
	 * an object with the same shape as `combineReducers` keys.
	 *
	 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
	 * to enhance the store with third-party capabilities such as middleware,
	 * time travel, persistence, etc. The only store enhancer that ships with Redux
	 * is `applyMiddleware()`.
	 *
	 * @returns {Store} A Redux store that lets you read the state, dispatch actions
	 * and subscribe to changes.
	 */
	function createStore(reducer, preloadedState, enhancer) {
	  var _ref2;

	  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
	    enhancer = preloadedState;
	    preloadedState = undefined;
	  }

	  if (typeof enhancer !== 'undefined') {
	    if (typeof enhancer !== 'function') {
	      throw new Error('Expected the enhancer to be a function.');
	    }

	    return enhancer(createStore)(reducer, preloadedState);
	  }

	  if (typeof reducer !== 'function') {
	    throw new Error('Expected the reducer to be a function.');
	  }

	  var currentReducer = reducer;
	  var currentState = preloadedState;
	  var currentListeners = [];
	  var nextListeners = currentListeners;
	  var isDispatching = false;

	  function ensureCanMutateNextListeners() {
	    if (nextListeners === currentListeners) {
	      nextListeners = currentListeners.slice();
	    }
	  }

	  /**
	   * Reads the state tree managed by the store.
	   *
	   * @returns {any} The current state tree of your application.
	   */
	  function getState() {
	    if (isDispatching) {
	      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
	    }

	    return currentState;
	  }

	  /**
	   * Adds a change listener. It will be called any time an action is dispatched,
	   * and some part of the state tree may potentially have changed. You may then
	   * call `getState()` to read the current state tree inside the callback.
	   *
	   * You may call `dispatch()` from a change listener, with the following
	   * caveats:
	   *
	   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
	   * If you subscribe or unsubscribe while the listeners are being invoked, this
	   * will not have any effect on the `dispatch()` that is currently in progress.
	   * However, the next `dispatch()` call, whether nested or not, will use a more
	   * recent snapshot of the subscription list.
	   *
	   * 2. The listener should not expect to see all state changes, as the state
	   * might have been updated multiple times during a nested `dispatch()` before
	   * the listener is called. It is, however, guaranteed that all subscribers
	   * registered before the `dispatch()` started will be called with the latest
	   * state by the time it exits.
	   *
	   * @param {Function} listener A callback to be invoked on every dispatch.
	   * @returns {Function} A function to remove this change listener.
	   */
	  function subscribe(listener) {
	    if (typeof listener !== 'function') {
	      throw new Error('Expected the listener to be a function.');
	    }

	    if (isDispatching) {
	      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	    }

	    var isSubscribed = true;

	    ensureCanMutateNextListeners();
	    nextListeners.push(listener);

	    return function unsubscribe() {
	      if (!isSubscribed) {
	        return;
	      }

	      if (isDispatching) {
	        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
	      }

	      isSubscribed = false;

	      ensureCanMutateNextListeners();
	      var index = nextListeners.indexOf(listener);
	      nextListeners.splice(index, 1);
	    };
	  }

	  /**
	   * Dispatches an action. It is the only way to trigger a state change.
	   *
	   * The `reducer` function, used to create the store, will be called with the
	   * current state tree and the given `action`. Its return value will
	   * be considered the **next** state of the tree, and the change listeners
	   * will be notified.
	   *
	   * The base implementation only supports plain object actions. If you want to
	   * dispatch a Promise, an Observable, a thunk, or something else, you need to
	   * wrap your store creating function into the corresponding middleware. For
	   * example, see the documentation for the `redux-thunk` package. Even the
	   * middleware will eventually dispatch plain object actions using this method.
	   *
	   * @param {Object} action A plain object representing “what changed”. It is
	   * a good idea to keep actions serializable so you can record and replay user
	   * sessions, or use the time travelling `redux-devtools`. An action must have
	   * a `type` property which may not be `undefined`. It is a good idea to use
	   * string constants for action types.
	   *
	   * @returns {Object} For convenience, the same action object you dispatched.
	   *
	   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
	   * return something else (for example, a Promise you can await).
	   */
	  function dispatch(action) {
	    if (!isPlainObject(action)) {
	      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
	    }

	    if (typeof action.type === 'undefined') {
	      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
	    }

	    if (isDispatching) {
	      throw new Error('Reducers may not dispatch actions.');
	    }

	    try {
	      isDispatching = true;
	      currentState = currentReducer(currentState, action);
	    } finally {
	      isDispatching = false;
	    }

	    var listeners = currentListeners = nextListeners;
	    for (var i = 0; i < listeners.length; i++) {
	      var listener = listeners[i];
	      listener();
	    }

	    return action;
	  }

	  /**
	   * Replaces the reducer currently used by the store to calculate the state.
	   *
	   * You might need this if your app implements code splitting and you want to
	   * load some of the reducers dynamically. You might also need this if you
	   * implement a hot reloading mechanism for Redux.
	   *
	   * @param {Function} nextReducer The reducer for the store to use instead.
	   * @returns {void}
	   */
	  function replaceReducer(nextReducer) {
	    if (typeof nextReducer !== 'function') {
	      throw new Error('Expected the nextReducer to be a function.');
	    }

	    currentReducer = nextReducer;
	    dispatch({ type: ActionTypes.REPLACE });
	  }

	  /**
	   * Interoperability point for observable/reactive libraries.
	   * @returns {observable} A minimal observable of state changes.
	   * For more information, see the observable proposal:
	   * https://github.com/tc39/proposal-observable
	   */
	  function observable() {
	    var _ref;

	    var outerSubscribe = subscribe;
	    return _ref = {
	      /**
	       * The minimal observable subscription method.
	       * @param {Object} observer Any object that can be used as an observer.
	       * The observer object should have a `next` method.
	       * @returns {subscription} An object with an `unsubscribe` method that can
	       * be used to unsubscribe the observable from the store, and prevent further
	       * emission of values from the observable.
	       */
	      subscribe: function subscribe(observer) {
	        if ((typeof observer === 'undefined' ? 'undefined' : _typeof(observer)) !== 'object' || observer === null) {
	          throw new TypeError('Expected the observer to be an object.');
	        }

	        function observeState() {
	          if (observer.next) {
	            observer.next(getState());
	          }
	        }

	        observeState();
	        var unsubscribe = outerSubscribe(observeState);
	        return { unsubscribe: unsubscribe };
	      }
	    }, _ref[result] = function () {
	      return this;
	    }, _ref;
	  }

	  // When a store is created, an "INIT" action is dispatched so that every
	  // reducer returns their initial state. This effectively populates
	  // the initial state tree.
	  dispatch({ type: ActionTypes.INIT });

	  return _ref2 = {
	    dispatch: dispatch,
	    subscribe: subscribe,
	    getState: getState,
	    replaceReducer: replaceReducer
	  }, _ref2[result] = observable, _ref2;
	}

	/**
	 * Prints a warning in the console if it exists.
	 *
	 * @param {String} message The warning message.
	 * @returns {void}
	 */
	function warning(message) {
	  /* eslint-disable no-console */
	  if (typeof console !== 'undefined' && typeof console.error === 'function') {
	    console.error(message);
	  }
	  /* eslint-enable no-console */
	  try {
	    // This error was thrown as a convenience so that if you enable
	    // "break on all exceptions" in your console,
	    // it would pause the execution at this line.
	    throw new Error(message);
	  } catch (e) {} // eslint-disable-line no-empty
	}

	function bindActionCreator(actionCreator, dispatch) {
	  return function () {
	    return dispatch(actionCreator.apply(this, arguments));
	  };
	}

	/**
	 * Turns an object whose values are action creators, into an object with the
	 * same keys, but with every function wrapped into a `dispatch` call so they
	 * may be invoked directly. This is just a convenience method, as you can call
	 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
	 *
	 * For convenience, you can also pass a single function as the first argument,
	 * and get a function in return.
	 *
	 * @param {Function|Object} actionCreators An object whose values are action
	 * creator functions. One handy way to obtain it is to use ES6 `import * as`
	 * syntax. You may also pass a single function.
	 *
	 * @param {Function} dispatch The `dispatch` function available on your Redux
	 * store.
	 *
	 * @returns {Function|Object} The object mimicking the original object, but with
	 * every action creator wrapped into the `dispatch` call. If you passed a
	 * function as `actionCreators`, the return value will also be a single
	 * function.
	 */
	function bindActionCreators(actionCreators, dispatch) {
	  if (typeof actionCreators === 'function') {
	    return bindActionCreator(actionCreators, dispatch);
	  }

	  if ((typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) !== 'object' || actionCreators === null) {
	    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators === 'undefined' ? 'undefined' : _typeof(actionCreators)) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
	  }

	  var keys = Object.keys(actionCreators);
	  var boundActionCreators = {};
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    var actionCreator = actionCreators[key];
	    if (typeof actionCreator === 'function') {
	      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
	    }
	  }
	  return boundActionCreators;
	}

	/**
	 * Composes single-argument functions from right to left. The rightmost
	 * function can take multiple arguments as it provides the signature for
	 * the resulting composite function.
	 *
	 * @param {...Function} funcs The functions to compose.
	 * @returns {Function} A function obtained by composing the argument functions
	 * from right to left. For example, compose(f, g, h) is identical to doing
	 * (...args) => f(g(h(...args))).
	 */

	function compose() {
	  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
	    funcs[_key] = arguments[_key];
	  }

	  if (funcs.length === 0) {
	    return function (arg) {
	      return arg;
	    };
	  }

	  if (funcs.length === 1) {
	    return funcs[0];
	  }

	  return funcs.reduce(function (a, b) {
	    return function () {
	      return a(b.apply(undefined, arguments));
	    };
	  });
	}

	/**
	 * Creates a store enhancer that applies middleware to the dispatch method
	 * of the Redux store. This is handy for a variety of tasks, such as expressing
	 * asynchronous actions in a concise manner, or logging every action payload.
	 *
	 * See `redux-thunk` package as an example of the Redux middleware.
	 *
	 * Because middleware is potentially asynchronous, this should be the first
	 * store enhancer in the composition chain.
	 *
	 * Note that each middleware will be given the `dispatch` and `getState` functions
	 * as named arguments.
	 *
	 * @param {...Function} middlewares The middleware chain to be applied.
	 * @returns {Function} A store enhancer applying the middleware.
	 */
	function applyMiddleware() {
	  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
	    middlewares[_key] = arguments[_key];
	  }

	  return function (createStore) {
	    return function () {
	      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      var store = createStore.apply(undefined, args);
	      var _dispatch = function dispatch() {
	        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
	      };

	      var middlewareAPI = {
	        getState: store.getState,
	        dispatch: function dispatch() {
	          return _dispatch.apply(undefined, arguments);
	        }
	      };
	      var chain = middlewares.map(function (middleware) {
	        return middleware(middlewareAPI);
	      });
	      _dispatch = compose.apply(undefined, chain)(store.dispatch);

	      return _extends$1({}, store, {
	        dispatch: _dispatch
	      });
	    };
	  };
	}

	/*
	 * This is a dummy function to check if the function name has been altered by minification.
	 * If the function has been minified and NODE_ENV !== 'production', warn the user.
	 */
	function isCrushed() {}

	if (typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
	  warning("You are currently using minified code outside of NODE_ENV === 'production'. " + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
	}

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 * 
	 */

	function makeEmptyFunction(arg) {
	  return function () {
	    return arg;
	  };
	}

	/**
	 * This function accepts and discards inputs; it has no side effects. This is
	 * primarily useful idiomatically for overridable function endpoints which
	 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
	 */
	var emptyFunction = function emptyFunction() {};

	emptyFunction.thatReturns = makeEmptyFunction;
	emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
	emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
	emptyFunction.thatReturnsNull = makeEmptyFunction(null);
	emptyFunction.thatReturnsThis = function () {
	  return this;
	};
	emptyFunction.thatReturnsArgument = function (arg) {
	  return arg;
	};

	var emptyFunction_1 = emptyFunction;

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 *
	 */

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var validateFormat = function validateFormat(format) {};

	{
	  validateFormat = function validateFormat(format) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  };
	}

	function invariant(condition, format, a, b, c, d, e, f) {
	  validateFormat(format);

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	}

	var invariant_1 = invariant;

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning$1 = emptyFunction_1;

	{
	  var printWarning = function printWarning(format) {
	    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	      args[_key - 1] = arguments[_key];
	    }

	    var argIndex = 0;
	    var message = 'Warning: ' + format.replace(/%s/g, function () {
	      return args[argIndex++];
	    });
	    if (typeof console !== 'undefined') {
	      console.error(message);
	    }
	    try {
	      // --- Welcome to debugging React ---
	      // This error was thrown as a convenience so that you can use this stack
	      // to find the callsite that caused this warning to fire.
	      throw new Error(message);
	    } catch (x) {}
	  };

	  warning$1 = function warning(condition, format) {
	    if (format === undefined) {
	      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
	    }

	    if (format.indexOf('Failed Composite propType: ') === 0) {
	      return; // Ignore CompositeComponent proptype check.
	    }

	    if (!condition) {
	      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
	        args[_key2 - 2] = arguments[_key2];
	      }

	      printWarning.apply(undefined, [format].concat(args));
	    }
	  };
	}

	var warning_1 = warning$1;

	/*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty$1.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	var ReactPropTypesSecret_1 = ReactPropTypesSecret;

	{
	  var invariant$1 = invariant_1;
	  var warning$2 = warning_1;
	  var ReactPropTypesSecret$1 = ReactPropTypesSecret_1;
	  var loggedTypeFailures = {};
	}

	/**
	 * Assert that the values match with the type specs.
	 * Error messages are memorized and will only be shown once.
	 *
	 * @param {object} typeSpecs Map of name to a ReactPropType
	 * @param {object} values Runtime values that need to be type-checked
	 * @param {string} location e.g. "prop", "context", "child context"
	 * @param {string} componentName Name of the component for error messages.
	 * @param {?Function} getStack Returns the component stack.
	 * @private
	 */
	function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
	  {
	    for (var typeSpecName in typeSpecs) {
	      if (typeSpecs.hasOwnProperty(typeSpecName)) {
	        var error;
	        // Prop type validation may throw. In case they do, we don't want to
	        // fail the render phase where it didn't fail before. So we log it.
	        // After these have been cleaned up, we'll let them throw.
	        try {
	          // This is intentionally an invariant that gets caught. It's the same
	          // behavior as without this statement except with a better message.
	          invariant$1(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
	          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret$1);
	        } catch (ex) {
	          error = ex;
	        }
	        warning$2(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
	        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
	          // Only monitor this failure once because there tends to be a lot of the
	          // same error.
	          loggedTypeFailures[error.message] = true;

	          var stack = getStack ? getStack() : '';

	          warning$2(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
	        }
	      }
	    }
	  }
	}

	var checkPropTypes_1 = checkPropTypes;

	var factoryWithTypeCheckers = function(isValidElement, throwOnDirectAccess) {
	  /* global Symbol */
	  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
	  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

	  /**
	   * Returns the iterator method function contained on the iterable object.
	   *
	   * Be sure to invoke the function with the iterable as context:
	   *
	   *     var iteratorFn = getIteratorFn(myIterable);
	   *     if (iteratorFn) {
	   *       var iterator = iteratorFn.call(myIterable);
	   *       ...
	   *     }
	   *
	   * @param {?object} maybeIterable
	   * @return {?function}
	   */
	  function getIteratorFn(maybeIterable) {
	    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
	    if (typeof iteratorFn === 'function') {
	      return iteratorFn;
	    }
	  }

	  /**
	   * Collection of methods that allow declaration and validation of props that are
	   * supplied to React components. Example usage:
	   *
	   *   var Props = require('ReactPropTypes');
	   *   var MyArticle = React.createClass({
	   *     propTypes: {
	   *       // An optional string prop named "description".
	   *       description: Props.string,
	   *
	   *       // A required enum prop named "category".
	   *       category: Props.oneOf(['News','Photos']).isRequired,
	   *
	   *       // A prop named "dialog" that requires an instance of Dialog.
	   *       dialog: Props.instanceOf(Dialog).isRequired
	   *     },
	   *     render: function() { ... }
	   *   });
	   *
	   * A more formal specification of how these methods are used:
	   *
	   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
	   *   decl := ReactPropTypes.{type}(.isRequired)?
	   *
	   * Each and every declaration produces a function with the same signature. This
	   * allows the creation of custom validation functions. For example:
	   *
	   *  var MyLink = React.createClass({
	   *    propTypes: {
	   *      // An optional string or URI prop named "href".
	   *      href: function(props, propName, componentName) {
	   *        var propValue = props[propName];
	   *        if (propValue != null && typeof propValue !== 'string' &&
	   *            !(propValue instanceof URI)) {
	   *          return new Error(
	   *            'Expected a string or an URI for ' + propName + ' in ' +
	   *            componentName
	   *          );
	   *        }
	   *      }
	   *    },
	   *    render: function() {...}
	   *  });
	   *
	   * @internal
	   */

	  var ANONYMOUS = '<<anonymous>>';

	  // Important!
	  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
	  var ReactPropTypes = {
	    array: createPrimitiveTypeChecker('array'),
	    bool: createPrimitiveTypeChecker('boolean'),
	    func: createPrimitiveTypeChecker('function'),
	    number: createPrimitiveTypeChecker('number'),
	    object: createPrimitiveTypeChecker('object'),
	    string: createPrimitiveTypeChecker('string'),
	    symbol: createPrimitiveTypeChecker('symbol'),

	    any: createAnyTypeChecker(),
	    arrayOf: createArrayOfTypeChecker,
	    element: createElementTypeChecker(),
	    instanceOf: createInstanceTypeChecker,
	    node: createNodeChecker(),
	    objectOf: createObjectOfTypeChecker,
	    oneOf: createEnumTypeChecker,
	    oneOfType: createUnionTypeChecker,
	    shape: createShapeTypeChecker,
	    exact: createStrictShapeTypeChecker,
	  };

	  /**
	   * inlined Object.is polyfill to avoid requiring consumers ship their own
	   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
	   */
	  /*eslint-disable no-self-compare*/
	  function is(x, y) {
	    // SameValue algorithm
	    if (x === y) {
	      // Steps 1-5, 7-10
	      // Steps 6.b-6.e: +0 != -0
	      return x !== 0 || 1 / x === 1 / y;
	    } else {
	      // Step 6.a: NaN == NaN
	      return x !== x && y !== y;
	    }
	  }
	  /*eslint-enable no-self-compare*/

	  /**
	   * We use an Error-like object for backward compatibility as people may call
	   * PropTypes directly and inspect their output. However, we don't use real
	   * Errors anymore. We don't inspect their stack anyway, and creating them
	   * is prohibitively expensive if they are created too often, such as what
	   * happens in oneOfType() for any type before the one that matched.
	   */
	  function PropTypeError(message) {
	    this.message = message;
	    this.stack = '';
	  }
	  // Make `instanceof Error` still work for returned errors.
	  PropTypeError.prototype = Error.prototype;

	  function createChainableTypeChecker(validate) {
	    {
	      var manualPropTypeCallCache = {};
	      var manualPropTypeWarningCount = 0;
	    }
	    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
	      componentName = componentName || ANONYMOUS;
	      propFullName = propFullName || propName;

	      if (secret !== ReactPropTypesSecret_1) {
	        if (throwOnDirectAccess) {
	          // New behavior only for users of `prop-types` package
	          invariant_1(
	            false,
	            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	            'Use `PropTypes.checkPropTypes()` to call them. ' +
	            'Read more at http://fb.me/use-check-prop-types'
	          );
	        } else if (typeof console !== 'undefined') {
	          // Old behavior for people using React.PropTypes
	          var cacheKey = componentName + ':' + propName;
	          if (
	            !manualPropTypeCallCache[cacheKey] &&
	            // Avoid spamming the console because they are often not actionable except for lib authors
	            manualPropTypeWarningCount < 3
	          ) {
	            warning_1(
	              false,
	              'You are manually calling a React.PropTypes validation ' +
	              'function for the `%s` prop on `%s`. This is deprecated ' +
	              'and will throw in the standalone `prop-types` package. ' +
	              'You may be seeing this warning due to a third-party PropTypes ' +
	              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
	              propFullName,
	              componentName
	            );
	            manualPropTypeCallCache[cacheKey] = true;
	            manualPropTypeWarningCount++;
	          }
	        }
	      }
	      if (props[propName] == null) {
	        if (isRequired) {
	          if (props[propName] === null) {
	            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
	          }
	          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
	        }
	        return null;
	      } else {
	        return validate(props, propName, componentName, location, propFullName);
	      }
	    }

	    var chainedCheckType = checkType.bind(null, false);
	    chainedCheckType.isRequired = checkType.bind(null, true);

	    return chainedCheckType;
	  }

	  function createPrimitiveTypeChecker(expectedType) {
	    function validate(props, propName, componentName, location, propFullName, secret) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== expectedType) {
	        // `propValue` being instance of, say, date/regexp, pass the 'object'
	        // check, but we can offer a more precise error message here rather than
	        // 'of type `object`'.
	        var preciseType = getPreciseType(propValue);

	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createAnyTypeChecker() {
	    return createChainableTypeChecker(emptyFunction_1.thatReturnsNull);
	  }

	  function createArrayOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
	      }
	      var propValue = props[propName];
	      if (!Array.isArray(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
	      }
	      for (var i = 0; i < propValue.length; i++) {
	        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret_1);
	        if (error instanceof Error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createElementTypeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      if (!isValidElement(propValue)) {
	        var propType = getPropType(propValue);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createInstanceTypeChecker(expectedClass) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!(props[propName] instanceof expectedClass)) {
	        var expectedClassName = expectedClass.name || ANONYMOUS;
	        var actualClassName = getClassName(props[propName]);
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createEnumTypeChecker(expectedValues) {
	    if (!Array.isArray(expectedValues)) {
	      warning_1(false, 'Invalid argument supplied to oneOf, expected an instance of array.');
	      return emptyFunction_1.thatReturnsNull;
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      for (var i = 0; i < expectedValues.length; i++) {
	        if (is(propValue, expectedValues[i])) {
	          return null;
	        }
	      }

	      var valuesString = JSON.stringify(expectedValues);
	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createObjectOfTypeChecker(typeChecker) {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (typeof typeChecker !== 'function') {
	        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
	      }
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
	      }
	      for (var key in propValue) {
	        if (propValue.hasOwnProperty(key)) {
	          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	          if (error instanceof Error) {
	            return error;
	          }
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createUnionTypeChecker(arrayOfTypeCheckers) {
	    if (!Array.isArray(arrayOfTypeCheckers)) {
	      warning_1(false, 'Invalid argument supplied to oneOfType, expected an instance of array.');
	      return emptyFunction_1.thatReturnsNull;
	    }

	    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	      var checker = arrayOfTypeCheckers[i];
	      if (typeof checker !== 'function') {
	        warning_1(
	          false,
	          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
	          'received %s at index %s.',
	          getPostfixForTypeWarning(checker),
	          i
	        );
	        return emptyFunction_1.thatReturnsNull;
	      }
	    }

	    function validate(props, propName, componentName, location, propFullName) {
	      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
	        var checker = arrayOfTypeCheckers[i];
	        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret_1) == null) {
	          return null;
	        }
	      }

	      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createNodeChecker() {
	    function validate(props, propName, componentName, location, propFullName) {
	      if (!isNode(props[propName])) {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      for (var key in shapeTypes) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          continue;
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }
	    return createChainableTypeChecker(validate);
	  }

	  function createStrictShapeTypeChecker(shapeTypes) {
	    function validate(props, propName, componentName, location, propFullName) {
	      var propValue = props[propName];
	      var propType = getPropType(propValue);
	      if (propType !== 'object') {
	        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
	      }
	      // We need to check all keys in case some are required but missing from
	      // props.
	      var allKeys = objectAssign({}, props[propName], shapeTypes);
	      for (var key in allKeys) {
	        var checker = shapeTypes[key];
	        if (!checker) {
	          return new PropTypeError(
	            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
	            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
	            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
	          );
	        }
	        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret_1);
	        if (error) {
	          return error;
	        }
	      }
	      return null;
	    }

	    return createChainableTypeChecker(validate);
	  }

	  function isNode(propValue) {
	    switch (typeof propValue) {
	      case 'number':
	      case 'string':
	      case 'undefined':
	        return true;
	      case 'boolean':
	        return !propValue;
	      case 'object':
	        if (Array.isArray(propValue)) {
	          return propValue.every(isNode);
	        }
	        if (propValue === null || isValidElement(propValue)) {
	          return true;
	        }

	        var iteratorFn = getIteratorFn(propValue);
	        if (iteratorFn) {
	          var iterator = iteratorFn.call(propValue);
	          var step;
	          if (iteratorFn !== propValue.entries) {
	            while (!(step = iterator.next()).done) {
	              if (!isNode(step.value)) {
	                return false;
	              }
	            }
	          } else {
	            // Iterator will provide entry [k,v] tuples rather than values.
	            while (!(step = iterator.next()).done) {
	              var entry = step.value;
	              if (entry) {
	                if (!isNode(entry[1])) {
	                  return false;
	                }
	              }
	            }
	          }
	        } else {
	          return false;
	        }

	        return true;
	      default:
	        return false;
	    }
	  }

	  function isSymbol(propType, propValue) {
	    // Native Symbol.
	    if (propType === 'symbol') {
	      return true;
	    }

	    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
	    if (propValue['@@toStringTag'] === 'Symbol') {
	      return true;
	    }

	    // Fallback for non-spec compliant Symbols which are polyfilled.
	    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
	      return true;
	    }

	    return false;
	  }

	  // Equivalent of `typeof` but with special handling for array and regexp.
	  function getPropType(propValue) {
	    var propType = typeof propValue;
	    if (Array.isArray(propValue)) {
	      return 'array';
	    }
	    if (propValue instanceof RegExp) {
	      // Old webkits (at least until Android 4.0) return 'function' rather than
	      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
	      // passes PropTypes.object.
	      return 'object';
	    }
	    if (isSymbol(propType, propValue)) {
	      return 'symbol';
	    }
	    return propType;
	  }

	  // This handles more types than `getPropType`. Only used for error messages.
	  // See `createPrimitiveTypeChecker`.
	  function getPreciseType(propValue) {
	    if (typeof propValue === 'undefined' || propValue === null) {
	      return '' + propValue;
	    }
	    var propType = getPropType(propValue);
	    if (propType === 'object') {
	      if (propValue instanceof Date) {
	        return 'date';
	      } else if (propValue instanceof RegExp) {
	        return 'regexp';
	      }
	    }
	    return propType;
	  }

	  // Returns a string that is postfixed to a warning about an invalid type.
	  // For example, "undefined" or "of type array"
	  function getPostfixForTypeWarning(value) {
	    var type = getPreciseType(value);
	    switch (type) {
	      case 'array':
	      case 'object':
	        return 'an ' + type;
	      case 'boolean':
	      case 'date':
	      case 'regexp':
	        return 'a ' + type;
	      default:
	        return type;
	    }
	  }

	  // Returns class name of the object, if any.
	  function getClassName(propValue) {
	    if (!propValue.constructor || !propValue.constructor.name) {
	      return ANONYMOUS;
	    }
	    return propValue.constructor.name;
	  }

	  ReactPropTypes.checkPropTypes = checkPropTypes_1;
	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};

	var propTypes = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	{
	  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
	    Symbol.for &&
	    Symbol.for('react.element')) ||
	    0xeac7;

	  var isValidElement = function(object) {
	    return typeof object === 'object' &&
	      object !== null &&
	      object.$$typeof === REACT_ELEMENT_TYPE;
	  };

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = factoryWithTypeCheckers(isValidElement, throwOnDirectAccess);
	}
	});

	var prefix = 'Invariant failed';

	var index = (function (condition, message) {
	  if (condition) {
	    return;
	  }

	  throw new Error(prefix + ': ' + (message || ''));
	});

	var getRect = function getRect(_ref) {
	  var top = _ref.top,
	      right = _ref.right,
	      bottom = _ref.bottom,
	      left = _ref.left;

	  var width = right - left;
	  var height = bottom - top;

	  var rect = {
	    top: top,
	    right: right,
	    bottom: bottom,
	    left: left,
	    width: width,
	    height: height,

	    x: left,
	    y: top,

	    center: {
	      x: (right + left) / 2,
	      y: (bottom + top) / 2
	    }
	  };

	  return rect;
	};

	var expand = function expand(target, expandBy) {
	  return {
	    top: target.top - expandBy.top,
	    left: target.left - expandBy.left,

	    bottom: target.bottom + expandBy.bottom,
	    right: target.right + expandBy.right
	  };
	};

	var shrink = function shrink(target, shrinkBy) {
	  return {
	    top: target.top + shrinkBy.top,
	    left: target.left + shrinkBy.left,

	    bottom: target.bottom - shrinkBy.bottom,
	    right: target.right - shrinkBy.right
	  };
	};

	var shift = function shift(spacing, point) {
	  return {
	    top: spacing.top + point.y,
	    left: spacing.left + point.x,
	    bottom: spacing.bottom + point.y,
	    right: spacing.right + point.x
	  };
	};

	var noSpacing = {
	  top: 0,
	  right: 0,
	  bottom: 0,
	  left: 0
	};

	var createBox = function createBox(_ref2) {
	  var borderBox = _ref2.borderBox,
	      _ref2$margin = _ref2.margin,
	      margin = _ref2$margin === undefined ? noSpacing : _ref2$margin,
	      _ref2$border = _ref2.border,
	      border = _ref2$border === undefined ? noSpacing : _ref2$border,
	      _ref2$padding = _ref2.padding,
	      padding = _ref2$padding === undefined ? noSpacing : _ref2$padding;

	  var marginBox = getRect(expand(borderBox, margin));

	  var paddingBox = getRect(shrink(borderBox, border));

	  var contentBox = getRect(shrink(paddingBox, padding));

	  return {
	    marginBox: marginBox,
	    borderBox: getRect(borderBox),
	    paddingBox: paddingBox,
	    contentBox: contentBox,
	    margin: margin,
	    border: border,
	    padding: padding
	  };
	};

	var parse = function parse(value) {
	  return parseInt(value, 10);
	};
	var getWindowScroll = function getWindowScroll() {
	  return {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  };
	};

	var offset = function offset(original, change) {
	  var borderBox = original.borderBox,
	      border = original.border,
	      margin = original.margin,
	      padding = original.padding;

	  var shifted = shift(borderBox, change);

	  return createBox({
	    borderBox: shifted,
	    border: border,
	    margin: margin,
	    padding: padding
	  });
	};

	var withScroll = function withScroll(original) {
	  var scroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getWindowScroll();
	  return offset(original, scroll);
	};

	var calculateBox = function calculateBox(borderBox, styles) {
	  var margin = {
	    top: parse(styles.marginTop),
	    right: parse(styles.marginRight),
	    bottom: parse(styles.marginBottom),
	    left: parse(styles.marginLeft)
	  };
	  var padding = {
	    top: parse(styles.paddingTop),
	    right: parse(styles.paddingRight),
	    bottom: parse(styles.paddingBottom),
	    left: parse(styles.paddingLeft)
	  };
	  var border = {
	    top: parse(styles.borderTopWidth),
	    right: parse(styles.borderRightWidth),
	    bottom: parse(styles.borderBottomWidth),
	    left: parse(styles.borderLeftWidth)
	  };

	  return createBox({
	    borderBox: borderBox,
	    margin: margin,
	    padding: padding,
	    border: border
	  });
	};

	var getBox = function getBox(el) {
	  var borderBox = el.getBoundingClientRect();
	  var styles = window.getComputedStyle(el);

	  return calculateBox(borderBox, styles);
	};

	var vertical = {
	  direction: 'vertical',
	  line: 'y',
	  crossAxisLine: 'x',
	  start: 'top',
	  end: 'bottom',
	  size: 'height',
	  crossAxisStart: 'left',
	  crossAxisEnd: 'right',
	  crossAxisSize: 'width'
	};
	var horizontal = {
	  direction: 'horizontal',
	  line: 'x',
	  crossAxisLine: 'y',
	  start: 'left',
	  end: 'right',
	  size: 'width',
	  crossAxisStart: 'top',
	  crossAxisEnd: 'bottom',
	  crossAxisSize: 'height'
	};

	var origin = {
	  x: 0,
	  y: 0
	};
	var add = function add(point1, point2) {
	  return {
	    x: point1.x + point2.x,
	    y: point1.y + point2.y
	  };
	};
	var subtract = function subtract(point1, point2) {
	  return {
	    x: point1.x - point2.x,
	    y: point1.y - point2.y
	  };
	};
	var isEqual = function isEqual(point1, point2) {
	  return point1.x === point2.x && point1.y === point2.y;
	};
	var negate = function negate(point) {
	  return {
	    x: point.x !== 0 ? -point.x : 0,
	    y: point.y !== 0 ? -point.y : 0
	  };
	};
	var absolute = function absolute(point) {
	  return {
	    x: Math.abs(point.x),
	    y: Math.abs(point.y)
	  };
	};
	var patch = function patch(line, value, otherValue) {
	  var _ref;

	  if (otherValue === void 0) {
	    otherValue = 0;
	  }

	  return _ref = {}, _ref[line] = value, _ref[line === 'x' ? 'y' : 'x'] = otherValue, _ref;
	};
	var distance = function distance(point1, point2) {
	  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	};
	var closest = function closest(target, points) {
	  return Math.min.apply(Math, points.map(function (point) {
	    return distance(target, point);
	  }));
	};
	var apply = function apply(fn) {
	  return function (point) {
	    return {
	      x: fn(point.x),
	      y: fn(point.y)
	    };
	  };
	};

	var offsetByPosition = function offsetByPosition(spacing, point) {
	  return {
	    top: spacing.top + point.y,
	    left: spacing.left + point.x,
	    bottom: spacing.bottom + point.y,
	    right: spacing.right + point.x
	  };
	};
	var expandByPosition = function expandByPosition(spacing, position) {
	  return {
	    top: spacing.top - position.y,
	    left: spacing.left - position.x,
	    right: spacing.right + position.x,
	    bottom: spacing.bottom + position.y
	  };
	};
	var getCorners = function getCorners(spacing) {
	  return [{
	    x: spacing.left,
	    y: spacing.top
	  }, {
	    x: spacing.right,
	    y: spacing.top
	  }, {
	    x: spacing.left,
	    y: spacing.bottom
	  }, {
	    x: spacing.right,
	    y: spacing.bottom
	  }];
	};

	var getMaxScroll = (function (_ref) {
	  var scrollHeight = _ref.scrollHeight,
	      scrollWidth = _ref.scrollWidth,
	      height = _ref.height,
	      width = _ref.width;
	  var maxScroll = subtract({
	    x: scrollWidth,
	    y: scrollHeight
	  }, {
	    x: width,
	    y: height
	  });
	  var adjustedMaxScroll = {
	    x: Math.max(0, maxScroll.x),
	    y: Math.max(0, maxScroll.y)
	  };
	  return adjustedMaxScroll;
	});

	var clip = function clip(frame, subject) {
	  var result = getRect({
	    top: Math.max(subject.top, frame.top),
	    right: Math.min(subject.right, frame.right),
	    bottom: Math.min(subject.bottom, frame.bottom),
	    left: Math.max(subject.left, frame.left)
	  });

	  if (result.width <= 0 || result.height <= 0) {
	    return null;
	  }

	  return result;
	};
	var getDroppableDimension = function getDroppableDimension(_ref) {
	  var descriptor = _ref.descriptor,
	      isEnabled = _ref.isEnabled,
	      direction = _ref.direction,
	      client = _ref.client,
	      page = _ref.page,
	      closest$$1 = _ref.closest;

	  var scrollable = function () {
	    if (!closest$$1) {
	      return null;
	    }

	    var maxScroll = getMaxScroll({
	      scrollHeight: closest$$1.scrollHeight,
	      scrollWidth: closest$$1.scrollWidth,
	      height: closest$$1.client.paddingBox.height,
	      width: closest$$1.client.paddingBox.width
	    });
	    return {
	      framePageMarginBox: closest$$1.page.marginBox,
	      shouldClipSubject: closest$$1.shouldClipSubject,
	      scroll: {
	        initial: closest$$1.scroll,
	        current: closest$$1.scroll,
	        max: maxScroll,
	        diff: {
	          value: origin,
	          displacement: origin
	        }
	      }
	    };
	  }();

	  var subjectPageMarginBox = page.marginBox;
	  var clippedPageMarginBox = scrollable && scrollable.shouldClipSubject ? clip(scrollable.framePageMarginBox, subjectPageMarginBox) : subjectPageMarginBox;
	  var viewport = {
	    closestScrollable: scrollable,
	    subjectPageMarginBox: subjectPageMarginBox,
	    clippedPageMarginBox: clippedPageMarginBox
	  };
	  var dimension = {
	    descriptor: descriptor,
	    axis: direction === 'vertical' ? vertical : horizontal,
	    isEnabled: isEnabled,
	    client: client,
	    page: page,
	    viewport: viewport
	  };
	  return dimension;
	};
	var scrollDroppable = function scrollDroppable(droppable, newScroll) {
	  !droppable.viewport.closestScrollable ? index(false) : void 0;
	  var scrollable = droppable.viewport.closestScrollable;
	  var framePageMarginBox = scrollable.framePageMarginBox;
	  var scrollDiff = subtract(newScroll, scrollable.scroll.initial);
	  var scrollDisplacement = negate(scrollDiff);
	  var closestScrollable = {
	    framePageMarginBox: scrollable.framePageMarginBox,
	    shouldClipSubject: scrollable.shouldClipSubject,
	    scroll: {
	      initial: scrollable.scroll.initial,
	      current: newScroll,
	      diff: {
	        value: scrollDiff,
	        displacement: scrollDisplacement
	      },
	      max: scrollable.scroll.max
	    }
	  };
	  var displacedSubject = offsetByPosition(droppable.viewport.subjectPageMarginBox, scrollDisplacement);
	  var clippedPageMarginBox = closestScrollable.shouldClipSubject ? clip(framePageMarginBox, displacedSubject) : getRect(displacedSubject);
	  var viewport = {
	    closestScrollable: closestScrollable,
	    subjectPageMarginBox: droppable.viewport.subjectPageMarginBox,
	    clippedPageMarginBox: clippedPageMarginBox
	  };

	  var result = _extends({}, droppable, {
	    viewport: viewport
	  });

	  return result;
	};

	var simpleIsEqual = function simpleIsEqual(a, b) {
	  return a === b;
	};

	function index$1 (resultFn) {
	  var isEqual = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : simpleIsEqual;

	  var lastThis = void 0;
	  var lastArgs = [];
	  var lastResult = void 0;
	  var calledOnce = false;

	  var isNewArgEqualToLast = function isNewArgEqualToLast(newArg, index) {
	    return isEqual(newArg, lastArgs[index]);
	  };

	  var result = function result() {
	    for (var _len = arguments.length, newArgs = Array(_len), _key = 0; _key < _len; _key++) {
	      newArgs[_key] = arguments[_key];
	    }

	    if (calledOnce && lastThis === this && newArgs.length === lastArgs.length && newArgs.every(isNewArgEqualToLast)) {
	      return lastResult;
	    }

	    calledOnce = true;
	    lastThis = this;
	    lastArgs = newArgs;
	    lastResult = resultFn.apply(this, newArgs);
	    return lastResult;
	  };

	  return result;
	}

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var keys = _core.Object.keys;

	var keys$1 = keys;

	var toDroppableList = index$1(function (droppables) {
	  return keys$1(droppables).map(function (id) {
	    return droppables[id];
	  });
	});
	var toDraggableList = index$1(function (draggables) {
	  return keys$1(draggables).map(function (id) {
	    return draggables[id];
	  });
	});

	var getDraggablesInsideDroppable = index$1(function (droppable, draggables) {
	  return toDraggableList(draggables).filter(function (draggable) {
	    return droppable.descriptor.id === draggable.descriptor.droppableId;
	  }).sort(function (a, b) {
	    return a.descriptor.index - b.descriptor.index;
	  });
	});

	var isWithin = (function (lowerBound, upperBound) {
	  return function (value) {
	    return value <= upperBound && value >= lowerBound;
	  };
	});

	var isPositionInFrame = (function (frame) {
	  var isWithinVertical = isWithin(frame.top, frame.bottom);
	  var isWithinHorizontal = isWithin(frame.left, frame.right);
	  return function (point) {
	    return isWithinVertical(point.y) && isWithinVertical(point.y) && isWithinHorizontal(point.x) && isWithinHorizontal(point.x);
	  };
	});

	var getRequiredGrowth = index$1(function (draggable, draggables, droppable) {
	  var getResult = function getResult(existingSpace) {
	    var requiredSpace = draggable.page.marginBox[droppable.axis.size];

	    if (requiredSpace <= existingSpace) {
	      return null;
	    }

	    var requiredGrowth = patch(droppable.axis.line, requiredSpace - existingSpace);
	    return requiredGrowth;
	  };

	  var dimensions = getDraggablesInsideDroppable(droppable, draggables);

	  if (!dimensions.length) {
	    var _existingSpace = droppable.page.marginBox[droppable.axis.size];
	    return getResult(_existingSpace);
	  }

	  var endOfDraggables = dimensions[dimensions.length - 1].page.marginBox[droppable.axis.end];
	  var endOfDroppable = droppable.page.marginBox[droppable.axis.end];
	  var existingSpace = endOfDroppable - endOfDraggables;
	  return getResult(existingSpace);
	});
	var getWithGrowth = index$1(function (area, growth) {
	  return getRect(expandByPosition(area, growth));
	});

	var getClippedRectWithPlaceholder = function getClippedRectWithPlaceholder(_ref) {
	  var draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      droppable = _ref.droppable,
	      previousDroppableOverId = _ref.previousDroppableOverId;
	  var isHome = draggable.descriptor.droppableId === droppable.descriptor.id;
	  var wasOver = Boolean(previousDroppableOverId && previousDroppableOverId === droppable.descriptor.id);
	  var clippedPageMarginBox = droppable.viewport.clippedPageMarginBox;

	  if (!clippedPageMarginBox) {
	    return clippedPageMarginBox;
	  }

	  if (isHome || !wasOver) {
	    return clippedPageMarginBox;
	  }

	  var requiredGrowth = getRequiredGrowth(draggable, draggables, droppable);

	  if (!requiredGrowth) {
	    return clippedPageMarginBox;
	  }

	  var subjectWithGrowth = getWithGrowth(clippedPageMarginBox, requiredGrowth);
	  var closestScrollable = droppable.viewport.closestScrollable;

	  if (!closestScrollable) {
	    return subjectWithGrowth;
	  }

	  if (!closestScrollable.shouldClipSubject) {
	    return subjectWithGrowth;
	  }

	  return clip(closestScrollable.framePageMarginBox, subjectWithGrowth);
	};

	var getDroppableOver = (function (_ref2) {
	  var target = _ref2.target,
	      draggable = _ref2.draggable,
	      draggables = _ref2.draggables,
	      droppables = _ref2.droppables,
	      previousDroppableOverId = _ref2.previousDroppableOverId;
	  var maybe = toDroppableList(droppables).filter(function (droppable) {
	    return droppable.isEnabled;
	  }).find(function (droppable) {
	    var withPlaceholder = getClippedRectWithPlaceholder({
	      draggable: draggable,
	      draggables: draggables,
	      droppable: droppable,
	      previousDroppableOverId: previousDroppableOverId
	    });

	    if (!withPlaceholder) {
	      return false;
	    }

	    return isPositionInFrame(withPlaceholder)(target);
	  });
	  return maybe ? maybe.descriptor.id : null;
	});

	var noMovement = {
	  displaced: [],
	  amount: origin,
	  isBeyondStartPosition: false
	};
	var noImpact = {
	  movement: noMovement,
	  direction: null,
	  destination: null
	};

	var getDisplacementMap = index$1(function (displaced) {
	  return displaced.reduce(function (map, displacement) {
	    map[displacement.draggableId] = displacement;
	    return map;
	  }, {});
	});

	var isPartiallyVisibleThroughFrame = (function (frame) {
	  var isWithinVertical = isWithin(frame.top, frame.bottom);
	  var isWithinHorizontal = isWithin(frame.left, frame.right);
	  return function (subject) {
	    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);

	    if (isContained) {
	      return true;
	    }

	    var isPartiallyVisibleVertically = isWithinVertical(subject.top) || isWithinVertical(subject.bottom);
	    var isPartiallyVisibleHorizontally = isWithinHorizontal(subject.left) || isWithinHorizontal(subject.right);
	    var isPartiallyContained = isPartiallyVisibleVertically && isPartiallyVisibleHorizontally;

	    if (isPartiallyContained) {
	      return true;
	    }

	    var isBiggerVertically = subject.top < frame.top && subject.bottom > frame.bottom;
	    var isBiggerHorizontally = subject.left < frame.left && subject.right > frame.right;
	    var isTargetBiggerThanFrame = isBiggerVertically && isBiggerHorizontally;

	    if (isTargetBiggerThanFrame) {
	      return true;
	    }

	    var isTargetBiggerOnOneAxis = isBiggerVertically && isPartiallyVisibleHorizontally || isBiggerHorizontally && isPartiallyVisibleVertically;
	    return isTargetBiggerOnOneAxis;
	  };
	});

	var isTotallyVisibleThroughFrame = (function (frame) {
	  var isWithinVertical = isWithin(frame.top, frame.bottom);
	  var isWithinHorizontal = isWithin(frame.left, frame.right);
	  return function (subject) {
	    var isContained = isWithinVertical(subject.top) && isWithinVertical(subject.bottom) && isWithinHorizontal(subject.left) && isWithinHorizontal(subject.right);
	    return isContained;
	  };
	});

	var isVisible = function isVisible(_ref) {
	  var target = _ref.target,
	      destination = _ref.destination,
	      viewport = _ref.viewport,
	      isVisibleThroughFrameFn = _ref.isVisibleThroughFrameFn;
	  var displacement = destination.viewport.closestScrollable ? destination.viewport.closestScrollable.scroll.diff.displacement : origin;
	  var withDisplacement = offsetByPosition(target, displacement);

	  if (!destination.viewport.clippedPageMarginBox) {
	    return false;
	  }

	  var isVisibleInDroppable = isVisibleThroughFrameFn(destination.viewport.clippedPageMarginBox)(withDisplacement);
	  var isVisibleInViewport = isVisibleThroughFrameFn(viewport)(withDisplacement);
	  return isVisibleInDroppable && isVisibleInViewport;
	};

	var isPartiallyVisible = function isPartiallyVisible(_ref2) {
	  var target = _ref2.target,
	      destination = _ref2.destination,
	      viewport = _ref2.viewport;
	  return isVisible({
	    target: target,
	    destination: destination,
	    viewport: viewport,
	    isVisibleThroughFrameFn: isPartiallyVisibleThroughFrame
	  });
	};
	var isTotallyVisible = function isTotallyVisible(_ref3) {
	  var target = _ref3.target,
	      destination = _ref3.destination,
	      viewport = _ref3.viewport;
	  return isVisible({
	    target: target,
	    destination: destination,
	    viewport: viewport,
	    isVisibleThroughFrameFn: isTotallyVisibleThroughFrame
	  });
	};

	var getDisplacement = (function (_ref) {
	  var draggable = _ref.draggable,
	      destination = _ref.destination,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var id = draggable.descriptor.id;
	  var map = getDisplacementMap(previousImpact.movement.displaced);
	  var isVisible = isPartiallyVisible({
	    target: draggable.page.marginBox,
	    destination: destination,
	    viewport: viewport
	  });

	  var shouldAnimate = function () {
	    if (!isVisible) {
	      return false;
	    }

	    var previous = map[id];

	    if (!previous) {
	      return true;
	    }

	    return previous.shouldAnimate;
	  }();

	  var displacement = {
	    draggableId: id,
	    isVisible: isVisible,
	    shouldAnimate: shouldAnimate
	  };
	  return displacement;
	});

	var withDroppableScroll = (function (droppable, point) {
	  var closestScrollable = droppable.viewport.closestScrollable;

	  if (!closestScrollable) {
	    return point;
	  }

	  return add(point, closestScrollable.scroll.diff.value);
	});

	var inHomeList = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      draggable = _ref.draggable,
	      home = _ref.home,
	      insideHome = _ref.insideHome,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var axis = home.axis;
	  var originalCenter = draggable.page.borderBox.center;
	  var currentCenter = withDroppableScroll(home, pageBorderBoxCenter);
	  var isBeyondStartPosition = currentCenter[axis.line] - originalCenter[axis.line] > 0;
	  var amount = patch(axis.line, draggable.client.marginBox[axis.size]);
	  var displaced = insideHome.filter(function (child) {
	    if (child === draggable) {
	      return false;
	    }

	    var borderBox = child.page.borderBox;

	    if (isBeyondStartPosition) {
	      if (borderBox.center[axis.line] < originalCenter[axis.line]) {
	        return false;
	      }

	      return currentCenter[axis.line] > borderBox[axis.start];
	    }

	    if (originalCenter[axis.line] < borderBox.center[axis.line]) {
	      return false;
	    }

	    return currentCenter[axis.line] < borderBox[axis.end];
	  }).map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: home,
	      previousImpact: previousImpact,
	      viewport: viewport.frame
	    });
	  });
	  var ordered = isBeyondStartPosition ? displaced.reverse() : displaced;

	  var index = function () {
	    var startIndex = draggable.descriptor.index;
	    var length = ordered.length;

	    if (!length) {
	      return startIndex;
	    }

	    if (isBeyondStartPosition) {
	      return startIndex + length;
	    }

	    return startIndex - length;
	  }();

	  var movement = {
	    amount: amount,
	    displaced: ordered,
	    isBeyondStartPosition: isBeyondStartPosition
	  };
	  var impact = {
	    movement: movement,
	    direction: axis.direction,
	    destination: {
	      droppableId: home.descriptor.id,
	      index: index
	    }
	  };
	  return impact;
	});

	var inForeignList = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      draggable = _ref.draggable,
	      destination = _ref.destination,
	      insideDestination = _ref.insideDestination,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var axis = destination.axis;
	  var currentCenter = withDroppableScroll(destination, pageBorderBoxCenter);
	  var displaced = insideDestination.filter(function (child) {
	    var threshold = child.page.borderBox[axis.end];
	    return threshold > currentCenter[axis.line];
	  }).map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: destination,
	      previousImpact: previousImpact,
	      viewport: viewport.frame
	    });
	  });
	  var newIndex = insideDestination.length - displaced.length;
	  var movement = {
	    amount: patch(axis.line, draggable.page.marginBox[axis.size]),
	    displaced: displaced,
	    isBeyondStartPosition: false
	  };
	  var impact = {
	    movement: movement,
	    direction: axis.direction,
	    destination: {
	      droppableId: destination.descriptor.id,
	      index: newIndex
	    }
	  };
	  return impact;
	});

	var getDragImpact = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      droppables = _ref.droppables,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var previousDroppableOverId = previousImpact.destination && previousImpact.destination.droppableId;
	  var destinationId = getDroppableOver({
	    target: pageBorderBoxCenter,
	    draggable: draggable,
	    draggables: draggables,
	    droppables: droppables,
	    previousDroppableOverId: previousDroppableOverId
	  });

	  if (!destinationId) {
	    return noImpact;
	  }

	  var destination = droppables[destinationId];

	  if (!destination.isEnabled) {
	    return noImpact;
	  }

	  var home = droppables[draggable.descriptor.droppableId];
	  var isWithinHomeDroppable = home.descriptor.id === destinationId;
	  var insideDestination = getDraggablesInsideDroppable(destination, draggables);

	  if (isWithinHomeDroppable) {
	    return inHomeList({
	      pageBorderBoxCenter: pageBorderBoxCenter,
	      draggable: draggable,
	      home: home,
	      insideHome: insideDestination,
	      previousImpact: previousImpact || noImpact,
	      viewport: viewport
	    });
	  }

	  return inForeignList({
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    draggable: draggable,
	    destination: destination,
	    insideDestination: insideDestination,
	    previousImpact: previousImpact || noImpact,
	    viewport: viewport
	  });
	});

	var getHomeLocation = (function (critical) {
	  return {
	    index: critical.draggable.index,
	    droppableId: critical.droppable.id
	  };
	});

	var getSafeClipped = function getSafeClipped(droppable) {
	  var rect = droppable.viewport.clippedPageMarginBox;
	  !rect ? index(false, 'Cannot get clipped area from droppable') : void 0;
	  return rect;
	};

	var getBestCrossAxisDroppable = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      source = _ref.source,
	      droppables = _ref.droppables,
	      viewport = _ref.viewport;
	  var sourceClipped = source.viewport.clippedPageMarginBox;

	  if (!sourceClipped) {
	    return null;
	  }

	  var axis = source.axis;
	  var isBetweenSourceClipped = isWithin(sourceClipped[axis.start], sourceClipped[axis.end]);
	  var candidates = toDroppableList(droppables).filter(function (droppable) {
	    return droppable !== source;
	  }).filter(function (droppable) {
	    return droppable.isEnabled;
	  }).filter(function (droppable) {
	    var clippedPageMarginBox = droppable.viewport.clippedPageMarginBox;

	    if (!clippedPageMarginBox) {
	      return false;
	    }

	    return isPartiallyVisibleThroughFrame(viewport.frame)(clippedPageMarginBox);
	  }).filter(function (droppable) {
	    var targetClipped = getSafeClipped(droppable);

	    if (isMovingForward) {
	      return sourceClipped[axis.crossAxisEnd] < targetClipped[axis.crossAxisEnd];
	    }

	    return targetClipped[axis.crossAxisStart] < sourceClipped[axis.crossAxisStart];
	  }).filter(function (droppable) {
	    var targetClipped = getSafeClipped(droppable);
	    var isBetweenDestinationClipped = isWithin(targetClipped[axis.start], targetClipped[axis.end]);
	    return isBetweenSourceClipped(targetClipped[axis.start]) || isBetweenSourceClipped(targetClipped[axis.end]) || isBetweenDestinationClipped(sourceClipped[axis.start]) || isBetweenDestinationClipped(sourceClipped[axis.end]);
	  }).sort(function (a, b) {
	    var first = getSafeClipped(a)[axis.crossAxisStart];
	    var second = getSafeClipped(b)[axis.crossAxisStart];

	    if (isMovingForward) {
	      return first - second;
	    }

	    return second - first;
	  }).filter(function (droppable, index$$1, array) {
	    return getSafeClipped(droppable)[axis.crossAxisStart] === getSafeClipped(array[0])[axis.crossAxisStart];
	  });

	  if (!candidates.length) {
	    return null;
	  }

	  if (candidates.length === 1) {
	    return candidates[0];
	  }

	  var contains = candidates.filter(function (droppable) {
	    var isWithinDroppable = isWithin(getSafeClipped(droppable)[axis.start], getSafeClipped(droppable)[axis.end]);
	    return isWithinDroppable(pageBorderBoxCenter[axis.line]);
	  });

	  if (contains.length === 1) {
	    return contains[0];
	  }

	  if (contains.length > 1) {
	    return contains.sort(function (a, b) {
	      return getSafeClipped(a)[axis.start] - getSafeClipped(b)[axis.start];
	    })[0];
	  }

	  return candidates.sort(function (a, b) {
	    var first = closest(pageBorderBoxCenter, getCorners(getSafeClipped(a)));
	    var second = closest(pageBorderBoxCenter, getCorners(getSafeClipped(b)));

	    if (first !== second) {
	      return first - second;
	    }

	    return getSafeClipped(a)[axis.start] - getSafeClipped(b)[axis.start];
	  })[0];
	});

	var withDroppableDisplacement = (function (droppable, point) {
	  var closestScrollable = droppable.viewport.closestScrollable;

	  if (!closestScrollable) {
	    return point;
	  }

	  return add(point, closestScrollable.scroll.diff.displacement);
	});

	var getClosestDraggable = (function (_ref) {
	  var axis = _ref.axis,
	      viewport = _ref.viewport,
	      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      destination = _ref.destination,
	      insideDestination = _ref.insideDestination;

	  if (!insideDestination.length) {
	    return null;
	  }

	  var result = insideDestination.filter(function (draggable) {
	    return isTotallyVisible({
	      target: draggable.page.borderBox,
	      destination: destination,
	      viewport: viewport.frame
	    });
	  }).sort(function (a, b) {
	    var distanceToA = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, a.page.borderBox.center));
	    var distanceToB = distance(pageBorderBoxCenter, withDroppableDisplacement(destination, b.page.borderBox.center));

	    if (distanceToA < distanceToB) {
	      return -1;
	    }

	    if (distanceToB < distanceToA) {
	      return 1;
	    }

	    return a.page.borderBox[axis.start] - b.page.borderBox[axis.start];
	  });
	  return result.length ? result[0] : null;
	});

	var moveToEdge = (function (_ref) {
	  var source = _ref.source,
	      sourceEdge = _ref.sourceEdge,
	      destination = _ref.destination,
	      destinationEdge = _ref.destinationEdge,
	      destinationAxis = _ref.destinationAxis;

	  var getCorner = function getCorner(area) {
	    return patch(destinationAxis.line, area[destinationAxis[destinationEdge]], area[destinationAxis.crossAxisStart]);
	  };

	  var corner = getCorner(destination);
	  var centerDiff = absolute(subtract(source.center, getCorner(source)));
	  var signed = patch(destinationAxis.line, (sourceEdge === 'end' ? -1 : 1) * centerDiff[destinationAxis.line], centerDiff[destinationAxis.crossAxisLine]);
	  return add(corner, signed);
	});

	var toHomeList = (function (_ref) {
	  var amount = _ref.amount,
	      homeIndex = _ref.homeIndex,
	      movingRelativeTo = _ref.movingRelativeTo,
	      insideDestination = _ref.insideDestination,
	      draggable = _ref.draggable,
	      destination = _ref.destination,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var axis = destination.axis;
	  var targetIndex = insideDestination.indexOf(movingRelativeTo);
	  !(targetIndex !== -1) ? index(false, 'Unable to find target in destination droppable') : void 0;

	  if (targetIndex === homeIndex) {
	    var _newCenter = draggable.page.borderBox.center;
	    var _newImpact = {
	      movement: {
	        displaced: [],
	        amount: amount,
	        isBeyondStartPosition: false
	      },
	      direction: destination.axis.direction,
	      destination: {
	        droppableId: destination.descriptor.id,
	        index: homeIndex
	      }
	    };
	    return {
	      pageBorderBoxCenter: withDroppableDisplacement(destination, _newCenter),
	      impact: _newImpact
	    };
	  }

	  var isMovingPastOriginalIndex = targetIndex > homeIndex;
	  var edge = isMovingPastOriginalIndex ? 'end' : 'start';
	  var newCenter = moveToEdge({
	    source: draggable.page.borderBox,
	    sourceEdge: edge,
	    destination: isMovingPastOriginalIndex ? movingRelativeTo.page.borderBox : movingRelativeTo.page.marginBox,
	    destinationEdge: edge,
	    destinationAxis: axis
	  });

	  var modified = function () {
	    if (!isMovingPastOriginalIndex) {
	      return insideDestination.slice(targetIndex, homeIndex);
	    }

	    var from = homeIndex + 1;
	    var to = targetIndex + 1;
	    return insideDestination.slice(from, to).reverse();
	  }();

	  var displaced = modified.map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: destination,
	      previousImpact: previousImpact,
	      viewport: viewport.frame
	    });
	  });
	  var newImpact = {
	    movement: {
	      displaced: displaced,
	      amount: amount,
	      isBeyondStartPosition: isMovingPastOriginalIndex
	    },
	    direction: axis.direction,
	    destination: {
	      droppableId: destination.descriptor.id,
	      index: targetIndex
	    }
	  };
	  return {
	    pageBorderBoxCenter: withDroppableDisplacement(destination, newCenter),
	    impact: newImpact
	  };
	});

	var toForeignList = (function (_ref) {
	  var amount = _ref.amount,
	      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      movingRelativeTo = _ref.movingRelativeTo,
	      insideDestination = _ref.insideDestination,
	      draggable = _ref.draggable,
	      destination = _ref.destination,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var axis = destination.axis;
	  var isGoingBeforeTarget = Boolean(movingRelativeTo && pageBorderBoxCenter[destination.axis.line] < movingRelativeTo.page.borderBox.center[destination.axis.line]);

	  if (!movingRelativeTo) {
	    var _newCenter = moveToEdge({
	      source: draggable.page.borderBox,
	      sourceEdge: 'start',
	      destination: destination.page.contentBox,
	      destinationEdge: 'start',
	      destinationAxis: axis
	    });

	    var _newImpact = {
	      movement: {
	        displaced: [],
	        amount: amount,
	        isBeyondStartPosition: false
	      },
	      direction: axis.direction,
	      destination: {
	        droppableId: destination.descriptor.id,
	        index: 0
	      }
	    };
	    return {
	      pageBorderBoxCenter: withDroppableDisplacement(destination, _newCenter),
	      impact: _newImpact
	    };
	  }

	  var targetIndex = insideDestination.indexOf(movingRelativeTo);
	  !(targetIndex !== -1) ? index(false, 'The target was not found within its droppable') : void 0;
	  var proposedIndex = isGoingBeforeTarget ? targetIndex : targetIndex + 1;
	  var newCenter = moveToEdge({
	    source: draggable.page.borderBox,
	    sourceEdge: 'start',
	    destination: movingRelativeTo.page.marginBox,
	    destinationEdge: isGoingBeforeTarget ? 'start' : 'end',
	    destinationAxis: axis
	  });
	  var displaced = insideDestination.slice(proposedIndex, insideDestination.length).map(function (dimension) {
	    return getDisplacement({
	      draggable: dimension,
	      destination: destination,
	      viewport: viewport.frame,
	      previousImpact: previousImpact
	    });
	  });
	  var newImpact = {
	    movement: {
	      displaced: displaced,
	      amount: amount,
	      isBeyondStartPosition: false
	    },
	    direction: axis.direction,
	    destination: {
	      droppableId: destination.descriptor.id,
	      index: proposedIndex
	    }
	  };
	  return {
	    pageBorderBoxCenter: withDroppableDisplacement(destination, newCenter),
	    impact: newImpact
	  };
	});

	var moveToNewDroppable = (function (_ref) {
	  var pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      destination = _ref.destination,
	      insideDestination = _ref.insideDestination,
	      draggable = _ref.draggable,
	      movingRelativeTo = _ref.movingRelativeTo,
	      home = _ref.home,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var amount = patch(destination.axis.line, draggable.client.marginBox[destination.axis.size]);

	  if (destination.descriptor.id === draggable.descriptor.droppableId) {
	    !movingRelativeTo ? index(false, 'There will always be a target in the original list') : void 0;
	    return toHomeList({
	      amount: amount,
	      homeIndex: home.index,
	      movingRelativeTo: movingRelativeTo,
	      insideDestination: insideDestination,
	      draggable: draggable,
	      destination: destination,
	      previousImpact: previousImpact,
	      viewport: viewport
	    });
	  }

	  return toForeignList({
	    amount: amount,
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    movingRelativeTo: movingRelativeTo,
	    insideDestination: insideDestination,
	    draggable: draggable,
	    destination: destination,
	    previousImpact: previousImpact,
	    viewport: viewport
	  });
	});

	var moveCrossAxis = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      pageBorderBoxCenter = _ref.pageBorderBoxCenter,
	      draggableId = _ref.draggableId,
	      droppableId = _ref.droppableId,
	      home = _ref.home,
	      draggables = _ref.draggables,
	      droppables = _ref.droppables,
	      previousImpact = _ref.previousImpact,
	      viewport = _ref.viewport;
	  var draggable = draggables[draggableId];
	  var source = droppables[droppableId];
	  var destination = getBestCrossAxisDroppable({
	    isMovingForward: isMovingForward,
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    source: source,
	    droppables: droppables,
	    viewport: viewport
	  });

	  if (!destination) {
	    return null;
	  }

	  var insideDestination = getDraggablesInsideDroppable(destination, draggables);
	  var movingRelativeTo = getClosestDraggable({
	    axis: destination.axis,
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    destination: destination,
	    insideDestination: insideDestination,
	    viewport: viewport
	  });

	  if (insideDestination.length && !movingRelativeTo) {
	    return null;
	  }

	  return moveToNewDroppable({
	    pageBorderBoxCenter: pageBorderBoxCenter,
	    destination: destination,
	    draggable: draggable,
	    movingRelativeTo: movingRelativeTo,
	    insideDestination: insideDestination,
	    home: home,
	    previousImpact: previousImpact || noImpact,
	    viewport: viewport
	  });
	});

	var isTotallyVisibleInNewLocation = (function (_ref) {
	  var draggable = _ref.draggable,
	      destination = _ref.destination,
	      newPageBorderBoxCenter = _ref.newPageBorderBoxCenter,
	      viewport = _ref.viewport;
	  var diff = subtract(newPageBorderBoxCenter, draggable.page.borderBox.center);
	  var shifted = offsetByPosition(draggable.page.borderBox, diff);
	  return isTotallyVisible({
	    target: shifted,
	    destination: destination,
	    viewport: viewport
	  });
	});

	var withFirstAdded = function withFirstAdded(_ref) {
	  var add = _ref.add,
	      previousImpact = _ref.previousImpact,
	      droppable = _ref.droppable,
	      draggables = _ref.draggables,
	      viewport = _ref.viewport;
	  var newDisplacement = {
	    draggableId: add,
	    isVisible: true,
	    shouldAnimate: true
	  };
	  var added = [newDisplacement].concat(previousImpact.movement.displaced);
	  var withUpdatedVisibility = added.map(function (current) {
	    if (current === newDisplacement) {
	      return current;
	    }

	    var updated = getDisplacement({
	      draggable: draggables[current.draggableId],
	      destination: droppable,
	      previousImpact: previousImpact,
	      viewport: viewport.frame
	    });
	    return updated;
	  });
	  return withUpdatedVisibility;
	};

	var forceVisibleDisplacement = function forceVisibleDisplacement(current) {
	  if (current.isVisible) {
	    return current;
	  }

	  return {
	    draggableId: current.draggableId,
	    isVisible: true,
	    shouldAnimate: false
	  };
	};

	var withFirstRemoved = function withFirstRemoved(_ref2) {
	  var dragging = _ref2.dragging,
	      isVisibleInNewLocation = _ref2.isVisibleInNewLocation,
	      previousImpact = _ref2.previousImpact,
	      droppable = _ref2.droppable,
	      draggables = _ref2.draggables;
	  var last = previousImpact.movement.displaced;
	  !last.length ? index(false, 'Cannot remove displacement from empty list') : void 0;
	  var withFirstRestored = last.slice(1, last.length);

	  if (!withFirstRestored.length) {
	    return withFirstRestored;
	  }

	  if (isVisibleInNewLocation) {
	    return withFirstRestored;
	  }

	  var axis = droppable.axis;
	  var sizeOfRestored = draggables[last[0].draggableId].page.marginBox[axis.size];
	  var sizeOfDragging = draggables[dragging].page.marginBox[axis.size];
	  var buffer = sizeOfRestored + sizeOfDragging;
	  var withUpdatedVisibility = withFirstRestored.map(function (displacement, index$$1) {
	    if (index$$1 === 0) {
	      return forceVisibleDisplacement(displacement);
	    }

	    if (buffer > 0) {
	      var current = draggables[displacement.draggableId];
	      var size = current.page.marginBox[axis.size];
	      buffer -= size;
	      return forceVisibleDisplacement(displacement);
	    }

	    return {
	      draggableId: displacement.draggableId,
	      isVisible: false,
	      shouldAnimate: false
	    };
	  });
	  return withUpdatedVisibility;
	};

	var inHomeList$1 = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      draggableId = _ref.draggableId,
	      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
	      previousImpact = _ref.previousImpact,
	      droppable = _ref.droppable,
	      draggables = _ref.draggables,
	      viewport = _ref.viewport;
	  var location = previousImpact.destination;
	  !location ? index(false, 'Cannot move to next index in home list when there is no previous destination') : void 0;
	  var draggable = draggables[draggableId];
	  var axis = droppable.axis;
	  var insideDroppable = getDraggablesInsideDroppable(droppable, draggables);
	  var startIndex = draggable.descriptor.index;
	  var currentIndex = location.index;
	  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;

	  if (proposedIndex > insideDroppable.length - 1) {
	    return null;
	  }

	  if (proposedIndex < 0) {
	    return null;
	  }

	  var destination = insideDroppable[proposedIndex];
	  var isMovingTowardStart = isMovingForward && proposedIndex <= startIndex || !isMovingForward && proposedIndex >= startIndex;

	  var edge = function () {
	    if (!isMovingTowardStart) {
	      return isMovingForward ? 'end' : 'start';
	    }

	    return isMovingForward ? 'start' : 'end';
	  }();

	  var newPageBorderBoxCenter = moveToEdge({
	    source: draggable.page.borderBox,
	    sourceEdge: edge,
	    destination: destination.page.borderBox,
	    destinationEdge: edge,
	    destinationAxis: droppable.axis
	  });
	  var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
	    draggable: draggable,
	    destination: droppable,
	    newPageBorderBoxCenter: newPageBorderBoxCenter,
	    viewport: viewport.frame
	  });
	  var displaced = isMovingTowardStart ? withFirstRemoved({
	    dragging: draggableId,
	    isVisibleInNewLocation: isVisibleInNewLocation,
	    previousImpact: previousImpact,
	    droppable: droppable,
	    draggables: draggables
	  }) : withFirstAdded({
	    add: destination.descriptor.id,
	    previousImpact: previousImpact,
	    droppable: droppable,
	    draggables: draggables,
	    viewport: viewport
	  });
	  var newImpact = {
	    movement: {
	      displaced: displaced,
	      amount: patch(axis.line, draggable.page.marginBox[axis.size]),
	      isBeyondStartPosition: proposedIndex > startIndex
	    },
	    destination: {
	      droppableId: droppable.descriptor.id,
	      index: proposedIndex
	    },
	    direction: droppable.axis.direction
	  };

	  if (isVisibleInNewLocation) {
	    return {
	      pageBorderBoxCenter: withDroppableDisplacement(droppable, newPageBorderBoxCenter),
	      impact: newImpact,
	      scrollJumpRequest: null
	    };
	  }

	  var distance$$1 = subtract(newPageBorderBoxCenter, previousPageBorderBoxCenter);
	  var distanceWithScroll = withDroppableDisplacement(droppable, distance$$1);
	  return {
	    pageBorderBoxCenter: previousPageBorderBoxCenter,
	    impact: newImpact,
	    scrollJumpRequest: distanceWithScroll
	  };
	});

	var inForeignList$1 = (function (_ref) {
	  var isMovingForward = _ref.isMovingForward,
	      draggableId = _ref.draggableId,
	      previousImpact = _ref.previousImpact,
	      previousPageBorderBoxCenter = _ref.previousPageBorderBoxCenter,
	      droppable = _ref.droppable,
	      draggables = _ref.draggables,
	      viewport = _ref.viewport;
	  !previousImpact.destination ? index(false, 'Cannot move to next index where there is no previous destination') : void 0;
	  var location = previousImpact.destination;
	  var draggable = draggables[draggableId];
	  var axis = droppable.axis;
	  var insideForeignDroppable = getDraggablesInsideDroppable(droppable, draggables);
	  var currentIndex = location.index;
	  var proposedIndex = isMovingForward ? currentIndex + 1 : currentIndex - 1;
	  var lastIndex = insideForeignDroppable.length - 1;

	  if (proposedIndex > insideForeignDroppable.length) {
	    return null;
	  }

	  if (proposedIndex < 0) {
	    return null;
	  }

	  var movingRelativeTo = insideForeignDroppable[Math.min(proposedIndex, lastIndex)];
	  var isMovingPastLastIndex = proposedIndex > lastIndex;
	  var sourceEdge = 'start';

	  var destinationEdge = function () {
	    if (isMovingPastLastIndex) {
	      return 'end';
	    }

	    return 'start';
	  }();

	  var newPageBorderBoxCenter = moveToEdge({
	    source: draggable.page.borderBox,
	    sourceEdge: sourceEdge,
	    destination: movingRelativeTo.page.marginBox,
	    destinationEdge: destinationEdge,
	    destinationAxis: droppable.axis
	  });
	  var isVisibleInNewLocation = isTotallyVisibleInNewLocation({
	    draggable: draggable,
	    destination: droppable,
	    newPageBorderBoxCenter: newPageBorderBoxCenter,
	    viewport: viewport.frame
	  });

	  var displaced = function () {
	    if (isMovingForward) {
	      return withFirstRemoved({
	        dragging: draggableId,
	        isVisibleInNewLocation: isVisibleInNewLocation,
	        previousImpact: previousImpact,
	        droppable: droppable,
	        draggables: draggables
	      });
	    }

	    return withFirstAdded({
	      add: movingRelativeTo.descriptor.id,
	      previousImpact: previousImpact,
	      droppable: droppable,
	      draggables: draggables,
	      viewport: viewport
	    });
	  }();

	  var newImpact = {
	    movement: {
	      displaced: displaced,
	      amount: patch(axis.line, draggable.page.marginBox[axis.size]),
	      isBeyondStartPosition: false
	    },
	    destination: {
	      droppableId: droppable.descriptor.id,
	      index: proposedIndex
	    },
	    direction: droppable.axis.direction
	  };

	  if (isVisibleInNewLocation) {
	    return {
	      pageBorderBoxCenter: withDroppableDisplacement(droppable, newPageBorderBoxCenter),
	      impact: newImpact,
	      scrollJumpRequest: null
	    };
	  }

	  var distanceMoving = subtract(newPageBorderBoxCenter, previousPageBorderBoxCenter);
	  var distanceWithScroll = withDroppableDisplacement(droppable, distanceMoving);
	  return {
	    pageBorderBoxCenter: previousPageBorderBoxCenter,
	    impact: newImpact,
	    scrollJumpRequest: distanceWithScroll
	  };
	});

	var moveToNextIndex = (function (args) {
	  var draggableId = args.draggableId,
	      draggables = args.draggables,
	      droppable = args.droppable;
	  var draggable = draggables[draggableId];
	  var isInHomeList = draggable.descriptor.droppableId === droppable.descriptor.id;

	  if (!droppable.isEnabled) {
	    return null;
	  }

	  if (isInHomeList) {
	    return inHomeList$1(args);
	  }

	  return inForeignList$1(args);
	});

	var getClientSelection = function getClientSelection(pageBorderBoxCenter, currentScroll) {
	  return subtract(pageBorderBoxCenter, currentScroll);
	};

	var moveInDirection = (function (_ref) {
	  var state = _ref.state,
	      type = _ref.type;

	  var _ref2 = function () {
	    if (state.impact.destination) {
	      return {
	        droppable: state.dimensions.droppables[state.impact.destination.droppableId],
	        isMainAxisMovementAllowed: true
	      };
	    }

	    return {
	      droppable: state.dimensions.droppables[state.critical.droppable.id],
	      isMainAxisMovementAllowed: false
	    };
	  }(),
	      droppable = _ref2.droppable,
	      isMainAxisMovementAllowed = _ref2.isMainAxisMovementAllowed;

	  var direction = droppable.axis.direction;
	  var isMovingOnMainAxis = direction === 'vertical' && (type === 'MOVE_UP' || type === 'MOVE_DOWN') || direction === 'horizontal' && (type === 'MOVE_LEFT' || type === 'MOVE_RIGHT');

	  if (isMovingOnMainAxis && !isMainAxisMovementAllowed) {
	    return null;
	  }

	  var isMovingForward = type === 'MOVE_DOWN' || type === 'MOVE_RIGHT';

	  if (isMovingOnMainAxis) {
	    var _result = moveToNextIndex({
	      isMovingForward: isMovingForward,
	      draggableId: state.critical.draggable.id,
	      droppable: droppable,
	      draggables: state.dimensions.draggables,
	      previousPageBorderBoxCenter: state.current.page.borderBoxCenter,
	      previousImpact: state.impact,
	      viewport: state.viewport
	    });

	    if (!_result) {
	      return null;
	    }

	    return {
	      impact: _result.impact,
	      clientSelection: getClientSelection(_result.pageBorderBoxCenter, state.viewport.scroll.current),
	      scrollJumpRequest: _result.scrollJumpRequest
	    };
	  }

	  var home = getHomeLocation(state.critical);
	  var result = moveCrossAxis({
	    isMovingForward: isMovingForward,
	    pageBorderBoxCenter: state.current.page.borderBoxCenter,
	    draggableId: state.critical.draggable.id,
	    droppableId: droppable.descriptor.id,
	    home: home,
	    draggables: state.dimensions.draggables,
	    droppables: state.dimensions.droppables,
	    previousImpact: state.impact,
	    viewport: state.viewport
	  });

	  if (!result) {
	    return null;
	  }

	  return {
	    clientSelection: getClientSelection(result.pageBorderBoxCenter, state.viewport.scroll.current),
	    impact: result.impact,
	    scrollJumpRequest: null
	  };
	});

	var scrollViewport = (function (viewport, newScroll) {
	  var diff = subtract(newScroll, viewport.scroll.initial);
	  var displacement = negate(diff);
	  var frame = getRect({
	    top: newScroll.y,
	    bottom: newScroll.y + viewport.frame.height,
	    left: newScroll.x,
	    right: newScroll.x + viewport.frame.width
	  });
	  var updated = {
	    frame: frame,
	    scroll: {
	      initial: viewport.scroll.initial,
	      max: viewport.scroll.max,
	      current: newScroll,
	      diff: {
	        value: diff,
	        displacement: displacement
	      }
	    }
	  };
	  return updated;
	});

	var getHomeImpact = (function (critical, dimensions) {
	  var home = dimensions.droppables[critical.droppable.id];
	  var axis = home.axis;
	  var draggable = dimensions.draggables[critical.draggable.id];
	  return {
	    movement: {
	      displaced: [],
	      isBeyondStartPosition: false,
	      amount: patch(axis.line, draggable.client.marginBox[axis.size])
	    },
	    direction: axis.direction,
	    destination: getHomeLocation(critical)
	  };
	});

	var getPageItemPositions = (function (client, windowScroll) {
	  return {
	    selection: add(client.selection, windowScroll),
	    borderBoxCenter: add(client.borderBoxCenter, windowScroll),
	    offset: add(client.offset, windowScroll)
	  };
	});

	function isMovementAllowed(state) {
	  return state.phase === 'DRAGGING' || state.phase === 'COLLECTING';
	}

	var idle = {
	  phase: 'IDLE'
	};
	var preparing = {
	  phase: 'PREPARING'
	};

	var moveWithPositionUpdates = function moveWithPositionUpdates(_ref) {
	  var state = _ref.state,
	      clientSelection = _ref.clientSelection,
	      shouldAnimate = _ref.shouldAnimate,
	      viewport = _ref.viewport,
	      impact = _ref.impact,
	      scrollJumpRequest = _ref.scrollJumpRequest;
	  var newViewport = viewport || state.viewport;
	  var currentWindowScroll = newViewport.scroll.current;

	  var client = function () {
	    var offset = subtract(clientSelection, state.initial.client.selection);
	    return {
	      offset: offset,
	      selection: clientSelection,
	      borderBoxCenter: add(state.initial.client.borderBoxCenter, offset)
	    };
	  }();

	  var page = getPageItemPositions(client, currentWindowScroll);
	  var current = {
	    client: client,
	    page: page
	  };

	  if (state.phase === 'COLLECTING') {
	    return _extends({
	      phase: 'COLLECTING'
	    }, state, {
	      current: current
	    });
	  }

	  var newImpact = impact || getDragImpact({
	    pageBorderBoxCenter: page.borderBoxCenter,
	    draggable: state.dimensions.draggables[state.critical.draggable.id],
	    draggables: state.dimensions.draggables,
	    droppables: state.dimensions.droppables,
	    previousImpact: state.impact,
	    viewport: newViewport
	  });

	  var result = _extends({}, state, {
	    current: current,
	    shouldAnimate: shouldAnimate,
	    impact: newImpact,
	    scrollJumpRequest: scrollJumpRequest || null,
	    viewport: newViewport
	  });

	  return result;
	};

	var reducer = (function (state, action) {
	  if (state === void 0) {
	    state = idle;
	  }

	  if (action.type === 'CLEAN') {
	    return idle;
	  }

	  if (action.type === 'PREPARE') {
	    return preparing;
	  }

	  if (action.type === 'INITIAL_PUBLISH') {
	    !(state.phase === 'PREPARING') ? index(false, 'INITIAL_PUBLISH must come after a PREPARING phase') : void 0;
	    var _action$payload = action.payload,
	        critical = _action$payload.critical,
	        client = _action$payload.client,
	        viewport = _action$payload.viewport,
	        dimensions = _action$payload.dimensions,
	        autoScrollMode = _action$payload.autoScrollMode;
	    var initial = {
	      client: client,
	      page: {
	        selection: add(client.selection, viewport.scroll.initial),
	        borderBoxCenter: add(client.selection, viewport.scroll.initial),
	        offset: origin
	      }
	    };
	    var result = {
	      phase: 'DRAGGING',
	      isDragging: true,
	      critical: critical,
	      autoScrollMode: autoScrollMode,
	      dimensions: dimensions,
	      initial: initial,
	      current: initial,
	      impact: getHomeImpact(critical, dimensions),
	      viewport: viewport,
	      scrollJumpRequest: null,
	      shouldAnimate: false
	    };
	    return result;
	  }

	  if (action.type === 'COLLECTION_STARTING') {
	    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !(state.phase === 'DRAGGING') ? index(false, "Collection cannot start from phase " + state.phase) : void 0;

	    var _result = _extends({
	      phase: 'COLLECTING'
	    }, state, {
	      phase: 'COLLECTING'
	    });

	    return _result;
	  }

	  if (action.type === 'PUBLISH') {
	    !(state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') ? index(false, "Unexpected " + action.type + " received in phase " + state.phase) : void 0;
	    index(false, "Dynamic additions and removals of Draggable and Droppable components\n      is currently not supported. But will be soon!");
	  }

	  if (action.type === 'MOVE') {
	    if (state.phase === 'PREPARING') {
	      return state;
	    }

	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? index(false, action.type + " not permitted in phase " + state.phase) : void 0;
	    var _action$payload2 = action.payload,
	        _client = _action$payload2.client,
	        shouldAnimate = _action$payload2.shouldAnimate;

	    if (state.shouldAnimate === shouldAnimate && isEqual(_client, state.current.client.selection)) {
	      return state;
	    }

	    var impact = state.autoScrollMode === 'JUMP' ? state.impact : null;
	    return moveWithPositionUpdates({
	      state: state,
	      clientSelection: _client,
	      impact: impact,
	      shouldAnimate: shouldAnimate
	    });
	  }

	  if (action.type === 'UPDATE_DROPPABLE_SCROLL') {
	    var _extends2;

	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? index(false, action.type + " not permitted in phase " + state.phase) : void 0;
	    var _action$payload3 = action.payload,
	        id = _action$payload3.id,
	        offset = _action$payload3.offset;
	    var target = state.dimensions.droppables[id];

	    if (!target) {
	      return state;
	    }

	    var updated = scrollDroppable(target, offset);

	    var _dimensions = _extends({}, state.dimensions, {
	      droppables: _extends({}, state.dimensions.droppables, (_extends2 = {}, _extends2[id] = updated, _extends2))
	    });

	    var _impact = function () {
	      !isMovementAllowed(state) ? index(false) : void 0;

	      if (state.autoScrollMode === 'JUMP') {
	        return state.impact;
	      }

	      return getDragImpact({
	        pageBorderBoxCenter: state.current.page.borderBoxCenter,
	        draggable: _dimensions.draggables[state.critical.draggable.id],
	        draggables: _dimensions.draggables,
	        droppables: _dimensions.droppables,
	        previousImpact: state.impact,
	        viewport: state.viewport
	      });
	    }();

	    return _extends({
	      phase: 'DRAGGING'
	    }, state, {
	      phase: state.phase,
	      impact: _impact,
	      dimensions: _dimensions,
	      scrollJumpRequest: null
	    });
	  }

	  if (action.type === 'UPDATE_DROPPABLE_IS_ENABLED') {
	    var _extends3;

	    if (state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? index(false, "Attempting to move in an unsupported phase " + state.phase) : void 0;
	    var _action$payload4 = action.payload,
	        _id = _action$payload4.id,
	        isEnabled = _action$payload4.isEnabled;
	    var _target = state.dimensions.droppables[_id];

	    if (!_target) {
	      return state;
	    }

	    !(_target.isEnabled === isEnabled) ? index(false, "Trying to set droppable isEnabled to " + String(isEnabled) + " but it is already " + String(isEnabled)) : void 0;

	    var _updated = _extends({}, _target, {
	      isEnabled: isEnabled
	    });

	    var _dimensions2 = _extends({}, state.dimensions, {
	      droppables: _extends({}, state.dimensions.droppables, (_extends3 = {}, _extends3[_id] = _updated, _extends3))
	    });

	    var _impact2 = getDragImpact({
	      pageBorderBoxCenter: state.current.page.borderBoxCenter,
	      draggable: _dimensions2.draggables[state.critical.draggable.id],
	      draggables: _dimensions2.draggables,
	      droppables: _dimensions2.droppables,
	      previousImpact: state.impact,
	      viewport: state.viewport
	    });

	    return _extends({
	      phase: 'DRAGGING'
	    }, state, {
	      phase: state.phase,
	      impact: _impact2,
	      dimensions: _dimensions2
	    });
	  }

	  if (action.type === 'MOVE_BY_WINDOW_SCROLL') {
	    if (state.phase === 'DROP_PENDING' || state.phase === 'DROP_ANIMATING') {
	      return state;
	    }

	    !isMovementAllowed(state) ? index(false, "Cannot move by window in phase " + state.phase) : void 0;
	    var newScroll = action.payload.scroll;

	    if (isEqual(state.viewport.scroll.current, newScroll)) {
	      return state;
	    }

	    var isJumpScrolling = state.autoScrollMode === 'JUMP';

	    var _impact3 = isJumpScrolling ? state.impact : null;

	    var _viewport = scrollViewport(state.viewport, newScroll);

	    return moveWithPositionUpdates({
	      state: state,
	      clientSelection: state.current.client.selection,
	      viewport: _viewport,
	      shouldAnimate: false,
	      impact: _impact3
	    });
	  }

	  if (action.type === 'UPDATE_VIEWPORT_MAX_SCROLL') {
	    !state.isDragging ? index(false, 'Cannot update the max viewport scroll if not dragging') : void 0;
	    var existing = state.viewport;

	    var _viewport2 = _extends({}, existing, {
	      scroll: _extends({}, existing.scroll, {
	        max: action.payload
	      })
	    });

	    return _extends({
	      phase: 'DRAGGING'
	    }, state, {
	      phase: state.phase,
	      viewport: _viewport2
	    });
	  }

	  if (action.type === 'MOVE_UP' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_RIGHT') {
	    if (state.phase === 'COLLECTING' || state.phase === 'DROP_PENDING') {
	      return state;
	    }

	    !(state.phase === 'DRAGGING') ? index(false, action.type + " received while not in DRAGGING phase") : void 0;

	    var _result2 = moveInDirection({
	      state: state,
	      type: action.type
	    });

	    if (!_result2) {
	      return state;
	    }

	    return moveWithPositionUpdates({
	      state: state,
	      impact: _result2.impact,
	      clientSelection: _result2.clientSelection,
	      shouldAnimate: true,
	      scrollJumpRequest: _result2.scrollJumpRequest
	    });
	  }

	  if (action.type === 'DROP_PENDING') {
	    var reason = action.payload.reason;
	    !(state.phase === 'COLLECTING') ? index(false, 'Can only move into the DROP_PENDING phase from the COLLECTING phase') : void 0;

	    var newState = _extends({
	      phase: 'DROP_PENDING'
	    }, state, {
	      phase: 'DROP_PENDING',
	      isWaiting: true,
	      reason: reason
	    });

	    return newState;
	  }

	  if (action.type === 'DROP_ANIMATE') {
	    var pending = action.payload;
	    !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? index(false, "Cannot animate drop from phase " + state.phase) : void 0;
	    var _result3 = {
	      phase: 'DROP_ANIMATING',
	      pending: pending,
	      dimensions: state.dimensions
	    };
	    return _result3;
	  }

	  if (action.type === 'DROP_COMPLETE') {
	    return idle;
	  }

	  return state;
	});

	var lift = function lift(args) {
	  return {
	    type: 'LIFT',
	    payload: args
	  };
	};
	var initialPublish = function initialPublish(args) {
	  return {
	    type: 'INITIAL_PUBLISH',
	    payload: args
	  };
	};
	var publish = function publish(args) {
	  return {
	    type: 'PUBLISH',
	    payload: args
	  };
	};
	var collectionStarting = function collectionStarting() {
	  return {
	    type: 'COLLECTION_STARTING',
	    payload: null
	  };
	};
	var updateDroppableScroll = function updateDroppableScroll(args) {
	  return {
	    type: 'UPDATE_DROPPABLE_SCROLL',
	    payload: args
	  };
	};
	var updateDroppableIsEnabled = function updateDroppableIsEnabled(args) {
	  return {
	    type: 'UPDATE_DROPPABLE_IS_ENABLED',
	    payload: args
	  };
	};
	var move = function move(args) {
	  return {
	    type: 'MOVE',
	    payload: args
	  };
	};
	var moveByWindowScroll = function moveByWindowScroll(args) {
	  return {
	    type: 'MOVE_BY_WINDOW_SCROLL',
	    payload: args
	  };
	};
	var updateViewportMaxScroll = function updateViewportMaxScroll(max) {
	  return {
	    type: 'UPDATE_VIEWPORT_MAX_SCROLL',
	    payload: max
	  };
	};
	var moveUp = function moveUp() {
	  return {
	    type: 'MOVE_UP',
	    payload: null
	  };
	};
	var moveDown = function moveDown() {
	  return {
	    type: 'MOVE_DOWN',
	    payload: null
	  };
	};
	var moveRight = function moveRight() {
	  return {
	    type: 'MOVE_RIGHT',
	    payload: null
	  };
	};
	var moveLeft = function moveLeft() {
	  return {
	    type: 'MOVE_LEFT',
	    payload: null
	  };
	};
	var clean = function clean() {
	  return {
	    type: 'CLEAN',
	    payload: null
	  };
	};
	var prepare = function prepare() {
	  return {
	    type: 'PREPARE',
	    payload: null
	  };
	};
	var animateDrop = function animateDrop(pending) {
	  return {
	    type: 'DROP_ANIMATE',
	    payload: pending
	  };
	};
	var completeDrop = function completeDrop(result) {
	  return {
	    type: 'DROP_COMPLETE',
	    payload: result
	  };
	};
	var drop = function drop(args) {
	  return {
	    type: 'DROP',
	    payload: args
	  };
	};
	var dropPending = function dropPending(args) {
	  return {
	    type: 'DROP_PENDING',
	    payload: args
	  };
	};
	var dropAnimationFinished = function dropAnimationFinished() {
	  return {
	    type: 'DROP_ANIMATION_FINISHED',
	    payload: null
	  };
	};

	var lift$1 = (function (getMarshal) {
	  var timeoutId = null;

	  var tryAbortCriticalCollection = function tryAbortCriticalCollection() {
	    if (timeoutId == null) {
	      return;
	    }

	    clearTimeout(timeoutId);
	    timeoutId = null;
	  };

	  return function (_ref) {
	    var getState = _ref.getState,
	        dispatch = _ref.dispatch;
	    return function (next) {
	      return function (action) {
	        if (action.type === 'CLEAN') {
	          tryAbortCriticalCollection();
	          next(action);
	          return;
	        }

	        if (action.type !== 'LIFT') {
	          next(action);
	          return;
	        }

	        !!timeoutId ? index(false, 'There should not be a pending complete lift phase when a lift action is fired') : void 0;
	        var marshal = getMarshal();
	        var _action$payload = action.payload,
	            id = _action$payload.id,
	            client = _action$payload.client,
	            autoScrollMode = _action$payload.autoScrollMode,
	            viewport = _action$payload.viewport;
	        var initial = getState();

	        if (initial.phase === 'DROP_ANIMATING') {
	          dispatch(completeDrop(initial.pending.result));
	        }

	        var postFlushState = getState();
	        !(postFlushState.phase === 'IDLE') ? index(false, 'Incorrect phase to start a drag') : void 0;
	        dispatch(prepare());
	        timeoutId = setTimeout(function () {
	          timeoutId = null;
	          var state = getState();
	          !(state.phase === 'PREPARING') ? index(false, 'Invalid phase for completing lift') : void 0;
	          var scrollOptions = {
	            shouldPublishImmediately: autoScrollMode === 'JUMP'
	          };
	          var request = {
	            draggableId: id,
	            scrollOptions: scrollOptions
	          };

	          var _marshal$startPublish = marshal.startPublishing(request, viewport.scroll.current),
	              critical = _marshal$startPublish.critical,
	              dimensions = _marshal$startPublish.dimensions;

	          dispatch(initialPublish({
	            critical: critical,
	            dimensions: dimensions,
	            client: client,
	            autoScrollMode: autoScrollMode,
	            viewport: viewport
	          }));
	        });
	      };
	    };
	  };
	});

	var style = (function (marshal) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type === 'INITIAL_PUBLISH' || action.type === 'PUBLISH') {
	          marshal.dragging();
	        }

	        if (action.type === 'COLLECTION_STARTING') {
	          marshal.collecting();
	        }

	        if (action.type === 'DROP_ANIMATE') {
	          marshal.dropping(action.payload.result.reason);
	        }

	        if (action.type === 'CLEAN' || action.type === 'DROP_COMPLETE') {
	          marshal.resting();
	        }

	        next(action);
	      };
	    };
	  };
	});

	var getNewHomeClientBorderBoxCenter = (function (_ref) {
	  var movement = _ref.movement,
	      draggable = _ref.draggable,
	      draggables = _ref.draggables,
	      destination = _ref.destination;
	  var originalCenter = draggable.client.borderBox.center;

	  if (destination == null) {
	    return originalCenter;
	  }

	  var displaced = movement.displaced,
	      isBeyondStartPosition = movement.isBeyondStartPosition;
	  var axis = destination.axis;
	  var isWithinHomeDroppable = destination.descriptor.id === draggable.descriptor.droppableId;

	  if (isWithinHomeDroppable && !displaced.length) {
	    return originalCenter;
	  }

	  var draggablesInDestination = getDraggablesInsideDroppable(destination, draggables);

	  var movingRelativeTo = function () {
	    if (isWithinHomeDroppable) {
	      return draggables[displaced[0].draggableId].client.borderBox;
	    }

	    if (displaced.length) {
	      return draggables[displaced[0].draggableId].client.borderBox;
	    }

	    if (draggablesInDestination.length) {
	      return draggablesInDestination[draggablesInDestination.length - 1].client.marginBox;
	    }

	    return destination.client.contentBox;
	  }();

	  var _ref2 = function () {
	    if (isWithinHomeDroppable) {
	      if (isBeyondStartPosition) {
	        return {
	          sourceEdge: 'end',
	          destinationEdge: 'end'
	        };
	      }

	      return {
	        sourceEdge: 'start',
	        destinationEdge: 'start'
	      };
	    }

	    if (!displaced.length && draggablesInDestination.length) {
	      return {
	        sourceEdge: 'start',
	        destinationEdge: 'end'
	      };
	    }

	    return {
	      sourceEdge: 'start',
	      destinationEdge: 'start'
	    };
	  }(),
	      sourceEdge = _ref2.sourceEdge,
	      destinationEdge = _ref2.destinationEdge;

	  var source = draggable.client.borderBox;
	  var targetCenter = moveToEdge({
	    source: source,
	    sourceEdge: sourceEdge,
	    destination: movingRelativeTo,
	    destinationEdge: destinationEdge,
	    destinationAxis: axis
	  });
	  return targetCenter;
	});

	var getScrollDisplacement = function getScrollDisplacement(droppable, viewport) {
	  return withDroppableDisplacement(droppable, viewport.scroll.diff.displacement);
	};

	var drop$1 = (function (_ref) {
	  var getState = _ref.getState,
	      dispatch = _ref.dispatch;
	  return function (next) {
	    return function (action) {
	      if (action.type !== 'DROP') {
	        next(action);
	        return;
	      }

	      var state = getState();
	      var reason = action.payload.reason;

	      if (state.phase === 'COLLECTING') {
	        dispatch(dropPending({
	          reason: reason
	        }));
	        return;
	      }

	      if (state.phase === 'PREPARING') {
	        dispatch(clean());
	        return;
	      }

	      if (state.phase === 'IDLE') {
	        return;
	      }

	      var isWaitingForDrop = state.phase === 'DROP_PENDING' && state.isWaiting;
	      !!isWaitingForDrop ? index(false, 'A DROP action occurred while DROP_PENDING and still waiting') : void 0;
	      !(state.phase === 'DRAGGING' || state.phase === 'DROP_PENDING') ? index(false, "Cannot drop in phase: " + state.phase) : void 0;
	      var critical = state.critical;
	      var dimensions = state.dimensions;
	      var impact = reason === 'DROP' ? state.impact : noImpact;
	      var home = dimensions.droppables[state.critical.droppable.id];
	      var draggable = dimensions.draggables[state.critical.draggable.id];
	      var droppable = impact && impact.destination ? dimensions.droppables[impact.destination.droppableId] : null;
	      var source = {
	        index: critical.draggable.index,
	        droppableId: critical.droppable.id
	      };
	      var destination = reason === 'DROP' ? impact.destination : null;
	      var result = {
	        draggableId: draggable.descriptor.id,
	        type: home.descriptor.type,
	        source: source,
	        destination: destination,
	        reason: reason
	      };

	      var clientOffset = function () {
	        if (reason === 'CANCEL') {
	          return origin;
	        }

	        var newBorderBoxClientCenter = getNewHomeClientBorderBoxCenter({
	          movement: impact.movement,
	          draggable: draggable,
	          draggables: dimensions.draggables,
	          destination: droppable
	        });
	        return subtract(newBorderBoxClientCenter, draggable.client.borderBox.center);
	      }();

	      var newHomeOffset = add(clientOffset, getScrollDisplacement(droppable || home, state.viewport));
	      var isAnimationRequired = !isEqual(state.current.client.offset, newHomeOffset);
	      var pending = {
	        newHomeOffset: newHomeOffset,
	        result: result,
	        impact: impact
	      };

	      if (isAnimationRequired) {
	        dispatch(animateDrop(pending));
	        return;
	      }

	      dispatch(completeDrop(result));
	    };
	  };
	});

	var onDragStart = function onDragStart(start) {
	  return "\n  You have lifted an item in position " + (start.source.index + 1) + ".\n  Use the arrow keys to move, space bar to drop, and escape to cancel.\n";
	};

	var onDragUpdate = function onDragUpdate(update) {
	  if (!update.destination) {
	    return 'You are currently not dragging over a droppable area';
	  }

	  if (update.source.droppableId === update.destination.droppableId) {
	    return "You have moved the item to position " + (update.destination.index + 1);
	  }

	  return "\n    You have moved the item from list " + update.source.droppableId + " in position " + (update.source.index + 1) + "\n    to list " + update.destination.droppableId + " in position " + (update.destination.index + 1) + "\n  ";
	};

	var onDragEnd = function onDragEnd(result) {
	  if (result.reason === 'CANCEL') {
	    return "\n      Movement cancelled.\n      The item has returned to its starting position of " + (result.source.index + 1) + "\n    ";
	  }

	  if (!result.destination) {
	    return "\n      The item has been dropped while not over a droppable location.\n      The item has returned to its starting position of " + (result.source.index + 1) + "\n    ";
	  }

	  if (result.source.droppableId === result.destination.droppableId) {
	    if (result.source.index === result.destination.index) {
	      return "\n        You have dropped the item.\n        It has been dropped on its starting position of " + (result.source.index + 1) + "\n      ";
	    }

	    return "\n      You have dropped the item.\n      It has moved from position " + (result.source.index + 1) + " to " + (result.destination.index + 1) + "\n    ";
	  }

	  return "\n    You have dropped the item.\n    It has moved from position " + (result.source.index + 1) + " in list " + result.source.droppableId + "\n    to position " + (result.destination.index + 1) + " in list " + result.destination.droppableId + "\n  ";
	};

	var preset = {
	  onDragStart: onDragStart,
	  onDragUpdate: onDragUpdate,
	  onDragEnd: onDragEnd
	};

	var records = {};
	var flag = '__react-beautiful-dnd-debug-timings-hook__';

	var isTimingsEnabled = function isTimingsEnabled() {
	  return Boolean(window[flag]);
	};

	var start = function start(key) {
	  {
	    if (!isTimingsEnabled()) {
	      return;
	    }

	    var now = performance.now();
	    records[key] = now;
	  }
	};
	var finish = function finish(key) {
	  {
	    if (!isTimingsEnabled()) {
	      return;
	    }

	    var now = performance.now();
	    var previous = records[key];
	    !previous ? index(false, 'cannot finish timing as no previous time found') : void 0;
	    var result = now - previous;
	    var rounded = result.toFixed(2);

	    var style = function () {
	      if (result < 16) {
	        return {
	          textColor: 'green',
	          symbol: '✅'
	        };
	      }

	      if (result < 40) {
	        return {
	          textColor: 'orange',
	          symbol: '⚠️'
	        };
	      }

	      return {
	        textColor: 'red',
	        symbol: '❌'
	      };
	    }();

	    console.log(style.symbol + " %cTiming %c" + rounded + " %cms %c" + key, 'color: blue; font-weight: bold; ', "color: " + style.textColor + "; font-size: 1.1em;", 'color: grey;', 'color: purple; font-weight: bold;');
	  }
	};

	var withTimings = function withTimings(key, fn) {
	  start(key);
	  fn();
	  finish(key);
	};

	var areLocationsEqual = function areLocationsEqual(first, second) {
	  if (first == null && second == null) {
	    return true;
	  }

	  if (first == null || second == null) {
	    return false;
	  }

	  return first.droppableId === second.droppableId && first.index === second.index;
	};

	var isCriticalEqual = function isCriticalEqual(first, second) {
	  if (first === second) {
	    return true;
	  }

	  var isDraggableEqual = first.draggable.id === second.draggable.id && first.draggable.droppableId === second.draggable.droppableId && first.draggable.type === second.draggable.type && first.draggable.index === second.draggable.index;
	  var isDroppableEqual = first.droppable.id === second.droppable.id && first.droppable.type === second.droppable.type;
	  return isDraggableEqual && isDroppableEqual;
	};

	var getExpiringAnnounce = function getExpiringAnnounce(announce) {
	  var wasCalled = false;
	  var isExpired = false;
	  setTimeout(function () {
	    isExpired = true;
	  });

	  var result = function result(message) {
	    if (wasCalled) {
	      {
	        console.warn('Announcement already made. Not making a second announcement');
	      }

	      return;
	    }

	    if (isExpired) {
	      {
	        console.warn("\n          Announcements cannot be made asynchronously.\n          Default message has already been announced.\n        ");
	      }

	      return;
	    }

	    wasCalled = true;
	    announce(message);
	  };

	  result.wasCalled = function () {
	    return wasCalled;
	  };

	  return result;
	};

	var getDragStart = function getDragStart(critical) {
	  return {
	    draggableId: critical.draggable.id,
	    type: critical.droppable.type,
	    source: {
	      droppableId: critical.droppable.id,
	      index: critical.draggable.index
	    }
	  };
	};

	var hooks = (function (getHooks, announce) {
	  var execute = function execute(hook, data, getDefaultMessage) {
	    if (!hook) {
	      announce(getDefaultMessage(data));
	      return;
	    }

	    var willExpire = getExpiringAnnounce(announce);
	    var provided = {
	      announce: willExpire
	    };
	    hook(data, provided);

	    if (!willExpire.wasCalled()) {
	      announce(getDefaultMessage(data));
	    }
	  };

	  var publisher = function () {
	    var lastLocation = null;
	    var lastCritical = null;
	    var _isDragStartPublished = false;

	    var start$$1 = function start$$1(critical) {
	      !!_isDragStartPublished ? index(false, 'Cannot fire onDragStart as a drag start has already been published') : void 0;
	      var data = getDragStart(critical);
	      _isDragStartPublished = true;
	      lastCritical = critical;
	      lastLocation = data.source;
	      withTimings('onDragStart', function () {
	        return execute(getHooks().onDragStart, data, preset.onDragStart);
	      });
	    };

	    var move = function move(critical, location) {
	      !(_isDragStartPublished && lastCritical) ? index(false, 'Cannot fire onDragMove when onDragStart has not been called') : void 0;
	      var hasCriticalChanged = !isCriticalEqual(critical, lastCritical);

	      if (hasCriticalChanged) {
	        lastCritical = critical;
	      }

	      var hasLocationChanged = !areLocationsEqual(lastLocation, location);

	      if (hasLocationChanged) {
	        lastLocation = location;
	      }

	      if (!hasCriticalChanged && !hasLocationChanged) {
	        return;
	      }

	      var data = _extends({}, getDragStart(critical), {
	        destination: location
	      });

	      withTimings('onDragUpdate', function () {
	        return execute(getHooks().onDragUpdate, data, preset.onDragUpdate);
	      });
	    };

	    var drop = function drop(result) {
	      !_isDragStartPublished ? index(false, 'Cannot fire onDragEnd when there is no matching onDragStart') : void 0;
	      _isDragStartPublished = false;
	      lastLocation = null;
	      lastCritical = null;
	      withTimings('onDragEnd', function () {
	        return execute(getHooks().onDragEnd, result, preset.onDragEnd);
	      });
	    };

	    var abort = function abort() {
	      !(_isDragStartPublished && lastCritical) ? index(false, 'Cannot cancel when onDragStart not fired') : void 0;

	      var result = _extends({}, getDragStart(lastCritical), {
	        destination: null,
	        reason: 'CANCEL'
	      });

	      drop(result);
	    };

	    return {
	      start: start$$1,
	      move: move,
	      drop: drop,
	      abort: abort,
	      isDragStartPublished: function isDragStartPublished() {
	        return _isDragStartPublished;
	      }
	    };
	  }();

	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (action.type === 'INITIAL_PUBLISH') {
	          var critical = action.payload.critical;
	          publisher.start(critical);
	          next(action);
	          return;
	        }

	        if (action.type === 'DROP_COMPLETE') {
	          var result = action.payload;
	          publisher.drop(result);
	          next(action);
	          return;
	        }

	        if (action.type === 'CLEAN') {
	          if (publisher.isDragStartPublished()) {
	            publisher.abort();
	          }

	          next(action);
	          return;
	        }

	        if (!publisher.isDragStartPublished()) {
	          next(action);
	          return;
	        }

	        next(action);
	        var state = store.getState();

	        if (state.phase === 'DRAGGING') {
	          publisher.move(state.critical, state.impact.destination);
	        }
	      };
	    };
	  };
	});

	var dropAnimationFinish = (function (store) {
	  return function (next) {
	    return function (action) {
	      if (action.type !== 'DROP_ANIMATION_FINISHED') {
	        next(action);
	        return;
	      }

	      var state = store.getState();
	      !(state.phase === 'DROP_ANIMATING') ? index(false, 'Cannot finish a drop animating when no drop is occurring') : void 0;
	      store.dispatch(completeDrop(state.pending.result));
	    };
	  };
	});

	var dimensionMarshalStopper = (function (getMarshal) {
	  return function () {
	    return function (next) {
	      return function (action) {
	        if (action.type === 'DROP_COMPLETE' || action.type === 'CLEAN' || action.type === 'DROP_ANIMATE') {
	          var marshal = getMarshal();
	          marshal.stopPublishing();
	        }

	        next(action);
	      };
	    };
	  };
	});

	var shouldCancel = function shouldCancel(action) {
	  return action.type === 'CANCEL' || action.type === 'DROP_ANIMATE' || action.type === 'DROP' || action.type === 'DROP_COMPLETE' || action.type === 'COLLECTION_STARTING';
	};

	var autoScroll = (function (getScroller) {
	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (shouldCancel(action)) {
	          getScroller().cancel();
	          next(action);
	          return;
	        }

	        next(action);
	        var state = store.getState();

	        if (state.phase !== 'DRAGGING') {
	          return;
	        }

	        if (state.autoScrollMode === 'FLUID') {
	          getScroller().fluidScroll(state);
	          return;
	        }

	        if (!state.scrollJumpRequest) {
	          return;
	        }

	        getScroller().jumpScroll(state);
	      };
	    };
	  };
	});

	var shouldCheckOnAction = function shouldCheckOnAction(action) {
	  return action.type === 'MOVE' || action.type === 'MOVE_UP' || action.type === 'MOVE_RIGHT' || action.type === 'MOVE_DOWN' || action.type === 'MOVE_LEFT' || action.type === 'MOVE_BY_WINDOW_SCROLL';
	};

	var hasDroppableOverChanged = function hasDroppableOverChanged(previous, current) {
	  if (!previous) {
	    return Boolean(current);
	  }

	  if (!current) {
	    return Boolean(previous);
	  }

	  return previous.droppableId !== current.droppableId;
	};

	var getNewMaxScroll = function getNewMaxScroll(previous, current, action) {
	  if (!shouldCheckOnAction(action)) {
	    return null;
	  }

	  if (!isMovementAllowed(previous) || !isMovementAllowed(current)) {
	    return null;
	  }

	  if (!hasDroppableOverChanged(previous.impact.destination, current.impact.destination)) {
	    return null;
	  }

	  var viewport = current.viewport;
	  var doc = document.documentElement;
	  !doc ? index(false, 'Could not find document.documentElement') : void 0;
	  var maxScroll = getMaxScroll({
	    scrollHeight: doc.scrollHeight,
	    scrollWidth: doc.scrollWidth,
	    width: viewport.frame.width,
	    height: viewport.frame.height
	  });

	  if (isEqual(maxScroll, viewport.scroll.max)) {
	    return null;
	  }

	  return maxScroll;
	};

	var maxScrollUpdater = (function (store) {
	  return function (next) {
	    return function (action) {
	      var previous = store.getState();
	      next(action);
	      var current = store.getState();
	      var maxScroll = getNewMaxScroll(previous, current, action);

	      if (maxScroll) {
	        next(updateViewportMaxScroll(maxScroll));
	      }
	    };
	  };
	});

	var composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
	var createStore$1 = (function (_ref) {
	  var getDimensionMarshal = _ref.getDimensionMarshal,
	      styleMarshal = _ref.styleMarshal,
	      getHooks = _ref.getHooks,
	      announce = _ref.announce,
	      getScroller = _ref.getScroller;
	  return createStore(reducer, composeEnhancers(applyMiddleware(style(styleMarshal), dimensionMarshalStopper(getDimensionMarshal), lift$1(getDimensionMarshal), drop$1, dropAnimationFinish, maxScrollUpdater, autoScroll(getScroller), hooks(getHooks, announce))));
	});

	var getEmptyMap = function getEmptyMap() {
	  return {
	    draggables: {},
	    droppables: {}
	  };
	};

	var timingKey = 'Publish collection from DOM';
	var createPublisher = (function (_ref) {
	  var getProvided = _ref.getProvided,
	      callbacks = _ref.callbacks;

	  var advancedUsageWarning = function () {

	    var hasAnnounced = false;
	    return function () {
	      if (hasAnnounced) {
	        return;
	      }

	      hasAnnounced = true;

	      console.warn("\n        Advanced usage warning: you are adding or removing a dimension during a drag\n        This an advanced feature used to support dynamic interactions such as lazy loading lists.\n\n        Keep in mind the following restrictions:\n\n        - Draggable's can only be added to Droppable's that are scroll containers\n        - Adding a Droppable cannot impact the placement of other Droppables\n          (it cannot push a Droppable on the page)\n\n        (This warning will be stripped in production builds)\n      ".trim());
	    };
	  }();

	  var additions = getEmptyMap();
	  var removals = getEmptyMap();
	  var frameId = null;

	  var reset = function reset() {
	    additions = getEmptyMap();
	    removals = getEmptyMap();
	  };

	  var collect = function collect() {
	    advancedUsageWarning();

	    if (frameId) {
	      return;
	    }

	    frameId = requestAnimationFrame(function () {
	      frameId = null;
	      callbacks.collectionStarting();
	      start(timingKey);

	      var _getProvided = getProvided(),
	          entries = _getProvided.entries,
	          collection = _getProvided.collection;

	      var windowScroll = collection.initialWindowScroll;

	      var draggables = keys$1(additions.draggables).map(function (id) {
	        return entries.draggables[id].getDimension(windowScroll);
	      });

	      var droppables = keys$1(additions.droppables).map(function (id) {
	        return entries.droppables[id].callbacks.getDimensionAndWatchScroll(windowScroll, collection.scrollOptions);
	      });

	      var result = {
	        additions: {
	          draggables: draggables,
	          droppables: droppables
	        },
	        removals: {
	          draggables: keys$1(removals.draggables),
	          droppables: keys$1(removals.droppables)
	        }
	      };
	      reset();
	      finish(timingKey);
	      callbacks.publish(result);
	    });
	  };

	  var addDraggable = function addDraggable(id) {
	    additions.draggables[id] = true;

	    if (removals.draggables[id]) {
	      delete removals.draggables[id];
	    }

	    collect();
	  };

	  var removeDraggable = function removeDraggable(id) {
	    removals.draggables[id] = true;

	    if (additions.draggables[id]) {
	      delete additions.draggables[id];
	    }

	    collect();
	  };

	  var addDroppable = function addDroppable(id) {
	    additions.droppables[id] = true;

	    if (removals.droppables[id]) {
	      delete removals.droppables[id];
	    }

	    collect();
	  };

	  var removeDroppable = function removeDroppable(id) {
	    removals.droppables[id] = true;

	    if (additions.droppables[id]) {
	      delete additions.droppables[id];
	    }

	    collect();
	  };

	  var stop = function stop() {
	    if (!frameId) {
	      return;
	    }

	    cancelAnimationFrame(frameId);
	    frameId = null;
	    reset();
	  };

	  return {
	    addDraggable: addDraggable,
	    removeDraggable: removeDraggable,
	    addDroppable: addDroppable,
	    removeDroppable: removeDroppable,
	    stop: stop
	  };
	});

	var createDimensionMarshal = (function (callbacks) {
	  var entries = {
	    droppables: {},
	    draggables: {}
	  };
	  var collection = null;
	  var publisher = createPublisher({
	    callbacks: {
	      publish: callbacks.publish,
	      collectionStarting: callbacks.collectionStarting
	    },
	    getProvided: function getProvided() {
	      !collection ? index(false, 'Cannot get scroll options when there is no collection') : void 0;
	      return {
	        entries: entries,
	        collection: collection
	      };
	    }
	  });

	  var registerDraggable = function registerDraggable(descriptor, getDimension) {
	    var entry = {
	      descriptor: descriptor,
	      getDimension: getDimension
	    };
	    entries.draggables[descriptor.id] = entry;

	    if (!collection) {
	      return;
	    }

	    if (collection.critical.draggable.type !== descriptor.type) {
	      return;
	    }

	    publisher.addDraggable(descriptor.id);
	  };

	  var updateDraggable = function updateDraggable(previous, descriptor, getDimension) {
	    !entries.draggables[previous.id] ? index(false, 'Cannot update draggable registration as no previous registration was found') : void 0;
	    delete entries.draggables[previous.id];
	    var entry = {
	      descriptor: descriptor,
	      getDimension: getDimension
	    };
	    entries.draggables[descriptor.id] = entry;
	  };

	  var unregisterDraggable = function unregisterDraggable(descriptor) {
	    var entry = entries.draggables[descriptor.id];
	    !entry ? index(false, "Cannot unregister Draggable with id " + descriptor.id + " as it is not registered") : void 0;

	    if (entry.descriptor !== descriptor) {
	      return;
	    }

	    delete entries.draggables[descriptor.id];

	    if (!collection) {
	      return;
	    }

	    !(collection.critical.draggable.id !== descriptor.id) ? index(false, 'Cannot remove the dragging item during a drag') : void 0;

	    if (descriptor.type !== collection.critical.draggable.type) {
	      return;
	    }

	    publisher.removeDraggable(descriptor.id);
	  };

	  var registerDroppable = function registerDroppable(descriptor, droppableCallbacks) {
	    var id = descriptor.id;
	    entries.droppables[id] = {
	      descriptor: descriptor,
	      callbacks: droppableCallbacks
	    };

	    if (!collection) {
	      return;
	    }

	    if (descriptor.type !== collection.critical.droppable.type) {
	      return;
	    }

	    publisher.addDroppable(id);
	  };

	  var updateDroppable = function updateDroppable(previous, descriptor, droppableCallbacks) {
	    !entries.droppables[previous.id] ? index(false, 'Cannot update droppable registration as no previous registration was found') : void 0;
	    delete entries.droppables[previous.id];
	    var entry = {
	      descriptor: descriptor,
	      callbacks: droppableCallbacks
	    };
	    entries.droppables[descriptor.id] = entry;

	    if (collection) {
	      index(false, 'You are not able to update the id or type of a droppable during a drag');
	    }
	  };

	  var unregisterDroppable = function unregisterDroppable(descriptor) {
	    var entry = entries.droppables[descriptor.id];
	    !entry ? index(false, "Cannot unregister Droppable with id " + descriptor.id + " as as it is not registered") : void 0;

	    if (entry.descriptor !== descriptor) {
	      return;
	    }

	    delete entries.droppables[descriptor.id];

	    if (!collection) {
	      return;
	    }

	    !(collection.critical.droppable.id !== descriptor.id) ? index(false, 'Cannot remove the home Droppable during a drag') : void 0;

	    if (collection.critical.droppable.type !== descriptor.type) {
	      return;
	    }

	    publisher.removeDroppable(descriptor.id);
	  };

	  var updateDroppableIsEnabled = function updateDroppableIsEnabled(id, isEnabled) {
	    !entries.droppables[id] ? index(false, "Cannot update the scroll on Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    callbacks.updateDroppableIsEnabled({
	      id: id,
	      isEnabled: isEnabled
	    });
	  };

	  var updateDroppableScroll = function updateDroppableScroll(id, newScroll) {
	    !entries.droppables[id] ? index(false, "Cannot update the scroll on Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    callbacks.updateDroppableScroll({
	      id: id,
	      offset: newScroll
	    });
	  };

	  var scrollDroppable = function scrollDroppable(id, change) {
	    var entry = entries.droppables[id];
	    !entry ? index(false, "Cannot scroll Droppable " + id + " as it is not registered") : void 0;

	    if (!collection) {
	      return;
	    }

	    entry.callbacks.scroll(change);
	  };

	  var getInitialPublish = function getInitialPublish(args) {
	    var critical = args.critical,
	        scrollOptions = args.scrollOptions,
	        windowScroll = args.initialWindowScroll;
	    var timingKey = 'Initial collection from DOM';
	    start(timingKey);
	    var home = critical.droppable;

	    var droppables = keys$1(entries.droppables).map(function (id) {
	      return entries.droppables[id];
	    }).filter(function (entry) {
	      return entry.descriptor.type === home.type;
	    }).map(function (entry) {
	      return entry.callbacks.getDimensionAndWatchScroll(windowScroll, scrollOptions);
	    }).reduce(function (previous, dimension) {
	      previous[dimension.descriptor.id] = dimension;
	      return previous;
	    }, {});

	    var draggables = keys$1(entries.draggables).map(function (id) {
	      return entries.draggables[id];
	    }).filter(function (entry) {
	      return entry.descriptor.type === critical.draggable.type;
	    }).map(function (entry) {
	      return entry.getDimension(windowScroll);
	    }).reduce(function (previous, dimension) {
	      previous[dimension.descriptor.id] = dimension;
	      return previous;
	    }, {});

	    finish(timingKey);
	    var dimensions = {
	      draggables: draggables,
	      droppables: droppables
	    };
	    var result = {
	      dimensions: dimensions,
	      critical: critical
	    };
	    return result;
	  };

	  var stopPublishing = function stopPublishing() {
	    if (!collection) {
	      return;
	    }

	    publisher.stop();
	    var home = collection.critical.droppable;

	    keys$1(entries.droppables).filter(function (id) {
	      return entries.droppables[id].descriptor.type === home.type;
	    }).forEach(function (id) {
	      return entries.droppables[id].callbacks.unwatchScroll();
	    });

	    collection = null;
	  };

	  var startPublishing = function startPublishing(request, windowScroll) {
	    !!collection ? index(false, 'Cannot start capturing critical dimensions as there is already a collection') : void 0;
	    var entry = entries.draggables[request.draggableId];
	    !entry ? index(false, 'Cannot find critical draggable entry') : void 0;
	    var home = entries.droppables[entry.descriptor.droppableId];
	    !home ? index(false, 'Cannot find critical droppable entry') : void 0;
	    var critical = {
	      draggable: entry.descriptor,
	      droppable: home.descriptor
	    };
	    collection = {
	      scrollOptions: request.scrollOptions,
	      critical: critical,
	      initialWindowScroll: windowScroll
	    };
	    return getInitialPublish(collection);
	  };

	  var marshal = {
	    registerDraggable: registerDraggable,
	    updateDraggable: updateDraggable,
	    unregisterDraggable: unregisterDraggable,
	    registerDroppable: registerDroppable,
	    updateDroppable: updateDroppable,
	    unregisterDroppable: unregisterDroppable,
	    updateDroppableIsEnabled: updateDroppableIsEnabled,
	    scrollDroppable: scrollDroppable,
	    updateDroppableScroll: updateDroppableScroll,
	    startPublishing: startPublishing,
	    stopPublishing: stopPublishing
	  };
	  return marshal;
	});

	var physics = function () {
	  var base = {
	    stiffness: 1000,
	    damping: 60,
	    precision: 0.99
	  };

	  var standard = _extends({}, base);

	  var fast = _extends({}, base, {
	    stiffness: base.stiffness * 2
	  });

	  return {
	    standard: standard,
	    fast: fast
	  };
	}();
	var css = {
	  outOfTheWay: 'transform 0.2s cubic-bezier(0.2, 0, 0, 1)'
	};

	var prefix$1 = 'data-react-beautiful-dnd';
	var dragHandle = prefix$1 + "-drag-handle";
	var draggable = prefix$1 + "-draggable";
	var droppable = prefix$1 + "-droppable";

	var getStyles = (function (styleContext) {
	  var dragHandleSelector = "[" + dragHandle + "=\"" + styleContext + "\"]";
	  var draggableSelector = "[" + draggable + "=\"" + styleContext + "\"]";
	  var droppableSelector = "[" + droppable + "=\"" + styleContext + "\"]";
	  var dragHandleStyles = {
	    base: "\n      " + dragHandleSelector + " {\n        -webkit-touch-callout: none;\n        -webkit-tap-highlight-color: rgba(0,0,0,0);\n        touch-action: manipulation;\n      }\n    ",
	    grabCursor: "\n      " + dragHandleSelector + " {\n        cursor: -webkit-grab;\n        cursor: grab;\n      }\n    ",
	    blockPointerEvents: "\n      " + dragHandleSelector + " {\n        pointer-events: none;\n      }\n    "
	  };
	  var draggableStyles = {
	    animateMovement: "\n      " + draggableSelector + " {\n        transition: " + css.outOfTheWay + ";\n      }\n    "
	  };
	  var droppableStyles = {
	    base: "\n      " + droppableSelector + " {\n        overflow-anchor: none;\n      }\n    "
	  };
	  var bodyStyles = {
	    whileActiveDragging: "\n      body {\n        cursor: grabbing;\n        cursor: -webkit-grabbing;\n        user-select: none;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n      }\n    "
	  };
	  var base = [dragHandleStyles.base, droppableStyles.base];
	  var resting = base.concat([dragHandleStyles.grabCursor]);
	  var collecting = base.concat([dragHandleStyles.blockPointerEvents, bodyStyles.whileActiveDragging]);
	  var dragging = collecting.concat([draggableStyles.animateMovement]);
	  var dropAnimating = base.concat([dragHandleStyles.grabCursor, draggableStyles.animateMovement]);
	  var userCancel = base.concat([draggableStyles.animateMovement]);
	  return {
	    resting: resting.join(''),
	    dragging: dragging.join(''),
	    dropAnimating: dropAnimating.join(''),
	    collecting: collecting.join(''),
	    userCancel: userCancel.join('')
	  };
	});

	var count = 0;
	var resetStyleContext = function resetStyleContext() {
	  count = 0;
	};

	var getHead = function getHead() {
	  var head = document.querySelector('head');
	  !head ? index(false, 'Cannot find the head to append a style to') : void 0;
	  return head;
	};

	var createStyleMarshal = (function () {
	  var context = "" + count++;
	  var styles = getStyles(context);
	  var el = null;
	  var setStyle = index$1(function (proposed) {
	    !el ? index(false, 'Cannot set style of style tag if not mounted') : void 0;
	    el.innerHTML = proposed;
	  });

	  var mount = function mount() {
	    !!el ? index(false, 'Style marshal already mounted') : void 0;
	    el = document.createElement('style');
	    el.type = 'text/css';
	    el.setAttribute(prefix$1, context);
	    getHead().appendChild(el);
	    setStyle(styles.resting);
	  };

	  var collecting = function collecting() {
	    return setStyle(styles.collecting);
	  };

	  var dragging = function dragging() {
	    return setStyle(styles.dragging);
	  };

	  var dropping = function dropping(reason) {
	    if (reason === 'DROP') {
	      setStyle(styles.dropAnimating);
	      return;
	    }

	    setStyle(styles.userCancel);
	  };

	  var resting = function resting() {
	    return setStyle(styles.resting);
	  };

	  var unmount = function unmount() {
	    !el ? index(false, 'Cannot unmount style marshal as it is already unmounted') : void 0;
	    getHead().removeChild(el);
	    el = null;
	  };

	  var marshal = {
	    collecting: collecting,
	    dragging: dragging,
	    dropping: dropping,
	    resting: resting,
	    styleContext: context,
	    mount: mount,
	    unmount: unmount
	  };
	  return marshal;
	});

	var canStartDrag = (function (state, id) {
	  if (state.phase === 'IDLE') {
	    return true;
	  }

	  if (state.phase !== 'DROP_ANIMATING') {
	    return false;
	  }

	  if (state.pending.result.draggableId === id) {
	    return false;
	  }

	  return state.pending.result.reason === 'DROP';
	});

	var scrollWindow = (function (change) {
	  window.scrollBy(change.x, change.y);
	});

	var count$1 = 0;
	var visuallyHidden = {
	  position: 'absolute',
	  width: '1px',
	  height: '1px',
	  margin: '-1px',
	  border: '0',
	  padding: '0',
	  overflow: 'hidden',
	  clip: 'rect(0 0 0 0)',
	  'clip-path': 'inset(100%)'
	};

	var getBody = function getBody() {
	  !document.body ? index(false, 'Announcer cannot find document.body') : void 0;
	  return document.body;
	};

	var createAnnouncer = (function () {
	  var id = "react-beautiful-dnd-announcement-" + count$1++;
	  var el = null;

	  var announce = function announce(message) {
	    !el ? index(false, 'Cannot announce to unmounted node') : void 0;
	    el.textContent = message;
	  };

	  var mount = function mount() {
	    !!el ? index(false, 'Announcer already mounted') : void 0;
	    el = document.createElement('div');
	    el.id = id;
	    el.setAttribute('aria-live', 'assertive');
	    el.setAttribute('role', 'log');
	    el.setAttribute('aria-atomic', 'true');

	    assign$1(el.style, visuallyHidden);

	    getBody().appendChild(el);
	  };

	  var unmount = function unmount() {
	    !el ? index(false, 'Will not unmount annoucer as it is already unmounted') : void 0;
	    getBody().removeChild(el);
	    el = null;
	  };

	  var announcer = {
	    announce: announce,
	    id: id,
	    mount: mount,
	    unmount: unmount
	  };
	  return announcer;
	});

	var index$2 = (function (fn) {
	  var lastArgs = [];
	  var frameId = null;

	  var wrapperFn = function wrapperFn() {
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    lastArgs = args;

	    if (frameId) {
	      return frameId;
	    }

	    frameId = requestAnimationFrame(function () {
	      frameId = null;
	      fn.apply(undefined, lastArgs);
	    });

	    return frameId;
	  };

	  wrapperFn.cancel = function () {
	    if (!frameId) {
	      return;
	    }

	    cancelAnimationFrame(frameId);
	    frameId = null;
	  };

	  var resultFn = wrapperFn;

	  return resultFn;
	});

	var getScrollableDroppables = index$1(function (droppables) {
	  return toDroppableList(droppables).filter(function (droppable) {
	    if (!droppable.isEnabled) {
	      return false;
	    }

	    if (!droppable.viewport.closestScrollable) {
	      return false;
	    }

	    return true;
	  });
	});

	var getScrollableDroppableOver = function getScrollableDroppableOver(target, droppables) {
	  var maybe = getScrollableDroppables(droppables).find(function (droppable) {
	    !droppable.viewport.closestScrollable ? index(false, 'Invalid result') : void 0;
	    return isPositionInFrame(droppable.viewport.closestScrollable.framePageMarginBox)(target);
	  });
	  return maybe;
	};

	var getBestScrollableDroppable = (function (_ref) {
	  var center = _ref.center,
	      destination = _ref.destination,
	      droppables = _ref.droppables;

	  if (destination) {
	    var _dimension = droppables[destination.droppableId];

	    if (!_dimension.viewport.closestScrollable) {
	      return null;
	    }

	    return _dimension;
	  }

	  var dimension = getScrollableDroppableOver(center, droppables);
	  return dimension;
	});

	var smallestSigned = apply(function (value) {
	  if (value === 0) {
	    return 0;
	  }

	  return value > 0 ? 1 : -1;
	});
	var getOverlap = function () {
	  var getRemainder = function getRemainder(target, max) {
	    if (target < 0) {
	      return target;
	    }

	    if (target > max) {
	      return target - max;
	    }

	    return 0;
	  };

	  return function (_ref) {
	    var current = _ref.current,
	        max = _ref.max,
	        change = _ref.change;
	    var targetScroll = add(current, change);
	    var overlap = {
	      x: getRemainder(targetScroll.x, max.x),
	      y: getRemainder(targetScroll.y, max.y)
	    };

	    if (isEqual(overlap, origin)) {
	      return null;
	    }

	    return overlap;
	  };
	}();
	var canPartiallyScroll = function canPartiallyScroll(_ref2) {
	  var max = _ref2.max,
	      current = _ref2.current,
	      change = _ref2.change;
	  var smallestChange = smallestSigned(change);
	  var overlap = getOverlap({
	    max: max,
	    current: current,
	    change: smallestChange
	  });

	  if (!overlap) {
	    return true;
	  }

	  if (smallestChange.x !== 0 && overlap.x === 0) {
	    return true;
	  }

	  if (smallestChange.y !== 0 && overlap.y === 0) {
	    return true;
	  }

	  return false;
	};
	var canScrollWindow = function canScrollWindow(viewport, change) {
	  return canPartiallyScroll({
	    current: viewport.scroll.current,
	    max: viewport.scroll.max,
	    change: change
	  });
	};
	var canScrollDroppable = function canScrollDroppable(droppable, change) {
	  var closestScrollable = droppable.viewport.closestScrollable;

	  if (!closestScrollable) {
	    return false;
	  }

	  return canPartiallyScroll({
	    current: closestScrollable.scroll.current,
	    max: closestScrollable.scroll.max,
	    change: change
	  });
	};
	var getWindowOverlap = function getWindowOverlap(viewport, change) {
	  if (!canScrollWindow(viewport, change)) {
	    return null;
	  }

	  var max = viewport.scroll.max;
	  var current = viewport.scroll.current;
	  return getOverlap({
	    current: current,
	    max: max,
	    change: change
	  });
	};
	var getDroppableOverlap = function getDroppableOverlap(droppable, change) {
	  if (!canScrollDroppable(droppable, change)) {
	    return null;
	  }

	  var closestScrollable = droppable.viewport.closestScrollable;

	  if (!closestScrollable) {
	    return null;
	  }

	  return getOverlap({
	    current: closestScrollable.scroll.current,
	    max: closestScrollable.scroll.max,
	    change: change
	  });
	};

	var config = {
	  startFrom: 0.25,
	  maxSpeedAt: 0.05,
	  maxScrollSpeed: 28,
	  ease: function ease(percentage) {
	    return Math.pow(percentage, 2);
	  }
	};
	var clean$1 = apply(function (value) {
	  return value === 0 ? 0 : value;
	});
	var getPixelThresholds = function getPixelThresholds(container, axis) {
	  var startFrom = container[axis.size] * config.startFrom;
	  var maxSpeedAt = container[axis.size] * config.maxSpeedAt;
	  var accelerationPlane = startFrom - maxSpeedAt;
	  var thresholds = {
	    startFrom: startFrom,
	    maxSpeedAt: maxSpeedAt,
	    accelerationPlane: accelerationPlane
	  };
	  return thresholds;
	};

	var getSpeed = function getSpeed(distance$$1, thresholds) {
	  if (distance$$1 >= thresholds.startFrom) {
	    return 0;
	  }

	  if (distance$$1 <= thresholds.maxSpeedAt) {
	    return config.maxScrollSpeed;
	  }

	  var distancePastStart = thresholds.startFrom - distance$$1;
	  var percentage = distancePastStart / thresholds.accelerationPlane;
	  var transformed = config.ease(percentage);
	  var speed = config.maxScrollSpeed * transformed;
	  return speed;
	};

	var adjustForSizeLimits = function adjustForSizeLimits(_ref) {
	  var container = _ref.container,
	      subject = _ref.subject,
	      proposedScroll = _ref.proposedScroll;
	  var isTooBigVertically = subject.height > container.height;
	  var isTooBigHorizontally = subject.width > container.width;

	  if (!isTooBigHorizontally && !isTooBigVertically) {
	    return proposedScroll;
	  }

	  if (isTooBigHorizontally && isTooBigVertically) {
	    return null;
	  }

	  return {
	    x: isTooBigHorizontally ? 0 : proposedScroll.x,
	    y: isTooBigVertically ? 0 : proposedScroll.y
	  };
	};

	var getRequiredScroll = function getRequiredScroll(_ref2) {
	  var container = _ref2.container,
	      subject = _ref2.subject,
	      center = _ref2.center;
	  var distance$$1 = {
	    top: center.y - container.top,
	    right: container.right - center.x,
	    bottom: container.bottom - center.y,
	    left: center.x - container.left
	  };

	  var y = function () {
	    var thresholds = getPixelThresholds(container, vertical);
	    var isCloserToBottom = distance$$1.bottom < distance$$1.top;

	    if (isCloserToBottom) {
	      return getSpeed(distance$$1.bottom, thresholds);
	    }

	    return -1 * getSpeed(distance$$1.top, thresholds);
	  }();

	  var x = function () {
	    var thresholds = getPixelThresholds(container, horizontal);
	    var isCloserToRight = distance$$1.right < distance$$1.left;

	    if (isCloserToRight) {
	      return getSpeed(distance$$1.right, thresholds);
	    }

	    return -1 * getSpeed(distance$$1.left, thresholds);
	  }();

	  var required = clean$1({
	    x: x,
	    y: y
	  });

	  if (isEqual(required, origin)) {
	    return null;
	  }

	  var limited = adjustForSizeLimits({
	    container: container,
	    subject: subject,
	    proposedScroll: required
	  });

	  if (!limited) {
	    return null;
	  }

	  return isEqual(limited, origin) ? null : limited;
	};

	var withPlaceholder = function withPlaceholder(droppable, draggable) {
	  var closest$$1 = droppable.viewport.closestScrollable;

	  if (!closest$$1) {
	    return null;
	  }

	  var isOverHome = droppable.descriptor.id === draggable.descriptor.droppableId;
	  var max = closest$$1.scroll.max;
	  var current = closest$$1.scroll.current;

	  if (isOverHome) {
	    return {
	      max: max,
	      current: current
	    };
	  }

	  var spaceForPlaceholder = patch(droppable.axis.line, draggable.placeholder.client.borderBox[droppable.axis.size]);
	  var newMax = add(max, spaceForPlaceholder);
	  var newCurrent = {
	    x: Math.min(current.x, newMax.x),
	    y: Math.min(current.y, newMax.y)
	  };
	  return {
	    max: newMax,
	    current: newCurrent
	  };
	};

	var createFluidScroller = (function (_ref3) {
	  var scrollWindow = _ref3.scrollWindow,
	      scrollDroppable = _ref3.scrollDroppable;
	  var scheduleWindowScroll = index$2(scrollWindow);
	  var scheduleDroppableScroll = index$2(scrollDroppable);

	  var scroller = function scroller(state) {
	    var center = state.current.page.borderBoxCenter;
	    var draggable = state.dimensions.draggables[state.critical.draggable.id];
	    var subject = draggable.page.marginBox;
	    var viewport = state.viewport;
	    var requiredWindowScroll = getRequiredScroll({
	      container: viewport.frame,
	      subject: subject,
	      center: center
	    });

	    if (requiredWindowScroll && canScrollWindow(viewport, requiredWindowScroll)) {
	      scheduleWindowScroll(requiredWindowScroll);
	      return;
	    }

	    var droppable = getBestScrollableDroppable({
	      center: center,
	      destination: state.impact.destination,
	      droppables: state.dimensions.droppables
	    });

	    if (!droppable) {
	      return;
	    }

	    var closestScrollable = droppable.viewport.closestScrollable;

	    if (!closestScrollable) {
	      return;
	    }

	    var requiredFrameScroll = getRequiredScroll({
	      container: closestScrollable.framePageMarginBox,
	      subject: subject,
	      center: center
	    });

	    if (!requiredFrameScroll) {
	      return;
	    }

	    var result = withPlaceholder(droppable, draggable);

	    if (!result) {
	      return;
	    }

	    var canScrollDroppable$$1 = canPartiallyScroll({
	      max: result.max,
	      current: result.current,
	      change: requiredFrameScroll
	    });

	    if (canScrollDroppable$$1) {
	      scheduleDroppableScroll(droppable.descriptor.id, requiredFrameScroll);
	    }
	  };

	  scroller.cancel = function () {
	    scheduleWindowScroll.cancel();
	    scheduleDroppableScroll.cancel();
	  };

	  return scroller;
	});

	var createJumpScroller = (function (_ref) {
	  var move = _ref.move,
	      scrollDroppable = _ref.scrollDroppable,
	      scrollWindow = _ref.scrollWindow;

	  var moveByOffset = function moveByOffset(state, offset) {
	    var client = add(state.current.client.selection, offset);
	    move({
	      client: client,
	      shouldAnimate: true
	    });
	  };

	  var scrollDroppableAsMuchAsItCan = function scrollDroppableAsMuchAsItCan(droppable, change) {
	    if (!canScrollDroppable(droppable, change)) {
	      return change;
	    }

	    var overlap = getDroppableOverlap(droppable, change);

	    if (!overlap) {
	      scrollDroppable(droppable.descriptor.id, change);
	      return null;
	    }

	    var whatTheDroppableCanScroll = subtract(change, overlap);
	    scrollDroppable(droppable.descriptor.id, whatTheDroppableCanScroll);
	    var remainder = subtract(change, whatTheDroppableCanScroll);
	    return remainder;
	  };

	  var scrollWindowAsMuchAsItCan = function scrollWindowAsMuchAsItCan(viewport, change) {
	    if (!canScrollWindow(viewport, change)) {
	      return change;
	    }

	    var overlap = getWindowOverlap(viewport, change);

	    if (!overlap) {
	      scrollWindow(change);
	      return null;
	    }

	    var whatTheWindowCanScroll = subtract(change, overlap);
	    scrollWindow(whatTheWindowCanScroll);
	    var remainder = subtract(change, whatTheWindowCanScroll);
	    return remainder;
	  };

	  var jumpScroller = function jumpScroller(state) {
	    var request = state.scrollJumpRequest;

	    if (!request) {
	      return;
	    }

	    var destination = state.impact.destination;
	    !destination ? index(false, 'Cannot perform a jump scroll when there is no destination') : void 0;
	    var droppableRemainder = scrollDroppableAsMuchAsItCan(state.dimensions.droppables[destination.droppableId], request);

	    if (!droppableRemainder) {
	      return;
	    }

	    var viewport = state.viewport;
	    var windowRemainder = scrollWindowAsMuchAsItCan(viewport, droppableRemainder);

	    if (!windowRemainder) {
	      return;
	    }

	    moveByOffset(state, windowRemainder);
	  };

	  return jumpScroller;
	});

	var createAutoScroller = (function (_ref) {
	  var scrollDroppable = _ref.scrollDroppable,
	      scrollWindow = _ref.scrollWindow,
	      move = _ref.move;
	  var fluidScroll = createFluidScroller({
	    scrollWindow: scrollWindow,
	    scrollDroppable: scrollDroppable
	  });
	  var jumpScroll = createJumpScroller({
	    move: move,
	    scrollWindow: scrollWindow,
	    scrollDroppable: scrollDroppable
	  });
	  var marshal = {
	    cancel: fluidScroll.cancel,
	    fluidScroll: fluidScroll,
	    jumpScroll: jumpScroll
	  };
	  return marshal;
	});

	var prefix$2 = function prefix(key) {
	  return "private-react-beautiful-dnd-key-do-not-use-" + key;
	};

	var storeContext = React__default.createContext(undefined);
	var droppableIdKey = prefix$2('droppable-id');
	var droppableTypeKey = prefix$2('droppable-type');
	var dimensionMarshalKey = prefix$2('dimension-marshal');
	var styleContextKey = prefix$2('style-context');
	var canLiftContextKey = prefix$2('can-lift');

	var _DragDropContext$chil;
	var resetServerContext = function resetServerContext() {
	  resetStyleContext();
	};

	var printFatalDevError = function printFatalDevError(error) {

	  console.warn("\n    An error has occurred while a drag is occurring.\n    Any existing drag will be cancelled.\n\n    Raw error:\n  ");
	  console.error(error);
	};

	var DragDropContext = function (_React$Component) {
	  _inheritsLoose(DragDropContext, _React$Component);

	  function DragDropContext(props, context) {
	    var _this;

	    _this = _React$Component.call(this, props, context) || this;
	    _this.store = void 0;
	    _this.dimensionMarshal = void 0;
	    _this.styleMarshal = void 0;
	    _this.autoScroller = void 0;
	    _this.announcer = void 0;
	    _this.unsubscribe = void 0;

	    _this.canLift = function (id) {
	      return canStartDrag(_this.store.getState(), id);
	    };

	    _this.onFatalError = function (error) {
	      printFatalDevError(error);

	      var state = _this.store.getState();

	      if (state.phase !== 'IDLE') {
	        _this.store.dispatch(clean());
	      }
	    };

	    _this.onWindowError = function (error) {
	      return _this.onFatalError(error);
	    };

	    _this.announcer = createAnnouncer();
	    _this.styleMarshal = createStyleMarshal();
	    _this.store = createStore$1({
	      getDimensionMarshal: function getDimensionMarshal() {
	        return _this.dimensionMarshal;
	      },
	      styleMarshal: _this.styleMarshal,
	      getHooks: function getHooks() {
	        return {
	          onDragStart: _this.props.onDragStart,
	          onDragEnd: _this.props.onDragEnd,
	          onDragUpdate: _this.props.onDragUpdate
	        };
	      },
	      announce: _this.announcer.announce,
	      getScroller: function getScroller() {
	        return _this.autoScroller;
	      }
	    });
	    var callbacks = bindActionCreators({
	      collectionStarting: collectionStarting,
	      publish: publish,
	      updateDroppableScroll: updateDroppableScroll,
	      updateDroppableIsEnabled: updateDroppableIsEnabled
	    }, _this.store.dispatch);
	    _this.dimensionMarshal = createDimensionMarshal(callbacks);
	    _this.autoScroller = createAutoScroller(_extends({
	      scrollWindow: scrollWindow,
	      scrollDroppable: _this.dimensionMarshal.scrollDroppable
	    }, bindActionCreators({
	      move: move
	    }, _this.store.dispatch)));
	    return _this;
	  }

	  var _proto = DragDropContext.prototype;

	  _proto.getChildContext = function getChildContext() {
	    var _ref;

	    return _ref = {}, _ref[dimensionMarshalKey] = this.dimensionMarshal, _ref[styleContextKey] = this.styleMarshal.styleContext, _ref[canLiftContextKey] = this.canLift, _ref;
	  };

	  _proto.componentDidMount = function componentDidMount() {
	    window.addEventListener('error', this.onWindowError);
	    this.styleMarshal.mount();
	    this.announcer.mount();
	  };

	  _proto.componentDidCatch = function componentDidCatch(error) {
	    this.onFatalError(error);

	    if (error.message.indexOf('Invariant failed') !== -1) {
	      this.setState({});
	      return;
	    }

	    throw error;
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    window.addEventListener('error', this.onWindowError);
	    var state = this.store.getState();

	    if (state.phase !== 'IDLE') {
	      this.store.dispatch(clean());
	    }

	    this.styleMarshal.unmount();
	    this.announcer.unmount();
	  };

	  _proto.render = function render() {
	    return this.props.children;
	  };

	  return DragDropContext;
	}(React__default.Component);

	DragDropContext.childContextTypes = (_DragDropContext$chil = {}, _DragDropContext$chil[dimensionMarshalKey] = propTypes.object.isRequired, _DragDropContext$chil[styleContextKey] = propTypes.string.isRequired, _DragDropContext$chil[canLiftContextKey] = propTypes.func.isRequired, _DragDropContext$chil);

	var isScrollable = function isScrollable() {
	  for (var _len = arguments.length, values = new Array(_len), _key = 0; _key < _len; _key++) {
	    values[_key] = arguments[_key];
	  }

	  return values.some(function (value) {
	    return value === 'auto' || value === 'scroll';
	  });
	};

	var isElementScrollable = function isElementScrollable(el) {
	  var style = window.getComputedStyle(el);
	  return isScrollable(style.overflow, style.overflowY, style.overflowX);
	};

	var getClosestScrollable = function getClosestScrollable(el) {
	  if (el == null) {
	    return null;
	  }

	  if (!isElementScrollable(el)) {
	    return getClosestScrollable(el.parentElement);
	  }

	  return el;
	};

	var _DroppableDimensionPu;

	var getScroll = function getScroll(el) {
	  return {
	    x: el.scrollLeft,
	    y: el.scrollTop
	  };
	};

	var checkForNestedScrollContainers = function checkForNestedScrollContainers(scrollable) {

	  if (!scrollable) {
	    return;
	  }

	  var anotherScrollParent = getClosestScrollable(scrollable.parentElement);

	  if (!anotherScrollParent) {
	    return;
	  }

	  console.warn("\n    Droppable: unsupported nested scroll container detected.\n    A Droppable can only have one scroll parent (which can be itself)\n    Nested scroll containers are currently not supported.\n\n    We hope to support nested scroll containers soon: https://github.com/atlassian/react-beautiful-dnd/issues/131\n  ");
	};

	var DroppableDimensionPublisher = function (_Component) {
	  _inheritsLoose(DroppableDimensionPublisher, _Component);

	  function DroppableDimensionPublisher(props, context) {
	    var _this;

	    _this = _Component.call(this, props, context) || this;
	    _this.watchingScroll = null;
	    _this.callbacks = void 0;
	    _this.publishedDescriptor = null;

	    _this.getClosestScroll = function () {
	      if (!_this.watchingScroll) {
	        return origin;
	      }

	      return getScroll(_this.watchingScroll.closestScrollable);
	    };

	    _this.memoizedUpdateScroll = index$1(function (x, y) {
	      !_this.publishedDescriptor ? index(false, 'Cannot update scroll on unpublished droppable') : void 0;
	      var newScroll = {
	        x: x,
	        y: y
	      };
	      var marshal = _this.context[dimensionMarshalKey];
	      marshal.updateDroppableScroll(_this.publishedDescriptor.id, newScroll);
	    });

	    _this.updateScroll = function () {
	      var offset$$1 = _this.getClosestScroll();

	      _this.memoizedUpdateScroll(offset$$1.x, offset$$1.y);
	    };

	    _this.scheduleScrollUpdate = index$2(_this.updateScroll);

	    _this.onClosestScroll = function () {
	      !_this.watchingScroll ? index(false, 'Could not find scroll options while scrolling') : void 0;
	      var options = _this.watchingScroll.options;

	      if (options.shouldPublishImmediately) {
	        _this.updateScroll();

	        return;
	      }

	      _this.scheduleScrollUpdate();
	    };

	    _this.scroll = function (change) {
	      !_this.watchingScroll ? index(false, 'Cannot scroll a droppable with no closest scrollable') : void 0;
	      var closestScrollable = _this.watchingScroll.closestScrollable;
	      closestScrollable.scrollTop += change.y;
	      closestScrollable.scrollLeft += change.x;
	    };

	    _this.watchScroll = function (closestScrollable, options) {
	      !!_this.watchingScroll ? index(false, 'Droppable cannot watch scroll as it is already watching scroll') : void 0;

	      if (!closestScrollable) {
	        return;
	      }

	      _this.watchingScroll = {
	        options: options,
	        closestScrollable: closestScrollable
	      };
	      closestScrollable.addEventListener('scroll', _this.onClosestScroll, {
	        passive: true
	      });
	    };

	    _this.unwatchScroll = function () {
	      var watching = _this.watchingScroll;

	      if (!watching) {
	        return;
	      }

	      _this.scheduleScrollUpdate.cancel();

	      watching.closestScrollable.removeEventListener('scroll', _this.onClosestScroll);
	      _this.watchingScroll = null;
	    };

	    _this.getMemoizedDescriptor = index$1(function (id, type) {
	      return {
	        id: id,
	        type: type
	      };
	    });

	    _this.publish = function () {
	      var marshal = _this.context[dimensionMarshalKey];

	      var descriptor = _this.getMemoizedDescriptor(_this.props.droppableId, _this.props.type);

	      if (!_this.publishedDescriptor) {
	        marshal.registerDroppable(descriptor, _this.callbacks);
	        _this.publishedDescriptor = descriptor;
	        return;
	      }

	      if (_this.publishedDescriptor === descriptor) {
	        return;
	      }

	      marshal.updateDroppable(_this.publishedDescriptor, descriptor, _this.callbacks);
	      _this.publishedDescriptor = descriptor;
	    };

	    _this.unpublish = function () {
	      !_this.publishedDescriptor ? index(false, 'Cannot unpublish descriptor when none is published') : void 0;
	      var marshal = _this.context[dimensionMarshalKey];
	      marshal.unregisterDroppable(_this.publishedDescriptor);
	      _this.publishedDescriptor = null;
	    };

	    _this.getDimensionAndWatchScroll = function (windowScroll, options) {
	      var _this$props = _this.props,
	          direction = _this$props.direction,
	          ignoreContainerClipping = _this$props.ignoreContainerClipping,
	          isDropDisabled = _this$props.isDropDisabled,
	          getDroppableRef = _this$props.getDroppableRef;
	      var targetRef = getDroppableRef();
	      var descriptor = _this.publishedDescriptor;
	      !targetRef ? index(false, 'Cannot calculate a dimension when not attached to the DOM') : void 0;
	      !descriptor ? index(false, 'Cannot get dimension for unpublished droppable') : void 0;
	      var scrollableRef = getClosestScrollable(targetRef);
	      checkForNestedScrollContainers(scrollableRef);

	      _this.watchScroll(scrollableRef, options);

	      var client = function () {
	        var base = getBox(targetRef);

	        if (!scrollableRef) {
	          return base;
	        }

	        if (targetRef !== scrollableRef) {
	          return base;
	        }

	        var top = base.paddingBox.top - scrollableRef.scrollTop;
	        var left = base.paddingBox.left - scrollableRef.scrollLeft;
	        var bottom = top + scrollableRef.scrollHeight;
	        var right = left + scrollableRef.scrollWidth;
	        var paddingBox = {
	          top: top,
	          right: right,
	          bottom: bottom,
	          left: left
	        };
	        var borderBox = {
	          top: paddingBox.top - base.border.top,
	          right: paddingBox.right + base.border.right,
	          bottom: paddingBox.bottom + base.border.bottom,
	          left: paddingBox.left - base.border.left
	        };
	        return createBox({
	          borderBox: borderBox,
	          margin: base.margin,
	          border: base.border,
	          padding: base.padding
	        });
	      }();

	      var page = withScroll(client, windowScroll);

	      var closest$$1 = function () {
	        if (!scrollableRef) {
	          return null;
	        }

	        var frameClient = getBox(scrollableRef);
	        return {
	          client: frameClient,
	          page: withScroll(frameClient),
	          scrollHeight: scrollableRef.scrollHeight,
	          scrollWidth: scrollableRef.scrollWidth,
	          scroll: getScroll(scrollableRef),
	          shouldClipSubject: !ignoreContainerClipping
	        };
	      }();

	      return getDroppableDimension({
	        descriptor: descriptor,
	        isEnabled: !isDropDisabled,
	        direction: direction,
	        client: client,
	        page: page,
	        closest: closest$$1
	      });
	    };

	    var callbacks = {
	      getDimensionAndWatchScroll: _this.getDimensionAndWatchScroll,
	      unwatchScroll: _this.unwatchScroll,
	      scroll: _this.scroll
	    };
	    _this.callbacks = callbacks;
	    return _this;
	  }

	  var _proto = DroppableDimensionPublisher.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    this.publish();
	  };

	  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
	    this.publish();

	    if (this.props.isDropDisabled === prevProps.isDropDisabled) {
	      return;
	    }

	    var marshal = this.context[dimensionMarshalKey];
	    marshal.updateDroppableIsEnabled(this.props.droppableId, !this.props.isDropDisabled);
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    if (this.watchingScroll) {
	      {
	        console.warn('Unmounting droppable while it was watching scroll');
	      }

	      this.unwatchScroll();
	    }

	    this.unpublish();
	  };

	  _proto.render = function render() {
	    return this.props.children;
	  };

	  return DroppableDimensionPublisher;
	}(React.Component);

	DroppableDimensionPublisher.contextTypes = (_DroppableDimensionPu = {}, _DroppableDimensionPu[dimensionMarshalKey] = propTypes.object.isRequired, _DroppableDimensionPu);

	var Placeholder = function (_PureComponent) {
	  _inheritsLoose(Placeholder, _PureComponent);

	  function Placeholder() {
	    return _PureComponent.apply(this, arguments) || this;
	  }

	  var _proto = Placeholder.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    if (this.props.onMount) {
	      this.props.onMount();
	    }
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    if (this.props.onUnmount) {
	      this.props.onUnmount();
	    }
	  };

	  _proto.render = function render() {
	    var placeholder = this.props.placeholder;
	    var client = placeholder.client,
	        display = placeholder.display,
	        tagName = placeholder.tagName;
	    var style = {
	      display: display,
	      boxSizing: 'border-box',
	      width: client.borderBox.width,
	      height: client.borderBox.height,
	      marginTop: client.margin.top,
	      marginRight: client.margin.right,
	      marginBottom: client.margin.bottom,
	      marginLeft: client.margin.left,
	      flexShrink: '0',
	      flexGrow: '0',
	      pointerEvents: 'none'
	    };
	    return React__default.createElement(tagName, {
	      style: style
	    });
	  };

	  return Placeholder;
	}(React.PureComponent);

	var throwIfRefIsInvalid = (function (ref) {
	  !(ref != null && ref instanceof HTMLElement) ? index(false, "\n    provided.innerRef has not been provided with valid DOM ref.\n\n    You can find a guide on using the innerRef callback functions at:\n    https://github.com/atlassian/react-beautiful-dnd/blob/master/docs/guides/using-inner-ref.md\n  ") : void 0;
	});

	var _Droppable$contextTyp, _Droppable$childConte;

	var Droppable = function (_Component) {
	  _inheritsLoose(Droppable, _Component);

	  function Droppable(props, context) {
	    var _this;

	    _this = _Component.call(this, props, context) || this;
	    _this.styleContext = void 0;
	    _this.ref = null;
	    _this.isPlaceholderMounted = false;

	    _this.onPlaceholderMount = function () {
	      _this.isPlaceholderMounted = true;
	    };

	    _this.onPlaceholderUnmount = function () {
	      _this.isPlaceholderMounted = false;
	    };

	    _this.setRef = function (ref) {
	      if (ref === null) {
	        return;
	      }

	      if (ref === _this.ref) {
	        return;
	      }

	      _this.ref = ref;
	      throwIfRefIsInvalid(ref);
	    };

	    _this.getDroppableRef = function () {
	      return _this.ref;
	    };

	    _this.styleContext = context[styleContextKey];
	    return _this;
	  }

	  var _proto = Droppable.prototype;

	  _proto.getChildContext = function getChildContext() {
	    var _value;

	    var value = (_value = {}, _value[droppableIdKey] = this.props.droppableId, _value[droppableTypeKey] = this.props.type, _value);
	    return value;
	  };

	  _proto.componentDidMount = function componentDidMount() {
	    throwIfRefIsInvalid(this.ref);
	    this.warnIfPlaceholderNotMounted();
	  };

	  _proto.componentDidUpdate = function componentDidUpdate() {
	    this.warnIfPlaceholderNotMounted();
	  };

	  _proto.warnIfPlaceholderNotMounted = function warnIfPlaceholderNotMounted() {

	    if (!this.props.placeholder) {
	      return;
	    }

	    if (this.isPlaceholderMounted) {
	      return;
	    }

	    console.warn("\n      Droppable setup issue: DroppableProvided > placeholder could not be found.\n      Please be sure to add the {provided.placeholder} Node as a child of your Droppable\n\n      More information: https://github.com/atlassian/react-beautiful-dnd#1-provided-droppableprovided\n    ");
	  };

	  _proto.getPlaceholder = function getPlaceholder() {
	    if (!this.props.placeholder) {
	      return null;
	    }

	    return React__default.createElement(Placeholder, {
	      placeholder: this.props.placeholder,
	      onMount: this.onPlaceholderMount,
	      onUnmount: this.onPlaceholderUnmount
	    });
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        children = _this$props.children,
	        direction = _this$props.direction,
	        droppableId = _this$props.droppableId,
	        ignoreContainerClipping = _this$props.ignoreContainerClipping,
	        isDraggingOver = _this$props.isDraggingOver,
	        isDropDisabled = _this$props.isDropDisabled,
	        draggingOverWith = _this$props.draggingOverWith,
	        type = _this$props.type;
	    var provided = {
	      innerRef: this.setRef,
	      placeholder: this.getPlaceholder(),
	      droppableProps: {
	        'data-react-beautiful-dnd-droppable': this.styleContext
	      }
	    };
	    var snapshot = {
	      isDraggingOver: isDraggingOver,
	      draggingOverWith: draggingOverWith
	    };
	    return React__default.createElement(DroppableDimensionPublisher, {
	      droppableId: droppableId,
	      type: type,
	      direction: direction,
	      ignoreContainerClipping: ignoreContainerClipping,
	      isDropDisabled: isDropDisabled,
	      getDroppableRef: this.getDroppableRef
	    }, children(provided, snapshot));
	  };

	  return Droppable;
	}(React.Component);

	Droppable.contextTypes = (_Droppable$contextTyp = {}, _Droppable$contextTyp[styleContextKey] = propTypes.string.isRequired, _Droppable$contextTyp);
	Droppable.childContextTypes = (_Droppable$childConte = {}, _Droppable$childConte[droppableIdKey] = propTypes.string.isRequired, _Droppable$childConte[droppableTypeKey] = propTypes.string.isRequired, _Droppable$childConte);

	var isStrictEqual = (function (a, b) {
	  return a === b;
	});

	var makeMapStateToProps = function makeMapStateToProps() {
	  var getIsDraggingOver = function getIsDraggingOver(id, destination) {
	    if (!destination) {
	      return false;
	    }

	    return destination.droppableId === id;
	  };

	  var shouldUsePlaceholder = function shouldUsePlaceholder(id, descriptor, destination) {
	    if (!destination) {
	      return false;
	    }

	    if (id === descriptor.droppableId) {
	      return false;
	    }

	    return id === destination.droppableId;
	  };

	  var getMapProps = index$1(function (isDraggingOver, draggingOverWith, placeholder) {
	    return {
	      isDraggingOver: isDraggingOver,
	      draggingOverWith: draggingOverWith,
	      placeholder: placeholder
	    };
	  });

	  var selector = function selector(state, ownProps) {
	    if (ownProps.isDropDisabled) {
	      return getMapProps(false, null, null);
	    }

	    var id = ownProps.droppableId;

	    if (state.isDragging) {
	      var destination = state.impact.destination;
	      var isDraggingOver = getIsDraggingOver(id, destination);
	      var draggableId = state.critical.draggable.id;
	      var draggingOverWith = isDraggingOver ? draggableId : null;
	      var draggable = state.dimensions.draggables[draggableId];
	      var placeholder = shouldUsePlaceholder(id, draggable.descriptor, destination) ? draggable.placeholder : null;
	      return getMapProps(isDraggingOver, draggingOverWith, placeholder);
	    }

	    if (state.phase === 'DROP_ANIMATING') {
	      var _destination = state.pending.impact.destination;

	      var _isDraggingOver = getIsDraggingOver(id, _destination);

	      var _draggableId = state.pending.result.draggableId;

	      var _draggingOverWith = _isDraggingOver ? _draggableId : null;

	      var _draggable = state.dimensions.draggables[_draggableId];

	      var _placeholder = shouldUsePlaceholder(id, _draggable.descriptor, _destination) ? _draggable.placeholder : null;

	      return getMapProps(_isDraggingOver, _draggingOverWith, _placeholder);
	    }

	    return getMapProps(false, null, null);
	  };

	  return selector;
	};
	var connectedDroppable = reactRedux.connect(makeMapStateToProps, null, null, {
	  context: storeContext,
	  pure: true,
	  areStatePropsEqual: isStrictEqual
	})(Droppable);
	connectedDroppable.defaultProps = {
	  type: 'DEFAULT',
	  isDropDisabled: false,
	  direction: 'vertical',
	  ignoreContainerClipping: false
	};

	var _DraggableDimensionPu;

	var DraggableDimensionPublisher = function (_Component) {
	  _inheritsLoose(DraggableDimensionPublisher, _Component);

	  function DraggableDimensionPublisher() {
	    var _this;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
	    _this.publishedDescriptor = null;
	    _this.getMemoizedDescriptor = index$1(function (id, index$$1, droppableId, type) {
	      return {
	        id: id,
	        index: index$$1,
	        droppableId: droppableId,
	        type: type
	      };
	    });

	    _this.publish = function () {
	      var marshal = _this.context[dimensionMarshalKey];

	      var descriptor = _this.getMemoizedDescriptor(_this.props.draggableId, _this.props.index, _this.props.droppableId, _this.props.type);

	      if (!_this.publishedDescriptor) {
	        marshal.registerDraggable(descriptor, _this.getDimension);
	        _this.publishedDescriptor = descriptor;
	        return;
	      }

	      if (descriptor === _this.publishedDescriptor) {
	        return;
	      }

	      marshal.updateDraggable(_this.publishedDescriptor, descriptor, _this.getDimension);
	      _this.publishedDescriptor = descriptor;
	    };

	    _this.unpublish = function () {
	      !_this.publishedDescriptor ? index(false, 'Cannot unpublish descriptor when none is published') : void 0;
	      var marshal = _this.context[dimensionMarshalKey];
	      marshal.unregisterDraggable(_this.publishedDescriptor);
	      _this.publishedDescriptor = null;
	    };

	    _this.getDimension = function (windowScroll) {
	      var targetRef = _this.props.getDraggableRef();

	      var descriptor = _this.publishedDescriptor;
	      !targetRef ? index(false, 'DraggableDimensionPublisher cannot calculate a dimension when not attached to the DOM') : void 0;
	      !descriptor ? index(false, 'Cannot get dimension for unpublished draggable') : void 0;
	      var computedStyles = window.getComputedStyle(targetRef);
	      var borderBox = targetRef.getBoundingClientRect();
	      var client = calculateBox(borderBox, computedStyles);
	      var page = withScroll(client, windowScroll);
	      var placeholder = {
	        client: client,
	        tagName: targetRef.tagName.toLowerCase(),
	        display: computedStyles.display
	      };
	      var dimension = {
	        descriptor: descriptor,
	        placeholder: placeholder,
	        client: client,
	        page: page
	      };
	      return dimension;
	    };

	    return _this;
	  }

	  var _proto = DraggableDimensionPublisher.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    this.publish();
	  };

	  _proto.componentDidUpdate = function componentDidUpdate() {
	    this.publish();
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    this.unpublish();
	  };

	  _proto.render = function render() {
	    return this.props.children;
	  };

	  return DraggableDimensionPublisher;
	}(React.Component);

	DraggableDimensionPublisher.contextTypes = (_DraggableDimensionPu = {}, _DraggableDimensionPu[dimensionMarshalKey] = propTypes.object.isRequired, _DraggableDimensionPu);

	var mapToZero_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports['default'] = mapToZero;

	function mapToZero(obj) {
	  var ret = {};
	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key)) {
	      ret[key] = 0;
	    }
	  }
	  return ret;
	}

	module.exports = exports['default'];
	});

	unwrapExports(mapToZero_1);

	var stripStyle_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports['default'] = stripStyle;

	function stripStyle(style) {
	  var ret = {};
	  for (var key in style) {
	    if (!Object.prototype.hasOwnProperty.call(style, key)) {
	      continue;
	    }
	    ret[key] = typeof style[key] === 'number' ? style[key] : style[key].val;
	  }
	  return ret;
	}

	module.exports = exports['default'];
	});

	unwrapExports(stripStyle_1);

	var stepper_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = stepper;

	var reusedTuple = [0, 0];

	function stepper(secondPerFrame, x, v, destX, k, b, precision) {
	  // Spring stiffness, in kg / s^2

	  // for animations, destX is really spring length (spring at rest). initial
	  // position is considered as the stretched/compressed position of a spring
	  var Fspring = -k * (x - destX);

	  // Damping, in kg / s
	  var Fdamper = -b * v;

	  // usually we put mass here, but for animation purposes, specifying mass is a
	  // bit redundant. you could simply adjust k and b accordingly
	  // let a = (Fspring + Fdamper) / mass;
	  var a = Fspring + Fdamper;

	  var newV = v + a * secondPerFrame;
	  var newX = x + newV * secondPerFrame;

	  if (Math.abs(newV) < precision && Math.abs(newX - destX) < precision) {
	    reusedTuple[0] = destX;
	    reusedTuple[1] = 0;
	    return reusedTuple;
	  }

	  reusedTuple[0] = newX;
	  reusedTuple[1] = newV;
	  return reusedTuple;
	}

	module.exports = exports["default"];
	// array reference around.
	});

	unwrapExports(stepper_1);

	var performanceNow = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.7.1
	(function() {
	  var getNanoSeconds, hrtime, loadTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - loadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    loadTime = getNanoSeconds();
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(commonjsGlobal);
	});

	var performanceNow$1 = createCommonjsModule(function (module) {
	// Generated by CoffeeScript 1.12.2
	(function() {
	  var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;

	  if ((typeof performance !== "undefined" && performance !== null) && performance.now) {
	    module.exports = function() {
	      return performance.now();
	    };
	  } else if ((typeof process !== "undefined" && process !== null) && process.hrtime) {
	    module.exports = function() {
	      return (getNanoSeconds() - nodeLoadTime) / 1e6;
	    };
	    hrtime = process.hrtime;
	    getNanoSeconds = function() {
	      var hr;
	      hr = hrtime();
	      return hr[0] * 1e9 + hr[1];
	    };
	    moduleLoadTime = getNanoSeconds();
	    upTime = process.uptime() * 1e9;
	    nodeLoadTime = moduleLoadTime - upTime;
	  } else if (Date.now) {
	    module.exports = function() {
	      return Date.now() - loadTime;
	    };
	    loadTime = Date.now();
	  } else {
	    module.exports = function() {
	      return new Date().getTime() - loadTime;
	    };
	    loadTime = new Date().getTime();
	  }

	}).call(commonjsGlobal);


	});

	var root$1 = typeof window === 'undefined' ? commonjsGlobal : window
	  , vendors = ['moz', 'webkit']
	  , suffix = 'AnimationFrame'
	  , raf = root$1['request' + suffix]
	  , caf = root$1['cancel' + suffix] || root$1['cancelRequest' + suffix];

	for(var i = 0; !raf && i < vendors.length; i++) {
	  raf = root$1[vendors[i] + 'Request' + suffix];
	  caf = root$1[vendors[i] + 'Cancel' + suffix]
	      || root$1[vendors[i] + 'CancelRequest' + suffix];
	}

	// Some versions of FF have rAF but not cAF
	if(!raf || !caf) {
	  var last = 0
	    , id$1 = 0
	    , queue = []
	    , frameDuration = 1000 / 60;

	  raf = function(callback) {
	    if(queue.length === 0) {
	      var _now = performanceNow$1()
	        , next = Math.max(0, frameDuration - (_now - last));
	      last = next + _now;
	      setTimeout(function() {
	        var cp = queue.slice(0);
	        // Clear queue here to prevent
	        // callbacks from appending listeners
	        // to the current frame's queue
	        queue.length = 0;
	        for(var i = 0; i < cp.length; i++) {
	          if(!cp[i].cancelled) {
	            try{
	              cp[i].callback(last);
	            } catch(e) {
	              setTimeout(function() { throw e }, 0);
	            }
	          }
	        }
	      }, Math.round(next));
	    }
	    queue.push({
	      handle: ++id$1,
	      callback: callback,
	      cancelled: false
	    });
	    return id$1
	  };

	  caf = function(handle) {
	    for(var i = 0; i < queue.length; i++) {
	      if(queue[i].handle === handle) {
	        queue[i].cancelled = true;
	      }
	    }
	  };
	}

	var raf_1 = function(fn) {
	  // Wrap in a new function to prevent
	  // `cancel` potentially being assigned
	  // to the native rAF function
	  return raf.call(root$1, fn)
	};
	var cancel = function() {
	  caf.apply(root$1, arguments);
	};
	var polyfill = function() {
	  root$1.requestAnimationFrame = raf;
	  root$1.cancelAnimationFrame = caf;
	};
	raf_1.cancel = cancel;
	raf_1.polyfill = polyfill;

	var shouldStopAnimation_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports['default'] = shouldStopAnimation;

	function shouldStopAnimation(currentStyle, style, currentVelocity) {
	  for (var key in style) {
	    if (!Object.prototype.hasOwnProperty.call(style, key)) {
	      continue;
	    }

	    if (currentVelocity[key] !== 0) {
	      return false;
	    }

	    var styleValue = typeof style[key] === 'number' ? style[key] : style[key].val;
	    // stepper will have already taken care of rounding precision errors, so
	    // won't have such thing as 0.9999 !=== 1
	    if (currentStyle[key] !== styleValue) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports['default'];
	});

	unwrapExports(shouldStopAnimation_1);

	var Motion_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var _mapToZero2 = _interopRequireDefault(mapToZero_1);



	var _stripStyle2 = _interopRequireDefault(stripStyle_1);



	var _stepper4 = _interopRequireDefault(stepper_1);



	var _performanceNow2 = _interopRequireDefault(performanceNow);



	var _raf2 = _interopRequireDefault(raf_1);



	var _shouldStopAnimation2 = _interopRequireDefault(shouldStopAnimation_1);



	var _react2 = _interopRequireDefault(React__default);



	var _propTypes2 = _interopRequireDefault(propTypes);

	var msPerFrame = 1000 / 60;

	var Motion = (function (_React$Component) {
	  _inherits(Motion, _React$Component);

	  _createClass(Motion, null, [{
	    key: 'propTypes',
	    value: {
	      // TOOD: warn against putting a config in here
	      defaultStyle: _propTypes2['default'].objectOf(_propTypes2['default'].number),
	      style: _propTypes2['default'].objectOf(_propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object])).isRequired,
	      children: _propTypes2['default'].func.isRequired,
	      onRest: _propTypes2['default'].func
	    },
	    enumerable: true
	  }]);

	  function Motion(props) {
	    var _this = this;

	    _classCallCheck(this, Motion);

	    _React$Component.call(this, props);
	    this.wasAnimating = false;
	    this.animationID = null;
	    this.prevTime = 0;
	    this.accumulatedTime = 0;
	    this.unreadPropStyle = null;

	    this.clearUnreadPropStyle = function (destStyle) {
	      var dirty = false;
	      var _state = _this.state;
	      var currentStyle = _state.currentStyle;
	      var currentVelocity = _state.currentVelocity;
	      var lastIdealStyle = _state.lastIdealStyle;
	      var lastIdealVelocity = _state.lastIdealVelocity;

	      for (var key in destStyle) {
	        if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
	          continue;
	        }

	        var styleValue = destStyle[key];
	        if (typeof styleValue === 'number') {
	          if (!dirty) {
	            dirty = true;
	            currentStyle = _extends({}, currentStyle);
	            currentVelocity = _extends({}, currentVelocity);
	            lastIdealStyle = _extends({}, lastIdealStyle);
	            lastIdealVelocity = _extends({}, lastIdealVelocity);
	          }

	          currentStyle[key] = styleValue;
	          currentVelocity[key] = 0;
	          lastIdealStyle[key] = styleValue;
	          lastIdealVelocity[key] = 0;
	        }
	      }

	      if (dirty) {
	        _this.setState({ currentStyle: currentStyle, currentVelocity: currentVelocity, lastIdealStyle: lastIdealStyle, lastIdealVelocity: lastIdealVelocity });
	      }
	    };

	    this.startAnimationIfNecessary = function () {
	      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	      // call cb? No, otherwise accidental parent rerender causes cb trigger
	      _this.animationID = _raf2['default'](function (timestamp) {
	        // check if we need to animate in the first place
	        var propsStyle = _this.props.style;
	        if (_shouldStopAnimation2['default'](_this.state.currentStyle, propsStyle, _this.state.currentVelocity)) {
	          if (_this.wasAnimating && _this.props.onRest) {
	            _this.props.onRest();
	          }

	          // no need to cancel animationID here; shouldn't have any in flight
	          _this.animationID = null;
	          _this.wasAnimating = false;
	          _this.accumulatedTime = 0;
	          return;
	        }

	        _this.wasAnimating = true;

	        var currentTime = timestamp || _performanceNow2['default']();
	        var timeDelta = currentTime - _this.prevTime;
	        _this.prevTime = currentTime;
	        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	        // more than 10 frames? prolly switched browser tab. Restart
	        if (_this.accumulatedTime > msPerFrame * 10) {
	          _this.accumulatedTime = 0;
	        }

	        if (_this.accumulatedTime === 0) {
	          // no need to cancel animationID here; shouldn't have any in flight
	          _this.animationID = null;
	          _this.startAnimationIfNecessary();
	          return;
	        }

	        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

	        var newLastIdealStyle = {};
	        var newLastIdealVelocity = {};
	        var newCurrentStyle = {};
	        var newCurrentVelocity = {};

	        for (var key in propsStyle) {
	          if (!Object.prototype.hasOwnProperty.call(propsStyle, key)) {
	            continue;
	          }

	          var styleValue = propsStyle[key];
	          if (typeof styleValue === 'number') {
	            newCurrentStyle[key] = styleValue;
	            newCurrentVelocity[key] = 0;
	            newLastIdealStyle[key] = styleValue;
	            newLastIdealVelocity[key] = 0;
	          } else {
	            var newLastIdealStyleValue = _this.state.lastIdealStyle[key];
	            var newLastIdealVelocityValue = _this.state.lastIdealVelocity[key];
	            for (var i = 0; i < framesToCatchUp; i++) {
	              var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

	              newLastIdealStyleValue = _stepper[0];
	              newLastIdealVelocityValue = _stepper[1];
	            }

	            var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

	            var nextIdealX = _stepper2[0];
	            var nextIdealV = _stepper2[1];

	            newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	            newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	            newLastIdealStyle[key] = newLastIdealStyleValue;
	            newLastIdealVelocity[key] = newLastIdealVelocityValue;
	          }
	        }

	        _this.animationID = null;
	        // the amount we're looped over above
	        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

	        _this.setState({
	          currentStyle: newCurrentStyle,
	          currentVelocity: newCurrentVelocity,
	          lastIdealStyle: newLastIdealStyle,
	          lastIdealVelocity: newLastIdealVelocity
	        });

	        _this.unreadPropStyle = null;

	        _this.startAnimationIfNecessary();
	      });
	    };

	    this.state = this.defaultState();
	  }

	  Motion.prototype.defaultState = function defaultState() {
	    var _props = this.props;
	    var defaultStyle = _props.defaultStyle;
	    var style = _props.style;

	    var currentStyle = defaultStyle || _stripStyle2['default'](style);
	    var currentVelocity = _mapToZero2['default'](currentStyle);
	    return {
	      currentStyle: currentStyle,
	      currentVelocity: currentVelocity,
	      lastIdealStyle: currentStyle,
	      lastIdealVelocity: currentVelocity
	    };
	  };

	  // it's possible that currentStyle's value is stale: if props is immediately
	  // changed from 0 to 400 to spring(0) again, the async currentStyle is still
	  // at 0 (didn't have time to tick and interpolate even once). If we naively
	  // compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	  // In reality currentStyle should be 400

	  Motion.prototype.componentDidMount = function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  };

	  Motion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
	    if (this.unreadPropStyle != null) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyle);
	    }

	    this.unreadPropStyle = props.style;
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  };

	  Motion.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  };

	  Motion.prototype.render = function render() {
	    var renderedChildren = this.props.children(this.state.currentStyle);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  };

	  return Motion;
	})(_react2['default'].Component);

	exports['default'] = Motion;
	module.exports = exports['default'];

	// after checking for unreadPropStyle != null, we manually go set the
	// non-interpolating values (those that are a number, without a spring
	// config)
	});

	unwrapExports(Motion_1);

	var StaggeredMotion_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var _mapToZero2 = _interopRequireDefault(mapToZero_1);



	var _stripStyle2 = _interopRequireDefault(stripStyle_1);



	var _stepper4 = _interopRequireDefault(stepper_1);



	var _performanceNow2 = _interopRequireDefault(performanceNow);



	var _raf2 = _interopRequireDefault(raf_1);



	var _shouldStopAnimation2 = _interopRequireDefault(shouldStopAnimation_1);



	var _react2 = _interopRequireDefault(React__default);



	var _propTypes2 = _interopRequireDefault(propTypes);

	var msPerFrame = 1000 / 60;

	function shouldStopAnimationAll(currentStyles, styles, currentVelocities) {
	  for (var i = 0; i < currentStyles.length; i++) {
	    if (!_shouldStopAnimation2['default'](currentStyles[i], styles[i], currentVelocities[i])) {
	      return false;
	    }
	  }
	  return true;
	}

	var StaggeredMotion = (function (_React$Component) {
	  _inherits(StaggeredMotion, _React$Component);

	  _createClass(StaggeredMotion, null, [{
	    key: 'propTypes',
	    value: {
	      // TOOD: warn against putting a config in here
	      defaultStyles: _propTypes2['default'].arrayOf(_propTypes2['default'].objectOf(_propTypes2['default'].number)),
	      styles: _propTypes2['default'].func.isRequired,
	      children: _propTypes2['default'].func.isRequired
	    },
	    enumerable: true
	  }]);

	  function StaggeredMotion(props) {
	    var _this = this;

	    _classCallCheck(this, StaggeredMotion);

	    _React$Component.call(this, props);
	    this.animationID = null;
	    this.prevTime = 0;
	    this.accumulatedTime = 0;
	    this.unreadPropStyles = null;

	    this.clearUnreadPropStyle = function (unreadPropStyles) {
	      var _state = _this.state;
	      var currentStyles = _state.currentStyles;
	      var currentVelocities = _state.currentVelocities;
	      var lastIdealStyles = _state.lastIdealStyles;
	      var lastIdealVelocities = _state.lastIdealVelocities;

	      var someDirty = false;
	      for (var i = 0; i < unreadPropStyles.length; i++) {
	        var unreadPropStyle = unreadPropStyles[i];
	        var dirty = false;

	        for (var key in unreadPropStyle) {
	          if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
	            continue;
	          }

	          var styleValue = unreadPropStyle[key];
	          if (typeof styleValue === 'number') {
	            if (!dirty) {
	              dirty = true;
	              someDirty = true;
	              currentStyles[i] = _extends({}, currentStyles[i]);
	              currentVelocities[i] = _extends({}, currentVelocities[i]);
	              lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
	              lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
	            }
	            currentStyles[i][key] = styleValue;
	            currentVelocities[i][key] = 0;
	            lastIdealStyles[i][key] = styleValue;
	            lastIdealVelocities[i][key] = 0;
	          }
	        }
	      }

	      if (someDirty) {
	        _this.setState({ currentStyles: currentStyles, currentVelocities: currentVelocities, lastIdealStyles: lastIdealStyles, lastIdealVelocities: lastIdealVelocities });
	      }
	    };

	    this.startAnimationIfNecessary = function () {
	      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	      // call cb? No, otherwise accidental parent rerender causes cb trigger
	      _this.animationID = _raf2['default'](function (timestamp) {
	        var destStyles = _this.props.styles(_this.state.lastIdealStyles);

	        // check if we need to animate in the first place
	        if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities)) {
	          // no need to cancel animationID here; shouldn't have any in flight
	          _this.animationID = null;
	          _this.accumulatedTime = 0;
	          return;
	        }

	        var currentTime = timestamp || _performanceNow2['default']();
	        var timeDelta = currentTime - _this.prevTime;
	        _this.prevTime = currentTime;
	        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	        // more than 10 frames? prolly switched browser tab. Restart
	        if (_this.accumulatedTime > msPerFrame * 10) {
	          _this.accumulatedTime = 0;
	        }

	        if (_this.accumulatedTime === 0) {
	          // no need to cancel animationID here; shouldn't have any in flight
	          _this.animationID = null;
	          _this.startAnimationIfNecessary();
	          return;
	        }

	        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

	        var newLastIdealStyles = [];
	        var newLastIdealVelocities = [];
	        var newCurrentStyles = [];
	        var newCurrentVelocities = [];

	        for (var i = 0; i < destStyles.length; i++) {
	          var destStyle = destStyles[i];
	          var newCurrentStyle = {};
	          var newCurrentVelocity = {};
	          var newLastIdealStyle = {};
	          var newLastIdealVelocity = {};

	          for (var key in destStyle) {
	            if (!Object.prototype.hasOwnProperty.call(destStyle, key)) {
	              continue;
	            }

	            var styleValue = destStyle[key];
	            if (typeof styleValue === 'number') {
	              newCurrentStyle[key] = styleValue;
	              newCurrentVelocity[key] = 0;
	              newLastIdealStyle[key] = styleValue;
	              newLastIdealVelocity[key] = 0;
	            } else {
	              var newLastIdealStyleValue = _this.state.lastIdealStyles[i][key];
	              var newLastIdealVelocityValue = _this.state.lastIdealVelocities[i][key];
	              for (var j = 0; j < framesToCatchUp; j++) {
	                var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

	                newLastIdealStyleValue = _stepper[0];
	                newLastIdealVelocityValue = _stepper[1];
	              }

	              var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

	              var nextIdealX = _stepper2[0];
	              var nextIdealV = _stepper2[1];

	              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	              newLastIdealStyle[key] = newLastIdealStyleValue;
	              newLastIdealVelocity[key] = newLastIdealVelocityValue;
	            }
	          }

	          newCurrentStyles[i] = newCurrentStyle;
	          newCurrentVelocities[i] = newCurrentVelocity;
	          newLastIdealStyles[i] = newLastIdealStyle;
	          newLastIdealVelocities[i] = newLastIdealVelocity;
	        }

	        _this.animationID = null;
	        // the amount we're looped over above
	        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

	        _this.setState({
	          currentStyles: newCurrentStyles,
	          currentVelocities: newCurrentVelocities,
	          lastIdealStyles: newLastIdealStyles,
	          lastIdealVelocities: newLastIdealVelocities
	        });

	        _this.unreadPropStyles = null;

	        _this.startAnimationIfNecessary();
	      });
	    };

	    this.state = this.defaultState();
	  }

	  StaggeredMotion.prototype.defaultState = function defaultState() {
	    var _props = this.props;
	    var defaultStyles = _props.defaultStyles;
	    var styles = _props.styles;

	    var currentStyles = defaultStyles || styles().map(_stripStyle2['default']);
	    var currentVelocities = currentStyles.map(function (currentStyle) {
	      return _mapToZero2['default'](currentStyle);
	    });
	    return {
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      lastIdealStyles: currentStyles,
	      lastIdealVelocities: currentVelocities
	    };
	  };

	  StaggeredMotion.prototype.componentDidMount = function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  };

	  StaggeredMotion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
	    if (this.unreadPropStyles != null) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyles);
	    }

	    this.unreadPropStyles = props.styles(this.state.lastIdealStyles);
	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  };

	  StaggeredMotion.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  };

	  StaggeredMotion.prototype.render = function render() {
	    var renderedChildren = this.props.children(this.state.currentStyles);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  };

	  return StaggeredMotion;
	})(_react2['default'].Component);

	exports['default'] = StaggeredMotion;
	module.exports = exports['default'];

	// it's possible that currentStyle's value is stale: if props is immediately
	// changed from 0 to 400 to spring(0) again, the async currentStyle is still
	// at 0 (didn't have time to tick and interpolate even once). If we naively
	// compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	// In reality currentStyle should be 400

	// after checking for unreadPropStyles != null, we manually go set the
	// non-interpolating values (those that are a number, without a spring
	// config)
	});

	unwrapExports(StaggeredMotion_1);

	var mergeDiff_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports['default'] = mergeDiff;

	function mergeDiff(prev, next, onRemove) {
	  // bookkeeping for easier access of a key's index below. This is 2 allocations +
	  // potentially triggering chrome hash map mode for objs (so it might be faster

	  var prevKeyIndex = {};
	  for (var i = 0; i < prev.length; i++) {
	    prevKeyIndex[prev[i].key] = i;
	  }
	  var nextKeyIndex = {};
	  for (var i = 0; i < next.length; i++) {
	    nextKeyIndex[next[i].key] = i;
	  }

	  // first, an overly elaborate way of merging prev and next, eliminating
	  // duplicates (in terms of keys). If there's dupe, keep the item in next).
	  // This way of writing it saves allocations
	  var ret = [];
	  for (var i = 0; i < next.length; i++) {
	    ret[i] = next[i];
	  }
	  for (var i = 0; i < prev.length; i++) {
	    if (!Object.prototype.hasOwnProperty.call(nextKeyIndex, prev[i].key)) {
	      // this is called my TM's `mergeAndSync`, which calls willLeave. We don't
	      // merge in keys that the user desires to kill
	      var fill = onRemove(i, prev[i]);
	      if (fill != null) {
	        ret.push(fill);
	      }
	    }
	  }

	  // now all the items all present. Core sorting logic to have the right order
	  return ret.sort(function (a, b) {
	    var nextOrderA = nextKeyIndex[a.key];
	    var nextOrderB = nextKeyIndex[b.key];
	    var prevOrderA = prevKeyIndex[a.key];
	    var prevOrderB = prevKeyIndex[b.key];

	    if (nextOrderA != null && nextOrderB != null) {
	      // both keys in next
	      return nextKeyIndex[a.key] - nextKeyIndex[b.key];
	    } else if (prevOrderA != null && prevOrderB != null) {
	      // both keys in prev
	      return prevKeyIndex[a.key] - prevKeyIndex[b.key];
	    } else if (nextOrderA != null) {
	      // key a in next, key b in prev

	      // how to determine the order between a and b? We find a "pivot" (term
	      // abuse), a key present in both prev and next, that is sandwiched between
	      // a and b. In the context of our above example, if we're comparing a and
	      // d, b's (the only) pivot
	      for (var i = 0; i < next.length; i++) {
	        var pivot = next[i].key;
	        if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
	          continue;
	        }

	        if (nextOrderA < nextKeyIndex[pivot] && prevOrderB > prevKeyIndex[pivot]) {
	          return -1;
	        } else if (nextOrderA > nextKeyIndex[pivot] && prevOrderB < prevKeyIndex[pivot]) {
	          return 1;
	        }
	      }
	      // pluggable. default to: next bigger than prev
	      return 1;
	    }
	    // prevOrderA, nextOrderB
	    for (var i = 0; i < next.length; i++) {
	      var pivot = next[i].key;
	      if (!Object.prototype.hasOwnProperty.call(prevKeyIndex, pivot)) {
	        continue;
	      }
	      if (nextOrderB < nextKeyIndex[pivot] && prevOrderA > prevKeyIndex[pivot]) {
	        return 1;
	      } else if (nextOrderB > nextKeyIndex[pivot] && prevOrderA < prevKeyIndex[pivot]) {
	        return -1;
	      }
	    }
	    // pluggable. default to: next bigger than prev
	    return -1;
	  });
	}

	module.exports = exports['default'];
	// to loop through and find a key's index each time), but I no longer care
	});

	unwrapExports(mergeDiff_1);

	var TransitionMotion_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



	var _mapToZero2 = _interopRequireDefault(mapToZero_1);



	var _stripStyle2 = _interopRequireDefault(stripStyle_1);



	var _stepper4 = _interopRequireDefault(stepper_1);



	var _mergeDiff2 = _interopRequireDefault(mergeDiff_1);



	var _performanceNow2 = _interopRequireDefault(performanceNow);



	var _raf2 = _interopRequireDefault(raf_1);



	var _shouldStopAnimation2 = _interopRequireDefault(shouldStopAnimation_1);



	var _react2 = _interopRequireDefault(React__default);



	var _propTypes2 = _interopRequireDefault(propTypes);

	var msPerFrame = 1000 / 60;

	// the children function & (potential) styles function asks as param an
	// Array<TransitionPlainStyle>, where each TransitionPlainStyle is of the format
	// {key: string, data?: any, style: PlainStyle}. However, the way we keep
	// internal states doesn't contain such a data structure (check the state and
	// TransitionMotionState). So when children function and others ask for such
	// data we need to generate them on the fly by combining mergedPropsStyles and
	// currentStyles/lastIdealStyles
	function rehydrateStyles(mergedPropsStyles, unreadPropStyles, plainStyles) {
	  // Copy the value to a `const` so that Flow understands that the const won't
	  // change and will be non-nullable in the callback below.
	  var cUnreadPropStyles = unreadPropStyles;
	  if (cUnreadPropStyles == null) {
	    return mergedPropsStyles.map(function (mergedPropsStyle, i) {
	      return {
	        key: mergedPropsStyle.key,
	        data: mergedPropsStyle.data,
	        style: plainStyles[i]
	      };
	    });
	  }
	  return mergedPropsStyles.map(function (mergedPropsStyle, i) {
	    for (var j = 0; j < cUnreadPropStyles.length; j++) {
	      if (cUnreadPropStyles[j].key === mergedPropsStyle.key) {
	        return {
	          key: cUnreadPropStyles[j].key,
	          data: cUnreadPropStyles[j].data,
	          style: plainStyles[i]
	        };
	      }
	    }
	    return { key: mergedPropsStyle.key, data: mergedPropsStyle.data, style: plainStyles[i] };
	  });
	}

	function shouldStopAnimationAll(currentStyles, destStyles, currentVelocities, mergedPropsStyles) {
	  if (mergedPropsStyles.length !== destStyles.length) {
	    return false;
	  }

	  for (var i = 0; i < mergedPropsStyles.length; i++) {
	    if (mergedPropsStyles[i].key !== destStyles[i].key) {
	      return false;
	    }
	  }

	  // we have the invariant that mergedPropsStyles and
	  // currentStyles/currentVelocities/last* are synced in terms of cells, see
	  // mergeAndSync comment for more info
	  for (var i = 0; i < mergedPropsStyles.length; i++) {
	    if (!_shouldStopAnimation2['default'](currentStyles[i], destStyles[i].style, currentVelocities[i])) {
	      return false;
	    }
	  }

	  return true;
	}

	// core key merging logic

	// things to do: say previously merged style is {a, b}, dest style (prop) is {b,
	// c}, previous current (interpolating) style is {a, b}
	// **invariant**: current[i] corresponds to merged[i] in terms of key

	// steps:
	// turn merged style into {a?, b, c}
	//    add c, value of c is destStyles.c
	//    maybe remove a, aka call willLeave(a), then merged is either {b, c} or {a, b, c}
	// turn current (interpolating) style from {a, b} into {a?, b, c}
	//    maybe remove a
	//    certainly add c, value of c is willEnter(c)
	// loop over merged and construct new current
	// dest doesn't change, that's owner's
	function mergeAndSync(willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldLastIdealStyles, oldLastIdealVelocities) {
	  var newMergedPropsStyles = _mergeDiff2['default'](oldMergedPropsStyles, destStyles, function (oldIndex, oldMergedPropsStyle) {
	    var leavingStyle = willLeave(oldMergedPropsStyle);
	    if (leavingStyle == null) {
	      didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
	      return null;
	    }
	    if (_shouldStopAnimation2['default'](oldCurrentStyles[oldIndex], leavingStyle, oldCurrentVelocities[oldIndex])) {
	      didLeave({ key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data });
	      return null;
	    }
	    return { key: oldMergedPropsStyle.key, data: oldMergedPropsStyle.data, style: leavingStyle };
	  });

	  var newCurrentStyles = [];
	  var newCurrentVelocities = [];
	  var newLastIdealStyles = [];
	  var newLastIdealVelocities = [];
	  for (var i = 0; i < newMergedPropsStyles.length; i++) {
	    var newMergedPropsStyleCell = newMergedPropsStyles[i];
	    var foundOldIndex = null;
	    for (var j = 0; j < oldMergedPropsStyles.length; j++) {
	      if (oldMergedPropsStyles[j].key === newMergedPropsStyleCell.key) {
	        foundOldIndex = j;
	        break;
	      }
	    }
	    // TODO: key search code
	    if (foundOldIndex == null) {
	      var plainStyle = willEnter(newMergedPropsStyleCell);
	      newCurrentStyles[i] = plainStyle;
	      newLastIdealStyles[i] = plainStyle;

	      var velocity = _mapToZero2['default'](newMergedPropsStyleCell.style);
	      newCurrentVelocities[i] = velocity;
	      newLastIdealVelocities[i] = velocity;
	    } else {
	      newCurrentStyles[i] = oldCurrentStyles[foundOldIndex];
	      newLastIdealStyles[i] = oldLastIdealStyles[foundOldIndex];
	      newCurrentVelocities[i] = oldCurrentVelocities[foundOldIndex];
	      newLastIdealVelocities[i] = oldLastIdealVelocities[foundOldIndex];
	    }
	  }

	  return [newMergedPropsStyles, newCurrentStyles, newCurrentVelocities, newLastIdealStyles, newLastIdealVelocities];
	}

	var TransitionMotion = (function (_React$Component) {
	  _inherits(TransitionMotion, _React$Component);

	  _createClass(TransitionMotion, null, [{
	    key: 'propTypes',
	    value: {
	      defaultStyles: _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
	        key: _propTypes2['default'].string.isRequired,
	        data: _propTypes2['default'].any,
	        style: _propTypes2['default'].objectOf(_propTypes2['default'].number).isRequired
	      })),
	      styles: _propTypes2['default'].oneOfType([_propTypes2['default'].func, _propTypes2['default'].arrayOf(_propTypes2['default'].shape({
	        key: _propTypes2['default'].string.isRequired,
	        data: _propTypes2['default'].any,
	        style: _propTypes2['default'].objectOf(_propTypes2['default'].oneOfType([_propTypes2['default'].number, _propTypes2['default'].object])).isRequired
	      }))]).isRequired,
	      children: _propTypes2['default'].func.isRequired,
	      willEnter: _propTypes2['default'].func,
	      willLeave: _propTypes2['default'].func,
	      didLeave: _propTypes2['default'].func
	    },
	    enumerable: true
	  }, {
	    key: 'defaultProps',
	    value: {
	      willEnter: function willEnter(styleThatEntered) {
	        return _stripStyle2['default'](styleThatEntered.style);
	      },
	      // recall: returning null makes the current unmounting TransitionStyle
	      // disappear immediately
	      willLeave: function willLeave() {
	        return null;
	      },
	      didLeave: function didLeave() {}
	    },
	    enumerable: true
	  }]);

	  function TransitionMotion(props) {
	    var _this = this;

	    _classCallCheck(this, TransitionMotion);

	    _React$Component.call(this, props);
	    this.unmounting = false;
	    this.animationID = null;
	    this.prevTime = 0;
	    this.accumulatedTime = 0;
	    this.unreadPropStyles = null;

	    this.clearUnreadPropStyle = function (unreadPropStyles) {
	      var _mergeAndSync = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, unreadPropStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);

	      var mergedPropsStyles = _mergeAndSync[0];
	      var currentStyles = _mergeAndSync[1];
	      var currentVelocities = _mergeAndSync[2];
	      var lastIdealStyles = _mergeAndSync[3];
	      var lastIdealVelocities = _mergeAndSync[4];

	      for (var i = 0; i < unreadPropStyles.length; i++) {
	        var unreadPropStyle = unreadPropStyles[i].style;
	        var dirty = false;

	        for (var key in unreadPropStyle) {
	          if (!Object.prototype.hasOwnProperty.call(unreadPropStyle, key)) {
	            continue;
	          }

	          var styleValue = unreadPropStyle[key];
	          if (typeof styleValue === 'number') {
	            if (!dirty) {
	              dirty = true;
	              currentStyles[i] = _extends({}, currentStyles[i]);
	              currentVelocities[i] = _extends({}, currentVelocities[i]);
	              lastIdealStyles[i] = _extends({}, lastIdealStyles[i]);
	              lastIdealVelocities[i] = _extends({}, lastIdealVelocities[i]);
	              mergedPropsStyles[i] = {
	                key: mergedPropsStyles[i].key,
	                data: mergedPropsStyles[i].data,
	                style: _extends({}, mergedPropsStyles[i].style)
	              };
	            }
	            currentStyles[i][key] = styleValue;
	            currentVelocities[i][key] = 0;
	            lastIdealStyles[i][key] = styleValue;
	            lastIdealVelocities[i][key] = 0;
	            mergedPropsStyles[i].style[key] = styleValue;
	          }
	        }
	      }

	      // unlike the other 2 components, we can't detect staleness and optionally
	      // opt out of setState here. each style object's data might contain new
	      // stuff we're not/cannot compare
	      _this.setState({
	        currentStyles: currentStyles,
	        currentVelocities: currentVelocities,
	        mergedPropsStyles: mergedPropsStyles,
	        lastIdealStyles: lastIdealStyles,
	        lastIdealVelocities: lastIdealVelocities
	      });
	    };

	    this.startAnimationIfNecessary = function () {
	      if (_this.unmounting) {
	        return;
	      }

	      // TODO: when config is {a: 10} and dest is {a: 10} do we raf once and
	      // call cb? No, otherwise accidental parent rerender causes cb trigger
	      _this.animationID = _raf2['default'](function (timestamp) {
	        // https://github.com/chenglou/react-motion/pull/420
	        // > if execution passes the conditional if (this.unmounting), then
	        // executes async defaultRaf and after that component unmounts and after
	        // that the callback of defaultRaf is called, then setState will be called
	        // on unmounted component.
	        if (_this.unmounting) {
	          return;
	        }

	        var propStyles = _this.props.styles;
	        var destStyles = typeof propStyles === 'function' ? propStyles(rehydrateStyles(_this.state.mergedPropsStyles, _this.unreadPropStyles, _this.state.lastIdealStyles)) : propStyles;

	        // check if we need to animate in the first place
	        if (shouldStopAnimationAll(_this.state.currentStyles, destStyles, _this.state.currentVelocities, _this.state.mergedPropsStyles)) {
	          // no need to cancel animationID here; shouldn't have any in flight
	          _this.animationID = null;
	          _this.accumulatedTime = 0;
	          return;
	        }

	        var currentTime = timestamp || _performanceNow2['default']();
	        var timeDelta = currentTime - _this.prevTime;
	        _this.prevTime = currentTime;
	        _this.accumulatedTime = _this.accumulatedTime + timeDelta;
	        // more than 10 frames? prolly switched browser tab. Restart
	        if (_this.accumulatedTime > msPerFrame * 10) {
	          _this.accumulatedTime = 0;
	        }

	        if (_this.accumulatedTime === 0) {
	          // no need to cancel animationID here; shouldn't have any in flight
	          _this.animationID = null;
	          _this.startAnimationIfNecessary();
	          return;
	        }

	        var currentFrameCompletion = (_this.accumulatedTime - Math.floor(_this.accumulatedTime / msPerFrame) * msPerFrame) / msPerFrame;
	        var framesToCatchUp = Math.floor(_this.accumulatedTime / msPerFrame);

	        var _mergeAndSync2 = mergeAndSync(_this.props.willEnter, _this.props.willLeave, _this.props.didLeave, _this.state.mergedPropsStyles, destStyles, _this.state.currentStyles, _this.state.currentVelocities, _this.state.lastIdealStyles, _this.state.lastIdealVelocities);

	        var newMergedPropsStyles = _mergeAndSync2[0];
	        var newCurrentStyles = _mergeAndSync2[1];
	        var newCurrentVelocities = _mergeAndSync2[2];
	        var newLastIdealStyles = _mergeAndSync2[3];
	        var newLastIdealVelocities = _mergeAndSync2[4];

	        for (var i = 0; i < newMergedPropsStyles.length; i++) {
	          var newMergedPropsStyle = newMergedPropsStyles[i].style;
	          var newCurrentStyle = {};
	          var newCurrentVelocity = {};
	          var newLastIdealStyle = {};
	          var newLastIdealVelocity = {};

	          for (var key in newMergedPropsStyle) {
	            if (!Object.prototype.hasOwnProperty.call(newMergedPropsStyle, key)) {
	              continue;
	            }

	            var styleValue = newMergedPropsStyle[key];
	            if (typeof styleValue === 'number') {
	              newCurrentStyle[key] = styleValue;
	              newCurrentVelocity[key] = 0;
	              newLastIdealStyle[key] = styleValue;
	              newLastIdealVelocity[key] = 0;
	            } else {
	              var newLastIdealStyleValue = newLastIdealStyles[i][key];
	              var newLastIdealVelocityValue = newLastIdealVelocities[i][key];
	              for (var j = 0; j < framesToCatchUp; j++) {
	                var _stepper = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

	                newLastIdealStyleValue = _stepper[0];
	                newLastIdealVelocityValue = _stepper[1];
	              }

	              var _stepper2 = _stepper4['default'](msPerFrame / 1000, newLastIdealStyleValue, newLastIdealVelocityValue, styleValue.val, styleValue.stiffness, styleValue.damping, styleValue.precision);

	              var nextIdealX = _stepper2[0];
	              var nextIdealV = _stepper2[1];

	              newCurrentStyle[key] = newLastIdealStyleValue + (nextIdealX - newLastIdealStyleValue) * currentFrameCompletion;
	              newCurrentVelocity[key] = newLastIdealVelocityValue + (nextIdealV - newLastIdealVelocityValue) * currentFrameCompletion;
	              newLastIdealStyle[key] = newLastIdealStyleValue;
	              newLastIdealVelocity[key] = newLastIdealVelocityValue;
	            }
	          }

	          newLastIdealStyles[i] = newLastIdealStyle;
	          newLastIdealVelocities[i] = newLastIdealVelocity;
	          newCurrentStyles[i] = newCurrentStyle;
	          newCurrentVelocities[i] = newCurrentVelocity;
	        }

	        _this.animationID = null;
	        // the amount we're looped over above
	        _this.accumulatedTime -= framesToCatchUp * msPerFrame;

	        _this.setState({
	          currentStyles: newCurrentStyles,
	          currentVelocities: newCurrentVelocities,
	          lastIdealStyles: newLastIdealStyles,
	          lastIdealVelocities: newLastIdealVelocities,
	          mergedPropsStyles: newMergedPropsStyles
	        });

	        _this.unreadPropStyles = null;

	        _this.startAnimationIfNecessary();
	      });
	    };

	    this.state = this.defaultState();
	  }

	  TransitionMotion.prototype.defaultState = function defaultState() {
	    var _props = this.props;
	    var defaultStyles = _props.defaultStyles;
	    var styles = _props.styles;
	    var willEnter = _props.willEnter;
	    var willLeave = _props.willLeave;
	    var didLeave = _props.didLeave;

	    var destStyles = typeof styles === 'function' ? styles(defaultStyles) : styles;

	    // this is special. for the first time around, we don't have a comparison
	    // between last (no last) and current merged props. we'll compute last so:
	    // say default is {a, b} and styles (dest style) is {b, c}, we'll
	    // fabricate last as {a, b}
	    var oldMergedPropsStyles = undefined;
	    if (defaultStyles == null) {
	      oldMergedPropsStyles = destStyles;
	    } else {
	      oldMergedPropsStyles = defaultStyles.map(function (defaultStyleCell) {
	        // TODO: key search code
	        for (var i = 0; i < destStyles.length; i++) {
	          if (destStyles[i].key === defaultStyleCell.key) {
	            return destStyles[i];
	          }
	        }
	        return defaultStyleCell;
	      });
	    }
	    var oldCurrentStyles = defaultStyles == null ? destStyles.map(function (s) {
	      return _stripStyle2['default'](s.style);
	    }) : defaultStyles.map(function (s) {
	      return _stripStyle2['default'](s.style);
	    });
	    var oldCurrentVelocities = defaultStyles == null ? destStyles.map(function (s) {
	      return _mapToZero2['default'](s.style);
	    }) : defaultStyles.map(function (s) {
	      return _mapToZero2['default'](s.style);
	    });

	    var _mergeAndSync3 = mergeAndSync(
	    // Because this is an old-style createReactClass component, Flow doesn't
	    // understand that the willEnter and willLeave props have default values
	    // and will always be present.
	    willEnter, willLeave, didLeave, oldMergedPropsStyles, destStyles, oldCurrentStyles, oldCurrentVelocities, oldCurrentStyles, // oldLastIdealStyles really
	    oldCurrentVelocities);

	    var mergedPropsStyles = _mergeAndSync3[0];
	    var currentStyles = _mergeAndSync3[1];
	    var currentVelocities = _mergeAndSync3[2];
	    var lastIdealStyles = _mergeAndSync3[3];
	    var lastIdealVelocities = _mergeAndSync3[4];
	    // oldLastIdealVelocities really

	    return {
	      currentStyles: currentStyles,
	      currentVelocities: currentVelocities,
	      lastIdealStyles: lastIdealStyles,
	      lastIdealVelocities: lastIdealVelocities,
	      mergedPropsStyles: mergedPropsStyles
	    };
	  };

	  // after checking for unreadPropStyles != null, we manually go set the
	  // non-interpolating values (those that are a number, without a spring
	  // config)

	  TransitionMotion.prototype.componentDidMount = function componentDidMount() {
	    this.prevTime = _performanceNow2['default']();
	    this.startAnimationIfNecessary();
	  };

	  TransitionMotion.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
	    if (this.unreadPropStyles) {
	      // previous props haven't had the chance to be set yet; set them here
	      this.clearUnreadPropStyle(this.unreadPropStyles);
	    }

	    var styles = props.styles;
	    if (typeof styles === 'function') {
	      this.unreadPropStyles = styles(rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.lastIdealStyles));
	    } else {
	      this.unreadPropStyles = styles;
	    }

	    if (this.animationID == null) {
	      this.prevTime = _performanceNow2['default']();
	      this.startAnimationIfNecessary();
	    }
	  };

	  TransitionMotion.prototype.componentWillUnmount = function componentWillUnmount() {
	    this.unmounting = true;
	    if (this.animationID != null) {
	      _raf2['default'].cancel(this.animationID);
	      this.animationID = null;
	    }
	  };

	  TransitionMotion.prototype.render = function render() {
	    var hydratedStyles = rehydrateStyles(this.state.mergedPropsStyles, this.unreadPropStyles, this.state.currentStyles);
	    var renderedChildren = this.props.children(hydratedStyles);
	    return renderedChildren && _react2['default'].Children.only(renderedChildren);
	  };

	  return TransitionMotion;
	})(_react2['default'].Component);

	exports['default'] = TransitionMotion;
	module.exports = exports['default'];

	// list of styles, each containing interpolating values. Part of what's passed
	// to children function. Notice that this is
	// Array<ActualInterpolatingStyleObject>, without the wrapper that is {key: ...,
	// data: ... style: ActualInterpolatingStyleObject}. Only mergedPropsStyles
	// contains the key & data info (so that we only have a single source of truth
	// for these, and to save space). Check the comment for `rehydrateStyles` to
	// see how we regenerate the entirety of what's passed to children function

	// the array that keeps track of currently rendered stuff! Including stuff
	// that you've unmounted but that's still animating. This is where it lives

	// it's possible that currentStyle's value is stale: if props is immediately
	// changed from 0 to 400 to spring(0) again, the async currentStyle is still
	// at 0 (didn't have time to tick and interpolate even once). If we naively
	// compare currentStyle with destVal it'll be 0 === 0 (no animation, stop).
	// In reality currentStyle should be 400
	});

	unwrapExports(TransitionMotion_1);

	var presets = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports["default"] = {
	  noWobble: { stiffness: 170, damping: 26 }, // the default, if nothing provided
	  gentle: { stiffness: 120, damping: 14 },
	  wobbly: { stiffness: 180, damping: 12 },
	  stiff: { stiffness: 210, damping: 20 }
	};
	module.exports = exports["default"];
	});

	unwrapExports(presets);

	var spring_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports['default'] = spring;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }



	var _presets2 = _interopRequireDefault(presets);

	var defaultConfig = _extends({}, _presets2['default'].noWobble, {
	  precision: 0.01
	});

	function spring(val, config) {
	  return _extends({}, defaultConfig, config, { val: val });
	}

	module.exports = exports['default'];
	});

	unwrapExports(spring_1);

	var reorderKeys_1 = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;
	exports['default'] = reorderKeys;

	var hasWarned = false;

	function reorderKeys() {
	  {
	    if (!hasWarned) {
	      hasWarned = true;
	      console.error('`reorderKeys` has been removed, since it is no longer needed for TransitionMotion\'s new styles array API.');
	    }
	  }
	}

	module.exports = exports['default'];
	});

	unwrapExports(reorderKeys_1);

	var reactMotion = createCommonjsModule(function (module, exports) {

	exports.__esModule = true;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }



	exports.Motion = _interopRequire(Motion_1);



	exports.StaggeredMotion = _interopRequire(StaggeredMotion_1);



	exports.TransitionMotion = _interopRequire(TransitionMotion_1);



	exports.spring = _interopRequire(spring_1);



	exports.presets = _interopRequire(presets);



	exports.stripStyle = _interopRequire(stripStyle_1);

	// deprecated, dummy warning function



	exports.reorderKeys = _interopRequire(reorderKeys_1);
	});

	unwrapExports(reactMotion);
	var reactMotion_1 = reactMotion.Motion;
	var reactMotion_2 = reactMotion.StaggeredMotion;
	var reactMotion_3 = reactMotion.TransitionMotion;
	var reactMotion_4 = reactMotion.spring;
	var reactMotion_5 = reactMotion.presets;
	var reactMotion_6 = reactMotion.stripStyle;
	var reactMotion_7 = reactMotion.reorderKeys;

	var DoubleRenderBlocker = function (_React$Component) {
	  _inheritsLoose(DoubleRenderBlocker, _React$Component);

	  function DoubleRenderBlocker() {
	    return _React$Component.apply(this, arguments) || this;
	  }

	  var _proto = DoubleRenderBlocker.prototype;

	  _proto.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	    if (isEqual(origin, nextProps.change)) {
	      return true;
	    }

	    if (isEqual(this.props.change, nextProps.change)) {
	      return false;
	    }

	    return true;
	  };

	  _proto.render = function render() {
	    return this.props.children(this.props.change);
	  };

	  return DoubleRenderBlocker;
	}(React__default.Component);

	var Moveable = function (_Component) {
	  _inheritsLoose(Moveable, _Component);

	  function Moveable() {
	    return _Component.apply(this, arguments) || this;
	  }

	  var _proto2 = Moveable.prototype;

	  _proto2.getFinal = function getFinal() {
	    var destination = this.props.destination;
	    var speed = this.props.speed;

	    if (speed === 'INSTANT') {
	      return destination;
	    }

	    var config = speed === 'FAST' ? physics.fast : physics.standard;
	    return {
	      x: reactMotion_4(destination.x, config),
	      y: reactMotion_4(destination.y, config)
	    };
	  };

	  _proto2.render = function render() {
	    var _this = this;

	    var final = this.getFinal();
	    return React__default.createElement(reactMotion_1, {
	      defaultStyle: origin,
	      style: final,
	      onRest: this.props.onMoveEnd
	    }, function (current) {
	      var _this$props = _this.props,
	          speed = _this$props.speed,
	          destination = _this$props.destination,
	          children = _this$props.children;
	      var target = speed === 'INSTANT' ? destination : current;
	      return React__default.createElement(DoubleRenderBlocker, {
	        change: target
	      }, children);
	    });
	  };

	  return Moveable;
	}(React.Component);

	Moveable.defaultProps = {
	  destination: origin
	};

	var getWindowFromRef = (function (ref) {
	  return ref ? ref.ownerDocument.defaultView : window;
	});

	var selector = "[" + dragHandle + "]";

	var getDragHandleRef = function getDragHandleRef(draggableRef) {
	  if (draggableRef.hasAttribute(dragHandle)) {
	    return draggableRef;
	  }

	  var el = draggableRef.querySelector(selector);
	  return el || null;
	};

	var retainingFocusFor = null;

	var clearRetentionOnFocusChange = function () {
	  var isBound = false;

	  var bind = function bind() {
	    if (isBound) {
	      return;
	    }

	    isBound = true;
	    window.addEventListener('focus', onWindowFocusChange, {
	      capture: true
	    });
	  };

	  var unbind = function unbind() {
	    if (!isBound) {
	      return;
	    }

	    isBound = false;
	    window.removeEventListener('focus', onWindowFocusChange, {
	      capture: true
	    });
	  };

	  var onWindowFocusChange = function onWindowFocusChange() {
	    unbind();
	    retainingFocusFor = null;
	  };

	  var result = function result() {
	    return bind();
	  };

	  result.cancel = function () {
	    return unbind();
	  };

	  return result;
	}();

	var retain = function retain(id) {
	  retainingFocusFor = id;
	  clearRetentionOnFocusChange();
	};

	var tryRestoreFocus = function tryRestoreFocus(id, draggableRef) {
	  if (!retainingFocusFor) {
	    return;
	  }

	  if (id !== retainingFocusFor) {
	    return;
	  }

	  retainingFocusFor = null;
	  clearRetentionOnFocusChange.cancel();
	  var dragHandleRef = getDragHandleRef(draggableRef);

	  if (!dragHandleRef) {
	    console.warn('Could not find drag handle in the DOM to focus on it');
	    return;
	  }

	  dragHandleRef.focus();
	};

	var retainer = {
	  retain: retain,
	  tryRestoreFocus: tryRestoreFocus
	};

	var interactiveTagNames = {
	  input: true,
	  button: true,
	  textarea: true,
	  select: true,
	  option: true,
	  optgroup: true,
	  video: true,
	  audio: true
	};

	var isAnInteractiveElement = function isAnInteractiveElement(parent, current) {
	  if (current == null) {
	    return false;
	  }

	  var hasAnInteractiveTag = Boolean(interactiveTagNames[current.tagName.toLowerCase()]);

	  if (hasAnInteractiveTag) {
	    return true;
	  }

	  var attribute = current.getAttribute('contenteditable');

	  if (attribute === 'true' || attribute === '') {
	    return true;
	  }

	  if (current === parent) {
	    return false;
	  }

	  return isAnInteractiveElement(parent, current.parentElement);
	};

	var shouldAllowDraggingFromTarget = (function (event, props) {
	  if (props.canDragInteractiveElements) {
	    return true;
	  }

	  var target = event.target,
	      currentTarget = event.currentTarget;

	  if (!(target instanceof Element) || !(currentTarget instanceof Element)) {
	    return true;
	  }

	  return !isAnInteractiveElement(currentTarget, target);
	});

	var createScheduler = (function (callbacks) {
	  var memoizedMove = index$1(function (x, y) {
	    var point = {
	      x: x,
	      y: y
	    };
	    callbacks.onMove(point);
	  });
	  var move = index$2(function (point) {
	    return memoizedMove(point.x, point.y);
	  });
	  var moveUp = index$2(callbacks.onMoveUp);
	  var moveDown = index$2(callbacks.onMoveDown);
	  var moveRight = index$2(callbacks.onMoveRight);
	  var moveLeft = index$2(callbacks.onMoveLeft);
	  var windowScrollMove = index$2(callbacks.onWindowScroll);

	  var cancel = function cancel() {
	    move.cancel();
	    moveUp.cancel();
	    moveDown.cancel();
	    moveRight.cancel();
	    moveLeft.cancel();
	    windowScrollMove.cancel();
	  };

	  return {
	    move: move,
	    moveUp: moveUp,
	    moveDown: moveDown,
	    moveRight: moveRight,
	    moveLeft: moveLeft,
	    windowScrollMove: windowScrollMove,
	    cancel: cancel
	  };
	});

	var sloppyClickThreshold = 5;
	var isSloppyClickThresholdExceeded = (function (original, current) {
	  return Math.abs(current.x - original.x) >= sloppyClickThreshold || Math.abs(current.y - original.y) >= sloppyClickThreshold;
	});

	var tab = 9;
	var enter = 13;
	var escape = 27;
	var space = 32;
	var pageUp = 33;
	var pageDown = 34;
	var end = 35;
	var home = 36;
	var arrowLeft = 37;
	var arrowUp = 38;
	var arrowRight = 39;
	var arrowDown = 40;

	var _preventedKeys;
	var preventedKeys = (_preventedKeys = {}, _preventedKeys[enter] = true, _preventedKeys[tab] = true, _preventedKeys);
	var preventStandardKeyEvents = (function (event) {
	  if (preventedKeys[event.keyCode]) {
	    event.preventDefault();
	  }
	});

	var bindEvents = function bindEvents(el, bindings, sharedOptions) {
	  bindings.forEach(function (binding) {
	    var options = _extends({}, sharedOptions, binding.options);

	    el.addEventListener(binding.eventName, binding.fn, options);
	  });
	};
	var unbindEvents = function unbindEvents(el, bindings, sharedOptions) {
	  bindings.forEach(function (binding) {
	    var options = _extends({}, sharedOptions, binding.options);

	    el.removeEventListener(binding.eventName, binding.fn, options);
	  });
	};

	var createPostDragEventPreventer = (function (getWindow) {
	  var isBound = false;

	  var bind = function bind() {
	    if (isBound) {
	      return;
	    }

	    isBound = true;
	    bindEvents(getWindow(), pointerEvents, {
	      capture: true
	    });
	  };

	  var unbind = function unbind() {
	    if (!isBound) {
	      return;
	    }

	    isBound = false;
	    unbindEvents(getWindow(), pointerEvents, {
	      capture: true
	    });
	  };

	  var pointerEvents = [{
	    eventName: 'click',
	    fn: function fn(event) {
	      event.preventDefault();
	      unbind();
	    }
	  }, {
	    eventName: 'mousedown',
	    fn: unbind
	  }, {
	    eventName: 'touchstart',
	    fn: unbind
	  }];

	  var preventNext = function preventNext() {
	    if (isBound) {
	      unbind();
	    }

	    bind();
	  };

	  var preventer = {
	    preventNext: preventNext,
	    abort: unbind
	  };
	  return preventer;
	});

	var createEventMarshal = (function () {
	  var isMouseDownHandled = false;

	  var handle = function handle() {
	    !!isMouseDownHandled ? index(false, 'Cannot handle mouse down as it is already handled') : void 0;
	    isMouseDownHandled = true;
	  };

	  var isHandled = function isHandled() {
	    return isMouseDownHandled;
	  };

	  var reset = function reset() {
	    isMouseDownHandled = false;
	  };

	  return {
	    handle: handle,
	    isHandled: isHandled,
	    reset: reset
	  };
	});

	var supportedEventName = function () {
	  var base = 'visibilitychange';

	  if (typeof document === 'undefined') {
	    return base;
	  }

	  var candidates = [base, "ms" + base, "webkit" + base, "moz" + base, "o" + base];
	  var supported = candidates.find(function (eventName) {
	    return "on" + eventName in document;
	  });
	  return supported || base;
	}();

	var primaryButton = 0;

	var noop = function noop() {};

	var mouseDownMarshal = createEventMarshal();
	var createMouseSensor = (function (_ref) {
	  var callbacks = _ref.callbacks,
	      getWindow = _ref.getWindow,
	      canStartCapturing = _ref.canStartCapturing;
	  var state = {
	    isDragging: false,
	    pending: null
	  };

	  var setState = function setState(newState) {
	    state = newState;
	  };

	  var isDragging = function isDragging() {
	    return state.isDragging;
	  };

	  var isCapturing = function isCapturing() {
	    return Boolean(state.pending || state.isDragging);
	  };

	  var schedule = createScheduler(callbacks);
	  var postDragEventPreventer = createPostDragEventPreventer(getWindow);

	  var startDragging = function startDragging(fn) {
	    if (fn === void 0) {
	      fn = noop;
	    }

	    setState({
	      pending: null,
	      isDragging: true
	    });
	    fn();
	  };

	  var stopDragging = function stopDragging(fn, shouldBlockClick) {
	    if (fn === void 0) {
	      fn = noop;
	    }

	    if (shouldBlockClick === void 0) {
	      shouldBlockClick = true;
	    }

	    schedule.cancel();
	    unbindWindowEvents();
	    mouseDownMarshal.reset();

	    if (shouldBlockClick) {
	      postDragEventPreventer.preventNext();
	    }

	    setState({
	      isDragging: false,
	      pending: null
	    });
	    fn();
	  };

	  var startPendingDrag = function startPendingDrag(point) {
	    setState({
	      pending: point,
	      isDragging: false
	    });
	    bindWindowEvents();
	  };

	  var stopPendingDrag = function stopPendingDrag() {
	    stopDragging(noop, false);
	  };

	  var kill = function kill(fn) {
	    if (fn === void 0) {
	      fn = noop;
	    }

	    if (state.pending) {
	      stopPendingDrag();
	      return;
	    }

	    stopDragging(fn);
	  };

	  var unmount = function unmount() {
	    kill();
	    postDragEventPreventer.abort();
	  };

	  var cancel = function cancel() {
	    kill(callbacks.onCancel);
	  };

	  var windowBindings = [{
	    eventName: 'mousemove',
	    fn: function fn(event) {
	      var button = event.button,
	          clientX = event.clientX,
	          clientY = event.clientY;

	      if (button !== primaryButton) {
	        return;
	      }

	      var point = {
	        x: clientX,
	        y: clientY
	      };

	      if (state.isDragging) {
	        event.preventDefault();
	        schedule.move(point);
	        return;
	      }

	      if (!state.pending) {
	        kill();
	        index(false, 'Expected there to be a pending drag');
	      }

	      if (!isSloppyClickThresholdExceeded(state.pending, point)) {
	        return;
	      }

	      event.preventDefault();
	      startDragging(function () {
	        return callbacks.onLift({
	          clientSelection: point,
	          autoScrollMode: 'FLUID'
	        });
	      });
	    }
	  }, {
	    eventName: 'mouseup',
	    fn: function fn(event) {
	      if (state.pending) {
	        stopPendingDrag();
	        return;
	      }

	      event.preventDefault();
	      stopDragging(callbacks.onDrop);
	    }
	  }, {
	    eventName: 'mousedown',
	    fn: function fn(event) {
	      if (state.isDragging) {
	        event.preventDefault();
	      }

	      stopDragging(callbacks.onCancel);
	    }
	  }, {
	    eventName: 'keydown',
	    fn: function fn(event) {
	      if (!state.isDragging) {
	        cancel();
	        return;
	      }

	      if (event.keyCode === escape) {
	        event.preventDefault();
	        cancel();
	        return;
	      }

	      preventStandardKeyEvents(event);
	    }
	  }, {
	    eventName: 'resize',
	    fn: cancel
	  }, {
	    eventName: 'scroll',
	    options: {
	      passive: true,
	      capture: false
	    },
	    fn: function fn() {
	      if (state.pending) {
	        stopPendingDrag();
	        return;
	      }

	      schedule.windowScrollMove();
	    }
	  }, {
	    eventName: 'webkitmouseforcechanged',
	    fn: function fn(event) {
	      if (event.webkitForce == null || MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN == null) {
	        {
	          console.warn('handling a mouse force changed event when it is not supported');
	        }

	        return;
	      }

	      var forcePressThreshold = MouseEvent.WEBKIT_FORCE_AT_FORCE_MOUSE_DOWN;
	      var isForcePressing = event.webkitForce >= forcePressThreshold;

	      if (isForcePressing) {
	        cancel();
	      }
	    }
	  }, {
	    eventName: supportedEventName,
	    fn: cancel
	  }];

	  var bindWindowEvents = function bindWindowEvents() {
	    var win = getWindow();
	    bindEvents(win, windowBindings, {
	      capture: true
	    });
	  };

	  var unbindWindowEvents = function unbindWindowEvents() {
	    var win = getWindow();
	    unbindEvents(win, windowBindings, {
	      capture: true
	    });
	  };

	  var onMouseDown = function onMouseDown(event) {
	    if (mouseDownMarshal.isHandled()) {
	      return;
	    }

	    !!isCapturing() ? index(false, 'Should not be able to perform a mouse down while a drag or pending drag is occurring') : void 0;

	    if (!canStartCapturing(event)) {
	      event.preventDefault();
	      return;
	    }

	    if (event.button !== primaryButton) {
	      return;
	    }

	    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
	      return;
	    }

	    mouseDownMarshal.handle();
	    event.preventDefault();
	    var point = {
	      x: event.clientX,
	      y: event.clientY
	    };
	    startPendingDrag(point);
	  };

	  var sensor = {
	    onMouseDown: onMouseDown,
	    kill: kill,
	    isCapturing: isCapturing,
	    isDragging: isDragging,
	    unmount: unmount
	  };
	  return sensor;
	});

	var getBorderBoxCenterPosition = (function (el) {
	  return getRect(el.getBoundingClientRect()).center;
	});

	var _scrollJumpKeys;
	var scrollJumpKeys = (_scrollJumpKeys = {}, _scrollJumpKeys[pageDown] = true, _scrollJumpKeys[pageUp] = true, _scrollJumpKeys[home] = true, _scrollJumpKeys[end] = true, _scrollJumpKeys);

	var noop$1 = function noop() {};

	var createKeyboardSensor = (function (_ref) {
	  var callbacks = _ref.callbacks,
	      getWindow = _ref.getWindow,
	      getDraggableRef = _ref.getDraggableRef,
	      canStartCapturing = _ref.canStartCapturing;
	  var state = {
	    isDragging: false
	  };

	  var setState = function setState(newState) {
	    state = newState;
	  };

	  var startDragging = function startDragging(fn) {
	    if (fn === void 0) {
	      fn = noop$1;
	    }

	    setState({
	      isDragging: true
	    });
	    bindWindowEvents();
	    fn();
	  };

	  var stopDragging = function stopDragging(fn) {
	    if (fn === void 0) {
	      fn = noop$1;
	    }

	    schedule.cancel();
	    unbindWindowEvents();
	    setState({
	      isDragging: false
	    });
	    fn();
	  };

	  var kill = function kill() {
	    return stopDragging();
	  };

	  var cancel = function cancel() {
	    stopDragging(callbacks.onCancel);
	  };

	  var isDragging = function isDragging() {
	    return state.isDragging;
	  };

	  var schedule = createScheduler(callbacks);

	  var onKeyDown = function onKeyDown(event) {
	    if (!isDragging()) {
	      if (event.defaultPrevented) {
	        return;
	      }

	      if (!canStartCapturing(event)) {
	        event.preventDefault();
	        return;
	      }

	      if (event.keyCode !== space) {
	        return;
	      }

	      var ref = getDraggableRef();
	      !ref ? index(false, 'Cannot start a keyboard drag without a draggable ref') : void 0;
	      var center = getBorderBoxCenterPosition(ref);
	      event.preventDefault();
	      startDragging(function () {
	        return callbacks.onLift({
	          clientSelection: center,
	          autoScrollMode: 'JUMP'
	        });
	      });
	      return;
	    }

	    if (event.keyCode === escape) {
	      event.preventDefault();
	      cancel();
	      return;
	    }

	    if (event.keyCode === space) {
	      event.preventDefault();
	      stopDragging(callbacks.onDrop);
	      return;
	    }

	    if (event.keyCode === arrowDown) {
	      event.preventDefault();
	      schedule.moveDown();
	      return;
	    }

	    if (event.keyCode === arrowUp) {
	      event.preventDefault();
	      schedule.moveUp();
	      return;
	    }

	    if (event.keyCode === arrowRight) {
	      event.preventDefault();
	      schedule.moveRight();
	      return;
	    }

	    if (event.keyCode === arrowLeft) {
	      event.preventDefault();
	      schedule.moveLeft();
	      return;
	    }

	    if (scrollJumpKeys[event.keyCode]) {
	      event.preventDefault();
	      return;
	    }

	    preventStandardKeyEvents(event);
	  };

	  var windowBindings = [{
	    eventName: 'mousedown',
	    fn: cancel
	  }, {
	    eventName: 'mouseup',
	    fn: cancel
	  }, {
	    eventName: 'click',
	    fn: cancel
	  }, {
	    eventName: 'touchstart',
	    fn: cancel
	  }, {
	    eventName: 'resize',
	    fn: cancel
	  }, {
	    eventName: 'wheel',
	    fn: cancel
	  }, {
	    eventName: 'scroll',
	    options: {
	      capture: false
	    },
	    fn: callbacks.onWindowScroll
	  }, {
	    eventName: supportedEventName,
	    fn: cancel
	  }];

	  var bindWindowEvents = function bindWindowEvents() {
	    bindEvents(getWindow(), windowBindings, {
	      capture: true
	    });
	  };

	  var unbindWindowEvents = function unbindWindowEvents() {
	    unbindEvents(getWindow(), windowBindings, {
	      capture: true
	    });
	  };

	  var sensor = {
	    onKeyDown: onKeyDown,
	    kill: kill,
	    isDragging: isDragging,
	    isCapturing: isDragging,
	    unmount: kill
	  };
	  return sensor;
	});

	var timeForLongPress = 150;
	var forcePressThreshold = 0.15;
	var touchStartMarshal = createEventMarshal();

	var noop$2 = function noop() {};

	var webkitHack = function () {
	  var stub = {
	    preventTouchMove: noop$2,
	    releaseTouchMove: noop$2
	  };

	  if (typeof window === 'undefined') {
	    return stub;
	  }

	  if (!('ontouchstart' in window)) {
	    return stub;
	  }

	  var isBlocking = false;
	  window.addEventListener('touchmove', function (event) {
	    if (!isBlocking) {
	      return;
	    }

	    if (event.defaultPrevented) {
	      return;
	    }

	    event.preventDefault();
	  }, {
	    passive: false,
	    capture: false
	  });

	  var preventTouchMove = function preventTouchMove() {
	    isBlocking = true;
	  };

	  var releaseTouchMove = function releaseTouchMove() {
	    isBlocking = false;
	  };

	  return {
	    preventTouchMove: preventTouchMove,
	    releaseTouchMove: releaseTouchMove
	  };
	}();

	var initial = {
	  isDragging: false,
	  pending: null,
	  hasMoved: false,
	  longPressTimerId: null
	};
	var createTouchSensor = (function (_ref) {
	  var callbacks = _ref.callbacks,
	      getWindow = _ref.getWindow,
	      canStartCapturing = _ref.canStartCapturing;
	  var state = initial;

	  var setState = function setState(partial) {
	    state = _extends({}, state, partial);
	  };

	  var isDragging = function isDragging() {
	    return state.isDragging;
	  };

	  var isCapturing = function isCapturing() {
	    return Boolean(state.pending || state.isDragging || state.longPressTimerId);
	  };

	  var schedule = createScheduler(callbacks);
	  var postDragEventPreventer = createPostDragEventPreventer(getWindow);

	  var startDragging = function startDragging() {
	    var pending = state.pending;

	    if (!pending) {
	      kill();
	      index(false, 'cannot start a touch drag without a pending position');
	    }

	    setState({
	      isDragging: true,
	      hasMoved: false,
	      pending: null,
	      longPressTimerId: null
	    });
	    callbacks.onLift({
	      clientSelection: pending,
	      autoScrollMode: 'FLUID'
	    });
	  };

	  var stopDragging = function stopDragging(fn) {
	    if (fn === void 0) {
	      fn = noop$2;
	    }

	    schedule.cancel();
	    touchStartMarshal.reset();
	    webkitHack.releaseTouchMove();
	    unbindWindowEvents();
	    postDragEventPreventer.preventNext();
	    setState(initial);
	    fn();
	  };

	  var startPendingDrag = function startPendingDrag(event) {
	    var touch = event.touches[0];
	    var clientX = touch.clientX,
	        clientY = touch.clientY;
	    var point = {
	      x: clientX,
	      y: clientY
	    };
	    var longPressTimerId = setTimeout(startDragging, timeForLongPress);
	    setState({
	      longPressTimerId: longPressTimerId,
	      pending: point,
	      isDragging: false,
	      hasMoved: false
	    });
	    bindWindowEvents();
	  };

	  var stopPendingDrag = function stopPendingDrag() {
	    if (state.longPressTimerId) {
	      clearTimeout(state.longPressTimerId);
	    }

	    schedule.cancel();
	    touchStartMarshal.reset();
	    webkitHack.releaseTouchMove();
	    unbindWindowEvents();
	    setState(initial);
	  };

	  var kill = function kill(fn) {
	    if (fn === void 0) {
	      fn = noop$2;
	    }

	    if (state.pending) {
	      stopPendingDrag();
	      return;
	    }

	    stopDragging(fn);
	  };

	  var unmount = function unmount() {
	    kill();
	    postDragEventPreventer.abort();
	  };

	  var cancel = function cancel() {
	    kill(callbacks.onCancel);
	  };

	  var windowBindings = [{
	    eventName: 'touchmove',
	    options: {
	      passive: false
	    },
	    fn: function fn(event) {
	      if (!state.isDragging) {
	        stopPendingDrag();
	        return;
	      }

	      if (!state.hasMoved) {
	        setState({
	          hasMoved: true
	        });
	      }

	      var _event$touches$ = event.touches[0],
	          clientX = _event$touches$.clientX,
	          clientY = _event$touches$.clientY;
	      var point = {
	        x: clientX,
	        y: clientY
	      };
	      event.preventDefault();
	      schedule.move(point);
	    }
	  }, {
	    eventName: 'touchend',
	    fn: function fn(event) {
	      if (!state.isDragging) {
	        stopPendingDrag();
	        return;
	      }

	      event.preventDefault();
	      stopDragging(callbacks.onDrop);
	    }
	  }, {
	    eventName: 'touchcancel',
	    fn: function fn(event) {
	      if (!state.isDragging) {
	        stopPendingDrag();
	        return;
	      }

	      event.preventDefault();
	      stopDragging(callbacks.onCancel);
	    }
	  }, {
	    eventName: 'touchstart',
	    fn: cancel
	  }, {
	    eventName: 'orientationchange',
	    fn: cancel
	  }, {
	    eventName: 'resize',
	    fn: cancel
	  }, {
	    eventName: 'scroll',
	    options: {
	      passive: true,
	      capture: false
	    },
	    fn: function fn() {
	      if (state.pending) {
	        stopPendingDrag();
	        return;
	      }

	      schedule.windowScrollMove();
	    }
	  }, {
	    eventName: 'contextmenu',
	    fn: function fn(event) {
	      event.preventDefault();
	    }
	  }, {
	    eventName: 'keydown',
	    fn: function fn(event) {
	      if (!state.isDragging) {
	        cancel();
	        return;
	      }

	      if (event.keyCode === escape) {
	        event.preventDefault();
	      }

	      cancel();
	    }
	  }, {
	    eventName: 'touchforcechange',
	    fn: function fn(event) {
	      if (state.hasMoved) {
	        event.preventDefault();
	        return;
	      }

	      var touch = event.touches[0];

	      if (touch.force >= forcePressThreshold) {
	        cancel();
	      }
	    }
	  }, {
	    eventName: supportedEventName,
	    fn: cancel
	  }];

	  var bindWindowEvents = function bindWindowEvents() {
	    bindEvents(getWindow(), windowBindings, {
	      capture: true
	    });
	  };

	  var unbindWindowEvents = function unbindWindowEvents() {
	    unbindEvents(getWindow(), windowBindings, {
	      capture: true
	    });
	  };

	  var onTouchStart = function onTouchStart(event) {
	    if (touchStartMarshal.isHandled()) {
	      return;
	    }

	    !!isCapturing() ? index(false, 'Should not be able to perform a touch start while a drag or pending drag is occurring') : void 0;

	    if (!canStartCapturing(event)) {
	      return;
	    }

	    touchStartMarshal.handle();
	    webkitHack.preventTouchMove();
	    startPendingDrag(event);
	  };

	  var sensor = {
	    onTouchStart: onTouchStart,
	    kill: kill,
	    isCapturing: isCapturing,
	    isDragging: isDragging,
	    unmount: unmount
	  };
	  return sensor;
	});

	var _DragHandle$contextTy;

	var preventHtml5Dnd = function preventHtml5Dnd(event) {
	  event.preventDefault();
	};

	var DragHandle = function (_Component) {
	  _inheritsLoose(DragHandle, _Component);

	  function DragHandle(props, context) {
	    var _this;

	    _this = _Component.call(this, props, context) || this;
	    _this.mouseSensor = void 0;
	    _this.keyboardSensor = void 0;
	    _this.touchSensor = void 0;
	    _this.sensors = void 0;
	    _this.styleContext = void 0;
	    _this.canLift = void 0;
	    _this.isFocused = false;
	    _this.lastDraggableRef = void 0;

	    _this.onFocus = function () {
	      _this.isFocused = true;
	    };

	    _this.onBlur = function () {
	      _this.isFocused = false;
	    };

	    _this.onKeyDown = function (event) {
	      if (_this.mouseSensor.isCapturing() || _this.touchSensor.isCapturing()) {
	        return;
	      }

	      _this.keyboardSensor.onKeyDown(event);
	    };

	    _this.onMouseDown = function (event) {
	      if (_this.keyboardSensor.isCapturing() || _this.mouseSensor.isCapturing()) {
	        return;
	      }

	      _this.mouseSensor.onMouseDown(event);
	    };

	    _this.onTouchStart = function (event) {
	      if (_this.mouseSensor.isCapturing() || _this.keyboardSensor.isCapturing()) {
	        return;
	      }

	      _this.touchSensor.onTouchStart(event);
	    };

	    _this.canStartCapturing = function (event) {
	      if (_this.isAnySensorCapturing()) {
	        return false;
	      }

	      if (!_this.canLift(_this.props.draggableId)) {
	        return false;
	      }

	      return shouldAllowDraggingFromTarget(event, _this.props);
	    };

	    _this.isAnySensorCapturing = function () {
	      return _this.sensors.some(function (sensor) {
	        return sensor.isCapturing();
	      });
	    };

	    _this.getProvided = index$1(function (isEnabled) {
	      if (!isEnabled) {
	        return null;
	      }

	      var provided = {
	        onMouseDown: _this.onMouseDown,
	        onKeyDown: _this.onKeyDown,
	        onTouchStart: _this.onTouchStart,
	        onFocus: _this.onFocus,
	        onBlur: _this.onBlur,
	        tabIndex: 0,
	        'data-react-beautiful-dnd-drag-handle': _this.styleContext,
	        'aria-roledescription': 'Draggable item. Press space bar to lift',
	        draggable: false,
	        onDragStart: preventHtml5Dnd
	      };
	      return provided;
	    });

	    var getWindow = function getWindow() {
	      return getWindowFromRef(_this.props.getDraggableRef());
	    };

	    var args = {
	      callbacks: _this.props.callbacks,
	      getDraggableRef: _this.props.getDraggableRef,
	      getWindow: getWindow,
	      canStartCapturing: _this.canStartCapturing
	    };
	    _this.mouseSensor = createMouseSensor(args);
	    _this.keyboardSensor = createKeyboardSensor(args);
	    _this.touchSensor = createTouchSensor(args);
	    _this.sensors = [_this.mouseSensor, _this.keyboardSensor, _this.touchSensor];
	    _this.styleContext = context[styleContextKey];
	    _this.canLift = context[canLiftContextKey];
	    return _this;
	  }

	  var _proto = DragHandle.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    var draggableRef = this.props.getDraggableRef();
	    this.lastDraggableRef = draggableRef;
	    !draggableRef ? index(false, 'Cannot get draggable ref from drag handle') : void 0;

	    if (!this.props.isEnabled) {
	      return;
	    }

	    var dragHandleRef = getDragHandleRef(draggableRef);
	    !dragHandleRef ? index(false, 'DragHandle could not find drag handle element') : void 0;
	    retainer.tryRestoreFocus(this.props.draggableId, dragHandleRef);
	  };

	  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
	    var _this2 = this;

	    var ref = this.props.getDraggableRef();

	    if (ref !== this.lastDraggableRef) {
	      this.lastDraggableRef = ref;

	      if (!ref || !this.isFocused) {
	        return;
	      }

	      if (!this.props.isEnabled) {
	        return;
	      }

	      var dragHandleRef = getDragHandleRef(ref);
	      !dragHandleRef ? index(false, 'DragHandle could not find drag handle element') : void 0;
	      dragHandleRef.focus();
	    }

	    var isCapturing = this.isAnySensorCapturing();

	    if (!isCapturing) {
	      return;
	    }

	    var isDragStopping = prevProps.isDragging && !this.props.isDragging;

	    if (isDragStopping) {
	      this.sensors.forEach(function (sensor) {
	        if (sensor.isCapturing()) {
	          sensor.kill();
	        }
	      });
	      return;
	    }

	    if (!this.props.isEnabled) {
	      this.sensors.forEach(function (sensor) {
	        if (sensor.isCapturing()) {
	          var wasDragging = sensor.isDragging();
	          sensor.kill();

	          if (wasDragging) {
	            _this2.props.callbacks.onCancel();
	          }
	        }
	      });
	    }
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    var _this3 = this;

	    this.sensors.forEach(function (sensor) {
	      var wasDragging = sensor.isDragging();
	      sensor.unmount();

	      if (wasDragging) {
	        _this3.props.callbacks.onCancel();
	      }
	    });

	    var shouldRetainFocus = function () {
	      if (!_this3.props.isEnabled) {
	        return false;
	      }

	      if (!_this3.isFocused) {
	        return false;
	      }

	      return _this3.props.isDragging || _this3.props.isDropAnimating;
	    }();

	    if (shouldRetainFocus) {
	      retainer.retain(this.props.draggableId);
	    }
	  };

	  _proto.render = function render() {
	    var _this$props = this.props,
	        children = _this$props.children,
	        isEnabled = _this$props.isEnabled;
	    return children(this.getProvided(isEnabled));
	  };

	  return DragHandle;
	}(React.Component);

	DragHandle.contextTypes = (_DragHandle$contextTy = {}, _DragHandle$contextTy[styleContextKey] = propTypes.string.isRequired, _DragHandle$contextTy[canLiftContextKey] = propTypes.func.isRequired, _DragHandle$contextTy);

	var getWindowScroll$1 = (function () {
	  return {
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  };
	});

	var getViewport = (function () {
	  var scroll = getWindowScroll$1();
	  var top = scroll.y;
	  var left = scroll.x;
	  var doc = document.documentElement;
	  !doc ? index(false, 'Could not find document.documentElement') : void 0;
	  var width = doc.clientWidth;
	  var height = doc.clientHeight;
	  var right = left + width;
	  var bottom = top + height;
	  var frame = getRect({
	    top: top,
	    left: left,
	    right: right,
	    bottom: bottom
	  });
	  var maxScroll = getMaxScroll({
	    scrollHeight: doc.scrollHeight,
	    scrollWidth: doc.scrollWidth,
	    width: frame.width,
	    height: frame.height
	  });
	  var viewport = {
	    frame: frame,
	    scroll: {
	      initial: scroll,
	      current: scroll,
	      max: maxScroll,
	      diff: {
	        value: origin,
	        displacement: origin
	      }
	    }
	  };
	  return viewport;
	});

	var _Draggable$contextTyp;
	var zIndexOptions = {
	  dragging: 5000,
	  dropAnimating: 4500
	};

	var getTranslate = function getTranslate(offset) {
	  if (isEqual(offset, origin)) {
	    return null;
	  }

	  return "translate(" + offset.x + "px, " + offset.y + "px)";
	};

	var getSpeed$1 = function getSpeed(isDragging, shouldAnimateDragMovement, isDropAnimating) {
	  if (isDropAnimating) {
	    return 'STANDARD';
	  }

	  if (isDragging && shouldAnimateDragMovement) {
	    return 'FAST';
	  }

	  return 'INSTANT';
	};

	var Draggable = function (_Component) {
	  _inheritsLoose(Draggable, _Component);

	  function Draggable(props, context) {
	    var _this;

	    _this = _Component.call(this, props, context) || this;
	    _this.callbacks = void 0;
	    _this.styleContext = void 0;
	    _this.ref = null;

	    _this.onMoveEnd = function () {
	      if (_this.props.isDropAnimating) {
	        _this.props.dropAnimationFinished();
	      }
	    };

	    _this.onLift = function (options) {
	      start('LIFT');

	      _this.throwIfCannotDrag();

	      var clientSelection = options.clientSelection,
	          autoScrollMode = options.autoScrollMode;
	      var _this$props = _this.props,
	          lift = _this$props.lift,
	          draggableId = _this$props.draggableId;
	      var ref = _this.ref;
	      throwIfRefIsInvalid(ref);
	      !ref ? index(false) : void 0;
	      var client = {
	        selection: clientSelection,
	        borderBoxCenter: getBorderBoxCenterPosition(ref),
	        offset: origin
	      };
	      lift({
	        id: draggableId,
	        client: client,
	        autoScrollMode: autoScrollMode,
	        viewport: getViewport()
	      });
	      finish('LIFT');
	    };

	    _this.onMove = function (clientSelection) {
	      _this.throwIfCannotDrag();

	      var _this$props2 = _this.props,
	          dimension = _this$props2.dimension,
	          move = _this$props2.move;

	      if (!dimension) {
	        return;
	      }

	      move({
	        client: clientSelection,
	        shouldAnimate: false
	      });
	    };

	    _this.onMoveUp = function () {
	      _this.throwIfCannotDrag();

	      _this.props.moveUp();
	    };

	    _this.onMoveDown = function () {
	      _this.throwIfCannotDrag();

	      _this.props.moveDown();
	    };

	    _this.onMoveRight = function () {
	      _this.throwIfCannotDrag();

	      _this.props.moveRight();
	    };

	    _this.onMoveLeft = function () {
	      _this.throwIfCannotDrag();

	      _this.props.moveLeft();
	    };

	    _this.onWindowScroll = function () {
	      _this.throwIfCannotDrag();

	      _this.props.moveByWindowScroll({
	        scroll: getWindowScroll$1()
	      });
	    };

	    _this.onDrop = function () {
	      _this.throwIfCannotDrag();

	      _this.props.drop({
	        reason: 'DROP'
	      });
	    };

	    _this.onCancel = function () {
	      _this.props.drop({
	        reason: 'CANCEL'
	      });
	    };

	    _this.setRef = function (ref) {
	      if (ref === null) {
	        return;
	      }

	      if (ref === _this.ref) {
	        return;
	      }

	      _this.ref = ref;
	      throwIfRefIsInvalid(ref);
	    };

	    _this.getDraggableRef = function () {
	      return _this.ref;
	    };

	    _this.getDraggingStyle = index$1(function (change, dimension, isDropAnimating) {
	      var box = dimension.client;
	      var style = {
	        position: 'fixed',
	        top: box.marginBox.top,
	        left: box.marginBox.left,
	        boxSizing: 'border-box',
	        width: box.borderBox.width,
	        height: box.borderBox.height,
	        transition: 'none',
	        zIndex: isDropAnimating ? zIndexOptions.dropAnimating : zIndexOptions.dragging,
	        transform: getTranslate(change),
	        pointerEvents: 'none'
	      };
	      return style;
	    });
	    _this.getNotDraggingStyle = index$1(function (current, shouldAnimateDisplacement) {
	      var style = {
	        transform: getTranslate(current),
	        transition: shouldAnimateDisplacement ? null : 'none'
	      };
	      return style;
	    });
	    _this.getProvided = index$1(function (change, isDragging, isDropAnimating, shouldAnimateDisplacement, dimension, dragHandleProps) {
	      var useDraggingStyle = isDragging || isDropAnimating;

	      var draggableStyle = function () {
	        if (!useDraggingStyle) {
	          return _this.getNotDraggingStyle(change, shouldAnimateDisplacement);
	        }

	        !dimension ? index(false, 'draggable dimension required for dragging') : void 0;
	        return _this.getDraggingStyle(change, dimension, isDropAnimating);
	      }();

	      var provided = {
	        innerRef: _this.setRef,
	        draggableProps: {
	          'data-react-beautiful-dnd-draggable': _this.styleContext,
	          style: draggableStyle
	        },
	        dragHandleProps: dragHandleProps
	      };
	      return provided;
	    });
	    _this.getSnapshot = index$1(function (isDragging, isDropAnimating, draggingOver) {
	      return {
	        isDragging: isDragging || isDropAnimating,
	        isDropAnimating: isDropAnimating,
	        draggingOver: draggingOver
	      };
	    });

	    _this.renderChildren = function (change, dragHandleProps) {
	      var _this$props3 = _this.props,
	          isDragging = _this$props3.isDragging,
	          isDropAnimating = _this$props3.isDropAnimating,
	          dimension = _this$props3.dimension,
	          draggingOver = _this$props3.draggingOver,
	          shouldAnimateDisplacement = _this$props3.shouldAnimateDisplacement,
	          children = _this$props3.children;
	      var child = children(_this.getProvided(change, isDragging, isDropAnimating, shouldAnimateDisplacement, dimension, dragHandleProps), _this.getSnapshot(isDragging, isDropAnimating, draggingOver));
	      var isDraggingOrDropping = isDragging || isDropAnimating;

	      var placeholder = function () {
	        if (!isDraggingOrDropping) {
	          return null;
	        }

	        !dimension ? index(false, 'Draggable: Dimension is required for dragging') : void 0;
	        return React__default.createElement(Placeholder, {
	          placeholder: dimension.placeholder
	        });
	      }();

	      return React__default.createElement(React.Fragment, null, child, placeholder);
	    };

	    var callbacks = {
	      onLift: _this.onLift,
	      onMove: _this.onMove,
	      onDrop: _this.onDrop,
	      onCancel: _this.onCancel,
	      onMoveUp: _this.onMoveUp,
	      onMoveDown: _this.onMoveDown,
	      onMoveRight: _this.onMoveRight,
	      onMoveLeft: _this.onMoveLeft,
	      onWindowScroll: _this.onWindowScroll
	    };
	    _this.callbacks = callbacks;
	    _this.styleContext = context[styleContextKey];
	    return _this;
	  }

	  var _proto = Draggable.prototype;

	  _proto.componentDidMount = function componentDidMount() {
	    throwIfRefIsInvalid(this.ref);
	  };

	  _proto.componentWillUnmount = function componentWillUnmount() {
	    this.ref = null;
	  };

	  _proto.throwIfCannotDrag = function throwIfCannotDrag() {
	    !!this.props.isDragDisabled ? index(false, 'Draggable: cannot drag as dragging is not enabled') : void 0;
	  };

	  _proto.render = function render() {
	    var _this2 = this;

	    var _this$props4 = this.props,
	        draggableId = _this$props4.draggableId,
	        index$$1 = _this$props4.index,
	        offset = _this$props4.offset,
	        isDragging = _this$props4.isDragging,
	        isDropAnimating = _this$props4.isDropAnimating,
	        isDragDisabled = _this$props4.isDragDisabled,
	        shouldAnimateDragMovement = _this$props4.shouldAnimateDragMovement,
	        disableInteractiveElementBlocking = _this$props4.disableInteractiveElementBlocking;
	    var droppableId = this.context[droppableIdKey];
	    var type = this.context[droppableTypeKey];
	    var speed = getSpeed$1(isDragging, shouldAnimateDragMovement, isDropAnimating);
	    return React__default.createElement(DraggableDimensionPublisher, {
	      key: draggableId,
	      draggableId: draggableId,
	      droppableId: droppableId,
	      type: type,
	      index: index$$1,
	      getDraggableRef: this.getDraggableRef
	    }, React__default.createElement(Moveable, {
	      speed: speed,
	      destination: offset,
	      onMoveEnd: this.onMoveEnd
	    }, function (change) {
	      return React__default.createElement(DragHandle, {
	        draggableId: draggableId,
	        isDragging: isDragging,
	        isDropAnimating: isDropAnimating,
	        isEnabled: !isDragDisabled,
	        callbacks: _this2.callbacks,
	        getDraggableRef: _this2.getDraggableRef,
	        canDragInteractiveElements: disableInteractiveElementBlocking
	      }, function (dragHandleProps) {
	        return _this2.renderChildren(change, dragHandleProps);
	      });
	    }));
	  };

	  return Draggable;
	}(React.Component);

	Draggable.contextTypes = (_Draggable$contextTyp = {}, _Draggable$contextTyp[droppableIdKey] = propTypes.string.isRequired, _Draggable$contextTyp[droppableTypeKey] = propTypes.string.isRequired, _Draggable$contextTyp[styleContextKey] = propTypes.string.isRequired, _Draggable$contextTyp);

	var defaultMapProps = {
	  isDropAnimating: false,
	  isDragging: false,
	  offset: origin,
	  shouldAnimateDragMovement: false,
	  shouldAnimateDisplacement: true,
	  dimension: null,
	  draggingOver: null
	};
	var makeMapStateToProps$1 = function makeMapStateToProps() {
	  var memoizedOffset = index$1(function (x, y) {
	    return {
	      x: x,
	      y: y
	    };
	  });
	  var getNotDraggingProps = index$1(function (offset, shouldAnimateDisplacement) {
	    return {
	      isDropAnimating: false,
	      isDragging: false,
	      offset: offset,
	      shouldAnimateDisplacement: shouldAnimateDisplacement,
	      shouldAnimateDragMovement: false,
	      dimension: null,
	      draggingOver: null
	    };
	  });
	  var getDraggingProps = index$1(function (offset, shouldAnimateDragMovement, dimension, draggingOver) {
	    return {
	      isDragging: true,
	      isDropAnimating: false,
	      shouldAnimateDisplacement: false,
	      offset: offset,
	      shouldAnimateDragMovement: shouldAnimateDragMovement,
	      dimension: dimension,
	      draggingOver: draggingOver
	    };
	  });

	  var getOutOfTheWayMovement = function getOutOfTheWayMovement(id, movement) {
	    var map = getDisplacementMap(movement.displaced);
	    var displacement = map[id];

	    if (!displacement) {
	      return null;
	    }

	    if (!displacement.isVisible) {
	      return null;
	    }

	    var amount = movement.isBeyondStartPosition ? negate(movement.amount) : movement.amount;
	    return getNotDraggingProps(memoizedOffset(amount.x, amount.y), displacement.shouldAnimate);
	  };

	  var draggingSelector = function draggingSelector(state, ownProps) {
	    if (state.isDragging) {
	      if (state.critical.draggable.id !== ownProps.draggableId) {
	        return null;
	      }

	      var offset = state.current.client.offset;
	      var dimension = state.dimensions.draggables[ownProps.draggableId];
	      var shouldAnimateDragMovement = state.shouldAnimate;
	      var draggingOver = state.impact.destination ? state.impact.destination.droppableId : null;
	      return getDraggingProps(memoizedOffset(offset.x, offset.y), shouldAnimateDragMovement, dimension, draggingOver);
	    }

	    if (state.phase === 'DROP_ANIMATING') {
	      var pending = state.pending;

	      if (pending.result.draggableId !== ownProps.draggableId) {
	        return null;
	      }

	      var _draggingOver = pending.result.destination ? pending.result.destination.droppableId : null;

	      return {
	        isDragging: false,
	        isDropAnimating: true,
	        offset: pending.newHomeOffset,
	        dimension: state.dimensions.draggables[ownProps.draggableId],
	        draggingOver: _draggingOver,
	        shouldAnimateDragMovement: false,
	        shouldAnimateDisplacement: false
	      };
	    }

	    return null;
	  };

	  var movingOutOfTheWaySelector = function movingOutOfTheWaySelector(state, ownProps) {
	    if (state.isDragging) {
	      if (state.critical.draggable.id === ownProps.draggableId) {
	        return null;
	      }

	      return getOutOfTheWayMovement(ownProps.draggableId, state.impact.movement);
	    }

	    if (state.phase === 'DROP_ANIMATING') {
	      if (state.pending.result.draggableId === ownProps.draggableId) {
	        return null;
	      }

	      return getOutOfTheWayMovement(ownProps.draggableId, state.pending.impact.movement);
	    }

	    return null;
	  };

	  var selector = function selector(state, ownProps) {
	    var dragging = draggingSelector(state, ownProps);

	    if (dragging) {
	      return dragging;
	    }

	    var movingOutOfTheWay = movingOutOfTheWaySelector(state, ownProps);

	    if (movingOutOfTheWay) {
	      return movingOutOfTheWay;
	    }

	    return defaultMapProps;
	  };

	  return selector;
	};
	var mapDispatchToProps = {
	  lift: lift,
	  move: move,
	  moveUp: moveUp,
	  moveDown: moveDown,
	  moveLeft: moveLeft,
	  moveRight: moveRight,
	  moveByWindowScroll: moveByWindowScroll,
	  drop: drop,
	  dropAnimationFinished: dropAnimationFinished
	};
	var ConnectedDraggable = reactRedux.connect(makeMapStateToProps$1, mapDispatchToProps, null, {
	  context: storeContext,
	  pure: true,
	  areStatePropsEqual: isStrictEqual
	})(Draggable);
	ConnectedDraggable.defaultProps = {
	  isDragDisabled: false,
	  disableInteractiveElementBlocking: false
	};

	exports.DragDropContext = DragDropContext;
	exports.Droppable = connectedDroppable;
	exports.Draggable = ConnectedDraggable;
	exports.resetServerContext = resetServerContext;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
