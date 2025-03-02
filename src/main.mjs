import API_KEY from "./secrets.mjs";
import domElements from "./nodes.mjs";

import { navigator, carrouselScroll } from "./navigation.mjs"; 
import updateLanguages from "./translations.mjs";

// Variables globales para manejar la paginación y evitar llamadas simultáneas
let page = 1;
let maxPage;
let isLoading = false;  // Flag para evitar múltiples llamadas concurrentes

// Creamos una instancia de axios con axios.create()
//DATA
//API

let lang = 'es-ES'; // Por defecto español


const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  params: {
    'api_key': API_KEY,
    "language": lang
  }
});

//OBJETO DE LOS IDIOMAS

const selectOptions = document.getElementById('languageoptions')



const countries = [
    {
      name: "usa",
      language: "en-US",
      flag: '🇺🇸',
    },
    {
      name: "spain",
      language: "es-ES",
      flag: '🇪🇸',
    },
    {
      name: "brazil",
      language: "pt-BR",
      flag: '🇧🇷',
    },
    {
      name: "germany",
      language: "de-DE",
      flag: '🇩🇪',
    },
    {
      name: "china",
      language: "zh-CN",
      flag: '🇨🇳',
    },
  ];

  
  

  async function getLanguages() {
    countries.forEach((country) => {
      const languageOption = document.createElement('option');
      languageOption.setAttribute('value', country.language);
      languageOption.innerHTML = `${country.flag}&nbsp;&nbsp;${country.name}`;

      if (country.language === lang) {
        languageOption.selected = true;
        updateLanguages(lang)
      }
      selectOptions.appendChild(languageOption);
    });
  }

  selectOptions.addEventListener('change', (e) => {
    lang = e.target.value;
    
    // Actualiza el parámetro de lenguaje en el objeto api
    api.defaults.params.language = lang;
    console.log('Idioma actualizado a:', lang);
    // Llama a homePage para refrescar las consultas con el nuevo idioma
    navigator()
    updateLanguages(lang)
  });
  
  



/* function likedMoviesList(){
    //solo devuelve el array o objeto de peliculas que tengo guardadas en LS
    //Obtiene lo que hay de localStorage en la propiedad 'liked_movies'
    const item =  JSON.parse(localStorage.getItem('liked_movies'));
    //Crea una variable movies sin declarar
    let movies;

    //pregunta si hay algo en el local storage, especificamente en la propiedad 'liked_movies'
    if(item){
        //Si ya hay algo.. le asigna ese algo a movies
        movies = item
    }else{

        //si no hay nada en 'liked_movies' movies lo asigna a un objeto
        movies = {}
    }

    return movies;
}


function likeMovie(movie){
    //LISTA de peliculas
    //Instancio la funcion en una variable
    const likedMovies = likedMoviesList()
    //ACA la idea es tener un objeto y que ese objeto guarde los distintos ID's de cada peli
    //Agarrar el objeto y  hacerle una pregunta
    //movie.id
    //console.log(likedMoviesList());

    if(likedMovies[movie.id]){
        console.log('La peli ya estaba en LS deberiamos eliminarla');
        //Aca estoy eliminando la propiedad (ID) del objeto de esta pelicula
        likedMovies[movie.id] = undefined;
    }else{
        //Si la pelicula no existia , guardo todo el objeto de la peli
        
        //{1234: {'''''}}
        likedMovies[movie.id] = movie
      
        console.log('La pelicula no esta en LS, deberiamos agregarla')
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies))
    
} */


    function likedMoviesList(){
        //Obtiene la informacion
        const item = JSON.parse(localStorage.getItem('liked_movies'))
        let movies;

        if(item){
            movies = item
        }else{
            movies = {}
        }

        return movies;
    }
    //Esta funcion se ejecuta cada vez que le doy click a una pelicula y la quiero agregar a favoritos :)
    function likeMovie(movie){
        const likedMovies = likedMoviesList()
        

        if(likedMovies[movie.id]){
            likedMovies[movie.id] = undefined;
            console.log('La pelicula SI esta en LS, eliminarla');
            
        }else{
            likedMovies[movie.id] = movie
            console.log('La peli NO esta en LS, agregarla')
        }

        localStorage.setItem('liked_movies', JSON.stringify(likedMovies))

    }

    //Obtener las peliculas del localStorage

    function validateLikedContainer(){
        const movieLikedContainer = document.querySelector('.liked-content');
        
        const isContainerEmpty = movieLikedContainer && movieLikedContainer.innerHTML.trim() === ''
        const arrowLeft = document.querySelector('#liked-arrowLeft');
        const arrowRight = document.querySelector('#liked-arrowRight')
        const likeTitle = document.querySelector('.liked-title')

        

        if(isContainerEmpty){
            //const text = document.createElement('p')
            //text.innerText = 'Aun no tienes peliculas en favoritos'
            arrowLeft.style.display = 'none'
            arrowRight.style.display = 'none'
            likeTitle.style.display = 'none'
            movieLikedContainer.style.display = 'flex'; // Asegúrate de que el contenedor sea un contenedor flexible
            movieLikedContainer.style.justifyContent = 'center'; // Asegúrate de poner el valor como una cadena
            movieLikedContainer.style.alignItems = 'center';
            //movieLikedContainer.appendChild(text) // Asegúrate de poner el valor como una cadena
            
        }else{
            getLikedMovies()
            likeTitle.style.display = 'block'
            arrowLeft.style.display = 'block'
            arrowRight.style.display = 'block'
            
            
        }
            // Si el contenedor tiene contenido, obtiene las películas a las que se les ha dado like
          
    }


    


    function getLikedMovies() {
        const movieLikedContainer = document.querySelector('.liked-content');
        console.log('Contenedor encontrado:', movieLikedContainer);
      
        const moviesLiked = likedMoviesList();
        console.log('Películas con like:', moviesLiked);
      
        const arrMoviesLiked = Object.values(moviesLiked);
        console.log('Arreglo de películas:', arrMoviesLiked);
      
        createMovie(movieLikedContainer, arrMoviesLiked, { lazy: true, clean: true });
      
        // Verificar si el contenedor tiene contenido
        console.log('Contenido del contenedor después de createMovie:', movieLikedContainer.innerHTML);
        
        carrouselScroll(movieLikedContainer);
      }

