// 1. The url being used here is from this spreadsheet : http://bit.ly/1SA1RYe
// 		We should replace it with the dev confessions sheet and adapt the requests.

// 2. There are way more requests and code than we need (learning),
// 		but it will be easy to prune. 


var app = {};

// Retrieve ALL the data! ------------------------------------
app.getData = function() {

	$.ajax({
		url: 'https://sheetsu.com/apis/57fe9882', // to be replaced with actual 
		method: 'GET',
		dataType: 'json',
		success : function (data) {
			// If I get data back
			if (data.status === 200) {
				console.log('omg! You got stuff back!!!');
				// console log ALL the things for purposes of learning
				console.log(data.result); // all the stuff
				console.log(data.result[0]); // first object
				console.log(data.result[0].Author); // first object author
			}
			// if the spreadsheet is not accessible (but ajax call still worked!)
			if (data.status === 500) {
				console.log('500 error! Sorry, this sheet is broken');
			}
		},
		// ajax call fails (like 404 error in url or something)
		error : function() {
			console.log('oops! I got nothin');
		}
	}) 
}

// Retrieve column data! ------------------------------------
app.getDataColumn = function() {

	$.ajax({
		url: 'https://sheetsu.com/apis/57fe9882/column/Author', // retrieve only author column
		method: 'GET',
		dataType: 'json',
		success : function (data) {
			console.log('All the authors!');
			console.log(data.result); // all the authors
		}
	}) 
}

// Retrieve all data from specific row passed as "rowNumber"! ---------------------------------------------
app.getDataRow = function(rowNumber) {

	$.ajax({
		url: 'https://sheetsu.com/apis/57fe9882',
		method: 'GET',
		dataType: 'json',
		success : function (data) {
			console.log('Gimme a row!');
			console.log(data.result[rowNumber]); // returns data from passed row number as an object

			app.displayDataRow(data.result[rowNumber]); // displays the data on the page
		}
	}) 
}

// display row data on page! ------------------------------------
app.displayDataRow = function(rowData) {

	var resource = rowData["Resource Name"];
	var url = rowData["URL"];
	var author = rowData["Author"];
	var type = rowData["Type"];

	// Append to the page
	$('.resource').html("<strong>Resource</strong>: "+resource);
	$('.url').html("<strong>URL</strong>: "+url);
	$('.author').html("<strong>Author</strong>: "+author);
	$('.type').html("<strong>Type</strong>: "+type);


}

$(function() {
	// Get all data from row 3
	app.getDataRow(3);
});