import {
  Login,
  NotFound,
  Dashboard,
  ArticleEdit,
  ArticleList,
  ArticleDrag,
  Settings
} from '../views'
export const mainRoutes = [{
  pathName:'/login',
  component:Login
},{
  pathName:'/404',
  component:NotFound
}];

export const adminRoutes = [
  {
    pathName:'/admin/dashboard',
    component:Dashboard,
    isNav:true,
    title:'仪表盘',
    icon:'dashboard'
  },
  {
    pathName:'/admin/article',
    component:ArticleList,
    exact: true,
    isNav:true,
    title:'文章列表',
    icon:'unordered-list'
  },
  {
    pathName:'/admin/article/edit/:id',
    component: ArticleEdit
  },
  {
    pathName:'/admin/dragArticle',
    component: ArticleDrag,
    exact:true,
    isNav:true,
    title:'拖住文章',
    icon:'drag'
  },
  {
    pathName:'/admin/settings',
    component:Settings,
    isNav:true,
    title:'设置',
    icon:'setting'
  },
]