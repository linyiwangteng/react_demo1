import printMe from './print.js'

document.getElementById('app').innerHTML = 'hello world  webpack test 123';



class Bar{}
class Foo{
    get [Symbol.toStringTag](){return 'Bar'}
}

const obj = new Foo()

console.log((new Bar).toString());
console.log(obj.toString())

function ceshi(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>{
            resolve('ceshi');
        },3000);
    })
}

ceshi().then(function(param){
    console.log(param);
})










  if(module.hot){
      module.hot.accept('./print.js',function(){
        console.log('Accepting the updated printMe module!');
        printMe();
      })
  }

