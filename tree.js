const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const randomArr = (size) => {
    return Array.from({ length: size }, () => Math.floor(Math.random() * 100));
  };

      //Merge function for merging sorted arrays
      function merge(left, right) {
        let array = [];
        while (left.length && right.length) {
          if (left[0] < right[0]) {
            array.push(left.shift());
          } else {
            array.push(right.shift());
          }
        }
        return [...array, ...left, ...right];
      }

      //Merge sort for sorting an array
      function mergeSort(arr) {
        let middle = arr.length / 2;

        if (arr.length < 2) {
          return arr;
        }

        let left = arr.splice(0, middle);

        return merge(mergeSort(left), mergeSort(arr));
      }

      //Remove duplicate elements from an array
      function checkForDupes(arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
      }

      //Node factory for creating tree nodes
      const node = function (data, right = null, left = null) {
        return {
          nodeData: data,
          rightChild: right,
          leftChild: left,
        };
      };

        const tree = (arr) => {
        let root = null; 

      //Build binary search tree from a sorted array
      const buildTree = function(arr) {
        let sortedArr = mergeSort(checkForDupes(arr));
        if(sortedArr.length < 1) return null;

        const rootIndex = parseInt(sortedArr.length / 2);
        const newNode = node(sortedArr[rootIndex]);

        newNode.leftChild = buildTree(sortedArr.slice(0, rootIndex))
        newNode.rightChild = buildTree(sortedArr.slice(rootIndex + 1));

        return newNode;
      };

      if (root === null) {
          root = buildTree(arr)
        }

      const insert = function(item, parentNode = root) {
        if(parentNode === item) return;
        if(parentNode === null) {
          return node(item) 
        }

        if (item < parentNode.nodeData) {
            parentNode.leftChild = insert(item, parentNode.leftChild);
          } else if (item > parentNode.nodeData) {
            parentNode.rightChild = insert(item, parentNode.rightChild);
          }
      
          return parentNode   
      };

        const deleteNode = (currentNode, value) => {
          if (currentNode === null) {
            return null;
          }

          if (value < currentNode.nodeData) {
            currentNode.leftChild = deleteNode(currentNode.leftChild, value);
          } else if (value > currentNode.nodeData) {
            currentNode.rightChild = deleteNode(currentNode.rightChild, value);
          } else {
            if (!currentNode.leftChild) {
              return currentNode.rightChild;
            } else if (!currentNode.rightChild) {
              return currentNode.leftChild;
            }

            let temp = currentNode.rightChild;

            while (temp.leftChild !== null) {
              temp = temp.leftChild;
            }

            currentNode.nodeData = temp.nodeData;
            currentNode.rightChild = deleteNode(currentNode.rightChild, temp.nodeData);
          }

          return currentNode;
        };

    
      const removeItem = function(value, currentNode = root) {
        if (currentNode === null) return currentNode;
        if (currentNode.nodeData === value) {
          return deleteNode(currentNode)
        } 

        if (value < currentNode.nodeData) {
          currentNode.leftChild = removeItem(value, currentNode.leftChild);
        } else {
          currentNode.rightChild = removeItem(value, currentNode.rightChild);
        }
        return currentNode
      }

      const find = function(item, currentNode = root) {
        if (currentNode === null) {
          return "That value doesn't exist in this tree";
        }
        if (item === currentNode.nodeData) {
          return currentNode;
        } else if (item < currentNode.nodeData) {
          return find(item, currentNode.leftChild);
        } else {
          return find(item, currentNode.rightChild);
        }
      }; 

      const levelOrder = (callback, arr = [root], result = []) => {
        if (arr.length === 0) return result;
        const queue = [];
        for (const node of arr) {
          if (callback) {
            callback(node.nodeData);
          } else {
            result.push(node.nodeData)
          }
          if (node.leftChild) {
            queue.push(node.leftChild);
          }
          if (node.rightChild) {
            queue.push(node.rightChild);
          }
        }
        return levelOrder(callback, queue, result);
      }

      const inOrder = (callback, currentNode = root, result =[]) => {
        if (currentNode === null) return;
       
        inOrder(callback, currentNode.leftChild, result);

        if (callback) {
          callback(currentNode.nodeData);
        } else {
          result.push(currentNode.nodeData);
        }

        inOrder(callback, currentNode.rightChild, result);

        if(result.length > 0) return result;
      }

      const preOrder = (callback, currentNode = root, result = []) => {
        if (currentNode === null) return; 
        if (callback) {
          callback(currentNode.nodeData);
        } else {
          result.push(currentNode.nodeData);
        }

        preOrder(callback, currentNode.leftChild, result);
        preOrder(callback, currentNode.rightChild, result);

        if (result.length > 0) return result;
      }

      const postOrder = (callback, currentNode = root, result = []) => {
        if (currentNode === null) return; 

        postOrder(callback, currentNode.leftChild, result);
        postOrder(callback, currentNode.rightChild, result);

        if (callback) {
          callback(currentNode.nodeData);
        } else {
          result.push(currentNode.nodeData);
        }

        if (result.length > 0) return result;
      }

      const height = (currentNode = root) => {
        if (currentNode === null) return 0;

        const leftHeight = height(currentNode.leftChild);
        const rightHeight = height(currentNode.rightChild);
        return Math.max(leftHeight, rightHeight) + 1
      }

      const depth = (nodeValueInput, currentNode = root, edges = 0) => {
        if (currentNode === null) return 'Input value not found';
        if (currentNode.nodeData === nodeValueInput) return edges;
        if (currentNode.nodeData > nodeValueInput) {
            return depth(nodeValueInput, currentNode.leftChild, edges + 1);
        } else {
            return depth(nodeValueInput, currentNode.rightChild, edges + 1);
        }
      }

      const isBalanced = (currentNode = root) => {
        if (currentNode === null) return true;
        const leftHeight = height(currentNode.leftChild);
        const rightHeight = height(currentNode.rightChild);
        if (leftHeight !== rightHeight) return false;
        else return true
      }

      const rebalance = () => {
        const inOrderList = inOrder()
        root = buildTree(inOrderList)
      }
        
      const prettyPrint = (node = root, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if (node.rightChild !== null) {
          prettyPrint(
            node.rightChild,
            `${prefix}${isLeft ? "│   " : "    "}`,
            false
          );
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.nodeData}`);
        if (node.leftChild !== null) {
          prettyPrint(
            node.leftChild,
            `${prefix}${isLeft ? "    " : "│   "}`,
            true
          );
        }
      };

        return {
          buildTree, 
          insert, 
          removeItem, 
          find, 
          levelOrder,
          inOrder, 
          preOrder,
          postOrder,
          height, 
          depth, 
          isBalanced,
          rebalance,
          prettyPrint
      };
    }

      const treeRoot = tree(randomArr(143));
      treeRoot.insert(50);
      treeRoot.prettyPrint();
      treeRoot.removeItem(67);
      treeRoot.prettyPrint();
      console.log("Find:", treeRoot.find(23));
      console.log("Level Order:", treeRoot.levelOrder());
      console.log("In Order:", treeRoot.inOrder());
      console.log("Pre Order:", treeRoot.preOrder());
      console.log("Post Order:", treeRoot.postOrder());
      console.log("Height:", treeRoot.height());
      console.log("Depth:", treeRoot.depth(29));
      console.log("Is the tree balanced?", treeRoot.isBalanced());
      console.log("Rebalancing it...", treeRoot.rebalance());
      console.log("Is the tree balanced?", treeRoot.isBalanced());

