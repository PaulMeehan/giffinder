
// topics array provides initial list of search topics
var topics = ["Cheese", "Apple", "Banana", "Pear", "Plum"];

function swapImage (currentImg) {
    // change static image to animated gif and vice versa
    var src = $(currentImg).attr("src");
    var still = $(currentImg).attr("data-stillImg");
    var animated = $(currentImg).attr("data-animatedImg");
    
    // use current src value to determine current state, then switch to the other.
    if (src === still) {
        $(currentImg).attr("src", animated);
    } else {
        $(currentImg).attr("src", still);
    };
};

function showMoreInfo(itemNumber) {
    // make additional information and "less info" button visible, hide "more info" button
    var spanID = "#moreInfo" + itemNumber;
    var lessBtnID = "#showLessBtn" + itemNumber;
    var moreBtnID = "#showMoreBtn" + itemNumber;
    $(spanID).attr("hidden", false);
    $(moreBtnID).attr("hidden", true);
    $(lessBtnID).attr("hidden", false);
};

function showLessInfo(itemNumber) {
    // make additional information and "less info" button invisible, show "more info" button
    var spanID = "#moreInfo" + itemNumber;
    var lessBtnID = "#showLessBtn" + itemNumber;
    var moreBtnID = "#showMoreBtn" + itemNumber;
    $(spanID).attr("hidden", true);
    $(moreBtnID).attr("hidden", false);
    $(lessBtnID).attr("hidden", true);
};

function addToFavorites (itemNumber) {
    $("#favorites").append($("#subjectDiv" + itemNumber));
    $("#favorite" + itemNumber).attr("hidden", true);
};

function showSubjects () {
    // obtain 10 images from GIPHY related to specified topic and display them on the document.
    
    // determine the id of the image that has been clicked
    var subject = $(this).attr("id");
    // build query string using subject from selected button
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=jlyk6tnm9IH9Jd6K9eQTrQneGfOmXT3V&q=" + subject + "&limit=10&offset=0&lang=en";

    // show the message explaining the favorites button
    $("#favmsg").attr("hidden", false);

    // clear any previously displayed images
    $("#left").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // create a new div for each image returned
        for (i = 0; i < response.data.length; i++) {
            var newDiv = $("<div>");
            newDiv.attr("class","imgDiv");
            newDiv.attr("id", "subjectDiv" + i);
            
            // create a new still image and append it to the new div
            var newImage = $("<img>");
            // initialize src to the still image
            newImage.attr("src", response.data[i].images.fixed_height_still.url);
            // create data attributes with the url's of the still and animated images
            newImage.attr("data-stillImg", response.data[i].images.fixed_height_still.url);
            newImage.attr("data-animatedImg", response.data[i].images.fixed_height.url);
            // set the onClick attribute to swap the images
            newImage.attr("onclick", "swapImage(this)");
            newImage.attr("class", "topicImage");
            newDiv.append(newImage);

            // set additional text to appear under the image
            newDiv.append("<br/>");

            // create a new span for the rating and append it to the new div
            var newSpan = $("<span>");
            newSpan.attr("class", "imageInfo");
            newSpan.text(" Rated: " + response.data[i].rating + "  ");
            newDiv.append(newSpan);

            // create a new button to show the additional information and append it to the new div
            var newBtn = $("<button>");
            newBtn.text("More info");
            newBtn.attr("id","showMoreBtn" + i);
            newBtn.attr("class", "btn btn-info btn-sm showMore");
            newBtn.attr("onclick", "showMoreInfo(" + i + ")");
            newDiv.append(newBtn);

            // create a new button to hide to additional information and append it to the new div
            var newBtn2 = $("<button>");
            newBtn2.text("Less info");
            newBtn2.attr("id", "showLessBtn" + i);
            newBtn2.attr("class", "btn btn-info btn-sm showLess");
            newBtn2.attr("onclick", "showLessInfo(" + i + ")");
            // this button is initially hidden
            newBtn2.attr("hidden", true);
            newDiv.append(newBtn2);

            // create a new button to move the clicked image to the favorites column
            var newBtn = $("<button>");
            newBtn.text("Fav");
            newBtn.attr("id", "favorite" + i);
            newBtn.attr("class", "btn btn-info btn-sm favorite");
            newBtn.attr("onclick", "addToFavorites(" + i + ")");
            newDiv.append(newBtn);

            // set additional information to appear under the rating and more/less info buttons
            newDiv.append("<br/>");

            // create a new span and populate it with the additional information
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
            // this span is initally hidden
            newSpan2.attr("hidden", true);
            newDiv.append(newSpan2);

            // append new div to the document
            $("#left").append(newDiv);
        };
    });
};

// capture mouse clicks on the subject buttons
$(document).on("click", ".subjectButton", showSubjects);

// add a new button to the subject list
function addButton (newSubject) {
    var newButton = $("<button>");
    newButton.attr("type","button");
    newButton.attr("id",newSubject);
    newButton.text(newSubject);
    newButton.attr("class", "subjectButton btn btn-primary");
    $("#subjectMenu").append(newButton);
};

// for each item listed in the subjects array, add a new subject button to the list
for (i=0; i < topics.length; i++) {
    addButton(topics[i]);
};

// create a new button with the subject supplied by the user and add it to the subject list
function addUserButton () {
    var newText = $("#subject-input").val();
    if (newText.length>0) {
        addButton(newText);
        $("#subject-input").val("");
    };
};