// Definición de las opciones para el IntersectionObserver (lazy loading)
const options = {
    threshold: 0.3
};

const lazyLoad = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const urlImage = entry.target.getAttribute('data-img');
            entry.target.classList.add('movie-img--visible');
            entry.target.setAttribute('src', urlImage);
            observer.unobserve(entry.target);
        }
    });
}, options);

//ENTENDER MEJOR ESTA FUNCION
// Función para actualizar el estado de todos los botones de like
function updateLikeButtons() {

    //Selecciona todos los botones del dom con esa clase, itera por cada uno de esos botones
    document.querySelectorAll('.liked-btn').forEach(btn => {
        const movieId = btn.getAttribute('data-movie-id');
        console.log(movieId);
        if (likedMoviesList()[movieId]) {
            btn.classList.add('liked-btn--toggle');
        } else {
            btn.classList.remove('liked-btn--toggle');
        }
    });
}


// Función para crear películas en un contenedor dado
function createMovie(container, arr, { lazy = false, clean = true } = {}) {
    if (clean) {
        container.innerHTML = '';
    }
    
    //Arreglo que devuelve la API, la API devuelve un objeto. se itera por cada uno de los elementos de ese objeto.
    arr.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.addEventListener('click', () => {
            location.hash = `#movie=${movie.id}`;
        });
        movieContainer.classList.add('movie-container');
        
        const movieImg = document.createElement('img');
        const likedBtn = document.createElement('button');
        
        likedBtn.classList.add('liked-btn');
        //Si la pelicula ya existe se le agrega el boton de me gusta, sino, no pasa nada, es una manera sencilla de hacer un condicionak con &&
        likedBtn.setAttribute('data-movie-id', movie.id);
        //likedMoviesList()[movie.id]  && likedBtn.classList.add('liked-btn--toggle')
        likedBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            //TODO:
            //movie es cada uno de los elementos que devuelve la solicitud a la API en un objeto
            console.log(movie);
            
           
            likeMovie(movie)
            getLikedMovies()
            validateLikedContainer()
            updateLikeButtons()
            
            
            
            // Aquí deberías implementar la lógica para agregar/quitar de favoritos
            //Preguntar si la pelicula ya esta en localStorahe y si esta dejarla con like o no 
            //likedBtn.classList.toggle('liked-btn--toggle');
        });
        
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazy ? 'data-img' : 'src',
            `https://image.tmdb.org/t/p/w300${movie.poster_path}`
        );
        
        movieImg.addEventListener('error', () => {
            const errorImg = 'https://i.pinimg.com/736x/04/31/56/043156597815947bde4aea7bc01062dc.jpg';
            movieImg.setAttribute('src', errorImg);
            movieImg.addEventListener('click', (event) => {
                event.stopPropagation();
                alert('La imagen no existe');
                const [, query] = location.hash.split('=');
                console.log(query);
                location.hash = `search=${query}`;
                window.scrollTo(0, 0);
            }, { once: true });
        });
        
        if (lazy) {
            lazyLoad.observe(movieImg);
        }
        
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(likedBtn);
        container.appendChild(movieContainer);
    });
}

