import {todoObj} from "./untils.js";
function myCreateElement(type, config, children) {
  //
  let key = null;
  let ref = null;
  let $$typeof = null;

  //判断config是否 key ref 。有就删除 便于后面 return
  if (config) {
    key = config.key;
    ref = config.ref;
    delete config.key;
    delete config.ref;
  }

  //获取config参数 浅拷贝对象 另一个用ES5 (For in )获取config对象属性
  let props = { ...config };
  if (config) {
    // arguments-2 就是减type confi
    let childrenLength = arguments.length - 2;
    // 分析children长度
    if (childrenLength == 1) {
      props.children = todoObj(children);   //todoObj 用于确认children类型 
    } else if (childrenLength > 1) {
      //aruments 是数组从 0开始
      props.children = Array.prototype.slice.call(arguments, 2).map(todoObj); /// 可以解读为 map(funciton(elemtent)=>{ retrun .... } )
    }
  }

  return {
    $$typeof: "",
    key, //唯一标,识
    ref, // Dom 实例
    type, //H5类型  div span ....
    props, // children 节点
  };
}
const react={myCreateElement}
export {react};
