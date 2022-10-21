function render(vdom, container) {
  //vdom : 虚拟dom   container:真实dom的存放位置

  // 创建真实dom ;
  const realDom = createDom(vdom);

  container.appendChild(realDom);
}

//将 vdom转化为 真实dom  ;
function createDom(vdom) {
  let domNode;
  let { props, type } = vdom;

  //vdom是对象 说明夸你包含多个 ，也拥有自身的节点
  if (typeof vdom == "object") {
    domNode = document.createElement(type);
    updateProps(domNode, {}, props);
    let { children } = props;
//渲染 子组件
    if (children) {
      updateChildren(children, domNode);
    }
  }
  //判断是否函数组件
  else if (typeof vdom === "function") {
    domNode = renderFunction(vdom);
  }
  //如果是文本就 添加进去当前节点
  else if (typeof vdom == "string" || "number") {
    domNode = document.createTextNode(vdom);
  }
  return domNode;
}

//处理函数组件
//  函数组件会 转化后 function XX(return react.createElement(....)) 这个时候只需要生成一个真实dom
function renderFunction(funVdom) {
  let vdom = funVdom();
  return createDom(vdom);
}

//处理children的虚拟DOM
function updateChildren(children, dom) {
  if (Array.isArray(children)) {
    children.forEach((item) => {
      render(item, dom);
    });
  } else {
    render(children, dom);
  }
}

//更新 props 。包括 style 鼠标 键盘事件
function updateProps(dom, oldProps, newProps) {
  for (let key in newProps) {
    if (key === "children") {
      continue;
    } else if (key === "style") {
      let StyleObj = newProps[key];
// style样式  
      for (let i in StyleObj) {
        dom.style[i] = StyleObj[i];
      }
    } else {
      dom[key] = newProps[key];
    }
  }
}
const reactDom = {
  render,
};

export default reactDom;
