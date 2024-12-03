import Graph from 'graphology';
import { nanoid } from 'nanoid';

// tree Node
class BSTNode {
  value: number;
  added: boolean = false;
  left: BSTNode | null = null;
  right: BSTNode | null = null;
  id: string | undefined = nanoid();

  constructor(value: number) {
    this.value = value;
  }
}

// build tree
class BinaryST {
  root: BSTNode | null = null;

  build(userInput: number[]): void {
    const length = userInput.length;
    this.root = this.buildBST(userInput, 0, length - 1);
  }

  private buildBST(
    userInput: number[],
    start: number,
    end: number
  ): BSTNode | null {
    if (end < start) {
      return null;
    }

    const mid: number = start + Math.floor((end - start) / 2);
    const Node = new BSTNode(userInput[mid]);
    // console.log(Node.id);

    Node.right = this.buildBST(userInput, mid + 1, end);
    Node.left = this.buildBST(userInput, start, mid - 1);

    return Node;
  }

  insert(value: number): void {
    const newNode = new BSTNode(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  private insertNode(root: BSTNode, newNode: BSTNode): void {
    if (root.value >= newNode.value) {
      if (!root.left) {
        root.left = newNode;
        Context.graph.addNode(newNode.id, {
          label: newNode.value,
          x: Math.random() * 10,
          y: Math.random() * 10,
          color: 'black',
          size: 20,
        });
        Context.graph.addEdge(root.id, newNode.id, {
          size: 4,
          color: 'blue',
        });
        newNode.added = true;
      } else {
        this.insertNode(root.left, newNode);
      }
    } else if (root.value < newNode.value) {
      if (!root.right) {
        root.right = newNode;
        Context.graph.addNode(newNode.id, {
          label: newNode.value,
          x: Math.random() * 10,
          y: Math.random() * 10,
          color: 'black',
          size: 20,
        });
        Context.graph.addEdge(root.id, newNode.id, {
          size: 4,
          color: 'red',
        });
        newNode.added = true;
      } else {
        this.insertNode(root.right, newNode);
      }
    }
  }

  // i want to print the tree with inorder travelsals
  printTreeInorder(): void {
    if (this.root) {
      this.printTree(this.root);
    }
  }

  private printTree(root: BSTNode | null): void {
    if (!root) {
      return;
    }

    if (!root.added) {
      Context.graph.addNode(root.id, {
        label: root.value,
        x: 0,
        y: 0,
        color: 'red',
        size: 20,
      });

      root.added = true;
    }

    if (root.right && !root.right.added) {
      Context.graph.addNode(root.right.id, {
        label: root.right.value,
        x: Math.random() * 10,
        y: Math.random() * 10,
        color: 'black',
        size: 20,
      });
      Context.graph.addEdge(root.id, root.right.id, {
        size: 4,
        color: 'red',
      });

      root.right.added = true;
    }

    if (root.left && !root.left.added) {
      Context.graph.addNode(root.left.id, {
        label: root.left.value,
        x: Math.random() * 10,
        y: Math.random() * 10,
        color: 'black',
        size: 20,
      });
      Context.graph.addEdge(root.id, root.left.id, {
        size: 4,
        color: 'blue',
      });

      root.left.added = true;
    }

    this.printTree(root.left);
    this.printTree(root.right);
  }

  // find value in tree
  findValue(key: number): string[] {
    const path: string[] = [];
    this.find(this.root, key, path);
    return path;
  }

  private find(root: BSTNode | null, key: number, path: string[]) {
    if (!root) {
      return;
    }
    path.push(root.id!);
    if (root.value === key) {
      return;
    } else if (root.value! < key) {
      this.find(root.right, key, path);
    } else {
      this.find(root.left, key, path);
    }
  }
}

export default abstract class Context {
  static graph = new Graph();
  static previousInput: number[] = [];
  static tree = new BinaryST();

  static buildTree(sequence: string): void {
    // Process the input
    const userInput = [...sequence.matchAll(/-?\d+(\.\d+)?/g)]
      .map((value) => parseFloat(value[0]))
      .filter((value) => !Number.isNaN(value));

    if (userInput.length === 0) {
      return;
    }

    userInput.sort((a, b) => a - b);

    let shouldRebuild = false;

    // Always rebuild when we nothing to begin with.
    if (Context.previousInput.length === 0) {
      shouldRebuild = true;
    }

    // If the basic check above does not change, try go through to see if the new input
    // does not change the original input.
    if (!shouldRebuild) {
      for (let i = 0; i < Context.previousInput.length; i++) {
        if (Context.previousInput[i] !== userInput[i]) {
          shouldRebuild = true;
          break;
        }
      }
    }

    // Another check to let user rebuild if they wanted to force rebuild the tree.
    if (Context.previousInput.length === userInput.length) {
      shouldRebuild = true;
    }

    // The actual building stuff
    if (!shouldRebuild) {
      const newNode = userInput.filter(
        (node) => !Context.previousInput.includes(node)
      );
      newNode.forEach((node) => Context.tree.insert(node));
    } else {
      Context.graph.clear();
      Context.tree = new BinaryST();
      Context.tree.build(userInput);
      Context.tree.printTreeInorder();
    }

    Context.previousInput = userInput;

    // Reset graph first.
    // Context.graph.clear();

    // Implementation of Buildtree method
    // Context.tree = new BinaryST();
    // Context.tree.build(userInput);

    // root.insert(10);
    // Context.tree.printTreeInorder();
    // Context.tree.insert(100000000);
  }
}