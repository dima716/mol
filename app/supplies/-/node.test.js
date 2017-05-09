require( "source-map-support" ).install()

;
/// Fake namespace for optional overrides
///
/// 	namespace $ { export var x = 1 , y = 1 } // defaults
/// 	namespace $.$mol { export var x = 2 } // overrides
/// 	namespace $.$mol { console.log( x , y ) } // usage
///
this.$ = this.$ || this
var $ = this.$
$.$mol = $

;
setImmediate(function () {
    $.$mol_test_run();
});
//test.node.js.map
;
var $;
(function ($) {
    function $mol_test(set) {
        for (var name_1 in set)
            $.$mol_test_all.push(new $mol_test_case(set[name_1]));
    }
    $.$mol_test = $mol_test;
    $.$mol_test_all = [];
    $.$mol_test_run = function () {
        for (var _i = 0, $mol_test_all_1 = $.$mol_test_all; _i < $mol_test_all_1.length; _i++) {
            var test = $mol_test_all_1[_i];
            test.run();
        }
    };
    var $mol_test_case = (function () {
        function $mol_test_case(code) {
            if (typeof code === 'string') {
                this.code = new Function(code);
            }
            else {
                this.code = code;
            }
        }
        $mol_test_case.prototype.run = function () {
            this.code();
        };
        return $mol_test_case;
    }());
    $.$mol_test_case = $mol_test_case;
})($ || ($ = {}));
//test.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'must be false': function () {
            $.$mol_assert_not(0);
        },
        'must be true': function () {
            $.$mol_assert_ok(1);
        },
        'must be equal': function () {
            $.$mol_assert_equal(2, 2);
        },
        'must be unique': function () {
            $.$mol_assert_unique([3], [3]);
        },
    });
})($ || ($ = {}));
//assert.test.js.map
;
var $;
(function ($) {
    function $mol_assert_ok(value) {
        if (value)
            return;
        throw new Error("Not true (" + value + ")");
    }
    $.$mol_assert_ok = $mol_assert_ok;
    function $mol_assert_not(value) {
        if (!value)
            return;
        throw new Error("Not false (" + value + ")");
    }
    $.$mol_assert_not = $mol_assert_not;
    function $mol_assert_fail(handler, ErrorRight) {
        try {
            handler();
        }
        catch (error) {
            if (ErrorRight)
                $mol_assert_ok(error instanceof ErrorRight);
            return error;
        }
        throw new Error('Not failed');
    }
    $.$mol_assert_fail = $mol_assert_fail;
    function $mol_assert_equal(a, b) {
        if (a === b)
            return;
        throw new Error("Not equal (" + a + "," + b + ")");
    }
    $.$mol_assert_equal = $mol_assert_equal;
    function $mol_assert_unique(a, b) {
        if (a !== b)
            return;
        throw new Error("Not unique (" + a + "," + b + ")");
    }
    $.$mol_assert_unique = $mol_assert_unique;
})($ || ($ = {}));
//assert.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'dict shim must have equal api to native Map': function () {
            var dict = new $.$mol_dict_shim;
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            dict.set(obj1, 1);
            dict.set(obj2, 2);
            $.$mol_assert_equal(dict.size, 2);
            $.$mol_assert_ok(dict.has(obj1));
            $.$mol_assert_ok(dict.has(obj2));
            $.$mol_assert_not(dict.has(obj3));
            $.$mol_assert_equal(dict.get(obj1), 1);
            $.$mol_assert_equal(dict.get(obj2), 2);
            $.$mol_assert_equal(dict.get(obj3), void 0);
            var entries = dict.entries();
            $.$mol_assert_equal(entries.length, 2);
            $.$mol_assert_equal(entries[0][0], obj1);
            $.$mol_assert_equal(entries[0][1], 1);
            $.$mol_assert_equal(entries[1][0], obj2);
            $.$mol_assert_equal(entries[1][1], 2);
            dict.delete(obj2);
            $.$mol_assert_not(dict.has(obj2));
        }
    });
})($ || ($ = {}));
//dict.test.js.map
;
var $;
(function ($) {
    var $mol_dict_shim = (function () {
        function $mol_dict_shim() {
            this._keys = {};
            this._values = {};
            this.size = 0;
        }
        $mol_dict_shim.prototype.set = function (key, value) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (keys) {
                var index = keys.indexOf(key);
                if (index === -1) {
                    index = keys.length;
                    keys.push(key);
                    ++this.size;
                }
                this._values[keyStr][index] = value;
            }
            else {
                this._keys[keyStr] = [key];
                this._values[keyStr] = [value];
                ++this.size;
            }
            return this;
        };
        $mol_dict_shim.prototype.get = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return void 0;
            var index = list.indexOf(key);
            if (index === -1)
                return void 0;
            return this._values[keyStr][index];
        };
        $mol_dict_shim.prototype.has = function (key) {
            var keyStr = String(key);
            var list = this._keys[keyStr];
            if (!list)
                return false;
            return list.indexOf(key) !== -1;
        };
        $mol_dict_shim.prototype.delete = function (key) {
            var keyStr = String(key);
            var keys = this._keys[keyStr];
            if (!keys)
                return;
            var index = keys.indexOf(key);
            if (index === -1)
                return;
            keys.splice(index, 1);
            this._values[keyStr].splice(index, 1);
            --this.size;
        };
        $mol_dict_shim.prototype.forEach = function (handle) {
            for (var keyStr in this._keys) {
                if (!this._keys.hasOwnProperty(keyStr))
                    continue;
                var values = this._values[keyStr];
                this._keys[keyStr].forEach(function (key, index) {
                    handle(values[index], key);
                });
            }
        };
        $mol_dict_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_dict_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_dict_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([key, val]);
            });
            return entries;
        };
        $mol_dict_shim.prototype.clear = function () {
            this._keys = {};
            this._values = {};
            this.size = 0;
        };
        return $mol_dict_shim;
    }());
    $.$mol_dict_shim = $mol_dict_shim;
})($ || ($ = {}));
//dict.js.map
;
$.$mol_dict = ( typeof Map === 'function' ) ? Map : $.$mol_dict_shim

;
var $;
(function ($) {
    $.$mol_func_name_dict = new $.$mol_dict();
    function $mol_func_name(func) {
        if (func.name)
            return func.name;
        if ($.$mol_func_name_dict.has(func))
            return $.$mol_func_name_dict.get(func);
        var name = Function.prototype.toString.call(func).match(/^function ([a-z0-9_$]*)/)[1];
        $.$mol_func_name_dict.set(func, name);
        return name;
    }
    $.$mol_func_name = $mol_func_name;
})($ || ($ = {}));
//func.js.map
;
var $;
(function ($) {
    function $mol_log(path, values) {
        var filter = $mol_log.filter();
        if (filter == null)
            return;
        if (path.indexOf(filter) === -1)
            return;
        var time = new Date().toLocaleTimeString();
        console.log(time, path, values);
    }
    $.$mol_log = $mol_log;
    (function ($mol_log) {
        var _filter;
        function filter(next) {
            if (next !== void 0) {
                _filter = next;
            }
            if (_filter !== void 0)
                return _filter;
            return _filter = null;
        }
        $mol_log.filter = filter;
    })($mol_log = $.$mol_log || ($.$mol_log = {}));
})($ || ($ = {}));
//log.node.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    $.$mol_test({
        'init with overload': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function () {
                    return 1;
                };
                return X;
            }($.$mol_object));
            var x = new X().setup(function (obj) {
                obj.foo = function () { return 2; };
            });
            $.$mol_assert_equal(x.foo(), 2);
        },
        'object path generation': function () {
            var x = new $.$mol_object;
            $.$mol_assert_equal("" + x, '');
            x.object_field('foo()');
            $.$mol_assert_equal("" + x, '.foo()');
            x.object_field('bar()');
            $.$mol_assert_equal("" + x, '.foo()');
        },
    });
})($ || ($ = {}));
//object.test.js.map
;
var $;
(function ($) {
    var $mol_object = (function () {
        function $mol_object() {
            this['destroyed()'] = false;
        }
        $mol_object.prototype.Class = function () {
            return this.constructor;
        };
        $mol_object.toString = function () {
            return $.$mol_func_name(this);
        };
        $mol_object.prototype.object_owner = function (next) {
            if (this['object_owner()'])
                return this['object_owner()'];
            return this['object_owner()'] = next;
        };
        $mol_object.prototype.object_field = function (next) {
            if (this['object_field()'])
                return this['object_field()'] || '';
            return this['object_field()'] = next;
        };
        $mol_object.prototype.toString = function () {
            var path = '';
            var owner = this.object_owner();
            if (owner)
                path = owner.toString();
            var field = this.object_field();
            if (field)
                path += '.' + field;
            return path;
        };
        $mol_object.prototype.toJSON = function () {
            return this.toString();
        };
        $mol_object.prototype.setup = function (script) {
            script(this);
            return this;
        };
        $mol_object.prototype.destroyed = function (next) {
            if (next === void 0)
                return this['destroyed()'];
            this['destroyed()'] = next;
            this.log(['.destroyed()', next]);
            return next;
        };
        $mol_object.prototype.log = function (values) {
            if ($.$mol_log.filter() == null)
                return;
            $.$mol_log(this.toString(), values);
        };
        return $mol_object;
    }());
    $.$mol_object = $mol_object;
})($ || ($ = {}));
//object.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_defer = (function (_super) {
        __extends($mol_defer, _super);
        function $mol_defer(run) {
            var _this = _super.call(this) || this;
            _this.run = run;
            $mol_defer.add(_this);
            return _this;
        }
        $mol_defer.prototype.destroyed = function (next) {
            if (next)
                $mol_defer.drop(this);
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_defer.schedule = function () {
            var _this = this;
            if (this.timer)
                return;
            this.timer = this.scheduleNative(function () {
                _this.timer = 0;
                _this.run();
            });
        };
        $mol_defer.unschedule = function () {
            if (!this.timer)
                return;
            cancelAnimationFrame(this.timer);
            this.timer = 0;
        };
        $mol_defer.add = function (defer) {
            this.all.push(defer);
            this.schedule();
        };
        $mol_defer.drop = function (defer) {
            var index = this.all.indexOf(defer);
            if (index >= 0)
                this.all.splice(index, 1);
        };
        $mol_defer.run = function () {
            if (this.all.length === 0)
                return;
            this.schedule();
            for (var defer; defer = this.all.pop();)
                defer.run();
        };
        return $mol_defer;
    }($.$mol_object));
    $mol_defer.all = [];
    $mol_defer.timer = 0;
    $mol_defer.scheduleNative = (typeof requestAnimationFrame == 'function')
        ? function (handler) { return requestAnimationFrame(handler); }
        : function (handler) { return setTimeout(handler, 16); };
    $.$mol_defer = $mol_defer;
})($ || ($ = {}));
//defer.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'set-shim must have equal api to native Set': function () {
            var set = new $.$mol_set_shim;
            var obj1 = {};
            var obj2 = {};
            var obj3 = {};
            set.add(obj1);
            set.add(obj2);
            $.$mol_assert_equal(set.size, 2);
            $.$mol_assert_ok(set.has(obj1));
            $.$mol_assert_ok(set.has(obj2));
            $.$mol_assert_not(set.has(obj3));
            var entries = set.entries();
            $.$mol_assert_equal(entries.length, 2);
            $.$mol_assert_equal(entries[0][0], obj1);
            $.$mol_assert_equal(entries[0][1], obj1);
            $.$mol_assert_equal(entries[1][0], obj2);
            $.$mol_assert_equal(entries[1][1], obj2);
            set.delete(obj2);
            $.$mol_assert_not(set.has(obj2));
        },
    });
})($ || ($ = {}));
//set.test.js.map
;
var $;
(function ($) {
    var $mol_set_shim = (function () {
        function $mol_set_shim() {
            this._index = {};
            this.size = 0;
        }
        $mol_set_shim.prototype.add = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (list) {
                if (list.indexOf(value) !== -1)
                    return this;
                list.push(value);
            }
            else {
                list = this._index[key] = [value];
            }
            ++this.size;
            return this;
        };
        $mol_set_shim.prototype.has = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return false;
            return list.indexOf(value) !== -1;
        };
        $mol_set_shim.prototype.delete = function (value) {
            var key = String(value);
            var list = this._index[key];
            if (!list)
                return;
            var index = list.indexOf(value);
            if (index === -1)
                return;
            list.splice(index, 1);
            --this.size;
        };
        $mol_set_shim.prototype.forEach = function (handle) {
            for (var key in this._index) {
                if (!this._index.hasOwnProperty(key))
                    continue;
                this._index[key].forEach(function (val, index) { return handle(val, val); });
            }
        };
        $mol_set_shim.prototype.keys = function () {
            var keys = [];
            this.forEach(function (val, key) {
                keys.push(key);
            });
            return keys;
        };
        $mol_set_shim.prototype.values = function () {
            var values = [];
            this.forEach(function (val, key) {
                values.push(val);
            });
            return values;
        };
        $mol_set_shim.prototype.entries = function () {
            var entries = [];
            this.forEach(function (val, key) {
                entries.push([val, key]);
            });
            return entries;
        };
        $mol_set_shim.prototype.clear = function () {
            this._index = {};
            this.size = 0;
        };
        return $mol_set_shim;
    }());
    $.$mol_set_shim = $mol_set_shim;
})($ || ($ = {}));
//set.js.map
;
$.$mol_set = ( typeof Set === 'function' ) ? Set : $.$mol_set_shim

;
var $;
(function ($) {
    $.$mol_state_stack = new $.$mol_dict();
})($ || ($ = {}));
//stack.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'caching': function () {
            var random = new $.$mol_atom('random', function () { return Math.random(); });
            $.$mol_assert_equal(random.get(), random.get());
        },
        'lazyness': function () {
            var value = 0;
            var prop = new $.$mol_atom('prop', function () { return value = 1; });
            $.$mol_defer.run();
            $.$mol_assert_equal(value, 0);
        },
        'instant actualization': function () {
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return middle.get() + 1; });
            $.$mol_assert_equal(target.get(), 3);
            source.set(2);
            $.$mol_assert_equal(target.get(), 4);
        },
        'automatic deferred restart': function () {
            var targetValue;
            var source = new $.$mol_atom('source', function (next) { return next || 1; });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return targetValue = middle.get() + 1; });
            target.get();
            $.$mol_assert_equal(targetValue, 3);
            source.set(2);
            $.$mol_assert_equal(targetValue, 3);
            $.$mol_defer.run();
            $.$mol_assert_equal(targetValue, 4);
        },
        'Right reactive change of source': function () {
            var targetValue;
            var counter = new $.$mol_atom('counter', function (next) {
                new $.$mol_defer(function () {
                    counter.push(next || 1);
                });
                throw new $.$mol_atom_wait;
            });
            var slave = new $.$mol_atom('slave', function (next) { return counter.get(); });
            slave.actualize();
            var changed = false;
            $.$mol_atom_task('task', function () {
                var next = counter.get() + 1;
                $.$mol_atom_task('task', function () {
                    counter.set(next).valueOf();
                    changed = true;
                });
            });
            $.$mol_defer.run();
            $.$mol_assert_equal(counter.get(), 2);
            $.$mol_assert_ok(changed);
            slave.destroyed(true);
        },
        'error handling': function () {
            var source = new $.$mol_atom('source', function (next) {
                var error = new Error('Test error');
                error['$mol_atom_catched'] = true;
                throw error;
            });
            var middle = new $.$mol_atom('middle', function () { return source.get() + 1; });
            var target = new $.$mol_atom('target', function () { return middle.get() + 1; });
            $.$mol_assert_fail(function () { return target.get().valueOf(); });
        },
    });
})($ || ($ = {}));
//atom.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_atom_status;
    (function ($mol_atom_status) {
        $mol_atom_status[$mol_atom_status["obsolete"] = 'obsolete'] = "obsolete";
        $mol_atom_status[$mol_atom_status["checking"] = 'checking'] = "checking";
        $mol_atom_status[$mol_atom_status["pulling"] = 'pulling'] = "pulling";
        $mol_atom_status[$mol_atom_status["actual"] = 'actual'] = "actual";
    })($mol_atom_status = $.$mol_atom_status || ($.$mol_atom_status = {}));
    var $mol_atom = (function (_super) {
        __extends($mol_atom, _super);
        function $mol_atom(host, handler, field) {
            if (field === void 0) { field = 'value()'; }
            var _this = _super.call(this) || this;
            _this.masters = null;
            _this.slaves = null;
            _this.status = $mol_atom_status.obsolete;
            _this.autoFresh = true;
            _this.handler = handler;
            _this.host = Object(host);
            _this.field = field || 'value()';
            return _this;
        }
        $mol_atom.prototype.destroyed = function (next) {
            if (next) {
                this.unlink();
                var host = this.host;
                var value = host[this.field];
                if (value instanceof $.$mol_object) {
                    if ((value.object_owner() === host) && (value.object_field() === this.field)) {
                        value.destroyed(true);
                    }
                }
                host[this.field] = void null;
                host[this.field + '@'] = void null;
                this.status = $mol_atom_status.obsolete;
            }
            return _super.prototype.destroyed.call(this, next);
        };
        $mol_atom.prototype.unlink = function () {
            this.disobey_all();
            this.check_slaves();
        };
        $mol_atom.prototype.toString = function () {
            return this.host + "." + this.field + "@";
        };
        $mol_atom.prototype.get = function (force) {
            if (this.status === $mol_atom_status.pulling) {
                throw new Error("Cyclic atom dependency of " + this);
            }
            this.actualize(force);
            var slave = $mol_atom.stack[0];
            if (slave)
                this.lead(slave);
            if (slave)
                slave.obey(this);
            var value = this.host[this.field];
            if (value instanceof Error) {
                if (typeof Proxy !== 'function')
                    throw value;
            }
            return value;
        };
        $mol_atom.prototype.actualize = function (force) {
            var _this = this;
            if (!force && this.status === $mol_atom_status.actual)
                return;
            var slave = $mol_atom.stack[0];
            $mol_atom.stack[0] = this;
            if (!force && this.status === $mol_atom_status.checking) {
                this.masters.forEach(function (master) {
                    if (_this.status !== $mol_atom_status.checking)
                        return;
                    master.actualize();
                });
                if (this.status === $mol_atom_status.checking) {
                    this.status = $mol_atom_status.actual;
                }
            }
            if (force || this.status !== $mol_atom_status.actual) {
                var oldMasters = this.masters;
                this.masters = null;
                if (oldMasters)
                    oldMasters.forEach(function (master) {
                        master.dislead(_this);
                    });
                this.status = $mol_atom_status.pulling;
                var next = this.pull(force);
                this.push(next);
            }
            $mol_atom.stack[0] = slave;
        };
        $mol_atom.prototype.pull = function (force) {
            try {
                return this.handler(this._next, force);
            }
            catch (error) {
                if (error['$mol_atom_catched'])
                    return error;
                if (error instanceof $mol_atom_wait)
                    return error;
                console.error(error.stack || error);
                if (!(error instanceof Error)) {
                    error = new Error(error.stack || error);
                }
                error['$mol_atom_catched'] = true;
                return error;
            }
        };
        $mol_atom.prototype.set = function (next) {
            var next_normal = this.normalize(next, this._next);
            if (next_normal === this._next)
                return this.get();
            if (next_normal === this.host[this.field])
                return this.get();
            this._next = next_normal;
            this.obsolete();
            return this.get();
        };
        $mol_atom.prototype.normalize = function (next, prev) {
            if (next === prev)
                return next;
            if ((next instanceof Array) && (prev instanceof Array) && (next.length === prev.length)) {
                for (var i = 0; i < next.length; ++i) {
                    if (next[i] !== prev[i])
                        return next;
                }
                return prev;
            }
            return next;
        };
        $mol_atom.prototype.push = function (next_raw) {
            this._next = void null;
            this.status = $mol_atom_status.actual;
            var host = this.host;
            var prev = host[this.field];
            if (next_raw === void null)
                return prev;
            var next = (next_raw instanceof Error) ? next_raw : this.normalize(next_raw, prev);
            if (next === prev)
                return prev;
            if (next instanceof $.$mol_object) {
                next.object_field(this.field);
                next.object_owner(host);
            }
            if ((typeof Proxy === 'function') && (next instanceof Error)) {
                next = new Proxy(next, {
                    get: function (target) {
                        throw target.valueOf();
                    },
                    ownKeys: function (target) {
                        throw target.valueOf();
                    },
                });
            }
            host[this.field] = next;
            this.log(['push', next, prev]);
            this.obsolete_slaves();
            return next;
        };
        $mol_atom.prototype.obsolete_slaves = function () {
            if (!this.slaves)
                return;
            this.slaves.forEach(function (slave) { return slave.obsolete(); });
        };
        $mol_atom.prototype.check_slaves = function () {
            if (this.slaves) {
                this.slaves.forEach(function (slave) { return slave.check(); });
            }
            else {
                if (this.autoFresh)
                    $mol_atom.actualize(this);
            }
        };
        $mol_atom.prototype.check = function () {
            if (this.status === $mol_atom_status.actual) {
                this.status = $mol_atom_status.checking;
                this.check_slaves();
            }
        };
        $mol_atom.prototype.obsolete = function () {
            if (this.status === $mol_atom_status.obsolete)
                return;
            this.log(['obsolete']);
            this.status = $mol_atom_status.obsolete;
            this.check_slaves();
            return void null;
        };
        $mol_atom.prototype.lead = function (slave) {
            if (!this.slaves) {
                this.slaves = new $.$mol_set();
                $mol_atom.unreap(this);
            }
            this.slaves.add(slave);
        };
        $mol_atom.prototype.dislead = function (slave) {
            if (!this.slaves)
                return;
            if (this.slaves.size === 1) {
                this.slaves = null;
                $mol_atom.reap(this);
            }
            else {
                this.slaves.delete(slave);
            }
        };
        $mol_atom.prototype.obey = function (master) {
            if (!this.masters)
                this.masters = new $.$mol_set();
            this.masters.add(master);
        };
        $mol_atom.prototype.disobey = function (master) {
            if (!this.masters)
                return;
            this.masters.delete(master);
        };
        $mol_atom.prototype.disobey_all = function () {
            var _this = this;
            if (!this.masters)
                return;
            this.masters.forEach(function (master) { return master.dislead(_this); });
            this.masters = null;
        };
        $mol_atom.prototype.value = function (next, force) {
            if (next === void null) {
                return this.get(force);
            }
            else {
                if (force) {
                    return this.push(next);
                }
                else {
                    return this.set(next);
                }
            }
        };
        $mol_atom.actualize = function (atom) {
            $mol_atom.updating.push(atom);
            $mol_atom.schedule();
        };
        $mol_atom.reap = function (atom) {
            $mol_atom.reaping.add(atom);
            $mol_atom.schedule();
        };
        $mol_atom.unreap = function (atom) {
            $mol_atom.reaping.delete(atom);
        };
        $mol_atom.schedule = function () {
            var _this = this;
            if (this.scheduled)
                return;
            new $.$mol_defer(function () {
                if (!_this.scheduled)
                    return;
                _this.scheduled = false;
                _this.sync();
            });
            this.scheduled = true;
        };
        $mol_atom.sync = function () {
            var _this = this;
            $.$mol_log('$mol_atom.sync', []);
            this.schedule();
            while (this.updating.length) {
                var atom = this.updating.shift();
                if (this.reaping.has(atom))
                    continue;
                if (!atom.destroyed())
                    atom.get();
            }
            while (this.reaping.size) {
                this.reaping.forEach(function (atom) {
                    _this.reaping.delete(atom);
                    if (!atom.slaves)
                        atom.destroyed(true);
                });
            }
            this.scheduled = false;
        };
        return $mol_atom;
    }($.$mol_object));
    $mol_atom.stack = [null];
    $mol_atom.updating = [];
    $mol_atom.reaping = new $.$mol_set();
    $mol_atom.scheduled = false;
    $.$mol_atom = $mol_atom;
    $.$mol_state_stack.set('$mol_atom.stack', $mol_atom.stack);
    var $mol_atom_wait = (function (_super) {
        __extends($mol_atom_wait, _super);
        function $mol_atom_wait(message) {
            if (message === void 0) { message = 'Wait...'; }
            var _this = _super.call(this, message) || this;
            _this.message = message;
            _this.name = '$mol_atom_wait';
            var error = new Error(message);
            error.name = _this.name;
            error['__proto__'] = $mol_atom_wait.prototype;
            return error;
        }
        return $mol_atom_wait;
    }(Error));
    $.$mol_atom_wait = $mol_atom_wait;
    var $mol_atom_force = (function (_super) {
        __extends($mol_atom_force, _super);
        function $mol_atom_force() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_atom_force;
    }(Object));
    $.$mol_atom_force = $mol_atom_force;
    function $mol_atom_task(host, handler) {
        var atom = new $mol_atom(host, function () {
            try {
                handler();
            }
            catch (error) {
                if (!(error instanceof $mol_atom_wait))
                    atom.destroyed(true);
                throw error;
            }
            atom.destroyed(true);
        });
        $mol_atom.actualize(atom);
        return atom;
    }
    $.$mol_atom_task = $mol_atom_task;
})($ || ($ = {}));
//atom.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'cached property with simple key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (id, next) {
                    if (next == null)
                        return new Number(123);
                    return new Number(next);
                };
                return X;
            }($.$mol_object));
            __decorate([
                $.$mol_mem_key()
            ], X.prototype, "foo", null);
            var x = new X;
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
            $.$mol_assert_equal(x.foo(0), x.foo(0));
            $.$mol_assert_unique(x.foo(0), x.foo(1));
            x.foo(0, 321);
            $.$mol_assert_equal(x.foo(0).valueOf(), 321);
            x.foo(0, null);
            $.$mol_assert_equal(x.foo(0).valueOf(), 123);
        },
        'cached property with complex key': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (ids) {
                    return Math.random();
                };
                return X;
            }($.$mol_object));
            __decorate([
                $.$mol_mem_key()
            ], X.prototype, "foo", null);
            var x = new X;
            $.$mol_assert_equal(x.foo([0, 1]), x.foo([0, 1]));
            $.$mol_assert_unique(x.foo([0, 1]), x.foo([0, 2]));
        },
        'auto sync of properties': function () {
            var X = (function (_super) {
                __extends(X, _super);
                function X() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                X.prototype.foo = function (next) {
                    return next || 1;
                };
                X.prototype.bar = function () {
                    return this.foo() + 1;
                };
                X.prototype.xxx = function () {
                    return this.bar() + 1;
                };
                return X;
            }($.$mol_object));
            __decorate([
                $.$mol_mem()
            ], X.prototype, "foo", null);
            __decorate([
                $.$mol_mem()
            ], X.prototype, "bar", null);
            __decorate([
                $.$mol_mem()
            ], X.prototype, "xxx", null);
            var x = new X;
            $.$mol_assert_equal(x.bar(), 2);
            $.$mol_assert_equal(x.xxx(), 3);
            x.foo(5);
            $.$mol_assert_equal(x.xxx(), 7);
        },
        'must be deferred destroyed when no longer referenced': function () {
            var foo;
            var B = (function (_super) {
                __extends(B, _super);
                function B() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                B.prototype.showing = function (next) {
                    if (next === void 0)
                        return true;
                    return next;
                };
                B.prototype.foo = function () {
                    return foo = new $.$mol_object;
                };
                B.prototype.bar = function () {
                    return this.showing() ? this.foo() : null;
                };
                return B;
            }($.$mol_object));
            __decorate([
                $.$mol_mem()
            ], B.prototype, "showing", null);
            __decorate([
                $.$mol_mem()
            ], B.prototype, "foo", null);
            __decorate([
                $.$mol_mem()
            ], B.prototype, "bar", null);
            var b = new B;
            var bar = b.bar();
            $.$mol_assert_ok(bar);
            b.showing(false);
            b.bar();
            $.$mol_defer.run();
            $.$mol_assert_ok(foo.destroyed());
            $.$mol_assert_ok(bar.destroyed());
            $.$mol_assert_not(b.bar());
            b.showing(true);
            $.$mol_defer.run();
            $.$mol_assert_unique(b.bar(), bar);
        },
        'wait for data': function () {
            var Test = (function (_super) {
                __extends(Test, _super);
                function Test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                Test.prototype.source = function (next, force) {
                    var _this = this;
                    new $.$mol_defer(function () {
                        _this.source('Jin', $.$mol_atom_force);
                    });
                    throw new $.$mol_atom_wait('Wait for data!');
                };
                Test.prototype.middle = function () {
                    return this.source();
                };
                Test.prototype.target = function () {
                    return this.middle();
                };
                return Test;
            }($.$mol_object));
            __decorate([
                $.$mol_mem()
            ], Test.prototype, "source", null);
            __decorate([
                $.$mol_mem()
            ], Test.prototype, "middle", null);
            __decorate([
                $.$mol_mem()
            ], Test.prototype, "target", null);
            var t = new Test;
            $.$mol_assert_fail(function () { return t.target().valueOf(); }, $.$mol_atom_wait);
            $.$mol_defer.run();
            $.$mol_assert_equal(t.target(), 'Jin');
        },
    });
})($ || ($ = {}));
//mem.test.js.map
;
var $;
(function ($) {
    function $mol_mem(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (next, force) {
                var host = this;
                var field = name + "()";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem = $mol_mem;
    function $mol_mem_key(config) {
        return function (obj, name, descr) {
            var value = descr.value;
            descr.value = function (key, next, force) {
                var host = this;
                var field = name + "(" + JSON.stringify(key) + ")";
                var fieldA = field + '@';
                var atom = host[fieldA];
                if (!atom) {
                    if (force && (next === void null))
                        return next;
                    host[fieldA] = atom = new $.$mol_atom(host, value.bind(host, key), field);
                    if (config)
                        atom.autoFresh = !config.lazy;
                }
                return atom.value(next, force);
            };
            void (descr.value['value'] = value);
        };
    }
    $.$mol_mem_key = $mol_mem_key;
})($ || ($ = {}));
//mem.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_window = (function (_super) {
        __extends($mol_window, _super);
        function $mol_window() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_window.size = function (next) {
            return next || {
                width: 1024,
                height: 768,
            };
        };
        return $mol_window;
    }($.$mol_object));
    $.$mol_window = $mol_window;
})($ || ($ = {}));
//window.node.js.map
;
var $node = new Proxy({}, { get: function (target, field, wrapper) {
        return require(field);
    } });
