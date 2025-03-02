// Objeto de traducciones con las claves correspondientes a los códigos de idioma completos
const translations = {
    "en-US": {
      headerTitle: "Market Movies",
      headerSubtitle: "We deliver the best movies currently dominating the market. With real-time updates on trending films, top ratings, and the latest releases, it gives you instant access to the hottest titles. Perfect for movie lovers looking to stay ahead of the curve and discover what’s making waves in the cinema world.",
      headerCategoryView: "Action", 
      searchPlaceholder: "Search Something",
      searchBtn: "🔍",
      trendingPreviewTitle: "Trending Now",
      categoriesPreviewTitle: "Categories",
      categoriesPreviewSubtitle: "Dive into a world of cinema organized by categories, where you can explore each genre and discover the latest films, unforgettable classics, and upcoming releases you can't miss.",
      likedTitle: "Favourite Movies",
      movieDetailTitle: "Deadpool",
      movieDetailScore: "7.6",
      movieDetailDescription: "Wisecracking mercenary Deadpool battles the evil and powerful Cable and other bad guys to save a boy's life.",
      relatedMoviesTitle: "Related Movies",
      footer: "Made with love by Jhon ©"
    },
    "es-ES": {
      headerTitle: "Mercado de Películas",
      headerSubtitle: "Te ofrecemos las mejores películas que dominan el mercado actualmente. Con actualizaciones en tiempo real sobre las películas más populares, las mejores valoradas y los últimos estrenos, te da acceso instantáneo a los títulos más calientes. Perfecto para los amantes del cine que quieren estar al tanto de lo que está arrasando en el mundo del cine.",
      headerCategoryView: "Acción",
      searchPlaceholder: "Buscar algo",
      searchBtn: "🔍",
      trendingPreviewTitle: "Lo más popular",
      categoriesPreviewTitle: "Categorías",
      categoriesPreviewSubtitle: "Sumérgete en un mundo de cine organizado por categorías, donde podrás explorar cada género y descubrir las películas más recientes, los clásicos inolvidables y las próximas novedades que no te puedes perder.",
      likedTitle: "Películas Favoritas",
      movieDetailTitle: "Deadpool",
      movieDetailScore: "7.6",
      movieDetailDescription: "El mercenario sarcástico Deadpool lucha contra el malvado y poderoso Cable y otros villanos para salvar la vida de un niño.",
      relatedMoviesTitle: "Películas Relacionadas",
      footer: "Hecho con amor por Jhon ©"
    },
    "pt-BR": {
      headerTitle: "Mercado de Filmes",
      headerSubtitle: "Oferecemos os melhores filmes que estão dominando o mercado atualmente. Com atualizações em tempo real sobre os filmes mais populares, as melhores avaliações e os lançamentos mais recentes, ele oferece acesso instantâneo aos títulos mais quentes. Perfeito para os amantes de cinema que querem ficar à frente da curva e descobrir o que está fazendo sucesso no mundo do cinema.",
      headerCategoryView: "Ação",
      searchPlaceholder: "Pesquisar algo",
      searchBtn: "🔍",
      trendingPreviewTitle: "Em Alta",
      categoriesPreviewTitle: "Categorias",
      categoriesPreviewSubtitle: "Mergulhe em um mundo de cinema organizado por categorias, onde você pode explorar cada gênero e descobrir os filmes mais recentes, os clássicos inesquecíveis e os próximos lançamentos que você não pode perder.",
      likedTitle: "Filmes Favoritos",
      movieDetailTitle: "Deadpool",
      movieDetailScore: "7.6",
      movieDetailDescription: "O mercenário sarcástico Deadpool batalha contra o maligno e poderoso Cable e outros vilões para salvar a vida de um garoto.",
      relatedMoviesTitle: "Filmes Relacionados",
      footer: "Feito com amor por Jhon ©"
    },
    "de-DE": {
      headerTitle: "Markt Filme",
      headerSubtitle: "Wir liefern die besten Filme, die derzeit den Markt dominieren. Mit Echtzeit-Updates zu den trendenden Filmen, den besten Bewertungen und den neuesten Veröffentlichungen haben Sie sofortigen Zugang zu den heißesten Titeln. Perfekt für Filmfans, die immer auf dem neuesten Stand bleiben und entdecken möchten, was die Wellen in der Kino-Welt schlägt.",
      headerCategoryView: "Aktion",
      searchPlaceholder: "Etwas suchen",
      searchBtn: "🔍",
      trendingPreviewTitle: "Trendige Filme",
      categoriesPreviewTitle: "Kategorien",
      categoriesPreviewSubtitle: "Tauchen Sie ein in eine Welt des Kinos, die nach Kategorien organisiert ist, in der Sie jedes Genre erkunden und die neuesten Filme, unvergessliche Klassiker und bevorstehende Neuerscheinungen entdecken können, die Sie nicht verpassen sollten.",
      likedTitle: "Lieblingsfilme",
      movieDetailTitle: "Deadpool",
      movieDetailScore: "7.6",
      movieDetailDescription: "Der sarkastische Söldner Deadpool kämpft gegen den bösen und mächtigen Cable und andere Bösewichte, um das Leben eines Jungen zu retten.",
      relatedMoviesTitle: "Ähnliche Filme",
      footer: "Mit Liebe von Jhon gemacht ©"
    },
    "zh-CN": {
      headerTitle: "电影市场",
      
      headerSubtitle: "我们提供当前主导市场的最佳电影。通过实时更新流行电影、最高评分和最新发布，您可以即时访问最热门的标题。对于那些希望跟上趋势并发现电影世界最新动态的电影爱好者来说，这是完美的选择。",
      headerCategoryView: "动作",
      searchPlaceholder: "搜索内容",
      searchBtn: "🔍",
      trendingPreviewTitle: "当前流行",
      categoriesPreviewTitle: "类别",
      categoriesPreviewSubtitle: "进入一个按类别组织的电影世界，在这里你可以探索每个类型并发现最新电影、经典影片以及即将上映的热门影片。",
      likedTitle: "最爱电影",
      movieDetailTitle: "死侍",
      movieDetailScore: "7.6",
      movieDetailDescription: "聪明机智的雇佣兵死侍与邪恶而强大的凯布尔及其他坏人作斗争，以拯救一个男孩的生命。",
      relatedMoviesTitle: "相关电影",
      footer: "由Jhon用爱制作 ©"
    }
  };
  
  // Función para actualizar los textos en la página según el idioma
  function updateLanguages(lang) {
    // Actualizar los textos del contenido según el idioma seleccionado
    document.querySelector('.header-title').textContent = translations[lang].headerTitle;
    document.querySelector('.header--subtitle').textContent = translations[lang].headerSubtitle;
    document.querySelector('.header-title--categoryView').textContent = translations[lang].headerCategoryView;
    document.querySelector('#searchInput').placeholder = translations[lang].searchPlaceholder;
    document.querySelector('#searchBtn').textContent = translations[lang].searchBtn;
    document.querySelector('#titlePreview').textContent = translations[lang].trendingPreviewTitle;
    document.querySelector('.categoriesPreview-title').textContent = translations[lang].categoriesPreviewTitle;
    document.querySelector('.categoriesPreview-subtitle').textContent = translations[lang].categoriesPreviewSubtitle;
    document.querySelector('.liked-title').textContent = translations[lang].likedTitle;
    document.querySelector('.movieDetail-title').textContent = translations[lang].movieDetailTitle;
    document.querySelector('.movieDetail-score').textContent = translations[lang].movieDetailScore;
    document.querySelector('.movieDetail-description').textContent = translations[lang].movieDetailDescription;
    document.querySelector('.relatedMovies-title').textContent = translations[lang].relatedMoviesTitle;
    document.querySelector('footer').textContent = translations[lang].footer;
    //document.querySelector('.emptyLikedMoviesText').textContent = translations[lang].emptyText
  }
  
  export default updateLanguages
 
  