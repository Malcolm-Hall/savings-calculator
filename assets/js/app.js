'use strict'

console.log('Script is OK! ༼ つ ◕_◕ ༽つ');

// DIALOG TABLE
if (document.querySelector('.result-table__dialog')) {
	import('./dialog-table.js').then(e => {
		console.log("Dialog table loaded (づ ◕‿◕ )づ")
	}).catch(e => {
		console.log("Sorry, dialog tables not loaded (ಥ﹏ಥ)", e)
	})
}
