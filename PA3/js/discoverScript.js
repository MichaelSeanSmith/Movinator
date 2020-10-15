function loadDone()
{
	document.getElementById('loading').style.display='none';
	document.getElementById('movieBlocks').style.display='inline-block';
}

function find()
{
	var input = document.getElementById('findMovie').value.toUpperCase();
	var titles = [];
	var elements1 = document.getElementsByClassName('movieTitle');
	var elements2 = document.getElementsByClassName('movieBlock');
	
	for(var i = 0; i < elements1.length; i++) 
	{
		titles.push(elements1[i].innerHTML.toUpperCase())
	}
	
	if(input == "")
	{
		for (i = 0; i < elements2.length; i++) 
		{
			elements2[i].style.display = "inline-block";
			elements2[i].style.width = "15%";
		}
	}
	else
	{
		for (i = 0; i < elements2.length; i++)
		{
			if(titles[i] != input) 
			{
				elements2[i].style.display = "none";
			}
			else 
			{
				elements2[i].style.display = "inline-block";
				elements2[i].style.width = "30%";
			}
		}
	}
}

function filterNone()
{
	var ageRestrictions = [];
	var elements1 = document.getElementsByClassName('ageAndRelease');
	var elements2 = document.getElementsByClassName('movieBlock');
	
	for(var i = 0; i < elements1.length; i++) 
	{
		ageRestrictions.push(elements1[i].innerHTML)
	}
	
	for (i = 0; i < elements2.length; i++) 
	{
		elements2[i].style.display = "inline-block";
		elements2[i].style.width = "15%";
	}
}

function filterPG13()
{
	var ageRestrictions = [];
	var elements1 = document.getElementsByClassName('ageAndRelease');
	var elements2 = document.getElementsByClassName('movieBlock');
	
	for(var i = 0; i < elements1.length; i++) 
	{
		ageRestrictions.push(elements1[i].innerHTML)
	}
	
	for (i = 0; i < elements2.length; i++)
	{
		if(ageRestrictions[i].includes("PG-13")) 
		{
			elements2[i].style.display = "inline-block";
		}
		else 
		{
			elements2[i].style.display = "none";
		}
	}
}

function filterR()
{
	var ageRestrictions = [];
	var elements1 = document.getElementsByClassName('ageAndRelease');
	var elements2 = document.getElementsByClassName('movieBlock');
	
	for(var i = 0; i < elements1.length; i++) 
	{
		ageRestrictions.push(elements1[i].innerHTML)
	}
	
	for (i = 0; i < elements2.length; i++)
	{
		if(ageRestrictions[i].includes("R")) 
		{
			elements2[i].style.display = "inline-block";
		}
		else 
		{
			elements2[i].style.display = "none";
		}
	}
}

function get(id)
{
	return document.getElementById(id);
}
function hide(id)
{
	get(id).style.display = "none";
}

function show(id)
{
	get(id).style.display = "table";
}

function retrieveMovie(movieName, movieId)
{
	var url = "http://www.omdbapi.com/?i=tt3896198&apikey=1ac6307d";
	var title = movieName;
	var req = new XMLHttpRequest();
	req.open("GET", url + "&t=" + title, false);
	req.onreadystatechange = function()
	{
		if(req.readyState == 4 && req.status == 200)
		{
			var json = JSON.parse(req.responseText);
			if(json["Response"] == "True") setMovie(json, movieId);
			else setNotFound();
		}
		else if (req.status != 200)
		{
			setNotFound();
		}
	}
	req.send();
}

function setMovie(json, movieId)
{
	get(movieId + "Title").innerHTML = json["Title"];
	get(movieId + "AgeAndRelease").innerHTML = json["Rated"] + " | " + json["Released"];
	get(movieId + "Description").innerHTML = json["Plot"];
	get(movieId + "ImdbRating").innerHTML = "IMDb &#9733; " + json["imdbRating"];
	show(movieId);
}

function setNotFound()
{
	show("notfound");
}
