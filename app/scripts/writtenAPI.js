import axios from 'axios';
import secrets from './secret';

const { GHOST_ID, GHOST_ADDRESS, GHOST_SECRET } = secrets;

const API = {
  auth: `?client_id=${GHOST_ID}&client_secret=${GHOST_SECRET}`,
  defaultParams: '&include=tags',
  url(searchTerms) {
    return `http://${GHOST_ADDRESS}/ghost/api/v0.1/${searchTerms + this.auth + this.defaultParams}`;
  },
  Posts: {
    all() {
      return axios.get(API.url('posts'));
    },
    find(slug) {
      return axios.get(API.url(`/posts/slug/${slug}`));
    }
  }
};

export default API;
