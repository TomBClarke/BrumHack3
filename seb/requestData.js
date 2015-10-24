function requestData(url, callBack)
{
	// Create a new XMLHttpRequest object
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			callBack(JSON.parse(xmlhttp.responseText));
		}
	}
	// Open the object with the filename
	xmlhttp.open("GET", url, true);
	// Send the request
	xmlhttp.send(null);
}
