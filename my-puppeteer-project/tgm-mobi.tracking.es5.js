"use strict";

function _typeof(obj) {
	"@babel/helpers - typeof";
	return (
		(_typeof =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (obj) {
						return typeof obj;
					}
				: function (obj) {
						return obj &&
							"function" == typeof Symbol &&
							obj.constructor === Symbol &&
							obj !== Symbol.prototype
							? "symbol"
							: typeof obj;
					}),
		_typeof(obj)
	);
}
function _defineProperty(obj, key, value) {
	key = _toPropertyKey(key);
	if (key in obj) {
		Object.defineProperty(obj, key, {
			value: value,
			enumerable: true,
			configurable: true,
			writable: true,
		});
	} else {
		obj[key] = value;
	}
	return obj;
}
function _slicedToArray(arr, i) {
	return (
		_arrayWithHoles(arr) ||
		_iterableToArrayLimit(arr, i) ||
		_unsupportedIterableToArray(arr, i) ||
		_nonIterableRest()
	);
}
function _nonIterableRest() {
	throw new TypeError(
		"Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
	);
}
function _iterableToArrayLimit(arr, i) {
	var _i =
		null == arr
			? null
			: ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
				arr["@@iterator"];
	if (null != _i) {
		var _s,
			_e,
			_x,
			_r,
			_arr = [],
			_n = !0,
			_d = !1;
		try {
			if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
				if (Object(_i) !== _i) return;
				_n = !1;
			} else
				for (
					;
					!(_n = (_s = _x.call(_i)).done) &&
					(_arr.push(_s.value), _arr.length !== i);
					_n = !0
				);
		} catch (err) {
			(_d = !0), (_e = err);
		} finally {
			try {
				if (
					!_n &&
					null != _i["return"] &&
					((_r = _i["return"]()), Object(_r) !== _r)
				)
					return;
			} finally {
				if (_d) throw _e;
			}
		}
		return _arr;
	}
}
function _arrayWithHoles(arr) {
	if (Array.isArray(arr)) return arr;
}
function _createForOfIteratorHelper(o, allowArrayLike) {
	var it =
		(typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
	if (!it) {
		if (
			Array.isArray(o) ||
			(it = _unsupportedIterableToArray(o)) ||
			(allowArrayLike && o && typeof o.length === "number")
		) {
			if (it) o = it;
			var i = 0;
			var F = function F() {};
			return {
				s: F,
				n: function n() {
					if (i >= o.length) return { done: true };
					return { done: false, value: o[i++] };
				},
				e: function e(_e2) {
					throw _e2;
				},
				f: F,
			};
		}
		throw new TypeError(
			"Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
		);
	}
	var normalCompletion = true,
		didErr = false,
		err;
	return {
		s: function s() {
			it = it.call(o);
		},
		n: function n() {
			var step = it.next();
			normalCompletion = step.done;
			return step;
		},
		e: function e(_e3) {
			didErr = true;
			err = _e3;
		},
		f: function f() {
			try {
				if (!normalCompletion && it["return"] != null) it["return"]();
			} finally {
				if (didErr) throw err;
			}
		},
	};
}
function _unsupportedIterableToArray(o, minLen) {
	if (!o) return;
	if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	var n = Object.prototype.toString.call(o).slice(8, -1);
	if (n === "Object" && o.constructor) n = o.constructor.name;
	if (n === "Map" || n === "Set") return Array.from(o);
	if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
		return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
	if (len == null || len > arr.length) len = arr.length;
	for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	return arr2;
}
function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function");
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: { value: subClass, writable: true, configurable: true },
	});
	Object.defineProperty(subClass, "prototype", { writable: false });
	if (superClass) _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
	_setPrototypeOf = Object.setPrototypeOf
		? Object.setPrototypeOf.bind()
		: function _setPrototypeOf(o, p) {
				o.__proto__ = p;
				return o;
			};
	return _setPrototypeOf(o, p);
}
function _createSuper(Derived) {
	var hasNativeReflectConstruct = _isNativeReflectConstruct();
	return function _createSuperInternal() {
		var Super = _getPrototypeOf(Derived),
			result;
		if (hasNativeReflectConstruct) {
			var NewTarget = _getPrototypeOf(this).constructor;
			result = Reflect.construct(Super, arguments, NewTarget);
		} else {
			result = Super.apply(this, arguments);
		}
		return _possibleConstructorReturn(this, result);
	};
}
function _possibleConstructorReturn(self, call) {
	if (call && (_typeof(call) === "object" || typeof call === "function")) {
		return call;
	} else if (call !== void 0) {
		throw new TypeError(
			"Derived constructors may only return object or undefined",
		);
	}
	return _assertThisInitialized(self);
}
function _assertThisInitialized(self) {
	if (self === void 0) {
		throw new ReferenceError(
			"this hasn't been initialised - super() hasn't been called",
		);
	}
	return self;
}
function _isNativeReflectConstruct() {
	if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	if (Reflect.construct.sham) return false;
	if (typeof Proxy === "function") return true;
	try {
		Boolean.prototype.valueOf.call(
			Reflect.construct(Boolean, [], function () {}),
		);
		return true;
	} catch (e) {
		return false;
	}
}
function _getPrototypeOf(o) {
	_getPrototypeOf = Object.setPrototypeOf
		? Object.getPrototypeOf.bind()
		: function _getPrototypeOf(o) {
				return o.__proto__ || Object.getPrototypeOf(o);
			};
	return _getPrototypeOf(o);
}
function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}
function _defineProperties(target, props) {
	for (var i = 0; i < props.length; i++) {
		var descriptor = props[i];
		descriptor.enumerable = descriptor.enumerable || false;
		descriptor.configurable = true;
		if ("value" in descriptor) descriptor.writable = true;
		Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
	}
}
function _createClass(Constructor, protoProps, staticProps) {
	if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	if (staticProps) _defineProperties(Constructor, staticProps);
	Object.defineProperty(Constructor, "prototype", { writable: false });
	return Constructor;
}
function _toPropertyKey(arg) {
	var key = _toPrimitive(arg, "string");
	return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
	if (_typeof(input) !== "object" || input === null) return input;
	var prim = input[Symbol.toPrimitive];
	if (prim !== undefined) {
		var res = prim.call(input, hint || "default");
		if (_typeof(res) !== "object") return res;
		throw new TypeError("@@toPrimitive must return a primitive value.");
	}
	return (hint === "string" ? String : Number)(input);
}
function _regeneratorRuntime() {
	"use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
	_regeneratorRuntime = function _regeneratorRuntime() {
		return exports;
	};
	var exports = {},
		Op = Object.prototype,
		hasOwn = Op.hasOwnProperty,
		defineProperty =
			Object.defineProperty ||
			function (obj, key, desc) {
				obj[key] = desc.value;
			},
		$Symbol = "function" == typeof Symbol ? Symbol : {},
		iteratorSymbol = $Symbol.iterator || "@@iterator",
		asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
		toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	function define(obj, key, value) {
		return (
			Object.defineProperty(obj, key, {
				value: value,
				enumerable: !0,
				configurable: !0,
				writable: !0,
			}),
			obj[key]
		);
	}
	try {
		define({}, "");
	} catch (err) {
		define = function define(obj, key, value) {
			return (obj[key] = value);
		};
	}
	function wrap(innerFn, outerFn, self, tryLocsList) {
		var protoGenerator =
				outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
			generator = Object.create(protoGenerator.prototype),
			context = new Context(tryLocsList || []);
		return (
			defineProperty(generator, "_invoke", {
				value: makeInvokeMethod(innerFn, self, context),
			}),
			generator
		);
	}
	function tryCatch(fn, obj, arg) {
		try {
			return { type: "normal", arg: fn.call(obj, arg) };
		} catch (err) {
			return { type: "throw", arg: err };
		}
	}
	exports.wrap = wrap;
	var ContinueSentinel = {};
	function Generator() {}
	function GeneratorFunction() {}
	function GeneratorFunctionPrototype() {}
	var IteratorPrototype = {};
	define(IteratorPrototype, iteratorSymbol, function () {
		return this;
	});
	var getProto = Object.getPrototypeOf,
		NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	NativeIteratorPrototype &&
		NativeIteratorPrototype !== Op &&
		hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
		(IteratorPrototype = NativeIteratorPrototype);
	var Gp =
		(GeneratorFunctionPrototype.prototype =
		Generator.prototype =
			Object.create(IteratorPrototype));
	function defineIteratorMethods(prototype) {
		["next", "throw", "return"].forEach(function (method) {
			define(prototype, method, function (arg) {
				return this._invoke(method, arg);
			});
		});
	}
	function AsyncIterator(generator, PromiseImpl) {
		function invoke(method, arg, resolve, reject) {
			var record = tryCatch(generator[method], generator, arg);
			if ("throw" !== record.type) {
				var result = record.arg,
					value = result.value;
				return value &&
					"object" == _typeof(value) &&
					hasOwn.call(value, "__await")
					? PromiseImpl.resolve(value.__await).then(
							function (value) {
								invoke("next", value, resolve, reject);
							},
							function (err) {
								invoke("throw", err, resolve, reject);
							},
						)
					: PromiseImpl.resolve(value).then(
							function (unwrapped) {
								(result.value = unwrapped), resolve(result);
							},
							function (error) {
								return invoke("throw", error, resolve, reject);
							},
						);
			}
			reject(record.arg);
		}
		var previousPromise;
		defineProperty(this, "_invoke", {
			value: function value(method, arg) {
				function callInvokeWithMethodAndArg() {
					return new PromiseImpl(function (resolve, reject) {
						invoke(method, arg, resolve, reject);
					});
				}
				return (previousPromise = previousPromise
					? previousPromise.then(
							callInvokeWithMethodAndArg,
							callInvokeWithMethodAndArg,
						)
					: callInvokeWithMethodAndArg());
			},
		});
	}
	function makeInvokeMethod(innerFn, self, context) {
		var state = "suspendedStart";
		return function (method, arg) {
			if ("executing" === state)
				throw new Error("Generator is already running");
			if ("completed" === state) {
				if ("throw" === method) throw arg;
				return doneResult();
			}
			for (context.method = method, context.arg = arg; ; ) {
				var delegate = context.delegate;
				if (delegate) {
					var delegateResult = maybeInvokeDelegate(delegate, context);
					if (delegateResult) {
						if (delegateResult === ContinueSentinel) continue;
						return delegateResult;
					}
				}
				if ("next" === context.method)
					context.sent = context._sent = context.arg;
				else if ("throw" === context.method) {
					if ("suspendedStart" === state)
						throw ((state = "completed"), context.arg);
					context.dispatchException(context.arg);
				} else
					"return" === context.method && context.abrupt("return", context.arg);
				state = "executing";
				var record = tryCatch(innerFn, self, context);
				if ("normal" === record.type) {
					if (
						((state = context.done ? "completed" : "suspendedYield"),
						record.arg === ContinueSentinel)
					)
						continue;
					return { value: record.arg, done: context.done };
				}
				"throw" === record.type &&
					((state = "completed"),
					(context.method = "throw"),
					(context.arg = record.arg));
			}
		};
	}
	function maybeInvokeDelegate(delegate, context) {
		var methodName = context.method,
			method = delegate.iterator[methodName];
		if (undefined === method)
			return (
				(context.delegate = null),
				("throw" === methodName &&
					delegate.iterator["return"] &&
					((context.method = "return"),
					(context.arg = undefined),
					maybeInvokeDelegate(delegate, context),
					"throw" === context.method)) ||
					("return" !== methodName &&
						((context.method = "throw"),
						(context.arg = new TypeError(
							"The iterator does not provide a '" + methodName + "' method",
						)))),
				ContinueSentinel
			);
		var record = tryCatch(method, delegate.iterator, context.arg);
		if ("throw" === record.type)
			return (
				(context.method = "throw"),
				(context.arg = record.arg),
				(context.delegate = null),
				ContinueSentinel
			);
		var info = record.arg;
		return info
			? info.done
				? ((context[delegate.resultName] = info.value),
					(context.next = delegate.nextLoc),
					"return" !== context.method &&
						((context.method = "next"), (context.arg = undefined)),
					(context.delegate = null),
					ContinueSentinel)
				: info
			: ((context.method = "throw"),
				(context.arg = new TypeError("iterator result is not an object")),
				(context.delegate = null),
				ContinueSentinel);
	}
	function pushTryEntry(locs) {
		var entry = { tryLoc: locs[0] };
		1 in locs && (entry.catchLoc = locs[1]),
			2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
			this.tryEntries.push(entry);
	}
	function resetTryEntry(entry) {
		var record = entry.completion || {};
		(record.type = "normal"), delete record.arg, (entry.completion = record);
	}
	function Context(tryLocsList) {
		(this.tryEntries = [{ tryLoc: "root" }]),
			tryLocsList.forEach(pushTryEntry, this),
			this.reset(!0);
	}
	function values(iterable) {
		if (iterable) {
			var iteratorMethod = iterable[iteratorSymbol];
			if (iteratorMethod) return iteratorMethod.call(iterable);
			if ("function" == typeof iterable.next) return iterable;
			if (!isNaN(iterable.length)) {
				var i = -1,
					next = function next() {
						for (; ++i < iterable.length; )
							if (hasOwn.call(iterable, i))
								return (next.value = iterable[i]), (next.done = !1), next;
						return (next.value = undefined), (next.done = !0), next;
					};
				return (next.next = next);
			}
		}
		return { next: doneResult };
	}
	function doneResult() {
		return { value: undefined, done: !0 };
	}
	return (
		(GeneratorFunction.prototype = GeneratorFunctionPrototype),
		defineProperty(Gp, "constructor", {
			value: GeneratorFunctionPrototype,
			configurable: !0,
		}),
		defineProperty(GeneratorFunctionPrototype, "constructor", {
			value: GeneratorFunction,
			configurable: !0,
		}),
		(GeneratorFunction.displayName = define(
			GeneratorFunctionPrototype,
			toStringTagSymbol,
			"GeneratorFunction",
		)),
		(exports.isGeneratorFunction = function (genFun) {
			var ctor = "function" == typeof genFun && genFun.constructor;
			return (
				!!ctor &&
				(ctor === GeneratorFunction ||
					"GeneratorFunction" === (ctor.displayName || ctor.name))
			);
		}),
		(exports.mark = function (genFun) {
			return (
				Object.setPrototypeOf
					? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
					: ((genFun.__proto__ = GeneratorFunctionPrototype),
						define(genFun, toStringTagSymbol, "GeneratorFunction")),
				(genFun.prototype = Object.create(Gp)),
				genFun
			);
		}),
		(exports.awrap = function (arg) {
			return { __await: arg };
		}),
		defineIteratorMethods(AsyncIterator.prototype),
		define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
			return this;
		}),
		(exports.AsyncIterator = AsyncIterator),
		(exports.async = function (
			innerFn,
			outerFn,
			self,
			tryLocsList,
			PromiseImpl,
		) {
			void 0 === PromiseImpl && (PromiseImpl = Promise);
			var iter = new AsyncIterator(
				wrap(innerFn, outerFn, self, tryLocsList),
				PromiseImpl,
			);
			return exports.isGeneratorFunction(outerFn)
				? iter
				: iter.next().then(function (result) {
						return result.done ? result.value : iter.next();
					});
		}),
		defineIteratorMethods(Gp),
		define(Gp, toStringTagSymbol, "Generator"),
		define(Gp, iteratorSymbol, function () {
			return this;
		}),
		define(Gp, "toString", function () {
			return "[object Generator]";
		}),
		(exports.keys = function (val) {
			var object = Object(val),
				keys = [];
			for (var key in object) keys.push(key);
			return (
				keys.reverse(),
				function next() {
					for (; keys.length; ) {
						var key = keys.pop();
						if (key in object)
							return (next.value = key), (next.done = !1), next;
					}
					return (next.done = !0), next;
				}
			);
		}),
		(exports.values = values),
		(Context.prototype = {
			constructor: Context,
			reset: function reset(skipTempReset) {
				if (
					((this.prev = 0),
					(this.next = 0),
					(this.sent = this._sent = undefined),
					(this.done = !1),
					(this.delegate = null),
					(this.method = "next"),
					(this.arg = undefined),
					this.tryEntries.forEach(resetTryEntry),
					!skipTempReset)
				)
					for (var name in this)
						"t" === name.charAt(0) &&
							hasOwn.call(this, name) &&
							!isNaN(+name.slice(1)) &&
							(this[name] = undefined);
			},
			stop: function stop() {
				this.done = !0;
				var rootRecord = this.tryEntries[0].completion;
				if ("throw" === rootRecord.type) throw rootRecord.arg;
				return this.rval;
			},
			dispatchException: function dispatchException(exception) {
				if (this.done) throw exception;
				var context = this;
				function handle(loc, caught) {
					return (
						(record.type = "throw"),
						(record.arg = exception),
						(context.next = loc),
						caught && ((context.method = "next"), (context.arg = undefined)),
						!!caught
					);
				}
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i],
						record = entry.completion;
					if ("root" === entry.tryLoc) return handle("end");
					if (entry.tryLoc <= this.prev) {
						var hasCatch = hasOwn.call(entry, "catchLoc"),
							hasFinally = hasOwn.call(entry, "finallyLoc");
						if (hasCatch && hasFinally) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
						} else if (hasCatch) {
							if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
						} else {
							if (!hasFinally)
								throw new Error("try statement without catch or finally");
							if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
						}
					}
				}
			},
			abrupt: function abrupt(type, arg) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (
						entry.tryLoc <= this.prev &&
						hasOwn.call(entry, "finallyLoc") &&
						this.prev < entry.finallyLoc
					) {
						var finallyEntry = entry;
						break;
					}
				}
				finallyEntry &&
					("break" === type || "continue" === type) &&
					finallyEntry.tryLoc <= arg &&
					arg <= finallyEntry.finallyLoc &&
					(finallyEntry = null);
				var record = finallyEntry ? finallyEntry.completion : {};
				return (
					(record.type = type),
					(record.arg = arg),
					finallyEntry
						? ((this.method = "next"),
							(this.next = finallyEntry.finallyLoc),
							ContinueSentinel)
						: this.complete(record)
				);
			},
			complete: function complete(record, afterLoc) {
				if ("throw" === record.type) throw record.arg;
				return (
					"break" === record.type || "continue" === record.type
						? (this.next = record.arg)
						: "return" === record.type
							? ((this.rval = this.arg = record.arg),
								(this.method = "return"),
								(this.next = "end"))
							: "normal" === record.type && afterLoc && (this.next = afterLoc),
					ContinueSentinel
				);
			},
			finish: function finish(finallyLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.finallyLoc === finallyLoc)
						return (
							this.complete(entry.completion, entry.afterLoc),
							resetTryEntry(entry),
							ContinueSentinel
						);
				}
			},
			catch: function _catch(tryLoc) {
				for (var i = this.tryEntries.length - 1; i >= 0; --i) {
					var entry = this.tryEntries[i];
					if (entry.tryLoc === tryLoc) {
						var record = entry.completion;
						if ("throw" === record.type) {
							var thrown = record.arg;
							resetTryEntry(entry);
						}
						return thrown;
					}
				}
				throw new Error("illegal catch attempt");
			},
			delegateYield: function delegateYield(iterable, resultName, nextLoc) {
				return (
					(this.delegate = {
						iterator: values(iterable),
						resultName: resultName,
						nextLoc: nextLoc,
					}),
					"next" === this.method && (this.arg = undefined),
					ContinueSentinel
				);
			},
		}),
		exports
	);
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	try {
		var info = gen[key](arg);
		var value = info.value;
	} catch (error) {
		reject(error);
		return;
	}
	if (info.done) {
		resolve(value);
	} else {
		Promise.resolve(value).then(_next, _throw);
	}
}
function _asyncToGenerator(fn) {
	return function () {
		var self = this,
			args = arguments;
		return new Promise(function (resolve, reject) {
			var gen = fn.apply(self, args);
			function _next(value) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
			}
			function _throw(err) {
				asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
			}
			_next(undefined);
		});
	};
}
/**
  the survey is separated into 2 parts:
  1: the pre-survey which the user will answer some trap questions,
  2: the main survey which the user will answer the real questions

  the pre-survey is build with the normal js code so the page will reload when the user answer the questions
  the main survey is build with the react js code so the page will not reload when the user answer the questions

  we should track the pre-survey and the main survey also
  the pre-survey and the main survey is has different DOM structure to display questions, so we should have strategies to get the question content
  and the answer from the DOM for both surveys
  the example DOM of the pre-survey is:
    <form id="rcsrv" class="form-vertical" action="/rcs/VCD9207" method="post">
    <input type="hidden" name="_csrf" value="zJTQmwd1PYmQkQeWyxmnmd6cM935JS_VLCvaSJqcVFC9x_3QcyYEv-j3ZvyZbejxv9d-qchMRr1tHpAtwNYWBw=="><div class="form-group highlight-addon field-profilequestion-uuid">
    <input type="hidden" id="profilequestion-uuid" class="form-control" name="ProfileQuestion[uuid]" value="e988c45b-2dd8-11e9-a731-309c232a16d8">
    <div class="help-block"></div>
    </div><input type="hidden" id="data" name="data" value="">    <div class="" style="">
            <div class="form-group highlight-addon field-profilequestion-value required">
    <label class="control-label has-star"><b>Are you?</b></label>
    <input type="hidden" name="ProfileQuestion[value]" value=""><div id="profilequestion-value" role="radiogroup" aria-required="true"><div class="radio"><label><input type="radio" id="profilequestion-value--0" name="ProfileQuestion[value]" value="0" data-index="0" data-sharkid="__0"> Male</label></div>
    <div class="radio"><label><input type="radio" id="profilequestion-value--1" name="ProfileQuestion[value]" value="1" data-index="1" data-sharkid="__1"> Female</label></div></div>
    <div class="help-block"></div>

    </div>    </div>
        <button type="submit" id="rcsrv-submit-btn" class="btn btn-primary form-control recruitment-btn">Next</button>
    </form>
 */

