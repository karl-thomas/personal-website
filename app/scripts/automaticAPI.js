import axios from 'axios';

const writtenAPI = ({ BASE, NODE_ENV, AUTO_BLOG_URL }) => {
  const API = {
    headers: {
      Authorization: `Basic ${BASE}`
    },

    externalUrl(searchTerms) {
      return NODE_ENV === 'development'
        ? `http://localhost:8080/${searchTerms}`
        : `http://${AUTO_BLOG_URL}/${searchTerms}`;
    },

    Server: {
      Posts: {
        all() {
          return axios.get(API.externalUrl('posts'), { headers: this.headers });
        },
        find(id) {
          return axios.get(API.externalUrl(`posts/${id}`, { headers: this.headers }));
        }
      }
    },

    Client: {
      Posts: {
        all() {
          return axios.get('/api/auto/posts');
        },
        find(id) {
          return axios.get(`/api/auto/posts/${id}`);
        }
      }
    }
  };
  return API;
};

export default writtenAPI;
