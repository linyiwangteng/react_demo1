// export {default as Login} from './Login'
// export {default as NotFound} from './NotFound'
// export {default as Dashboard} from './Dashboard'
// export {default as ArticleList} from './Article'
// export {default as ArticleEdit} from './Article/edit'
// export {default as Settings} from './Settings'

import Loadable from 'react-loadable';
import Loading from '../components/Loading';
 
const Login = Loadable({
  loader: () => import('./Login'),
  loading: Loading,
});
const NotFound = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading,
});
const Dashboard = Loadable({
  loader: () => import('./Dashboard'),
  loading: Loading,
});
const ArticleList = Loadable({
  loader: () => import('./Article'),
  loading: Loading,
});
const ArticleEdit = Loadable({
  loader: () => import('./Article/edit'),
  loading: Loading,
});
const ArticleDrag = Loadable({
  loader: () => import('./Article/drag'),
  loading:Loading,
})
const Settings = Loadable({
  loader: () => import('./Settings'),
  loading: Loading,
});
 
export {
  Login,
  NotFound,
  Dashboard,
  ArticleList,
  ArticleEdit,
  ArticleDrag,
  Settings
};

