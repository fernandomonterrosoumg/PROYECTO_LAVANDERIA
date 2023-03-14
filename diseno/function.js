var apiEndpoint = 'http://localhost:3000/api/v1/general/';

var Headers = {
    json: { header: 'Content-Type', value: 'application/json' },
    form: { header: 'Content-Type', value: 'application/x-www-form-urlencoded' }
};



var vm = new Vue({
    el: '#app',
	directives: {
		upper: {
			update: function (el) {
			el.value = el.value.toUpperCase();
			}
		}
	},
	mounted: function(){

		this.fetchIntercept = function (r) { function n(e) { if (t[e]) return t[e].exports; var o = t[e] = { exports: {}, id: e, loaded: !1 }; return r[e].call(o.exports, o, o.exports, n), o.loaded = !0, o.exports } var t = {}; return n.m = r, n.c = t, n.p = "", n(0) }([function (r, n, t) { (function (n, e) { "use strict"; function o(r) { if (Array.isArray(r)) { for (var n = 0, t = Array(r.length); n < r.length; n++)t[n] = r[n]; return t } return Array.from(r) } function i(r) { if (!r.fetch) try { t(2) } catch (n) { throw Error("No fetch avaibale. Unable to register fetch-intercept") } r.fetch = function (r) { return function () { for (var n = arguments.length, t = Array(n), e = 0; n > e; e++)t[e] = arguments[e]; return f.apply(void 0, [r].concat(t)) } }(r.fetch) } function f(r) { for (var n = arguments.length, t = Array(n > 1 ? n - 1 : 0), e = 1; n > e; e++)t[e - 1] = arguments[e]; var i = l.reduce(function (r, n) { return [n].concat(r) }, []), f = Promise.resolve(t); return i.forEach(function (r) { var n = r.request, t = r.requestError; (n || t) && (f = f.then(function (r) { return n.apply(void 0, o(r)) }, t)) }), f = f.then(function (n) { return r.apply(void 0, o(n)) }), i.forEach(function (r) { var n = r.response, t = r.responseError; (n || t) && (f = f.then(n, t)) }), f } var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (r) { return typeof r } : function (r) { return r && "function" == typeof Symbol && r.constructor === Symbol ? "symbol" : typeof r }, c = "object" === ("undefined" == typeof navigator ? "undefined" : u(navigator)) && "ReactNative" === navigator.product, s = "object" === ("undefined" == typeof n ? "undefined" : u(n)) && !0, a = "object" === ("undefined" == typeof window ? "undefined" : u(window)), p = "function" == typeof importScripts; if (c) i(e); else if (p) i(self); else if (a) i(window); else { if (!s) throw new Error("Unsupported environment for fetch-intercept"); i(e) } var l = []; r.exports = { register: function (r) { return l.push(r), function () { var n = l.indexOf(r); n >= 0 && l.splice(n, 1) } }, clear: function () { l = [] } } }).call(n, t(1), function () { return this }()) }, function (r, n) { "use strict"; function t() { s = !1, f.length ? c = f.concat(c) : a = -1, c.length && e() } function e() { if (!s) { var r = setTimeout(t); s = !0; for (var n = c.length; n;) { for (f = c, c = []; ++a < n;)f && f[a].run(); a = -1, n = c.length } f = null, s = !1, clearTimeout(r) } } function o(r, n) { this.fun = r, this.array = n } function i() { } var f, u = r.exports = {}, c = [], s = !1, a = -1; u.nextTick = function (r) { var n = new Array(arguments.length - 1); if (arguments.length > 1) for (var t = 1; t < arguments.length; t++)n[t - 1] = arguments[t]; c.push(new o(r, n)), 1 !== c.length || s || setTimeout(e, 0) }, o.prototype.run = function () { this.fun.apply(null, this.array) }, u.title = "browser", u.browser = !0, u.env = {}, u.argv = [], u.version = "", u.versions = {}, u.on = i, u.addListener = i, u.once = i, u.off = i, u.removeListener = i, u.removeAllListeners = i, u.emit = i, u.binding = function (r) { throw new Error("process.binding is not supported") }, u.cwd = function () { return "/" }, u.chdir = function (r) { throw new Error("process.chdir is not supported") }, u.umask = function () { return 0 } }, function (r, n) { r.exports = require("whatwg-fetch") }]);

        this.fetchIntercept.register({
            request: function (url, config) {
                $("#loading").css("display", "block");
                return [url, config];
            },

            requestError: function (error) {
                $("#loading").css("display", "none");
                return Promise.reject(error);
            },

            response: function (response) {
                $("#loading").css("display", "none");
                return response;
            },

            responseError: function (error) {
                $("#loading").css("display", "none");
                return Promise.reject(error);
            }
        });

		
    },
	data:{
		declaraciones:[],
		personas:[],
		cuenta:{
			"id_tipo_cuenta":1,
			"saldo":0,
			"id_persona":0
		}
	},
	watch:{
		
	},
    methods: {
		onChangeTipo(event) {
			var self = this;
            var tipo = event.target.value;

			switch (tipo) {
				case "1":
					self.listarPersonasCuenta();
					break;
			
				default:
					break;
			}
        },
		cuentaLink(id){
			window.location.href='cuenta.html?id_persona='+id;
			
		},alerta({type='GET',message}){
			if(type=='GET'){
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ucurrrio un error que puede afectar el funcionamiento: => '+message,
				});
			}else if(type=='POST'){
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ucurrrio un error al enviar petición: => '+message,
				})
			};
			
		},createCuenta: function(){
			var self = this;

			let uri = window.location.search.substring(1); 
			let params = new URLSearchParams(uri);
			self.cuenta.id_persona= params.get("id_persona");

			var requestOptions = {
				method: 'POST',
				headers: {"Content-Type":"application/json"},
				//headers: Headers.form,
				body: JSON.stringify(self.cuenta),
				redirect: 'follow'
			};
                     
			return fetch(apiEndpoint + 'createCuenta',requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data){
					Swal.fire({
						icon: 'success',
						title: 'Correcto',
						text: res.data,
					});
				}else if(res.error){
					throw res.error;
				}	
			}).catch(function (error) {
				self.alerta({type:'GET',message:error});
				return false;
			});
		},
		
		getData: function(){
			var self = this;
			var raw = 'filtros=' + JSON.stringify(self.filtro);

			var requestOptions = {
				method: 'POST',
				headers: {"Content-Type":"application/x-www-form-urlencoded"},
				//headers: Headers.form,
				body: raw,
				redirect: 'follow'
			};
                     
			return fetch(apiEndpointNuevo + 'getDeclaracionImpo',requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data){
					self.declaraciones=res.data;
				}else if(res.error){
					throw res.error;
				}	
			}).catch(function (error) {
				self.alerta({type:'GET',message:error});
				return false;
			});
		},listarPersonasCuenta: function(){
			var self = this;
			return fetch(apiEndpoint + 'listarPersonasCuenta').then(resp =>
				resp.json()
			).then(res => {
				if (res.data){
					self.personas=res.data;
				}else if(res.error){
					throw res.error;
				}	
			}).catch(function (error) {
				self.alerta({type:'GET',message:error});
				return false;
			});
		},
		
    }
});