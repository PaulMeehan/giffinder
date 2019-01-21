# giffinder

### Programmer: Paul Meehan
### Date: 1/21/2019

**Purpose:**

This program provides the user with a list of topics for which a random selection of images and gif files can be displayed.  A default list of topics is provided, but the user also has the ability to add any number of additional topics.  

**User instructions:**

Click one of the topic buttons to have a list of 10 images related to that topic displayed on the screen.  Under each image the rating for that image (G, PG, PG-13, or R) will be displayed along with a button for displaying additional information about the image.  Click the "More info" button to see the addtional information.  Click the "Less info" button to hide the additional information.

Click on the image itself to see the animated version of that image.  Click it again to return to the still version.  You can have any number of images animated at the same time.

Also under each image is a "Fav" button.  Click this button to move that image to your "Favorites" section.  Your favorites will remain displayed even if you switch to another topic.

You can also add any topic to the list by typing in a key word in the box next to the "Enter a new subject" label and then clicking the "Submit" button.  This will add a new button to the list with your key word displayed.  Click on the new button to see images related to your new topic. 

**Technical information:**

The default list of topics is maintained in the "topics" array located in the javascript file.  Modify this array to maintain the list of topics that are displayed on startup.

The application makes use of the GIPHY API service to obtain the images and information.


