import API_KEY from "./secrets.mjs";
import domElements from "./nodes.mjs";

//Creamos una instancia de axios con axios.create()
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY
    }
})

//Clean Content
//funcion limpiar contenedor

//console.log(typeof(API_KEY))

async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day')
    //const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    //const data = await res.json()
    const movies = data.results

    console.log({data, movies});
    const trendindPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
    trendindPreviewMoviesContainer.innerHTML = ''
    movies.forEach(movie =>{
    
        const movieContainer = document.createElement('div')
        movieContainer.addEventListener('click', ()=>  location.hash= `#movie=${movie.id}`)

       
        movieContainer.classList.add('movie-container')
        const movieImg= document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        movieContainer.appendChild(movieImg)
        trendindPreviewMoviesContainer.appendChild(movieContainer)

    })

    
    

}

//utils
function getCategories(container, arr){

    //const container = document.querySelector('#categoriesPreview .categoriesPreview-list')
    container.innerHTML = ''
    
    arr.forEach(detail =>{

        const catergoryContainer = document.createElement('div')
        const categoryTitle = document.createElement('h3')
        categoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${detail.id}-${detail.name}`
        })
        catergoryContainer.classList.add('category-container')
        categoryTitle.classList.add('category-title')
        categoryTitle.innerText = detail.name
        categoryTitle.setAttribute('id', `id${detail.id}`)
        container.appendChild(catergoryContainer)
        catergoryContainer.appendChild(categoryTitle) 
    })

}

function createMovie(container, arr){
     container.innerHTML = ''
    
    //const trendindPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
    //trendindPreviewMoviesContainer.innerHTML = ''
    arr.forEach(movie =>{
    
        const movieContainer = document.createElement('div')
        movieContainer.addEventListener('click', ()=>{
            location.hash= `#movie=${movie.id}`
        })
        movieContainer.classList.add('movie-container')
        const movieImg= document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
         
        //trendindPreviewMoviesContainer.appendChild(movieContainer)

    })

}

async function getCategoriesPreview(){

    const {data} = await api.get('genre/movie/list')
    //const res = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=es`)
    //const data = await res.json()
    const generos = data.genres

    console.warn({
        'generos': generos
    })

    //Seleccion contenedor categorias
    const movieDetailContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
    //Llamado funcion para obtener categorias
    getCategories(movieDetailContainer, generos)
    
    /* movieDetailContainer.innerHTML = ''
    
    generos.forEach(detail =>{

        const catergoryContainer = document.createElement('div')
        const categoryTitle = document.createElement('h3')
        categoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${detail.id}-${detail.name}`
        })
        catergoryContainer.classList.add('category-container')
        categoryTitle.classList.add('category-title')
        categoryTitle.innerText = detail.name
        categoryTitle.setAttribute('id', `id${detail.id}`)
        movieDetailContainer.appendChild(catergoryContainer)
        catergoryContainer.appendChild(categoryTitle) 
    })
 */
    /* const list = document.querySelectorAll('.category-container')
    console.log(list); */
     
}


 async function getMoviesByCategory(id){
    //Solicitud asincrona a la API con una instancia creada de Axios
    const {data} = await api.get('discover/movie',{
        //Parametros que necesita la solicitud para que pueda ser completada
        params:{
            with_genres: id
        }
    })
    
    //Respuesta a la solicitud asincrona con axios que se le hace a la API
    const movies = data.results

    //LLamado al contenedor de la seccion
    const container = document.querySelector('#genericList')
    //Llamado funcion crear pelicula
    createMovie(container, movies)

} 

async function getMoviesBysearch(query) {
    const {data} = await api('search/movie',{
        params:{
            query
        }
    })

    const movies = data.results

    //LLamado al contenedor de la seccion
    const container = document.querySelector('#genericList')
    //Llamado funcion crear pelicula
    createMovie(container, movies)
    
    
}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day')
    //const res = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    //const data = await res.json()
    const movies = data.results

    console.log({data, movies});
    
    const genericSection = document.querySelector('#genericList')
    createMovie(genericSection , movies)

    
    //const trendindPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
    //trendindPreviewMoviesContainer.innerHTML = ''
    /* movies.forEach(movie =>{
    
        const movieContainer = document.createElement('div')
        movieContainer.addEventListener('click', ()=>{
            location.hash= `#movie=${movie.id}`
        })
        movieContainer.classList.add('movie-container')
        const movieImg= document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        movieContainer.appendChild(movieImg)
        domElements.forEach(el => {
            const container = el.sections?.genericSection
            if(container) container.appendChild(movieContainer)
         })
        //trendindPreviewMoviesContainer.appendChild(movieContainer)

    }) */

    
    

}

async function getMovieDetailById(id){
    const {data: movie} = await api.get(`movie/${id}`)
    const movieImgUrl = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
const headerImg = document.querySelector('.header-container--long');

headerImg.style.background = `
    linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.3), rgba(240, 240, 240, 0)),
    url(${movieImgUrl})
`;
headerImg.style.backgroundSize = "contain"; // Para que cubra todo el contenedor
headerImg.style.backgroundPosition = "center"; // Centra la imagen
headerImg.style.backgroundRepeat = "no-repeat"; // Evita que se repita

    console.log(headerImg);

    //Categories Container
    const categoryList = document.querySelector('.categories-list')
    getCategories(categoryList, movie.genres)
    
    //if(headerImg) headerImg.style.background = `url(${movieImgUrl})`
    
    domElements.forEach(el =>{
        const title = el.elements?.movieDetailTitle
        const description = el.elements?.movieDetailDescription
        const detailScore = el.elements?.movieDetailScore
        
        if(title) title.innerText = movie.title
        if(description) description.innerText = movie.overview
        if(detailScore) detailScore.innerText = movie.vote_average

    })

    getRelatedMovieById(id)
    

}

async function getRelatedMovieById(id){
    const {data} = await api.get(`movie/${id}/recommendations`)
    const relatedMovies = data.results;

    //Contenedor para meter las peliculas
    const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer')
    
    //Llamar funcion para crear pelicula
    createMovie(relatedMoviesContainer, relatedMovies)
}











export  { getCategoriesPreview ,getTrendingMoviesPreview, getMoviesByCategory, getMoviesBysearch, getTrendingMovies, getMovieDetailById}










