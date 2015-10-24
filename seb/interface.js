/**
 * Created by Sebastian on 24/10/2015.
 */
var url = ""; var jsonObject; var photoLoc;
function init()
{

}
function receivePhoto(photoLocation)
{
    photoLoc = photoLocation;
}
function passTowardsClarifai()
{
    passTowardsWiki(jsonObject);
}
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
    }

}