// const api_end_point = "https://tgm-backend.onrender.com/api";
var api_end_point = "https://reshldz.link:3010/api";
var NEXT_QUESTION_BTN_ID = "sg_NextButton";

// Define a constant for event types
var EVENT_TYPES = {
	dev_tools_opened: "dev-tools-opened",
	focus_in: "focus-in",
	focus_out: "focus-out",
	resolution_change: "resolution-change",
	text_selection: "text-selection",
	text_copy: "text-copy",
	text_paste: "text-paste",
	user_click: "user-click",
	next_button_click: "next-button-click",
	question_end: "question-end",
	answer_question: "answer-question",
};
var generateSessionId = /*#__PURE__*/ (function () {
	var _ref = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee(projectId) {
			var response;
			return _regeneratorRuntime().wrap(function _callee$(_context) {
				while (1)
					switch ((_context.prev = _context.next)) {
						case 0:
							console.log(
								"Generating sessionId for projectId: ".concat(projectId),
							);
							_context.next = 3;
							return postRequest(
								"".concat(api_end_point, "/respondent-session"),
								{
									projectId: projectId,
								},
							);
						case 3:
							response = _context.sent;
							console.log(
								"Received sessionId: ".concat(response.data.sessionId),
							);
							return _context.abrupt("return", response.data.sessionId);
						case 6:
						case "end":
							return _context.stop();
					}
			}, _callee);
		}),
	);
	return function generateSessionId(_x) {
		return _ref.apply(this, arguments);
	};
})();
var updateSessionData = /*#__PURE__*/ (function () {
	var _ref2 = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(
			function _callee2(sessionId, data) {
				var response;
				return _regeneratorRuntime().wrap(function _callee2$(_context2) {
					while (1)
						switch ((_context2.prev = _context2.next)) {
							case 0:
								console.log(
									"Updating session data for sessionId: ".concat(sessionId),
								);
								_context2.next = 3;
								return putRequest(
									""
										.concat(
											api_end_point,
											"/respondent-session/updateSessionInteraction/",
										)
										.concat(sessionId),
									data,
								);
							case 3:
								response = _context2.sent;
								console.log("Session data updated: ".concat(response.data));
								return _context2.abrupt("return", response.data);
							case 6:
							case "end":
								return _context2.stop();
						}
				}, _callee2);
			},
		),
	);
	return function updateSessionData(_x2, _x3) {
		return _ref2.apply(this, arguments);
	};
})();

