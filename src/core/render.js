 export default function render(vNode) {
   // create actual element
  const $el = document.createElement(vNode.tagName);

  // append attributes
  const attrs = Object.entries(vNode.attrs);

  attrs.forEach(([key, value]) => {
    $el.setAttribute(key, value)
  })

  // append childs
  const { children } = vNode;
  
  if (children && children.length) {
    children.forEach((childVNode) => {
      const $child = render(childVNode);

      $el.appendChild($child);
    })
  }
  
  return $el
 }