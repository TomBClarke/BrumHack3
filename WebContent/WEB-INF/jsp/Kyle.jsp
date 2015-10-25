<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<title>Elucidate</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<script type="text/javascript" src="interface.js"></script>
	<script type="text/javascript" src="wiki.js"></script>
	<script src="d3.min.js"></script>
	<script src="jquery.js"></script>
	<script src="graphic.js"></script>
	<link type="text/css" rel="stylesheet" href="elucidate.css"/>
</head>
<body id = "body" onload="initialise();">
	<div id = "hereActually">
	${clarifai}
	</div>
	
	<div id="loading">
		<img src="loading.gif"/>
		<h3 id="loadingText">Loading...</h3>
	</div>
	
	<div id="banner">
		    <img id = "elucidateLogo" alt="Elucidate Logo" src="ElucidateLogo.png" class="banner">
		    <img id = "powerbylogo" alt="Poweredby" src="poweredby.png" class="banner">
		    <img id = "logo" src ="clarifailogo.png" class="banner"> </img>
		    <span class="banner" id="and"><h1 class="banner">and</h1></span>
		    <img class="banner" id="wikipedia" alt="Wikipedia Logo" src="Wikipedia Logo.png">
	</div>	
	<div class="graphicContainer">
        <div class="graphic" id="elucidateGraphic">
        </div>
        <div id="detail_holder">
            <table id="detail_table">
                <tr>
                    <td>
                        <h1 id="detail_title"></h1>
                    </td>
                </tr>
                <tr>
                    <td id="detail_descr">
                    </td>
                </tr>
                <tr>
                    <td>
                        <a id="detail_link" target="_blank" href="https://www.wikipedia.org/">View more...</a>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button onclick="graphic.contract();">Close</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
	
</body>
</html>