//node.node.js.map
;
var $;
(function ($) {
    $.$mol_dom_context = $node.jsdom.jsdom().defaultView;
})($ || ($ = {}));
//context.node.js.map
;
var $;
(function ($) {
})($ || ($ = {}));
//context.js.map
;
var $;
(function ($) {
    function $mol_dom_render(el, config) {
        var document = el.ownerDocument;
        var _loop_1 = function (key) {
            switch (key) {
                case 'localName': break;
                case 'namespaceURI': break;
                case 'childNodes': {
                    if (!config.childNodes)
                        break;
                    $mol_dom_render_childNodes(el, config.childNodes);
                    break;
                }
                case 'attributes': {
                    if (!config.attributes)
                        break;
                    $mol_dom_render_attributes(el, config.attributes);
                    break;
                }
                case 'style': {
                    if (!config.style)
                        break;
                    $mol_dom_render_style(el, config.style);
                    break;
                }
                case 'events': {
                    $mol_dom_render_event(el, config.events);
                    break;
                }
                case 'events_async': {
                    $mol_dom_render_event_async(el, config.events_async);
                    break;
                }
                default: {
                    if (config[key] === void null)
                        return "continue";
                    if (el[key] !== config[key]) {
                        el[key] = config[key];
                        if (el[key] !== config[key]) {
                            var setter_1 = function () {
                                el.removeEventListener('DOMNodeInsertedIntoDocument', setter_1, { passive: true });
                                new $.$mol_defer(function () {
                                    el[key] = config[key];
                                });
                            };
                            el.addEventListener('DOMNodeInsertedIntoDocument', setter_1, { passive: true });
                        }
                    }
                }
            }
        };
        for (var key in config) {
            _loop_1(key);
        }
        return el;
    }
    $.$mol_dom_render = $mol_dom_render;
    function $mol_dom_render_childNodes(el, childNodes) {
        var nodes = [];
        for (var i = 0; i < childNodes.length; ++i) {
            var node = childNodes[i];
            if (node == null)
                continue;
            if (Object(node) === node) {
                if (node['render'])
                    node = node['render']();
                nodes.push(node);
            }
            else {
                nodes.push(String(node));
            }
        }
        var nextNode = el.firstChild;
        for (var _i = 0, nodes_1 = nodes; _i < nodes_1.length; _i++) {
            var view_ = nodes_1[_i];
            var view = view_.valueOf();
            if (view instanceof $.$mol_dom_context.Node) {
                while (true) {
                    if (!nextNode) {
                        el.appendChild(view);
                        break;
                    }
                    if (nextNode == view) {
                        nextNode = nextNode.nextSibling;
                        break;
                    }
                    else {
                        if (nodes.indexOf(nextNode) === -1) {
                            var nn = nextNode.nextSibling;
                            el.removeChild(nextNode);
                            nextNode = nn;
                        }
                        else {
                            el.insertBefore(view, nextNode);
                            break;
                        }
                    }
                }
            }
            else {
                if (nextNode && nextNode.nodeName === '#text') {
                    nextNode.nodeValue = String(view);
                    nextNode = nextNode.nextSibling;
                }
                else {
                    var textNode = $.$mol_dom_context.document.createTextNode(String(view));
                    el.insertBefore(textNode, nextNode);
                }
            }
        }
        while (nextNode) {
            var currNode = nextNode;
            nextNode = currNode.nextSibling;
            el.removeChild(currNode);
        }
    }
    $.$mol_dom_render_childNodes = $mol_dom_render_childNodes;
    function $mol_dom_render_attributes(el, attrs) {
        for (var name_1 in attrs) {
            var val = attrs[name_1];
            if (el.getAttribute(name_1) === val)
                continue;
            if (val === null || val === false)
                el.removeAttribute(name_1);
            else
                el.setAttribute(name_1, String(val));
        }
    }
    $.$mol_dom_render_attributes = $mol_dom_render_attributes;
    function $mol_dom_render_style(el, styles) {
        for (var name_2 in styles) {
            var val = styles[name_2];
            if (typeof val === 'number')
                val = val + "px";
            var style = el.style;
            if (val !== style[name_2])
                style[name_2] = val;
        }
    }
    $.$mol_dom_render_style = $mol_dom_render_style;
    function $mol_dom_render_event(el, events) {
        for (var name_3 in events) {
            el.addEventListener(name_3, events[name_3]);
        }
    }
    $.$mol_dom_render_event = $mol_dom_render_event;
    function $mol_dom_render_event_async(el, events) {
        for (var name_4 in events) {
            el.addEventListener(name_4, events[name_4], { passive: true });
        }
    }
    $.$mol_dom_render_event_async = $mol_dom_render_event_async;
})($ || ($ = {}));
//render.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'Make empty div': function () {
            var dom = $.$mol_dom_make({
                id: '$mol_dom_make_test',
            });
            $.$mol_assert_equal(dom.outerHTML, '<span id="$mol_dom_make_test"></span>');
        },
        'Make SVG': function () {
            var dom = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                localName: 'svg',
                namespaceURI: 'http://www.w3.org/2000/svg',
            });
            $.$mol_assert_equal(dom.outerHTML, '<svg id="$mol_dom_make_test"></svg>');
        },
        'Make input with id and value': function () {
            var dom = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                localName: 'input',
                value: 123,
            });
            $.$mol_assert_equal(dom.outerHTML, '<input id="$mol_dom_make_test">');
            $.$mol_assert_equal(dom.value, '123');
        },
        'Make content': function () {
            var id = '$mol_dom_make_test';
            var dom = $.$mol_dom_make({
                id: "" + id,
                childNodes: [
                    'hello',
                    $.$mol_dom_make({
                        id: id + "_inner",
                    }),
                    '!',
                ]
            });
            $.$mol_assert_equal(dom.outerHTML, '<span id="$mol_dom_make_test">' +
                'hello' +
                '<span id="$mol_dom_make_test_inner"></span>' +
                '!' +
                '</span>');
        },
        'Make to exists element': function () {
            var dom1 = $.$mol_dom_make({
                id: '$mol_dom_make_test',
            });
            $.$mol_dom_context.document.body.appendChild(dom1);
            var dom2 = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                className: 'mol_dom_make_test'
            });
            $.$mol_dom_context.document.body.removeChild(dom1);
            $.$mol_assert_equal(dom1, dom2);
            $.$mol_assert_equal(dom1.outerHTML, '<span id="$mol_dom_make_test" class="mol_dom_make_test"></span>');
        },
        'Make by another dom element': function () {
            var dom1 = $.$mol_dom_make({
                id: '$mol_dom_make_test',
                className: 'hello',
                childNodes: [
                    'world'
                ],
            });
            var dom2 = $.$mol_dom_make({
                id: dom1.id,
                className: dom1.className,
                childNodes: dom1.childNodes,
            });
            $.$mol_assert_equal(dom2.outerHTML, '<span id="$mol_dom_make_test" class="hello">world</span>');
        },
    });
})($ || ($ = {}));
//make.test.js.map
;
var $;
(function ($) {
    function $mol_dom_make(config) {
        var document = $.$mol_dom_context.document;
        var el = config.id && document.getElementById(config.id);
        if (!el) {
            var name_1 = config.localName || 'span';
            var space = config.namespaceURI || 'http://www.w3.org/1999/xhtml';
            el = document.createElementNS(space, name_1);
        }
        return $.$mol_dom_render(el, config);
    }
    $.$mol_dom_make = $mol_dom_make;
})($ || ($ = {}));
//make.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_view_dom = (function (_super) {
        __extends($mol_view_dom, _super);
        function $mol_view_dom() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_dom.node = function (view) {
            var node = $mol_view_dom.nodes.get(view);
            if (!node) {
                node = $.$mol_dom_make({
                    localName: view.dom_name(),
                    namespaceURI: view.dom_name_space(),
                });
                $mol_view_dom.mount(view, node);
            }
            return node;
        };
        $mol_view_dom.mount = function (view, node) {
            if ($mol_view_dom.nodes.get(view) === node)
                return node;
            $mol_view_dom.nodes.set(view, node);
            $.$mol_dom_render(node, {
                id: view.toString(),
                attributes: view.attr_static(),
                events: view.event(),
                events_async: view.event_async(),
            });
            return node;
        };
        return $mol_view_dom;
    }($.$mol_object));
    $mol_view_dom.nodes = new (WeakMap || $.$mol_dict)();
    $.$mol_view_dom = $mol_view_dom;
})($ || ($ = {}));
//dom.js.map
;
var $;
(function ($) {
    function $mol_deprecated(message) {
        return function (host, field, descr) {
            var value = descr.value;
            descr.value = function $mol_deprecated_wrapper() {
                console.warn(host.constructor + "::" + field + " is deprecated. " + message);
                return value.apply(host, arguments);
            };
        };
    }
    $.$mol_deprecated = $mol_deprecated;
})($ || ($ = {}));
//deprecated.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_test({
        'id auto generation': function () {
            var $mol_view_test_item = (function (_super) {
                __extends($mol_view_test_item, _super);
                function $mol_view_test_item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test_item;
            }($.$mol_view));
            var $mol_view_test_block = (function (_super) {
                __extends($mol_view_test_block, _super);
                function $mol_view_test_block() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test_block.prototype.element = function (id) {
                    return new $mol_view_test_item();
                };
                return $mol_view_test_block;
            }($.$mol_view));
            __decorate([
                $.$mol_mem_key()
            ], $mol_view_test_block.prototype, "element", null);
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.render().id, '');
            $.$mol_assert_equal(x.element(0).render().id, '.element(0)');
        },
        'caching ref to dom node': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            $.$mol_assert_equal(x.render(), x.render());
        },
        'content render': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.sub = function () {
                    return ['lol', 5];
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            $.$mol_assert_equal(node.innerHTML, 'lol5');
        },
        'bem attributes generation': function () {
            var $mol_view_test_item = (function (_super) {
                __extends($mol_view_test_item, _super);
                function $mol_view_test_item() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return $mol_view_test_item;
            }($.$mol_view));
            var $mol_view_test_block = (function (_super) {
                __extends($mol_view_test_block, _super);
                function $mol_view_test_block() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test_block.prototype.Element = function (id) {
                    return new $mol_view_test_item();
                };
                return $mol_view_test_block;
            }($.$mol_view));
            __decorate([
                $.$mol_mem_key()
            ], $mol_view_test_block.prototype, "Element", null);
            var x = new $mol_view_test_block();
            $.$mol_assert_equal(x.render().getAttribute('mol_view_test_block'), '');
            $.$mol_assert_equal(x.render().getAttribute('mol_view'), '');
            $.$mol_assert_equal(x.Element(0).render().getAttribute('mol_view_test_block_element'), '');
            $.$mol_assert_equal(x.Element(0).render().getAttribute('mol_view_test_item'), '');
            $.$mol_assert_equal(x.Element(0).render().getAttribute('mol_view'), '');
        },
        'render custom attributes': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.attr = function () {
                    return {
                        'href': '#haha',
                        'required': true,
                        'hidden': false,
                    };
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            $.$mol_assert_equal(node.getAttribute('href'), '#haha');
            $.$mol_assert_equal(node.getAttribute('required'), 'true');
            $.$mol_assert_equal(node.getAttribute('hidden'), null);
        },
        'render custom fields': function () {
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.field = function () {
                    return {
                        'hidden': true
                    };
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            $.$mol_assert_equal(node.hidden, true);
        },
        'attach event handlers': function () {
            var clicked = false;
            var $mol_view_test = (function (_super) {
                __extends($mol_view_test, _super);
                function $mol_view_test() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                $mol_view_test.prototype.event = function () {
                    var _this = this;
                    return {
                        'click': function (next) { return _this.event_click(next); }
                    };
                };
                $mol_view_test.prototype.event_click = function (next) {
                    clicked = true;
                };
                return $mol_view_test;
            }($.$mol_view));
            var x = new $mol_view_test();
            var node = x.render();
            node.click();
            $.$mol_assert_ok(clicked);
        },
    });
})($ || ($ = {}));
//view.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context = {};
    $.$mol_view_context.$mol_view_visible_width = function () { return $.$mol_window.size().width; };
    $.$mol_view_context.$mol_view_visible_height = function () { return $.$mol_window.size().height; };
    $.$mol_view_context.$mol_view_state_key = function (suffix) { return suffix; };
    var $mol_view = (function (_super) {
        __extends($mol_view, _super);
        function $mol_view() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this['event_wrapped()'] = null;
            return _this;
        }
        $mol_view.Root = function (id) {
            return new this;
        };
        $mol_view.prototype.title = function () {
            return this.Class().toString();
        };
        $mol_view.prototype.focused = function (next) {
            var node = $.$mol_view_dom.node(this);
            var value = $.$mol_view_selection.focused(next === void 0 ? void 0 : [node]);
            return value.indexOf(node) !== -1;
        };
        $mol_view.prototype.context = function (next) {
            return next || $.$mol_view_context;
        };
        $mol_view.prototype.context_sub = function () {
            return this.context();
        };
        $mol_view.prototype.state_key = function (suffix) {
            if (suffix === void 0) { suffix = ''; }
            return this.context().$mol_view_state_key(suffix);
        };
        $mol_view.prototype.dom_name = function () {
            return this.constructor.toString().replace('$', '');
        };
        $mol_view.prototype.dom_name_space = function () { return 'http://www.w3.org/1999/xhtml'; };
        $mol_view.prototype.sub = function () {
            return null;
        };
        $mol_view.prototype.sub_visible = function () {
            var sub = this.sub();
            if (!sub)
                return sub;
            var context = this.context_sub();
            sub.forEach(function (child) {
                if (child instanceof $mol_view) {
                    child.context(context);
                }
            });
            return sub;
        };
        $mol_view.prototype.minimal_width = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_width());
                }
            });
            return min;
        };
        $mol_view.prototype.minimal_height = function () {
            var sub = this.sub();
            if (!sub)
                return 0;
            var min = 0;
            sub.forEach(function (view) {
                if (view instanceof $mol_view) {
                    min = Math.max(min, view.minimal_height());
                }
            });
            return min;
        };
        $mol_view.prototype.view_classes = function () {
            var proto = Object.getPrototypeOf(this);
            if (this['view_classes()'])
                return this['view_classes()'];
            var current = proto;
            var classes = [];
            while (current) {
                classes.push(current.constructor);
                if (!(current instanceof $mol_view))
                    break;
                current = Object.getPrototypeOf(current);
            }
            return this['view_classes()'] = classes;
        };
        $mol_view.prototype.dom_node = function () {
            return $.$mol_view_dom.node(this);
        };
        $mol_view.prototype.dom_tree = function () {
            return this.render();
        };
        $mol_view.prototype.render = function () {
            var node = this.dom_node();
            try {
                for (var _i = 0, _a = this.plugins(); _i < _a.length; _i++) {
                    var plugin = _a[_i];
                    if (typeof plugin['render'] === 'function')
                        plugin.render();
                }
                $.$mol_dom_render(node, __assign({ attributes: this.attr(), childNodes: this.sub_visible(), style: this.style() }, (this.field() || {})));
            }
            catch (error) {
                $.$mol_dom_render(node, {
                    attributes: { mol_view_error: error.name },
                });
                if (error instanceof $.$mol_atom_wait)
                    return node;
                if (error['$mol_atom_catched'])
                    return node;
                console.error(error);
                error['$mol_atom_catched'] = true;
            }
            return node;
        };
        $mol_view.prototype.attr_static = function () {
            var attrs = { 'mol_view_error': false };
            var owner = this.object_owner();
            if (owner instanceof $mol_view) {
                var suffix_1 = this.object_field().replace(/\(.*/, '');
                var suffix2_1 = '_' + suffix_1[0].toLowerCase() + suffix_1.substring(1);
                owner.view_classes().forEach(function (Class) {
                    if (suffix_1 in Class.prototype) {
                        var attrName = Class.toString().replace(/\$/g, '') + suffix2_1;
                        attrs[attrName] = '';
                    }
                });
            }
            this.view_classes().forEach(function (Class) {
                attrs[Class.toString().replace(/\$/g, '').toLowerCase()] = '';
            });
            return attrs;
        };
        $mol_view.prototype.attr = function () {
            return {
                'mol_view_error': false,
            };
        };
        $mol_view.prototype.style = function () {
            return {};
        };
        $mol_view.prototype.field = function () {
            return {};
        };
        $mol_view.prototype.event = function () {
            return {};
        };
        $mol_view.prototype.event_async = function () {
            return {};
        };
        $mol_view.prototype.event_wrapped = function () {
            var _this = this;
            if (this['event_wrapped()'])
                return this['event_wrapped()'];
            var event = this.event();
            var wrapped = {};
            var _loop_1 = function (name_1) {
                var handle = event[name_1];
                wrapped[name_1] = function (event) {
                    $.$mol_atom_task(_this + ".event()['" + name_1 + "']", function () { return handle(event); }).get();
                };
            };
            for (var name_1 in event) {
                _loop_1(name_1);
            }
            return this['event_wrapped()'] = wrapped;
        };
        $mol_view.prototype.locale_contexts = function () {
            return this['locale_contexts()'] || (this['locale_contexts()'] = this.view_classes().map(String));
        };
        $mol_view.prototype.plugins = function () {
            return [];
        };
        return $mol_view;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "context", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "minimal_height", null);
    __decorate([
        $.$mol_deprecated('Use $mol_view::render instead.')
    ], $mol_view.prototype, "dom_tree", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view.prototype, "render", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_view, "Root", null);
    $.$mol_view = $mol_view;
})($ || ($ = {}));
//view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_view_selection = (function (_super) {
        __extends($mol_view_selection, _super);
        function $mol_view_selection() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_view_selection.focused = function (next, force) {
            if (next === void 0)
                return [];
            if (next.length !== 1)
                throw new Error('Length must be equals 1');
            var node = next[0];
            node.focus();
        };
        $mol_view_selection.position = function () {
            var diff = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                diff[_i] = arguments[_i];
            }
            if (diff.length) {
                if (!diff[0])
                    return diff[0];
                var start = diff[0].start;
                var end = diff[0].end;
                if (!(start <= end))
                    throw new Error("Wrong offsets (" + start + "," + end + ")");
                var root = $.$mol_dom_context.document.getElementById(diff[0].id);
                root.focus();
                var range = new Range;
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= start)
                            break;
                        start -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            start = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setStart(cur, start);
                var cur = root.firstChild;
                while (cur !== root) {
                    while (cur.firstChild)
                        cur = cur.firstChild;
                    if (cur.nodeValue) {
                        var length = cur.nodeValue.length;
                        if (length >= end)
                            break;
                        end -= length;
                    }
                    while (!cur.nextSibling) {
                        cur = cur.parentNode;
                        if (cur === root) {
                            end = root.childNodes.length;
                            break;
                        }
                    }
                }
                range.setEnd(cur, end);
                var sel = $.$mol_dom_context.document.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                return diff[0];
            }
            else {
                var sel = $.$mol_dom_context.document.getSelection();
                if (sel.rangeCount === 0)
                    return null;
                var range = sel.getRangeAt(0);
                var el = range.commonAncestorContainer;
                while (el && !el.id)
                    el = el.parentElement;
                if (!el)
                    return { id: null, start: 0, end: 0 };
                var meter = new Range;
                meter.selectNodeContents(el);
                meter.setEnd(range.startContainer, range.startOffset);
                var startOffset = meter.toString().length;
                meter.setEnd(range.endContainer, range.endOffset);
                var endOffset = meter.toString().length;
                return { id: el.id, start: startOffset, end: endOffset };
            }
        };
        $mol_view_selection.onFocus = function (event) {
            var parents = [];
            var element = event.target;
            while (element) {
                parents.push(element);
                element = element.parentElement;
            }
            $mol_view_selection.focused(parents, $.$mol_atom_force);
        };
        $mol_view_selection.onBlur = function (event) {
            $mol_view_selection.focused([], $.$mol_atom_force);
        };
        return $mol_view_selection;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_view_selection, "position", null);
    $.$mol_view_selection = $mol_view_selection;
})($ || ($ = {}));
//selection.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_arg = (function (_super) {
        __extends($mol_state_arg, _super);
        function $mol_state_arg(prefix) {
            if (prefix === void 0) { prefix = ''; }
            var _this = _super.call(this) || this;
            _this.prefix = prefix;
            return _this;
        }
        $mol_state_arg.href = function (next) {
            return next || process.argv.slice(2).join(' ');
        };
        $mol_state_arg.dict = function (next) {
            if (next !== void 0)
                this.href(this.make(next));
            var href = this.href();
            var chunks = href.split(/[\/\?#&; ]/g);
            var params = {};
            chunks.forEach(function (chunk) {
                if (!chunk)
                    return;
                var vals = chunk.split(/[:=]/).map(decodeURIComponent);
                params[vals.shift()] = vals;
            });
            return params;
        };
        $mol_state_arg.value = function (key, next) {
            if (next === void 0)
                return this.dict()[key] || null;
            this.href(this.link((_a = {}, _a[key] = next, _a)));
            return next;
            var _a;
        };
        $mol_state_arg.link = function (next) {
            var params = {};
            var prev = this.dict();
            for (var key in prev) {
                params[key] = prev[key];
            }
            for (var key in next) {
                params[key] = next[key];
            }
            return this.make(params);
        };
        $mol_state_arg.make = function (next) {
            var chunks = [];
            for (var key in next) {
                if (null == next[key])
                    continue;
                chunks.push([key].concat(next[key]).map(encodeURIComponent).join('='));
            }
            return '#' + chunks.join('#');
        };
        $mol_state_arg.prototype.value = function (key, next) {
            return $mol_state_arg.value(this.prefix + key, next);
        };
        $mol_state_arg.prototype.sub = function (postfix) {
            return new $mol_state_arg(this.prefix + postfix + '.');
        };
        $mol_state_arg.prototype.link = function (next) {
            var prefix = this.prefix;
            var dict = {};
            for (var key in next) {
                dict[prefix + key] = next[key];
            }
            return $mol_state_arg.link(dict);
        };
        return $mol_state_arg;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "href", null);
    __decorate([
        $.$mol_mem()
    ], $mol_state_arg, "dict", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_arg, "value", null);
    $.$mol_state_arg = $mol_state_arg;
})($ || ($ = {}));
//arg.node.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_link = (function (_super) {
        __extends($mol_link, _super);
        function $mol_link() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_link.prototype.minimal_height = function () {
            return 36;
        };
        $mol_link.prototype.dom_name = function () {
            return "a";
        };
        $mol_link.prototype.uri = function () {
            return "";
        };
        $mol_link.prototype.hint = function () {
            return "";
        };
        $mol_link.prototype.target = function () {
            return "_self";
        };
        $mol_link.prototype.current = function () {
            return false;
        };
        $mol_link.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "href": this.uri(), "title": this.hint(), "target": this.target(), "mol_link_current": this.current() }));
        };
        $mol_link.prototype.sub = function () {
            return [].concat(this.title());
        };
        $mol_link.prototype.arg = function () {
            return ({});
        };
        return $mol_link;
    }($.$mol_view));
    $.$mol_link = $mol_link;
})($ || ($ = {}));
//link.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_link = (function (_super) {
            __extends($mol_link, _super);
            function $mol_link() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_link.prototype.uri = function () {
                return new $.$mol_state_arg(this.state_key()).link(this.arg());
            };
            $mol_link.prototype.current = function () {
                return this.uri() === $.$mol_state_arg.link({});
            };
            return $mol_link;
        }($.$mol_link));
        __decorate([
            $.$mol_mem()
        ], $mol_link.prototype, "uri", null);
        $mol.$mol_link = $mol_link;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//link.view.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'local get set delete': function () {
            var key = '$mol_state_local_test:' + Math.random();
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
            $.$mol_state_local.value(key, 123);
            $.$mol_assert_equal($.$mol_state_local.value(key), 123);
            $.$mol_state_local.value(key, null);
            $.$mol_assert_equal($.$mol_state_local.value(key), null);
        },
    });
})($ || ($ = {}));
//local.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var localStorage = localStorage || {
    getItem: function (key) {
        return this[':' + key];
    },
    setItem: function (key, value) {
        this[':' + key] = value;
    },
    removeItem: function (key) {
        this[':' + key] = void 0;
    }
};
var $;
(function ($) {
    var $mol_state_local = (function (_super) {
        __extends($mol_state_local, _super);
        function $mol_state_local() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_local.value = function (key, next, force) {
            if (next === void 0)
                return JSON.parse(localStorage.getItem(key) || 'null');
            if (next === null)
                localStorage.removeItem(key);
            else
                localStorage.setItem(key, JSON.stringify(next));
            return next;
        };
        $mol_state_local.prototype.prefix = function () { return ''; };
        $mol_state_local.prototype.value = function (key, next) {
            return $mol_state_local.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_local;
    }($.$mol_object));
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_local, "value", null);
    $.$mol_state_local = $mol_state_local;
})($ || ($ = {}));
//local.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_file = (function (_super) {
        __extends($mol_file, _super);
        function $mol_file() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_file.absolute = function (path) {
            return new $mol_file().setup(function (obj) {
                obj.path = function () { return path; };
            });
        };
        $mol_file.relative = function (path) {
            return $mol_file.absolute($node.path.resolve(path).replace(/\\/g, '/'));
        };
        $mol_file.prototype.path = function () {
            return '.';
        };
        $mol_file.prototype.watcher = function () {
            var _this = this;
            var watcher = $node.fs.watch(this.path(), { persistent: false }, function (type, name) {
                if (!name)
                    _this.stat(void null, $.$mol_atom_force);
                else if (!/(^\.|___$)/.test(name)) {
                    var file = _this.resolve(name);
                    file.stat(void null, $.$mol_atom_force);
                }
            });
            watcher.on('error', function (error) {
                _this.stat(error, $.$mol_atom_force);
            });
            return watcher;
        };
        $mol_file.prototype.stat = function (next, force) {
            var path = this.path();
            try {
                var stat = next || $node.fs.statSync(path);
            }
            catch (error) {
                if (error.code === 'ENOENT')
                    return null;
                return error;
            }
            this.parent().watcher();
            return stat;
        };
        $mol_file.prototype.version = function () {
            return this.stat().mtime.getTime().toString(36).toUpperCase();
        };
        $mol_file.prototype.exists = function (next) {
            var exists = !!this.stat();
            if (next === void 0) {
                return exists;
            }
            else {
                if (next == exists)
                    return exists;
                if (next) {
                    this.parent().exists(true);
                    $node.fs.mkdirSync(this.path());
                }
                else {
                    $node.fs.unlinkSync(this.path());
                }
                this.stat(void null, $.$mol_atom_force);
                return next;
            }
        };
        $mol_file.prototype.parent = function () {
            return this.resolve('..');
        };
        $mol_file.prototype.type = function () {
            var stat = this.stat();
            if (stat) {
                if (stat.isFile())
                    return 'file';
                if (stat.isDirectory())
                    return 'dir';
                if (stat.isBlockDevice())
                    return 'blocks';
                if (stat.isCharacterDevice())
                    return 'chars';
                if (stat.isSymbolicLink())
                    return 'link';
                if (stat.isFIFO())
                    return 'fifo';
                if (stat.isSocket())
                    return 'socket';
            }
            else {
                return null;
            }
            throw new Error("Unknown file type " + this.path());
        };
        $mol_file.prototype.name = function () {
            return $node.path.basename(this.path());
        };
        $mol_file.prototype.ext = function () {
            var match = /((?:\.\w+)+)$/.exec(this.path());
            return match && match[1].substring(1);
        };
        $mol_file.prototype.content = function (next, force) {
            if (next === void 0) {
                return this.stat() && $node.fs.readFileSync(this.path());
            }
            this.parent().exists(true);
            $node.fs.writeFileSync(this.path(), next);
            return next;
        };
        $mol_file.prototype.reader = function () {
            return $node.fs.createReadStream(this.path());
        };
        $mol_file.prototype.writer = function () {
            return $node.fs.createWriteStream(this.path());
        };
        $mol_file.prototype.sub = function () {
            var _this = this;
            this.stat();
            switch (this.type()) {
                case 'dir':
                    return $node.fs.readdirSync(this.path())
                        .filter(function (name) { return !/^\.+$/.test(name); })
                        .map(function (name) { return _this.resolve(name); });
            }
            return [];
        };
        $mol_file.prototype.resolve = function (path) {
            return this.Class().relative($node.path.join(this.path(), path));
        };
        $mol_file.prototype.relate = function (base) {
            if (base === void 0) { base = this.Class().relative('.'); }
            return $node.path.relative(base.path(), this.path()).replace(/\\/g, '/');
        };
        $mol_file.prototype.append = function (next) {
            $node.fs.appendFileSync(this.path(), next);
        };
        $mol_file.prototype.find = function (include, exclude) {
            var found = [];
            this.sub().forEach(function (child) {
                if (exclude && child.path().match(exclude))
                    return;
                if (!include || child.path().match(include))
                    found.push(child);
                if (child.type() === 'dir')
                    found = found.concat(child.find(include, exclude));
            });
            return found;
        };
        return $mol_file;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "watcher", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "stat", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "version", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_file.prototype, "sub", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_file, "absolute", null);
    $.$mol_file = $mol_file;
})($ || ($ = {}));
//file.node.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_locale = (function (_super) {
        __extends($mol_locale, _super);
        function $mol_locale() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_locale.lang_default = function () {
            return 'en';
        };
        $mol_locale.lang = function (next) {
            return $.$mol_state_local.value('locale', next) || $.$mol_dom_context.navigator.language.replace(/-.*/, '') || this.lang_default();
        };
        $mol_locale.source = function (lang) {
            return JSON.parse($.$mol_file.relative("-/web.locale=" + lang + ".json").content());
        };
        $mol_locale.texts = function (next) {
            if (next)
                return next;
            var lang = this.lang();
            try {
                return this.source(lang).valueOf();
            }
            catch (error) {
                var def = this.lang_default();
                if (lang === def)
                    throw error;
                return this.source(def);
            }
        };
        $mol_locale.text = function (contexts, key) {
            var texts = this.texts();
            for (var i = 0; i < contexts.length; ++i) {
                var text = texts[contexts[i] + "_" + key];
                if (text)
                    return text;
            }
            console.warn('Locale tet not found: ', contexts, key);
            return "<" + key + ">";
        };
        return $mol_locale;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang_default", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "lang", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_locale, "source", null);
    __decorate([
        $.$mol_mem()
    ], $mol_locale, "texts", null);
    $.$mol_locale = $mol_locale;
})($ || ($ = {}));
//locale.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_labeler = (function (_super) {
        __extends($mol_labeler, _super);
        function $mol_labeler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_labeler.prototype.dom_name = function () {
            return "label";
        };
        $mol_labeler.prototype.label = function () {
            return [].concat(this.title());
        };
        $mol_labeler.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.label(); };
            });
        };
        $mol_labeler.prototype.content = function () {
            return null;
        };
        $mol_labeler.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.content()); };
            });
        };
        $mol_labeler.prototype.sub = function () {
            return [].concat(this.Title(), this.Content());
        };
        return $mol_labeler;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_labeler.prototype, "Content", null);
    $.$mol_labeler = $mol_labeler;
})($ || ($ = {}));
//labeler.view.tree.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'convertion to primitives': function () {
            var unit = new $.$mol_unit_money_usd(5);
            $.$mol_assert_equal(unit.valueOf(), 5);
            $.$mol_assert_equal(unit * 2, 10);
            $.$mol_assert_equal(unit + '', '5');
            $.$mol_assert_equal("" + unit, '5');
            $.$mol_assert_equal(unit.toString(), '$5');
            $.$mol_assert_equal(String(unit), '$5');
        },
        'arithmetic': function () {
            var usd1 = new $.$mol_unit_money_usd(5);
            var usd2 = new $.$mol_unit_money_usd(10);
            var rur = new $.$mol_unit_money_rur(5);
            $.$mol_assert_equal($.$mol_unit.summ(usd1, usd2).toString(), '$15');
            $.$mol_assert_equal(usd1.mult(2).toString(), '$10');
        },
    });
})($ || ($ = {}));
//unit.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_unit = (function (_super) {
        __extends($mol_unit, _super);
        function $mol_unit(value) {
            var _this = _super.call(this) || this;
            _this['valueOf()'] = value;
            return _this;
        }
        $mol_unit.prototype.prefix = function () {
            return '';
        };
        $mol_unit.prototype.postfix = function () {
            return '';
        };
        $mol_unit.prototype.valueOf = function () {
            return this['valueOf()'];
        };
        $mol_unit.prototype.delimiter = function () {
            return ' ';
        };
        $mol_unit.prototype.value_view = function () {
            return String(this.valueOf()).split(/(?=(?:...)+$)/).join(this.delimiter());
        };
        $mol_unit.prototype.toString = function () {
            return this.prefix() + this.value_view() + this.postfix();
        };
        $mol_unit.summ = function (a, b) {
            var Class = a.Class();
            if (Class !== b.Class())
                throw new Error("Not same measure: " + Class + " , " + b.Class());
            return new Class(a.valueOf() + b.valueOf());
        };
        $mol_unit.prototype.mult = function (m) {
            var Class = this.Class();
            return new Class(this.valueOf() * m);
        };
        return $mol_unit;
    }($.$mol_object));
    $.$mol_unit = $mol_unit;
})($ || ($ = {}));
//unit.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_unit_money = (function (_super) {
        __extends($mol_unit_money, _super);
        function $mol_unit_money() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_unit_money;
    }($.$mol_unit));
    $.$mol_unit_money = $mol_unit_money;
    var $mol_unit_money_usd = (function (_super) {
        __extends($mol_unit_money_usd, _super);
        function $mol_unit_money_usd() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_unit_money_usd.prototype.prefix = function () {
            return '$';
        };
        return $mol_unit_money_usd;
    }($mol_unit_money));
    $.$mol_unit_money_usd = $mol_unit_money_usd;
    var $mol_unit_money_rur = (function (_super) {
        __extends($mol_unit_money_rur, _super);
        function $mol_unit_money_rur() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_unit_money_rur.prototype.postfix = function () {
            return ' ₽';
        };
        return $mol_unit_money_rur;
    }($mol_unit_money));
    $.$mol_unit_money_rur = $mol_unit_money_rur;
})($ || ($ = {}));
//money.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_cost = (function (_super) {
        __extends($mol_cost, _super);
        function $mol_cost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_cost.prototype.value = function () {
            return null;
        };
        $mol_cost.prototype.prefix = function () {
            return "";
        };
        $mol_cost.prototype.Prefix = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.prefix()); };
            });
        };
        $mol_cost.prototype.value_view = function () {
            return "";
        };
        $mol_cost.prototype.Value = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.value_view()); };
            });
        };
        $mol_cost.prototype.postfix = function () {
            return "";
        };
        $mol_cost.prototype.Postfix = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.postfix()); };
            });
        };
        $mol_cost.prototype.sub = function () {
            return [].concat(this.Prefix(), this.Value(), this.Postfix());
        };
        return $mol_cost;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Prefix", null);
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_cost.prototype, "Postfix", null);
    $.$mol_cost = $mol_cost;
})($ || ($ = {}));
//cost.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_cost = (function (_super) {
            __extends($mol_cost, _super);
            function $mol_cost() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_cost.prototype.value = function () {
                return null;
            };
            $mol_cost.prototype.prefix = function () {
                return this.value().prefix();
            };
            $mol_cost.prototype.value_view = function () {
                return this.value().value_view();
            };
            $mol_cost.prototype.postfix = function () {
                return this.value().postfix();
            };
            return $mol_cost;
        }($.$mol_cost));
        $mol.$mol_cost = $mol_cost;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//cost.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_row = (function (_super) {
        __extends($mol_row, _super);
        function $mol_row() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_row.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "minHeight": this.minimal_height() }));
        };
        return $mol_row;
    }($.$mol_view));
    $.$mol_row = $mol_row;
})($ || ($ = {}));
(function ($) {
    var $mol_row_sub = (function (_super) {
        __extends($mol_row_sub, _super);
        function $mol_row_sub() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_row_sub;
    }($.$mol_view));
    $.$mol_row_sub = $mol_row_sub;
})($ || ($ = {}));
//row.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_row = (function (_super) {
            __extends($mol_row, _super);
            function $mol_row() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_row.prototype.item_offsets_top = function () {
                var next = [];
                var sub = this.sub();
                if (!sub)
                    return next;
                var context = this.context_sub();
                var widthLimit = context.$mol_view_visible_width();
                var allHeight = 0;
                var rowWidth = 0;
                var row_height = 0;
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(allHeight);
                    if (!(child instanceof $.$mol_view))
                        continue;
                    var width = child.minimal_width();
                    var height = child.minimal_height();
                    rowWidth += width;
                    if (rowWidth > widthLimit) {
                        allHeight += row_height;
                        rowWidth = width;
                        row_height = height;
                    }
                    else {
                        row_height = Math.max(row_height, height);
                    }
                }
                next.push(allHeight + row_height);
                return next;
            };
            $mol_row.prototype.sub_visible = function () {
                var sub = this.sub();
                var visible = [];
                var context = this.context_sub();
                var heightLimit = context.$mol_view_visible_height();
                var offsets = this.item_offsets_top();
                var height = 0;
                for (var i = 0; i < offsets.length - 1; ++i) {
                    if (offsets[i] > heightLimit)
                        break;
                    var child = sub[i];
                    if (child instanceof $.$mol_view) {
                        child.context(context);
                    }
                    visible.push(child);
                }
                return visible;
            };
            $mol_row.prototype.minimal_height = function () {
                var offsets = this.item_offsets_top();
                return offsets[offsets.length - 1];
            };
            return $mol_row;
        }($.$mol_row));
        __decorate([
            $.$mol_mem()
        ], $mol_row.prototype, "item_offsets_top", null);
        $mol.$mol_row = $mol_row;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//row.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_list = (function (_super) {
        __extends($mol_list, _super);
        function $mol_list() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_list.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "minHeight": this.minimal_height() }));
        };
        $mol_list.prototype.rows = function () {
            return [];
        };
        $mol_list.prototype.sub = function () {
            return this.rows();
        };
        $mol_list.prototype.Empty = function () {
            return null;
        };
        return $mol_list;
    }($.$mol_view));
    $.$mol_list = $mol_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_list = (function (_super) {
            __extends($mol_list, _super);
            function $mol_list() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_list.prototype.sub = function () {
                var rows = this.rows();
                return (rows.length === 0) ? [this.Empty()] : rows;
            };
            $mol_list.prototype.row_offsets = function () {
                var sub = this.sub();
                if (!sub)
                    return null;
                var heightLimit = this.context().$mol_view_visible_height();
                var offset = 0;
                var next = [];
                for (var _i = 0, sub_1 = sub; _i < sub_1.length; _i++) {
                    var child = sub_1[_i];
                    next.push(offset);
                    if (child instanceof $.$mol_view) {
                        offset += child.minimal_height();
                    }
                    if (offset > heightLimit)
                        break;
                }
                return next;
            };
            $mol_list.prototype.row_context = function (index) {
                var _this = this;
                var context = this.context();
                var next = Object.create(context);
                next.$mol_view_visible_height = function () {
                    var limit = context.$mol_view_visible_height();
                    return limit - _this.row_offsets()[index];
                };
                return next;
            };
            $mol_list.prototype.sub_visible = function () {
                var sub = this.sub();
                if (!sub)
                    return sub;
                var limit = this.row_offsets().length;
                var next = [];
                for (var i = 0; i < limit; ++i) {
                    var child = sub[i];
                    if (child == null)
                        continue;
                    if (child instanceof $.$mol_view) {
                        child.context(this.row_context(i));
                    }
                    next.push(child);
                }
                return next;
            };
            $mol_list.prototype.minimal_height = function () {
                var height = 0;
                var sub = this.sub();
                if (sub)
                    sub.forEach(function (child) {
                        if (child instanceof $.$mol_view) {
                            height += child.minimal_height();
                        }
                    });
                return height;
            };
            return $mol_list;
        }($.$mol_list));
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "row_offsets", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_list.prototype, "row_context", null);
        __decorate([
            $.$mol_mem()
        ], $mol_list.prototype, "sub_visible", null);
        $mol.$mol_list = $mol_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//list.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_card = (function (_super) {
        __extends($mol_card, _super);
        function $mol_card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_card.prototype.status = function () {
            return "";
        };
        $mol_card.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_card_status_type": this.status() }));
        };
        $mol_card.prototype.content = function () {
            return [];
        };
        $mol_card.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.content(); };
            });
        };
        $mol_card.prototype.status_text = function () {
            return this.status();
        };
        $mol_card.prototype.Status = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.minimal_height = function () { return 30; };
                obj.sub = function () { return [].concat(_this.status_text()); };
            });
        };
        $mol_card.prototype.rows = function () {
            return [].concat(this.Content(), this.Status());
        };
        return $mol_card;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_card.prototype, "Content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_card.prototype, "Status", null);
    $.$mol_card = $mol_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_card = (function (_super) {
            __extends($mol_card, _super);
            function $mol_card() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_card.prototype.rows = function () {
                return [
                    this.Content(),
                    this.status_text() ? this.Status() : null,
                ];
            };
            return $mol_card;
        }($.$mol_card));
        $mol.$mol_card = $mol_card;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//card.view.js.map
