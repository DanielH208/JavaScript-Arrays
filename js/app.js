
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

function assembleNewEmail(eName) {
    // Create Div container
    let formattedId = eName.replaceAll(".", "-");
    console.log(formattedId)
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", formattedId);
    document.getElementById("recieve-box").appendChild(newDiv);

    // Create header for new email image list
    let newHeader = document.createElement("h1");
    document.getElementById(formattedId).appendChild(newHeader);
    document.getElementById(formattedId).innerText = eName;
   

}

function addElement(eInput) {
    if (usersAndImages.length == 0) {
        alert("empty list")
    }
    else {
        for (i = 0; i < usersAndImages.length; i++) {
            console.table(usersAndImages);
            console.log(i);
            console.log(usersAndImages[i][0]);
            if (usersAndImages[i][0] == eInput) {
                alert("matches"); 
                return;
            } else {
                alert("doesnt match");
                
                /*
                let newList = document.createElement("ul");
                let newItem = document.createElement("li");
                newListsetAttribute("id", eInput); 
                newItem.innerHTML("<img src="+ eInput + ">")*/

            }
        }
        assembleNewEmail(eInput)

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

