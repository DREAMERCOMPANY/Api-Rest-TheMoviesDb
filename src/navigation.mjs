import { getCategoriesPreview ,getTrendingMoviesPreview , getMoviesByCategory,getMoviesBysearch, getTrendingMovies, getMovieDetailById} from './main.mjs'
import domElements from './nodes.mjs'
window.addEventListener('DOMContentLoaded', ()=> {
    navigator()
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

    
    
}



function getHomePage(){
    
    domElements.forEach(element => {
        

        const headerSection = element.sections?.headerSection;

        if (headerSection) {
            headerSection.classList.remove('header-container--long');
            headerSection.style.background = 'none';
        }
       
        element.elements?.arrowBtn.classList.add('inactive')
        element.elements?.arrowBtn.classList.remove('header-arrow--white')
        element.elements?.headerTitle.classList.remove('inactive')
        element.elements?.headerCategoryTitle.classList.add('inactive')
        element.listContainers?.searchForm.classList.remove('inactive')

        element.sections?.trendingPreviewSection.classList.remove('inactive')
        element.sections?.categoriesPreviewSection.classList.remove('inactive')
        element.sections?.genericSection.classList.add('inactive')
        element.sections?.movieDetailSection.classList.add('inactive')
    })

}

function homePage(){
    console.log('HOME');

    

    getHomePage()
    getCategoriesPreview()
    getTrendingMoviesPreview() 
    

    
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
        element.elements?.headerCategoryTitle.classList.remove('inactive')
        element.listContainers?.searchForm.classList.add('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
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
    
}

function getMovieDetailsPage(){
    domElements.forEach(element => {

        const headerSection = element.sections?.headerSection;

        if (headerSection) {
            headerSection.classList.add('header-container--long');
            //headerSection.style.background = 'none';
            }
        
        element.elements?.arrowBtn.classList.remove('inactive')
        element.elements?.arrowBtn.classList.add('header-arrow--white')
        element.elements?.headerTitle.classList.add('inactive')
        element.elements?.headerCategoryTitle.classList.add('inactive')
        element.listContainers?.searchForm.classList.add('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
        element.sections?.categoriesPreviewSection.classList.add('inactive')
        element.sections?.genericSection.classList.add('inactive')
        element.sections?.movieDetailSection.classList.remove('inactive')
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
        element.elements?.headerCategoryTitle.classList.add('inactive')
        element.listContainers?.searchForm.classList.remove('inactive')

        element.sections?.trendingPreviewSection.classList.add('inactive')
        element.sections?.categoriesPreviewSection.classList.add('inactive')
        element.sections?.genericSection.classList.remove('inactive')
        element.sections?.movieDetailSection.classList.add('inactive')
    })
}

function searchPage(){
    console.log('SEARCH');
    getSearchPage()
    //[#search,aaaaa]
    const [_ , query] =location.hash.split('=')
    getMoviesBysearch(query)
   

    
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
    
}



