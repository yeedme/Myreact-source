import { Children } from "react";
import { REACT_ELEMENT, REACT_TEXT } from "./untils";

function render(vdom, container) {
  //vdom : 虚拟dom container:真实dom的存放位置
  const realDom = createDOm(vdom);
  container.appendChild(realDom);
}

function createDOm(vdom) {
  //将 vdom转化为 真是dom  ;
  const { type, props } = vdom;
  console.log(vdom);
  let dom;
  // 将dom创建完毕
  if (type == REACT_TEXT) {
    dom = document.createTextNode(type);
    console.log(dom);
  } else {
    dom = document.createElement(type);
     dom.innerText=(props.children.content);
     console.log(props.children.content);
  }
  if (props) {
    updateProps(dom, {}, props);
  }
  return dom
}

//
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === 'children') {
      continue;
    } else if (key == "style") {

      //获取style对象 再用for in  进行属性 赋值
      let stylyObject = newProps[key];
      for (let i in stylyObject) {
        dom.style[i] = stylyObject[i]; // 赋予 dom style
      }

    } else {
        console.log(key);
        dom[key]=newProps[key]; // 将怕props上面的 属性赋予到 dom 上 。类似 className onclick之类的 
    }
  }

  if(oldProps){
        for(let key in oldProps){
                if(!newProps[key]){
                        dom[key]=null;
                }
        }
  }
}
const reactDom = {
  render,
};

export default reactDom;
