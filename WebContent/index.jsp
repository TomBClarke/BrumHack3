<!DOCTYPE html>
<html>
<head lang="en">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport"
	content="width=device-width, initial-scale=1, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
<title>Elucidate</title>
<link type="text/css" rel="stylesheet" href="interface.css" />
<script type="text/javascript" src="interface.js"></script>
<script type="text/javascript" src="jquery-1.11.2.js"></script>
<script type="text/javascript" src="requestData.js"></script>
</head>
<body onload="init();">
	<div id="banner">
		<img id="elucidateLogo" alt="Elucidate Logo" src="ElucidateLogo.png"
			class="banner"> <img id="powerbylogo" alt="Poweredby"
			src="poweredby.png" class="banner"> <img id="logo"
			src="clarifailogo.png" class="banner"> </img> <span class="banner"
			id="and"><h1 class="banner">and</h1></span> <img class="banner"
			id="wikipedia" alt="Wikipedia Logo" src="Wikipedia Logo.png">
	</div>

	<div class="brumHack">
		<img id="brumhack" class="banner" alt="BrumHack 3.0 Logo"
			src="brumhack logo.jpg">
	</div>
	<div id="controlPanel">

		<div id="upload" class="buttonDiv">

			<form enctype="multipart/form-data" action="Kyle.html" method="post">
				<div id="uploadButton">
					Upload a photo <input type="file" class="fileInput" name="pic"
						id="fileToUpload" accept="image/*">
				</div>
				<br> <input type="submit" class="submit" value="Submit"
					name="submit">
			</form>
		</div>
	</div>
</body>
</html>