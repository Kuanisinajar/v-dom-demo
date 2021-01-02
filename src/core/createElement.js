 export default (tagName, options) => {
  return {
    tagName,
    attrs: options.attrs,
    children: options.children
  }
 }