class BinarySearchTree {
    constructor () {
        this.root = null
    }

    Node (key) {
        return {
            key,
            left: null,
            right: null
        }
    }

    insert (key) {
        const node = this.Node(key)
        if (!this.root) {
            this.root = node
        } else {
            this.insertNode(this.root, node)
        }
    }

    insertNode (node, newNode) {
        if (newNode.key < node.key) {
            if (!node.left) {
                node.left = newNode
            } else {
                this.insertNode(node.left, newNode)
            }
        } else {
            if (!node.right) {
                node.right = newNode
            } else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    inOrderTraverse (callback) {
        this.inOrderTraverseNode(this.root, callback)
    }

    inOrderTraverseNode (node, callback) {
        if (!node) {
            this.inOrderTraverseNode(node.left, callback)
            callback(node.key)
            this.inOrderTraverseNode(node.right, callback)
        }
    }

    preOrderTraverse (callback) {
        this.preOrderTraverseNode(this.root, callback)
    }

    preOrderTraverseNode (node, callback) {
        if (!node) {
            callback(node.key)
            this.preOrderTraverseNode(node.left, callback)
            this.preOrderTraverseNode(node.right, callback)
        }
    }

    postOrderTraverse (callback) {
        this.postOrderTraverseNode(this.root, callback)
    }

    postOrderTraverseNode (node, callback) {
        if (!node) {
            this.postOrderTraverseNode(node.left, callback)
            this.postOrderTraverseNode(node.right, callback)
            callback(node.key)
        }
    }

    min () {
        return this.minNode(this.root)
    }

    minNode (node) {
        if (node) {
            while (node && node.left) {
                node = node.left
            }
            return node.key
        }
        return null
    }

    max () {
        return this.maxNode(this.root)
    }

    maxNode (node) {
        if (node) {
            while(node && node.right) {
                node = node.right
            }
            return node.key
        }
        return null
    }

    search (key) {
        this.searchNode(this.root, key)
    }

    searchNode (node, key) {
        if (!node) return false

        if (node.key > key) {
            this.searchNode(node.left, key)
        } else if (node.key > key) {
            this.search(node.right, key)
        } else {
            console.log(`成功找到`)
            return true
        }
    }

    invertTree (node = this.root) {
        if (!node) return
        this.invertTree(node.left)
        this.invertTree(node.right)
        this.swap(node)
    }

    swap (node) {
        let temp = node.left
        node.left = node.right
        node.right = temp
    }
}