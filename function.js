var favouritemovie = [];

$(document).ready(function(){
    selector();
});

function selector(Btnpressed){
    $("#results").empty();
    var press = Btnpressed;
    var option = "top_rated";
    
    if (press == "Nowplaying"){
        option= "now_playing";
    }
    else if ( press == "upcoming"){
        option ="upcoming";
    }
    else if( press == "MoviesInfo"){
        option = "top_rated";
    }
    
    var URL = "https://api.themoviedb.org/3/movie/"+ option +"?api_key=6bcbe8d373dde04d0c37f09b69456976&language=en-US&page=1"
    
    $.ajax({
        url: URL,
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        type: "GET",
        success: function home(resp){
            let movies = resp["results"];
            for( var i = 0 ; i < movies.length; i++){
            
                let movie = movies[i]
                let movieName = movie["title"];
                let moviePoster = movie["poster_path"];
                let movieSummary = movie["overview"];
                let movieRelease = movie["release_date"];
                
                elements(movieName, moviePoster, movieSummary, movieRelease);
            }
        }
    }); 
} 

function elements(movieName, moviePoster, movieSummary, movieRelease){

    var newDiv = document.createElement("div");
    var newDiv2 = document.createElement("div");
    var newDiv3 = document.createElement("div");
    var newDiv4 = document.createElement("div");
    var newDiv5 = document.createElement("div");
    var newDiv6 = document.createElement("div");
    
    $("#results").addClass("movie-list");
    $("#results").removeClass("container2");
    $("#results").append(newDiv);
    $(newDiv).addClass("card");
    $(newDiv).append("<a href ='#' onClick= 'getInfo(\""+ movieName+ "\", \""+ moviePoster+ "\", \""+ movieSummary+ "\",\""+ movieRelease+ "\")'><img src= https://image.tmdb.org/t/p/w185/" + moviePoster + " class = 'image'> </a>")
    $(newDiv).append(newDiv2);
    $(newDiv).append(newDiv5);
    $(newDiv5).addClass("corner");
    $(newDiv5).append(newDiv6);
    $(newDiv6).addClass("icon");
    $(newDiv6).html("<a href='#' id='heart' onClick = 'addToFavorites(\""+ movieName+ "\", \""+ moviePoster+ "\", \""+ movieSummary+ "\",\""+ movieRelease+ "\")'>" + "<i  class= 'fas fa-heart'></i></a>")
    $(newDiv2).addClass("middle");
    $(newDiv2).append(newDiv4);
    $(newDiv4).addClass("text");
    $(newDiv4).html("<a href ='#' id='info' onClick= 'getInfo(\""+ movieName+ "\", \""+ moviePoster+ "\", \""+ movieSummary+ "\",\""+ movieRelease+ "\")'><i class='fas fa-info-circle'></i></a>")
    $(newDiv).append(newDiv3);
    $(newDiv3).addClass("card-body");
    $(newDiv3).html("<h5>" + movieName +"</h5>");
}

function addToFavorites(moviename, movieposter, moviesummary, movierelease){

        var data = {
            "Moviename": moviename,
            "Movieposter": movieposter,
            "Moviesummary": moviesummary,
            "Movierelease": movierelease
        }
        
        if(isDuplicate(moviename, favouritemovie) == false){
            favouritemovie.push(data);
            let stringArray = JSON.stringify(favouritemovie);
            localStorage.setItem("favouritemovie", stringArray);
        }
}

function isDuplicate(dupmoviename, list){
    var flag = false;
    for (var i =0; i<list.length && flag == false; i++){
        if (list[i]["Moviename"] == dupmoviename) {
            flag = true;
        }
    }
    return flag;
}

