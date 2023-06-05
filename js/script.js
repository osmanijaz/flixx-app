


// console.log(window.location.pathname) // url file name e.g. shows.html

const global = {
currentPage: window.location.pathname,
search: {
term: '', 
type: '',
page: 1,
totalPages: 1, 
totalResults: 0
},
api:{
apiKey:'d96b5b45e8d9fb560bbbc147b6150838',
apiUrl:'https://api.themoviedb.org/3/',
}
};
// console.log(global.currentPage);



// 2. 
async function displayPopularMovies(){

// results gives an object with a results array so an array called results. If you put curly braces around { results } you will get the straight array which is what you want.
const { results } = await fetchAPIData('movie/popular'); //any time we need to get data fromn the API we call this function and we will pass in the endpoint movie/popular.

// console.log(results)

results.forEach(movie =>{

const div = document.createElement('div')
div.classList.add('card');  
div.innerHTML = 
`


          <a href="movie-details.html?id=${movie.id}">

          ${
            movie.poster_path
            ?`
            <img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
            />`
            : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />` 
          
          }
         
          </a>

          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>
`;

document.querySelector('#popular-movies').appendChild(div)

})


}



// 5. Display 20 most popular TV shows

async function displayPopularShows(){

  // results gives an object with a results array so an array called results. If you put curly braces around { results } you will get the straight array which is what you want.
  const { results } = await fetchAPIData('tv/popular'); //any time we need to get data fromn the API we call this function and we will pass in the endpoint tv/popular.
  
  // console.log(results)
  
  results.forEach(show =>{
  
  const div = document.createElement('div')
  div.classList.add('card');  
  div.innerHTML = 
  `
  
  
            <a href="tv-details.html?id=${show.id}">
  
            ${
              show.poster_path
              ?`
              <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
              />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />` 
            
            }
           
            </a>
  
            <div class="card-body">
              <h5 class="card-title">${show.name}</h5>
              <p class="card-text">
                <small class="text-muted">Air Date: ${show.first_air_date}</small>
              </p>
            </div>
          </div>
  `;
  
  document.querySelector('#popular-shows').appendChild(div)
  
  })
  }
  

// 6.
// Display Movie Details 

async function displayMovieDetails(){
// on the window object there is a location api or object that has a search property that we can get all the query string anything after the ? question mark.

// const movieId = window.location.search;


// console.log(movieId); //?id=603692 


const movieId = window.location.search.split('=')[1]
// ['?id', '603692']
// console.log(movieId); //?id=603692 we need the number so we use the split method which will turn it into an array. We can split it anywhere we want.  

console.log(movieId); // 603692

// get the movie now

const movie = await fetchAPIData(`movie/${movieId}`);


// 8.
// Overlay for background image.
// The function will take in two things the type 'movie' the reason why we pass the type in is because we are going to do this for movies and shows and we need to know which element to put it in movie details or show TV details. We also need the backdrop path from the api movie.backdrop_path  

displayBackgroundImage('movie', movie.backdrop_path);

const div = document.createElement('div');

div.innerHTML = 

`<div class="details-top">
<div>
${
  movie.poster_path
  ?`<img
  src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
  class="card-img-top"
  alt="${movie.title}"
  />`
  : `<img
  src="images/no-image.jpg"
  class="card-img-top"
  alt="${movie.title}"
/>` 

}
</div>

<div>
<h2>${movie.title}</h2>
<p>
<i class="fas fa-star text-primary"></i>
${movie.vote_average.toFixed(1)} / 10
</p>
<p class="text-muted">Release Date: ${movie.release_date}</p>
<p>
${movie.overview}
</p>

<h5>Genres</h5>
<ul class="list-group">

${movie.genres.map((genre)=> `<li>${genre.name}<li/>`).join('')}

</ul>
            
<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
</div>

</div>
<div class="details-bottom">
<h2>Movie Info</h2>
<ul>
<li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
<li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
<li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
<li><span class="text-secondary">Status:</span> ${movie.status}</li>
</ul>
<h4>Production Companies</h4>
<div class="list-group"> ${movie.production_companies.map((company)=> `<span> ${company.name}<span/>`).join(', ')} </div>
</div>
`
document.querySelector('#movie-details').appendChild(div);

} 


// 9.
// Display Show Details 

async function displayShowDetails(){
  // on the window object there is a location api or object that has a search property that we can get all the query string anything after the ? question mark.
  
  // const showId = window.location.search;
  
  
  // console.log(showId); //?id=603692 
  
  
  const showId = window.location.search.split('=')[1]
  // ['?id', '603692']
  // console.log(showId); //?id=603692 we need the number so we use the split method which will turn it into an array. We can split it anywhere we want.  
  
  console.log(showId); // 603692
  
  // get the show now
  
  const show = await fetchAPIData(`tv/${showId}`);


  // console.log(show) // check output 

   
  // 10.
  // Overlay for background image for TV Shows.
  // The function will take in two things the type 'movie' the reason why we pass the type in is because we are going to do this for movies and shows and we need to know which element to put it in movie details or show TV details. We also need the backdrop path from the api movie.backdrop_path  
  

  displayBackgroundImage('tv', show.backdrop_path); // from const show = await fetchAPIData(`tv/${showId}`);
  
  const div = document.createElement('div');
  
  div.innerHTML = 
  
  `<div class="details-top">
  <div>
  ${
    show.poster_path
    ?`<img
    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
    class="card-img-top"
    alt="${show.name}"
    />`
    : `<img
    src="images/no-image.jpg"
    class="card-img-top"
    alt="${show.name}"
  />` 
  
  }
  </div>
  
  <div>
  <h2>${show.name}</h2>
  <p>
  <i class="fas fa-star text-primary"></i>
  ${show.vote_average.toFixed(1)} / 10
  </p>
  <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
  <p>
  ${show.overview}
  </p>
  
  <h5>Genres</h5>
  <ul class="list-group">
  
  ${show.genres.map((genre)=> `<li>${genre.name}<li/>`).join('')}
  
  </ul>
              
  <a href="${show.homepage}" target="_blank" class="btn">Visit show Homepage</a>
  </div>
  
  </div>
  <div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
  <li><span class="text-secondary">Number of Episodes:</span> ${show.number_of_episodes}</li>
  <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>

  <li><span class="text-secondary">Status:</span> ${show.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group"> ${show.production_companies.map((company)=> `<span> ${company.name}<span/>`).join(', ')} </div>
  </div>
  `
  document.querySelector('#show-details').appendChild(div);
  
  } 

// 8.
// Display Backdrop on Details Pages for Movies and TV Shows

function displayBackgroundImage(type, backgroundPath){
const overlayDiv = document.createElement('div')
// we need the image set to a specific URL
 overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
 overlayDiv.style.backgroundSize = 'cover';
 overlayDiv.style.backgroundPosition = 'center';
 overlayDiv.style.backgroundRepeat = 'no-repeat';
 overlayDiv.style.height = '100vh';
 overlayDiv.style.width = '100vw';
 overlayDiv.style.position = 'absolute';
 overlayDiv.style.top = '0';
 overlayDiv.style.left = '0';
 overlayDiv.style.zIndex = '-1';
 overlayDiv.style.opacity = '0.1';

//  check what the type is becuase we need to knwo where to put this. If it is a movie then we want it to go into the movie details id element, if it is a show then we want it to go into the show details   

if(type === 'movie'){
document.querySelector('#movie-details').appendChild(overlayDiv)
}else{
document.querySelector('#show-details').appendChild(overlayDiv)
}

}

// 13. Search Movies/Shows

// first we want to get the data from the url 
// http://127.0.0.1:5500/search.html?type=movie&search-term=goodfellas
// Anything from the ? question mark over including the ? is considered the queryString() then you have the query parameters which is each piece of data

async function search(){

  const queryString = window.location.search;
  // console.log(queryString) //?type=movie&search-term=goodfellas

  // to seperate out to get the data we can use an object called url search params 
  const urlParams = new URLSearchParams(queryString) //pass in queryString

    // console.log(urlParams.get('type')); 

    //urlParams methods on the Prototype that we can use e.g. .get() and put what we want to get like the query params 'type'. So when you click on the radio button movies and then click the button submit in the console you will see movie and same process for clicking on radio button for tv remember to click and press submit. We want to use it in other places so a solution is to add it in the global.

    // search: {
    //   term: '', 
    //   type: '',
    //   page: 1,
    //   totalPages: 1 
    //   }

    global.search.type = urlParams.get('type');
    global.search.term = urlParams.get('search-term'); //look back at form in search.html in the input we have name="search-term"

    //custom alert styled in css class .alert {}

    // not equal to empty string also not null
    if(global.search.term !== '' && global.search.term !== null){
    // make request and display result. If we pass validation we want to make the request and display results.  



    // const { results } to display in the DOM we put curly brackets around {results} as it is an object that has an array called results. We also want the total_pages, and page numbers page.
    const { results, total_pages, page, total_results } = await searchAPIData(); //searchAPIData() we do not have to pass anything in because the endpoint i8s going to be constructed from within the function.

    console.log(results)


    // add total results
    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    

    // check if there is results 

    if(results.length === 0){
      showAlert('No results found')
    return 
    }

    // if there are results we want to add them to the DOM. So have another function
    
    displaySearchResults(results)

    // clear the input 
    document.querySelector('#search-term').value ='';

    }else{
    //  alert('Please Enter Search Term')
    showAlert('Please enter a search term');
    }
  }

  search()

  // 16. 

  function displaySearchResults(results){
    // results is an array that is being passed in we want to loop through it and show it in the output


    // clear previous results 

    document.querySelector('#search-results').innerHTML='';
    document.querySelector('#search-results-heading').innerHTML='';
    document.querySelector('#pagination').innerHTML='';








    // it needs to be dynamic an handle both movies and shows 
    results.forEach((result) => {
      const div = document.createElement('div');
      div.classList.add('card');
      div.innerHTML = `
            <a href="${global.search.type}-details.html?id=${result.id}">
              ${
                result.poster_path
                  ? `<img
                src="https://image.tmdb.org/t/p/w500/${result.poster_path}"
                class="card-img-top"
                alt="${
                  global.search.type === 'movie' ? result.title : result.name
                }"
              />`
                  : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
               alt="${
                 global.search.type === 'movie' ? result.title : result.name
               }"
            />`
              }
            </a>
            <div class="card-body">
              <h5 class="card-title">${
                global.search.type === 'movie' ? result.title : result.name
              }</h5>
              <p class="card-text">
                <small class="text-muted">Release: ${
                  global.search.type === 'movie'
                    ? result.release_date
                    : result.first_air_date
                }</small>
              </p>
            </div>
          `;


        // add total reults in heading

        document.querySelector('#search-results-heading').innerHTML =`<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`

  
      document.querySelector('#search-results').appendChild(div);
    });

displayPagination();

  }
  