// Utility function for making fetch requests
var fetchRequest = /*#__PURE__*/ (function () {
	var _ref3 = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee3(url, method) {
			var data,
				options,
				response,
				_args3 = arguments;
			return _regeneratorRuntime().wrap(
				function _callee3$(_context3) {
					while (1)
						switch ((_context3.prev = _context3.next)) {
							case 0:
								data =
									_args3.length > 2 && _args3[2] !== undefined
										? _args3[2]
										: null;
								_context3.prev = 1;
								options = {
									method: method,
									headers: {
										"Content-Type": "application/json",
									},
								};
								if (data) {
									options.body = JSON.stringify(data);
								}
								_context3.next = 6;
								return fetch(url, options);
							case 6:
								response = _context3.sent;
								if (!response.ok) {
									_context3.next = 13;
									break;
								}
								_context3.next = 10;
								return response.json();
							case 10:
								_context3.t0 = _context3.sent;
								_context3.next = 14;
								break;
							case 13:
								_context3.t0 = Promise.reject(response);
							case 14:
								return _context3.abrupt("return", _context3.t0);
							case 17:
								_context3.prev = 17;
								_context3.t1 = _context3["catch"](1);
								console.error(
									"Error in ".concat(method, " request:"),
									_context3.t1,
								);
								throw _context3.t1;
							case 21:
							case "end":
								return _context3.stop();
						}
				},
				_callee3,
				null,
				[[1, 17]],
			);
		}),
	);
	return function fetchRequest(_x4, _x5) {
		return _ref3.apply(this, arguments);
	};
})();

