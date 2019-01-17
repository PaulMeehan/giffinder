
var topics = ["Steak", "Pork", "Chicken", "Potato", "Carrots"];

function swapImage (clickedIndex) {
    var imageID = "image" + clickedIndex;
    var currentSource = $("#" + imageID).attr("src");
    var newSource = "";
    if (currentSource.substring(currentSource.length - 6) === "_s.gif") {
        newSource = currentSource.substring(0,currentSource.length - 6) + ".gif";
    } else {
        newSource = currentSource.substring(0,currentSource.length - 4) + "_s.gif"
    };
    $("#" + imageID).attr("src",newSource);
};



$("#testbutton").click(function () {
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jlyk6tnm9IH9Jd6K9eQTrQneGfOmXT3V&q=cheese&limit=10&offset=0&rating=G&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (i = 0; i < response.data.length; i++) {
            $("#left").append("<img src='" + response.data[i].images.fixed_height_still.url + "' id='image" + i + "' onclick='swapImage(" + i +")'>");
        };
    });
});