// Función para crear categorías
function getCategories(container, arr) {
    container.innerHTML = '';
    arr.forEach(detail => {
        const catergoryContainer = document.createElement('div');
        const categoryTitle = document.createElement('h3');
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${detail.id}-${detail.name}`;
        });
        catergoryContainer.classList.add('category-container');
        categoryTitle.classList.add('category-title');
        categoryTitle.innerText = detail.name;
        categoryTitle.setAttribute('id', `id${detail.id}`);
        container.appendChild(catergoryContainer);
        catergoryContainer.appendChild(categoryTitle);
    });
}


// Funciones que hacen llamados a la API

async function getCategoriesPreview() {
    const { data } = await api.get('genre/movie/list');
    const generos = data.genres;
    console.warn({ generos });
    const movieDetailContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
    getCategories(movieDetailContainer, generos);
}

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    console.log({ data, movies });
    const trendindPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
    createMovie(trendindPreviewMoviesContainer, movies, { lazy: true });
    carrouselScroll(trendindPreviewMoviesContainer)
}

async function getMoviesByCategory(id) {
    // Reiniciamos paginación para la nueva categoría
    page = 1;
    isLoading = false;
    const { data } = await api.get('discover/movie', {
        params: { with_genres: id }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
    const container = document.querySelector('#genericList');
    createMovie(container, movies, { lazy: true });
}

async function getMoviesBysearch(query) {
    // Reiniciamos paginación para la nueva búsqueda
    page = 1;
    isLoading = false;
    const { data } = await api('search/movie', {
        params: { query }
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(maxPage);
    const container = document.querySelector('#genericList');
    createMovie(container, movies, { clean: true, lazy: true });
}

async function getTrendingMovies() {
    // Reiniciamos paginación para tendencias
    page = 1;
    isLoading = false;
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;
    console.log({ data, movies });
    const genericSection = document.querySelector('#genericList');
    createMovie(genericSection, movies, { lazy: true, clean: true });
}

async function getMovieDetailById(id) {
    const { data: movie } = await api.get(`movie/${id}`);
    const movieImgUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    const headerImg = document.querySelector('.header-container--long');
    headerImg.style.background = `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3), rgba(240, 240, 240, 0)),
        url(${movieImgUrl})
    `;
    headerImg.style.backgroundSize = "contain";
    headerImg.style.backgroundPosition = "center";
    headerImg.style.backgroundRepeat = "no-repeat";
    console.log(headerImg);
    const categoryList = document.querySelector('.categories-list');
    console.log(categoryList);
    console.log(movie.genres);
    
    getCategories(categoryList, movie.genres);
    domElements.forEach(el => {
        const title = el.elements?.movieDetailTitle;
        const description = el.elements?.movieDetailDescription;
        const detailScore = el.elements?.movieDetailScore;
        if (title) title.innerText = movie.title;
        if (description) description.innerText = movie.overview;
        if (detailScore) detailScore.innerText = movie.vote_average;
    });
    getRelatedMovieById(id);
}

//Mostrar peliculas relacionadas
async function getRelatedMovieById(id) {
    const { data } = await api.get(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
    const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');
    createMovie(relatedMoviesContainer, relatedMovies, { lazy: true });
    carrouselScroll(relatedMoviesContainer)
}

//---------------------------------
// Funciones de Infinite Scrolling
//---------------------------------

// Para categorías
function getPaginatedMoviesByCategory(id) {
    return async function () {
        const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
        const isReadyToScrollDown = clientHeight + scrollTop >= scrollHeight - 250;
        const pageIsNotMax = page < maxPage;
        
        if (isReadyToScrollDown && pageIsNotMax && !isLoading) {
            isLoading = true; // Evitamos múltiples llamadas simultáneas
            page++;
            const { data } = await api('discover/movie', {
                params: {
                    with_genres: id,
                    page
                }
            });
            const movies = data.results;
            console.log({ data, movies });
            const genericSection = document.querySelector('#genericList');
            createMovie(genericSection, movies, { lazy: true, clean: false });
            isLoading = false;
        }
    }
}

// Para búsquedas
function getPaginatedMoviesBySearch(query) {
    return async function () {
        const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
        const isReadyToScrollDown = clientHeight + scrollTop >= scrollHeight - 250;
        const pageIsNotMax = page < maxPage;
        
        if (isReadyToScrollDown && pageIsNotMax && !isLoading) {
            isLoading = true;
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page
                }
            });
            const movies = data.results;
            console.log({ data, movies });
            const genericSection = document.querySelector('#genericList');
            createMovie(genericSection, movies, { lazy: true, clean: false });
            isLoading = false;
        }
    }
}

// Para tendencias
async function getPaginatedTrendingMovies() {
    const { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    const isReadyToScrollDown = clientHeight + scrollTop >= scrollHeight - 250;
    const pageIsNotMax = page < maxPage;
    
    if (isReadyToScrollDown && pageIsNotMax && !isLoading) {
        isLoading = true;
        page++;
        const { data } = await api('trending/movie/day', {
            params: {
                page
            }
        });
        const movies = data.results;
        console.log({ data, movies });
        const genericSection = document.querySelector('#genericList');
        createMovie(genericSection, movies, { lazy: true, clean: false });
        isLoading = false;
    }
}

export { 
    getCategoriesPreview, 
    getTrendingMoviesPreview, 
    getMoviesByCategory, 
    getMoviesBysearch, 
    getTrendingMovies, 
    getMovieDetailById, 
    getPaginatedTrendingMovies, 
    getPaginatedMoviesBySearch, 
    getPaginatedMoviesByCategory,
    getLikedMovies,
    getLanguages,
    validateLikedContainer
};
