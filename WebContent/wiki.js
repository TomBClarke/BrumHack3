/**
 * Created by Cameron Angus on 24/10/2015.
 */

/**
$(document).ready(function(){

    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=Jimi_Hendrix&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
            console.log(data);
        },
        error: function (errorMessage) {
        }
    });
});
**/
var x;
var imgString = "test";
var name;
var output = [];

function wikifetch(s) {
    name = s;
    output = [];
    fetchimg(s);

}

function getIMG(data) {
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            var nextX = data[property];
            if(nextX.thumbnail && nextX.thumbnail.source) {
            	imgString = nextX.thumbnail.source;
            }
            else
        	{
            	imgString = "";       	
            }
        }
        else
        	{
        	imgString = "";
        	}
            //console.log(imgString);
            //return imgString;

    }
    output.push(imgString);
    getTitle();
}

function fetchimg(s) {
    callwikifetch(s, getIMG);

    //var imgString = "";
    //setTimeout(function() {
    //    for (var property in x) {
    //        if (x.hasOwnProperty(property)) {
    //            var nextX = x[property];
    //            imgString = nextX.thumbnail.source;
    //            //console.log(imgString);
    //            //return imgString;
    //        }
    //    }
    //}, 1000);
    //return "test";
}

function getTaD(data) {
    var title;
    var desc;
    for (var property in data) {
        if (data.hasOwnProperty(property)) {
            var nextX = data[property];
            title = nextX.title;
            desc = nextX.extract;
            //console.log(nextX);
            //return imgString;
        }
    }
    output.push(title);
    output.push(desc);
    output.push("https://en.wikipedia.org/wiki/"+name);
    nextResult(output);

}

function callwikifetch(s) {

    $.ajax({
        type: "GET",
        url: "http://en.wikipedia.org/w/api.php?action=query&titles="+name+"&prop=pageimages&format=json&pithumbsize=100|&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, j) {
        	if(data.query && data.query.pages)
        		getIMG(data.query.pages);
        	else
        	{
        	    output.push("");
        	    getTitle();
        	}
            //dealWithData(data.query.pages);
            // imagejson = data ;
            // /*jason["url"] = "https://en.wikipedia.org/wiki/"+s;*/
            // console.log(data);
            ///* document.write(data.parse.text["*"]);*/
            // /*return jason;*/
        },
        error: function (errorMessage) {
        }
    });

};

function getTitle(){
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles="+name+"&callback=?",
        //url: "http://en.wikipedia.org/w/api.php?action=parse&format=json&prop=extracts&exintro=&explaintext=&page="+name+"&callback=?",
        contentType: "application/json; charset=utf-8",
        async: false,
        dataType: "json",
        success: function (data, textStatus, jqXHR) {
        	if(data.query && data.query.pages)
        		{
                	getTaD(data.query.pages);
        		}
            	else
            	{
            		output.push("");
            	    output.push("");
            	    output.push("https://en.wikipedia.org/wiki/"+name);
            	    nextResult(output);
            	}
            //console.log(data.parse.text["*"]);
            //console.log(data.parse.title);
        },
        error: function (errorMessage) {
        }
    });

}

//function dealWithData(data) {
//    x = data;
//}


