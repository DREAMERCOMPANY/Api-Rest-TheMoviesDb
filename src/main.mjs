import API_KEY from "./secrets.mjs";

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
        movieContainer.classList.add('movie-container')
        const movieImg= document.createElement('img')
        movieImg.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', `https://image.tmdb.org/t/p/w300${movie.poster_path}`)
        movieContainer.appendChild(movieImg)
        trendindPreviewMoviesContainer.appendChild(movieContainer)

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
    
    const movieDetailContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
    movieDetailContainer.innerHTML = ''
    generos.forEach(detail =>{

        const catergoryContainer = document.createElement('div')
        const categoryTitle = document.createElement('h3')
        catergoryContainer.classList.add('category-container')
        categoryTitle.classList.add('category-title')
        categoryTitle.innerText = detail.name
        categoryTitle.setAttribute('id', `id${detail.id}`)

       

        movieDetailContainer.appendChild(catergoryContainer)
        catergoryContainer.appendChild(categoryTitle) 

        

    })
}



export  { getCategoriesPreview ,getTrendingMoviesPreview }










