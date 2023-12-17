'use strict'

window._ = document.getElementById.bind(document);
window.$ = document.querySelector.bind(document);
window.$$ = document.querySelectorAll.bind(document);

console.log('Script is OK! ༼ つ ◕_◕ ༽つ')

// DIALOG TABLE
if(document.querySelector('.result-table__dialog')) {
	import('./dialog-table.js').then(e => {
		console.log("Dialog table loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, dialog tables not loaded (ಥ﹏ಥ)", e)
	})
}
// MASK
if(document.querySelector('[data-inputmask]')) {
	import('./mask.js').then(e => {
		console.log("Mask loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, masks not loaded (ಥ﹏ಥ)", e)
	})
}
// DATEPICKER
if(document.querySelector('.datepicker')) {
	import('./datepicker.js').then(e => {
		console.log("Datepicker loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, datepicker not loaded (ಥ﹏ಥ)", e)
	})
}
// TIMEPICKER
if(document.querySelector('.timepicker-input')) {
	import('./timepicker.js').then(e => {
		console.log("Timepicker loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, timepicker not loaded (ಥ﹏ಥ)", e)
	})
}
// HOURPICKER
if(document.querySelector('.hourpicker-input')) {
	import('./hourpicker.js').then(e => {
		console.log("Hourpicker loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, Hourpicker not loaded (ಥ﹏ಥ)", e)
	})
}
// OPTIONS
if(document.querySelector('.calculator-content--options')) {
	import('./options.js').then(e => {
		console.log("Options loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, options not loaded (ಥ﹏ಥ)", e)
	})
}

