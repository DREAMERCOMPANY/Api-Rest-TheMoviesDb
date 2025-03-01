import { getCategoriesPreview ,getTrendingMoviesPreview , getLanguages ,getMoviesByCategory,getMoviesBysearch, getTrendingMovies, getMovieDetailById, getPaginatedTrendingMovies, getPaginatedMoviesBySearch, getPaginatedMoviesByCategory, getLikedMovies, validateLikedContainer} from './main.mjs'

import domElements from './nodes.mjs'

//Carrusel





function carrouselScroll(container) {
    // Busca las flechas dentro del contenedor específico
    const leftArrow = container.parentElement.querySelector('.left-arrow');
    const rightArrow = container.parentElement.querySelector('.right-arrow');
  
    // Limpia los eventos anteriores (para evitar acumulación)
    leftArrow?.removeEventListener('click', leftHandler);
    rightArrow?.removeEventListener('click', rightHandler);
  
    // Definimos los manejadores de evento
    function leftHandler() {
      //alert('⬅️ Desplazando a la izquierda');
      container.scrollBy({
        left: -container.offsetWidth,
        behavior: 'smooth',
      });
    }
  
    function rightHandler() {
      //alert('➡️ Desplazando a la derecha');
      container.scrollBy({
        left: container.offsetWidth,
        behavior: 'smooth',
      });
    }
  
    // Asociamos los eventos
    leftArrow?.addEventListener('click', leftHandler);
    rightArrow?.addEventListener('click', rightHandler);
  }
  
  

  
  


const inputElement = document.getElementById('searchInput');
const inputContainer = document.querySelector('.input-container');

// Evento cuando el input recibe el foco
inputElement.addEventListener('focus', function() {
  inputContainer.classList.add('focused');
});

// Evento cuando el input pierde el foco
inputElement.addEventListener('blur', function() {
  inputContainer.classList.remove('focused');
});




let infiniteScrolling;

//window.addEventListener('scroll', infiniteScrolling)
window.addEventListener('DOMContentLoaded', ()=> {
    
    navigator()
    getLanguages()
    
    getLikedMovies()
    validateLikedContainer()
    
   
    //scroll()
    
    //console.log(mainContent);
})
window.addEventListener('hashchange', ()=>{
    navigator()
    setTimeout(() => window.scrollTo(0, 0), 10);
    //scroll()
   
})

window.addEventListener('load', ()=>{
    setTimeout(() => window.scrollTo(0, 0), 10);
}) 

//window.addEventListener('scroll', infiniteScrolling, false)
//console.log(infiniteScrolling);


//header loading

function loadersSkeleton(){
    const titlePreview = document.querySelector('#titlePreview')
    const btnTrending  = document.querySelector('#btnTrending')
    
    
    setTimeout(()=>{
        titlePreview.classList.remove('trendingPreview-title--loading')
        titlePreview.innerText = 'Tendencias'
        //btnTrending.classList.remove('trendingPreview-btn--loading')
        //btnTrending.innerText = 'Ver más'
    }, 200)
}







const arrowBtn = document.querySelector('.header-arrow')
console.log(arrowBtn);

arrowBtn.addEventListener('click', ()=> history.back())





domElements.forEach(dom => {
    const searchFormBtn = dom.elements?.searchFormBtn;
    const trendingBtn = dom.elements?.trendingBtn;
    //const arrowBtn = dom.elements?.arrowBtn;
    const inputSearch = document.querySelector('#searchInput');

    if (searchFormBtn) {
        searchFormBtn.addEventListener('click', () => {
            location.hash = `search=${inputSearch.value.trim()}`;
        });
    }

    if (trendingBtn) {
        trendingBtn.addEventListener('click', () => {
            location.hash = '#trends';
        });
    }

    
});



function navigator(){
    loadersSkeleton()
    

    if(infiniteScrolling){
        window.removeEventListener('scroll', infiniteScrolling, {passive:false})
        infiniteScrolling = undefined
    }
 
    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage();
    }else{
       homePage()
    }

    if(infiniteScrolling){
        window.addEventListener('scroll', infiniteScrolling, {passive:false})
    }

    
    
}



function getHomePage(){
    
    domElements.forEach(element => {
        

        const headerSection = element.sections?.headerSection;
        const footer = element.sections?.footer

        if(footer){
            footer.style.background = 'transparent'
        }

        if (headerSection) {
            headerSection.classList.remove('header-container--long');
            headerSection.style.background = 'none';
        }
       
        element.elements?.arrowBtn.classList.add('inactive')
        element.elements?.arrowBtn.classList.remove('header-arrow--white')
        element.elements?.headerTitle.classList.remove('inactive')
        element.elements?.headerSubtitle.classList.remove('inactive')
        element.elements?.separator.forEach(el => {el.classList.remove('inactive')})
        element.elements?.headerCategoryTitle.classList.add('inactive')
        element.listContainers?.searchForm.classList.remove('inactive')

        element.sections?.trendingPreviewSection.classList.remove('inactive')
        element.sections?.categoriesPreviewSection.classList.remove('inactive')
        element.sections?.likedMoviesContainer.classList.remove('inactive')
        element.sections?.genericSection.classList.add('inactive')
        element.sections?.movieDetailSection.classList.add('inactive')
    })

}

function homePage(){
    console.log('HOME');

    

    getHomePage()
    getCategoriesPreview()
    getTrendingMoviesPreview() 
    getLikedMovies()

}