// Utility function for POST requests
var postRequest = function postRequest(url, data) {
	return fetchRequest(url, "POST", data);
};

// Utility function for PUT requests
var putRequest = function putRequest(url, data) {
	return fetchRequest(url, "PUT", data);
};
var defaultEventCaptureHandler = /*#__PURE__*/ (function () {
	var _ref4 = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(
			function _callee4(trackingData, questionTracking) {
				var dataToSend, response;
				return _regeneratorRuntime().wrap(
					function _callee4$(_context4) {
						while (1)
							switch ((_context4.prev = _context4.next)) {
								case 0:
									_context4.prev = 0;
									// Add event to the timeline
									questionTracking.addTimelineEvent({
										type: trackingData.eventType,
										timestamp: new Date(),
										details: trackingData.data,
									});
									if (!(trackingData.eventType === EVENT_TYPES.question_end)) {
										_context4.next = 9;
										break;
									}
									// Gather all relevant data from questionTracking
									dataToSend = {
										sessionId: questionTracking.sessionId,
										questionText: questionTracking.questionText,
										startTime: questionTracking.startTime,
										endTime: questionTracking.endTime,
										nextQuestionBtnClick: questionTracking.nextQuestionBtnClick,
										timeline: questionTracking.timeline.timeline,
										answer: questionTracking.answer,
									}; // clear timeline after sending data
									questionTracking.clearTimeline();

									// Send the complete data to the server
									_context4.next = 7;
									return updateSessionData(
										questionTracking.sessionId,
										dataToSend,
									);
								case 7:
									response = _context4.sent;
									return _context4.abrupt("return", !!response);
								case 9:
									return _context4.abrupt("return", true);
								case 12:
									_context4.prev = 12;
									_context4.t0 = _context4["catch"](0);
									console.error("Error handling event capture:", _context4.t0);
									return _context4.abrupt("return", false);
								case 16:
								case "end":
									return _context4.stop();
							}
					},
					_callee4,
					null,
					[[0, 12]],
				);
			},
		),
	);
	return function defaultEventCaptureHandler(_x6, _x7) {
		return _ref4.apply(this, arguments);
	};
})();
var mockServerSender = /*#__PURE__*/ (function () {
	var _ref5 = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee5(data) {
			var existingData;
			return _regeneratorRuntime().wrap(function _callee5$(_context5) {
				while (1)
					switch ((_context5.prev = _context5.next)) {
						case 0:
							// Check if this is a question end event
							if (data.eventType === EVENT_TYPES.question_end) {
								try {
									// Get existing tracking data from localStorage or initialize empty array
									existingData = JSON.parse(
										sessionStorage.getItem("questionTrackingData") || "[]",
									); // Add new tracking data
									existingData.push({
										questionText: data.data.questionText,
										startTime: data.data.startTime,
										endTime: data.data.endTime,
										nextQuestionBtnClick: data.data.nextQuestionBtnClick,
										timeline: data.data.timeline,
									});

									// Save back to localStorage
									sessionStorage.setItem(
										"questionTrackingData",
										JSON.stringify(existingData),
									);
								} catch (error) {
									console.error(
										"Error saving tracking data to localStorage:",
										error,
									);
								}
							}

							// console.log("Mock sender received:", data);
							return _context5.abrupt("return", true);
						case 2:
						case "end":
							return _context5.stop();
					}
			}, _callee5);
		}),
	);
	return function mockServerSender(_x8) {
		return _ref5.apply(this, arguments);
	};
})();

// Event handler factory with dependency injection
var createEventHandler = function createEventHandler() {
	var eventCaptureHandler =
		arguments.length > 0 && arguments[0] !== undefined
			? arguments[0]
			: defaultEventCaptureHandler;
	return /*#__PURE__*/ (function () {
		var _ref6 = _asyncToGenerator(
			/*#__PURE__*/ _regeneratorRuntime().mark(
				function _callee6(eventType, eventData, questionTracking) {
					var trackingData, success;
					return _regeneratorRuntime().wrap(
						function _callee6$(_context6) {
							while (1)
								switch ((_context6.prev = _context6.next)) {
									case 0:
										console.log("eventType", eventType);
										trackingData = {
											eventType: eventType,
											timestamp: new Date().toISOString(),
											data: eventData,
											url: window.location.href,
										};
										_context6.prev = 2;
										_context6.next = 5;
										return eventCaptureHandler(trackingData, questionTracking);
									case 5:
										success = _context6.sent;
										if (!success) {
											console.error(
												"Failed to handle event capture:",
												trackingData,
											);
										}
										_context6.next = 12;
										break;
									case 9:
										_context6.prev = 9;
										_context6.t0 = _context6["catch"](2);
										console.error("Error in handleEventCapture:", _context6.t0);
									case 12:
									case "end":
										return _context6.stop();
								}
						},
						_callee6,
						null,
						[[2, 9]],
					);
				},
			),
		);
		return function (_x9, _x10, _x11) {
			return _ref6.apply(this, arguments);
		};
	})();
};

// Initialize the handler with default implementation
// const handleEventCapture = createEventHandler(mockServerSender);
var handleEventCapture = createEventHandler();

