import '@styles/reset.css';
import '@styles/header.scss';
import '@styles/main.scss';

import SearchController from "@controller/searchController";
import FavoritesController from './controller/FavoritesController';

new SearchController();
new FavoritesController();
