import printMe from './print.js';

document.getElementById('app').innerHTML = 'hello world  webpack test 123';



class Bar{}
class Foo{
    get [Symbol.toStringTag](){return 'Bar'}
}

const obj = new Foo()

console.log((new Bar).toString());
console.log(obj.toString())


async function* genAnswers() {
  var stream = [ Promise.resolve(4), Promise.resolve(9), Promise.resolve(12) ];
  var total = 0;
  for await (let val of stream) {
    total += await val;
    yield total;
  }
}

function forEach(ai, fn) {
  return ai.next().then(function (r) {
    if (!r.done) {
      fn(r);
      return forEach(ai, fn);
    }
  });
}

var output = 0;
forEach(genAnswers(), function(val) { output += val.value })
.then(function () {
  console.log(output); // 42
});


// function* hwGenerator(){
//   yield 'hello';
//   yield 'world';
//   return 'ending';
// }
// var hw = hwGenerator();
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());
// console.log(hw.next());

// function* f(){
//   console.log('执行了');
// }
// var generator = f();

// setTimeout(()=>{
//   generator.next();
// },5000);
// var arr =[1,[[2,3],4],5,[6,7],[[8,9,0,[11,12],13],14]];

// var flat = function* (a){
//   var length = a.length;
//   for(let i=0;i<length;i++){
//     var item = a[i];
//     if(typeof item != 'number'){
//       yield* flat(item)
//     }else{
//       yield item
//     }
//   }
// }
// for(var f of flat(arr)){
//   console.log(f);
// }

function wrapper(generatorFunction){
  return function(...args){
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  }
}

const wrappered = wrapper(function* (){
  console.log(`First input: ${yield}`);
  return 'DONE'
});

wrappered().next('wangteng');

  if(module.hot){
      module.hot.accept('./print.js',function(){
        console.log('Accepting the updated printMe module!');
        printMe();
      })
  }
