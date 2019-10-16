import axios from 'axios'

const service = axios.create({
  baseURL:"http://rap2api.taobao.org/app/mock/226804"
})

service.interceptors.request.use(config=>{
  // console.log(config);
  config.data = Object.assign({},config.data,{authToken:'wangteng'})
  return config;
})
service.interceptors.response.use(resp=>{
  // console.log(resp);
  if(resp.status === 200) {
    return resp.data
  }else{
    console.log('error')
  }
})
export const getArticles = ({offset=0,limited=10})=> {
  return service.post('/api/artlist',{offset,limited})
}

export const deleteArticle = (id) => {
  return service.post('/api/articleDelete',{id})
}

export const editArticle = (id) => {
  return service.post(`/api/articleEdit/${id}`)
}

export const editArticleSave = (data) => {
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve({
        code:200,
        errMsg:'修改成功'
      })
    },5000)
  })
  
}