// Base strategy class that all tracking strategies will extend
var TrackingStrategy = /*#__PURE__*/ (function () {
	function TrackingStrategy(questionTracking) {
		_classCallCheck(this, TrackingStrategy);
		this.questionTracking = questionTracking;
	}
	_createClass(TrackingStrategy, [
		{
			key: "execute",
			value: function execute() {
				throw new Error("Strategy must implement execute method");
			},
		},
	]);
	return TrackingStrategy;
})();
var DevToolsStrategy = /*#__PURE__*/ (function (_TrackingStrategy) {
	_inherits(DevToolsStrategy, _TrackingStrategy);
	var _super = _createSuper(DevToolsStrategy);
	function DevToolsStrategy() {
		_classCallCheck(this, DevToolsStrategy);
		return _super.apply(this, arguments);
	}
	_createClass(DevToolsStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this = this;
				try {
					var element = new Image();
					Object.defineProperty(element, "id", {
						get: function get() {
							handleEventCapture(
								EVENT_TYPES.dev_tools_opened,
								{},
								_this.questionTracking,
							);
						},
					});
					console.log(element);
				} catch (error) {
					console.error("Error in DevToolsStrategy:", error);
				}
			},
		},
	]);
	return DevToolsStrategy;
})(TrackingStrategy);
var VisibilityChangeStrategy = /*#__PURE__*/ (function (_TrackingStrategy2) {
	_inherits(VisibilityChangeStrategy, _TrackingStrategy2);
	var _super2 = _createSuper(VisibilityChangeStrategy);
	function VisibilityChangeStrategy() {
		_classCallCheck(this, VisibilityChangeStrategy);
		return _super2.apply(this, arguments);
	}
	_createClass(VisibilityChangeStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this2 = this;
				try {
					document.addEventListener("visibilitychange", function () {
						var eventType = document.hidden
							? EVENT_TYPES.focus_out
							: EVENT_TYPES.focus_in;
						handleEventCapture(eventType, {}, _this2.questionTracking);
					});
				} catch (error) {
					console.error("Error in TabChangeStrategy:", error);
				}
			},
		},
	]);
	return VisibilityChangeStrategy;
})(TrackingStrategy);
var ResolutionChangeStrategy = /*#__PURE__*/ (function (_TrackingStrategy3) {
	_inherits(ResolutionChangeStrategy, _TrackingStrategy3);
	var _super3 = _createSuper(ResolutionChangeStrategy);
	function ResolutionChangeStrategy() {
		_classCallCheck(this, ResolutionChangeStrategy);
		return _super3.apply(this, arguments);
	}
	_createClass(ResolutionChangeStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this3 = this;
				try {
					var resizeTimeout;
					var captureResize = function captureResize() {
						var details = {
							width: window.innerWidth,
							height: window.innerHeight,
						};
						handleEventCapture(
							EVENT_TYPES.resolution_change,
							details,
							_this3.questionTracking,
						);
					};
					window.addEventListener("resize", function () {
						// Clear the previous timeout
						clearTimeout(resizeTimeout);

						// Set a new timeout to capture the resize event after 200ms
						resizeTimeout = setTimeout(captureResize, 200);
					});
				} catch (error) {
					console.error("Error in ResolutionChangeStrategy:", error);
				}
			},
		},
	]);
	return ResolutionChangeStrategy;
})(TrackingStrategy);
var TextSelectionStrategy = /*#__PURE__*/ (function (_TrackingStrategy4) {
	_inherits(TextSelectionStrategy, _TrackingStrategy4);
	var _super4 = _createSuper(TextSelectionStrategy);
	function TextSelectionStrategy() {
		_classCallCheck(this, TextSelectionStrategy);
		return _super4.apply(this, arguments);
	}
	_createClass(TextSelectionStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this4 = this;
				try {
					var captureSelection = function captureSelection() {
						var selection = window.getSelection().toString().trim();
						if (selection) {
							var details = {
								selection: selection,
							};
							handleEventCapture(
								EVENT_TYPES.text_selection,
								details,
								_this4.questionTracking,
							);
						}
					};

					// Capture selection on mouseup
					document.addEventListener("mouseup", captureSelection);

					// Capture selection on keyup (for keyboard-based selection)
					document.addEventListener("keyup", function (event) {
						// Check if the Shift key is involved in the selection
						if (event.key === "Shift" || event.key.startsWith("Arrow")) {
							captureSelection();
						}
					});
				} catch (error) {
					console.error("Error in TextSelectionStrategy:", error);
				}
			},
		},
	]);
	return TextSelectionStrategy;
})(TrackingStrategy);
var TextCopyStrategy = /*#__PURE__*/ (function (_TrackingStrategy5) {
	_inherits(TextCopyStrategy, _TrackingStrategy5);
	var _super5 = _createSuper(TextCopyStrategy);
	function TextCopyStrategy() {
		_classCallCheck(this, TextCopyStrategy);
		return _super5.apply(this, arguments);
	}
	_createClass(TextCopyStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this5 = this;
				try {
					document.addEventListener("copy", function (event) {
						var details = {
							selection: window.getSelection().toString(),
						};
						handleEventCapture(
							EVENT_TYPES.text_copy,
							details,
							_this5.questionTracking,
						);
					});
				} catch (error) {
					console.error("Error in TextCopyStrategy:", error);
				}
			},
		},
	]);
	return TextCopyStrategy;
})(TrackingStrategy);
var TextPasteStrategy = /*#__PURE__*/ (function (_TrackingStrategy6) {
	_inherits(TextPasteStrategy, _TrackingStrategy6);
	var _super6 = _createSuper(TextPasteStrategy);
	function TextPasteStrategy() {
		_classCallCheck(this, TextPasteStrategy);
		return _super6.apply(this, arguments);
	}
	_createClass(TextPasteStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this6 = this;
				try {
					document.addEventListener("paste", function (event) {
						// Get the pasted text from the clipboard
						var pastedText = (
							event.clipboardData || window.clipboardData
						).getData("text");
						var details = {
							pastedText: pastedText,
						};
						handleEventCapture(
							EVENT_TYPES.text_paste,
							details,
							_this6.questionTracking,
						);
					});
				} catch (error) {
					console.error("Error in TextPasteStrategy:", error);
				}
			},
		},
	]);
	return TextPasteStrategy;
})(TrackingStrategy);
var MouseClickStrategy = /*#__PURE__*/ (function (_TrackingStrategy7) {
	_inherits(MouseClickStrategy, _TrackingStrategy7);
	var _super7 = _createSuper(MouseClickStrategy);
	function MouseClickStrategy() {
		_classCallCheck(this, MouseClickStrategy);
		return _super7.apply(this, arguments);
	}
	_createClass(MouseClickStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this7 = this;
				try {
					document.addEventListener("click", function (event) {
						var details = {
							x: event.clientX,
							y: event.clientY,
							target: event.target.tagName,
						};
						handleEventCapture(
							EVENT_TYPES.user_click,
							details,
							_this7.questionTracking,
						);
					});
				} catch (error) {
					console.error("Error in MouseClickStrategy:", error);
				}
			},
		},
	]);
	return MouseClickStrategy;
})(TrackingStrategy);
var UserAnswerStrategy = /*#__PURE__*/ (function (_TrackingStrategy8) {
	_inherits(UserAnswerStrategy, _TrackingStrategy8);
	var _super8 = _createSuper(UserAnswerStrategy);
	function UserAnswerStrategy() {
		_classCallCheck(this, UserAnswerStrategy);
		return _super8.apply(this, arguments);
	}
	_createClass(UserAnswerStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this8 = this;
				try {
					var form = document.querySelector(".sg-survey-form");
					if (form) {
						form.addEventListener("submit", function (event) {
							// event.preventDefault(); // Prevent actual form submission for tracking

							var formData = new FormData(form);
							var answers = {};
							var _iterator = _createForOfIteratorHelper(formData.entries()),
								_step;
							try {
								for (_iterator.s(); !(_step = _iterator.n()).done; ) {
									var _step$value = _slicedToArray(_step.value, 2),
										key = _step$value[0],
										value = _step$value[1];
									answers[key] = value;
								}
							} catch (err) {
								_iterator.e(err);
							} finally {
								_iterator.f();
							}
							_this8.questionTracking.setAnswer(answers);
							handleEventCapture(
								EVENT_TYPES.answer_question,
								{
									answers: answers,
								},
								_this8.questionTracking,
							);

							// form.submit();
						});
					}
				} catch (error) {
					console.error("Error in UserAnswerStrategy:", error);
				}
			},
		},
	]);
	return UserAnswerStrategy;
})(TrackingStrategy);
var NextQuestionButtonStrategy = /*#__PURE__*/ (function (_TrackingStrategy9) {
	_inherits(NextQuestionButtonStrategy, _TrackingStrategy9);
	var _super9 = _createSuper(NextQuestionButtonStrategy);
	function NextQuestionButtonStrategy() {
		_classCallCheck(this, NextQuestionButtonStrategy);
		return _super9.apply(this, arguments);
	}
	_createClass(NextQuestionButtonStrategy, [
		{
			key: "execute",
			value: function execute() {
				this.initObserver();
			},
		},
		{
			key: "initObserver",
			value: function initObserver() {
				var _this9 = this;
				try {
					var nextButton = document.querySelector(
						".btnPreviewNext.questionPreview__btn_right",
					);
					if (!nextButton) {
						nextButton = document.getElementById("rcsrv-submit-btn");
					}
					if (!nextButton) return;
					var observer = new MutationObserver(function () {
						if (nextButton.disabled) {
							_this9.handleNextQuestion();
							observer.disconnect(); // Stop observing after the first trigger
						}
					});

					observer.observe(nextButton, {
						attributes: true,
						attributeFilter: ["disabled"],
					});
				} catch (error) {
					console.error("Error in NextQuestionButtonStrategy:", error);
				}
			},
		},
		{
			key: "handleNextQuestion",
			value: function handleNextQuestion() {
				var questionText = extractQuestionText();
				var answers = this.questionTracking.answer;
				var startTime = this.questionTracking.startTime;
				var endTime = new Date();
				this.questionTracking.setEndTime(endTime);
				handleEventCapture(
					EVENT_TYPES.question_end,
					{
						answers: answers,
						questionText: questionText,
						startTime: startTime,
						endTime: endTime,
					},
					this.questionTracking,
				);

				// Reinitialize the observer for the next question
				this.initObserver();
				this.questionTracking.reinitializeStrategies();
			},
		},
	]);
	return NextQuestionButtonStrategy;
})(TrackingStrategy);
var PageUnloadStrategy = /*#__PURE__*/ (function (_TrackingStrategy10) {
	_inherits(PageUnloadStrategy, _TrackingStrategy10);
	var _super10 = _createSuper(PageUnloadStrategy);
	function PageUnloadStrategy() {
		_classCallCheck(this, PageUnloadStrategy);
		return _super10.apply(this, arguments);
	}
	_createClass(PageUnloadStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this10 = this;
				try {
					window.addEventListener("beforeunload", function () {
						_this10.handlePageUnload();
					});
				} catch (error) {
					console.error("Error in PageUnloadStrategy:", error);
				}
			},
		},
		{
			key: "handlePageUnload",
			value: function handlePageUnload() {
				var questionText = extractQuestionText();
				var answers = this.questionTracking.answer;
				var startTime = this.questionTracking.startTime;
				var endTime = new Date();
				handleEventCapture(
					EVENT_TYPES.question_end,
					{
						answers: answers,
						questionText: questionText,
						startTime: startTime,
						endTime: endTime,
					},
					this.questionTracking,
				);
			},
		},
	]);
	return PageUnloadStrategy;
})(TrackingStrategy);
var Timeline = /*#__PURE__*/ _createClass(function Timeline() {
	var _this11 = this;
	_classCallCheck(this, Timeline);
	_defineProperty(this, "timeline", []);
	_defineProperty(this, "addEvent", function (event) {
		_this11.timeline.push(event);
		return _this11;
	});
});
var QuestionTracking = /*#__PURE__*/ (function () {
	function QuestionTracking(questionText, sessionId, projectId) {
		var _this12 = this;
		_classCallCheck(this, QuestionTracking);
		_defineProperty(this, "questionText", void 0);
		_defineProperty(this, "timeline", new Timeline());
		_defineProperty(this, "startTime", void 0);
		_defineProperty(this, "endTime", void 0);
		_defineProperty(this, "nextQuestionBtnClick", void 0);
		_defineProperty(this, "strategies", []);
		_defineProperty(this, "sessionId", void 0);
		_defineProperty(this, "projectId", void 0);
		_defineProperty(this, "answer", void 0);
		_defineProperty(this, "reinitializeStack", []);
		_defineProperty(this, "addTimelineEvent", function (event) {
			_this12.timeline.addEvent(event);
			return _this12;
		});
		_defineProperty(this, "setStartTime", function (startTime) {
			_this12.startTime = startTime;
			return _this12;
		});
		_defineProperty(this, "setEndTime", function (endTime) {
			_this12.endTime = endTime;
			return _this12;
		});
		_defineProperty(this, "addStrategy", function (StrategyClass) {
			var strategy = new StrategyClass(_this12);
			_this12.strategies.push(strategy);
			// auto register reinitialize strategy
			if (typeof strategy.reinitialize === "function") {
				_this12.reinitializeStack.push(strategy);
			}
			return _this12;
		});
		_defineProperty(this, "runStrategies", function () {
			var _iterator2 = _createForOfIteratorHelper(_this12.strategies),
				_step2;
			try {
				for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
					var strategy = _step2.value;
					strategy.execute();
				}
			} catch (err) {
				_iterator2.e(err);
			} finally {
				_iterator2.f();
			}
			return _this12;
		});
		_defineProperty(this, "setNextQuestionBtnClick", function (time) {
			_this12.nextQuestionBtnClick = time;
			return _this12;
		});
		_defineProperty(this, "setAnswer", function (answer) {
			_this12.answer = answer;
			return _this12;
		});
		this.questionText = questionText;
		this.sessionId = sessionId;
		this.projectId = projectId;
		this.startTime = new Date();
		this.addTimelineEvent({
			type: "QUESTION_START",
			timestamp: this.startTime,
			details: {
				questionText: questionText,
			},
		});
	}
	_createClass(QuestionTracking, [
		{
			key: "reinitializeStrategies",
			value: function reinitializeStrategies() {
				// Reinitialize strategies that need to be reset for each new question
				var _iterator3 = _createForOfIteratorHelper(this.reinitializeStack),
					_step3;
				try {
					for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
						var strategy = _step3.value;
						if (typeof strategy.reinitialize === "function") {
							strategy.reinitialize();
						}
					}
				} catch (err) {
					_iterator3.e(err);
				} finally {
					_iterator3.f();
				}
			},
		},
		{
			key: "clearTimeline",
			value: function clearTimeline() {
				this.timeline = new Timeline();
			},
		},
	]);
	return QuestionTracking;
})(); // Function to extract question text
var extractQuestionText = function extractQuestionText() {
	try {
		// Check for main survey question text
		var questionElement = document.querySelector(
			".questionPreview__text.recruitment__questionText",
		);

		// Fallback to pre-survey question text
		if (!questionElement) {
			questionElement = document.querySelector(
				"#rcsrv .control-label.has-star",
			);
		}
		if (questionElement) {
			return questionElement.textContent.trim();
		}
		return "Unknown Question";
	} catch (error) {
		console.error("Error extracting question text:", error);
		return "";
	}
};