// 17.
// Create & Display Pagination for Search

function displayPagination(){

const div = document.createElement('div')
div.classList.add('pagination');
div.innerHTML =`
<button class="btn btn-primary" id="prev">Prev</button>
<button class="btn btn-primary" id="next">Next</button>
<div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
`

document.querySelector('#pagination').appendChild(div)

// disable prev next if on first page 

if(global.search.page === 1){
document.querySelector('#prev').disabled = true
}


// disable next button if on last page 
if(global.search.page === global.search.totalPages){
  document.querySelector('#next').disabled = true
  }



// next page. We need to add an event listener so we can actually change the page. When we change the page we need to make another request to the api with the particular page we want to get otherwise we will get the same results all the time 

document.querySelector('#next').addEventListener('click', async ()=>{

  // increment the global search page 

  global.search.page++
  
  
  const { results, total_pages } = await searchAPIData();
  displaySearchResults(results)

});


// prev button page 

document.querySelector('#prev').addEventListener('click', async ()=>{

  // decrement the global search page 

  global.search.page--
  
  
  const { results, total_pages } = await searchAPIData();
  displaySearchResults(results)

});

}



// 11.
// Display Slider Swiper Movies (New Releases)
// we want to make asyn as we will be fetching from the api
async function displaySlider(){
// results gives an object with a results array so an array called results. If you put curly braces around { results } you will get the straight array which is what you want.
const { results } = await fetchAPIData('movie/now_playing');

// console.log(results)
results.forEach((movie)=>{
const div = document.createElement('div')
div.classList.add('swiper-slide')

div.innerHTML = `
<a href="movie-details.html?id=${movie.id}">
  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
</a>
<h4 class="swiper-rating">
  <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
</h4>
`;

document.querySelector('.swiper-wrapper').appendChild(div)



initSwiper()

})

}


