document.getElementById('other').innerHTML = 'this is other file 这次添加了监听器';

var func = str => {
    console.log(str);
  };
  func('我现在在使用Babel!');

  class item {
    constructor (value,pre = null,next = null) {
      this.value = value,
      this.next = next
    }

    get hasNext() { return !!this.next }
  }

  class Foo {
     static [Symbol.hasInstance] (obj){
       console.log(obj)

       return true
     }
  }

  console.log({} instanceof Foo);


  const re  = /foo/
  re[Symbol.match] = function(str){
    console.log(`正则表达式检测的字符串：${str}`);
    if(str){
      return true
    }
  }
  console.log( 'bar'.match(re))

  class Foo2{
    get [Symbol.toStringTag](){
      return 'Foo'
    }
  }
  
  const ff = new Foo();
  const fff = new Foo2();

  console.log(ff.toString())
  console.log(fff.toString())

  let arr = [1,2,3,4]
  console.log(arr.toString())