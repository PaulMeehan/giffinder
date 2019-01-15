

// var xhr = $.get("https://api.giphy.com/v1/gifs/search?api_key=&q=cheese&limit=10&offset=0&rating=G&lang=en");
// xhr.done(function (data) { console.log("success got data", data); });



var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=jlyk6tnm9IH9Jd6K9eQTrQneGfOmXT3V&limit=5");
xhr.done(function (data) { console.log("success got data", data); });