// Initialize variables
const nameInput = document.getElementById("name");
const urlInput = document.getElementById("url");
const submit = document.getElementById("submit");
const tBody = document.getElementById("tbody");
const search = document.getElementById("search");
const S_button = document.getElementById("S_button");
const customAlert = document.getElementById('customAlert');
const closeAlertButton = document.getElementById('closeAlert');

// Initialize websitesList from localStorage
let websitesList = JSON.parse(localStorage.getItem("WebSites")) || [];

// Prevent form reload
document.getElementById("myForm").addEventListener('submit', function (event) {
    event.preventDefault();
});

// Hide custom alert initially
customAlert.classList.add("d-none");

// Add website function
function addwebsite() {
    const website = {
        Webname: nameInput.value,
        webUrl: urlInput.value
    };

    if (website.Webname.length >= 3 && validateURL(website.webUrl)) {
        websitesList.push(website);
        localStorage.setItem("WebSites", JSON.stringify(websitesList));
        clear();
        display();
    } else {
        customAlert.classList.remove('d-none');
        closeAlertButton.addEventListener('click', function () {
            customAlert.classList.add("d-none");
        }, { once: true });

        if (website.Webname.length < 3) {
            nameInput.focus();
        } else {
            urlInput.focus();
        }
    }
}

// Real-time validation for nameInput
nameInput.addEventListener('input', () => {
    if (nameInput.value.length < 3) {
        nameInput.classList.remove("is-valid");
        nameInput.classList.add("is-invalid");
    } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
    }
});

// Real-time validation for urlInput
urlInput.addEventListener('input', () => {
    if (validateURL(urlInput.value)) {
        urlInput.classList.remove("is-invalid");
        urlInput.classList.add("is-valid");
    } else {
        urlInput.classList.remove("is-valid");
        urlInput.classList.add("is-invalid");
    }
});

// Validate the URL
function validateURL(url) {
    const regex = /^(https?:\/\/)?([^\s.]+\.\S{2,}|localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*)?$/;
    return regex.test(url);
}

// Clear input fields
function clear() {
    nameInput.value = "";
    urlInput.value = "";
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");



}

// Display websites
function display() {
    let cartona = "";
    for (let i = 0; i < websitesList.length; i++) {
        cartona += `<tr>
            <td>${i + 1}</td>
            <td>${websitesList[i].Webname}</td>
            <td><button onclick="visit(${i})" class="btn bg-success px-4 text-light py-1"><i class="fa-solid fa-eye bg-success pe-2"></i>Visit</button></td>
            <td><button onclick="edit(${i})" class="btn bg-warning px-4 text-light py-1"><i class="fa-regular fa-pen-to-square bg-warning pe-2"></i>Edit</button></td>
            <td><button onclick="deleteWeb(${i})" class="btn bg-danger px-4 text-light py-1"><i class="fa-solid fa-trash-can bg-danger pe-2"></i>Delete</button></td>
        </tr>`;
    }
    tBody.innerHTML = cartona;
}

// Visit Website
function visit(index) {
    const site = `https://www.${websitesList[index].webUrl}`;
    window.open(site);
}

// Edit Website
function edit(index) {
    const newName = window.prompt("Enter The edited Name");
    const newURL = window.prompt("Enter The edited URL");
    if (newName !== "") {
        websitesList[index].Webname = newName;
    }
    if (newURL !== "") {
        websitesList[index].webUrl = newURL;
    }
    localStorage.setItem("WebSites", JSON.stringify(websitesList));
    display();
}

// Delete Website
function deleteWeb(index) {
    websitesList.splice(index, 1);
    localStorage.setItem("WebSites", JSON.stringify(websitesList));
    display();
}

// Perform Search
function performsearch(event) {
    event.preventDefault();
    const S_name = search.value.trim();
    let cartona = "";
    for (let i = 0; i < websitesList.length; i++) {
        if (websitesList[i].Webname.toLowerCase().includes(S_name.toLowerCase())) {
            cartona += `<tr>
                <td>${i + 1}</td>
                <td>${websitesList[i].Webname}</td>
                <td><button onclick="visit(${i})" class="btn bg-success px-4 text-light py-1"><i class="fa-solid fa-eye bg-success pe-2"></i>Visit</button></td>
                <td><button onclick="edit(${i})" class="btn bg-warning px-4 text-light py-1"><i class="fa-regular fa-pen-to-square bg-warning pe-2"></i>Edit</button></td>
                <td><button onclick="deleteWeb(${i})" class="btn bg-danger px-4 text-light py-1"><i class="fa-solid fa-trash-can bg-danger pe-2"></i>Delete</button></td>
            </tr>`;
        }
    }
    tBody.innerHTML = cartona;
}

// Event listeners for search input and search button
search.addEventListener('input', performsearch);
S_button.addEventListener('click', performsearch);

// Display websites on page load
window.onload = display;
