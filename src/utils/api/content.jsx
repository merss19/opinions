import instance from './instance';
import environment from 'environments/environment';

const api = instance({
  baseURL: `${environment.api.content}`,
});

export default {
  getOpinions({ id, count, page }) {
    return api.get(`/models/${id}/opinions?page=${page}&count=${count}`);
  },
  getCategories() {
    return api.get('/categories');
  },
  getPopularModels({ hid }) {
    return api.get(`/categories/${hid}/populars`);
  },
};
