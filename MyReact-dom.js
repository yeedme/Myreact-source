


function render(vdom, container) {
  //vdom : 虚拟dom   container:真实dom的存放位置

  // 创建真实dom ;
  const realDom = createDOm(vdom);

  container.appendChild(realDom);
}

  //将 vdom转化为 真实dom  ;
function createDOm(vdom) {
  let domNode;
  let {props,type}=vdom;

  if(typeof vdom == 'object'){
    console.log("vdom是对象");
    domNode=document.createElement(type);
    updateProps(domNode,{},props);
    let {children}=props;
    if(children){
        updateChildren(children,domNode)
    }
  }
  else if(typeof vdom == 'string' || 'number'){
    domNode=document.createTextNode(vdom)
  }
  // if (typeof vdom == "object") {
  //   const { type, props } = vdom;
  //   dom= document.createElement(type);
  //   //判断 children类型   1 :纯文本  2:数组，数组首位可能是节点 或者是文本
  //   if (typeof props.children === "string" || "number") {
  //     let textDom = document.createTextNode(props.children);
  //     console.log(props.children);
  //     dom.appendChild(textDom);

  //   } else if (
  //     typeof props.children === "array" &&
  //     (typeof props.children[0] === "string" || "number")
  //   ) {
  //     console.log(props.children[0]);
  //     dom.innerText(props.children[0]);
  //   }

  //   if (props) {
  //     updateProps(dom, {}, props);
  //   }
  //   let { children } = props;
  //   // console.log("  let {children}=props",children);
  //   if (children) {
  //     updateChildren(children, dom);
  //   }
  // }else {
  //   dom=document.createTextNode("")
  // }
  return domNode
}

function updateChildren(children,dom){
    if(Array.isArray(children)){
      children.forEach( item => {
        render(item,dom)
      })

    }else {
    render(children,dom)
    }
}

//
function updateProps(dom, oldProps, newProps) {
  for(let key in newProps){

    if( key === 'children' ){     
      continue;
    }else if( key === 'style'){

      let StyleObj=newProps[key];

      for(let  i in StyleObj ){
        dom.style[i]=StyleObj[i];
      }

    }else {
      dom[key]=newProps[key];   
    }
  }


  // for (let key in newProps) {
  //   if (key === 'children') {
  //     continue;
  //   } else if (key == "style") {

  //     //获取style对象 再用for in  进行属性 赋值
  //     let stylyObject = newProps[key];
  //     for (let i in stylyObject) {
  //       dom.style[i] = stylyObject[i]; // 赋予 dom style
  //     }

  //   } else {
  //       console.log(key);
  //       dom[key]=newProps[key]; // 将怕props上面的 属性赋予到 dom 上 。类似 className onclick之类的 
  //   }
  // }

  // if(oldProps){
  //       for(let key in oldProps){
  //               if(!newProps[key]){
  //                       dom[key]=null;
  //               }
  //       }
  // }
}
const reactDom = {
  render,
};

export default reactDom;
