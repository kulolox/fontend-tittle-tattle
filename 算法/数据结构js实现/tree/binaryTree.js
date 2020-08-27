/**
 * 二叉查找树
 */
function BinaryTree() {
  // 构造结点
  const Node = function (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  };
  let root = null;
  // 插入结点
  const insertNode = function (node, newNode) {
    if (newNode.val < node.val) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        insertNode(node.right, newNode);
      }
    }
  };

  // 暴露到外部
  this.insert = function (val) {
    const node = new Node(val);
    if (root === null) {
      root = node;
    } else {
      insertNode(root, node);
    }
  };

  // 前序遍历
  const traverNodesDLR = function (node, callback) {
    if (node !== null) {
      callback(node.val);
      traverNodesDLR(node.left, callback);
      traverNodesDLR(node.right, callback);
    }
  };

  this.DLR = function (callback) {
    traverNodesDLR(root, callback);
  };

  // 后续遍历
  const traverNodesLRD = function (node, callback) {
    if (node !== null) {
      traverNodesLRD(node.left, callback);
      traverNodesLRD(node.right, callback);
      callback(node.val);
    }
  };

  this.LRD = function (callback) {
    traverNodesLRD(root, callback);
  };

  // 中序遍历
  const traverNodesLDR = function (node, callback) {
    if (node !== null) {
      traverNodesLDR(node.left, callback);
      callback(node.val);
      traverNodesLDR(node.right, callback);
    }
  };

  this.LDR = function (callback) {
    traverNodesLDR(root, callback);
  };

  // 最大值
  const traverNodesRight = function (node, callback) {
    if (node !== null) {
      if (node.right !== null) {
        traverNodesRight(node.right, callback);
      } else {
        callback(node.val);
      }
    } else {
      throw new TypeError('空二叉树');
    }
  };

  this.getMaxValue = function (callback) {
    traverNodesRight(root, callback);
  };

  // 最小值
  const traverNodesLeft = function (node, callback) {
    if (node !== null) {
      if (node.left !== null) {
        traverNodesLeft(node.left, callback);
      } else {
        callback(node.val);
      }
    } else {
      throw new TypeError('空二叉树');
    }
  };

  this.getMinValue = function (callback) {
    traverNodesLeft(root, callback);
  };

  // 值是否存在于树中
  const traverNode = function (node, val) {
    if (node === null) {
      return false;
    }
    if (node.val < val) {
      return traverNode(node.right, val);
    } else if (node.val > val) {
      return traverNode(node.left, val);
    } else {
      return true;
    }
  };

  this.isExitInTree = function (val) {
    return traverNode(root, val);
  };

  // 查找最下结点
  const getMinNode = function (node) {
    if (node !== null) {
      if (node.left !== null) {
        return getMinNode(node.left);
      } else {
        return node;
      }
    }
  };

  // 删除结点
  const removeNode = function (node, val) {
    // 空树直接退出
    if (node === null) {
      return null;
    }
    if (node.val > val) {
      // 要删除结点在左子树
      node.left = removeNode(node.left, val);
      return node;
    } else if (node.val < val) {
      // 要删除结点在右子树
      node.right = removeNode(node.right, val);
      return node;
    } else {
      // 找到要删除的结点
      // 要删除结点没有子节点
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }
      // 要删除结点没有左子节点
      if (node.left === null) {
        node = node.right; // 直接将右子结点复制为当前结点
        return node;
      }
      // 要删除结点没有右子节点
      if (node.right === null) {
        node = node.left; // 直接将左子结点复制为当前结点
        return node;
      }
      // 要删除结点有两个子结点
      const minNode = getMinNode(node.right); // 找到它有子树的最小值
      node.val = minNode.val; // 该最小值复制到当前结点，删除该最小结点
      node.right = removeNode(node.right, minNode.val);
      return node;
    }
  };

  this.deleteNode = function (val) {
    removeNode(root, val);
  };
}

var nodes = [6, 2, 3, 4, 9, 8, 7, 12, 1, 22];
var binaryTree = new BinaryTree();
nodes.forEach(function (key) {
  binaryTree.insert(key);
});
