
function fetchImage() {
    fetch("https://picsum.photos/200")
    .then (result => {
        new_image = result.url;
        document.getElementById("image-slot").src = new_image;
        console.log(new_image);
    })
    .catch(err => console.log(err))
}

let new_image;
let usersAndImages = [];
let formData;
let emailInput;

document.addEventListener("load", fetchImage());

$("#new-image-btn").on("click", () => { fetchImage() });

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

}

function addElement(eInput) {
    if (usersAndImages.length == 0) {
        assembleNewEmail(eInput)
        fetchImage()
    }
    else {
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
    formData = document.getElementById("email-form").elements;
    emailInput = formData[0].value;
    //addElement(emailInput);
    addElement(emailInput);
    usersAndImages.push([String(emailInput), String(new_image)]);
    //alert(usersAndImages[0][1]);
    //usersAndImages.unshift(["dfdfdfdfd", "fdfdfdfdfd"]);
    //alert(usersAndImages);
    //console.table(usersAndImages);
    //console.log(usersAndImages);
    //console.log(usersAndImages);
    //console.log(usersAndImages[0]);
   //console.log(usersAndImages[1]);
   
}
//console.table(usersAndImages);

