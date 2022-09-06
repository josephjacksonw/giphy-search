import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

//Business Logic
//a big thing to basically GET
function getGifs(search, numb, rating) {
  let request = new XMLHttpRequest();
  const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${search}&limit=${numb}&offset=0&rating=${rating}&lang=en`;
  
  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printElements(response, search, numb, rating);
    }
  });

  request.open("GET", url, true);
  request.send();
}

//User logic
//the window load
//the handleform
//function to send the GET to the html
function printElements(apiResponse, search, numb, rating) {
  document.querySelector("#showResponse").innerText = `You searched for ${search}, and you wanted ${numb} results with up to an ${rating} rating.`;
  let outText = document.getElementById("links");
  let outarray = [];
  apiResponse.data.forEach(function(result) {
    outarray.push(result.images.original.url);
    let imgdiv = document.createElement('div');
    imgdiv.className = 'col-sm-4';
    let img = document.createElement('img')
    img.src = result.images.original.url;
    imgdiv.appendChild(img)
    document.getElementById("images").appendChild(imgdiv);
    //make a div with class col-sm-4
    //make an html img in js
    //use this url for that image
    // put the image in the div then push the div to the html after </form>
  });
  outText.innerText = outarray.join("\n");
}

function formHandler(event) {
  event.preventDefault();
  const search = document.querySelector("#gifInput").value;
  const numb = document.querySelector("#gifNum").value;
  const rating = document.querySelector("#rating").value;
  getGifs(search, numb, rating);

}

window.addEventListener("load", function() {
  document.querySelector("form#gifSearch").addEventListener("submit", formHandler);
});