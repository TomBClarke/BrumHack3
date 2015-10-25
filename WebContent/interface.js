/**
 * Created by Sebastian on 24/10/2015.
 */
var url = ""; var jsonObject; var photoLoc; var carry; var distance; var results; var probs; var everything;
function init()
{
    $("body").scrollLeft(450);
}
function initialise()
{
	carry = 0;
	var s = document.getElementById("hereActually").innerHTML;
	document.getElementById("hereActually").innerHTML = "";
	everything = s.split(" ");
	results = [];
	distance = Math.floor((everything.length - 1) / 2);
	probs = [];
	for(var count = distance; count < everything.length ;count++)
	{
		probs.push(everything[count]);
	}
	wikifetch(everything[0]);
}
function nextResult(output)
{
	results.push(output);

	carry = carry + 1;
	if(carry == distance || everything[carry] == -1)
	{
		sendToGraphics(results,probs);
	}
	else
	{
		wikifetch(everything[carry]);
	}
}
function sendToGraphics(results, probs)
{

	//results: lsit of lists, each sub list has 4 elems: imgurl, title, description, url
	var nodes = [];
	console.log(results);
	for(var i = 0; i < results.length; i++) {
		nodes.push({
			"title": results[i][1], 
			"img": results[i][0],
			"description": results[i][2],
			"perc": probs[i],
			"link": results[i][3]
		});
	}
	graphic.loadGraphic(nodes);
}

function receivePhoto(photoLocation)
{
    photoLoc = photoLocation;
}

//function passTowardsClarifai()
//{
//    passTowardsWiki(jsonObject);
//}

function passTowardsWiki(jsonObjectW)
{
    var titles = jsonObjectW.titles;
    var percs = jsonObjectW.percs; var titleslist = []; var percslist = [];
    for(var count = 0 ; count < titles.length ; count++){
        titleslist.push(titles[count]);
        percslist.push(percs[count]);
    }
    passTowardsGraphics(passLISTTOWIKI(titleslist),listOfPerc);
}
function passTowardsGraphics(jsonFile,listOfPerc)
{
    var requests = jsonFile.request; var perc = jsonFile.perc;
    var jsonTowardsGraphics; var overall = [];
    for(var count = 0; count < requests.length ; count++) {
        jsonTowardsGraphics["title"] = requests[count].request[1];
        jsonTowardsGraphics["img"] = requests[count].request[2]
        jsonTowardsGraphics["description"] = requests[count].request[3];
        jsonTowardsGraphics["perc"] = listOfPerc[count];
        jsonTowardsGraphics["link"] = request[count].request[4];
        overall.push[jsonTowardsGraphics];
        jsonObject
    }

}