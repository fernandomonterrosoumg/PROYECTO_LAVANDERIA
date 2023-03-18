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
	mounted: function () {

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

		let uri = window.location.search.substring(1);
		let params = new URLSearchParams(uri);
		this.id_coti = params.get("cotizacion_id");
		if (this.id_coti != null) {
			this.getCotizacion(this.id_coti);
		}


	},
	data: {
		id_coti: 0,
		declaraciones: [],
		personas: [],
		info_coti: {
			"cliente": {},
			"cotizacion": [{ COTIZACION_ID: 0 }]
		},
		cuenta: {
			"id_tipo_cuenta": 1,
			"saldo": 0,
			"id_persona": 0
		},
		cliente: {
			"apellido": "",
			"nombre": "",
			"calle": "",
			"apartamento": "",
			"piso": "",
			"barrio": "",
			"telefono": "0",
			"nit": ""
		}, cotizacion: {
			"COTIZACION_ID": "",
			"cotizacion_fecha": "",
			"CANTIDAD_PRENDAS": 0,
			"fecha_devolucion": "",
			"PEDIDO_TOTAL": 0,
			"id_cliente": "",
			"info_cliente": {
				"ID_CLIENTE": 0,
				"APELLIDO": "",
				"NOMBRE": "",
				"CALLE": "",
				"APARTAMENTO": "",
				"PISO": "",
				"BARRIO": "",
				"TELEFONO": "",
				"NIT": ""
			},
			det_coti: []
		}, paramCoti: {
			SER_PRE_ID: 0,
			SEV_TIPO_ID: 0,
			PRECIO: 0,
			TOTAL_NETO: 0,
			PIEZAS: 0,
			PRENDA_DESCRIPCION: "",
		},
		listaCoti: [],
		noConsultarIDCoti: false,
		factura: {
			"cliente": {
				"ID_CLIENTE": 3060,
				"APELLIDO": "Monterroso",
				"NOMBRE": "Elmer",
				"CALLE": "27 calle",
				"APARTAMENTO": "8 b",
				"PISO": "12",
				"BARRIO": "santa fe",
				"TELEFONO": "41291570",
				"NIT": "562162-3"
			},
			"cotizacion": [
				{
					"DESCRIPCION": "Maquina Lavadora",
					"PRENDA": "Acolchado",
					"SEV_TIPO_ID": 2,
					"DESCRIPCION_1": "Maquina Lavadora",
					"SER_PRE_ID": 2,
					"PRENDA_1": "Acolchado",
					"DET_FAC_ID": 45,
					"SER_PRE_ID_1": 2,
					"SEV_TIPO_ID_1": 2,
					"DET_CANTIDAD": 12,
					"DEL_PRE_TOT": 3600,
					"DEL_PRE_UNI": 300,
					"FACTURA_ID": 11,
					"FACTURA_ID_1": 11,
					"FACTURA_FECHA": "2023-03-18T01:57:15.000Z",
					"CANTIDAD_PRENDAS": 48,
					"PEDIDO_TOTAL": 11280,
					"ESTADO": "FACTURADA",
					"FIRMA_FEL": "60326311",
					"ID_CLIENTE": 3060,
					"COTIZACION_ID": 18
				}
			],
			"factura": {
				"FACTURA_ID": 11,
				"FACTURA_FECHA": "2023-03-18T01:57:15.000Z",
				"CANTIDAD_PRENDAS": 48,
				"PEDIDO_TOTAL": 11280,
				"ESTADO": "FACTURADA",
				"FIRMA_FEL": "60326311",
				"ID_CLIENTE": 3060,
				"COTIZACION_ID": 18
			}
		},
		repoMensualServicio: [],
		repoCompras: [],
	},
	watch: {

	},
	methods: {
		nitIsValid(nit) {
			if (!nit) {
				return true;
			}

			var nitRegExp = new RegExp('^[0-9]+(-?[0-9kK])?$');

			if (!nitRegExp.test(nit)) {
				return false;
			}

			//console.log(nit);
			nit = nit.toString().replace(/-/, '');
			var lastChar = nit.length - 1;
			var number = nit.substring(0, lastChar);
			var expectedCheker = nit.substring(lastChar, lastChar + 1).toLowerCase();

			var factor = number.length + 1;
			var total = 0;

			for (var i = 0; i < number.length; i++) {
				var character = number.substring(i, i + 1);
				var digit = parseInt(character, 10);

				total += (digit * factor);
				factor = factor - 1;
			}

			var modulus = (11 - (total % 11)) % 11;
			var computedChecker = (modulus == 10 ? "k" : modulus.toString());

			return expectedCheker === computedChecker;
		},
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
		}, printGeneral(id) {
			var elemento = document.getElementById(id);
			var contenido = elemento.innerHTML;
			document.write('<html><head><title>Impresion</title></head><body>');
			document.write(contenido);
			document.write('</body></html>');
			window.document.close(); // necessary for IE >= 10
			window.focus(); // necessary for IE >= 10

			window.print();
			window.close();
			/*
			var printWindow1 = window.open();
			
			// Agrega el contenido a imprimir a cada ventana
			$(printWindow1.document.body).html($('#'+id).html());
			
			// Imprime cada ventana
			printWindow1.print();
			*/


		}, print(id) {


			var printWindow1 = window.open();
			var printWindow2 = window.open();

			// Agrega el contenido a imprimir a cada ventana
			$(printWindow1.document.body).html('<html><head><title>Copia cliente</title></head><body>' + $('#' + id).html());
			$(printWindow2.document.body).html('<html><head><title>Copia original</title></head><body>' + $('#' + id).html());

			// Imprime cada ventana
			printWindow1.print();
			printWindow2.print();

			/*
			var elemento = document.getElementById(id);
			var contenido = elemento.innerHTML;
			document.write('<html><head><title>Impresion</title></head><body>');
			document.write(contenido);
			document.write('</body></html>');
			window.document.close(); // necessary for IE >= 10
			window.focus(); // necessary for IE >= 10
		
			window.print();
			window.close();
			*/


		}, sumarPrecio(event) {
			var self = this;
			self.paramCoti.TOTAL_NETO = self.paramCoti.PIEZAS * self.paramCoti.PRECIO;
		}, quitarItem(index) {
			var self = this;
			self.cotizacion.det_coti.splice(index, 1);
		}, agregarArticulo(event) {
			var self = this;
			//self.paramCoti;

			if (self.cotizacion.det_coti.filter(x => x.SER_PRE_ID === self.paramCoti.SER_PRE_ID && x.SEV_TIPO_ID === self.paramCoti.SEV_TIPO_ID).length > 0) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Este tipo de servicio ya fue agregado con anterioridad',
				});
			} else if (self.paramCoti.TOTAL_NETO == 0) {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Faltan datos por ingresar',
				});
			};


			let keys = {
				SER_PRE_ID: self.paramCoti.SER_PRE_ID,
				SER_PRE_DESC: self.paramCoti.SER_PRE_ID == 1 ? "Lavado a Seco" : "Maquina Lavadora",
				SEV_TIPO_ID: self.paramCoti.SEV_TIPO_ID,
				SEV_TIPO_DESC: self.paramCoti.SEV_TIPO_ID == 1 ? "Blusa" : "Acolchado",
				DET_CANTIDAD: self.paramCoti.PIEZAS,
				DEL_PRE_TOT: self.paramCoti.TOTAL_NETO,
				DEL_PRE_UNI: self.paramCoti.PRECIO,
				PRENDA_DESCRIPCION: self.paramCoti.PRENDA_DESCRIPCION,
			};

			self.cotizacion.det_coti.push(keys);

			let totalCantidad = 0;
			let totalPrecio = 0;
			for (let i = 0; i < self.cotizacion.det_coti.length; i++) {
				totalCantidad += parseInt(self.cotizacion.det_coti[i].DET_CANTIDAD);
				totalPrecio += parseInt(self.cotizacion.det_coti[i].DEL_PRE_TOT);
			}
			self.cotizacion.CANTIDAD_PRENDAS = totalCantidad;
			console.log(totalPrecio);
			self.cotizacion.PEDIDO_TOTAL = totalPrecio;
			self.paramCoti = {
				SER_PRE_ID: 0,
				SEV_TIPO_ID: 0,
				PRECIO: 0,
				TOTAL_NETO: 0,
				PIEZAS: 0,
			};
			console.log(JSON.stringify(self.cotizacion));
		}, preciosCoti(event) {
			var self = this;
			if (self.paramCoti.SER_PRE_ID == "" || self.paramCoti.SEV_TIPO_ID == "") {

			} else if (self.paramCoti.SER_PRE_ID != "" && self.paramCoti.SEV_TIPO_ID != "") {
				var requestOptions = {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(self.paramCoti),
				};

				return fetch(apiEndpoint + 'getTarifa', requestOptions).then(resp =>
					resp.json()
				).then(res => {
					if (res.data) {
						self.paramCoti = res.data;
					} else if (res.error) {
						throw res.error;
					}
				}).catch(function (error) {
					self.alerta({ type: 'GET', message: error });
					return false;
				});

			};
		},
		cuentaLink(id) {
			window.location.href = 'cuenta.html?id_persona=' + id;

		}, linkFactura(elemento) {
			console.log(elemento.cotizacion[0].COTIZACION_ID);

			fetch(apiEndpoint + 'facturar?cotizacion_id=' + elemento.cotizacion[0].COTIZACION_ID).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					Swal.fire({
						icon: 'success',
						title: 'Correcto',
						text: res.data + " y generando formato de factura en unos segundos...",
					});

					setTimeout(function () {
						window.location.href = 'factura.html?cotizacion_id=' + elemento.cotizacion[0].COTIZACION_ID + "&ID_CLIENTE=" + elemento.cliente.ID_CLIENTE;
					}, 2000);
				} else if (res.error) {
					throw res.error;
				}
			});






		}, cotiLink(id) {
			window.location.href = 'cotizacionDet.html?cotizacion_id=' + id;

		}, alerta({ type = 'GET', message }) {
			if (type == 'GET') {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ucurrrio un error que puede afectar el funcionamiento: => ' + message,
				});
			} else if (type == 'POST') {
				Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Ucurrrio un error al enviar petición: => ' + message,
				})
			};

		}, createCuenta: function () {
			var self = this;

			let uri = window.location.search.substring(1);
			let params = new URLSearchParams(uri);
			self.cuenta.id_persona = params.get("id_persona");


			var requestOptions = {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				//headers: Headers.form,
				body: JSON.stringify(self.cuenta),
				redirect: 'follow'
			};

			return fetch(apiEndpoint + 'createCuenta', requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					Swal.fire({
						icon: 'success',
						title: 'Correcto',
						text: res.data,
					});
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		}, createCotizacion: function () {
			var self = this;
			let uri = window.location.search.substring(1);
			let params = new URLSearchParams(uri);
			//self.cuenta.id_persona= params.get("id_persona");
			if (self.cotizacion.info_cliente.NOMBRE == "") {
				return Swal.fire({
					icon: 'error',
					title: 'Oops...',
					text: 'Revise el formulario, informacion incompleta',
				});
			}

			var requestOptions = {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				//headers: Headers.form,
				body: JSON.stringify(self.cotizacion),
				redirect: 'follow'
			};

			return fetch(apiEndpoint + 'createCotizacion', requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					Swal.fire({
						icon: 'success',
						title: 'Correcto',
						text: res.data,
					});
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		}, createCliente: function () {
			var self = this;

			let uri = window.location.search.substring(1);
			let params = new URLSearchParams(uri);
			//self.cuenta.id_persona= params.get("id_persona");


			if (!self.nitIsValid(self.cliente.nit)) {
				self.alerta({ type: 'GET', message: "NIT invalido ante SAT." });
				return false;
			};

			var requestOptions = {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				//headers: Headers.form,
				body: JSON.stringify(self.cliente),
				redirect: 'follow'
			};

			return fetch(apiEndpoint + 'createCliente', requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					Swal.fire({
						icon: 'success',
						title: 'Correcto',
						text: res.data,
					});
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		}, getClienteById: function () {


			var self = this;
			if (!self.noConsultarIDCoti) {
				fetch(apiEndpoint + 'getSecuenciaCotizacion').then(resp =>
					resp.json()
				).then(res => {
					if (res.data) {
						self.cotizacion.COTIZACION_ID = res.data.COTIZACION_ID;
						self.noConsultarIDCoti = true;
					} else if (res.error) {
						throw res.error;
					}
				}).catch(function (error) {
					self.alerta({ type: 'GET', message: error });

				});
			}

			let uri = window.location.search.substring(1);
			let params = new URLSearchParams(uri);
			//self.cuenta.id_persona= params.get("id_persona");

			var requestOptions = {
				method: 'POST',
				headers: { "Content-Type": "application/json" },
				//headers: Headers.form,
				body: JSON.stringify({ nit: self.cotizacion.info_cliente.NIT }),
				redirect: 'follow'
			};

			return fetch(apiEndpoint + 'getClienteById', requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					document.getElementById('nitCoti').disabled = true;
					self.cotizacion.info_cliente = res.data;


				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		}, listCotizaciones: function () {
			var self = this;

			return fetch(apiEndpoint + 'listCotizaciones').then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.listaCoti = res.data;
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		}, reportes: function () {
			var self = this;

			fetch(apiEndpoint + 'repoMensualServicio').then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.repoMensualServicio = res.data;
					setTimeout(function () {
						$('#repo1').DataTable({
							dom: 'Bfrtip',
							buttons: [
								'copy', 'csv', 'excel', 'pdf', 'print'
							]
						});
					}, 2000);
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});

			fetch(apiEndpoint + 'repoCompras').then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.repoCompras = res.data;
					setTimeout(function () {
						$('#repo2').DataTable({
							dom: 'Bfrtip',
							buttons: [
								'copy', 'csv', 'excel', 'pdf', 'print'
							]
						});
					}, 2000);
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});

		}, getCotizacion: function (id) {
			var self = this;
			return fetch(apiEndpoint + 'getCotizacion?cotizacion_id=' + id).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.info_coti = res.data;
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		},
		getFactura: function (id) {
			var self = this;
			return fetch(apiEndpoint + 'getCotizacionFac' + window.location.search).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.factura = res.data;


					setTimeout(function () {
						self.printGeneral('app');
					}, 1000); // waits for 1 second before executing the anonymous function


				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		},
		getData: function () {
			var self = this;
			var raw = 'filtros=' + JSON.stringify(self.filtro);

			var requestOptions = {
				method: 'POST',
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				//headers: Headers.form,
				body: raw,
				redirect: 'follow'
			};

			return fetch(apiEndpointNuevo + 'getDeclaracionImpo', requestOptions).then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.declaraciones = res.data;
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		}, listarPersonasCuenta: function () {
			var self = this;
			return fetch(apiEndpoint + 'listarPersonasCuenta').then(resp =>
				resp.json()
			).then(res => {
				if (res.data) {
					self.personas = res.data;
				} else if (res.error) {
					throw res.error;
				}
			}).catch(function (error) {
				self.alerta({ type: 'GET', message: error });
				return false;
			});
		},

	}
});