// Function to start the survey and get sessionId
var startSurvey = /*#__PURE__*/ (function () {
	var _ref7 = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee7(projectId) {
			var storedData, response, sessionId;
			return _regeneratorRuntime().wrap(
				function _callee7$(_context7) {
					while (1)
						switch ((_context7.prev = _context7.next)) {
							case 0:
								_context7.prev = 0;
								console.log(
									"Starting survey for projectId: ".concat(projectId),
								);
								storedData =
									JSON.parse(sessionStorage.getItem("surveySession")) || {}; // Check if sessionId exists and is not expired (e.g., 30 minutes expiry)
								if (!storedData.sessionId) {
									_context7.next = 6;
									break;
								}
								console.log(
									"Found existing sessionId: ".concat(storedData.sessionId),
								);
								return _context7.abrupt("return", storedData.sessionId);
							case 6:
								_context7.next = 8;
								return postRequest(
									"".concat(api_end_point, "/respondent-session"),
									{
										projectId: projectId,
									},
								);
							case 8:
								response = _context7.sent;
								sessionId = response.data.sessionId;
								console.log("New sessionId generated: ".concat(sessionId));

								// Store the sessionId under the fixed key "surveySession"
								sessionStorage.setItem(
									"surveySession",
									JSON.stringify({
										sessionId: sessionId,
									}),
								);
								return _context7.abrupt("return", sessionId);
							case 15:
								_context7.prev = 15;
								_context7.t0 = _context7["catch"](0);
								console.error("Error starting survey:", _context7.t0);
								throw _context7.t0;
							case 19:
							case "end":
								return _context7.stop();
						}
				},
				_callee7,
				null,
				[[0, 15]],
			);
		}),
	);
	return function startSurvey(_x12) {
		return _ref7.apply(this, arguments);
	};
})();