;
require( 'source-map-support' ).install();

;
var $jin = this.$jin = {}

;
var $jin;
(function ($jin) {
    function concater(funcs) {
        switch (funcs.length) {
            case 0:
                return function (value) { return value; };
            case 1:
                return funcs[0];
            default:
                var mid = Math.ceil(funcs.length / 2);
                var first = $jin.concater(funcs.slice(0, mid));
                var second = $jin.concater(funcs.slice(mid));
                return function (value) {
                    return first(value) + second(value);
                };
        }
    }
    $jin.concater = concater;
})($jin || ($jin = {}));
//jin-concater.js.map
;
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var base_class = (function () {
            function base_class() {
            }
            base_class.formatter = function (pattern) {
                var _this = this;
                if (this.patterns[pattern])
                    return this.patterns[pattern];
                var tokens = Object.keys(this.patterns)
                    .sort()
                    .reverse()
                    .map(function (token) { return token.replace(/([-+*.\[\]()\^])/g, '\\$1'); });
                var lexer = RegExp('(.*?)(' + tokens.join('|') + '|$)', 'g');
                var funcs = [];
                pattern.replace(lexer, function (str, text, token) {
                    if (text)
                        funcs.push(function () { return text; });
                    if (token)
                        funcs.push(_this.patterns[token]);
                    return str;
                });
                return this.patterns[pattern] = $jin.concater(funcs);
            };
            base_class.prototype.toString = function (pattern) {
                var Base = this.constructor;
                var formatter = Base.formatter(pattern);
                return formatter.call(Base, this);
            };
            return base_class;
        }());
        base_class.patterns = {};
        time.base_class = base_class;
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//base.js.map
;
function $jin_type(value) {
    var str = {}.toString.apply(value);
    var type = str.substring(8, str.length - 1);
    if (['Window', 'global'].indexOf(type) >= 0)
        type = 'Global';
    return type;
}
//type.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'scalars': function () {
            $.$mol_assert_equal($jin_type(void 0), 'Undefined');
            $.$mol_assert_equal($jin_type(null), 'Null');
            $.$mol_assert_equal($jin_type(0), 'Number');
            $.$mol_assert_equal($jin_type(''), 'String');
            $.$mol_assert_equal($jin_type(false), 'Boolean');
        },
        'common objects': function () {
            $.$mol_assert_equal($jin_type({}), 'Object');
            $.$mol_assert_equal($jin_type([]), 'Array');
            $.$mol_assert_equal($jin_type(arguments), 'Arguments');
        },
        'special objects': function () {
            $.$mol_assert_equal($jin_type(new Date), 'Date');
            $.$mol_assert_equal($jin_type(new RegExp('')), 'RegExp');
        },
    });
})($ || ($ = {}));
//type_tests.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var duration_class = (function (_super) {
            __extends(duration_class, _super);
            function duration_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year) || 0;
                _this._month = config.month && Number(config.month) || 0;
                _this._day = config.day && Number(config.day) || 0;
                _this._hour = config.hour && Number(config.hour) || 0;
                _this._minute = config.minute && Number(config.minute) || 0;
                _this._second = config.second && Number(config.second) || 0;
                return _this;
            }
            duration_class.make = function (duration) {
                if (!arguments.length)
                    duration = [];
                var type = $jin_type(duration);
                switch (type) {
                    case 'Number':
                        return new this({ second: duration / 1000 });
                    case 'Array':
                        var dur = duration;
                        return new this({
                            year: dur[0],
                            month: dur[1],
                            day: dur[2],
                            hour: dur[3],
                            minute: dur[4],
                            second: dur[5],
                        });
                    case 'Object':
                        if (duration instanceof this)
                            return duration;
                        return new this(duration);
                    case 'String':
                        if (duration === 'Z') {
                            return new this({});
                        }
                        var parser = /^P(?:([+-]?\d+(?:\.\d+)?)Y)?(?:([+-]?\d+(?:\.\d+)?)M)?(?:([+-]?\d+(?:\.\d+)?)D)?(?:T(?:([+-]?\d+(?:\.\d+)?)h)?(?:([+-]?\d+(?:\.\d+)?)m)?(?:([+-]?\d+(?:\.\d+)?)s)?)?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                year: found[1],
                                month: found[2],
                                day: found[3],
                                hour: found[4],
                                minute: found[5],
                                second: found[6],
                            });
                        }
                        var parser = /^[+-](\d\d)(?::?(\d\d))?$/i;
                        var found = parser.exec(duration);
                        if (found) {
                            return new this({
                                hour: found[1],
                                minute: found[2],
                            });
                        }
                        throw new Error('Can not parse time duration (' + duration + ')');
                    default:
                        throw new Error('Wrong type of time duration (' + type + ')');
                }
            };
            Object.defineProperty(duration_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(duration_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            duration_class.prototype.summ = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year + duration.year,
                    month: this.month + duration.month,
                    day: this.day + duration.day,
                    hour: this.hour + duration.hour,
                    minute: this.minute + duration.minute,
                    second: this.second + duration.second,
                });
            };
            duration_class.prototype.sub = function (config) {
                var Duration = this.constructor;
                var duration = Duration.make(config);
                return new Duration({
                    year: this.year - duration.year,
                    month: this.month - duration.month,
                    day: this.day - duration.day,
                    hour: this.hour - duration.hour,
                    minute: this.minute - duration.minute,
                    second: this.second - duration.second,
                });
            };
            duration_class.prototype.valueOf = function () {
                var day = this.year * 365 + this.month * 30.4 + this.day;
                var second = ((day * 24 + this.hour) * 60 + this.minute) * 60 + this.second;
                return second * 1000;
            };
            duration_class.prototype.toJSON = function () { return this.toString(); };
            duration_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'P#Y#M#DT#h#m#s'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return duration_class;
        }($jin.time.base_class));
        duration_class.patterns = {
            '#Y': function (duration) {
                if (!duration.year)
                    return '';
                return duration.year + 'Y';
            },
            '#M': function (duration) {
                if (!duration.month)
                    return '';
                return duration.month + 'M';
            },
            '#D': function (duration) {
                if (!duration.day)
                    return '';
                return duration.day + 'D';
            },
            '#h': function (duration) {
                if (!duration.hour)
                    return '';
                return duration.hour + 'H';
            },
            '#m': function (duration) {
                if (!duration.minute)
                    return '';
                return duration.minute + 'M';
            },
            '#s': function (duration) {
                if (!duration.second)
                    return '';
                return duration.second + 'S';
            },
            '+hh': function (duration) {
                var hour = duration.hour;
                var sign = '+';
                if (hour < 0) {
                    sign = '-';
                    hour = -hour;
                }
                return (hour < 10)
                    ? (sign + '0' + hour)
                    : (sign + hour);
            },
            'mm': function (duration) {
                return (duration.minute < 10)
                    ? ('0' + duration.minute)
                    : String(duration.minute);
            },
        };
        time.duration_class = duration_class;
        time.duration = duration_class.make.bind(duration_class);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//duration.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'parse and serial': function () {
            $.$mol_assert_equal($jin.time.duration('P42.1Y').toString(), 'P42.1YT');
            $.$mol_assert_equal($jin.time.duration('P42.1M').toString(), 'P42.1MT');
            $.$mol_assert_equal($jin.time.duration('P42.1D').toString(), 'P42.1DT');
            $.$mol_assert_equal($jin.time.duration('PT42.1h').toString(), 'PT42.1H');
            $.$mol_assert_equal($jin.time.duration('PT42.1m').toString(), 'PT42.1M');
            $.$mol_assert_equal($jin.time.duration('PT42.1s').toString(), 'PT42.1S');
            $.$mol_assert_equal($jin.time.duration('P1Y2M3DT4h5m6.7s').toString(), 'P1Y2M3DT4H5M6.7S');
        },
        'format typed': function () {
            $.$mol_assert_equal($jin.time.duration('P1Y2M3DT4h5m6s').toString('P#Y#M#DT#h#m#s'), 'P1Y2M3DT4H5M6S');
        },
    });
})($ || ($ = {}));
//duration_tests.stage=dev.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $jin;
(function ($jin) {
    var time;
    (function (time) {
        var moment_class = (function (_super) {
            __extends(moment_class, _super);
            function moment_class(config) {
                var _this = _super.call(this) || this;
                _this._year = config.year && Number(config.year);
                _this._month = config.month && Number(config.month);
                _this._day = config.day && Number(config.day);
                _this._hour = config.hour && Number(config.hour);
                _this._minute = config.minute && Number(config.minute);
                _this._second = config.second && Number(config.second);
                _this._offset = config.offset && _this.constructor.duration_class.make(config.offset);
                _this._native = null;
                return _this;
            }
            moment_class.make = function (moment) {
                if (!arguments.length)
                    moment = new Date;
                var type = $jin_type(moment);
                switch (type) {
                    case 'Number':
                        moment = new Date(moment);
                    case 'Date':
                        var native = moment;
                        var offset = -native.getTimezoneOffset();
                        return new this({
                            year: native.getFullYear(),
                            month: native.getMonth(),
                            day: native.getDate() - 1,
                            hour: native.getHours(),
                            minute: native.getMinutes(),
                            second: native.getSeconds() + native.getMilliseconds() / 1000,
                            offset: {
                                hour: (offset < 0) ? Math.ceil(offset / 60) : Math.floor(offset / 60),
                                minute: offset % 60
                            }
                        });
                    case 'String':
                        var parsed = /^(?:(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d))?)?)?(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d(?:\.\d\d\d)?))?)?(Z|[\+\-]\d\d(?::?(?:\d\d)?)?)?)?$/.exec(moment);
                        if (!parsed)
                            throw new Error('Can not parse time moment (' + moment + ')');
                        return new this({
                            year: parsed[1],
                            month: parsed[2] ? (Number(parsed[2]) - 1) : void 0,
                            day: parsed[3] ? (Number(parsed[3]) - 1) : void 0,
                            hour: parsed[4],
                            minute: parsed[5],
                            second: parsed[6],
                            offset: parsed[7]
                        });
                    case 'Array':
                        var mom = moment;
                        return new this({
                            year: mom[0],
                            month: mom[1],
                            day: mom[2],
                            hour: mom[3],
                            minute: mom[4],
                            second: mom[5],
                            offset: mom[6],
                        });
                    case 'Object':
                        if (moment instanceof this)
                            return moment;
                        return new this(moment);
                    default:
                        throw new Error('Wrong type of time moment (' + type + ')');
                }
            };
            Object.defineProperty(moment_class.prototype, "year", {
                get: function () { return this._year; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "month", {
                get: function () { return this._month; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "day", {
                get: function () { return this._day; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "hour", {
                get: function () { return this._hour; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "minute", {
                get: function () { return this._minute; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "second", {
                get: function () { return this._second; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "offset", {
                get: function () { return this._offset; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "native", {
                get: function () {
                    if (this._native)
                        return this._native;
                    var utc = this.toOffset('Z');
                    return this._native = new Date(Date.UTC(utc.year || 0, utc.month || 0, (utc.day || 0) + 1, utc.hour || 0, utc.minute || 0, utc.second && Math.ceil(utc.second) || 0, utc.second && (utc.second - Math.ceil(utc.second)) || 0));
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "normal", {
                get: function () {
                    return this.constructor.make(this.native).merge({
                        year: (this._year === void 0) ? null : void 0,
                        month: (this._month === void 0) ? null : void 0,
                        day: (this._day === void 0) ? null : void 0,
                        hour: (this._hour === void 0) ? null : void 0,
                        minute: (this._minute === void 0) ? null : void 0,
                        second: (this._second === void 0) ? null : void 0,
                        offset: (this._offset === void 0) ? null : void 0,
                    });
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(moment_class.prototype, "weekDay", {
                get: function () {
                    return this.native.getDay();
                },
                enumerable: true,
                configurable: true
            });
            moment_class.prototype.merge = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                return new Moment({
                    year: (moment.year === void 0)
                        ? this._year
                        : (moment.year === null)
                            ? void 0
                            : moment.year,
                    month: (moment.month === void 0)
                        ? this._month
                        : (moment.month === null)
                            ? void 0
                            : moment.month,
                    day: (moment.day === void 0)
                        ? this._day
                        : (moment.day === null)
                            ? void 0
                            : moment.day,
                    hour: (moment.hour === void 0)
                        ? this._hour
                        : (moment.hour === null)
                            ? void 0
                            : moment.hour,
                    minute: (moment.minute === void 0)
                        ? this._minute
                        : (moment.minute === null)
                            ? void 0
                            : moment.minute,
                    second: (moment.second === void 0)
                        ? this._second
                        : (moment.second === null)
                            ? void 0
                            : moment.second,
                    offset: (moment.offset === void 0)
                        ? this._offset
                        : (moment.offset === null)
                            ? void 0
                            : moment.offset,
                });
            };
            moment_class.prototype.shift = function (config) {
                var Moment = this.constructor;
                var duration = Moment.duration_class.make(config);
                var moment = Moment.make().merge(this);
                var second = moment.second + duration.second;
                var native = new Date(moment.year + duration.year, moment.month + duration.month, moment.day + duration.day + 1, moment.hour + duration.hour, moment.minute + duration.minute, Math.floor(second), (second - Math.floor(second)) * 1000);
                if (isNaN(native.valueOf()))
                    throw new Error('Wrong time');
                return new Moment({
                    year: (this._year === void 0) ? void 0 : native.getFullYear(),
                    month: (this._month === void 0) ? void 0 : native.getMonth(),
                    day: (this._day === void 0) ? void 0 : native.getDate() - 1,
                    hour: (this._hour === void 0) ? void 0 : native.getHours(),
                    minute: (this._minute === void 0) ? void 0 : native.getMinutes(),
                    second: (this._second === void 0) ? void 0 : native.getSeconds() + native.getMilliseconds() / 1000,
                    offset: this.offset,
                });
            };
            moment_class.prototype.sub = function (config) {
                var Moment = this.constructor;
                var moment = Moment.make(config);
                var dur = {
                    year: (moment.year === void 0)
                        ? this.year
                        : (this.year || 0) - moment.year,
                    month: (moment.month === void 0)
                        ? this.month
                        : (this.month || 0) - moment.month,
                    day: (moment.day === void 0)
                        ? this.day
                        : (this.day || 0) - moment.day,
                    hour: (moment.hour === void 0)
                        ? this.hour
                        : (this.hour || 0) - moment.hour,
                    minute: (moment.minute === void 0)
                        ? this.minute
                        : (this.minute || 0) - moment.minute,
                    second: (moment.second === void 0)
                        ? this.second
                        : (this.second || 0) - moment.second,
                };
                return new Moment.duration_class(dur);
            };
            moment_class.prototype.toOffset = function (duration) {
                if (this._offset) {
                    var Moment = this.constructor;
                    return this
                        .shift(Moment.duration_class.make(duration).sub(this._offset))
                        .merge({ offset: duration });
                }
                else {
                    return this.merge({ offset: duration });
                }
            };
            moment_class.prototype.valueOf = function () { return this.native.getTime(); };
            moment_class.prototype.toJSON = function () { return this.toString(); };
            moment_class.prototype.toString = function (pattern) {
                if (pattern === void 0) { pattern = 'YYYY-MM-DDThh:mm:ss.sssZ'; }
                return _super.prototype.toString.call(this, pattern);
            };
            return moment_class;
        }($jin.time.base_class));
        moment_class.duration_class = $jin.time.duration_class;
        moment_class.patterns = {
            'YYYY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year);
            },
            'AD': function (moment) {
                if (moment.year == null)
                    return '';
                return String(Math.floor(moment.year / 100) + 1);
            },
            'YY': function (moment) {
                if (moment.year == null)
                    return '';
                return String(moment.year % 100);
            },
            'Month': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthLong[moment.month];
            },
            'Mon': function (moment) {
                if (moment.month == null)
                    return '';
                return moment.constructor.monthShort[moment.month];
            },
            '-MM': function (moment) {
                if (moment.month == null)
                    return '';
                return '-' + moment.constructor.patterns['MM'](moment);
            },
            'MM': function (moment) {
                if (moment.month == null)
                    return '';
                var month = moment.month + 1;
                return (month < 10)
                    ? ('0' + month)
                    : ('' + month);
            },
            'M': function (moment) {
                if (moment.month == null)
                    return '';
                return String(moment.month + 1);
            },
            'WeekDay': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayLong[moment.weekDay];
            },
            'WD': function (moment) {
                if (moment.weekDay == null)
                    return '';
                return moment.constructor.weekDayShort[moment.weekDay];
            },
            '-DD': function (moment) {
                if (moment.day == null)
                    return '';
                return '-' + moment.constructor.patterns['DD'](moment);
            },
            'DD': function (moment) {
                if (moment.day == null)
                    return '';
                var day = moment.day + 1;
                return (day < 10)
                    ? ('0' + day)
                    : String(day);
            },
            'D': function (moment) {
                if (moment.day == null)
                    return '';
                return String(moment.day + 1);
            },
            'Thh': function (moment) {
                if (moment.hour == null)
                    return '';
                return 'T' + moment.constructor.patterns['hh'](moment);
            },
            'hh': function (moment) {
                if (moment.hour == null)
                    return '';
                return (moment.hour < 10)
                    ? ('0' + moment.hour)
                    : String(moment.hour);
            },
            'h': function (moment) {
                if (moment.hour == null)
                    return '';
                return String(moment.hour);
            },
            ':mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return ':' + moment.constructor.patterns['mm'](moment);
            },
            'mm': function (moment) {
                if (moment.minute == null)
                    return '';
                return (moment.minute < 10)
                    ? ('0' + moment.minute)
                    : String(moment.minute);
            },
            'm': function (moment) {
                if (moment.minute == null)
                    return '';
                return String(moment.minute);
            },
            ':ss': function (moment) {
                if (moment.second == null)
                    return '';
                return ':' + moment.constructor.patterns['ss'](moment);
            },
            'ss': function (moment) {
                if (moment.second == null)
                    return '';
                var second = Math.floor(moment.second);
                return (second < 10)
                    ? ('0' + second)
                    : String(second);
            },
            's': function (moment) {
                if (moment.second == null)
                    return '';
                return String(Math.floor(moment.second));
            },
            '.sss': function (moment) {
                if (moment.second == null)
                    return '';
                if (moment.second - Math.floor(moment.second) === 0)
                    return '';
                return '.' + moment.constructor.patterns['sss'](moment);
            },
            'sss': function (moment) {
                if (moment.second == null)
                    return '';
                var millisecond = Math.floor((moment.second - Math.floor(moment.second)) * 1000);
                return (millisecond < 10)
                    ? ('00' + millisecond)
                    : (millisecond < 100)
                        ? ('0' + millisecond)
                        : String(millisecond);
            },
            'Z': function (moment) {
                var offset = moment.offset;
                if (!offset)
                    return '';
                return offset.toString('+hh:mm');
            }
        };
        moment_class.monthLong = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        moment_class.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        moment_class.weekDayLong = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        moment_class.weekDayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        time.moment_class = moment_class;
        time.moment = moment_class.make.bind(moment_class);
        time.moment['en'] = moment_class.make.bind(moment_class);
        var moment_class_ru = (function (_super) {
            __extends(moment_class_ru, _super);
            function moment_class_ru() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return moment_class_ru;
        }(moment_class));
        moment_class_ru.monthLong = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
        moment_class_ru.monthShort = ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'];
        moment_class_ru.weekDayLong = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        moment_class_ru.weekDayShort = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
        time.moment_class_ru = moment_class_ru;
        time.moment['ru'] = moment_class_ru.make.bind(moment_class_ru);
    })(time = $jin.time || ($jin.time = {}));
})($jin || ($jin = {}));
//moment.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'parse and serial': function () {
            $.$mol_assert_equal($jin.time.moment('2014').toString(), '2014');
            $.$mol_assert_equal($jin.time.moment('2014-01').toString(), '2014-01');
            $.$mol_assert_equal($jin.time.moment('2014-01-02').toString(), '2014-01-02');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03').toString(), '2014-01-02T03');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04').toString(), '2014-01-02T03:04');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04:05').toString(), '2014-01-02T03:04:05');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04:05.006').toString(), '2014-01-02T03:04:05.006');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04:05.006Z').toString(), '2014-01-02T03:04:05.006+00:00');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04:05.006+07:00').toString(), '2014-01-02T03:04:05.006+07:00');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04:05+07:08').toString(), '2014-01-02T03:04:05+07:08');
            $.$mol_assert_equal($jin.time.moment('2014-01-02T03:04+07:08').toString(), '2014-01-02T03:04+07:08');
            $.$mol_assert_equal($jin.time.moment('T03:04+07:08').toString(), 'T03:04+07:08');
            $.$mol_assert_equal($jin.time.moment('T03:04:05').toString(), 'T03:04:05');
            $.$mol_assert_equal($jin.time.moment('T03:04').toString(), 'T03:04');
            $.$mol_assert_equal($jin.time.moment('T03').toString(), 'T03');
        },
        'format simple': function () {
            $.$mol_assert_equal($jin.time.moment('2014-01-02T01:02:03.000').toString('AD YY-M-D h:m:s'), '21 14-1-2 1:2:3');
        },
        'format padded': function () {
            $.$mol_assert_equal($jin.time.moment('2014-01-02T01:02:03.000').toString('YYYY-MM-DD hh:mm:ss'), '2014-01-02 01:02:03');
        },
        'format time zone': function () {
            $.$mol_assert_equal($jin.time.moment('2014-01-02T01:02:03+05:00').toString('Z'), '+05:00');
        },
        'format names': function () {
            $.$mol_assert_equal($jin.time.moment('2014-01-02T01:02:03.000').toString('Month Mon | WeekDay WD'), 'January Jan | Thursday Thu');
        },
        'shifting': function () {
            $.$mol_assert_equal($jin.time.moment('T15:54:58.243+03:00').shift({}).toString(), 'T15:54:58.243+03:00');
            $.$mol_assert_equal($jin.time.moment('2014-01-02').shift('P1Y').toString(), '2015-01-02');
            $.$mol_assert_equal($jin.time.moment('2014-01-02').shift('P12M').toString(), '2015-01-02');
            $.$mol_assert_equal($jin.time.moment('2014-01-02').shift('P365D').toString(), '2015-01-02');
            $.$mol_assert_equal($jin.time.moment('2014-01-02').shift('PT8760h').toString(), '2015-01-02');
            $.$mol_assert_equal($jin.time.moment('2014-01').shift('PT8760h').toString(), '2015-01');
            $.$mol_assert_equal($jin.time.moment('2014-01').shift('PT-8760h').toString(), '2013-01');
        },
        'normalization': function () {
            $.$mol_assert_equal($jin.time.moment('2015-07-35').normal.toString(), '2015-08-04');
        },
    });
})($ || ($ = {}));
//moment_tests.stage=dev.js.map
;
var $;
(function ($) {
    function $mol_stub_select_random(list) {
        return list[Math.floor(Math.random() * list.length)];
    }
    $.$mol_stub_select_random = $mol_stub_select_random;
    function $mol_stub_strings(prefix, count, length) {
        if (prefix === void 0) { prefix = ''; }
        if (count === void 0) { count = 10; }
        if (length === void 0) { length = 10; }
        if (prefix.length >= length)
            return [];
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split('');
        var strings = [];
        for (var i = 0; i < count; i++) {
            var text = prefix;
            for (var j = prefix.length; j < length; j++) {
                text += $mol_stub_select_random(possible);
            }
            strings.push(text);
        }
        return strings;
    }
    $.$mol_stub_strings = $mol_stub_strings;
    function $mol_stub_code(length) {
        if (length === void 0) { length = 8; }
        var max = Math.pow(16, length);
        var min = Math.pow(16, length - 1);
        var value = min + Math.floor(Math.random() * (max - min));
        return value.toString(16).toUpperCase();
    }
    $.$mol_stub_code = $mol_stub_code;
    function $mol_stub_price(max) {
        if (max === void 0) { max = 1000; }
        var min = Math.floor(max / 16 / 16);
        var value = min + Math.floor(Math.random() * (max - min));
        return new $.$mol_unit_money_usd(value);
    }
    $.$mol_stub_price = $mol_stub_price;
    function $mol_stub_product_name() {
        var name = $mol_stub_select_random([
            'Monitor 15"',
            'Monitor 17"',
            'Monitor 19"',
            'Graphics card',
            'Frame grabber card'
        ]);
        var port = $mol_stub_select_random(['D-SUB', 'DVI', 'HDMI']);
        var resolution = $mol_stub_select_random(['VGA', 'Full HD', '4K']);
        return [name, port, resolution].join(', ');
    }
    $.$mol_stub_product_name = $mol_stub_product_name;
    function $mol_stub_company_name_big() {
        var product = $mol_stub_select_random(['Everything', 'Something', 'Anything', 'Nothing']);
        var type = $mol_stub_select_random(['Company', 'Corporation', 'Holding']);
        return "A " + type + " that makes " + product;
    }
    $.$mol_stub_company_name_big = $mol_stub_company_name_big;
    function $mol_stub_company_name_small() {
        return $mol_stub_select_random(['ACME inc.', 'Dream Company', 'Just Company']);
    }
    $.$mol_stub_company_name_small = $mol_stub_company_name_small;
    function $mol_stub_company_name() {
        return $mol_stub_select_random([$mol_stub_company_name_small, $mol_stub_company_name_big])();
    }
    $.$mol_stub_company_name = $mol_stub_company_name;
    function $mol_stub_person_name() {
        var first = $mol_stub_select_random(['Ivan', 'Petr', 'Sidor']);
        var last = $mol_stub_select_random(['Ivanov', 'Petrov', 'Sidorov']);
        return first + " " + last;
    }
    $.$mol_stub_person_name = $mol_stub_person_name;
    function $mol_stub_city() {
        return $mol_stub_select_random(['Moscow', 'London', 'Washington', 'Buenos Aires']);
    }
    $.$mol_stub_city = $mol_stub_city;
    function $mol_stub_time(maxShift) {
        if (maxShift === void 0) { maxShift = 60 * 24 * 365; }
        return $jin.time.moment().shift({ minute: Math.round(Math.random() * maxShift) });
    }
    $.$mol_stub_time = $mol_stub_time;
})($ || ($ = {}));
//stub.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'const returns stored value': function () {
            var foo = { bar: $.$mol_const(Math.random()) };
            $.$mol_assert_equal(foo.bar(), foo.bar());
            $.$mol_assert_equal(foo.bar(), foo.bar['()']);
        },
    });
})($ || ($ = {}));
//const.test.js.map
;
var $;
(function ($) {
    function $mol_const(value) {
        var getter = (function () { return value; });
        getter['()'] = value;
        return getter;
    }
    $.$mol_const = $mol_const;
})($ || ($ = {}));
//const.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_domain_provider = (function (_super) {
        __extends($mol_app_supplies_domain_provider, _super);
        function $mol_app_supplies_domain_provider() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_provider.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_provider.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_provider;
    }($.$mol_object));
    $.$mol_app_supplies_domain_provider = $mol_app_supplies_domain_provider;
    var $mol_app_supplies_domain_supply_group = (function (_super) {
        __extends($mol_app_supplies_domain_supply_group, _super);
        function $mol_app_supplies_domain_supply_group() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_group.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_group.prototype.manager = function () { return void 0; };
        return $mol_app_supplies_domain_supply_group;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_group = $mol_app_supplies_domain_supply_group;
    var $mol_app_supplies_domain_supply_division = (function (_super) {
        __extends($mol_app_supplies_domain_supply_division, _super);
        function $mol_app_supplies_domain_supply_division() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_division.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply_division.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_supply_division;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_division = $mol_app_supplies_domain_supply_division;
    var $mol_app_supplies_domain_pay_method = (function (_super) {
        __extends($mol_app_supplies_domain_pay_method, _super);
        function $mol_app_supplies_domain_pay_method() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_pay_method.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_pay_method.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_pay_method;
    }($.$mol_object));
    $.$mol_app_supplies_domain_pay_method = $mol_app_supplies_domain_pay_method;
    var $mol_app_supplies_domain_debitor = (function (_super) {
        __extends($mol_app_supplies_domain_debitor, _super);
        function $mol_app_supplies_domain_debitor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_debitor.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_debitor.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_debitor;
    }($.$mol_object));
    $.$mol_app_supplies_domain_debitor = $mol_app_supplies_domain_debitor;
    var $mol_app_supplies_domain_supply_position = (function (_super) {
        __extends($mol_app_supplies_domain_supply_position, _super);
        function $mol_app_supplies_domain_supply_position() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply_position.prototype.name = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.supply_moment = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.division = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.store = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.price = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.quantity = function () { return void 0; };
        $mol_app_supplies_domain_supply_position.prototype.cost = function () { return void 0; };
        return $mol_app_supplies_domain_supply_position;
    }($.$mol_object));
    $.$mol_app_supplies_domain_supply_position = $mol_app_supplies_domain_supply_position;
    var $mol_app_supplies_domain_attachment = (function (_super) {
        __extends($mol_app_supplies_domain_attachment, _super);
        function $mol_app_supplies_domain_attachment() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_attachment.prototype.url_thumb = function () { return void 0; };
        $mol_app_supplies_domain_attachment.prototype.url_load = function () { return void 0; };
        return $mol_app_supplies_domain_attachment;
    }($.$mol_object));
    $.$mol_app_supplies_domain_attachment = $mol_app_supplies_domain_attachment;
    var $mol_app_supplies_domain_person = (function (_super) {
        __extends($mol_app_supplies_domain_person, _super);
        function $mol_app_supplies_domain_person() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_person.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_person.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_person;
    }($.$mol_object));
    $.$mol_app_supplies_domain_person = $mol_app_supplies_domain_person;
    var $mol_app_supplies_domain_contract = (function (_super) {
        __extends($mol_app_supplies_domain_contract, _super);
        function $mol_app_supplies_domain_contract() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_contract.prototype.id = function () { return void 0; };
        return $mol_app_supplies_domain_contract;
    }($.$mol_object));
    $.$mol_app_supplies_domain_contract = $mol_app_supplies_domain_contract;
    var $mol_app_supplies_domain_ballance_unit = (function (_super) {
        __extends($mol_app_supplies_domain_ballance_unit, _super);
        function $mol_app_supplies_domain_ballance_unit() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_ballance_unit.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_ballance_unit.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_ballance_unit;
    }($.$mol_object));
    $.$mol_app_supplies_domain_ballance_unit = $mol_app_supplies_domain_ballance_unit;
    var $mol_app_supplies_domain_consumer = (function (_super) {
        __extends($mol_app_supplies_domain_consumer, _super);
        function $mol_app_supplies_domain_consumer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_consumer.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_consumer.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_consumer;
    }($.$mol_object));
    $.$mol_app_supplies_domain_consumer = $mol_app_supplies_domain_consumer;
    var $mol_app_supplies_domain_store = (function (_super) {
        __extends($mol_app_supplies_domain_store, _super);
        function $mol_app_supplies_domain_store() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_store.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_store.prototype.name = function () { return void 0; };
        return $mol_app_supplies_domain_store;
    }($.$mol_object));
    $.$mol_app_supplies_domain_store = $mol_app_supplies_domain_store;
    var $mol_app_supplies_domain_supply = (function (_super) {
        __extends($mol_app_supplies_domain_supply, _super);
        function $mol_app_supplies_domain_supply() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_supply.prototype.id = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.provider = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.consumer = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.group = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.status = function (next) { return next; };
        $mol_app_supplies_domain_supply.prototype.ballance_unit = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.manager = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.contract = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.pay_method = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.debitor = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.positions = function () { return void 0; };
        $mol_app_supplies_domain_supply.prototype.attachments = function (next) { return next || []; };
        $mol_app_supplies_domain_supply.prototype.cost = function () { return void 0; };
        return $mol_app_supplies_domain_supply;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_supply.prototype, "status", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_supply.prototype, "attachments", null);
    $.$mol_app_supplies_domain_supply = $mol_app_supplies_domain_supply;
    var $mol_app_supplies_domain_supply_status;
    (function ($mol_app_supplies_domain_supply_status) {
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["pending"] = 'pending'] = "pending";
        $mol_app_supplies_domain_supply_status[$mol_app_supplies_domain_supply_status["approved"] = 'approved'] = "approved";
    })($mol_app_supplies_domain_supply_status = $.$mol_app_supplies_domain_supply_status || ($.$mol_app_supplies_domain_supply_status = {}));
    var $mol_app_supplies_domain_mock = (function (_super) {
        __extends($mol_app_supplies_domain_mock, _super);
        function $mol_app_supplies_domain_mock() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_domain_mock.prototype.supplies = function () {
            var next = [];
            for (var i = 1; i <= 100; ++i) {
                next.push(this.supply((i * 123456789 % 987654321).toString(16).toUpperCase()));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.positions = function (supply) {
            var next = [];
            var count = 10 + Math.floor(Math.random() * 30);
            for (var i = 1; i <= count; ++i) {
                next.push(this.position({
                    supply: supply,
                    position: (i * 123456789 % 987654321).toString(16).toUpperCase()
                }));
            }
            return next;
        };
        $mol_app_supplies_domain_mock.prototype.supply_status = function (id, next) {
            return next || $.$mol_stub_select_random([
                $mol_app_supplies_domain_supply_status.pending,
                $mol_app_supplies_domain_supply_status.approved
            ]);
        };
        $mol_app_supplies_domain_mock.prototype.supply = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.cost = function () { return new $.$mol_unit_money_usd(_this.positions(id)
                    .reduce(function (sum, pos) { return sum + pos.cost().valueOf(); }, 0)); };
                obj.status = function (next) { return _this.supply_status(id, next); };
                obj.provider = $.$mol_const(_this.provider($.$mol_stub_code(2)));
                obj.consumer = $.$mol_const(_this.consumer($.$mol_stub_code(2)));
                obj.group = $.$mol_const(_this.supply_group($.$mol_stub_code(2)));
                obj.contract = $.$mol_const(_this.contract($.$mol_stub_code(8)));
                obj.manager = $.$mol_const(_this.person($.$mol_stub_code(2)));
                obj.ballance_unit = $.$mol_const(_this.ballance_unit($.$mol_stub_code(2)));
                obj.pay_method = $.$mol_const(_this.pay_method($.$mol_stub_code(1)));
                obj.debitor = $.$mol_const(_this.debitor($.$mol_stub_code(2)));
                obj.positions = function () { return _this.positions(id); };
                obj.attachments = function (next) { return _this.attachments(id, next); };
            });
        };
        $mol_app_supplies_domain_mock.prototype.provider = function (id) {
            return new $mol_app_supplies_domain_provider().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.consumer = function (id) {
            return new $mol_app_supplies_domain_consumer().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.ballance_unit = function (id) {
            return new $mol_app_supplies_domain_ballance_unit().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_select_random([
                    'ACME Enterprise',
                    'ACME Customer',
                    'ACME Inside'
                ]));
            });
        };
        $mol_app_supplies_domain_mock.prototype.division = function (id) {
            return new $mol_app_supplies_domain_supply_division().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_code(4));
            });
        };
        $mol_app_supplies_domain_mock.prototype.supply_group = function (id) {
            return new $mol_app_supplies_domain_supply_group().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_person_name() + ' Group');
            });
        };
        $mol_app_supplies_domain_mock.prototype.store = function (id) {
            return new $mol_app_supplies_domain_store().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_city() + ' #' + $.$mol_stub_code(2));
            });
        };
        $mol_app_supplies_domain_mock.prototype.person = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_person_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.contract = function (id) {
            return new $mol_app_supplies_domain_person().setup(function (obj) {
                obj.id = $.$mol_const(id);
            });
        };
        $mol_app_supplies_domain_mock.prototype.pay_method = function (id) {
            return new $mol_app_supplies_domain_pay_method().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_select_random(['Accounting', 'Cash']));
            });
        };
        $mol_app_supplies_domain_mock.prototype.debitor = function (id) {
            return new $mol_app_supplies_domain_pay_method().setup(function (obj) {
                obj.id = $.$mol_const(id);
                obj.name = $.$mol_const($.$mol_stub_company_name());
            });
        };
        $mol_app_supplies_domain_mock.prototype.position = function (id) {
            var _this = this;
            return new $mol_app_supplies_domain_supply_position().setup(function (obj) {
                obj.name = $.$mol_const($.$mol_stub_product_name());
                obj.supply_moment = $.$mol_const($.$mol_stub_time(60 * 24 * 365));
                obj.store = $.$mol_const(_this.store($.$mol_stub_code(2)));
                obj.division = $.$mol_const(_this.division($.$mol_stub_code(2)));
                obj.price = $.$mol_const($.$mol_stub_price(1000));
                obj.quantity = $.$mol_const(Math.round(Math.random() * 30));
                obj.cost = $.$mol_const(obj.price().mult(obj.quantity()));
            });
        };
        $mol_app_supplies_domain_mock.prototype.attachments = function (id, next) {
            return next || [];
        };
        $mol_app_supplies_domain_mock.prototype.attachment = function (id) {
            return new $mol_app_supplies_domain_attachment().setup(function (obj) {
                obj.url_thumb = obj.url_load = $.$mol_const('data:image/svg+xml;base64,PHN2ZyBpZD0i0KHQu9C+0LlfMSIgZGF0YS1uYW1lPSLQodC70L7QuSAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjUuNyA2NDUuNDQiPgoJPGRlZnM+CgkJPHN0eWxlPi5jbHMtMXtmaWxsOiM0YzdjNGQ7fS5jbHMtMntmaWxsOiM2ZmMwNTg7fTwvc3R5bGU+Cgk8L2RlZnM+Cgk8dGl0bGU+JG1vbF9zeW1ib2w8L3RpdGxlPgoJPHBvbHlnb24gY2xhc3M9ImNscy0xIgoJCQkgcG9pbnRzPSI4MC43OCAyMTcuNTYgMjE0LjAzIDExNC42MSAzNTEuMTIgMjIwLjUzIDQyNS43IDE2Mi45MSAyMTQuODQgMCAzLjk4IDE2Mi45MSA0LjM1IDE2My4xOSAzLjM1IDE2My45NiAzNDQuOTMgNDI3Ljg3IDIxMS42NyA1MzAuODMgNzQuNTggNDI0LjkxIDAgNDgyLjUzIDIxMC44NiA2NDUuNDQgNDIxLjcyIDQ4Mi41MyA0MjEuMDIgNDgxLjk5IDQyMi4wMyA0ODEuMjEgODAuNzggMjE3LjU2Ii8+Cgk8cG9seWdvbiBjbGFzcz0iY2xzLTIiIHBvaW50cz0iMjA5LjU0IDQ0MC44MyA1OC4zNiAzMjIuNzIgMjA5LjU0IDIwNC42MSAzNjcuMzQgMzIyLjcyIDIwOS41NCA0NDAuODMiLz4KPC9zdmc+Cg==');
            });
        };
        return $mol_app_supplies_domain_mock;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_domain_mock.prototype, "supplies", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "positions", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply_status", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "provider", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "consumer", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "ballance_unit", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "division", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "supply_group", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "store", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "person", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "contract", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "pay_method", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "debitor", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "position", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "attachments", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_app_supplies_domain_mock.prototype, "attachment", null);
    $.$mol_app_supplies_domain_mock = $mol_app_supplies_domain_mock;
})($ || ($ = {}));
//domain.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_card = (function (_super) {
        __extends($mol_app_supplies_card, _super);
        function $mol_app_supplies_card() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_card.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_card.prototype.status = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.code_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "code_title");
        };
        $mol_app_supplies_card.prototype.code = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Code_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.code_title(); };
                obj.content = function () { return _this.code(); };
            });
        };
        $mol_app_supplies_card.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_card.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_card.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_card.prototype.Cost_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
            });
        };
        $mol_app_supplies_card.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_card.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_card.prototype.Provider_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
            });
        };
        $mol_app_supplies_card.prototype.items = function () {
            return [].concat(this.Code_item(), this.Cost_item(), this.Provider_item());
        };
        $mol_app_supplies_card.prototype.Group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.items()); };
            });
        };
        $mol_app_supplies_card.prototype.Card = function () {
            var _this = this;
            return new $.$mol_card().setup(function (obj) {
                obj.status = function () { return _this.status(); };
                obj.Content = function () { return _this.Group(); };
            });
        };
        $mol_app_supplies_card.prototype.sub = function () {
            return [].concat(this.Card());
        };
        return $mol_app_supplies_card;
    }($.$mol_link));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Code_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Cost_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Provider_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_card.prototype, "Card", null);
    $.$mol_app_supplies_card = $mol_app_supplies_card;
})($ || ($ = {}));
//card.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_card = (function (_super) {
            __extends($mol_app_supplies_card, _super);
            function $mol_app_supplies_card() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_card.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_card.prototype.code = function () {
                return this.supply().id();
            };
            $mol_app_supplies_card.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_card.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_card.prototype.status = function () {
                return String(this.supply().status());
            };
            return $mol_app_supplies_card;
        }($.$mol_app_supplies_card));
        $mol.$mol_app_supplies_card = $mol_app_supplies_card;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//card.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_meter = (function (_super) {
        __extends($mol_meter, _super);
        function $mol_meter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_meter.prototype.width = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.height = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.left = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.right = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.bottom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_meter.prototype.top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        return $mol_meter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "width", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "height", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "bottom", null);
    __decorate([
        $.$mol_mem()
    ], $mol_meter.prototype, "top", null);
    $.$mol_meter = $mol_meter;
})($ || ($ = {}));
//meter.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_meter = (function (_super) {
            __extends($mol_meter, _super);
            function $mol_meter() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._request_id = 0;
                return _this;
            }
            $mol_meter.prototype.defer_task = function () {
                var _this = this;
                this._request_id = requestAnimationFrame(function () { return _this.update(); });
            };
            $mol_meter.prototype.dom_node = function () {
                return this.object_owner().dom_node();
            };
            $mol_meter.prototype.update = function () {
                var elem = this.render();
                var rect = elem.getBoundingClientRect();
                this.width(Math.round(rect.width));
                this.height(Math.round(rect.height));
                this.top(rect.top);
                this.bottom(rect.bottom);
                this.left(rect.left);
                this.right(rect.right);
                this.defer_task();
            };
            $mol_meter.prototype.destroyed = function (next) {
                if (next)
                    cancelAnimationFrame(this._request_id);
                return _super.prototype.destroyed.call(this, next);
            };
            $mol_meter.prototype.width = function (val) {
                var _this = this;
                if (val !== void 0)
                    return val;
                if (this.render().tagName === 'BODY')
                    return $.$mol_window.size().width;
                new $.$mol_defer(function () { return _this.update(); });
                return 0;
            };
            $mol_meter.prototype.height = function (val) {
                var _this = this;
                if (val !== void 0)
                    return val;
                if (this.render().tagName === 'BODY')
                    return $.$mol_window.size().height;
                new $.$mol_defer(function () { return _this.update(); });
                return 0;
            };
            return $mol_meter;
        }($.$mol_meter));
        __decorate([
            $.$mol_mem()
        ], $mol_meter.prototype, "width", null);
        __decorate([
            $.$mol_mem()
        ], $mol_meter.prototype, "height", null);
        $mol.$mol_meter = $mol_meter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//meter.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_ghost = (function (_super) {
        __extends($mol_ghost, _super);
        function $mol_ghost() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_ghost.prototype.Sub = function () {
            return new $.$mol_view();
        };
        return $mol_ghost;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_ghost.prototype, "Sub", null);
    $.$mol_ghost = $mol_ghost;
})($ || ($ = {}));
//ghost.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_ghost = (function (_super) {
            __extends($mol_ghost, _super);
            function $mol_ghost() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_ghost.prototype.dom_node = function () {
                return $.$mol_view_dom.node(this.Sub());
            };
            $mol_ghost.prototype.render = function () {
                this.Sub().render();
                return _super.prototype.render.call(this);
            };
            return $mol_ghost;
        }($.$mol_ghost));
        $mol.$mol_ghost = $mol_ghost;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//ghost.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_book = (function (_super) {
        __extends($mol_book, _super);
        function $mol_book() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book.prototype.pages_extended = function () {
            return [];
        };
        $mol_book.prototype.sub = function () {
            return this.pages_extended();
        };
        $mol_book.prototype.pages = function () {
            return [];
        };
        $mol_book.prototype.width = function () {
            return this.Meter().width();
        };
        $mol_book.prototype.Meter = function () {
            return new $.$mol_meter();
        };
        $mol_book.prototype.plugins = function () {
            return [].concat(this.Meter());
        };
        $mol_book.prototype.page = function (index) {
            return null;
        };
        $mol_book.prototype.page_visible = function (index) {
            return true;
        };
        $mol_book.prototype.Page = function (index) {
            var _this = this;
            return new $.$mol_book_page().setup(function (obj) {
                obj.Sub = function () { return _this.page(index); };
                obj.visible = function () { return _this.page_visible(index); };
            });
        };
        return $mol_book;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_book.prototype, "Meter", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_book.prototype, "Page", null);
    $.$mol_book = $mol_book;
})($ || ($ = {}));
(function ($) {
    var $mol_book_placeholder = (function (_super) {
        __extends($mol_book_placeholder, _super);
        function $mol_book_placeholder() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_placeholder.prototype.minimal_width = function () {
            return 400;
        };
        $mol_book_placeholder.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_book_placeholder;
    }($.$mol_view));
    $.$mol_book_placeholder = $mol_book_placeholder;
})($ || ($ = {}));
(function ($) {
    var $mol_book_page = (function (_super) {
        __extends($mol_book_page, _super);
        function $mol_book_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_book_page.prototype.visible = function () {
            return true;
        };
        $mol_book_page.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_book_page_visible": this.visible() }));
        };
        return $mol_book_page;
    }($.$mol_ghost));
    $.$mol_book_page = $mol_book_page;
})($ || ($ = {}));
//book.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_book = (function (_super) {
            __extends($mol_book, _super);
            function $mol_book() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_book.prototype.pages_filtered = function () {
                return this.pages().filter(function (page) { return page; });
            };
            $mol_book.prototype.break_point = function () {
                var pages = this.pages_filtered();
                var limit = this.width();
                var width = 0;
                for (var break_point = pages.length; break_point > 0; --break_point) {
                    width += pages[break_point - 1].minimal_width();
                    if (width > limit)
                        break;
                }
                if (break_point === pages.length)
                    --break_point;
                return break_point;
            };
            $mol_book.prototype.page = function (index) {
                return this.pages_filtered()[index];
            };
            $mol_book.prototype.page_visible = function (index) {
                return index >= this.break_point();
            };
            $mol_book.prototype.pages_extended = function () {
                var _this = this;
                return this.pages_filtered().map(function (page, index) { return _this.Page(index); });
            };
            $mol_book.prototype.title = function () {
                return this.pages_filtered()[this.pages_filtered().length - 1].title();
            };
            return $mol_book;
        }($.$mol_book));
        __decorate([
            $.$mol_mem()
        ], $mol_book.prototype, "pages_filtered", null);
        __decorate([
            $.$mol_mem()
        ], $mol_book.prototype, "break_point", null);
        $mol.$mol_book = $mol_book;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//book.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_string = (function (_super) {
        __extends($mol_string, _super);
        function $mol_string() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_string.prototype.dom_name = function () {
            return "input";
        };
        $mol_string.prototype.enabled = function () {
            return true;
        };
        $mol_string.prototype.disabled = function () {
            return false;
        };
        $mol_string.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_string.prototype.value_changed = function (val, force) {
            return this.value(val);
        };
        $mol_string.prototype.hint = function () {
            return "";
        };
        $mol_string.prototype.type = function (val, force) {
            return (val !== void 0) ? val : "text";
        };
        $mol_string.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "disabled": this.disabled(), "value": this.value_changed(), "placeholder": this.hint(), "type": this.type() }));
        };
        $mol_string.prototype.event_change = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_string.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "input": function (event) { return _this.event_change(event); } }));
        };
        return $mol_string;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "value_changed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "type", null);
    __decorate([
        $.$mol_mem()
    ], $mol_string.prototype, "event_change", null);
    $.$mol_string = $mol_string;
})($ || ($ = {}));
//string.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_string = (function (_super) {
            __extends($mol_string, _super);
            function $mol_string() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_string.prototype.event_change = function (next) {
                this.value(next.target.value.trim());
            };
            $mol_string.prototype.disabled = function () {
                return !this.enabled();
            };
            return $mol_string;
        }($.$mol_string));
        $mol.$mol_string = $mol_string;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//string.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form = (function (_super) {
        __extends($mol_form, _super);
        function $mol_form() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_form.prototype.submit_blocked = function () {
            return false;
        };
        $mol_form.prototype.form_fields = function () {
            return [];
        };
        $mol_form.prototype.Bar_fields = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.form_fields(); };
            });
        };
        $mol_form.prototype.buttons = function () {
            return [];
        };
        $mol_form.prototype.Bar_buttons = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.buttons(); };
            });
        };
        $mol_form.prototype.sub = function () {
            return [].concat(this.Bar_fields(), this.Bar_buttons());
        };
        return $mol_form;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "Bar_fields", null);
    __decorate([
        $.$mol_mem()
    ], $mol_form.prototype, "Bar_buttons", null);
    $.$mol_form = $mol_form;
})($ || ($ = {}));
//form.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_form = (function (_super) {
            __extends($mol_form, _super);
            function $mol_form() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_form.prototype.submit_blocked = function () {
                return this.form_fields().some(function (field) { return field.errors().length !== 0; });
            };
            return $mol_form;
        }($.$mol_form));
        __decorate([
            $.$mol_mem()
        ], $mol_form.prototype, "submit_blocked", null);
        $mol.$mol_form = $mol_form;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//form.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_form_field = (function (_super) {
        __extends($mol_form_field, _super);
        function $mol_form_field() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_form_field.prototype.name = function () {
            return "";
        };
        $mol_form_field.prototype.errors = function () {
            return [];
        };
        $mol_form_field.prototype.Bid = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.errors(); };
            });
        };
        $mol_form_field.prototype.label = function () {
            return [].concat(this.name(), this.Bid());
        };
        $mol_form_field.prototype.control = function () {
            return null;
        };
        $mol_form_field.prototype.Content = function () {
            return this.control();
        };
        return $mol_form_field;
    }($.$mol_labeler));
    __decorate([
        $.$mol_mem()
    ], $mol_form_field.prototype, "Bid", null);
    $.$mol_form_field = $mol_form_field;
})($ || ($ = {}));
//field.view.tree.js.map
;
var $;
(function ($) {
    var $mol_keyboard_code;
    (function ($mol_keyboard_code) {
        $mol_keyboard_code[$mol_keyboard_code["backspace"] = 8] = "backspace";
        $mol_keyboard_code[$mol_keyboard_code["tab"] = 9] = "tab";
        $mol_keyboard_code[$mol_keyboard_code["enter"] = 13] = "enter";
        $mol_keyboard_code[$mol_keyboard_code["shift"] = 16] = "shift";
        $mol_keyboard_code[$mol_keyboard_code["ctrl"] = 17] = "ctrl";
        $mol_keyboard_code[$mol_keyboard_code["alt"] = 18] = "alt";
        $mol_keyboard_code[$mol_keyboard_code["pause"] = 19] = "pause";
        $mol_keyboard_code[$mol_keyboard_code["capsLock"] = 20] = "capsLock";
        $mol_keyboard_code[$mol_keyboard_code["escape"] = 27] = "escape";
        $mol_keyboard_code[$mol_keyboard_code["space"] = 32] = "space";
        $mol_keyboard_code[$mol_keyboard_code["pageUp"] = 33] = "pageUp";
        $mol_keyboard_code[$mol_keyboard_code["pageDown"] = 34] = "pageDown";
        $mol_keyboard_code[$mol_keyboard_code["end"] = 35] = "end";
        $mol_keyboard_code[$mol_keyboard_code["home"] = 36] = "home";
        $mol_keyboard_code[$mol_keyboard_code["left"] = 37] = "left";
        $mol_keyboard_code[$mol_keyboard_code["up"] = 38] = "up";
        $mol_keyboard_code[$mol_keyboard_code["right"] = 39] = "right";
        $mol_keyboard_code[$mol_keyboard_code["down"] = 40] = "down";
        $mol_keyboard_code[$mol_keyboard_code["insert"] = 45] = "insert";
        $mol_keyboard_code[$mol_keyboard_code["delete"] = 46] = "delete";
        $mol_keyboard_code[$mol_keyboard_code["key0"] = 48] = "key0";
        $mol_keyboard_code[$mol_keyboard_code["key1"] = 49] = "key1";
        $mol_keyboard_code[$mol_keyboard_code["key2"] = 50] = "key2";
        $mol_keyboard_code[$mol_keyboard_code["key3"] = 51] = "key3";
        $mol_keyboard_code[$mol_keyboard_code["key4"] = 52] = "key4";
        $mol_keyboard_code[$mol_keyboard_code["key5"] = 53] = "key5";
        $mol_keyboard_code[$mol_keyboard_code["key6"] = 54] = "key6";
        $mol_keyboard_code[$mol_keyboard_code["key7"] = 55] = "key7";
        $mol_keyboard_code[$mol_keyboard_code["key8"] = 56] = "key8";
        $mol_keyboard_code[$mol_keyboard_code["key9"] = 57] = "key9";
        $mol_keyboard_code[$mol_keyboard_code["A"] = 65] = "A";
        $mol_keyboard_code[$mol_keyboard_code["B"] = 66] = "B";
        $mol_keyboard_code[$mol_keyboard_code["C"] = 67] = "C";
        $mol_keyboard_code[$mol_keyboard_code["D"] = 68] = "D";
        $mol_keyboard_code[$mol_keyboard_code["E"] = 69] = "E";
        $mol_keyboard_code[$mol_keyboard_code["F"] = 70] = "F";
        $mol_keyboard_code[$mol_keyboard_code["G"] = 71] = "G";
        $mol_keyboard_code[$mol_keyboard_code["H"] = 72] = "H";
        $mol_keyboard_code[$mol_keyboard_code["I"] = 73] = "I";
        $mol_keyboard_code[$mol_keyboard_code["J"] = 74] = "J";
        $mol_keyboard_code[$mol_keyboard_code["K"] = 75] = "K";
        $mol_keyboard_code[$mol_keyboard_code["L"] = 76] = "L";
        $mol_keyboard_code[$mol_keyboard_code["M"] = 77] = "M";
        $mol_keyboard_code[$mol_keyboard_code["N"] = 78] = "N";
        $mol_keyboard_code[$mol_keyboard_code["O"] = 79] = "O";
        $mol_keyboard_code[$mol_keyboard_code["P"] = 80] = "P";
        $mol_keyboard_code[$mol_keyboard_code["Q"] = 81] = "Q";
        $mol_keyboard_code[$mol_keyboard_code["R"] = 82] = "R";
        $mol_keyboard_code[$mol_keyboard_code["S"] = 83] = "S";
        $mol_keyboard_code[$mol_keyboard_code["T"] = 84] = "T";
        $mol_keyboard_code[$mol_keyboard_code["U"] = 85] = "U";
        $mol_keyboard_code[$mol_keyboard_code["V"] = 86] = "V";
        $mol_keyboard_code[$mol_keyboard_code["W"] = 87] = "W";
        $mol_keyboard_code[$mol_keyboard_code["X"] = 88] = "X";
        $mol_keyboard_code[$mol_keyboard_code["Y"] = 89] = "Y";
        $mol_keyboard_code[$mol_keyboard_code["Z"] = 90] = "Z";
        $mol_keyboard_code[$mol_keyboard_code["metaLeft"] = 91] = "metaLeft";
        $mol_keyboard_code[$mol_keyboard_code["metaRight"] = 92] = "metaRight";
        $mol_keyboard_code[$mol_keyboard_code["select"] = 93] = "select";
        $mol_keyboard_code[$mol_keyboard_code["numpad0"] = 96] = "numpad0";
        $mol_keyboard_code[$mol_keyboard_code["numpad1"] = 97] = "numpad1";
        $mol_keyboard_code[$mol_keyboard_code["numpad2"] = 98] = "numpad2";
        $mol_keyboard_code[$mol_keyboard_code["numpad3"] = 99] = "numpad3";
        $mol_keyboard_code[$mol_keyboard_code["numpad4"] = 100] = "numpad4";
        $mol_keyboard_code[$mol_keyboard_code["numpad5"] = 101] = "numpad5";
        $mol_keyboard_code[$mol_keyboard_code["numpad6"] = 102] = "numpad6";
        $mol_keyboard_code[$mol_keyboard_code["numpad7"] = 103] = "numpad7";
        $mol_keyboard_code[$mol_keyboard_code["numpad8"] = 104] = "numpad8";
        $mol_keyboard_code[$mol_keyboard_code["numpad9"] = 105] = "numpad9";
        $mol_keyboard_code[$mol_keyboard_code["multiply"] = 106] = "multiply";
        $mol_keyboard_code[$mol_keyboard_code["add"] = 107] = "add";
        $mol_keyboard_code[$mol_keyboard_code["subtract"] = 109] = "subtract";
        $mol_keyboard_code[$mol_keyboard_code["decimal"] = 110] = "decimal";
        $mol_keyboard_code[$mol_keyboard_code["divide"] = 111] = "divide";
        $mol_keyboard_code[$mol_keyboard_code["F1"] = 112] = "F1";
        $mol_keyboard_code[$mol_keyboard_code["F2"] = 113] = "F2";
        $mol_keyboard_code[$mol_keyboard_code["F3"] = 114] = "F3";
        $mol_keyboard_code[$mol_keyboard_code["F4"] = 115] = "F4";
        $mol_keyboard_code[$mol_keyboard_code["F5"] = 116] = "F5";
        $mol_keyboard_code[$mol_keyboard_code["F6"] = 117] = "F6";
        $mol_keyboard_code[$mol_keyboard_code["F7"] = 118] = "F7";
        $mol_keyboard_code[$mol_keyboard_code["F8"] = 119] = "F8";
        $mol_keyboard_code[$mol_keyboard_code["F9"] = 120] = "F9";
        $mol_keyboard_code[$mol_keyboard_code["F10"] = 121] = "F10";
        $mol_keyboard_code[$mol_keyboard_code["F11"] = 122] = "F11";
        $mol_keyboard_code[$mol_keyboard_code["F12"] = 123] = "F12";
        $mol_keyboard_code[$mol_keyboard_code["numLock"] = 144] = "numLock";
        $mol_keyboard_code[$mol_keyboard_code["scrollLock"] = 145] = "scrollLock";
        $mol_keyboard_code[$mol_keyboard_code["semicolon"] = 186] = "semicolon";
        $mol_keyboard_code[$mol_keyboard_code["equals"] = 187] = "equals";
        $mol_keyboard_code[$mol_keyboard_code["comma"] = 188] = "comma";
        $mol_keyboard_code[$mol_keyboard_code["dash"] = 189] = "dash";
        $mol_keyboard_code[$mol_keyboard_code["period"] = 190] = "period";
        $mol_keyboard_code[$mol_keyboard_code["forwardSlash"] = 191] = "forwardSlash";
        $mol_keyboard_code[$mol_keyboard_code["graveAccent"] = 192] = "graveAccent";
        $mol_keyboard_code[$mol_keyboard_code["bracketOpen"] = 219] = "bracketOpen";
        $mol_keyboard_code[$mol_keyboard_code["slashBack"] = 220] = "slashBack";
        $mol_keyboard_code[$mol_keyboard_code["bracketClose"] = 221] = "bracketClose";
        $mol_keyboard_code[$mol_keyboard_code["quoteSingle"] = 222] = "quoteSingle";
    })($mol_keyboard_code = $.$mol_keyboard_code || ($.$mol_keyboard_code = {}));
})($ || ($ = {}));
//code.js.map
;
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        $.$mol_test({
            'handle clicks by default': function () {
                var clicked = false;
                var clicker = new $mol.$mol_button;
                clicker.event_click = function (event) { clicked = true; };
                var element = clicker.render();
                var event = $.$mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $.$mol_assert_ok(clicked);
            },
            'no handle clicks if disabled': function () {
                var clicked = false;
                var clicker = new $mol.$mol_button;
                clicker.event_click = function (event) { clicked = true; };
                clicker.enabled = function () { return false; };
                var element = clicker.render();
                var event = $.$mol_dom_context.document.createEvent('mouseevent');
                event.initEvent('click', true, true);
                element.dispatchEvent(event);
                $.$mol_assert_not(clicked);
            },
        });
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_button = (function (_super) {
        __extends($mol_button, _super);
        function $mol_button() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_button.prototype.enabled = function () {
            return true;
        };
        $mol_button.prototype.event_click = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event_activate = function (event, force) {
            return this.event_click(event);
        };
        $mol_button.prototype.evenet_key_press = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_button.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "click": function (event) { return _this.event_activate(event); }, "keypress": function (event) { return _this.evenet_key_press(event); } }));
        };
        $mol_button.prototype.disabled = function () {
            return false;
        };
        $mol_button.prototype.tab_index = function () {
            return "0";
        };
        $mol_button.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "disabled": this.disabled(), "role": "button", "tabindex": this.tab_index() }));
        };
        $mol_button.prototype.sub = function () {
            return [].concat(this.title());
        };
        return $mol_button;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "event_activate", null);
    __decorate([
        $.$mol_mem()
    ], $mol_button.prototype, "evenet_key_press", null);
    $.$mol_button = $mol_button;
})($ || ($ = {}));
//button.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_button = (function (_super) {
            __extends($mol_button, _super);
            function $mol_button() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_button.prototype.disabled = function () {
                return !this.enabled();
            };
            $mol_button.prototype.event_activate = function (next) {
                if (!this.enabled())
                    return;
                this.event_click(next);
            };
            $mol_button.prototype.evenet_key_press = function (event) {
                if (event.keyCode === $.$mol_keyboard_code.enter)
                    return this.event_activate(event);
            };
            $mol_button.prototype.tab_index = function () {
                return this.enabled() ? _super.prototype.tab_index.call(this) : null;
            };
            return $mol_button;
        }($.$mol_button));
        $mol.$mol_button = $mol_button;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//button.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_button_major = (function (_super) {
        __extends($mol_button_major, _super);
        function $mol_button_major() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_major;
    }($.$mol_button));
    $.$mol_button_major = $mol_button_major;
})($ || ($ = {}));
(function ($) {
    var $mol_button_minor = (function (_super) {
        __extends($mol_button_minor, _super);
        function $mol_button_minor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_minor;
    }($.$mol_button));
    $.$mol_button_minor = $mol_button_minor;
})($ || ($ = {}));
(function ($) {
    var $mol_button_danger = (function (_super) {
        __extends($mol_button_danger, _super);
        function $mol_button_danger() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_button_danger;
    }($.$mol_button));
    $.$mol_button_danger = $mol_button_danger;
})($ || ($ = {}));
//button_types.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_enter = (function (_super) {
        __extends($mol_app_supplies_enter, _super);
        function $mol_app_supplies_enter() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_enter.prototype.entered = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_enter.prototype.loginLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "loginLabel");
        };
        $mol_app_supplies_enter.prototype.loginErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.login = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.loginControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.login(val); };
            });
        };
        $mol_app_supplies_enter.prototype.loginField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.loginLabel(); };
                obj.errors = function () { return _this.loginErrors(); };
                obj.control = function () { return _this.loginControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.passwordLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "passwordLabel");
        };
        $mol_app_supplies_enter.prototype.passwordErrors = function () {
            return [];
        };
        $mol_app_supplies_enter.prototype.password = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_enter.prototype.passControl = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.password(val); };
                obj.type = function () { return "password"; };
            });
        };
        $mol_app_supplies_enter.prototype.passwordField = function () {
            var _this = this;
            return new $.$mol_form_field().setup(function (obj) {
                obj.name = function () { return _this.passwordLabel(); };
                obj.errors = function () { return _this.passwordErrors(); };
                obj.control = function () { return _this.passControl(); };
            });
        };
        $mol_app_supplies_enter.prototype.submitLabel = function () {
            return $.$mol_locale.text(this.locale_contexts(), "submitLabel");
        };
        $mol_app_supplies_enter.prototype.event_submit = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_enter.prototype.submit_blocked = function () {
            return false;
        };
        $mol_app_supplies_enter.prototype.submit = function () {
            var _this = this;
            return new $.$mol_button_major().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.submitLabel()); };
                obj.event_click = function (val) { return _this.event_submit(val); };
                obj.disabled = function () { return _this.submit_blocked(); };
            });
        };
        $mol_app_supplies_enter.prototype.form = function () {
            var _this = this;
            return new $.$mol_form().setup(function (obj) {
                obj.form_fields = function () { return [].concat(_this.loginField(), _this.passwordField()); };
                obj.buttons = function () { return [].concat(_this.submit()); };
            });
        };
        $mol_app_supplies_enter.prototype.sub = function () {
            return [].concat(this.form());
        };
        return $mol_app_supplies_enter;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "login", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "loginControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "loginField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "password", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "passControl", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "passwordField", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "event_submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "submit", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_enter.prototype, "form", null);
    $.$mol_app_supplies_enter = $mol_app_supplies_enter;
})($ || ($ = {}));
//enter.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_enter = (function (_super) {
            __extends($mol_app_supplies_enter, _super);
            function $mol_app_supplies_enter() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_enter.prototype.event_submit = function () {
                this.entered(true);
            };
            return $mol_app_supplies_enter;
        }($.$mol_app_supplies_enter));
        $mol.$mol_app_supplies_enter = $mol_app_supplies_enter;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//enter.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_state_session = (function (_super) {
        __extends($mol_state_session, _super);
        function $mol_state_session() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_state_session.value = function (key, next) {
            if (next === void 0)
                return (key in this._storage) ? this._storage[key] : null;
            if (next === null)
                delete this._storage[key];
            else
                this._storage[key] = next;
            return next;
        };
        $mol_state_session.prototype.prefix = function () { return ''; };
        $mol_state_session.prototype.value = function (key, next) {
            return $mol_state_session.value(this.prefix() + '.' + key, next);
        };
        return $mol_state_session;
    }($.$mol_object));
    $mol_state_session._storage = Object.create(null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_state_session, "value", null);
    $.$mol_state_session = $mol_state_session;
})($ || ($ = {}));
//session.node.js.map
;
var $;
(function ($) {
    $.$mol_test({
        'null by default': function () {
            var key = String(Math.random());
            $.$mol_assert_equal($.$mol_state_session.value(key), null);
        },
        'storing': function () {
            var key = String(Math.random());
            $.$mol_state_session.value(key, '$mol_state_session_test');
            $.$mol_assert_equal($.$mol_state_session.value(key), '$mol_state_session_test');
            $.$mol_state_session.value(key, null);
            $.$mol_assert_equal($.$mol_state_session.value(key), null);
        },
    });
})($ || ($ = {}));
//session.test.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_scroll = (function (_super) {
        __extends($mol_scroll, _super);
        function $mol_scroll() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_scroll.prototype.minimal_height = function () {
            return 0;
        };
        $mol_scroll.prototype.scroll_top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_left = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_bottom = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.scroll_right = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_scroll.prototype.field = function () {
            return (__assign({}, _super.prototype.field.call(this), { "scrollTop": this.scroll_top(), "scrollLeft": this.scroll_left(), "scrollBottom": this.scroll_bottom(), "scrollRight": this.scroll_right() }));
        };
        $mol_scroll.prototype.event_scroll = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_scroll.prototype.event_async = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event_async.call(this), { "scroll": function (event) { return _this.event_scroll(event); } }));
        };
        return $mol_scroll;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_bottom", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "scroll_right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_scroll.prototype, "event_scroll", null);
    $.$mol_scroll = $mol_scroll;
})($ || ($ = {}));
//scroll.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    $.$mol_view_context.$mol_scroll_scroll_top = function () { return 0; };
    $.$mol_view_context.$mol_scroll_scroll_left = function () { return 0; };
    $.$mol_view_context.$mol_scroll_moving = function () { return false; };
})($ || ($ = {}));
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_scroll = (function (_super) {
            __extends($mol_scroll, _super);
            function $mol_scroll() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._moving_task_frame = 0;
                return _this;
            }
            $mol_scroll.prototype.scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".scroll_top()", next) || 0;
            };
            $mol_scroll.prototype.scroll_left = function (next) {
                return $.$mol_state_session.value(this + ".scroll_left()", next) || 0;
            };
            $mol_scroll.prototype.scroll_bottom = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.scroll_right = function (next) {
                return next || 0;
            };
            $mol_scroll.prototype.event_scroll = function (next) {
                var _this = this;
                this.moving(true);
                this.moving_task_stop();
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    var top = Math.max(0, el.scrollTop);
                    var left = Math.max(0, el.scrollLeft);
                    _this.scroll_top(top);
                    _this.scroll_left(left);
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - top - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - left - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.event_repos = function (next) {
                var _this = this;
                new $.$mol_defer(function () {
                    var el = _this.dom_node();
                    _this.scroll_bottom(Math.max(0, el.scrollHeight - _this.scroll_top() - el.offsetHeight));
                    _this.scroll_right(Math.max(0, el.scrollWidth - _this.scroll_left() - el.offsetWidth));
                });
            };
            $mol_scroll.prototype.moving_task_stop = function () {
                var _this = this;
                cancelAnimationFrame(this._moving_task_frame);
                this._moving_task_frame = requestAnimationFrame(function () {
                    _this.moving(false);
                });
            };
            $mol_scroll.prototype.moving = function (next) {
                return next || false;
            };
            $mol_scroll.prototype.context_sub = function () {
                var _this = this;
                var context = this.context();
                var subContext = Object.create(context);
                subContext.$mol_view_visible_height = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_height();
                    return _this.scroll_top() + Math.min(sizeWin.height, limit);
                };
                subContext.$mol_view_visible_width = function () {
                    var sizeWin = $.$mol_window.size();
                    var limit = context.$mol_view_visible_width();
                    return _this.scroll_left() + Math.min(sizeWin.width, limit);
                };
                subContext.$mol_scroll_scroll_top = function () { return _this.scroll_top(); };
                subContext.$mol_scroll_scroll_left = function () { return _this.scroll_left(); };
                subContext.$mol_scroll_moving = function () { return _this.moving(); };
                return subContext;
            };
            return $mol_scroll;
        }($.$mol_scroll));
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_bottom", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "scroll_right", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "moving", null);
        __decorate([
            $.$mol_mem()
        ], $mol_scroll.prototype, "context_sub", null);
        $mol.$mol_scroll = $mol_scroll;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//scroll.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_page = (function (_super) {
        __extends($mol_page, _super);
        function $mol_page() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_page.prototype.Title = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.title()); };
            });
        };
        $mol_page.prototype.tools = function () {
            return [];
        };
        $mol_page.prototype.head = function () {
            return [].concat(this.Title(), this.tools());
        };
        $mol_page.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.head(); };
            });
        };
        $mol_page.prototype.body_scroll_top = function (val, force) {
            return (val !== void 0) ? val : 0;
        };
        $mol_page.prototype.body = function () {
            return [];
        };
        $mol_page.prototype.Body = function () {
            var _this = this;
            return new $.$mol_scroll().setup(function (obj) {
                obj.scroll_top = function (val) { return _this.body_scroll_top(val); };
                obj.sub = function () { return _this.body(); };
            });
        };
        $mol_page.prototype.foot = function () {
            return [];
        };
        $mol_page.prototype.Foot = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.foot(); };
            });
        };
        $mol_page.prototype.sub = function () {
            return [].concat(this.Head(), this.Body(), this.Foot());
        };
        return $mol_page;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Title", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Head", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "body_scroll_top", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Body", null);
    __decorate([
        $.$mol_mem()
    ], $mol_page.prototype, "Foot", null);
    $.$mol_page = $mol_page;
})($ || ($ = {}));
//page.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_page = (function (_super) {
            __extends($mol_page, _super);
            function $mol_page() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_page.prototype.body_scroll_top = function (next) {
                return $.$mol_state_session.value(this + ".body_scroll_top()", next) || 0;
            };
            return $mol_page;
        }($.$mol_page));
        $mol.$mol_page = $mol_page;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//page.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_bar = (function (_super) {
        __extends($mol_bar, _super);
        function $mol_bar() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return $mol_bar;
    }($.$mol_view));
    $.$mol_bar = $mol_bar;
})($ || ($ = {}));
//bar.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var $;
(function ($) {
    var $mol_svg = (function (_super) {
        __extends($mol_svg, _super);
        function $mol_svg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg.prototype.dom_name_space = function () {
            return "http://www.w3.org/2000/svg";
        };
        return $mol_svg;
    }($.$mol_view));
    $.$mol_svg = $mol_svg;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_root = (function (_super) {
        __extends($mol_svg_root, _super);
        function $mol_svg_root() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_root.prototype.dom_name = function () {
            return "svg";
        };
        $mol_svg_root.prototype.view_box = function () {
            return "0 0 100 100";
        };
        $mol_svg_root.prototype.aspect = function () {
            return "";
        };
        $mol_svg_root.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "viewBox": this.view_box(), "preserveAspectRatio": this.aspect() }));
        };
        return $mol_svg_root;
    }($.$mol_svg));
    $.$mol_svg_root = $mol_svg_root;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_group = (function (_super) {
        __extends($mol_svg_group, _super);
        function $mol_svg_group() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_group.prototype.dom_name = function () {
            return "g";
        };
        return $mol_svg_group;
    }($.$mol_svg));
    $.$mol_svg_group = $mol_svg_group;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_line = (function (_super) {
        __extends($mol_svg_line, _super);
        function $mol_svg_line() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_line.prototype.dom_name = function () {
            return "line";
        };
        $mol_svg_line.prototype.from = function () {
            return [];
        };
        $mol_svg_line.prototype.to = function () {
            return [];
        };
        $mol_svg_line.prototype.pos = function () {
            return [].concat(this.from(), this.to());
        };
        $mol_svg_line.prototype.from_x = function () {
            return "";
        };
        $mol_svg_line.prototype.from_y = function () {
            return "";
        };
        $mol_svg_line.prototype.to_x = function () {
            return "";
        };
        $mol_svg_line.prototype.to_y = function () {
            return "";
        };
        $mol_svg_line.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "x1": this.from_x(), "y1": this.from_y(), "x2": this.to_x(), "y2": this.to_y() }));
        };
        return $mol_svg_line;
    }($.$mol_svg));
    $.$mol_svg_line = $mol_svg_line;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_path = (function (_super) {
        __extends($mol_svg_path, _super);
        function $mol_svg_path() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_path.prototype.dom_name = function () {
            return "path";
        };
        $mol_svg_path.prototype.geometry = function () {
            return "";
        };
        $mol_svg_path.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "d": this.geometry() }));
        };
        return $mol_svg_path;
    }($.$mol_svg));
    $.$mol_svg_path = $mol_svg_path;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_circle = (function (_super) {
        __extends($mol_svg_circle, _super);
        function $mol_svg_circle() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_circle.prototype.dom_name = function () {
            return "circle";
        };
        $mol_svg_circle.prototype.pos = function () {
            return [];
        };
        $mol_svg_circle.prototype.radius = function () {
            return ".5%";
        };
        $mol_svg_circle.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_circle.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_circle.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "r": this.radius(), "cx": this.pos_x(), "cy": this.pos_y() }));
        };
        return $mol_svg_circle;
    }($.$mol_svg));
    $.$mol_svg_circle = $mol_svg_circle;
})($ || ($ = {}));
(function ($) {
    var $mol_svg_text = (function (_super) {
        __extends($mol_svg_text, _super);
        function $mol_svg_text() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_svg_text.prototype.dom_name = function () {
            return "text";
        };
        $mol_svg_text.prototype.pos = function () {
            return [];
        };
        $mol_svg_text.prototype.pos_x = function () {
            return "";
        };
        $mol_svg_text.prototype.pos_y = function () {
            return "";
        };
        $mol_svg_text.prototype.align = function () {
            return "middle";
        };
        $mol_svg_text.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "x": this.pos_x(), "y": this.pos_y(), "text-anchor": this.align() }));
        };
        $mol_svg_text.prototype.text = function () {
            return "";
        };
        $mol_svg_text.prototype.sub = function () {
            return [].concat(this.text());
        };
        return $mol_svg_text;
    }($.$mol_svg));
    $.$mol_svg_text = $mol_svg_text;
})($ || ($ = {}));
//svg.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_svg_line = (function (_super) {
            __extends($mol_svg_line, _super);
            function $mol_svg_line() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_line.prototype.from = function () {
                return this.pos()[0];
            };
            $mol_svg_line.prototype.from_x = function () {
                return this.from()[0];
            };
            $mol_svg_line.prototype.from_y = function () {
                return this.from()[1];
            };
            $mol_svg_line.prototype.to = function () {
                return this.pos()[1];
            };
            $mol_svg_line.prototype.to_x = function () {
                return this.to()[0];
            };
            $mol_svg_line.prototype.to_y = function () {
                return this.to()[1];
            };
            return $mol_svg_line;
        }($.$mol_svg_line));
        $mol.$mol_svg_line = $mol_svg_line;
        var $mol_svg_circle = (function (_super) {
            __extends($mol_svg_circle, _super);
            function $mol_svg_circle() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_circle.prototype.pos_x = function () {
                return this.pos()[0];
            };
            $mol_svg_circle.prototype.pos_y = function () {
                return this.pos()[1];
            };
            return $mol_svg_circle;
        }($.$mol_svg_circle));
        $mol.$mol_svg_circle = $mol_svg_circle;
        var $mol_svg_text = (function (_super) {
            __extends($mol_svg_text, _super);
            function $mol_svg_text() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_svg_text.prototype.pos_x = function () {
                return this.pos()[0];
            };
            $mol_svg_text.prototype.pos_y = function () {
                return this.pos()[1];
            };
            return $mol_svg_text;
        }($.$mol_svg_text));
        $mol.$mol_svg_text = $mol_svg_text;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//svg.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_icon = (function (_super) {
        __extends($mol_icon, _super);
        function $mol_icon() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon.prototype.view_box = function () {
            return "0 0 24 24";
        };
        $mol_icon.prototype.path = function () {
            return "";
        };
        $mol_icon.prototype.Path = function () {
            var _this = this;
            return new $.$mol_svg_path().setup(function (obj) {
                obj.geometry = function () { return _this.path(); };
            });
        };
        $mol_icon.prototype.sub = function () {
            return [].concat(this.Path());
        };
        return $mol_icon;
    }($.$mol_svg_root));
    __decorate([
        $.$mol_mem()
    ], $mol_icon.prototype, "Path", null);
    $.$mol_icon = $mol_icon;
})($ || ($ = {}));
//icon.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_cross = (function (_super) {
        __extends($mol_icon_cross, _super);
        function $mol_icon_cross() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_cross.prototype.path = function () {
            return "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z";
        };
        return $mol_icon_cross;
    }($.$mol_icon));
    $.$mol_icon_cross = $mol_icon_cross;
})($ || ($ = {}));
//cross.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_pop = (function (_super) {
        __extends($mol_pop, _super);
        function $mol_pop() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_pop.prototype.showed = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_pop.prototype.Anchor = function () {
            return null;
        };
        $mol_pop.prototype.align = function () {
            return "bottom_center";
        };
        $mol_pop.prototype.bubble_content = function () {
            return [];
        };
        $mol_pop.prototype.height_max = function () {
            return 9999;
        };
        $mol_pop.prototype.Bubble = function () {
            var _this = this;
            return new $.$mol_pop_tip().setup(function (obj) {
                obj.align = function () { return _this.align(); };
                obj.content = function () { return _this.bubble_content(); };
                obj.height_max = function () { return _this.height_max(); };
            });
        };
        $mol_pop.prototype.sub = function () {
            return [].concat(this.Anchor(), this.Bubble());
        };
        return $mol_pop;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_pop.prototype, "showed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_pop.prototype, "Bubble", null);
    $.$mol_pop = $mol_pop;
})($ || ($ = {}));
(function ($) {
    var $mol_pop_tip = (function (_super) {
        __extends($mol_pop_tip, _super);
        function $mol_pop_tip() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_pop_tip.prototype.content = function () {
            return [];
        };
        $mol_pop_tip.prototype.sub = function () {
            return this.content();
        };
        $mol_pop_tip.prototype.height_max = function () {
            return 9999;
        };
        $mol_pop_tip.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "maxHeight": this.height_max() }));
        };
        $mol_pop_tip.prototype.align = function () {
            return "";
        };
        $mol_pop_tip.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_pop_align": this.align() }));
        };
        return $mol_pop_tip;
    }($.$mol_scroll));
    $.$mol_pop_tip = $mol_pop_tip;
})($ || ($ = {}));
//pop.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_pop = (function (_super) {
            __extends($mol_pop, _super);
            function $mol_pop() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_pop.prototype.sub = function () {
                return [
                    this.Anchor(),
                    this.showed() ? this.Bubble() : null,
                ];
            };
            $mol_pop.prototype.height_max = function () {
                return this.context().$mol_view_visible_height() * 0.3;
            };
            return $mol_pop;
        }($.$mol_pop));
        $mol.$mol_pop = $mol_pop;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//pop.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_dimmer = (function (_super) {
        __extends($mol_dimmer, _super);
        function $mol_dimmer() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_dimmer.prototype.haystack = function () {
            return "";
        };
        $mol_dimmer.prototype.needle = function () {
            return "";
        };
        $mol_dimmer.prototype.parts = function () {
            return [];
        };
        $mol_dimmer.prototype.sub = function () {
            return this.parts();
        };
        $mol_dimmer.prototype.string = function (id) {
            return "";
        };
        $mol_dimmer.prototype.low = function (id) {
            var _this = this;
            return new $.$mol_dimmer_low().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.string(id)); };
            });
        };
        return $mol_dimmer;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_dimmer.prototype, "low", null);
    $.$mol_dimmer = $mol_dimmer;
})($ || ($ = {}));
(function ($) {
    var $mol_dimmer_low = (function (_super) {
        __extends($mol_dimmer_low, _super);
        function $mol_dimmer_low() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_dimmer_low.prototype.dom_name = function () {
            return "span";
        };
        return $mol_dimmer_low;
    }($.$mol_view));
    $.$mol_dimmer_low = $mol_dimmer_low;
})($ || ($ = {}));
//dimmer.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_dimmer = (function (_super) {
            __extends($mol_dimmer, _super);
            function $mol_dimmer() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_dimmer.prototype.parts = function () {
                var needle = this.needle();
                if (!needle)
                    return [this.haystack()];
                var chunks = [];
                var strings = this.strings();
                for (var index = 0; index < strings.length; index++) {
                    if (index > 0)
                        chunks.push(this.needle());
                    if (strings[index] !== '')
                        chunks.push(this.low(index));
                }
                return chunks;
            };
            $mol_dimmer.prototype.strings = function () {
                return this.haystack().split(this.needle());
            };
            $mol_dimmer.prototype.string = function (index) {
                return this.strings()[index];
            };
            return $mol_dimmer;
        }($.$mol_dimmer));
        __decorate([
            $.$mol_mem()
        ], $mol_dimmer.prototype, "strings", null);
        $mol.$mol_dimmer = $mol_dimmer;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//dimmer.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_nav = (function (_super) {
        __extends($mol_nav, _super);
        function $mol_nav() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_nav.prototype.cycle = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_nav.prototype.keys_x = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        $mol_nav.prototype.keys_y = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        $mol_nav.prototype.current_x = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_nav.prototype.current_y = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_nav.prototype.event_up = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_down = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_left = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_right = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event_key = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_nav.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "keydown": function (event) { return _this.event_key(event); } }));
        };
        $mol_nav.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_nav_x": this.current_x(), "mol_nav_y": this.current_y() }));
        };
        return $mol_nav;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "cycle", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "keys_x", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "keys_y", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "current_x", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "current_y", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "event_up", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "event_down", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "event_left", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "event_right", null);
    __decorate([
        $.$mol_mem()
    ], $mol_nav.prototype, "event_key", null);
    $.$mol_nav = $mol_nav;
})($ || ($ = {}));
//nav.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_nav = (function (_super) {
            __extends($mol_nav, _super);
            function $mol_nav() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_nav.prototype.dom_node = function () {
                return $.$mol_view_dom.mount(this, this.object_owner().dom_node());
            };
            $mol_nav.prototype.event_key = function (event) {
                if (event.defaultPrevented)
                    return;
                switch (event.keyCode) {
                    case $.$mol_keyboard_code.up: return this.event_up(event);
                    case $.$mol_keyboard_code.down: return this.event_down(event);
                    case $.$mol_keyboard_code.left: return this.event_left(event);
                    case $.$mol_keyboard_code.right: return this.event_right(event);
                }
            };
            $mol_nav.prototype.event_up = function (event) {
                var keys = this.keys_y();
                if (keys.length < 2)
                    return;
                var index_y = this.index_y();
                var index_old = index_y === null ? 0 : index_y;
                var index_new = (index_old + keys.length - 1) % keys.length;
                if (index_old === 0 && !this.cycle())
                    return;
                event.preventDefault();
                this.current_y(this.keys_y()[index_new]);
            };
            $mol_nav.prototype.event_down = function (event) {
                var keys = this.keys_y();
                if (keys.length < 2)
                    return;
                var index_y = this.index_y();
                var index_old = index_y === null ? keys.length - 1 : index_y;
                var index_new = (index_old + 1) % keys.length;
                if (index_new === (keys.length - 1) && !this.cycle())
                    return;
                event.preventDefault();
                this.current_y(this.keys_y()[index_new]);
            };
            $mol_nav.prototype.event_left = function (event) {
                var keys = this.keys_x();
                if (keys.length < 2)
                    return;
                var index_x = this.index_x();
                var index_old = index_x === null ? 0 : index_x;
                var index_new = (index_old + keys.length - 1) % keys.length;
                if (index_old === 0 && !this.cycle())
                    return;
                event.preventDefault();
                this.current_x(this.keys_x()[index_new]);
            };
            $mol_nav.prototype.event_right = function (event) {
                var keys = this.keys_x();
                if (keys.length < 2)
                    return;
                var index_x = this.index_x();
                var index_old = index_x === null ? keys.length - 1 : index_x;
                var index_new = (index_old + 1) % keys.length;
                if (index_new === keys.length && !this.cycle())
                    return;
                event.preventDefault();
                this.current_x(this.keys_x()[index_new]);
            };
            $mol_nav.prototype.index_y = function () {
                var index = this.keys_y().indexOf(this.current_y());
                if (index < 0)
                    return null;
                return index;
            };
            $mol_nav.prototype.index_x = function () {
                var index = this.keys_x().indexOf(this.current_x());
                if (index < 0)
                    return null;
                return index;
            };
            return $mol_nav;
        }($.$mol_nav));
        $mol.$mol_nav = $mol_nav;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//nav.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_chevron = (function (_super) {
        __extends($mol_icon_chevron, _super);
        function $mol_icon_chevron() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_chevron.prototype.path = function () {
            return "M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z";
        };
        return $mol_icon_chevron;
    }($.$mol_icon));
    $.$mol_icon_chevron = $mol_icon_chevron;
})($ || ($ = {}));
//chevron.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_select = (function (_super) {
        __extends($mol_select, _super);
        function $mol_select() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_select.prototype.dictionary = function () {
            return ({});
        };
        $mol_select.prototype.options = function () {
            return [];
        };
        $mol_select.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_select.prototype.searchable = function () {
            return true;
        };
        $mol_select.prototype.search_breakpoint = function () {
            return 7;
        };
        $mol_select.prototype.clearable = function () {
            return true;
        };
        $mol_select.prototype.event_select = function (id, event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_select.prototype.option_label = function (id) {
            return "";
        };
        $mol_select.prototype.filter_pattern = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_select.prototype.Option_label = function (id) {
            var _this = this;
            return new $.$mol_dimmer().setup(function (obj) {
                obj.minimal_height = function () { return 40; };
                obj.haystack = function () { return _this.option_label(id); };
                obj.needle = function () { return _this.filter_pattern(); };
            });
        };
        $mol_select.prototype.option_content = function (id) {
            return [].concat(this.Option_label(id));
        };
        $mol_select.prototype.option_content_super = function (id) {
            return this.option_content(id);
        };
        $mol_select.prototype.Option_row = function (id) {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (event) { return _this.event_select(id, event); };
                obj.sub = function () { return _this.option_content_super(id); };
            });
        };
        $mol_select.prototype.no_options_message = function () {
            return $.$mol_locale.text(this.locale_contexts(), "no_options_message");
        };
        $mol_select.prototype.No_options = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.no_options_message()); };
            });
        };
        $mol_select.prototype.clear_option_message = function () {
            return $.$mol_locale.text(this.locale_contexts(), "clear_option_message");
        };
        $mol_select.prototype.Clear_icon = function () {
            return new $.$mol_icon_cross();
        };
        $mol_select.prototype.clear_option_content = function () {
            return [].concat(this.clear_option_message(), this.Clear_icon());
        };
        $mol_select.prototype.Сlear_option_content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.clear_option_content(); };
            });
        };
        $mol_select.prototype.nav_components = function () {
            return [].concat(this.Filter_string(), this.option_rows());
        };
        $mol_select.prototype.option_focused = function (key, force) {
            return (key !== void 0) ? key : "";
        };
        $mol_select.prototype.nav_cycle = function (val, force) {
            return (val !== void 0) ? val : true;
        };
        $mol_select.prototype.Nav = function () {
            var _this = this;
            return new $.$mol_nav().setup(function (obj) {
                obj.keys_y = function () { return _this.nav_components(); };
                obj.current_y = function (key) { return _this.option_focused(key); };
                obj.cycle = function (val) { return _this.nav_cycle(val); };
            });
        };
        $mol_select.prototype.plugins = function () {
            return [].concat(this.Nav());
        };
        $mol_select.prototype.options_showed = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_select.prototype.options_align = function (val, force) {
            return (val !== void 0) ? val : "bottom_right";
        };
        $mol_select.prototype.event_showed_toggle = function (event, force) {
            return (event !== void 0) ? event : null;
        };
        $mol_select.prototype.Trigger_icon = function () {
            return new $.$mol_icon_chevron();
        };
        $mol_select.prototype.value_content = function () {
            return [];
        };
        $mol_select.prototype.trigger_content = function () {
            return [].concat(this.Trigger_icon(), this.value_content());
        };
        $mol_select.prototype.Trigger = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (event) { return _this.event_showed_toggle(event); };
                obj.sub = function () { return _this.trigger_content(); };
            });
        };
        $mol_select.prototype.filter_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "filter_hint");
        };
        $mol_select.prototype.Filter_string = function () {
            var _this = this;
            return new $.$mol_string().setup(function (obj) {
                obj.value = function (val) { return _this.filter_pattern(val); };
                obj.hint = function () { return _this.filter_hint(); };
            });
        };
        $mol_select.prototype.filter_content = function () {
            return [].concat(this.Filter_string());
        };
        $mol_select.prototype.option_rows = function () {
            return [];
        };
        $mol_select.prototype.bubble_content = function () {
            return [].concat(this.filter_content(), this.option_rows());
        };
        $mol_select.prototype.Bubble_content = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.bubble_content(); };
            });
        };
        $mol_select.prototype.Pop = function () {
            var _this = this;
            return new $.$mol_pop().setup(function (obj) {
                obj.showed = function (val) { return _this.options_showed(val); };
                obj.align = function (val) { return _this.options_align(val); };
                obj.Anchor = function () { return _this.Trigger(); };
                obj.bubble_content = function () { return [].concat(_this.Bubble_content()); };
            });
        };
        $mol_select.prototype.sub = function () {
            return [].concat(this.Pop());
        };
        return $mol_select;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "value", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_select.prototype, "event_select", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "filter_pattern", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_select.prototype, "Option_label", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_select.prototype, "Option_row", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "No_options", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Clear_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "\u0421lear_option_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "option_focused", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "nav_cycle", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Nav", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "options_showed", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "options_align", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "event_showed_toggle", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Trigger_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Trigger", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Filter_string", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Bubble_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_select.prototype, "Pop", null);
    $.$mol_select = $mol_select;
})($ || ($ = {}));
//select.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_select = (function (_super) {
            __extends($mol_select, _super);
            function $mol_select() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_select.prototype.filter_pattern = function (next) {
                if (!this.focused())
                    return '';
                return next || '';
            };
            $mol_select.prototype.options_showed = function (val) {
                if (!this.focused())
                    return false;
                if (val !== void 0)
                    return val;
                if (this.filter_pattern())
                    return true;
                return false;
            };
            $mol_select.prototype.options = function () {
                return Object.keys(this.dictionary());
            };
            $mol_select.prototype.options_filtered = function () {
                var _this = this;
                var filter = this.filter_pattern().toLowerCase();
                var value = this.value();
                return this.options().filter(function (id) {
                    if (id === value)
                        return false;
                    return _this.option_label(id).toLowerCase().match(filter);
                });
            };
            $mol_select.prototype.option_label = function (id) {
                var value = this.dictionary()[id];
                return value == null ? id : value;
            };
            $mol_select.prototype.option_rows = function () {
                var _this = this;
                if (this.options_filtered().length === 0)
                    return [this.No_options()];
                var options = this.options_filtered().map(function (option) { return _this.Option_row(option); });
                if (this.clearable() && this.value())
                    options = [this.Option_row('')].concat(options);
                return options;
            };
            $mol_select.prototype.option_content_super = function (id) {
                if (id === '')
                    return [this.Сlear_option_content()];
                else
                    return this.option_content(id);
            };
            $mol_select.prototype.option_focused = function (component) {
                if (component === void 0)
                    return this.Filter_string();
                if (this.options_showed()) {
                    component.focused(true);
                }
                return component;
            };
            $mol_select.prototype.event_showed_toggle = function (event) {
                this.options_showed(!this.options_showed());
            };
            $mol_select.prototype.event_select = function (id, event) {
                this.value(id);
                this.options_showed(false);
            };
            $mol_select.prototype.searchable = function () {
                return this.options().length >= this.search_breakpoint();
            };
            $mol_select.prototype.nav_components = function () {
                return (this.searchable() ? this.filter_content() : []).slice().concat(this.option_rows());
            };
            $mol_select.prototype.bubble_content = function () {
                return (this.searchable() ? this.filter_content() : []).slice().concat(this.option_rows());
            };
            $mol_select.prototype.value_content = function () {
                return this.value() ? this.option_content(this.value()) : null;
            };
            return $mol_select;
        }($.$mol_select));
        __decorate([
            $.$mol_mem()
        ], $mol_select.prototype, "filter_pattern", null);
        __decorate([
            $.$mol_mem()
        ], $mol_select.prototype, "options_showed", null);
        __decorate([
            $.$mol_mem()
        ], $mol_select.prototype, "options", null);
        __decorate([
            $.$mol_mem()
        ], $mol_select.prototype, "option_focused", null);
        $mol.$mol_select = $mol_select;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//select.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_search = (function (_super) {
        __extends($mol_search, _super);
        function $mol_search() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_search.prototype.query = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_search.prototype.suggest_selected = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_search.prototype.hint = function () {
            return "Search...";
        };
        $mol_search.prototype.suggests_showed = function () {
            return false;
        };
        $mol_search.prototype.suggests = function () {
            return [];
        };
        $mol_search.prototype.Suggest = function () {
            var _this = this;
            return new $.$mol_search_suggest().setup(function (obj) {
                obj.value = function (val) { return _this.suggest_selected(val); };
                obj.filter_hint = function () { return _this.hint(); };
                obj.filter_pattern = function (val) { return _this.query(val); };
                obj.options_showed = function () { return _this.suggests_showed(); };
                obj.options = function () { return _this.suggests(); };
            });
        };
        $mol_search.prototype.Clear_icon = function () {
            return new $.$mol_icon_cross();
        };
        $mol_search.prototype.event_clear = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_search.prototype.Clear = function () {
            var _this = this;
            return new $.$mol_button_minor().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Clear_icon()); };
                obj.event_click = function (val) { return _this.event_clear(val); };
            });
        };
        $mol_search.prototype.sub = function () {
            return [].concat(this.Suggest(), this.Clear());
        };
        return $mol_search;
    }($.$mol_bar));
    __decorate([
        $.$mol_mem()
    ], $mol_search.prototype, "query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_search.prototype, "suggest_selected", null);
    __decorate([
        $.$mol_mem()
    ], $mol_search.prototype, "Suggest", null);
    __decorate([
        $.$mol_mem()
    ], $mol_search.prototype, "Clear_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_search.prototype, "event_clear", null);
    __decorate([
        $.$mol_mem()
    ], $mol_search.prototype, "Clear", null);
    $.$mol_search = $mol_search;
})($ || ($ = {}));
(function ($) {
    var $mol_search_suggest = (function (_super) {
        __extends($mol_search_suggest, _super);
        function $mol_search_suggest() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_search_suggest.prototype.trigger_content = function () {
            return this.filter_content();
        };
        $mol_search_suggest.prototype.bubble_content = function () {
            return this.option_rows();
        };
        $mol_search_suggest.prototype.clearable = function () {
            return false;
        };
        return $mol_search_suggest;
    }($.$mol_select));
    $.$mol_search_suggest = $mol_search_suggest;
})($ || ($ = {}));
//search.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_search = (function (_super) {
            __extends($mol_search, _super);
            function $mol_search() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_search.prototype.suggests_showed = function () {
                if (!this.focused())
                    return false;
                return this.suggests().length > 1;
            };
            $mol_search.prototype.suggest_selected = function (next) {
                if (next)
                    this.Suggest().Filter_string().focused(true);
                return this.query(next);
            };
            $mol_search.prototype.sub = function () {
                return [
                    this.Suggest(),
                    (this.query().length > 0) ? this.Clear() : null,
                ];
            };
            $mol_search.prototype.event_clear = function (event) {
                this.query('');
            };
            return $mol_search;
        }($.$mol_search));
        $mol.$mol_search = $mol_search;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//search.view.js.map
