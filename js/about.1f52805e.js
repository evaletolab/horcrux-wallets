(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"16f4":function(t,e,n){"use strict";n("e893")},9224:function(t){t.exports=JSON.parse('{"name":"horcrux","version":"0.10.2","private":true,"scripts":{"serve":"vue-cli-service serve","build":"vue-cli-service build --skip-plugins @vue/cli-plugin-eslint","test:unit":"vue-cli-service test:unit","lint":"vue-cli-service lint","deploy":"node scripts/gh-pages-deploy.js","btc":"browserify bitcoin.js --standalone bitcoinjs > ./bitcoinjs-lib.js"},"dependencies":{"@coinbase/wallet-sdk":"^3.6.3","@walletconnect/web3-provider":"^1.8.0","bitcoinjs-message":"^2.2.0","ethers":"^5.5.4","qr-scanner":"^1.4.1","qrcode":"^1.5.0","secrets.js-34r7h":"^2.0.1","tiny-secp256k1":"^2.2.1","vue":"^3.2.29","vue-class-component":"^8.0.0-rc.1","vue-property-decorator":"^9.1.2","vue-router":"^4.0.12","web3modal":"^1.9.12","zxcvbn-typescript":"^5.0.1"},"devDependencies":{"@babel/core":"^7.17.7","@babel/preset-typescript":"^7.16.7","@types/chai":"^4.3.0","@types/mocha":"^5.2.7","@types/node":"^17.0.23","@types/qrcode":"^1.4.2","@typescript-eslint/eslint-plugin":"^4.33.0","@typescript-eslint/parser":"^4.33.0","@vue/cli-plugin-eslint":"^4.5.15","@vue/cli-plugin-router":"^4.5.15","@vue/cli-plugin-typescript":"^4.5.15","@vue/cli-plugin-unit-mocha":"^4.5.15","@vue/cli-service":"^4.5.15","@vue/compiler-sfc":"^3.2.29","@vue/eslint-config-typescript":"^7.0.0","@vue/test-utils":"^2.0.0-rc.18","bitcoinjs-lib":"^6.0.1","browserify":"^17.0.0","chai":"^4.3.4","ecpair":"^2.0.1","eslint":"^6.8.0","eslint-plugin-vue":"^7.20.0","sass":"^1.49.0","sass-loader":"^8.0.2","typescript":"^4.1.6"}}')},"9ab4":function(t,e,n){"use strict";n.r(e),n.d(e,"__extends",(function(){return o})),n.d(e,"__assign",(function(){return i})),n.d(e,"__rest",(function(){return c})),n.d(e,"__decorate",(function(){return a})),n.d(e,"__param",(function(){return u})),n.d(e,"__metadata",(function(){return f})),n.d(e,"__awaiter",(function(){return s})),n.d(e,"__generator",(function(){return l})),n.d(e,"__createBinding",(function(){return p})),n.d(e,"__exportStar",(function(){return d})),n.d(e,"__values",(function(){return b})),n.d(e,"__read",(function(){return v})),n.d(e,"__spread",(function(){return y})),n.d(e,"__spreadArrays",(function(){return h})),n.d(e,"__await",(function(){return _})),n.d(e,"__asyncGenerator",(function(){return m})),n.d(e,"__asyncDelegator",(function(){return O})),n.d(e,"__asyncValues",(function(){return w})),n.d(e,"__makeTemplateObject",(function(){return g})),n.d(e,"__importStar",(function(){return j})),n.d(e,"__importDefault",(function(){return P})),n.d(e,"__classPrivateFieldGet",(function(){return S})),n.d(e,"__classPrivateFieldSet",(function(){return x}));
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var r=function(t,e){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])},r(t,e)};function o(t,e){function n(){this.constructor=t}r(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}var i=function(){return i=Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n],e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},i.apply(this,arguments)};function c(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(null!=t&&"function"===typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(t);o<r.length;o++)e.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(t,r[o])&&(n[r[o]]=t[r[o]])}return n}function a(t,e,n,r){var o,i=arguments.length,c=i<3?e:null===r?r=Object.getOwnPropertyDescriptor(e,n):r;if("object"===typeof Reflect&&"function"===typeof Reflect.decorate)c=Reflect.decorate(t,e,n,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(c=(i<3?o(c):i>3?o(e,n,c):o(e,n))||c);return i>3&&c&&Object.defineProperty(e,n,c),c}function u(t,e){return function(n,r){e(n,r,t)}}function f(t,e){if("object"===typeof Reflect&&"function"===typeof Reflect.metadata)return Reflect.metadata(t,e)}function s(t,e,n,r){function o(t){return t instanceof n?t:new n((function(e){e(t)}))}return new(n||(n=Promise))((function(n,i){function c(t){try{u(r.next(t))}catch(e){i(e)}}function a(t){try{u(r["throw"](t))}catch(e){i(e)}}function u(t){t.done?n(t.value):o(t.value).then(c,a)}u((r=r.apply(t,e||[])).next())}))}function l(t,e){var n,r,o,i,c={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(t){return function(e){return u([t,e])}}function u(i){if(n)throw new TypeError("Generator is already executing.");while(c)try{if(n=1,r&&(o=2&i[0]?r["return"]:i[0]?r["throw"]||((o=r["return"])&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,r=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(o=c.trys,!(o=o.length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){c=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){c.label=i[1];break}if(6===i[0]&&c.label<o[1]){c.label=o[1],o=i;break}if(o&&c.label<o[2]){c.label=o[2],c.ops.push(i);break}o[2]&&c.ops.pop(),c.trys.pop();continue}i=e.call(t,c)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}}function p(t,e,n,r){void 0===r&&(r=n),t[r]=e[n]}function d(t,e){for(var n in t)"default"===n||e.hasOwnProperty(n)||(e[n]=t[n])}function b(t){var e="function"===typeof Symbol&&Symbol.iterator,n=e&&t[e],r=0;if(n)return n.call(t);if(t&&"number"===typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(e?"Object is not iterable.":"Symbol.iterator is not defined.")}function v(t,e){var n="function"===typeof Symbol&&t[Symbol.iterator];if(!n)return t;var r,o,i=n.call(t),c=[];try{while((void 0===e||e-- >0)&&!(r=i.next()).done)c.push(r.value)}catch(a){o={error:a}}finally{try{r&&!r.done&&(n=i["return"])&&n.call(i)}finally{if(o)throw o.error}}return c}function y(){for(var t=[],e=0;e<arguments.length;e++)t=t.concat(v(arguments[e]));return t}function h(){for(var t=0,e=0,n=arguments.length;e<n;e++)t+=arguments[e].length;var r=Array(t),o=0;for(e=0;e<n;e++)for(var i=arguments[e],c=0,a=i.length;c<a;c++,o++)r[o]=i[c];return r}function _(t){return this instanceof _?(this.v=t,this):new _(t)}function m(t,e,n){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var r,o=n.apply(t,e||[]),i=[];return r={},c("next"),c("throw"),c("return"),r[Symbol.asyncIterator]=function(){return this},r;function c(t){o[t]&&(r[t]=function(e){return new Promise((function(n,r){i.push([t,e,n,r])>1||a(t,e)}))})}function a(t,e){try{u(o[t](e))}catch(n){l(i[0][3],n)}}function u(t){t.value instanceof _?Promise.resolve(t.value.v).then(f,s):l(i[0][2],t)}function f(t){a("next",t)}function s(t){a("throw",t)}function l(t,e){t(e),i.shift(),i.length&&a(i[0][0],i[0][1])}}function O(t){var e,n;return e={},r("next"),r("throw",(function(t){throw t})),r("return"),e[Symbol.iterator]=function(){return this},e;function r(r,o){e[r]=t[r]?function(e){return(n=!n)?{value:_(t[r](e)),done:"return"===r}:o?o(e):e}:o}}function w(t){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var e,n=t[Symbol.asyncIterator];return n?n.call(t):(t="function"===typeof b?b(t):t[Symbol.iterator](),e={},r("next"),r("throw"),r("return"),e[Symbol.asyncIterator]=function(){return this},e);function r(n){e[n]=t[n]&&function(e){return new Promise((function(r,i){e=t[n](e),o(r,i,e.done,e.value)}))}}function o(t,e,n,r){Promise.resolve(r).then((function(e){t({value:e,done:n})}),e)}}function g(t,e){return Object.defineProperty?Object.defineProperty(t,"raw",{value:e}):t.raw=e,t}function j(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}function P(t){return t&&t.__esModule?t:{default:t}}function S(t,e){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return e.get(t)}function x(t,e,n){if(!e.has(t))throw new TypeError("attempted to set private field on non-instance");return e.set(t,n),n}},ce1f:function(t,e,n){"use strict";n.d(e,"a",(function(){return I})),n.d(e,"b",(function(){return E})),n.d(e,"c",(function(){return R}));var r=n("7a23");
/**
  * vue-class-component v8.0.0-rc.1
  * (c) 2015-present Evan You
  * @license MIT
  */function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function c(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function u(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?u(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):u(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if("function"!==typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function p(t,e){return p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},p(t,e)}function d(){if("undefined"===typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"===typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}function b(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function v(t,e){return!e||"object"!==typeof e&&"function"!==typeof e?b(t):e}function y(t){var e=d();return function(){var n,r=l(t);if(e){var o=l(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return v(this,n)}}function h(t){return _(t)||m(t)||O(t)||g()}function _(t){if(Array.isArray(t))return w(t)}function m(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function O(t,e){if(t){if("string"===typeof t)return w(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?w(t,e):void 0}}function w(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function g(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function j(t,e,n){Object.defineProperty(t,e,{get:n,enumerable:!1,configurable:!0})}function P(t,e,n){Object.defineProperty(t,e,{get:function(){return n[e].value},set:function(t){n[e].value=t},enumerable:!0,configurable:!0})}function S(t){var e=Object.getPrototypeOf(t.prototype);if(e)return e.constructor}function x(t,e){return t.hasOwnProperty(e)?t[e]:void 0}var k=function(){function t(e,n){var r=this;o(this,t),j(this,"$props",(function(){return e})),j(this,"$attrs",(function(){return n.attrs})),j(this,"$slots",(function(){return n.slots})),j(this,"$emit",(function(){return n.emit})),Object.keys(e).forEach((function(t){Object.defineProperty(r,t,{enumerable:!1,configurable:!0,writable:!0,value:e[t]})}))}return c(t,null,[{key:"registerHooks",value:function(t){var e;(e=this.__h).push.apply(e,h(t))}},{key:"with",value:function(t){var e=new t,n={};Object.keys(e).forEach((function(t){var r=e[t];n[t]=null!==r&&void 0!==r?r:null}));var r=function(t){s(n,t);var e=y(n);function n(){return o(this,n),e.apply(this,arguments)}return n}(this);return r.__b={props:n},r}},{key:"__vccOpts",get:function(){if(this===E)return{};var t=this,e=x(t,"__c");if(e)return e;var n=f({},x(t,"__o"));t.__c=n;var o=S(t);o&&(n["extends"]=o.__vccOpts);var i=x(t,"__b");i&&(n.mixins=n.mixins||[],n.mixins.unshift(i)),n.methods=f({},n.methods),n.computed=f({},n.computed);var c=t.prototype;Object.getOwnPropertyNames(c).forEach((function(e){if("constructor"!==e)if(t.__h.indexOf(e)>-1)n[e]=c[e];else{var r=Object.getOwnPropertyDescriptor(c,e);"function"!==typeof r.value?(r.get||r.set)&&(n.computed[e]={get:r.get,set:r.set}):n.methods[e]=r.value}})),n.setup=function(e,n){var o,i=new t(e,n),c=Object.keys(i),a={},u=null;return c.forEach((function(t){void 0===i[t]||i[t]&&i[t].__s||(a[t]=Object(r["A"])(i[t]),P(i,t,a))})),c.forEach((function(t){if(i[t]&&i[t].__s){var e=i[t].__s();e instanceof Promise?(u||(u=Promise.resolve(a)),u=u.then((function(){return e.then((function(e){return a[t]=Object(r["x"])(e),a}))}))):a[t]=Object(r["x"])(e)}})),null!==(o=u)&&void 0!==o?o:a};var a=x(t,"__d");a&&a.forEach((function(t){return t(n)}));var u=["render","ssrRender","__file","__cssModules","__scopeId","__hmrId"];return u.forEach((function(e){t[e]&&(n[e]=t[e])})),n}}]),t}();k.__h=["data","beforeCreate","created","beforeMount","mounted","beforeUnmount","unmounted","beforeUpdate","updated","activated","deactivated","render","errorCaptured","serverPrefetch"];var E=k;function I(t){return function(e){return e.__o=t,e}}function R(t){return function(e,n,r){var o="function"===typeof e?e:e.constructor;o.__d||(o.__d=[]),"number"!==typeof r&&(r=void 0),o.__d.push((function(e){return t(e,n,r)}))}}},e893:function(t,e,n){},f820:function(t,e,n){"use strict";n.r(e);var r=n("7a23"),o={class:"about container"},i=Object(r["i"])('<h1 data-v-86ed0a72>Horcrux is an educational project made with <span class="pink" data-v-86ed0a72>❤️</span> and based on the following works</h1><ul data-v-86ed0a72><li data-v-86ed0a72><a href="https://iancoleman.io/bip39" data-v-86ed0a72>the great Ian Coleman bip39 demonstration</a></li><li data-v-86ed0a72>Entropy</li><li data-v-86ed0a72><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" data-v-86ed0a72>BIP39</a> Mnemonic</li><li data-v-86ed0a72><a href="https://github.com/bitcoin/bips/blob/master/bip-0039.mediawiki" data-v-86ed0a72>BIP39</a> Seed</li><li data-v-86ed0a72><a href="https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki" data-v-86ed0a72>BIP32</a> Root Key</li><li data-v-86ed0a72><a href="https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki" data-v-86ed0a72>BIP44</a> derivation path</li><li data-v-86ed0a72><a href="https://github.com/bitcoin/bips/blob/master/bip-0084.mediawiki" data-v-86ed0a72>BIP84</a> Segwit derivation path</li><li data-v-86ed0a72>SSS (Shamir Shared Secret)</li><li data-v-86ed0a72><a href="https://github.com/evaletolab/horcrux-wallets/blob/oe-hardhat/hardhat/contracts/Horcrux.sol" data-v-86ed0a72>HorcruxVault Smart Contract</a></li><li data-v-86ed0a72>Shared as MIT <a href="https://github.com/evaletolab/horcrux-wallets" data-v-86ed0a72>github</a></li></ul>',2);function c(t,e,n,c,a,u){var f=Object(r["D"])("package-versions");return Object(r["u"])(),Object(r["g"])("div",o,[i,Object(r["k"])(f)])}var a=n("9ab4"),u=n("ce1f"),f={class:"package"};function s(t,e,n,o,i,c){return Object(r["u"])(),Object(r["g"])("div",f,[Object(r["h"])("h3",null,"Build v"+Object(r["F"])(t.VERSION),1),Object(r["h"])("ul",null,[(Object(r["u"])(!0),Object(r["g"])(r["a"],null,Object(r["B"])(t.packages,(function(e,n){return Object(r["u"])(),Object(r["g"])("li",{key:e},[Object(r["j"])(Object(r["F"])(n)+" ",1),Object(r["h"])("b",null,"v"+Object(r["F"])(t.cleanVersion(e)),1)])})),128))])])}var l=n("9224"),p=function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.VERSION=l.version,e}return Object(a["__extends"])(e,t),Object.defineProperty(e.prototype,"packages",{get:function(){return l.dependencies},enumerable:!1,configurable:!0}),e.prototype.cleanVersion=function(t){return t.replace(/[^~]/,"")},e=Object(a["__decorate"])([Object(u["a"])({props:{filter:String}})],e),e}(u["b"]),d=p,b=n("6b0d"),v=n.n(b);const y=v()(d,[["render",s]]);var h=y,_=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return Object(a["__extends"])(e,t),e.prototype.mounted=function(){},e=Object(a["__decorate"])([Object(u["a"])({components:{PackageVersions:h}})],e),e}(u["b"]),m=_;n("16f4");const O=v()(m,[["render",c],["__scopeId","data-v-86ed0a72"]]);e["default"]=O}}]);
//# sourceMappingURL=about.1f52805e.js.map