function showFavourites(){
    
    let favourite = localStorage.getItem("favouritemovie");
    if (favourite == undefined) {
		document.getElementById("results").innerHTML = "No movies added!"
	}
	else {
        let fav = JSON.parse(favourite);
		console.log(fav)
		
		document.getElementById("results").innerHTML = ""
		for (let j = 0; j < fav.length; j++) {
		let favMovieName = fav[j]["Moviename"]
		let favMoviePoster = fav[j]["Movieposter"]
        let favMovieSummary = fav[j]["Moviesummary"]
        
		let favMovieRelease = fav[j]["Movierelease"]
        
        var newDiv = document.createElement("div");
        var newDiv2 = document.createElement("div");
        var newDiv3 = document.createElement("div");
        var newDiv4 = document.createElement("div");
        var newDiv5 = document.createElement("div");
        var newDiv6 = document.createElement("div");
        
        $("#results").addClass("movie-list");
        $("#results").removeClass("container2");
        $("#results").append(newDiv);
        $(newDiv).addClass("card");
        $(newDiv).append("<a href ='#' onClick= 'getInfo(\""+ favMovieName+ "\", \""+ favMoviePoster+ "\", \""+ favMovieSummary+ "\",\""+ favMovieRelease+ "\")'><img src= https://image.tmdb.org/t/p/w185/" + favMoviePoster + " class = 'image'> </a>")
        $(newDiv).append(newDiv2);
        $(newDiv).append(newDiv5);
        $(newDiv5).addClass("corner");
        $(newDiv5).append(newDiv6);
        $(newDiv6).addClass("icon");
        $(newDiv6).html("<a href='#' id='favheart' onClick = 'removeFavorites(\""+ favMovieName+ "\", \""+ favMoviePoster+ "\", \""+ favMovieSummary+ "\",\""+ favMovieRelease+ "\")'>" + "<i  class= 'fas fa-heart'></i></a>")
        $(newDiv2).addClass("middle");
        $(newDiv2).append(newDiv4);
        $(newDiv4).addClass("text");
        $(newDiv4).html("<a href ='#' id='info' onClick= 'getInfo(\""+ favMovieName+ "\", \""+ favMoviePoster+ "\", \""+ favMovieSummary+ "\",\""+ favMovieRelease+ "\")'><i class='fas fa-info-circle'></i></a>")
        $(newDiv).append(newDiv3);
        $(newDiv3).addClass("card-body");
        $(newDiv3).html("<h5>" + favMovieName +"</h5>");
  	}
  }	
}

function removeFavorites(favmovie){
    let favouritety = localStorage.getItem("favouritemovie");
    let favourites = JSON.parse(favouritety);
    console.log(favourites);
    for (var i =0; i< favourites.length; i++) {
        if (favourites[i]["Moviename"] == favmovie) {
            favourites.splice(i, 1);
            favouritemovie.splice(i,1);
        }
    }
    var stringArray = JSON.stringify(favourites);
    localStorage.setItem("favouritemovie", stringArray);
    showFavourites();
}

function getInfo(movieName, moviePoster, movieSummary, movieRelease){

    $("#results").empty();
    $("#results").removeClass("movie-list");
    $("#results").addClass("container2");

    var newdiv = document.createElement("div");

    $("#results").append(newdiv);
    $(newdiv).addClass("moviehead");
    $(newdiv).append("<h1>"+movieName+"</h1>");

    var newdiv2 = document.createElement("div");
    $("#results").append(newdiv2);
    $(newdiv2).addClass("movieimg");
    $(newdiv2).append("<img src= https://image.tmdb.org/t/p/w185/" + moviePoster + ">");
    
    var newdiv3 = document.createElement("div");
    $("#results").append(newdiv3);
    $(newdiv3).addClass("overview");
    $(newdiv3).append("<h2>Overview: </h2>");
    $(newdiv3).append("<p class='overview-text'>"+ movieSummary+" </h2>");
    $(newdiv3).append("<p class='overview-text'>"+ movieRelease+" </h2>");
    
}










/*var count = 0;                                                                           //ADD BACK BUTTON FUNCTION                                      
window.onload = function () { 
    if (typeof history.pushState === "function") {  
        history.pushState("back", null, null);          
        window.onpopstate = function () { 
            history.pushState('back', null, null);              
            if(count == 1){window.location = "index.html";}
         }; 
     }
 } */ 

/* $(window).scroll(function () {                                                           //ADD INFINITE SCROLL
        
    if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
    }
}); */
