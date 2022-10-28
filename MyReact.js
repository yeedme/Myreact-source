import { todoObj, REACT_ELEMENT, REACT_TEXT } from "./untils.js";

function myCreateElement(type, config, children) {
  //
  let key = null;
  let ref = null;
  let $$typeof = REACT_ELEMENT;
  //判断config是否 key ref 。有就删除 便于后面 return
  if (config) {
    key = config.key || null;
    ref = config.ref || null;
    delete config.key;
    delete config.ref;
  }
  //获取config参数 浅拷贝对象 另一个用ES5 (For in )获取config对象属性
  let props = { ...config };

  let childrenLength=arguments.length - 2;
  if(childrenLength==1){ //只有节点
    props.children=children;
  }else if(childrenLength>1){
    props.children = Array.prototype.slice.call(arguments, 2);
  }else{
    console.log("无节点");
  }
 
  return {
    $$typeof,
    key, //唯一标,识
    ref, // Dom 实例
    type, //dom类型  div span ....
    props, // children 节点
  };
}
const react = { myCreateElement };
export default react ;
