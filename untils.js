const REACT_ELEMENT = Symbol("react.element");
const REACT_TEXT = Symbol("react.text");
// 判断children 是文本（字符串） 或是节点 
function todoObj(element) {
  return element === Number || element === String
    ? { type: REACT_ELEMENT, content: element }
    : { type: REACT_TEXT ,content:element};
}
export {todoObj}