// Function to send survey data to the server
var sendSurveyData = /*#__PURE__*/ (function () {
	var _ref8 = _asyncToGenerator(
		/*#__PURE__*/ _regeneratorRuntime().mark(function _callee8(data) {
			var sessionId;
			return _regeneratorRuntime().wrap(
				function _callee8$(_context8) {
					while (1)
						switch ((_context8.prev = _context8.next)) {
							case 0:
								sessionId = data.sessionId;
								if (sessionId) {
									_context8.next = 4;
									break;
								}
								console.error(
									"No sessionId found. Please start the survey first.",
								);
								return _context8.abrupt("return");
							case 4:
								_context8.prev = 4;
								console.log(
									"Sending survey data for sessionId: ".concat(sessionId),
								);
								_context8.next = 8;
								return putRequest(
									""
										.concat(
											api_end_point,
											"/respondent-session/updateSessionInteraction/",
										)
										.concat(sessionId),
									data,
								);
							case 8:
								console.log("Survey data sent successfully");

								// Clear the timeline after sending data
								data.questionTracking.clearTimeline();
								_context8.next = 15;
								break;
							case 12:
								_context8.prev = 12;
								_context8.t0 = _context8["catch"](4);
								console.error("Error sending survey data:", _context8.t0);
							case 15:
							case "end":
								return _context8.stop();
						}
				},
				_callee8,
				null,
				[[4, 12]],
			);
		}),
	);
	return function sendSurveyData(_x13) {
		return _ref8.apply(this, arguments);
	};
})();

// Utility function to extract projectId from the URL
var getProjectIdFromUrl = function getProjectIdFromUrl() {
	try {
		console.log("Extracting projectId from URL");
		var urlParts = window.location.pathname.split("/");
		// const projectIdIndex = urlParts.indexOf("survey") + 1;
		if (urlParts.length > 2) {
			var projectId = urlParts.at(2);
			console.log("Extracted projectId: ".concat(projectId));
			return projectId;
		}
		throw new Error("ProjectId not found in URL");
	} catch (error) {
		console.error("Error extracting projectId from URL:", error);
		return null;
	}
};

// Add the PreSurveyAnswerStrategy class
var PreSurveyAnswerStrategy = /*#__PURE__*/ (function (_TrackingStrategy11) {
	_inherits(PreSurveyAnswerStrategy, _TrackingStrategy11);
	var _super11 = _createSuper(PreSurveyAnswerStrategy);
	function PreSurveyAnswerStrategy() {
		_classCallCheck(this, PreSurveyAnswerStrategy);
		return _super11.apply(this, arguments);
	}
	_createClass(PreSurveyAnswerStrategy, [
		{
			key: "execute",
			value: function execute() {
				var _this13 = this;
				try {
					var form = document.getElementById("rcsrv");
					if (form) {
						// Add listeners for radio buttons and checkboxes
						var inputs = form.querySelectorAll(
							'input[type="radio"], input[type="checkbox"]',
						);
						var _iterator4 = _createForOfIteratorHelper(inputs),
							_step4;
						try {
							var _loop = function _loop() {
								var input = _step4.value;
								input.addEventListener("change", function () {
									_this13.captureAnswer(input);
								});
							};
							for (_iterator4.s(); !(_step4 = _iterator4.n()).done; ) {
								_loop();
							}

							// Add listener for textarea
						} catch (err) {
							_iterator4.e(err);
						} finally {
							_iterator4.f();
						}
						var textarea = form.querySelector(
							'textarea[name="ProfileQuestion[value]"]',
						);
						if (textarea) {
							textarea.addEventListener("change", function () {
								_this13.captureAnswer(textarea);
							});
						}
					}
				} catch (error) {
					console.error("Error in PreSurveyAnswerStrategy:", error);
				}
			},
		},
		{
			key: "captureAnswer",
			value: function captureAnswer(inputElement) {
				var answers = "";
				if (inputElement.type === "radio" || inputElement.type === "checkbox") {
					var labelElement = inputElement.closest("label");
					if (labelElement) {
						answers = labelElement.textContent.trim();
					}
				} else if (inputElement.tagName.toLowerCase() === "textarea") {
					answers = inputElement.value.trim();
				}
				this.questionTracking.setAnswer(answers);
				handleEventCapture(
					EVENT_TYPES.answer_question,
					{
						answers: answers,
					},
					this.questionTracking,
				);
			},
		},
	]);
	return PreSurveyAnswerStrategy;
})(TrackingStrategy); // Function to check if the current page is a main survey
var isMainSurveyPage = function isMainSurveyPage() {
	var urlPattern = /\/ms\/\w+$/; // Adjust the pattern as needed
	return urlPattern.test(window.location.pathname);
};