function getCategoriesPage(){
    domElements.forEach(element => {

        const headerSection = element.sections?.headerSection;

        if (headerSection) {
            headerSection.classList.remove('header-container--long');
            headerSection.style.background = 'none';
            }
        
        element.elements?.arrowBtn.classList.remove('inactive')
        element.elements?.arrowBtn.classList.remove('header-arrow--white')
        element.elements?.headerTitle.classList.add('inactive')
        element.elements?.headerSubtitle.classList.add('inactive')
        element.elements?.separator.forEach(el => {el.classList.add('inactive')})
        element.elements?.headerCategoryTitle.classList.remove('inactive')
        element.listContainers?.searchForm.classList.add('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
        element.sections?.likedMoviesContainer.classList.add('inactive')
        element.sections?.categoriesPreviewSection.classList.add('inactive')
        element.sections?.genericSection.classList.remove('inactive')
        element.sections?.movieDetailSection.classList.add('inactive')
    })
}

function categoriesPage(){
    console.log('CATEGORY');
    getCategoriesPage()
    //alert('cat')

    //Destructuracion con un array
    //categoryData devuelve un string
    const [_ , categoryData] = location.hash.split('=') //['#category', 'id-name']
    console.log(categoryData)
    const [categoryId , categoryName] = categoryData.split('-')
    console.log(categoryId)

    domElements.forEach(el =>{
        const headerTitle = el.elements?.headerCategoryTitle

        if(headerTitle){
            headerTitle.innerHTML = decodeURIComponent(categoryName)
        }
        
    })
   

    getMoviesByCategory(categoryId)
    infiniteScrolling = getPaginatedMoviesByCategory(categoryId)
    
}

function getMovieDetailsPage(){
    domElements.forEach(element => {

        const headerSection = element.sections?.headerSection;

        if (headerSection) {
            headerSection.classList.add('header-container--long');
            //headerSection.style.background = 'none';
            }

            const footer = element.sections?.footer

        if(footer){
            footer.style.background = '#2B332D'
        }
        
        element.elements?.arrowBtn.classList.remove('inactive')
        element.elements?.arrowBtn.classList.add('header-arrow--white')
        element.elements?.headerTitle.classList.add('inactive')
        element.elements?.headerSubtitle.classList.add('inactive')
        element.elements?.separator.forEach(el => {el.classList.add('inactive')})
        element.elements?.headerCategoryTitle.classList.add('inactive')
        element.listContainers?.searchForm.classList.add('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
        element.sections?.likedMoviesContainer.classList.add('inactive')
       

        element.sections?.categoriesPreviewSection.classList.add('inactive')
        element.sections?.genericSection.classList.add('inactive')
        element.sections?.movieDetailSection.classList.remove('inactive')

        // ✅ Validar si mainContainer existe antes de acceder a style
        if (element.sections?.mainContainer) {
            element.sections.mainContainer.style.position = 'static';
            
        }
    })
}

function movieDetailsPage(){
    getMovieDetailsPage()
    //alert('details movies!')

    //#movie=1212142
    const [_, movieID] = location.hash.split('=')
    getMovieDetailById(movieID)


    console.log('MOVIES');
}

function getSearchPage(){
    domElements.forEach(element => {

        const headerSection = element.sections?.headerSection;

        if (headerSection) {
            headerSection.classList.remove('header-container--long');
            headerSection.style.background = 'none';
            }
        
        element.elements?.arrowBtn.classList.remove('inactive')
        element.elements?.arrowBtn.classList.remove('header-arrow--white')
        element.elements?.headerTitle.classList.add('inactive')
        element.elements?.headerSubtitle.classList.add('inactive')
        element.elements?.separator.forEach(el => {el.classList.add('inactive')})
        element.elements?.headerCategoryTitle.classList.add('inactive')
        element.listContainers?.searchForm.classList.remove('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
        element.sections?.likedMoviesContainer.classList.add('inactive')
        element.sections?.categoriesPreviewSection.classList.add('inactive')
        element.sections?.genericSection.classList.remove('inactive')
        element.sections?.movieDetailSection.classList.add('inactive')
    })
}

function searchPage(){
    console.log('SEARCH');
    //alert('search page :)')
    getSearchPage()
    //[#search,aaaaa]
    const [_ , query] =location.hash.split('=')
    getMoviesBysearch(query)
    infiniteScrolling = getPaginatedMoviesBySearch(query)

    
}

function getTrendsPage(){
    domElements.forEach(element => {

        const headerSection = element.sections?.headerSection;

        if (headerSection) {
            headerSection.classList.remove('header-container--long');
            headerSection.style.background = 'none';
            }
        
        element.elements?.arrowBtn.classList.remove('inactive')
        element.elements?.arrowBtn.classList.remove('header-arrow--white')
        element.elements?.headerTitle.classList.add('inactive')
        element.elements?.headerCategoryTitle.classList.remove('inactive')
        element.listContainers?.searchForm.classList.add('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
        element.sections?.categoriesPreviewSection.classList.add('inactive')
        element.sections?.likedMoviesContainer.classList.add('inactive')
        element.sections?.genericSection.classList.remove('inactive')
        element.sections?.movieDetailSection.classList.add('inactive')
    })
}

function trendsPage(){
    console.log('TRENDS');
    getTrendsPage()

    domElements.forEach(el =>{
        const trendsTitle = el.elements?.headerCategoryTitle
        if(trendsTitle) trendsTitle.innerHTML = 'Tendencias'
    })

    getTrendingMovies()
    infiniteScrolling = getPaginatedTrendingMovies
}

export {homePage, carrouselScroll} 