// 12.
// Swiper (we do need to initialise this and we can add options we do this by new swiper object).
function initSwiper(){
const swiper = new Swiper('.swiper', {
// pass in the class of .swiper the element to target and for the options we can pass in an object

// - all options available in documentation from: https://swiperjs.com/swiper-api

slidesPerView: 1, //we can specify breakpoints set to 1 movie initially but say if the viewport width is 500px and up we will set it to 2 if it is 700px and up we will set it to 3 and if it is 1200px or up we will set it to 4.   
spaceBetween: 30, //in pixels px 
freeMode: true, //click and drag it yourself 
loop: true, 
autoplay: {
delay: 4000, //delay between slides 4 secs
disableOnInteraction: false, // if you hover over it it will stop 
},
breakpoints: {
500: {
slidesPerView: 2
},
700: {
slidesPerView: 3
},
1200: {
slidesPerView: 4
},
}
})  
}



// 1. Fetch data from TMDB API 

async function fetchAPIData(endpoint){
const API_KEY = global.api.apiKey; 
const API_URL = global.api.apiUrl; // we put a forward slash / at the end of 3 here .org/3/ so need to put a slash ${API_UTL}/ here otherwise we will end up with two slashes.

// 3.
showSpinner(); //just before we make our request showSPinner()

const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`) 

const data = await response.json()

// 4.
hideSpinner() // once the data is actually fetched before we return it we are going to call hideSpinner()


return data; //call this from a function to get the popular movies from the homepage  
}


// 15. 
// Make Request To Search  
async function searchAPIData(){
  const API_KEY = global.api.apiKey; 
  const API_URL = global.api.apiUrl; 
  

  showSpinner(); 
  const response = await fetch(`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`) 
  
  const data = await response.json()
  

  hideSpinner() 
  
  return data;  
  }


// 3. 
function showSpinner(){
  document.querySelector('.spinner').classList.add('show')

}

// 4. 
function hideSpinner(){
  document.querySelector('.spinner').classList.remove('show')
}



// highlight active link yellow when clicked and then turns off after clicking to another link text button.

function highlightActiveLink(){
const links = document.querySelectorAll('.nav-link')

links.forEach((link)=>{

  if(link.getAttribute('href')=== global.currentPage ){

  link.classList.add('active')
  }

}) 

}


// 14. 
// Show Alert (Customised)

function showAlert(message, className = 'error') {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  // text will be the message that come's in from the function
  alertEl.appendChild(document.createTextNode(message));
  //add it to the DOM we do have an id of alert
  document.querySelector('#alert').appendChild(alertEl);


  //alert goes away after a certain amount of time

  setTimeout(()=> alertEl.remove(), 3000);



}




// 7. 
function addCommasToNumber(number){
// regular expression search stack overflow for javascript functions to add commas to a number..add a comma after every 3 zeros e.g. 000,000.

return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

}

// Init App (very simple router to check which page we are on)

function init(){
switch(global.currentPage){
case '/':
case '/index.html':
// console.log('Home');
displaySlider();
displayPopularMovies();
break; 
case '/shows.html':
// console.log('Shows');
displayPopularShows() //calling the function here to display TV shows in the DOM
break;
case '/movie-details.html':
// console.log('Movie Details');
displayMovieDetails();
break;
case '/tv-details.html':
// console.log('TV Details');
displayShowDetails();
break;
case 'search.html':
search(); // 13.
break;
}

highlightActiveLink()


}

// init()
document.addEventListener('DOMContentLoaded',  init);


