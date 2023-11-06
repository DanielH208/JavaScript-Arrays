
function fetchImage() {
    fetch("https://picsum.photos/200")
    .then (result => {
        // Set the new image to the global variable so the functions can use it
        new_image = result.url;
        // Set the source of the image tag to the new image url
        document.getElementById("image-slot").src = new_image;
    })
    .catch(err => console.log(err))
}

let new_image;
let usersAndImages = [];
let formData;
let emailInput;

// On page load refresh the image
document.addEventListener("load", fetchImage());

$("#new-image-btn").on("click", () => { fetchImage() });

// Reusable function for removing the html of a passed in element
function removeHTML(id) {
    let parent = document.getElementById(id);
    parent.innerHTML = "";
}

// Create a new list item and add it to the existing parent unordered list
function createListItem(eName, image) {
    let formattedId = eName.replaceAll(".", "-");
    let newItem = document.createElement("li");
    newItem.innerHTML = "<img src='" + image + "'>" ;
    document.getElementById(formattedId + "-list").appendChild(newItem);
}

// Create a new unordered list and add a list item
function assembleNewEmail(eName, image) {
    // Create Div container
    let formattedId = eName.replaceAll(".", "-");
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", formattedId);
    newDiv.setAttribute("class", "user-container");
    document.getElementById("recieve-box").appendChild(newDiv);

    // Create header for new email image list
    document.getElementById(formattedId).innerHTML = "<h1>" + eName + "</h1>";
   
    // Create UL list for images 
    let newUL = document.createElement("ul");
    newUL.setAttribute("id", formattedId + "-list");
    newUL.setAttribute("class", "user-list");
    document.getElementById(formattedId).appendChild(newUL);

    // Create image list item 
    let newItem = document.createElement("li");
    newItem.innerHTML = "<img src='" + image + "'>";
    document.getElementById(formattedId + "-list").appendChild(newItem);
    //createListItem(eName, new_image);

    // Add email specific remove button 
    let newBTN = document.createElement("button");
    newBTN.setAttribute("id", formattedId + "-btn");
    newBTN.setAttribute("class", "btn");
    newBTN.setAttribute("class", "new-btn");
    newBTN.innerHTML = "DELETE EMAIL";
    document.getElementById(formattedId).appendChild(newBTN);

    // Button specific event listener
    document.getElementById(formattedId + "-btn").addEventListener("click", () => { 

        // Provide new array to usersAndImages excluding all the deleted email items
        usersAndImages = usersAndImages.filter((item) => {
            return (item[0] != eName)
        })

        const element = document.getElementById(formattedId);
        element.remove(); 
        // If no emails are left also delete the delete all button
        if (document.getElementById("recieve-box").children.length == 0) { 
                const deleteBTN = document.getElementById("delete-all-btn");
                deleteBTN.remove(); 
                added = false        
        }
    })
}

// Global variable for checking if the delete all button exists
let added = false

function addElement(eInput) {
    // The first item inside the array will always be a new email address
    if (usersAndImages.length == 0) {
        assembleNewEmail(eInput, new_image);
        fetchImage();
    }
    else {
        // Add the delete all button when there is two sibling elements / two email addresses
        if ($(".user-container").siblings().length == 2 && added == false) {
             // Add delete all button
            let newBTN = document.createElement("button");
            newBTN.setAttribute("id", "delete-all-btn");
            newBTN.setAttribute("class", "btn");
            newBTN.setAttribute("class", "new-btn");
            newBTN.innerHTML = "DELETE ALL";
            document.getElementById("recieve-box-container").appendChild(newBTN);
            added = true;

            // Delete all button on event listener
            $("#delete-all-btn").on("click", () => { 
                usersAndImages = [];
                removeHTML("recieve-box");
                const element = document.getElementById("delete-all-btn");
                element.remove(); 
                added = false
            })
        }
        // Iterate through 2d array checking wether the inputted email address has already been added
        for (i = 0; i < usersAndImages.length; i++) {
            if (usersAndImages[i][0] == eInput) {
                // If so add a list item to the existing email address unordered list
                createListItem(eInput, new_image)
                fetchImage();
                return;
            } 
            
        }
        // If no matching address is found in the array then add a new unorderd list and list element
        assembleNewEmail(eInput, new_image)
        fetchImage()
    
    }
}
    
function formValidation() {
    // Prevent page from refreshing on form submit
    event.preventDefault();
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    // Assign the form data to a variable
    formData = document.getElementById("email-form").elements;
    // Pull out the inputted email address value
    emailInput = formData[0].value;

    if (emailInput == "") {
        document.getElementById("error-messages").innerHTML = "Please Input A Value";
        $("#email-input").css("border-color", "red");
    } 
    else if (emailRegex.test(emailInput) == false) {
        document.getElementById("error-messages").innerHTML = "Please Enter A Valid Email";
        $("#email-input").css("border-color", "red");
    }
    else {
        addElement(emailInput);
        // Add validated email and image as an item to the 2d array
        usersAndImages.push([String(emailInput), String(new_image)]);
        $("#email-input").css("border-color", "transparent");
        document.getElementById("error-messages").innerHTML = "";
    }   
}


