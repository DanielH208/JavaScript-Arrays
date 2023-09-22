
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


document.addEventListener("load", fetchImage());

$("#new-image-btn").on("click", () => { fetchImage() })