// Strategy for handling main survey answers
var MainSurveyAnswerStrategy = /*#__PURE__*/ (function (_TrackingStrategy12) {
	_inherits(MainSurveyAnswerStrategy, _TrackingStrategy12);
	var _super12 = _createSuper(MainSurveyAnswerStrategy);
	function MainSurveyAnswerStrategy() {
		_classCallCheck(this, MainSurveyAnswerStrategy);
		return _super12.apply(this, arguments);
	}
	_createClass(MainSurveyAnswerStrategy, [
		{
			key: "execute",
			value: function execute() {
				this.initListeners();
			},
		},
		{
			key: "initListeners",
			value: function initListeners() {
				var _this14 = this;
				try {
					if (!isMainSurveyPage()) return;
					var questionBody = document.getElementById("questionBody");
					if (!questionBody) return;

					// Use MutationObserver to detect when the new question is fully loaded
					var observer = new MutationObserver(function (mutationsList) {
						var newQuestionLoaded = false;
						var _iterator5 = _createForOfIteratorHelper(mutationsList),
							_step5;
						try {
							for (_iterator5.s(); !(_step5 = _iterator5.n()).done; ) {
								var mutation = _step5.value;
								if (
									mutation.type === "childList" &&
									mutation.addedNodes.length > 0
								) {
									var _mutation$target,
										_mutation$target2,
										_mutation$target2$cla;
									// Check for specific elements that indicate a new question
									if (
										((_mutation$target = mutation.target) === null ||
										_mutation$target === void 0
											? void 0
											: _mutation$target.nodeType) === Node.ELEMENT_NODE &&
										(_mutation$target2 = mutation.target) !== null &&
										_mutation$target2 !== void 0 &&
										(_mutation$target2$cla = _mutation$target2.className) !==
											null &&
										_mutation$target2$cla !== void 0 &&
										_mutation$target2$cla.includes("questionPreview__text")
									) {
										newQuestionLoaded = true;
										break;
									}
								}
							}
						} catch (err) {
							_iterator5.e(err);
						} finally {
							_iterator5.f();
						}
						if (newQuestionLoaded) {
							observer.disconnect(); // Stop observing once the new question is loaded

							// Delay reinitialization to ensure the DOM is stable
							setTimeout(function () {
								_this14.captureAnswers();
								_this14.initListeners(); // Reinitialize listeners for the new question
							}, 500); // Adjust the delay as needed
						}
					});

					observer.observe(questionBody, {
						childList: true,
						subtree: true,
					});

					// Add input event listener for text inputs
					questionBody.addEventListener("input", function (event) {
						if (event.target.matches('input[type="text"]')) {
							_this14.captureAnswers();
						}
					});

					// Add change event listener for radio inputs
					var radioInputs = questionBody.querySelectorAll(
						'input[type="radio"]',
					);
					var _iterator6 = _createForOfIteratorHelper(radioInputs),
						_step6;
					try {
						for (_iterator6.s(); !(_step6 = _iterator6.n()).done; ) {
							var input = _step6.value;
							input.addEventListener("change", function () {
								_this14.captureAnswers();
							});
						}

						// Add change event listener for checkbox inputs
					} catch (err) {
						_iterator6.e(err);
					} finally {
						_iterator6.f();
					}
					var checkboxInputs = questionBody.querySelectorAll(
						'input[type="checkbox"]',
					);
					var _iterator7 = _createForOfIteratorHelper(checkboxInputs),
						_step7;
					try {
						for (_iterator7.s(); !(_step7 = _iterator7.n()).done; ) {
							var _input = _step7.value;
							_input.addEventListener("change", function () {
								_this14.captureAnswers();
							});
						}
					} catch (err) {
						_iterator7.e(err);
					} finally {
						_iterator7.f();
					}
				} catch (error) {
					console.error("Error in MainSurveyAnswerStrategy:", error);
				}
			},
		},
		{
			key: "captureAnswers",
			value: function captureAnswers() {
				var _textInput$value2;
				var answers = [];

				// Capture ranking answers
				var rankingBlocks = document.querySelectorAll(
					".questionPreview__rankingBlock",
				);
				var _iterator8 = _createForOfIteratorHelper(rankingBlocks),
					_step8;
				try {
					for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
						var block = _step8.value;
						var rankValue = block
							.querySelector(".questionPreview__rankingValue")
							.textContent.trim();
						var _label = block
							.querySelector(".questionPreview__rankingCheckbox span span")
							.textContent.trim();
						if (rankValue !== "#") {
							answers.push(
								"".concat(_label, " (Rank: ").concat(rankValue, ")"),
							);
						}
					}

					// Capture AnswerFieldChoiceWithText
				} catch (err) {
					_iterator8.e(err);
				} finally {
					_iterator8.f();
				}
				var selectedOption = document.querySelector(
					'input[type="radio"]:checked',
				);
				if (selectedOption) {
					var label = selectedOption.closest("label");
					if (label) {
						var _selectedOption$close, _textInput$value;
						var answerText = label.textContent.trim();
						var _textInput =
							(_selectedOption$close = selectedOption.closest(
								".AnswerFieldChoiceWithText__item",
							)) === null || _selectedOption$close === void 0
								? void 0
								: _selectedOption$close.querySelector('input[type="text"]');
						if (
							_textInput !== null &&
							_textInput !== void 0 &&
							(_textInput$value = _textInput.value) !== null &&
							_textInput$value !== void 0 &&
							_textInput$value.trim()
						) {
							answerText += ": ".concat(_textInput.value.trim());
						}
						answers.push(answerText);
					}
				}

				// Capture checkbox answers
				var selectedCheckboxes = document.querySelectorAll(
					'input[type="checkbox"]:checked',
				);
				var _iterator9 = _createForOfIteratorHelper(selectedCheckboxes),
					_step9;
				try {
					for (_iterator9.s(); !(_step9 = _iterator9.n()).done; ) {
						var checkbox = _step9.value;
						var _label2 = checkbox.closest("label");
						if (_label2) {
							answers.push(_label2.textContent.trim());
						}
					}

					// Capture text input
				} catch (err) {
					_iterator9.e(err);
				} finally {
					_iterator9.f();
				}
				var textInput = document.querySelector(
					'.questionPreview__answer input[type="text"]',
				);
				if (
					textInput !== null &&
					textInput !== void 0 &&
					(_textInput$value2 = textInput.value) !== null &&
					_textInput$value2 !== void 0 &&
					_textInput$value2.trim()
				) {
					answers.push(textInput.value.trim());
				}
				if (answers.length > 0) {
					// Retry extracting the question text before submitting
					var questionText = extractQuestionText();
					this.questionTracking.setAnswer(answers.join(", "));
					this.questionTracking.questionText = questionText;
					handleEventCapture(
						EVENT_TYPES.answer_question,
						{
							answers: answers,
						},
						this.questionTracking,
					);
				}
			},
		},
		{
			key: "reinitialize",
			value: function reinitialize() {
				// This method is now managed by the MutationObserver
			},
		},
	]);
	return MainSurveyAnswerStrategy;
})(TrackingStrategy);
var onDocumentReady = function onDocumentReady(callback) {
	if (document.readyState === "complete") {
		// Document is already fully loaded
		callback();
	} else {
		window.addEventListener("load", callback);
	}
};
onDocumentReady(function () {
	var startTracking = /*#__PURE__*/ (function () {
		var _ref9 = _asyncToGenerator(
			/*#__PURE__*/ _regeneratorRuntime().mark(function _callee9(projectId) {
				var sessionId, questionText, questionTracking;
				return _regeneratorRuntime().wrap(
					function _callee9$(_context9) {
						while (1)
							switch ((_context9.prev = _context9.next)) {
								case 0:
									_context9.prev = 0;
									console.log(
										"Starting tracking for projectId: ".concat(projectId),
									);
									_context9.next = 4;
									return startSurvey(projectId);
								case 4:
									sessionId = _context9.sent;
									questionText = extractQuestionText();
									console.log("Tracking question: ".concat(questionText));
									questionTracking = new QuestionTracking(
										questionText,
										sessionId,
										projectId,
									);
									questionTracking
										.addStrategy(MouseClickStrategy)
										.addStrategy(DevToolsStrategy)
										.addStrategy(VisibilityChangeStrategy)
										.addStrategy(ResolutionChangeStrategy)
										.addStrategy(TextSelectionStrategy)
										.addStrategy(TextCopyStrategy)
										.addStrategy(TextPasteStrategy)
										.addStrategy(PreSurveyAnswerStrategy)
										.addStrategy(MainSurveyAnswerStrategy)
										.addStrategy(NextQuestionButtonStrategy)
										// .addStrategy(new PageUnloadStrategy(questionTracking))
										.runStrategies();
									return _context9.abrupt("return", questionTracking);
								case 12:
									_context9.prev = 12;
									_context9.t0 = _context9["catch"](0);
									console.error(
										"Error initializing tracking functions:",
										_context9.t0,
									);
								case 15:
								case "end":
									return _context9.stop();
							}
					},
					_callee9,
					null,
					[[0, 12]],
				);
			}),
		);
		return function startTracking(_x14) {
			return _ref9.apply(this, arguments);
		};
	})();

	// Start tracking after DOM is fully loaded
	var projectId = getProjectIdFromUrl();
	if (projectId) {
		startTracking(projectId);
	} else {
		console.error("Failed to start tracking: projectId is null");
	}
});
