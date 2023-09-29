
function fetchImage() {
    fetch("https://picsum.photos/200")
    .then (result => {
        new_image = result.url;
        document.getElementById("image-slot").src = new_image;
    })
    .catch(err => console.log(err))
}

let new_image;
let usersAndImages = [];
let formData;
let emailInput;

document.addEventListener("load", fetchImage());

$("#new-image-btn").on("click", () => { fetchImage() });

function removeHTML(id) {
    let parent = document.getElementById(id);
    parent.innerHTML = "";
}


function createListItem(eName, image) {
    let formattedId = eName.replaceAll(".", "-");
    let newItem = document.createElement("li");
    newItem.innerHTML = "<img src='" + image + "'>" ;
    document.getElementById(formattedId + "-list").appendChild(newItem);
}

function assembleNewEmail(eName) {
    // Create Div container
    let formattedId = eName.replaceAll(".", "-");
    console.log(formattedId)
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
    createListItem(eName, new_image);

    // Remove email specific button 
    let newBTN = document.createElement("button");
    newBTN.setAttribute("id", formattedId + "-btn");
    newBTN.setAttribute("class", "btn");
    newBTN.innerHTML = "DELETE EMAIL";
    document.getElementById(formattedId).appendChild(newBTN);

    // Button specific event listener
    document.getElementById(formattedId + "-btn").addEventListener("click", () => { 
        usersAndImages = [];
        const element = document.getElementById(formattedId);
        element.remove(); 
        console.log(document.getElementById("recieve-box").children)
        if (document.getElementById("recieve-box").children == HTMLCollection) { document.getElementById("delete-all-btn").remove() }
    })
}

function addElement(eInput) {
    if (usersAndImages.length == 0) {
        assembleNewEmail(eInput)
        fetchImage()
    }
    else {
        if (usersAndImages.length == 1) {
             // Delete all button
            let newBTN = document.createElement("button");
            newBTN.setAttribute("id", "delete-all-btn");
            newBTN.setAttribute("class", "btn");
            newBTN.innerHTML = "DELETE ALL";
            document.getElementById("recieve-box-container").appendChild(newBTN);
            
            // Delete all button on event listener
            $("#delete-all-btn").on("click", () => { 
                usersAndImages = [];
                removeHTML("recieve-box");
                const element = document.getElementById("delete-all-btn");
                element.remove(); 
            })
        }
        for (i = 0; i < usersAndImages.length; i++) {
            //console.table(usersAndImages);
            //console.log(i);
            console.log("user images: " + usersAndImages[i][0]);
            if (usersAndImages[i][0] == eInput) {
                createListItem(eInput, new_image)
                fetchImage();
                console.log(usersAndImages.length);
                return;
            } 
        }
        assembleNewEmail(eInput)
        fetchImage()

    }
}
    
    


function formValidation() {
    event.preventDefault();
    const emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

    formData = document.getElementById("email-form").elements;
    emailInput = formData[0].value;

    addElement(emailInput);
    usersAndImages.push([String(emailInput), String(new_image)]);


    
}


