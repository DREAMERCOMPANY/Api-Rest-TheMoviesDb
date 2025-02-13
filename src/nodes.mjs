const domElements = [
    {
        'sections': {
            'headerSection': document.querySelector('#header'),
            'trendingPreviewSection': document.querySelector('#trendingPreview'),
            'categoriesPreviewSection': document.querySelector('#categoriesPreview'), 
            'genericSection': document.querySelector('#genericList'),
            'movieDetailSection': document.querySelector('#movieDetail'),
            'movieDetailContainer': document.querySelector('#categoriesPreview .categoriesPreview-list'),
            'trendingPreviewMoviesContainer': document.querySelector('#trendingPreview .trendingPreview-movieList')
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

/* // Sections
const headerSection = document.querySelector('#header');
const trendingPreviewSection = document.querySelector('#trendingPreview');
const categoriesPreviewSection = document.querySelector('#categoriesPreview');
const genericSection = document.querySelector('#genericList');
const movieDetailSection = document.querySelector('#movieDetail');

// Lists & Containers
const searchForm = document.querySelector('#searchForm');
const trendingMoviesPreviewList = document.querySelector('.trendingPreview-movieList');
const categoriesPreviewList = document.querySelector('.categoriesPreview-list');
const movieDetailCategoriesList = document.querySelector('#movieDetail .categories-list');
const relatedMoviesContainer = document.querySelector('.relatedMovies-scrollContainer');

// Elements
const headerTitle = document.querySelector('.header-title');
const arrowBtn = document.querySelector('.header-arrow');
const headerCategoryTitle = document.querySelector('.header-title--categoryView');
const searchFormInput = document.querySelector('#searchForm input');
const searchFormBtn = document.querySelector('#searchBtn');
const trendingBtn = document.querySelector('.trendingPreview-btn');
const movieDetailTitle = document.querySelector('.movieDetail-title');
const movieDetailDescription = document.querySelector('.movieDetail-description');
const movieDetailScore = document.querySelector('.movieDetail-score'); */