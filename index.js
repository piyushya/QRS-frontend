const form = document.querySelector("#form-info");
const loader = document.querySelector("#loader");
const results = document.querySelector("#results");
const overlay = document.querySelector("#overlay");
const dowload = document.querySelector("#download-btn");

// Take over form submission
form.addEventListener("submit", (event) => {
    event.preventDefault();
    sendData();
});

// send form data to server and show loader
async function sendData() {
    const formData = new FormData(form);
    // formData.append('source_csv_file', fileInput.files[0]);
    // formData.append('class_name', class_name);
    // formData.append('semester_number', semester);
  try {
    displayLoader();
    const response = await fetch("http://127.0.0.1:5000/fetch_results", {
      method: "POST",
    //   mode: "no-cors",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(response.status);
    // 3sec simulated delay remove setTimeout
    setTimeout(() => {
        hideLoader();
        displayResult();
    }, 3000);
    
  } catch (e) {
    console.error(e);
  }
}

// download manually
dowload.addEventListener("click", () => {

    // send download request to server

    hideResult();
    form.reset();
})

function displayLoader(){
    overlay.style.display = "block";
    loader.style.display = "flex";
}

function hideLoader(){
    overlay.style.display = "none";
    loader.style.display = "none";
}

function displayResult(){
    overlay.style.display = "block";
    results.style.display = "flex";
}

function hideResult(){
    overlay.style.display = "none";
    results.style.display = "none";
}

