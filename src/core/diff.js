import zip from 'lodash/zip';
import render from './render';

function diffAttr(vOldAttrs, vNewAttrs) {
  const vOldAttrEntries = Object.entries(vOldAttrs);
  const vNewAttrEntries = Object.entries(vNewAttrs);

  const patches = [];

  vNewAttrEntries.forEach(([key, value]) => {
    const patch = ($node) => {
      $node.setAttribute(key, value)

      return $node
    }

    patches.push(patch)
  })

  vOldAttrEntries.forEach(([key, value]) => {
    if (!(key in vNewAttrs)) {
      const patch = ($node) => {
        $node.removeAttribute(key)
  
        return $node
      }
  
      patches.push(patch)
    }
  })

  return ($node) => {
    patches.forEach((patch) => {
      patch($node)
    })
  }
}

function diffChildren(vOldChildren, vNewChildren) {
  const patches = [];
  const newNodePatches = [];
  const zippedChildren = zip(vOldChildren, vNewChildren);

  zippedChildren.forEach(([vOldChild, vNewChild]) => {
    if (!vOldChild) {
      const vNewChildNode = render(vNewChild);

      const patch = ($node) => {
        $node.appendChild(vNewChildNode)

        return $node
      }

      newNodePatches.push(patch);
    }

    const childrenPatch = diff(vOldChild, vNewChild);

    patches.push(childrenPatch)
  })

  return ($parentNode) => {
    const zippedPairs = zip(patches, $parentNode.childNodes);

    zippedPairs.forEach(([patch, childNode]) => {
      patch(childNode)
    })

    newNodePatches.forEach((patch) => {
      patch($parentNode)
    })

    return $parentNode
  }
}

export default function diff(vOldNode, vNewNode) {
  // 沒有 new node 的話可以直接移除
  if (!vNewNode) {
    return ($node) => {
      $node.remove();

      return undefined
    }
  }

  // 其中一個是 text node 的情況
  if (typeof vOldNode === 'string' || typeof vNewNode === 'string') {
    if (vOldNode !== vNewNode) {
      return ($node) => {
        const $newNode = render(vNewNode);

        $node.replaceWith($newNode);

        return $newNode
      }
    } else {
      return ($node) => undefined
    }
  }

  // tag name 不一樣的話，就可以直接替換
  if (vOldNode.tagName !== vNewNode.tagName) {
    return ($node) => {
      const $newNode = render(vNewNode);

      $node.replaceWith($newNode);

      return $newNode
    }
  }

  const patchAttrs = diffAttr(vOldNode.attrs, vNewNode.attrs);
  const patchChildren = diffChildren(vOldNode.children, vNewNode.children);

  return ($node) => {
    patchAttrs($node);
    patchChildren($node);
  }
}