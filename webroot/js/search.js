$(document).ready(function(event){
	$('#search input').autocomplete({
		source:getResults
	});
});

function getResults(term, callback) {
	var options = [];
	$.get(
		$('#search').data('webroot') + 'li3_docs/search/' + term.term,
		function(data, status, xhr) {
			for(i in data.results) {
				options.push(createValue(
					data.results[i]['class'],
					data.results[i].type,
					data.results[i].name
				));
			}
			callback(options);
		},
		'json'
	);
}

function createValue(className, type, name) {
	var value = className;
	switch(type) {
		case 'method':
			value += '::' + name + '()';
			break;
		case 'property':
			value += '::$' + name;
			break;
		case 'class':
			break;
	}
	return value;
}