;
var cordova;
var $;
(function ($) {
    $.$mol_cordova = cordova || {
        plugins: {
            barcodeScanner: null
        }
    };
    function $mol_cordova_camera() {
        return navigator['camera'];
    }
    $.$mol_cordova_camera = $mol_cordova_camera;
})($ || ($ = {}));
//cordova.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_code = (function (_super) {
        __extends($mol_code, _super);
        function $mol_code() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_code.prototype.value = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_code.prototype.format = function () {
            return "";
        };
        $mol_code.prototype.hint = function () {
            return this.format();
        };
        $mol_code.prototype.Manual = function () {
            var _this = this;
            return new $.$mol_search().setup(function (obj) {
                obj.query = function (val) { return _this.value(val); };
                obj.hint = function () { return _this.hint(); };
            });
        };
        $mol_code.prototype.event_scan = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_code.prototype.scan_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "scan_label");
        };
        $mol_code.prototype.Scan = function () {
            var _this = this;
            return new $.$mol_button().setup(function (obj) {
                obj.event_click = function (val) { return _this.event_scan(val); };
                obj.sub = function () { return [].concat(_this.scan_label()); };
            });
        };
        $mol_code.prototype.sub = function () {
            return [].concat(this.Manual(), this.Scan());
        };
        return $mol_code;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Manual", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "event_scan", null);
    __decorate([
        $.$mol_mem()
    ], $mol_code.prototype, "Scan", null);
    $.$mol_code = $mol_code;
})($ || ($ = {}));
//code.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_code = (function (_super) {
            __extends($mol_code, _super);
            function $mol_code() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_code.prototype.scan_support = function () {
                return Boolean($.$mol_cordova.plugins.barcodeScanner);
            };
            $mol_code.prototype.Scan = function () {
                return this.scan_support() ? _super.prototype.Scan.call(this) : null;
            };
            $mol_code.prototype.event_scan = function () {
                var _this = this;
                $.$mol_cordova.plugins.barcodeScanner.scan(function (result) {
                    if (result.cancelled)
                        return;
                    _this.value(result.text);
                }, function (error) {
                    alert("Scanning failed: " + error);
                });
            };
            return $mol_code;
        }($.$mol_code));
        $mol.$mol_code = $mol_code;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//code.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_list = (function (_super) {
        __extends($mol_app_supplies_list, _super);
        function $mol_app_supplies_list() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_list.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_list.prototype.search_hint = function () {
            return $.$mol_locale.text(this.locale_contexts(), "search_hint");
        };
        $mol_app_supplies_list.prototype.search_query = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_list.prototype.Search = function () {
            var _this = this;
            return new $.$mol_code().setup(function (obj) {
                obj.hint = function () { return _this.search_hint(); };
                obj.value = function (val) { return _this.search_query(val); };
            });
        };
        $mol_app_supplies_list.prototype.tools = function () {
            return [].concat(this.Search());
        };
        $mol_app_supplies_list.prototype.supply_rows = function () {
            return [];
        };
        $mol_app_supplies_list.prototype.Supply_rows = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.supply_rows(); };
            });
        };
        $mol_app_supplies_list.prototype.body = function () {
            return [].concat(this.Supply_rows());
        };
        return $mol_app_supplies_list;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "search_query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Search", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_list.prototype, "Supply_rows", null);
    $.$mol_app_supplies_list = $mol_app_supplies_list;
})($ || ($ = {}));
//list.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_list = (function (_super) {
            __extends($mol_app_supplies_list, _super);
            function $mol_app_supplies_list() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_list.prototype.supply_rows = function () {
                var _this = this;
                return this.supplies().map(function (supply, index) { return _this.Supply_row(index); });
            };
            $mol_app_supplies_list.prototype.Supply_row = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_card().setup(function (obj) {
                    obj.supply = function () { return _this.supplies()[index]; };
                    obj.arg = function () { return ({
                        supply: _this.supplies()[index].id(),
                        side: null,
                    }); };
                });
            };
            return $mol_app_supplies_list;
        }($.$mol_app_supplies_list));
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_list.prototype, "supply_rows", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_list.prototype, "Supply_row", null);
        $mol.$mol_app_supplies_list = $mol_app_supplies_list;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//list.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check = (function (_super) {
        __extends($mol_check, _super);
        function $mol_check() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check.prototype.checked = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_check.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "mol_check_checked": this.checked(), "aria-checked": this.checked(), "role": "checkbox" }));
        };
        $mol_check.prototype.Icon = function () {
            return null;
        };
        $mol_check.prototype.label = function () {
            return [];
        };
        $mol_check.prototype.Label = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.label()); };
            });
        };
        $mol_check.prototype.sub = function () {
            return [].concat(this.Icon(), this.Label());
        };
        return $mol_check;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "checked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_check.prototype, "Label", null);
    $.$mol_check = $mol_check;
})($ || ($ = {}));
//check.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_check = (function (_super) {
            __extends($mol_check, _super);
            function $mol_check() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_check.prototype.event_click = function (next) {
                this.checked(!this.checked());
                next.preventDefault();
            };
            return $mol_check;
        }($.$mol_check));
        $mol.$mol_check = $mol_check;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//check.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_switch = (function (_super) {
        __extends($mol_switch, _super);
        function $mol_switch() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_switch.prototype.minimal_height = function () {
            return 44;
        };
        $mol_switch.prototype.option_checked = function (id, val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_switch.prototype.option_title = function (id) {
            return "";
        };
        $mol_switch.prototype.enabled = function () {
            return true;
        };
        $mol_switch.prototype.option_enabled = function (id) {
            return this.enabled();
        };
        $mol_switch.prototype.Option = function (id) {
            var _this = this;
            return new $.$mol_check().setup(function (obj) {
                obj.checked = function (val) { return _this.option_checked(id, val); };
                obj.label = function () { return [].concat(_this.option_title(id)); };
                obj.enabled = function () { return _this.option_enabled(id); };
            });
        };
        $mol_switch.prototype.value = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_switch.prototype.options = function () {
            return ({});
        };
        $mol_switch.prototype.items = function () {
            return [];
        };
        $mol_switch.prototype.sub = function () {
            return this.items();
        };
        return $mol_switch;
    }($.$mol_view));
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "option_checked", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_switch.prototype, "Option", null);
    __decorate([
        $.$mol_mem()
    ], $mol_switch.prototype, "value", null);
    $.$mol_switch = $mol_switch;
})($ || ($ = {}));
//switch.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_switch = (function (_super) {
            __extends($mol_switch, _super);
            function $mol_switch() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_switch.prototype.value = function (next) {
                return $.$mol_state_session.value(this + ".value()", next);
            };
            $mol_switch.prototype.options = function () {
                return {};
            };
            $mol_switch.prototype.items = function () {
                var _this = this;
                return Object.keys(this.options()).map(function (key) { return _this.Option(key); });
            };
            $mol_switch.prototype.option_title = function (key) {
                return this.options()[key];
            };
            $mol_switch.prototype.option_checked = function (key, next) {
                if (next === void 0)
                    return this.value() === key;
                this.value(next ? key : null);
            };
            return $mol_switch;
        }($.$mol_switch));
        __decorate([
            $.$mol_mem()
        ], $mol_switch.prototype, "items", null);
        $mol.$mol_switch = $mol_switch;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//switch.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_deck = (function (_super) {
        __extends($mol_deck, _super);
        function $mol_deck() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_deck.prototype.items = function () {
            return [];
        };
        $mol_deck.prototype.current = function (val, force) {
            return (val !== void 0) ? val : "0";
        };
        $mol_deck.prototype.switch_options = function () {
            return ({});
        };
        $mol_deck.prototype.Switch = function () {
            var _this = this;
            return new $.$mol_switch().setup(function (obj) {
                obj.value = function (val) { return _this.current(val); };
                obj.options = function () { return _this.switch_options(); };
            });
        };
        $mol_deck.prototype.Content = function () {
            return null;
        };
        $mol_deck.prototype.rows = function () {
            return [].concat(this.Switch(), this.Content());
        };
        return $mol_deck;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_deck.prototype, "current", null);
    __decorate([
        $.$mol_mem()
    ], $mol_deck.prototype, "Switch", null);
    $.$mol_deck = $mol_deck;
})($ || ($ = {}));
(function ($) {
    var $mol_deck_item = (function (_super) {
        __extends($mol_deck_item, _super);
        function $mol_deck_item() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_deck_item.prototype.title = function () {
            return "";
        };
        $mol_deck_item.prototype.content = function () {
            return [];
        };
        $mol_deck_item.prototype.Content = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return _this.content(); };
            });
        };
        return $mol_deck_item;
    }($.$mol_object));
    __decorate([
        $.$mol_mem()
    ], $mol_deck_item.prototype, "Content", null);
    $.$mol_deck_item = $mol_deck_item;
})($ || ($ = {}));
//deck.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_deck = (function (_super) {
            __extends($mol_deck, _super);
            function $mol_deck() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_deck.prototype.current = function (next) {
                return $.$mol_state_session.value(this + ".current()", next) || '0';
            };
            $mol_deck.prototype.switch_options = function () {
                var options = {};
                this.items().forEach(function (item, index) {
                    options[String(index)] = item.title();
                });
                return options;
            };
            $mol_deck.prototype.Content = function () {
                return this.items()[this.current()].Content();
            };
            return $mol_deck;
        }($.$mol_deck));
        __decorate([
            $.$mol_mem()
        ], $mol_deck.prototype, "Content", null);
        $mol.$mol_deck = $mol_deck;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//deck.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_tiler = (function (_super) {
        __extends($mol_tiler, _super);
        function $mol_tiler() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_tiler.prototype.items = function () {
            return [];
        };
        $mol_tiler.prototype.sub = function () {
            return [].concat(this.items());
        };
        return $mol_tiler;
    }($.$mol_view));
    $.$mol_tiler = $mol_tiler;
})($ || ($ = {}));
//tiler.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_tiler = (function (_super) {
            __extends($mol_tiler, _super);
            function $mol_tiler() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_tiler.prototype.sub = function () {
                return this.groupChilds([]);
            };
            $mol_tiler.prototype.groupItems = function (path) {
                var items = (path.length === 0)
                    ? this.items()
                    : this.groupItems(path.slice(0, path.length - 1));
                if (items.length < 2)
                    return items;
                if (path.length != 0) {
                    var cut = Math.floor(items.length / 2);
                    items = path[path.length - 1]
                        ? items.slice(cut)
                        : items.slice(0, cut);
                }
                return items;
            };
            $mol_tiler.prototype.groupChilds = function (path) {
                var _this = this;
                var items = this.groupItems(path);
                if (items.length <= 2)
                    return items.map(function (_, index) { return _this.item(path.concat(index)); });
                return [
                    this.child(path.concat(0)),
                    this.child(path.concat(1)),
                ];
            };
            $mol_tiler.prototype.child = function (path) {
                return (this.groupItems(path).length > 1)
                    ? this.group(path)
                    : this.item(path);
            };
            $mol_tiler.prototype.group = function (path) {
                var _this = this;
                return new $.$mol_view().setup(function (obj) {
                    obj.sub = function () { return _this.groupChilds(path); };
                });
            };
            $mol_tiler.prototype.item = function (path) {
                var _this = this;
                return new $.$mol_view().setup(function (obj) {
                    obj.sub = function () { return _this.groupItems(path); };
                });
            };
            return $mol_tiler;
        }($.$mol_tiler));
        __decorate([
            $.$mol_mem()
        ], $mol_tiler.prototype, "sub", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "groupItems", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "groupChilds", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "child", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "group", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_tiler.prototype, "item", null);
        $mol.$mol_tiler = $mol_tiler;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//tiler.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_attach = (function (_super) {
        __extends($mol_icon_attach, _super);
        function $mol_icon_attach() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_attach.prototype.path = function () {
            return "M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z";
        };
        return $mol_icon_attach;
    }($.$mol_icon));
    $.$mol_icon_attach = $mol_icon_attach;
})($ || ($ = {}));
//attach.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_attach = (function (_super) {
        __extends($mol_attach, _super);
        function $mol_attach() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach.prototype.items = function (val, force) {
            return (val !== void 0) ? val : [];
        };
        $mol_attach.prototype.attach_new = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach.prototype.Add = function () {
            var _this = this;
            return new $.$mol_attach_add().setup(function (obj) {
                obj.file_new = function (val) { return _this.attach_new(val); };
            });
        };
        $mol_attach.prototype.content = function () {
            return [].concat(this.items(), this.Add());
        };
        $mol_attach.prototype.Content = function () {
            var _this = this;
            return new $.$mol_tiler().setup(function (obj) {
                obj.items = function () { return _this.content(); };
            });
        };
        $mol_attach.prototype.attach_title = function () {
            return "";
        };
        $mol_attach.prototype.Item = function (id) {
            var _this = this;
            return new $.$mol_attach_item().setup(function (obj) {
                obj.title = function () { return _this.attach_title(); };
            });
        };
        return $mol_attach;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "items", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "Add", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach.prototype, "Content", null);
    __decorate([
        $.$mol_mem_key()
    ], $mol_attach.prototype, "Item", null);
    $.$mol_attach = $mol_attach;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_item = (function (_super) {
        __extends($mol_attach_item, _super);
        function $mol_attach_item() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach_item.prototype.url_thumb = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.url_load = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_item.prototype.uri = function (val, force) {
            return this.url_load(val);
        };
        $mol_attach_item.prototype.style_bg = function () {
            return "";
        };
        $mol_attach_item.prototype.style = function () {
            return (__assign({}, _super.prototype.style.call(this), { "backgroundImage": this.style_bg() }));
        };
        $mol_attach_item.prototype.title = function () {
            return "";
        };
        $mol_attach_item.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "download": this.title() }));
        };
        return $mol_attach_item;
    }($.$mol_link));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "url_thumb", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "url_load", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_item.prototype, "uri", null);
    $.$mol_attach_item = $mol_attach_item;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add = (function (_super) {
        __extends($mol_attach_add, _super);
        function $mol_attach_add() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach_add.prototype.minimal_height = function () {
            return 60;
        };
        $mol_attach_add.prototype.file_new = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_attach_add.prototype.Icon = function () {
            return new $.$mol_icon_attach();
        };
        $mol_attach_add.prototype.event_capture = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.event_picked = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add.prototype.Input = function () {
            var _this = this;
            return new $.$mol_attach_add_input().setup(function (obj) {
                obj.event_capture = function (val) { return _this.event_capture(val); };
                obj.event_picked = function (val) { return _this.event_picked(val); };
            });
        };
        $mol_attach_add.prototype.sub = function () {
            return [].concat(this.Icon(), this.Input());
        };
        return $mol_attach_add;
    }($.$mol_button));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "file_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "Icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "event_picked", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add.prototype, "Input", null);
    $.$mol_attach_add = $mol_attach_add;
})($ || ($ = {}));
(function ($) {
    var $mol_attach_add_input = (function (_super) {
        __extends($mol_attach_add_input, _super);
        function $mol_attach_add_input() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_attach_add_input.prototype.dom_name = function () {
            return "input";
        };
        $mol_attach_add_input.prototype.type = function () {
            return "file";
        };
        $mol_attach_add_input.prototype.accept = function () {
            return "image/*;capture=camera";
        };
        $mol_attach_add_input.prototype.multiple = function () {
            return true;
        };
        $mol_attach_add_input.prototype.attr = function () {
            return (__assign({}, _super.prototype.attr.call(this), { "type": this.type(), "accept": this.accept(), "multiple": this.multiple() }));
        };
        $mol_attach_add_input.prototype.event_capture = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event_click = function (val, force) {
            return this.event_capture(val);
        };
        $mol_attach_add_input.prototype.event_picked = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_attach_add_input.prototype.event = function () {
            var _this = this;
            return (__assign({}, _super.prototype.event.call(this), { "change": function (val) { return _this.event_picked(val); } }));
        };
        return $mol_attach_add_input;
    }($.$mol_view));
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_capture", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_click", null);
    __decorate([
        $.$mol_mem()
    ], $mol_attach_add_input.prototype, "event_picked", null);
    $.$mol_attach_add_input = $mol_attach_add_input;
})($ || ($ = {}));
//attach.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_attach = (function (_super) {
            __extends($mol_attach, _super);
            function $mol_attach() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_attach.prototype.attach_new = function (next) {
                var items = this.items();
                var item = this.Item(items.length);
                item.url_thumb(next);
                item.url_load(next);
                this.items(items.concat(item));
                return void 0;
            };
            return $mol_attach;
        }($.$mol_attach));
        $mol.$mol_attach = $mol_attach;
        var $mol_attach_item = (function (_super) {
            __extends($mol_attach_item, _super);
            function $mol_attach_item() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_attach_item.prototype.style_bg = function () {
                return "url(\"" + this.url_thumb() + "\")";
            };
            return $mol_attach_item;
        }($.$mol_attach_item));
        $mol.$mol_attach_item = $mol_attach_item;
        var $mol_attach_add = (function (_super) {
            __extends($mol_attach_add, _super);
            function $mol_attach_add() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_attach_add.prototype.file_new = function (next) {
                return next;
            };
            $mol_attach_add.prototype.event_capture = function (next) {
                var _this = this;
                if (!$.$mol_cordova_camera())
                    return;
                next.preventDefault();
                $.$mol_cordova_camera().getPicture(function (url) {
                    _this.file_new(url);
                }, function (error) {
                    _this.file_new(error);
                }, {
                    quality: 50
                });
            };
            $mol_attach_add.prototype.event_picked = function (next) {
                var files = [].slice.call(next.target.files);
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    this.file_new(URL.createObjectURL(file));
                }
            };
            return $mol_attach_add;
        }($.$mol_attach_add));
        $mol.$mol_attach_add = $mol_attach_add;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//attach.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_section = (function (_super) {
        __extends($mol_section, _super);
        function $mol_section() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_section.prototype.head = function () {
            return null;
        };
        $mol_section.prototype.Head = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.head()); };
            });
        };
        $mol_section.prototype.Content = function () {
            return null;
        };
        $mol_section.prototype.rows = function () {
            return [].concat(this.Head(), this.Content());
        };
        return $mol_section;
    }($.$mol_list));
    __decorate([
        $.$mol_mem()
    ], $mol_section.prototype, "Head", null);
    $.$mol_section = $mol_section;
})($ || ($ = {}));
//section.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_icon_tick = (function (_super) {
        __extends($mol_icon_tick, _super);
        function $mol_icon_tick() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_icon_tick.prototype.path = function () {
            return "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z";
        };
        return $mol_icon_tick;
    }($.$mol_icon));
    $.$mol_icon_tick = $mol_icon_tick;
})($ || ($ = {}));
//tick.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_check_box = (function (_super) {
        __extends($mol_check_box, _super);
        function $mol_check_box() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_check_box.prototype.Icon = function () {
            return new $.$mol_icon_tick();
        };
        return $mol_check_box;
    }($.$mol_check));
    __decorate([
        $.$mol_mem()
    ], $mol_check_box.prototype, "Icon", null);
    $.$mol_check_box = $mol_check_box;
})($ || ($ = {}));
//box.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_position = (function (_super) {
        __extends($mol_app_supplies_position, _super);
        function $mol_app_supplies_position() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_position.prototype.minimal_height = function () {
            return 70;
        };
        $mol_app_supplies_position.prototype.product_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "product_title");
        };
        $mol_app_supplies_position.prototype.product_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Product_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.product_title(); };
                obj.content = function () { return _this.product_name(); };
            });
        };
        $mol_app_supplies_position.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_position.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_position.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_position.prototype.Cost_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost(); };
            });
        };
        $mol_app_supplies_position.prototype.Main_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Product_item(), _this.Cost_item()); };
            });
        };
        $mol_app_supplies_position.prototype.division_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "division_title");
        };
        $mol_app_supplies_position.prototype.division_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Division_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.division_title(); };
                obj.content = function () { return _this.division_name(); };
            });
        };
        $mol_app_supplies_position.prototype.price_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "price_label");
        };
        $mol_app_supplies_position.prototype.price = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_position.prototype.Price = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.price(); };
            });
        };
        $mol_app_supplies_position.prototype.Price_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.price_label(); };
                obj.content = function () { return _this.Price(); };
            });
        };
        $mol_app_supplies_position.prototype.Addon_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Division_item(), _this.Price_item()); };
            });
        };
        $mol_app_supplies_position.prototype.quantity_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "quantity_title");
        };
        $mol_app_supplies_position.prototype.quantity = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Quantity_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.quantity_title(); };
                obj.content = function () { return _this.quantity(); };
            });
        };
        $mol_app_supplies_position.prototype.supply_date_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_date_title");
        };
        $mol_app_supplies_position.prototype.supply_date = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Supply_date_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supply_date_title(); };
                obj.content = function () { return _this.supply_date(); };
            });
        };
        $mol_app_supplies_position.prototype.store_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "store_title");
        };
        $mol_app_supplies_position.prototype.store_name = function () {
            return "";
        };
        $mol_app_supplies_position.prototype.Store_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.store_title(); };
                obj.content = function () { return _this.store_name(); };
            });
        };
        $mol_app_supplies_position.prototype.Supply_group = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Quantity_item(), _this.Supply_date_item(), _this.Store_item()); };
            });
        };
        $mol_app_supplies_position.prototype.Row = function () {
            var _this = this;
            return new $.$mol_view().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Main_group(), _this.Addon_group(), _this.Supply_group()); };
            });
        };
        $mol_app_supplies_position.prototype.Content = function () {
            return this.Row();
        };
        return $mol_app_supplies_position;
    }($.$mol_card));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Product_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Cost_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Main_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Division_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Price", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Price_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Addon_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Quantity_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Supply_date_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Store_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Supply_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_position.prototype, "Row", null);
    $.$mol_app_supplies_position = $mol_app_supplies_position;
})($ || ($ = {}));
//position.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_position = (function (_super) {
            __extends($mol_app_supplies_position, _super);
            function $mol_app_supplies_position() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_position.prototype.position = function () {
                return null;
            };
            $mol_app_supplies_position.prototype.product_name = function () {
                return this.position().name();
            };
            $mol_app_supplies_position.prototype.price = function () {
                return this.position().price();
            };
            $mol_app_supplies_position.prototype.quantity = function () {
                return this.position().quantity().toString();
            };
            $mol_app_supplies_position.prototype.cost = function () {
                return this.position().cost();
            };
            $mol_app_supplies_position.prototype.supply_date = function () {
                return this.position().supply_moment().toString('YYYY-MM-DD');
            };
            $mol_app_supplies_position.prototype.division_name = function () {
                return this.position().division().name();
            };
            $mol_app_supplies_position.prototype.store_name = function () {
                return this.position().store().name();
            };
            return $mol_app_supplies_position;
        }($.$mol_app_supplies_position));
        $mol.$mol_app_supplies_position = $mol_app_supplies_position;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//position.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_detail = (function (_super) {
        __extends($mol_app_supplies_detail, _super);
        function $mol_app_supplies_detail() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_detail.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_detail.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_detail.prototype.Close_icon = function () {
            return new $.$mol_icon_cross();
        };
        $mol_app_supplies_detail.prototype.close_arg = function () {
            return ({
                "supply": null,
            });
        };
        $mol_app_supplies_detail.prototype.Close = function () {
            var _this = this;
            return new $.$mol_link().setup(function (obj) {
                obj.sub = function () { return [].concat(_this.Close_icon()); };
                obj.arg = function () { return _this.close_arg(); };
            });
        };
        $mol_app_supplies_detail.prototype.tools = function () {
            return [].concat(this.Close());
        };
        $mol_app_supplies_detail.prototype.org_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "org_title");
        };
        $mol_app_supplies_detail.prototype.provider_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "provider_title");
        };
        $mol_app_supplies_detail.prototype.provider_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Provider = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.provider_title(); };
                obj.content = function () { return _this.provider_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.customer_label = function () {
            return $.$mol_locale.text(this.locale_contexts(), "customer_label");
        };
        $mol_app_supplies_detail.prototype.consumer_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Consumer = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.customer_label(); };
                obj.content = function () { return _this.consumer_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.supply_group_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "supply_group_title");
        };
        $mol_app_supplies_detail.prototype.supply_group_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Supply_group = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.supply_group_title(); };
                obj.content = function () { return _this.supply_group_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.ballance_unit_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "ballance_unit_title");
        };
        $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Ballance_unit_item = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.ballance_unit_title(); };
                obj.content = function () { return _this.ballance_unit_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.org_items = function () {
            return [].concat(this.Provider(), this.Consumer(), this.Supply_group(), this.Ballance_unit_item());
        };
        $mol_app_supplies_detail.prototype.Org_content = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.org_items(); };
            });
        };
        $mol_app_supplies_detail.prototype.Org = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.org_title(); };
                obj.Content = function () { return _this.Org_content(); };
            });
        };
        $mol_app_supplies_detail.prototype.cons_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cons_title");
        };
        $mol_app_supplies_detail.prototype.contract_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "contract_title");
        };
        $mol_app_supplies_detail.prototype.contract_id = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Contract = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.contract_title(); };
                obj.content = function () { return _this.contract_id(); };
            });
        };
        $mol_app_supplies_detail.prototype.pay_method_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "pay_method_title");
        };
        $mol_app_supplies_detail.prototype.pay_method_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Pay_method = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.pay_method_title(); };
                obj.content = function () { return _this.pay_method_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.manager_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "manager_title");
        };
        $mol_app_supplies_detail.prototype.manager_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Manager = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.manager_title(); };
                obj.content = function () { return _this.manager_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.debitod_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "debitod_title");
        };
        $mol_app_supplies_detail.prototype.debitor_name = function () {
            return "";
        };
        $mol_app_supplies_detail.prototype.Debitor = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.debitod_title(); };
                obj.content = function () { return _this.debitor_name(); };
            });
        };
        $mol_app_supplies_detail.prototype.cons_items = function () {
            return [].concat(this.Contract(), this.Pay_method(), this.Manager(), this.Debitor());
        };
        $mol_app_supplies_detail.prototype.Cons_content = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.cons_items(); };
            });
        };
        $mol_app_supplies_detail.prototype.Cons = function () {
            var _this = this;
            return new $.$mol_deck_item().setup(function (obj) {
                obj.title = function () { return _this.cons_title(); };
                obj.Content = function () { return _this.Cons_content(); };
            });
        };
        $mol_app_supplies_detail.prototype.Descr_deck = function () {
            var _this = this;
            return new $.$mol_deck().setup(function (obj) {
                obj.items = function () { return [].concat(_this.Org(), _this.Cons()); };
            });
        };
        $mol_app_supplies_detail.prototype.Descr_card = function () {
            var _this = this;
            return new $.$mol_card().setup(function (obj) {
                obj.Content = function () { return _this.Descr_deck(); };
            });
        };
        $mol_app_supplies_detail.prototype.attach_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "attach_title");
        };
        $mol_app_supplies_detail.prototype.attachments = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.attach_new = function (val, force) {
            return (val !== void 0) ? val : null;
        };
        $mol_app_supplies_detail.prototype.Attach = function () {
            var _this = this;
            return new $.$mol_attach().setup(function (obj) {
                obj.items = function () { return _this.attachments(); };
                obj.attach_new = function (val) { return _this.attach_new(val); };
            });
        };
        $mol_app_supplies_detail.prototype.Attach_section = function () {
            var _this = this;
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return _this.attach_title(); };
                obj.Content = function () { return _this.Attach(); };
            });
        };
        $mol_app_supplies_detail.prototype.positions_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "positions_title");
        };
        $mol_app_supplies_detail.prototype.cost_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "cost_title");
        };
        $mol_app_supplies_detail.prototype.cost = function () {
            return new $.$mol_unit_money().setup(function (obj) {
                obj.valueOf = function () { return 0; };
            });
        };
        $mol_app_supplies_detail.prototype.Cost_value = function () {
            var _this = this;
            return new $.$mol_cost().setup(function (obj) {
                obj.value = function () { return _this.cost(); };
            });
        };
        $mol_app_supplies_detail.prototype.Cost = function () {
            var _this = this;
            return new $.$mol_labeler().setup(function (obj) {
                obj.title = function () { return _this.cost_title(); };
                obj.content = function () { return _this.Cost_value(); };
            });
        };
        $mol_app_supplies_detail.prototype.positions_head = function () {
            return [].concat(this.positions_title(), this.Cost());
        };
        $mol_app_supplies_detail.prototype.positions = function () {
            return [];
        };
        $mol_app_supplies_detail.prototype.Positions = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.positions(); };
            });
        };
        $mol_app_supplies_detail.prototype.Positions_section = function () {
            var _this = this;
            return new $.$mol_section().setup(function (obj) {
                obj.head = function () { return _this.positions_head(); };
                obj.Content = function () { return _this.Positions(); };
            });
        };
        $mol_app_supplies_detail.prototype.content = function () {
            return [].concat(this.Descr_card(), this.Attach_section(), this.Positions_section());
        };
        $mol_app_supplies_detail.prototype.Content = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return _this.content(); };
            });
        };
        $mol_app_supplies_detail.prototype.List = function () {
            var _this = this;
            return new $.$mol_list().setup(function (obj) {
                obj.rows = function () { return [].concat(_this.Content()); };
            });
        };
        $mol_app_supplies_detail.prototype.body = function () {
            return [].concat(this.List());
        };
        $mol_app_supplies_detail.prototype.approved = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_detail.prototype.approved_title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "approved_title");
        };
        $mol_app_supplies_detail.prototype.Approve = function () {
            var _this = this;
            return new $.$mol_check_box().setup(function (obj) {
                obj.checked = function (val) { return _this.approved(val); };
                obj.label = function () { return [].concat(_this.approved_title()); };
            });
        };
        $mol_app_supplies_detail.prototype.actions = function () {
            return [].concat(this.Approve());
        };
        $mol_app_supplies_detail.prototype.Actions = function () {
            var _this = this;
            return new $.$mol_row().setup(function (obj) {
                obj.sub = function () { return _this.actions(); };
            });
        };
        $mol_app_supplies_detail.prototype.foot = function () {
            return [].concat(this.Actions());
        };
        return $mol_app_supplies_detail;
    }($.$mol_page));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Close_icon", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Close", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Provider", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Consumer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Supply_group", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Ballance_unit_item", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Org_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Org", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Contract", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Pay_method", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Manager", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Debitor", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cons_content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cons", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Descr_deck", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Descr_card", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "attach_new", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Attach", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Attach_section", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cost_value", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Cost", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Positions", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Positions_section", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Content", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "List", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "approved", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Approve", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_detail.prototype, "Actions", null);
    $.$mol_app_supplies_detail = $mol_app_supplies_detail;
})($ || ($ = {}));
//detail.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_detail = (function (_super) {
            __extends($mol_app_supplies_detail, _super);
            function $mol_app_supplies_detail() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_detail.prototype.supply = function () {
                return null;
            };
            $mol_app_supplies_detail.prototype.title = function () {
                return _super.prototype.title.call(this) + " " + this.supply().id();
            };
            $mol_app_supplies_detail.prototype.approved = function (next) {
                if (next === void 0) {
                    return this.supply().status() === $.$mol_app_supplies_domain_supply_status.approved;
                }
                this.supply().status(next
                    ? $.$mol_app_supplies_domain_supply_status.approved
                    : $.$mol_app_supplies_domain_supply_status.pending);
                return next;
            };
            $mol_app_supplies_detail.prototype.provider_name = function () {
                return this.supply().provider().name();
            };
            $mol_app_supplies_detail.prototype.consumer_name = function () {
                return this.supply().consumer().name();
            };
            $mol_app_supplies_detail.prototype.ballance_unit_name = function () {
                return this.supply().ballance_unit().name();
            };
            $mol_app_supplies_detail.prototype.supply_group_name = function () {
                return this.supply().group().name();
            };
            $mol_app_supplies_detail.prototype.manager_name = function () {
                return this.supply().manager().name();
            };
            $mol_app_supplies_detail.prototype.pay_method_name = function () {
                return this.supply().pay_method().name();
            };
            $mol_app_supplies_detail.prototype.debitor_name = function () {
                return this.supply().debitor().name();
            };
            $mol_app_supplies_detail.prototype.contract_id = function () {
                return this.supply().contract().id();
            };
            $mol_app_supplies_detail.prototype.cost = function () {
                return this.supply().cost();
            };
            $mol_app_supplies_detail.prototype.status = function () {
                return String(this.supply().status());
            };
            $mol_app_supplies_detail.prototype.positions = function () {
                var _this = this;
                return this.supply().positions().map(function (pos, index) { return _this.Position(index); });
            };
            $mol_app_supplies_detail.prototype.Position = function (index) {
                var _this = this;
                return new $mol.$mol_app_supplies_position().setup(function (obj) {
                    obj.position = function () { return _this.supply().positions()[index]; };
                });
            };
            $mol_app_supplies_detail.prototype.attachments = function () {
                var _this = this;
                return this.supply().attachments().map(function (pos, index) { return _this.Attachment(index); });
            };
            $mol_app_supplies_detail.prototype.Attachment = function (index) {
                var _this = this;
                return new $mol.$mol_attach_item().setup(function (obj) {
                    obj.url_thumb = function () { return _this.supply().attachments()[index].url_thumb(); };
                    obj.url_load = function () { return _this.supply().attachments()[index].url_load(); };
                });
            };
            $mol_app_supplies_detail.prototype.attach_new = function (next) {
                var supply = this.supply();
                var list = supply.attachments();
                var url = $.$mol_const(next);
                list = list.concat(new $.$mol_app_supplies_domain_attachment().setup(function (obj) {
                    obj.url_thumb = obj.url_load = url;
                }));
                supply.attachments(list);
            };
            $mol_app_supplies_detail.prototype.body_scroll_top = function (next) {
                var supplyId = this.supply() && this.supply().id();
                return $.$mol_state_session.value(this + ".scroll_top(" + supplyId + ")", next);
            };
            return $mol_app_supplies_detail;
        }($.$mol_app_supplies_detail));
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_detail.prototype, "Position", null);
        __decorate([
            $.$mol_mem_key()
        ], $mol_app_supplies_detail.prototype, "Attachment", null);
        $mol.$mol_app_supplies_detail = $mol_app_supplies_detail;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//detail.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol_app_supplies_root = (function (_super) {
        __extends($mol_app_supplies_root, _super);
        function $mol_app_supplies_root() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_root.prototype.entered = function (val, force) {
            return (val !== void 0) ? val : false;
        };
        $mol_app_supplies_root.prototype.enter = function () {
            var _this = this;
            return new $.$mol_app_supplies_enter().setup(function (obj) {
                obj.entered = function (val) { return _this.entered(val); };
            });
        };
        $mol_app_supplies_root.prototype.supplies = function () {
            return [];
        };
        $mol_app_supplies_root.prototype.search_query = function (val, force) {
            return (val !== void 0) ? val : "";
        };
        $mol_app_supplies_root.prototype.lister = function () {
            var _this = this;
            return new $.$mol_app_supplies_list().setup(function (obj) {
                obj.minimal_width = function () { return 400; };
                obj.supplies = function () { return _this.supplies(); };
                obj.search_query = function (val) { return _this.search_query(val); };
            });
        };
        $mol_app_supplies_root.prototype.supply = function () {
            return null;
        };
        $mol_app_supplies_root.prototype.detailer = function () {
            var _this = this;
            return new $.$mol_app_supplies_detail().setup(function (obj) {
                obj.minimal_width = function () { return 400; };
                obj.supply = function () { return _this.supply(); };
            });
        };
        $mol_app_supplies_root.prototype.placeholder = function () {
            var _this = this;
            return new $.$mol_book_placeholder().setup(function (obj) {
                obj.title = function () { return _this.title(); };
            });
        };
        return $mol_app_supplies_root;
    }($.$mol_book));
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "entered", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "enter", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "search_query", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "lister", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "detailer", null);
    __decorate([
        $.$mol_mem()
    ], $mol_app_supplies_root.prototype, "placeholder", null);
    $.$mol_app_supplies_root = $mol_app_supplies_root;
})($ || ($ = {}));
//root.view.tree.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var $;
(function ($) {
    var $mol;
    (function ($mol) {
        var $mol_app_supplies_root = (function (_super) {
            __extends($mol_app_supplies_root, _super);
            function $mol_app_supplies_root() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            $mol_app_supplies_root.prototype.entered = function (next) {
                return $.$mol_state_session.value(this + ".entered()", next) || false;
            };
            $mol_app_supplies_root.prototype.pages = function () {
                if (!this.entered()) {
                    return [this.enter()];
                }
                var sub = [this.lister()];
                if (this.supply())
                    sub.push(this.detailer());
                else
                    sub.unshift(this.placeholder());
                return sub;
            };
            $mol_app_supplies_root.prototype.domain = function () {
                return new $.$mol_app_supplies_domain_mock();
            };
            $mol_app_supplies_root.prototype.supplies = function () {
                return this.domain().supplies();
            };
            $mol_app_supplies_root.prototype.supply_id = function (next) {
                return $.$mol_state_arg.value(this.state_key('supply'), next);
            };
            $mol_app_supplies_root.prototype.search_query = function (next) {
                if (!next)
                    return '';
                if (next.length < 7)
                    return next;
                this.supply_id(next);
                return '';
            };
            $mol_app_supplies_root.prototype.supply = function () {
                if (!this.entered())
                    return null;
                var id = this.supply_id();
                return id ? this.domain().supply(id) : null;
            };
            return $mol_app_supplies_root;
        }($.$mol_app_supplies_root));
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "domain", null);
        __decorate([
            $.$mol_mem()
        ], $mol_app_supplies_root.prototype, "search_query", null);
        $mol.$mol_app_supplies_root = $mol_app_supplies_root;
    })($mol = $.$mol || ($.$mol = {}));
})($ || ($ = {}));
//root.view.js.map
;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var $;
(function ($) {
    var $mol_app_supplies_demo = (function (_super) {
        __extends($mol_app_supplies_demo, _super);
        function $mol_app_supplies_demo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        $mol_app_supplies_demo.prototype.title = function () {
            return $.$mol_locale.text(this.locale_contexts(), "title");
        };
        $mol_app_supplies_demo.prototype.entered = function () {
            return true;
        };
        return $mol_app_supplies_demo;
    }($.$mol_app_supplies_root));
    $.$mol_app_supplies_demo = $mol_app_supplies_demo;
})($ || ($ = {}));
//demo.view.tree.js.map
//# sourceMappingURL=node.test.js.map