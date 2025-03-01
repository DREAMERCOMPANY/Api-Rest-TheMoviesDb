const domElements = [
    {
        'sections': {
            'headerSection': document.querySelector('#header'),
            'trendingPreviewSection': document.querySelector('#trendingPreview'),
            'categoriesPreviewSection': document.querySelector('#categoriesPreview'), 
            'genericSection': document.querySelector('#genericList'),
            'movieDetailSection': document.querySelector('#movieDetail'),
            'movieDetailContainer': document.querySelector('#categoriesPreview .categoriesPreview-list'),
            'trendingPreviewMoviesContainer': document.querySelector('#trendingPreview .trendingPreview-movieList'),
            'likedMoviesContainer':  document.querySelector('#liked'),
            'mainContainer': document.querySelector('.main-container'),
            'footer': document.querySelector('footer')
        }
        
    },

    {
        'listContainers':{
            'searchForm': document.querySelector('#searchForm'),
            'trendingMoviesPreviewList': document.querySelector('.trendingPreview-movieList'),
            'categoriesPreviewList': document.querySelector('.categoriesPreview-list'), 
            'movieDetailCategoriesList': document.querySelector('#movieDetail .categories-list'),
            'relatedMoviesContainer': document.querySelector('.relatedMovies-scrollContainer')

        }
    },

    {
        'elements':{
            'headerTitle' : document.querySelector('.header-title'),
            'headerSubtitle': document.querySelector('.header--subtitle'),
            'separator': document.querySelectorAll('.separator'),
            'arrowBtn' : document.querySelector('.header-arrow'),
            'headerCategoryTitle' : document.querySelector('.header-title--categoryView'),
            'searchFormInput' : document.querySelector('#searchForm input'),
            'searchFormBtn' : document.querySelector('#searchBtn'),
            'trendingBtn' : document.querySelector('.trendingPreview-btn'),
            'movieDetailTitle' : document.querySelector('.movieDetail-title'),
            'movieDetailDescription' : document.querySelector('.movieDetail-description'),
            'movieDetailScore' : document.querySelector('.movieDetail-score'),
            
        }
    }
]

export default domElements

