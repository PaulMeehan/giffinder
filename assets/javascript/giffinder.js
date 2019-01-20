
var topics = ["Cheese", "Apple", "Banana", "Pear", "Plum"];

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

function showMoreInfo(itemNumber) {
    var spanID = "#moreInfo" + itemNumber;
    var lessBtnID = "#showLessBtn" + itemNumber;
    var moreBtnID = "#showMoreBtn" + itemNumber;
    $(spanID).attr("hidden", false);
    $(moreBtnID).attr("hidden", true);
    $(lessBtnID).attr("hidden", false);
};

function showLessInfo(itemNumber) {
    var spanID = "#moreInfo" + itemNumber;
    var lessBtnID = "#showLessBtn" + itemNumber;
    var moreBtnID = "#showMoreBtn" + itemNumber;
    $(spanID).attr("hidden", true);
    $(moreBtnID).attr("hidden", false);
    $(lessBtnID).attr("hidden", true);
};

function showSubjects () {
    var subject = $(this).attr("id");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jlyk6tnm9IH9Jd6K9eQTrQneGfOmXT3V&q=" + subject + "&limit=10&offset=0&lang=en";

    $("#left").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        for (i = 0; i < response.data.length; i++) {
            var newDiv = $("<div>");
            newDiv.attr("class","imgDiv");
            
            var newImage = $("<img>");
            newImage.attr("src", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-stillImg", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-animatedImg", response.data[i].images.fixed_height.url);
            newImage.attr("onclick", "swapImage(this)");
            newImage.attr("class", "topicImage");
            newDiv.append(newImage);

            newDiv.append("<br/>");

            var newSpan = $("<span>");
            newSpan.attr("class", "imageInfo");
            newSpan.text("Rated: " + response.data[i].rating + "  ");
            newDiv.append(newSpan);

            var newBtn = $("<button>");
            newBtn.text("More info");
            newBtn.attr("id","showMoreBtn" + i);
            newBtn.attr("class", "btn btn-info btn-xs showMore", "display", "inline", "visibility", "visible");
            newBtn.attr("onclick", "showMoreInfo(" + i + ")");
            newDiv.append(newBtn);

            var newBtn2 = $("<button>");
            newBtn2.text("Less info");
            newBtn2.attr("id", "showLessBtn" + i);
            newBtn2.attr("class", "btn btn-info btn-xs showLess");
            newBtn2.attr("onclick", "showLessInfo(" + i + ")");
            newBtn2.attr("hidden", true);
            newDiv.append(newBtn2);

            newDiv.append("<br/>");

            var newSpan2 = $("<span>");
            newSpan2.attr("id","moreInfo" + i);
            newSpan2.attr("class", "moreInfoSpan");
            newSpan2.append("Title: " + response.data[i].title);
            newSpan2.append("<br/>");
            newSpan2.append("Source: " + response.data[i].source);
            newSpan2.append("<br/>");
            newSpan2.append("Import date/time: " + response.data[i].import_datetime);
            newSpan2.append("<br/>");
            newSpan2.append("Type: " + response.data[i].type);
            newSpan2.css("font-size","16px");
            newSpan2.attr("hidden", true);
            newDiv.append(newSpan2);

            $("#left").append(newDiv);
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
