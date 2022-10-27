
// 3x3 display

$(document).ready(function () {
    //connect to JSON file
    $.getJSON("JSON.json", function (data) {

        var arrItems = [];  
        $.each(data, function (index, value) {
            arrItems.push(value);       
        });


        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";

        var count=0;
        // Browse the Json file
        for(var j = 0; j < 3; j++){
            // Create variable block that will contain all the images
            var block = document.createElement('div');

            for (var i = 0; i < 3; i++){
                // Get the image name
                var name = document.createTextNode(arrItems[count].Name);
                
                var img = document.createElement('img');  
                // Get the image link      
                img.src = arrItems[count].Image;
                
                img.style.margin = "50px 20px 0px 20px";

                //append the image to block
                block.appendChild(img);
                block.appendChild(name);
                
                count++;
            }
            // append all the images
            divContainer.appendChild(block);
        }
        



    });
});


// Carousel 

document.addEventListener('DOMContentLoaded', function() {

    
    // Images container
    var images = document.getElementById('carouselImages');
    
    // Image caption
    var caption = document.getElementById('carouselCaption');
    
    // Previous image button
    var prev = document.getElementById('carouselPrev');
    
    // Next image button
    var next = document.getElementById('carouselNext');
    
    
    
    
    // Get a link to the json file
    fetch("JSON2.json")
    
    .then(function(res) {
    
      // Get the JSON representation of the response object then...
      res.json().then(function(json) {
    
        // Loop over each object in our JSON object (array)...
        json.forEach(function(el, i) {
    
          // Create a new image element...
          var image = document.createElement('img');
    
          // Set all the attributes of the image
          image.setAttribute('src', el.url);        
          image.setAttribute('alt', el.caption);    
          image.setAttribute('title', el.caption);  
    
          // Append the current image to the variable "images" that contains all the images
          images.appendChild(image);
        });
        
        setupCarousel(json);
      });
    });
    
    
    /* ----------------------------------
      A function to set up our carousel
    ---------------------------------- */
    
    // This function accepts the JSON object (array) of images as an argument
    function setupCarousel(json) {
      
    
      // Get the number of images in the carousel
      var imageCount = images.childElementCount;
    
      // Current image in view
      var currentImage = 1;
    
      // Width of your images 
      var imageWidth = 500;
      
      /* ----------------------------------------
        Set some event listeners on our buttons
      ---------------------------------------- */
    
      // code for the previous button
      // Calls an anonymous function when the prev button is clicked
      prev.addEventListener('click', function(event) {
        event.preventDefault();
        // If the image in view is not the first image...
        if(currentImage != 1) {
    
          // Decrement the current image reference
          --currentImage;
    
          // Move the previous image into view using the marginLeft property
          images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
        }
        
        // Update our caption
        caption.innerText = json[currentImage - 1].caption;
      });
    
      // code for the next button
      // Calls an anonymous function when the next button is clicked
      next.addEventListener('click', function(event) {
        event.preventDefault();
        // If the image in view is not the last image...
        if(currentImage != imageCount) {
    
          // Increment the current image reference
          ++currentImage;
    
          // Move the next image into view using the marginLeft property
          images.style.left = imageWidth - (currentImage * imageWidth) + 'px';
        }
        
        // Update our caption
        caption.innerText = json[currentImage - 1].caption;
      });
      
      // Update our caption
      caption.innerText = json[currentImage - 1].caption;
    }
    
    });