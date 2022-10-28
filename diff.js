function diff(oldTree, newTree) {
  diffNode(oldtree, newTree);
}



function diffNode(oldTree, newTree) {
  let patches=[];//收集差异化 一网打尽。


  if (oldTree.type !== newTree.type) {
    //这里说明节点类型不一致 直接替换；
    patches.push({
      type:'replace',//type代表执行的 操作类型的


    })
  } else if ((oldTree.$$typeof = "Text")) {
    //判断这个节点 是否文本节点
    if (oldTree.innerText !== newTree.innerText) {
      //是文本节点 但内容不一样 就直接替换
      oldTree.innerText = newTree.innerText;
    }
  } else if (oldTree.$$typeof == "reactElement") {
    //更新 props; props包括 children 事件 和样式；
    diffProps(oldTree,newTree);
    diffChildren(oldTree,newTree)
  }
}


//判断子节点是否变化
function diffChildren(oldTree, newTree) {
  let oldChild=getKeys(oldTree);
  let newChild=getKeys(newTree);
  let lastIndex=0;
  for ( let k in newChild){
    //这一步的目的是 newChild[k] 和oldChild[k] 说明节点一样
    if(oldChild[k]){
      diffNode(oldChild[k],newChild[k]);
      if(lastIndex > oldChild[k].index){
          //当前节点小于前一位 说明节点位置发送变化 这里处理的问题是 相同节点的复用。只是他们的位置变化了 但是仍然可以服用
      }else{
        lastIndex=oldChild[k].index;
      }
    } else {
      // newChild[k]是新增的。
    // console.log(newChild[k],'是新增的');
    }
  }
  for (let k in oldChild){
    if(!newChild[k]){
      //这说明 newChild不在
    }
  }
}

//返回一个以 Key开头 对象为value的
function getKeys(children){
    let keys={};
    children.forEach( (element,index) => {
        let key=element["key"];
        keys=key?key:index;//有key 则用Key没用则用index
        keys[key]=element;
        keys[key].index=index; //用于确认 节点顺序
    });
    return keys;
}

//但
function diffProps(newProps = {}, oldProps = {}) {
  for (let key in newProps) {
    //原先写法是 newProps[key] 有可能 oldProps[key]值就是 undefined 不够严谨
    if (key in oldProps) {
      console.log(key, "新增");
    } else if (oldProps[key] != newProps[key]) {
      console.log(key, "有变化");
      //有一种情况就是 props的值 也是对象类型 
    } else if (typeof newProps[key] === "object") {
      diffProps(newProps[key], oldProps[key]);
    }
  }
  //判断   哪些被删除
  for (let key in oldProps) {
    if (!(key in newProps)) {
      console.log(key, "被删除");
    }
  }
}
function updateCmp(oldCmp,newCmp){
  oldCmp.cmp.updater(newCmp.newProps,newCmp.state)
}

export default diff;
