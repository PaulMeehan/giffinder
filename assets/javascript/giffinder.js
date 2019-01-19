
var topics = ["Steak", "Pork", "Chicken", "Potato", "Carrots", "Cheese"];

function swapImage (currentImg) {
    var src = $(currentImg).attr("src");
    var still = $(currentImg).attr("data-stillImg");
    var animated = $(currentImg).attr("data-animatedImg");
    
    if (src === still) {
        $(currentImg).attr("src",animated);
    } else {
        $(currentImg).attr("src", still);
    };
};


function showSubjects () {
    var subject = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jlyk6tnm9IH9Jd6K9eQTrQneGfOmXT3V&q=" + subject + "&limit=10&offset=0&rating=G&lang=en";

    $("#left").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (i = 0; i < response.data.length; i++) {
            var newImage = $("<img>");
            newImage.attr("src", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-stillImg", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-animatedImg", response.data[i].images.fixed_height.url);
            newImage.attr("onclick", "swapImage(this)");

            $("#left").append(newImage);
        };
    });
};

$(document).on("click", ".subjectButton", showSubjects);


function addButton (newSubject) {
    var newButton = $("<button>");
    newButton.attr("type","button");
    newButton.attr("id",newSubject);
    newButton.text(newSubject);
    newButton.attr("class", "subjectButton btn btn-primary");
    $("#subjectMenu").append(newButton);
};


for (i=0; i < topics.length; i++) {
    addButton(topics[i]);
};

function addUserButton () {
    var newText = $("#subject-input").val();
    addButton(newText);
};