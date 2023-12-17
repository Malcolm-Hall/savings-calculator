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
// OPTIONS
if(document.querySelector('.calculator-content--options')) {
	import('./options.js').then(e => {
		console.log("Options loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, options not loaded (ಥ﹏ಥ)", e)
	})
}
