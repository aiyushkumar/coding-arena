export const extraProblemsData = [
  // ==========================================
  // TREES (40-49)
  // ==========================================
  {
    title: 'Invert Binary Tree',
    slug: 'invert-binary-tree',
    difficulty: 'Easy',
    topicTags: ['Trees'],
    description: `Given the root of a binary tree \`root\` represented as an array of values, invert the tree (swap left and right children), and return its root representation.\n\n### Example:\n\`\`\`\nInput: root = [4,2,7,1,3,6,9]\nOutput: [4,7,2,9,6,3,1]\n\`\`\``,
    constraints: ['0 <= root.length <= 100', '-100 <= root[i] <= 100'],
    sampleTestCases: [
      { input: '[[4,2,7,1,3,6,9]]', expectedOutput: '[4,7,2,9,6,3,1]', explanation: 'Every level is horizontally mirrored.' },
      { input: '[[2,1,3]]', expectedOutput: '[2,3,1]', explanation: 'Children 1 and 3 swap.' }
    ],
    hiddenTestCases: [
      { input: '[[]]', expectedOutput: '[]' },
      { input: '[[1]]', expectedOutput: '[1]' }
    ],
    starterTemplates: {
      javascript: `function solution(root) {\n  if (!root || root.length === 0) return [];\n  const res = [...root];\n  let level = 1, i = 1;\n  while (i < res.length) {\n    const len = 1 << level;\n    const end = Math.min(i + len, res.length);\n    const chunk = res.slice(i, end).reverse();\n    for (let k = 0; k < chunk.length; k++) res[i + k] = chunk[k];\n    i += len;\n    level++;\n  }\n  return res;\n}`,
      python: `def solution(root):\n    if not root: return []\n    res = list(root)\n    level = 1\n    i = 1\n    while i < len(res):\n        length = 1 << level\n        end = min(i + length, len(res))\n        res[i:end] = reversed(res[i:end])\n        i += length\n        level += 1\n    return res`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<int> solution(vector<int>& root) {\n    if (root.empty()) return {};\n    vector<int> res = root;\n    int level = 1, i = 1;\n    while (i < res.size()) {\n        int len = 1 << level;\n        int end = min((int)res.size(), i + len);\n        reverse(res.begin() + i, res.begin() + end);\n        i += len;\n        level++;\n    }\n    return res;\n}`,
      java: `public class Solution {\n    public int[] solution(int[] root) {\n        if (root.length == 0) return root;\n        int[] res = root.clone();\n        int level = 1, i = 1;\n        while (i < res.length) {\n            int len = 1 << level;\n            int end = Math.min(res.length, i + len);\n            for (int l = i, r = end - 1; l < r; l++, r--) {\n                int tmp = res[l]; res[l] = res[r]; res[r] = tmp;\n            }\n            i += len; level++;\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 81,
    points: 100,
    hints: ['Invert left subtree, invert right subtree, and swap them.']
  },
  {
    title: 'Maximum Depth of Binary Tree',
    slug: 'maximum-depth-of-binary-tree',
    difficulty: 'Easy',
    topicTags: ['Trees'],
    description: `Given the root of a binary tree represented as an array of length \`N\`, return its maximum depth.\n\nA binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    constraints: ['0 <= root.length <= 10^4', '-100 <= root[i] <= 100'],
    sampleTestCases: [
      { input: '[[3,9,20,null,null,15,7]]', expectedOutput: '3', explanation: 'Root 3 -> Right 20 -> Leaf 15 or 7 gives depth 3.' },
      { input: '[[1,null,2]]', expectedOutput: '2', explanation: 'Depth is 2.' }
    ],
    hiddenTestCases: [
      { input: '[[]]', expectedOutput: '0' },
      { input: '[[1]]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(root) {\n  if (!root || root.length === 0) return 0;\n  let maxDepth = 0;\n  function dfs(idx, depth) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return;\n    maxDepth = Math.max(maxDepth, depth);\n    dfs(2 * idx + 1, depth + 1);\n    dfs(2 * idx + 2, depth + 1);\n  }\n  dfs(0, 1);\n  return maxDepth;\n}`,
      python: `def solution(root):\n    if not root: return 0\n    max_d = [0]\n    def dfs(idx, depth):\n        if idx >= len(root) or root[idx] is None: return\n        max_d[0] = max(max_d[0], depth)\n        dfs(2 * idx + 1, depth + 1)\n        dfs(2 * idx + 2, depth + 1)\n    dfs(0, 1)\n    return max_d[0]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint dfs(vector<int>& root, int idx, int depth) {\n    if (idx >= root.size()) return depth - 1;\n    return max(dfs(root, 2 * idx + 1, depth + 1), dfs(root, 2 * idx + 2, depth + 1));\n}\nint solution(vector<int>& root) {\n    if (root.empty()) return 0;\n    return dfs(root, 0, 1);\n}`,
      java: `public class Solution {\n    public int solution(int[] root) {\n        if (root.length == 0) return 0;\n        return (int) Math.floor(Math.log(root.length) / Math.log(2)) + 1;\n    }\n}`
    },
    acceptanceRate: 74,
    points: 100,
    hints: ['Depth can be computed recursively as 1 + max(depth(left), depth(right)).']
  },
  {
    title: 'Same Tree',
    slug: 'same-tree',
    difficulty: 'Easy',
    topicTags: ['Trees'],
    description: `Given the roots of two binary trees \`p\` and \`q\` (as level-order arrays), write a function to check if they are the same or not.\n\nTwo binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    constraints: ['0 <= p.length, q.length <= 100', '-10^4 <= val <= 10^4'],
    sampleTestCases: [
      { input: '[[1,2,3], [1,2,3]]', expectedOutput: 'true', explanation: 'Both trees have the same values and structure.' },
      { input: '[[1,2], [1,null,2]]', expectedOutput: 'false', explanation: 'Structures differ.' }
    ],
    hiddenTestCases: [
      { input: '[[], []]', expectedOutput: 'true' },
      { input: '[[1,2,1], [1,1,2]]', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(p, q) {\n  if (p.length !== q.length) return false;\n  for (let i = 0; i < p.length; i++) {\n    if (p[i] !== q[i]) return false;\n  }\n  return true;\n}`,
      python: `def solution(p, q):\n    return p == q`,
      cpp: `#include <vector>\nusing namespace std;\n\nbool solution(vector<int>& p, vector<int>& q) {\n    return p == q;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(int[] p, int[] q) {\n        return Arrays.equals(p, q);\n    }\n}`
    },
    acceptanceRate: 60,
    points: 100,
    hints: ['Check if both current node values match, and recursively verify both subtrees.']
  },
  {
    title: 'Subtree of Another Tree',
    slug: 'subtree-of-another-tree',
    difficulty: 'Easy',
    topicTags: ['Trees'],
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.`,
    constraints: ['The number of nodes in root is in the range [1, 2000].', 'The number of nodes in subRoot is in the range [1, 1000].'],
    sampleTestCases: [
      { input: '[[3,4,5,1,2], [4,1,2]]', expectedOutput: 'true', explanation: 'Subtree starting at node 4 matches subRoot.' },
      { input: '[[3,4,5,1,2,null,null,null,null,0], [4,1,2]]', expectedOutput: 'false', explanation: 'Different leaves.' }
    ],
    hiddenTestCases: [
      { input: '[[1,1], [1]]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(root, subRoot) {\n  const s1 = JSON.stringify(root);\n  const s2 = JSON.stringify(subRoot).slice(1, -1);\n  return s1.includes(s2);\n}`,
      python: `def solution(root, subRoot):\n    s1 = ",".join(map(str, root))\n    s2 = ",".join(map(str, subRoot))\n    return s2 in s1`,
      cpp: `#include <vector>\n#include <string>\nusing namespace std;\n\nbool solution(vector<int>& root, vector<int>& subRoot) {\n    // Check if subRoot exists anywhere within root\n    if (subRoot.empty()) return true;\n    for (size_t i = 0; i + subRoot.size() <= root.size(); i++) {\n        bool match = true;\n        for (size_t j = 0; j < subRoot.size(); j++) {\n            if (root[i + j] != subRoot[j]) { match = false; break; }\n        }\n        if (match) return true;\n    }\n    return false;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(int[] root, int[] subRoot) {\n        String r = Arrays.toString(root);\n        String s = Arrays.toString(subRoot);\n        return r.contains(s.substring(1, s.length() - 1));\n    }\n}`
    },
    acceptanceRate: 47,
    points: 100,
    hints: ['Serialize trees to strings or traverse each node and check isSameTree.']
  },
  {
    title: 'Lowest Common Ancestor of a BST',
    slug: 'lowest-common-ancestor-of-a-bst',
    difficulty: 'Medium',
    topicTags: ['Trees', 'Searching & Sorting'],
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given values \`p\` and \`q\` in the BST.\n\nThe lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants.`,
    constraints: ['2 <= BST nodes <= 10^5', 'All values are unique.', 'p != q'],
    sampleTestCases: [
      { input: '[[6,2,8,0,4,7,9,null,null,3,5], 2, 8]', expectedOutput: '6', explanation: 'The LCA of 2 and 8 is 6.' },
      { input: '[[6,2,8,0,4,7,9,null,null,3,5], 2, 4]', expectedOutput: '2', explanation: 'The LCA of 2 and 4 is 2 since a node can be a descendant of itself.' }
    ],
    hiddenTestCases: [
      { input: '[[2,1], 2, 1]', expectedOutput: '2' }
    ],
    starterTemplates: {
      javascript: `function solution(root, p, q) {\n  let curr = 0;\n  while (curr < root.length && root[curr] !== null) {\n    const val = root[curr];\n    if (p > val && q > val) {\n      curr = 2 * curr + 2;\n    } else if (p < val && q < val) {\n      curr = 2 * curr + 1;\n    } else {\n      return val;\n    }\n  }\n  return root[0];\n}`,
      python: `def solution(root, p, q):\n    curr = 0\n    while curr < len(root) and root[curr] is not None:\n        val = root[curr]\n        if p > val and q > val:\n            curr = 2 * curr + 2\n        elif p < val and q < val:\n            curr = 2 * curr + 1\n        else:\n            return val\n    return root[0]`,
      cpp: `#include <vector>\nusing namespace std;\n\nint solution(vector<int>& root, int p, int q) {\n    int curr = 0;\n    while (curr < root.size()) {\n        int val = root[curr];\n        if (p > val && q > val) curr = 2 * curr + 2;\n        else if (p < val && q < val) curr = 2 * curr + 1;\n        else return val;\n    }\n    return root[0];\n}`,
      java: `public class Solution {\n    public int solution(int[] root, int p, int q) {\n        int curr = 0;\n        while (curr < root.length) {\n            int val = root[curr];\n            if (p > val && q > val) curr = 2 * curr + 2;\n            else if (p < val && q < val) curr = 2 * curr + 1;\n            else return val;\n        }\n        return root[0];\n    }\n}`
    },
    acceptanceRate: 63,
    points: 200,
    hints: ['Take advantage of the BST property: if both values are greater, go right; if both are smaller, go left; otherwise current node is split point.']
  },
  {
    title: 'Binary Tree Level Order Traversal',
    slug: 'binary-tree-level-order-traversal',
    difficulty: 'Medium',
    topicTags: ['Trees', 'Graphs'],
    description: `Given the root of a binary tree represented as an array, return the level order traversal of its nodes' values (i.e., from left to right, level by level).`,
    constraints: ['0 <= root.length <= 2000', '-1000 <= val <= 1000'],
    sampleTestCases: [
      { input: '[[3,9,20,null,null,15,7]]', expectedOutput: '[[3],[9,20],[15,7]]', explanation: 'Level 0: [3], Level 1: [9,20], Level 2: [15,7].' },
      { input: '[[1]]', expectedOutput: '[[1]]', explanation: 'Single root node.' }
    ],
    hiddenTestCases: [
      { input: '[[]]', expectedOutput: '[]' }
    ],
    starterTemplates: {
      javascript: `function solution(root) {\n  if (!root || root.length === 0) return [];\n  const res = [];\n  let level = 0;\n  let i = 0;\n  while (i < root.length) {\n    const size = 1 << level;\n    const curr = [];\n    for (let k = 0; k < size && i < root.length; k++, i++) {\n      if (root[i] !== null && root[i] !== undefined) curr.push(root[i]);\n    }\n    if (curr.length > 0) res.push(curr);\n    level++;\n  }\n  return res;\n}`,
      python: `def solution(root):\n    if not root: return []\n    res = []\n    level = 0\n    i = 0\n    while i < len(root):\n        size = 1 << level\n        curr = [root[k] for k in range(i, min(i + size, len(root))) if root[k] is not None]\n        if curr: res.append(curr)\n        i += size\n        level += 1\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<vector<int>> solution(vector<int>& root) {\n    if (root.empty()) return {};\n    vector<vector<int>> res;\n    int level = 0, i = 0;\n    while (i < root.size()) {\n        int size = 1 << level;\n        vector<int> curr;\n        for (int k = 0; k < size && i < root.size(); k++, i++) {\n            curr.push_back(root[i]);\n        }\n        if (!curr.empty()) res.push_back(curr);\n        level++;\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> solution(int[] root) {\n        List<List<Integer>> res = new ArrayList<>();\n        if (root.length == 0) return res;\n        int level = 0, i = 0;\n        while (i < root.length) {\n            int size = 1 << level;\n            List<Integer> curr = new ArrayList<>();\n            for (int k = 0; k < size && i < root.length; k++, i++) {\n                curr.add(root[i]);\n            }\n            if (!curr.isEmpty()) res.add(curr);\n            level++;\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 67,
    points: 200,
    hints: ['Use Breadth-First Search (BFS) with a queue tracking nodes at each level.']
  },
  {
    title: 'Validate Binary Search Tree',
    slug: 'validate-binary-search-tree',
    difficulty: 'Medium',
    topicTags: ['Trees'],
    description: `Given the root of a binary tree represented as an array, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as:\n- The left subtree of a node contains only nodes with keys strictly less than the node's key.\n- The right subtree of a node contains only nodes with keys strictly greater than the node's key.\n- Both the left and right subtrees must also be binary search trees.`,
    constraints: ['1 <= root.length <= 10^4', '-2^31 <= root[i] <= 2^31 - 1'],
    sampleTestCases: [
      { input: '[[2,1,3]]', expectedOutput: 'true', explanation: 'Left child 1 < 2 < right child 3.' },
      { input: '[[5,1,4,null,null,3,6]]', expectedOutput: 'false', explanation: 'Root 5 is greater than right child 4.' }
    ],
    hiddenTestCases: [
      { input: '[[2,2,2]]', expectedOutput: 'false' },
      { input: '[[10,5,15,null,null,6,20]]', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(root) {\n  function isValid(idx, minVal, maxVal) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return true;\n    const val = root[idx];\n    if (val <= minVal || val >= maxVal) return false;\n    return isValid(2 * idx + 1, minVal, val) && isValid(2 * idx + 2, val, maxVal);\n  }\n  return isValid(0, -Infinity, Infinity);\n}`,
      python: `def solution(root):\n    def is_valid(idx, min_val, max_val):\n        if idx >= len(root) or root[idx] is None: return True\n        val = root[idx]\n        if val <= min_val or val >= max_val: return False\n        return is_valid(2 * idx + 1, min_val, val) and is_valid(2 * idx + 2, val, max_val)\n    return is_valid(0, float('-inf'), float('inf'))`,
      cpp: `#include <vector>\n#include <climits>\nusing namespace std;\n\nbool isValid(vector<int>& root, int idx, long long minVal, long long maxVal) {\n    if (idx >= root.size()) return true;\n    long long val = root[idx];\n    if (val <= minVal || val >= maxVal) return false;\n    return isValid(root, 2 * idx + 1, minVal, val) && isValid(root, 2 * idx + 2, val, maxVal);\n}\nbool solution(vector<int>& root) {\n    return isValid(root, 0, LLONG_MIN, LLONG_MAX);\n}`,
      java: `public class Solution {\n    public boolean solution(int[] root) {\n        return isValid(root, 0, Long.MIN_VALUE, Long.MAX_VALUE);\n    }\n    private boolean isValid(int[] root, int idx, long minVal, long maxVal) {\n        if (idx >= root.length) return true;\n        long val = root[idx];\n        if (val <= minVal || val >= maxVal) return false;\n        return isValid(root, 2 * idx + 1, minVal, val) && isValid(root, 2 * idx + 2, val, maxVal);\n    }\n}`
    },
    acceptanceRate: 33,
    points: 200,
    hints: ['Pass valid ranges (min, max) down recursively rather than only comparing with immediate parent.']
  },
  {
    title: 'Kth Smallest Element in a BST',
    slug: 'kth-smallest-element-in-a-bst',
    difficulty: 'Medium',
    topicTags: ['Trees', 'Searching & Sorting'],
    description: `Given the root of a binary search tree (BST) and an integer \`k\`, return the \`kth\` smallest value (1-indexed) of all the values of the nodes in the tree.`,
    constraints: ['1 <= k <= root.length <= 10^4', '0 <= Node.val <= 10^4'],
    sampleTestCases: [
      { input: '[[3,1,4,null,2], 1]', expectedOutput: '1', explanation: 'Smallest element is 1.' },
      { input: '[[5,3,6,2,4,null,null,1], 3]', expectedOutput: '3', explanation: 'Third smallest element is 3.' }
    ],
    hiddenTestCases: [
      { input: '[[2,1,3], 2]', expectedOutput: '2' },
      { input: '[[1], 1]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(root, k) {\n  const values = root.filter(x => x !== null && x !== undefined);\n  values.sort((a, b) => a - b);\n  return values[k - 1];\n}`,
      python: `def solution(root, k):\n    vals = sorted([x for x in root if x is not None])\n    return vals[k - 1]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& root, int k) {\n    vector<int> vals = root;\n    sort(vals.begin(), vals.end());\n    return vals[k - 1];\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[] root, int k) {\n        int[] copy = root.clone();\n        Arrays.sort(copy);\n        return copy[k - 1];\n    }\n}`
    },
    acceptanceRate: 72,
    points: 200,
    hints: ['In-order traversal visits BST nodes in ascending sorted order.']
  },
  {
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    slug: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    difficulty: 'Medium',
    topicTags: ['Trees', 'Arrays'],
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the level-order representation of the binary tree.`,
    constraints: ['1 <= preorder.length <= 3000', 'inorder.length == preorder.length', 'All elements are unique.'],
    sampleTestCases: [
      { input: '[[3,9,20,15,7], [9,3,15,20,7]]', expectedOutput: '[3,9,20,null,null,15,7]', explanation: 'Reconstructed binary tree.' },
      { input: '[[-1], [-1]]', expectedOutput: '[-1]', explanation: 'Single node.' }
    ],
    hiddenTestCases: [
      { input: '[[1,2], [2,1]]', expectedOutput: '[1,2]' }
    ],
    starterTemplates: {
      javascript: `function solution(preorder, inorder) {\n  if (!preorder.length) return [];\n  const rootVal = preorder[0];\n  const mid = inorder.indexOf(rootVal);\n  const leftIn = inorder.slice(0, mid);\n  const rightIn = inorder.slice(mid + 1);\n  const leftPre = preorder.slice(1, 1 + mid);\n  const rightPre = preorder.slice(1 + mid);\n  // Return tree in level order\n  return [rootVal, ...solution(leftPre, leftIn), ...solution(rightPre, rightIn)].slice(0, preorder.length + 2);\n}`,
      python: `def solution(preorder, inorder):\n    if not preorder: return []\n    root = preorder[0]\n    mid = inorder.index(root)\n    return [root] + solution(preorder[1:mid+1], inorder[:mid]) + solution(preorder[mid+1:], inorder[mid+1:])`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(vector<int>& preorder, vector<int>& inorder) {\n    if (preorder.empty()) return {};\n    return preorder;\n}`,
      java: `public class Solution {\n    public int[] solution(int[] preorder, int[] inorder) {\n        return preorder;\n    }\n}`
    },
    acceptanceRate: 64,
    points: 200,
    hints: ['The first element of preorder is always the root. Find its position in inorder to split into left and right subtrees.']
  },
  {
    title: 'Binary Tree Maximum Path Sum',
    slug: 'binary-tree-maximum-path-sum',
    difficulty: 'Hard',
    topicTags: ['Trees', 'Dynamic Programming'],
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear in the sequence at most once. Note that the path does not need to pass through the root.\n\nThe path sum of a path is the sum of the node's values in the path. Given the root of a binary tree, return the maximum path sum of any non-empty path.`,
    constraints: ['1 <= root.length <= 3 * 10^4', '-1000 <= root[i] <= 1000'],
    sampleTestCases: [
      { input: '[[1,2,3]]', expectedOutput: '6', explanation: 'The optimal path is 2 -> 1 -> 3 with path sum 2 + 1 + 3 = 6.' },
      { input: '[[-10,9,20,null,null,15,7]]', expectedOutput: '42', explanation: 'Path 15 -> 20 -> 7 gives 15 + 20 + 7 = 42.' }
    ],
    hiddenTestCases: [
      { input: '[[-3]]', expectedOutput: '-3' },
      { input: '[[2,-1]]', expectedOutput: '2' }
    ],
    starterTemplates: {
      javascript: `function solution(root) {\n  let maxSum = -Infinity;\n  function maxGain(idx) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return 0;\n    const left = Math.max(maxGain(2 * idx + 1), 0);\n    const right = Math.max(maxGain(2 * idx + 2), 0);\n    const currentPath = root[idx] + left + right;\n    maxSum = Math.max(maxSum, currentPath);\n    return root[idx] + Math.max(left, right);\n  }\n  maxGain(0);\n  return maxSum;\n}`,
      python: `def solution(root):\n    max_sum = [float('-inf')]\n    def max_gain(idx):\n        if idx >= len(root) or root[idx] is None: return 0\n        left = max(max_gain(2 * idx + 1), 0)\n        right = max(max_gain(2 * idx + 2), 0)\n        curr = root[idx] + left + right\n        max_sum[0] = max(max_sum[0], curr)\n        return root[idx] + max(left, right)\n    max_gain(0)\n    return max_sum[0]`,
      cpp: `#include <vector>\n#include <algorithm>\n#include <climits>\nusing namespace std;\n\nint maxSum;\nint maxGain(vector<int>& root, int idx) {\n    if (idx >= root.size()) return 0;\n    int left = max(maxGain(root, 2 * idx + 1), 0);\n    int right = max(maxGain(root, 2 * idx + 2), 0);\n    maxSum = max(maxSum, root[idx] + left + right);\n    return root[idx] + max(left, right);\n}\nint solution(vector<int>& root) {\n    maxSum = INT_MIN;\n    maxGain(root, 0);\n    return maxSum;\n}`,
      java: `public class Solution {\n    private int maxSum = Integer.MIN_VALUE;\n    public int solution(int[] root) {\n        maxSum = Integer.MIN_VALUE;\n        maxGain(root, 0);\n        return maxSum;\n    }\n    private int maxGain(int[] root, int idx) {\n        if (idx >= root.length) return 0;\n        int left = Math.max(maxGain(root, 2 * idx + 1), 0);\n        int right = Math.max(maxGain(root, 2 * idx + 2), 0);\n        maxSum = Math.max(maxSum, root[idx] + left + right);\n        return root[idx] + Math.max(left, right);\n    }\n}`
    },
    acceptanceRate: 40,
    points: 300,
    hints: ['For each node, compute the max gain it contributes to its parent (node.val + max(0, left, right)), while updating a global max that considers left + node.val + right.']
  },

  // ==========================================
  // LINKED LISTS & ARRAYS (50-55)
  // ==========================================
  {
    title: 'Reverse Linked List',
    slug: 'reverse-linked-list',
    difficulty: 'Easy',
    topicTags: ['Arrays'],
    description: `Given the head of a singly linked list represented as an array of values \`head\`, reverse the list, and return the reversed list.`,
    constraints: ['0 <= head.length <= 5000', '-5000 <= head[i] <= 5000'],
    sampleTestCases: [
      { input: '[[1,2,3,4,5]]', expectedOutput: '[5,4,3,2,1]', explanation: 'Reversed order.' },
      { input: '[[1,2]]', expectedOutput: '[2,1]', explanation: 'Reversed 2 elements.' }
    ],
    hiddenTestCases: [
      { input: '[[]]', expectedOutput: '[]' },
      { input: '[[42]]', expectedOutput: '[42]' }
    ],
    starterTemplates: {
      javascript: `function solution(head) {\n  return head.slice().reverse();\n}`,
      python: `def solution(head):\n    return head[::-1]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<int> solution(vector<int>& head) {\n    vector<int> res = head;\n    reverse(res.begin(), res.end());\n    return res;\n}`,
      java: `public class Solution {\n    public int[] solution(int[] head) {\n        int n = head.length;\n        int[] res = new int[n];\n        for (int i = 0; i < n; i++) res[i] = head[n - 1 - i];\n        return res;\n    }\n}`
    },
    acceptanceRate: 76,
    points: 100,
    hints: ['Maintain three pointers: prev, curr, and next, redirecting curr.next to prev at each step.']
  },
  {
    title: 'Merge Two Sorted Lists',
    slug: 'merge-two-sorted-lists',
    difficulty: 'Easy',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\` as arrays. Merge the two lists into one sorted list and return it.`,
    constraints: ['0 <= list1.length, list2.length <= 50', '-100 <= Node.val <= 100'],
    sampleTestCases: [
      { input: '[[1,2,4], [1,3,4]]', expectedOutput: '[1,1,2,3,4,4]', explanation: 'Merged in ascending sorted order.' },
      { input: '[[], []]', expectedOutput: '[]', explanation: 'Both empty lists.' }
    ],
    hiddenTestCases: [
      { input: '[[], [0]]', expectedOutput: '[0]' },
      { input: '[[5], [1,2,3]]', expectedOutput: '[1,2,3,5]' }
    ],
    starterTemplates: {
      javascript: `function solution(list1, list2) {\n  const res = [];\n  let i = 0, j = 0;\n  while (i < list1.length && j < list2.length) {\n    if (list1[i] <= list2[j]) res.push(list1[i++]);\n    else res.push(list2[j++]);\n  }\n  while (i < list1.length) res.push(list1[i++]);\n  while (j < list2.length) res.push(list2[j++]);\n  return res;\n}`,
      python: `def solution(list1, list2):\n    res = []\n    i, j = 0, 0\n    while i < len(list1) and j < len(list2):\n        if list1[i] <= list2[j]:\n            res.append(list1[i]); i += 1\n        else:\n            res.append(list2[j]); j += 1\n    res.extend(list1[i:])\n    res.extend(list2[j:])\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(vector<int>& list1, vector<int>& list2) {\n    vector<int> res;\n    int i = 0, j = 0;\n    while (i < list1.size() && j < list2.size()) {\n        if (list1[i] <= list2[j]) res.push_back(list1[i++]);\n        else res.push_back(list2[j++]);\n    }\n    while (i < list1.size()) res.push_back(list1[i++]);\n    while (j < list2.size()) res.push_back(list2[j++]);\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[] solution(int[] list1, int[] list2) {\n        int[] res = new int[list1.length + list2.length];\n        int i = 0, j = 0, k = 0;\n        while (i < list1.length && j < list2.length) {\n            if (list1[i] <= list2[j]) res[k++] = list1[i++];\n            else res[k++] = list2[j++];\n        }\n        while (i < list1.length) res[k++] = list1[i++];\n        while (j < list2.length) res[k++] = list2[j++];\n        return res;\n    }\n}`
    },
    acceptanceRate: 64,
    points: 100,
    hints: ['Compare elements at current heads and advance the smaller one.']
  },
  {
    title: 'Linked List Cycle',
    slug: 'linked-list-cycle',
    difficulty: 'Easy',
    topicTags: ['Arrays'],
    description: `Given \`head\`, the head of a linked list represented as an array of values, and \`pos\` which indicates the 0-indexed position where the tail connects to form a cycle (-1 if no cycle exists), determine if the linked list has a cycle in it.`,
    constraints: ['0 <= head.length <= 10^4', 'pos is -1 or a valid index in the list.'],
    sampleTestCases: [
      { input: '[[3,2,0,-4], 1]', expectedOutput: 'true', explanation: 'There is a cycle connecting tail to node index 1.' },
      { input: '[[1,2], 0]', expectedOutput: 'true', explanation: 'Cycle connects tail back to node index 0.' }
    ],
    hiddenTestCases: [
      { input: '[[1], -1]', expectedOutput: 'false' },
      { input: '[[], -1]', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(head, pos) {\n  return pos >= 0 && pos < head.length;\n}`,
      python: `def solution(head, pos):\n    return 0 <= pos < len(head)`,
      cpp: `#include <vector>\nusing namespace std;\n\nbool solution(vector<int>& head, int pos) {\n    return pos >= 0 && pos < head.size();\n}`,
      java: `public class Solution {\n    public boolean solution(int[] head, int pos) {\n        return pos >= 0 && pos < head.length;\n    }\n}`
    },
    acceptanceRate: 50,
    points: 100,
    hints: ['Floyd Tortoise and Hare algorithm detects cycles using slow (1 step) and fast (2 steps) pointers in O(1) space.']
  },
  {
    title: 'Remove Nth Node From End of List',
    slug: 'remove-nth-node-from-end-of-list',
    difficulty: 'Medium',
    topicTags: ['Arrays'],
    description: `Given the head of a linked list represented as array \`head\` and an integer \`n\`, remove the \`n\`th node from the end of the list and return the remaining list.`,
    constraints: ['1 <= head.length <= 30', '0 <= Node.val <= 100', '1 <= n <= head.length'],
    sampleTestCases: [
      { input: '[[1,2,3,4,5], 2]', expectedOutput: '[1,2,3,5]', explanation: 'The 2nd node from end (4) is removed.' },
      { input: '[[1], 1]', expectedOutput: '[]', explanation: 'Single node list becomes empty.' }
    ],
    hiddenTestCases: [
      { input: '[[1,2], 1]', expectedOutput: '[1]' },
      { input: '[[1,2], 2]', expectedOutput: '[2]' }
    ],
    starterTemplates: {
      javascript: `function solution(head, n) {\n  const targetIdx = head.length - n;\n  return head.filter((_, idx) => idx !== targetIdx);\n}`,
      python: `def solution(head, n):\n    idx = len(head) - n\n    return head[:idx] + head[idx+1:]`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(vector<int>& head, int n) {\n    vector<int> res = head;\n    res.erase(res.end() - n);\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[] solution(int[] head, int n) {\n        int target = head.length - n;\n        int[] res = new int[head.length - 1];\n        int k = 0;\n        for (int i = 0; i < head.length; i++) {\n            if (i != target) res[k++] = head[i];\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['Use two pointers separated by n steps to locate the node in a single pass.']
  },
  {
    title: 'Reorder List',
    slug: 'reorder-list',
    difficulty: 'Medium',
    topicTags: ['Arrays'],
    description: `You are given the head of a singly linked-list represented as array: \`L0 -> L1 -> ... -> Ln - 1 -> Ln\`.\n\nReorder the list to be: \`L0 -> Ln -> L1 -> Ln - 1 -> L2 -> Ln - 2 -> ...\`.\n\nReturn the reordered list.`,
    constraints: ['1 <= head.length <= 5 * 10^4', '1 <= Node.val <= 1000'],
    sampleTestCases: [
      { input: '[[1,2,3,4]]', expectedOutput: '[1,4,2,3]', explanation: '1, 4, 2, 3.' },
      { input: '[[1,2,3,4,5]]', expectedOutput: '[1,5,2,4,3]', explanation: 'Interleaved front and back.' }
    ],
    hiddenTestCases: [
      { input: '[[1]]', expectedOutput: '[1]' },
      { input: '[[1,2]]', expectedOutput: '[1,2]' }
    ],
    starterTemplates: {
      javascript: `function solution(head) {\n  const res = [];\n  let left = 0, right = head.length - 1;\n  while (left <= right) {\n    res.push(head[left]);\n    if (left !== right) res.push(head[right]);\n    left++;\n    right--;\n  }\n  return res;\n}`,
      python: `def solution(head):\n    res = []\n    l, r = 0, len(head) - 1\n    while l <= r:\n        res.append(head[l])\n        if l != r: res.append(head[r])\n        l += 1; r -= 1\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(vector<int>& head) {\n    vector<int> res;\n    int l = 0, r = head.size() - 1;\n    while (l <= r) {\n        res.push_back(head[l]);\n        if (l != r) res.push_back(head[r]);\n        l++; r--;\n    }\n    return res;\n}`,
      java: `public class Solution {\n    public int[] solution(int[] head) {\n        int[] res = new int[head.length];\n        int l = 0, r = head.length - 1, k = 0;\n        while (l <= r) {\n            res[k++] = head[l++];\n            if (k < head.length) res[k++] = head[r--];\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 56,
    points: 200,
    hints: ['Find the middle node, reverse the second half of the list, then merge the two halves alternately.']
  },
  {
    title: 'Merge k Sorted Lists',
    slug: 'merge-k-sorted-lists',
    difficulty: 'Hard',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.`,
    constraints: ['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4'],
    sampleTestCases: [
      { input: '[[[1,4,5],[1,3,4],[2,6]]]', expectedOutput: '[1,1,2,3,4,4,5,6]', explanation: 'All three sorted lists merged into one sorted output.' },
      { input: '[[]]', expectedOutput: '[]', explanation: 'Empty collection.' }
    ],
    hiddenTestCases: [
      { input: '[[[]]]', expectedOutput: '[]' },
      { input: '[[[2],[1]]]', expectedOutput: '[1,2]' }
    ],
    starterTemplates: {
      javascript: `function solution(lists) {\n  const merged = [];\n  for (const list of lists) {\n    for (const val of list) merged.push(val);\n  }\n  return merged.sort((a, b) => a - b);\n}`,
      python: `def solution(lists):\n    import heapq\n    res = []\n    for l in lists:\n        res.extend(l)\n    return sorted(res)`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<int> solution(vector<vector<int>>& lists) {\n    vector<int> res;\n    for (auto& l : lists) for (int x : l) res.push_back(x);\n    sort(res.begin(), res.end());\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[] solution(int[][] lists) {\n        List<Integer> list = new ArrayList<>();\n        for (int[] arr : lists) for (int x : arr) list.add(x);\n        Collections.sort(list);\n        int[] res = new int[list.size()];\n        for (int i = 0; i < list.size(); i++) res[i] = list.get(i);\n        return res;\n    }\n}`
    },
    acceptanceRate: 52,
    points: 300,
    hints: ['Use a min-priority queue (min-heap) of size k or divide-and-conquer merge pairwise in O(N log k).']
  },

  // ==========================================
  // GRAPHS (56-61)
  // ==========================================
  {
    title: 'Clone Graph',
    slug: 'clone-graph',
    difficulty: 'Medium',
    topicTags: ['Graphs'],
    description: `Given a reference of a node in a connected undirected graph represented as an adjacency list \`adjList\` (where 1-indexed node \`i\` connects to \`adjList[i-1]\`), return a deep copy (clone) of the graph.`,
    constraints: ['The number of nodes in the graph is in the range [0, 100].', '1 <= val <= 100', 'adjList[i] does not contain repeated neighbors.'],
    sampleTestCases: [
      { input: '[[[[2,4],[1,3],[2,4],[1,3]]]]', expectedOutput: '[[2,4],[1,3],[2,4],[1,3]]', explanation: '4 nodes in square loop.' },
      { input: '[[[[]]]]', expectedOutput: '[[]]', explanation: '1 node with no neighbors.' }
    ],
    hiddenTestCases: [
      { input: '[[]]', expectedOutput: '[]' }
    ],
    starterTemplates: {
      javascript: `function solution(adjList) {\n  if (!adjList || adjList.length === 0) return [];\n  // Deep copy adjacency list\n  return JSON.parse(JSON.stringify(adjList));\n}`,
      python: `def solution(adjList):\n    import copy\n    return copy.deepcopy(adjList)`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<vector<int>> solution(vector<vector<int>>& adjList) {\n    return adjList;\n}`,
      java: `public class Solution {\n    public int[][] solution(int[][] adjList) {\n        return adjList.clone();\n    }\n}`
    },
    acceptanceRate: 57,
    points: 200,
    hints: ['Use a hash map to map each original node to its newly created clone to prevent infinite cycles during DFS/BFS.']
  },
  {
    title: 'Pacific Atlantic Water Flow',
    slug: 'pacific-atlantic-water-flow',
    difficulty: 'Medium',
    topicTags: ['Graphs', 'Arrays'],
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean (top and left edges) and Atlantic Ocean (bottom and right edges).\n\nWater can flow from a cell to another cell if the adjacent cell has a height equal to or less than the current cell's height.\n\nReturn a 2D list of grid coordinates \`[r, c]\` where water can flow to both oceans.`,
    constraints: ['m == heights.length', 'n == heights[r].length', '1 <= m, n <= 200', '0 <= heights[r][c] <= 10^5'],
    sampleTestCases: [
      { input: '[[[[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]]]', expectedOutput: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]', explanation: 'Cells that can flow into both oceans.' },
      { input: '[[[[1]]]]', expectedOutput: '[[0,0]]', explanation: 'Single cell borders both.' }
    ],
    hiddenTestCases: [
      { input: '[[[[2,1],[1,2]]]]', expectedOutput: '[[0,0],[0,1],[1,0],[1,1]]' }
    ],
    starterTemplates: {
      javascript: `function solution(heights) {\n  const m = heights.length, n = heights[0].length;\n  const pacific = Array.from({ length: m }, () => Array(n).fill(false));\n  const atlantic = Array.from({ length: m }, () => Array(n).fill(false));\n  function dfs(r, c, ocean, prevHeight) {\n    if (r < 0 || r >= m || c < 0 || c >= n || ocean[r][c] || heights[r][c] < prevHeight) return;\n    ocean[r][c] = true;\n    dfs(r + 1, c, ocean, heights[r][c]);\n    dfs(r - 1, c, ocean, heights[r][c]);\n    dfs(r, c + 1, ocean, heights[r][c]);\n    dfs(r, c - 1, ocean, heights[r][c]);\n  }\n  for (let r = 0; r < m; r++) {\n    dfs(r, 0, pacific, 0);\n    dfs(r, n - 1, atlantic, 0);\n  }\n  for (let c = 0; c < n; c++) {\n    dfs(0, c, pacific, 0);\n    dfs(m - 1, c, atlantic, 0);\n  }\n  const res = [];\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (pacific[r][c] && atlantic[r][c]) res.push([r, c]);\n    }\n  }\n  return res;\n}`,
      python: `def solution(heights):\n    m, n = len(heights), len(heights[0])\n    pac, atl = set(), set()\n    def dfs(r, c, visited, prev):\n        if r < 0 or r >= m or c < 0 or c >= n or (r, c) in visited or heights[r][c] < prev: return\n        visited.add((r, c))\n        for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n            dfs(r + dr, c + dc, visited, heights[r][c])\n    for c in range(n):\n        dfs(0, c, pac, 0)\n        dfs(m - 1, c, atl, 0)\n    for r in range(m):\n        dfs(r, 0, pac, 0)\n        dfs(r, n - 1, atl, 0)\n    return sorted([[r, c] for r, c in pac & atl])`,
      cpp: `#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<int>>& h, vector<vector<bool>>& vis, int r, int c, int prev) {\n    if (r < 0 || r >= h.size() || c < 0 || c >= h[0].size() || vis[r][c] || h[r][c] < prev) return;\n    vis[r][c] = true;\n    dfs(h, vis, r + 1, c, h[r][c]);\n    dfs(h, vis, r - 1, c, h[r][c]);\n    dfs(h, vis, r, c + 1, h[r][c]);\n    dfs(h, vis, r, c - 1, h[r][c]);\n}\nvector<vector<int>> solution(vector<vector<int>>& heights) {\n    int m = heights.size(), n = heights[0].size();\n    vector<vector<bool>> pac(m, vector<bool>(n, false)), atl(m, vector<bool>(n, false));\n    for (int r = 0; r < m; r++) { dfs(heights, pac, r, 0, 0); dfs(heights, atl, r, n - 1, 0); }\n    for (int c = 0; c < n; c++) { dfs(heights, pac, 0, c, 0); dfs(heights, atl, m - 1, c, 0); }\n    vector<vector<int>> res;\n    for (int r = 0; r < m; r++) for (int c = 0; c < n; c++) if (pac[r][c] && atl[r][c]) res.push_back({r, c});\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> solution(int[][] heights) {\n        int m = heights.length, n = heights[0].length;\n        boolean[][] pac = new boolean[m][n], atl = new boolean[m][n];\n        for (int r = 0; r < m; r++) { dfs(heights, pac, r, 0, 0); dfs(heights, atl, r, n - 1, 0); }\n        for (int c = 0; c < n; c++) { dfs(heights, pac, 0, c, 0); dfs(heights, atl, m - 1, c, 0); }\n        List<List<Integer>> res = new ArrayList<>();\n        for (int r = 0; r < m; r++) for (int c = 0; c < n; c++)\n            if (pac[r][c] && atl[r][c]) res.add(Arrays.asList(r, c));\n        return res;\n    }\n    private void dfs(int[][] h, boolean[][] vis, int r, int c, int prev) {\n        if (r < 0 || r >= h.length || c < 0 || c >= h[0].length || vis[r][c] || h[r][c] < prev) return;\n        vis[r][c] = true;\n        dfs(h, vis, r + 1, c, h[r][c]); dfs(h, vis, r - 1, c, h[r][c]);\n        dfs(h, vis, r, c + 1, h[r][c]); dfs(h, vis, r, c - 1, h[r][c]);\n    }\n}`
    },
    acceptanceRate: 55,
    points: 200,
    hints: ['Instead of searching from each cell down to oceans, reverse the search: start from both ocean coastlines and flow uphill.']
  },
  {
    title: 'Rotting Oranges',
    slug: 'rotting-oranges',
    difficulty: 'Medium',
    topicTags: ['Graphs', 'Arrays'],
    description: `You are given an \`m x n\` grid where each cell has one of three values:\n- \`0\` representing an empty cell,\n- \`1\` representing a fresh orange, or\n- \`2\` representing a rotten orange.\n\nEvery minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.\n\nReturn the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return \`-1\`.`,
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 10', 'grid[i][j] is 0, 1, or 2.'],
    sampleTestCases: [
      { input: '[[[[2,1,1],[1,1,0],[0,1,1]]]]', expectedOutput: '4', explanation: 'All fresh oranges rot in 4 minutes.' },
      { input: '[[[[2,1,1],[0,1,1],[1,0,1]]]]', expectedOutput: '-1', explanation: 'The bottom-left fresh orange cannot be reached.' }
    ],
    hiddenTestCases: [
      { input: '[[[[0,2]]]]', expectedOutput: '0' },
      { input: '[[[[1]]]]', expectedOutput: '-1' }
    ],
    starterTemplates: {
      javascript: `function solution(grid) {\n  const m = grid.length, n = grid[0].length;\n  const queue = [];\n  let fresh = 0;\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (grid[r][c] === 2) queue.push([r, c]);\n      else if (grid[r][c] === 1) fresh++;\n    }\n  }\n  if (fresh === 0) return 0;\n  let minutes = 0;\n  const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];\n  while (queue.length > 0 && fresh > 0) {\n    const size = queue.length;\n    for (let i = 0; i < size; i++) {\n      const [r, c] = queue.shift();\n      for (const [dr, dc] of directions) {\n        const nr = r + dr, nc = c + dc;\n        if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] === 1) {\n          grid[nr][nc] = 2;\n          fresh--;\n          queue.push([nr, nc]);\n        }\n      }\n    }\n    minutes++;\n  }\n  return fresh === 0 ? minutes : -1;\n}`,
      python: `def solution(grid):\n    from collections import deque\n    m, n = len(grid), len(grid[0])\n    q = deque()\n    fresh = 0\n    for r in range(m):\n        for c in range(n):\n            if grid[r][c] == 2: q.append((r, c))\n            elif grid[r][c] == 1: fresh += 1\n    if fresh == 0: return 0\n    minutes = 0\n    while q and fresh > 0:\n        for _ in range(len(q)):\n            r, c = q.popleft()\n            for dr, dc in [(1,0),(-1,0),(0,1),(0,-1)]:\n                nr, nc = r + dr, c + dc\n                if 0 <= nr < m and 0 <= nc < n and grid[nr][nc] == 1:\n                    grid[nr][nc] = 2\n                    fresh -= 1\n                    q.append((nr, nc))\n        minutes += 1\n    return minutes if fresh == 0 else -1`,
      cpp: `#include <vector>\n#include <queue>\nusing namespace std;\n\nint solution(vector<vector<int>>& grid) {\n    int m = grid.size(), n = grid[0].size(), fresh = 0;\n    queue<pair<int, int>> q;\n    for (int r = 0; r < m; r++) {\n        for (int c = 0; c < n; c++) {\n            if (grid[r][c] == 2) q.push({r, c});\n            else if (grid[r][c] == 1) fresh++;\n        }\n    }\n    if (fresh == 0) return 0;\n    int minutes = 0;\n    int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};\n    while (!q.empty() && fresh > 0) {\n        int size = q.size();\n        for (int i = 0; i < size; i++) {\n            auto [r, c] = q.front(); q.pop();\n            for (auto& d : dirs) {\n                int nr = r + d[0], nc = c + d[1];\n                if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                    grid[nr][nc] = 2;\n                    fresh--;\n                    q.push({nr, nc});\n                }\n            }\n        }\n        minutes++;\n    }\n    return fresh == 0 ? minutes : -1;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[][] grid) {\n        int m = grid.length, n = grid[0].length, fresh = 0;\n        Queue<int[]> q = new LinkedList<>();\n        for (int r = 0; r < m; r++) {\n            for (int c = 0; c < n; c++) {\n                if (grid[r][c] == 2) q.offer(new int[]{r, c});\n                else if (grid[r][c] == 1) fresh++;\n            }\n        }\n        if (fresh == 0) return 0;\n        int minutes = 0;\n        int[][] dirs = {{1,0},{-1,0},{0,1},{0,-1}};\n        while (!q.isEmpty() && fresh > 0) {\n            int size = q.size();\n            for (int i = 0; i < size; i++) {\n                int[] curr = q.poll();\n                for (int[] d : dirs) {\n                    int nr = curr[0] + d[0], nc = curr[1] + d[1];\n                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && grid[nr][nc] == 1) {\n                        grid[nr][nc] = 2; fresh--;\n                        q.offer(new int[]{nr, nc});\n                    }\n                }\n            }\n            minutes++;\n        }\n        return fresh == 0 ? minutes : -1;\n    }\n}`
    },
    acceptanceRate: 53,
    points: 200,
    hints: ['Multi-source Breadth-First Search (BFS) seeded with all initially rotten oranges simulates minute-by-minute contagion.']
  },
  {
    title: 'Graph Valid Tree',
    slug: 'graph-valid-tree',
    difficulty: 'Medium',
    topicTags: ['Graphs'],
    description: `You have a graph of \`n\` nodes labeled from \`0\` to \`n - 1\`. You are given an integer \`n\` and a list of \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an undirected edge between nodes \`ai\` and \`bi\` in the graph.\n\nReturn \`true\` if the edges of the given graph make up a valid tree, and \`false\` otherwise.`,
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000', 'edges[i].length == 2'],
    sampleTestCases: [
      { input: '[5, [[0,1],[0,2],[0,3],[1,4]]]', expectedOutput: 'true', explanation: 'Fully connected without cycles with n-1 edges.' },
      { input: '[5, [[0,1],[1,2],[2,3],[1,3],[1,4]]]', expectedOutput: 'false', explanation: 'Contains cycle 1-2-3-1.' }
    ],
    hiddenTestCases: [
      { input: '[1, []]', expectedOutput: 'true' },
      { input: '[4, [[0,1],[2,3]]]', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(n, edges) {\n  if (edges.length !== n - 1) return false;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  function find(x) {\n    if (parent[x] !== x) parent[x] = find(parent[x]);\n    return parent[x];\n  }\n  for (const [u, v] of edges) {\n    const r1 = find(u), r2 = find(v);\n    if (r1 === r2) return false;\n    parent[r1] = r2;\n  }\n  return true;\n}`,
      python: `def solution(n, edges):\n    if len(edges) != n - 1: return False\n    parent = list(range(n))\n    def find(x):\n        if parent[x] != x: parent[x] = find(parent[x])\n        return parent[x]\n    for u, v in edges:\n        r1, r2 = find(u), find(v)\n        if r1 == r2: return False\n        parent[r1] = r2\n    return True`,
      cpp: `#include <vector>\nusing namespace std;\n\nint findRoot(vector<int>& parent, int x) {\n    if (parent[x] != x) parent[x] = findRoot(parent, parent[x]);\n    return parent[x];\n}\nbool solution(int n, vector<vector<int>>& edges) {\n    if (edges.size() != n - 1) return false;\n    vector<int> parent(n);\n    for (int i = 0; i < n; i++) parent[i] = i;\n    for (auto& e : edges) {\n        int r1 = findRoot(parent, e[0]), r2 = findRoot(parent, e[1]);\n        if (r1 == r2) return false;\n        parent[r1] = r2;\n    }\n    return true;\n}`,
      java: `public class Solution {\n    public boolean solution(int n, int[][] edges) {\n        if (edges.length != n - 1) return false;\n        int[] parent = new int[n];\n        for (int i = 0; i < n; i++) parent[i] = i;\n        for (int[] e : edges) {\n            int r1 = find(parent, e[0]), r2 = find(parent, e[1]);\n            if (r1 == r2) return false;\n            parent[r1] = r2;\n        }\n        return true;\n    }\n    private int find(int[] p, int x) {\n        if (p[x] != x) p[x] = find(p, p[x]);\n        return p[x];\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['A valid tree with n nodes must have exactly n - 1 edges and be fully connected without cycles (Union-Find).']
  },
  {
    title: 'Number of Connected Components',
    slug: 'number-of-connected-components',
    difficulty: 'Medium',
    topicTags: ['Graphs'],
    description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [ai, bi]\` indicates that there is an edge between \`ai\` and \`bi\` in the graph.\n\nReturn the number of connected components in the graph.`,
    constraints: ['1 <= n <= 2000', '0 <= edges.length <= 5000'],
    sampleTestCases: [
      { input: '[5, [[0,1],[1,2],[3,4]]]', expectedOutput: '2', explanation: 'Components are {0,1,2} and {3,4}.' },
      { input: '[5, [[0,1],[1,2],[2,3],[3,4]]]', expectedOutput: '1', explanation: 'All nodes connected in one component.' }
    ],
    hiddenTestCases: [
      { input: '[4, []]', expectedOutput: '4' },
      { input: '[3, [[0,1],[0,2],[1,2]]]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(n, edges) {\n  let count = n;\n  const parent = Array.from({ length: n }, (_, i) => i);\n  function find(x) {\n    if (parent[x] !== x) parent[x] = find(parent[x]);\n    return parent[x];\n  }\n  for (const [u, v] of edges) {\n    const r1 = find(u), r2 = find(v);\n    if (r1 !== r2) {\n      parent[r1] = r2;\n      count--;\n    }\n  }\n  return count;\n}`,
      python: `def solution(n, edges):\n    parent = list(range(n))\n    count = n\n    def find(x):\n        if parent[x] != x: parent[x] = find(parent[x])\n        return parent[x]\n    for u, v in edges:\n        r1, r2 = find(u), find(v)\n        if r1 != r2:\n            parent[r1] = r2\n            count -= 1\n    return count`,
      cpp: `#include <vector>\nusing namespace std;\n\nint findR(vector<int>& p, int x) {\n    if (p[x] != x) p[x] = findR(p, p[x]);\n    return p[x];\n}\nint solution(int n, vector<vector<int>>& edges) {\n    int count = n;\n    vector<int> p(n);\n    for (int i = 0; i < n; i++) p[i] = i;\n    for (auto& e : edges) {\n        int r1 = findR(p, e[0]), r2 = findR(p, e[1]);\n        if (r1 != r2) { p[r1] = r2; count--; }\n    }\n    return count;\n}`,
      java: `public class Solution {\n    public int solution(int n, int[][] edges) {\n        int count = n;\n        int[] p = new int[n];\n        for (int i = 0; i < n; i++) p[i] = i;\n        for (int[] e : edges) {\n            int r1 = find(p, e[0]), r2 = find(p, e[1]);\n            if (r1 != r2) { p[r1] = r2; count--; }\n        }\n        return count;\n    }\n    private int find(int[] p, int x) {\n        if (p[x] != x) p[x] = find(p, p[x]);\n        return p[x];\n    }\n}`
    },
    acceptanceRate: 62,
    points: 200,
    hints: ['Start with n components and decrement every time two previously disjoint sets are merged.']
  },
  {
    title: 'Network Delay Time',
    slug: 'network-delay-time',
    difficulty: 'Medium',
    topicTags: ['Graphs', 'Searching & Sorting'],
    description: `You are given a network of \`n\` nodes, labeled from \`1\` to \`n\`. You are also given \`times\`, a list of travel times as directed edges \`times[i] = (ui, vi, wi)\`, where \`ui\` is the source node, \`vi\` is the target node, and \`wi\` is the time it takes for a signal to travel from source to target.\n\nWe will send a signal from a given node \`k\`. Return the minimum time it takes for all \`n\` nodes to receive the signal. If it is impossible for all the \`n\` nodes to receive the signal, return \`-1\`.`,
    constraints: ['1 <= k <= n <= 100', '1 <= times.length <= 6000', '0 <= wi <= 100'],
    sampleTestCases: [
      { input: '[[[2,1,1],[2,3,1],[3,4,1]], 4, 2]', expectedOutput: '2', explanation: 'Signal reaches all 4 nodes within 2 units of time.' },
      { input: '[[[1,2,1]], 2, 1]', expectedOutput: '1', explanation: 'Path 1->2 takes 1.' }
    ],
    hiddenTestCases: [
      { input: '[[[1,2,1]], 2, 2]', expectedOutput: '-1' }
    ],
    starterTemplates: {
      javascript: `function solution(times, n, k) {\n  const dist = Array(n + 1).fill(Infinity);\n  dist[k] = 0;\n  for (let i = 1; i < n; i++) {\n    for (const [u, v, w] of times) {\n      if (dist[u] + w < dist[v]) {\n        dist[v] = dist[u] + w;\n      }\n    }\n  }\n  let maxTime = 0;\n  for (let i = 1; i <= n; i++) {\n    if (dist[i] === Infinity) return -1;\n    maxTime = Math.max(maxTime, dist[i]);\n  }\n  return maxTime;\n}`,
      python: `def solution(times, n, k):\n    dist = [float('inf')] * (n + 1)\n    dist[k] = 0\n    for _ in range(n - 1):\n        for u, v, w in times:\n            if dist[u] + w < dist[v]:\n                dist[v] = dist[u] + w\n    res = max(dist[1:])\n    return res if res < float('inf') else -1`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<vector<int>>& times, int n, int k) {\n    vector<int> dist(n + 1, 1e9);\n    dist[k] = 0;\n    for (int i = 1; i < n; i++) {\n        for (auto& e : times) {\n            if (dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];\n        }\n    }\n    int ans = 0;\n    for (int i = 1; i <= n; i++) ans = max(ans, dist[i]);\n    return ans >= 1e9 ? -1 : ans;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[][] times, int n, int k) {\n        int[] dist = new int[n + 1];\n        Arrays.fill(dist, 1000000);\n        dist[k] = 0;\n        for (int i = 1; i < n; i++) {\n            for (int[] e : times) {\n                if (dist[e[0]] + e[2] < dist[e[1]]) dist[e[1]] = dist[e[0]] + e[2];\n            }\n        }\n        int ans = 0;\n        for (int i = 1; i <= n; i++) ans = Math.max(ans, dist[i]);\n        return ans >= 1000000 ? -1 : ans;\n    }\n}`
    },
    acceptanceRate: 54,
    points: 200,
    hints: ['Classic single-source shortest path problem solved using Dijkstra algorithm or Bellman-Ford.']
  },

  // ==========================================
  // DYNAMIC PROGRAMMING & STRINGS (62-67)
  // ==========================================
  {
    title: 'House Robber II',
    slug: 'house-robber-ii',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Arrays'],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 1000'],
    sampleTestCases: [
      { input: '[[2,3,2]]', expectedOutput: '3', explanation: 'You cannot rob house 1 (money = 2) and house 3 (money = 2), because they are adjacent.' },
      { input: '[[1,2,3,1]]', expectedOutput: '4', explanation: 'Rob house 1 (money = 1) and then house 3 (money = 3).' }
    ],
    hiddenTestCases: [
      { input: '[[0]]', expectedOutput: '0' },
      { input: '[[1,2,3]]', expectedOutput: '3' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  if (nums.length === 1) return nums[0];\n  function robRange(start, end) {\n    let rob1 = 0, rob2 = 0;\n    for (let i = start; i <= end; i++) {\n      const temp = Math.max(rob1 + nums[i], rob2);\n      rob1 = rob2;\n      rob2 = temp;\n    }\n    return rob2;\n  }\n  return Math.max(robRange(0, nums.length - 2), robRange(1, nums.length - 1));\n}`,
      python: `def solution(nums):\n    if len(nums) == 1: return nums[0]\n    def rob_simple(arr):\n        r1, r2 = 0, 0\n        for n in arr:\n            r1, r2 = r2, max(r1 + n, r2)\n        return r2\n    return max(rob_simple(nums[:-1]), rob_simple(nums[1:]))`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint robSimple(vector<int>& nums, int l, int r) {\n    int r1 = 0, r2 = 0;\n    for (int i = l; i <= r; i++) {\n        int tmp = max(r1 + nums[i], r2);\n        r1 = r2; r2 = tmp;\n    }\n    return r2;\n}\nint solution(vector<int>& nums) {\n    if (nums.size() == 1) return nums[0];\n    return max(robSimple(nums, 0, nums.size() - 2), robSimple(nums, 1, nums.size() - 1));\n}`,
      java: `public class Solution {\n    public int solution(int[] nums) {\n        if (nums.length == 1) return nums[0];\n        return Math.max(rob(nums, 0, nums.length - 2), rob(nums, 1, nums.length - 1));\n    }\n    private int rob(int[] nums, int l, int r) {\n        int r1 = 0, r2 = 0;\n        for (int i = l; i <= r; i++) {\n            int tmp = Math.max(r1 + nums[i], r2);\n            r1 = r2; r2 = tmp;\n        }\n        return r2;\n    }\n}`
    },
    acceptanceRate: 41,
    points: 200,
    hints: ['Deconstruct the circular dependency into two linear subproblems: either omit the first house or omit the last house.']
  },
  {
    title: 'Palindromic Substrings',
    slug: 'palindromic-substrings',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Strings'],
    description: `Given a string \`s\`, return the number of palindromic substrings in it.\n\nA string is a palindrome when it reads the same backward as forward.\n\nA substring is a contiguous sequence of characters within the string.`,
    constraints: ['1 <= s.length <= 1000', 's consists of lowercase English letters.'],
    sampleTestCases: [
      { input: '["abc"]', expectedOutput: '3', explanation: 'Three palindromic substrings: "a", "b", "c".' },
      { input: '["aaa"]', expectedOutput: '6', explanation: 'Six palindromic substrings: "a", "a", "a", "aa", "aa", "aaa".' }
    ],
    hiddenTestCases: [
      { input: '["a"]', expectedOutput: '1' },
      { input: '["racecar"]', expectedOutput: '10' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {\n  let count = 0;\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      count++;\n      l--;\n      r++;\n    }\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);     // odd length\n    expand(i, i + 1); // even length\n  }\n  return count;\n}`,
      python: `def solution(s):\n    count = 0\n    def expand(l, r):\n        nonlocal count\n        while l >= 0 and r < len(s) and s[l] == s[r]:\n            count += 1\n            l -= 1\n            r += 1\n    for i in range(len(s)):\n        expand(i, i)\n        expand(i, i + 1)\n    return count`,
      cpp: `#include <string>\nusing namespace std;\n\nint solution(string s) {\n    int count = 0, n = s.length();\n    auto expand = [&](int l, int r) {\n        while (l >= 0 && r < n && s[l] == s[r]) {\n            count++; l--; r++;\n        }\n    };\n    for (int i = 0; i < n; i++) {\n        expand(i, i);\n        expand(i, i + 1);\n    }\n    return count;\n}`,
      java: `public class Solution {\n    private int count = 0;\n    public int solution(String s) {\n        count = 0;\n        for (int i = 0; i < s.length(); i++) {\n            expand(s, i, i);\n            expand(s, i, i + 1);\n        }\n        return count;\n    }\n    private void expand(String s, int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n            count++; l--; r++;\n        }\n    }\n}`
    },
    acceptanceRate: 68,
    points: 200,
    hints: ['Consider each position as a potential palindrome center and expand outwards.']
  },
  {
    title: 'Longest Palindromic Substring',
    slug: 'longest-palindromic-substring',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Strings'],
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.`,
    constraints: ['1 <= s.length <= 1000', 's consist of only digits and English letters.'],
    sampleTestCases: [
      { input: '["babad"]', expectedOutput: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: '["cbbd"]', expectedOutput: '"bb"', explanation: '"bb" is the longest palindromic substring.' }
    ],
    hiddenTestCases: [
      { input: '["a"]', expectedOutput: '"a"' },
      { input: '["ac"]', expectedOutput: '"a"' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {\n  let res = "";\n  function expand(l, r) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) {\n      if (r - l + 1 > res.length) res = s.slice(l, r + 1);\n      l--;\n      r++;\n    }\n  }\n  for (let i = 0; i < s.length; i++) {\n    expand(i, i);\n    expand(i, i + 1);\n  }\n  return res;\n}`,
      python: `def solution(s):\n    res = ""\n    for i in range(len(s)):\n        for l, r in [(i, i), (i, i + 1)]:\n            while l >= 0 and r < len(s) and s[l] == s[r]:\n                if r - l + 1 > len(res):\n                    res = s[l:r+1]\n                l -= 1\n                r += 1\n    return res`,
      cpp: `#include <string>\nusing namespace std;\n\nstring solution(string s) {\n    string res = "";\n    int n = s.length();\n    auto expand = [&](int l, int r) {\n        while (l >= 0 && r < n && s[l] == s[r]) {\n            if (r - l + 1 > res.length()) res = s.substr(l, r - l + 1);\n            l--; r++;\n        }\n    };\n    for (int i = 0; i < n; i++) { expand(i, i); expand(i, i + 1); }\n    return res;\n}`,
      java: `public class Solution {\n    private String res = "";\n    public String solution(String s) {\n        res = "";\n        for (int i = 0; i < s.length(); i++) {\n            expand(s, i, i);\n            expand(s, i, i + 1);\n        }\n        return res;\n    }\n    private void expand(String s, int l, int r) {\n        while (l >= 0 && r < s.length() && s.charAt(l) == s.charAt(r)) {\n            if (r - l + 1 > res.length()) res = s.substring(l, r + 1);\n            l--; r++;\n        }\n    }\n}`
    },
    acceptanceRate: 33,
    points: 200,
    hints: ['Expand around every possible center in O(N^2) time and O(1) space.']
  },
  {
    title: 'Decode Ways',
    slug: 'decode-ways',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Strings'],
    description: `A message containing letters from A-Z can be encoded into numbers using the following mapping:\n- 'A' -> "1"\n- 'B' -> "2"\n...\n- 'Z' -> "26"\n\nTo decode an encoded message, all the digits must be grouped then mapped back into letters using the reverse of the mapping above. Given a string \`s\` containing only digits, return the number of ways to decode it.`,
    constraints: ['1 <= s.length <= 100', 's contains only digits and may contain leading zero(s).'],
    sampleTestCases: [
      { input: '["12"]', expectedOutput: '2', explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).' },
      { input: '["226"]', expectedOutput: '3', explanation: '"226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' }
    ],
    hiddenTestCases: [
      { input: '["06"]', expectedOutput: '0' },
      { input: '["10"]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {\n  if (s[0] === '0') return 0;\n  const dp = Array(s.length + 1).fill(0);\n  dp[0] = 1;\n  dp[1] = 1;\n  for (let i = 2; i <= s.length; i++) {\n    const oneDigit = Number(s.slice(i - 1, i));\n    const twoDigits = Number(s.slice(i - 2, i));\n    if (oneDigit >= 1) dp[i] += dp[i - 1];\n    if (twoDigits >= 10 && twoDigits <= 26) dp[i] += dp[i - 2];\n  }\n  return dp[s.length];\n}`,
      python: `def solution(s):\n    if not s or s[0] == '0': return 0\n    dp = [0] * (len(s) + 1)\n    dp[0] = dp[1] = 1\n    for i in range(2, len(s) + 1):\n        if 1 <= int(s[i-1:i]) <= 9: dp[i] += dp[i-1]\n        if 10 <= int(s[i-2:i]) <= 26: dp[i] += dp[i-2]\n    return dp[len(s)]`,
      cpp: `#include <string>\n#include <vector>\nusing namespace std;\n\nint solution(string s) {\n    if (s.empty() || s[0] == '0') return 0;\n    int n = s.length();\n    vector<int> dp(n + 1, 0);\n    dp[0] = dp[1] = 1;\n    for (int i = 2; i <= n; i++) {\n        int d1 = stoi(s.substr(i - 1, 1));\n        int d2 = stoi(s.substr(i - 2, 2));\n        if (d1 >= 1) dp[i] += dp[i - 1];\n        if (d2 >= 10 && d2 <= 26) dp[i] += dp[i - 2];\n    }\n    return dp[n];\n}`,
      java: `public class Solution {\n    public int solution(String s) {\n        if (s.charAt(0) == '0') return 0;\n        int n = s.length();\n        int[] dp = new int[n + 1];\n        dp[0] = dp[1] = 1;\n        for (int i = 2; i <= n; i++) {\n            int d1 = Integer.parseInt(s.substring(i - 1, i));\n            int d2 = Integer.parseInt(s.substring(i - 2, i));\n            if (d1 >= 1) dp[i] += dp[i - 1];\n            if (d2 >= 10 && d2 <= 26) dp[i] += dp[i - 2];\n        }\n        return dp[n];\n    }\n}`
    },
    acceptanceRate: 33,
    points: 200,
    hints: ['Similar to Fibonacci/Climbing Stairs, where state dp[i] depends on valid 1-digit and 2-digit branches.']
  },
  {
    title: 'Partition Equal Subset Sum',
    slug: 'partition-equal-subset-sum',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Arrays'],
    description: `Given an integer array \`nums\`, return \`true\` if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or \`false\` otherwise.`,
    constraints: ['1 <= nums.length <= 200', '1 <= nums[i] <= 100'],
    sampleTestCases: [
      { input: '[[1,5,11,5]]', expectedOutput: 'true', explanation: 'The array can be partitioned as [1, 5, 5] and [11].' },
      { input: '[[1,2,3,5]]', expectedOutput: 'false', explanation: 'Total sum is 11, which cannot be divided into two equal integers.' }
    ],
    hiddenTestCases: [
      { input: '[[2,2]]', expectedOutput: 'true' },
      { input: '[[3,3,3,4,5]]', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const sum = nums.reduce((a, b) => a + b, 0);\n  if (sum % 2 !== 0) return false;\n  const target = sum / 2;\n  const dp = new Set([0]);\n  for (const n of nums) {\n    const nextDp = new Set(dp);\n    for (const t of dp) {\n      if (t + n === target) return true;\n      if (t + n < target) nextDp.add(t + n);\n    }\n    for (const val of nextDp) dp.add(val);\n  }\n  return dp.has(target);\n}`,
      python: `def solution(nums):\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    dp = {0}\n    for n in nums:\n        next_dp = set(dp)\n        for t in dp:\n            if t + n == target: return True\n            if t + n < target: next_dp.add(t + n)\n        dp = next_dp\n    return target in dp`,
      cpp: `#include <vector>\n#include <numeric>\nusing namespace std;\n\nbool solution(vector<int>& nums) {\n    int sum = accumulate(nums.begin(), nums.end(), 0);\n    if (sum % 2 != 0) return false;\n    int target = sum / 2;\n    vector<bool> dp(target + 1, false);\n    dp[0] = true;\n    for (int n : nums) {\n        for (int j = target; j >= n; j--) dp[j] = dp[j] || dp[j - n];\n    }\n    return dp[target];\n}`,
      java: `public class Solution {\n    public boolean solution(int[] nums) {\n        int sum = 0;\n        for (int n : nums) sum += n;\n        if (sum % 2 != 0) return false;\n        int target = sum / 2;\n        boolean[] dp = new boolean[target + 1];\n        dp[0] = true;\n        for (int n : nums) {\n            for (int j = target; j >= n; j--) dp[j] = dp[j] || dp[j - n];\n        }\n        return dp[target];\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['This is a 0/1 Knapsack problem where capacity = sum(nums) / 2.']
  },
  {
    title: 'Edit Distance',
    slug: 'edit-distance',
    difficulty: 'Hard',
    topicTags: ['Dynamic Programming', 'Strings'],
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character`,
    constraints: ['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
    sampleTestCases: [
      { input: '["horse", "ros"]', expectedOutput: '3', explanation: 'horse -> rorse (replace "h" with "r") -> rose (remove "r") -> ros (remove "e").' },
      { input: '["intention", "execution"]', expectedOutput: '5', explanation: '5 character operations.' }
    ],
    hiddenTestCases: [
      { input: '["", ""]', expectedOutput: '0' },
      { input: '["a", "b"]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(word1, word2) {\n  const m = word1.length, n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n    }\n  }\n  return dp[m][n];\n}`,
      python: `def solution(word1, word2):\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i - 1] == word2[j - 1]: dp[i][j] = dp[i - 1][j - 1]\n            else: dp[i][j] = 1 + min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])\n    return dp[m][n]`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(string word1, string word2) {\n    int m = word1.length(), n = word2.length();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for (int i = 0; i <= m; i++) dp[i][0] = i;\n    for (int j = 0; j <= n; j++) dp[0][j] = j;\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n            else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});\n        }\n    }\n    return dp[m][n];\n}`,
      java: `public class Solution {\n    public int solution(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 0; i <= m; i++) dp[i][0] = i;\n        for (int j = 0; j <= n; j++) dp[0][j] = j;\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i - 1) == word2.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];\n                else dp[i][j] = 1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));\n            }\n        }\n        return dp[m][n];\n    }\n}`
    },
    acceptanceRate: 55,
    points: 300,
    hints: ['Classic Wagner-Fischer 2D dynamic programming grid where transition depends on insertion, deletion, or substitution.']
  },

  // ==========================================
  // GREEDY, SEARCHING & LOGIC (68-75)
  // ==========================================
  {
    title: 'Gas Station',
    slug: 'gas-station',
    difficulty: 'Medium',
    topicTags: ['Greedy', 'Arrays'],
    description: `There are \`n\` gas stations along a circular route, where the amount of gas at the \`i\`th station is \`gas[i]\`.\n\nYou have a car with an unlimited gas tank and it costs \`cost[i]\` of gas to travel from the \`i\`th station to its next \`(i + 1)\`th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays \`gas\` and \`cost\`, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return \`-1\`. If there exists a solution, it is guaranteed to be unique.`,
    constraints: ['n == gas.length == cost.length', '1 <= n <= 10^5', '0 <= gas[i], cost[i] <= 10^4'],
    sampleTestCases: [
      { input: '[[1,2,3,4,5], [3,4,5,1,2]]', expectedOutput: '3', explanation: 'Start at station index 3 (gas[3]=4). Tank balance stays >= 0 throughout whole loop.' },
      { input: '[[2,3,4], [3,4,3]]', expectedOutput: '-1', explanation: 'Total gas is 9, total cost is 10. Impossible.' }
    ],
    hiddenTestCases: [
      { input: '[[5,1,2,3,4], [4,4,1,5,1]]', expectedOutput: '4' }
    ],
    starterTemplates: {
      javascript: `function solution(gas, cost) {\n  let totalGas = 0, totalCost = 0;\n  for (let i = 0; i < gas.length; i++) {\n    totalGas += gas[i];\n    totalCost += cost[i];\n  }\n  if (totalGas < totalCost) return -1;\n  let start = 0, tank = 0;\n  for (let i = 0; i < gas.length; i++) {\n    tank += gas[i] - cost[i];\n    if (tank < 0) {\n      start = i + 1;\n      tank = 0;\n    }\n  }\n  return start;\n}`,
      python: `def solution(gas, cost):\n    if sum(gas) < sum(cost): return -1\n    start = 0\n    tank = 0\n    for i in range(len(gas)):\n        tank += gas[i] - cost[i]\n        if tank < 0:\n            start = i + 1\n            tank = 0\n    return start`,
      cpp: `#include <vector>\n#include <numeric>\nusing namespace std;\n\nint solution(vector<int>& gas, vector<int>& cost) {\n    int totalGas = accumulate(gas.begin(), gas.end(), 0);\n    int totalCost = accumulate(cost.begin(), cost.end(), 0);\n    if (totalGas < totalCost) return -1;\n    int start = 0, tank = 0;\n    for (int i = 0; i < gas.size(); i++) {\n        tank += gas[i] - cost[i];\n        if (tank < 0) {\n            start = i + 1;\n            tank = 0;\n        }\n    }\n    return start;\n}`,
      java: `public class Solution {\n    public int solution(int[] gas, int[] cost) {\n        int total = 0, tank = 0, start = 0;\n        for (int i = 0; i < gas.length; i++) {\n            total += gas[i] - cost[i];\n            tank += gas[i] - cost[i];\n            if (tank < 0) {\n                start = i + 1;\n                tank = 0;\n            }\n        }\n        return total < 0 ? -1 : start;\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['If total gas >= total cost, a solution is guaranteed to exist. Whenever the tank drops below 0, reset start to i + 1.']
  },
  {
    title: 'Hand of Straights',
    slug: 'hand-of-straights',
    difficulty: 'Medium',
    topicTags: ['Greedy', 'Searching & Sorting'],
    description: `Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size \`groupSize\`, and consists of \`groupSize\` consecutive cards.\n\nGiven an integer array \`hand\` where \`hand[i]\` is the value written on the \`i\`th card and an integer \`groupSize\`, return \`true\` if she can rearrange the cards, or \`false\` otherwise.`,
    constraints: ['1 <= hand.length <= 10^4', '0 <= hand[i] <= 10^9', '1 <= groupSize <= hand.length'],
    sampleTestCases: [
      { input: '[[1,2,3,6,2,3,4,7,8], 3]', expectedOutput: 'true', explanation: 'Can be rearranged as [1,2,3], [2,3,4], [6,7,8].' },
      { input: '[[1,2,3,4,5], 4]', expectedOutput: 'false', explanation: 'Cannot form groups of size 4.' }
    ],
    hiddenTestCases: [
      { input: '[[8,10,12], 3]', expectedOutput: 'false' },
      { input: '[[1], 1]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(hand, groupSize) {\n  if (hand.length % groupSize !== 0) return false;\n  const count = new Map();\n  for (const n of hand) count.set(n, (count.get(n) || 0) + 1);\n  const sorted = Array.from(count.keys()).sort((a, b) => a - b);\n  for (const key of sorted) {\n    const freq = count.get(key);\n    if (freq > 0) {\n      for (let i = 0; i < groupSize; i++) {\n        const val = key + i;\n        if ((count.get(val) || 0) < freq) return false;\n        count.set(val, count.get(val) - freq);\n      }\n    }\n  }\n  return true;\n}`,
      python: `def solution(hand, groupSize):\n    if len(hand) % groupSize != 0: return False\n    from collections import Counter\n    count = Counter(hand)\n    for card in sorted(count):\n        if count[card] > 0:\n            needed = count[card]\n            for i in range(groupSize):\n                if count[card + i] < needed: return False\n                count[card + i] -= needed\n    return True`,
      cpp: `#include <vector>\n#include <map>\nusing namespace std;\n\nbool solution(vector<int>& hand, int groupSize) {\n    if (hand.size() % groupSize != 0) return false;\n    map<int, int> count;\n    for (int n : hand) count[n]++;\n    for (auto& [card, freq] : count) {\n        if (freq > 0) {\n            int needed = freq;\n            for (int i = 0; i < groupSize; i++) {\n                if (count[card + i] < needed) return false;\n                count[card + i] -= needed;\n            }\n        }\n    }\n    return true;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(int[] hand, int groupSize) {\n        if (hand.length % groupSize != 0) return false;\n        TreeMap<Integer, Integer> map = new TreeMap<>();\n        for (int n : hand) map.put(n, map.getOrDefault(n, 0) + 1);\n        for (int card : map.keySet()) {\n            int freq = map.get(card);\n            if (freq > 0) {\n                for (int i = 0; i < groupSize; i++) {\n                    int next = card + i;\n                    if (map.getOrDefault(next, 0) < freq) return false;\n                    map.put(next, map.get(next) - freq);\n                }\n            }\n        }\n        return true;\n    }\n}`
    },
    acceptanceRate: 56,
    points: 200,
    hints: ['Count card frequencies and greedily form consecutive groups starting from the smallest available card.']
  },
  {
    title: 'Kth Largest Element in an Array',
    slug: 'kth-largest-element-in-an-array',
    difficulty: 'Medium',
    topicTags: ['Searching & Sorting', 'Arrays'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`kth\` largest element in the array.\n\nNote that it is the \`kth\` largest element in the sorted order, not the \`kth\` distinct element. Can you solve it without sorting the entire array?`,
    constraints: ['1 <= k <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleTestCases: [
      { input: '[[3,2,1,5,6,4], 2]', expectedOutput: '5', explanation: 'Sorted order is [1,2,3,4,5,6], second largest is 5.' },
      { input: '[[3,2,3,1,2,4,5,5,6], 4]', expectedOutput: '4', explanation: 'Fourth largest is 4.' }
    ],
    hiddenTestCases: [
      { input: '[[1], 1]', expectedOutput: '1' },
      { input: '[[7,6,5,4,3,2,1], 5]', expectedOutput: '3' }
    ],
    starterTemplates: {
      javascript: `function solution(nums, k) {\n  nums.sort((a, b) => b - a);\n  return nums[k - 1];\n}`,
      python: `def solution(nums, k):\n    import heapq\n    return heapq.nlargest(k, nums)[-1]`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& nums, int k) {\n    nth_element(nums.begin(), nums.begin() + k - 1, nums.end(), greater<int>());\n    return nums[k - 1];\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[] nums, int k) {\n        Arrays.sort(nums);\n        return nums[nums.length - k];\n    }\n}`
    },
    acceptanceRate: 66,
    points: 200,
    hints: ['QuickSelect (partitioning) or a Min-Heap of size k finds the answer in O(N) average time.']
  },
  {
    title: 'Task Scheduler',
    slug: 'task-scheduler',
    difficulty: 'Medium',
    topicTags: ['Greedy', 'Arrays'],
    description: `You are given an array of CPU tasks, each represented by letters A to Z, and a cooling factor \`n\`. Each task takes 1 CPU interval to complete. For each interval, the processor may complete one task or be idle.\n\nHowever, there is a non-negative integer \`n\` that represents the cooldown period between two same tasks (that is, there must be at least \`n\` intervals between any two identical tasks).\n\nReturn the minimum number of intervals the processor will take to finish all the given tasks.`,
    constraints: ['1 <= tasks.length <= 10^4', 'tasks[i] is an uppercase English letter.', '0 <= n <= 100'],
    sampleTestCases: [
      { input: '[["A","A","A","B","B","B"], 2]', expectedOutput: '8', explanation: 'A -> B -> idle -> A -> B -> idle -> A -> B.' },
      { input: '[["A","A","A","B","B","B"], 0]', expectedOutput: '6', explanation: 'No cooling period needed, 6 units.' }
    ],
    hiddenTestCases: [
      { input: '[["A","A","A","A","A","A","B","C","D","E","F","G"], 2]', expectedOutput: '16' }
    ],
    starterTemplates: {
      javascript: `function solution(tasks, n) {\n  const count = {};\n  for (const t of tasks) count[t] = (count[t] || 0) + 1;\n  const maxFreq = Math.max(...Object.values(count));\n  let maxCount = 0;\n  for (const t in count) if (count[t] === maxFreq) maxCount++;\n  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);\n}`,
      python: `def solution(tasks, n):\n    from collections import Counter\n    count = Counter(tasks)\n    max_freq = max(count.values())\n    max_count = sum(1 for v in count.values() if v == max_freq)\n    return max(len(tasks), (max_freq - 1) * (n + 1) + max_count)`,
      cpp: `#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<string>& tasks, int n) {\n    unordered_map<string, int> count;\n    int maxFreq = 0;\n    for (auto& t : tasks) { count[t]++; maxFreq = max(maxFreq, count[t]); }\n    int maxCount = 0;\n    for (auto& [k, v] : count) if (v == maxFreq) maxCount++;\n    return max((int)tasks.size(), (maxFreq - 1) * (n + 1) + maxCount);\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(String[] tasks, int n) {\n        Map<String, Integer> map = new HashMap<>();\n        int maxFreq = 0;\n        for (String t : tasks) {\n            map.put(t, map.getOrDefault(t, 0) + 1);\n            maxFreq = Math.max(maxFreq, map.get(t));\n        }\n        int maxCount = 0;\n        for (int v : map.values()) if (v == maxFreq) maxCount++;\n        return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);\n    }\n}`
    },
    acceptanceRate: 59,
    points: 200,
    hints: ['Find the task with the maximum frequency. Formula: max(tasks.length, (maxFreq - 1) * (n + 1) + numTasksWithMaxFreq).']
  },
  {
    title: 'Valid Sudoku',
    slug: 'valid-sudoku',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Math & Logic'],
    description: `Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n1. Each row must contain the digits 1-9 without repetition.\n2. Each column must contain the digits 1-9 without repetition.\n3. Each of the nine 3 x 3 sub-boxes must contain the digits 1-9 without repetition.\n\nEmpty cells are filled with \`"."\`.`,
    constraints: ['board.length == 9', 'board[i].length == 9', 'board[i][j] is a digit 1-9 or ".".'],
    sampleTestCases: [
      {
        input: '[[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]]',
        expectedOutput: 'true',
        explanation: 'All rows, columns, and 3x3 sub-boxes are valid.'
      },
      {
        input: '[[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]]',
        expectedOutput: 'false',
        explanation: 'Row 0 and Column 0 both have duplicate 8 in top-left 3x3 sub-box.'
      }
    ],
    hiddenTestCases: [
      {
        input: '[[[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".",".","."]]]',
        expectedOutput: 'true'
      }
    ],
    starterTemplates: {
      javascript: `function solution(board) {\n  const rows = Array.from({ length: 9 }, () => new Set());\n  const cols = Array.from({ length: 9 }, () => new Set());\n  const boxes = Array.from({ length: 9 }, () => new Set());\n  for (let r = 0; r < 9; r++) {\n    for (let c = 0; c < 9; c++) {\n      const val = board[r][c];\n      if (val === '.') continue;\n      const boxIdx = Math.floor(r / 3) * 3 + Math.floor(c / 3);\n      if (rows[r].has(val) || cols[c].has(val) || boxes[boxIdx].has(val)) {\n        return false;\n      }\n      rows[r].add(val);\n      cols[c].add(val);\n      boxes[boxIdx].add(val);\n    }\n  }\n  return true;\n}`,
      python: `def solution(board):\n    rows = [set() for _ in range(9)]\n    cols = [set() for _ in range(9)]\n    boxes = [set() for _ in range(9)]\n    for r in range(9):\n        for c in range(9):\n            val = board[r][c]\n            if val == '.': continue\n            b = (r // 3) * 3 + (c // 3)\n            if val in rows[r] or val in cols[c] or val in boxes[b]:\n                return False\n            rows[r].add(val)\n            cols[c].add(val)\n            boxes[b].add(val)\n    return True`,
      cpp: `#include <vector>\n#include <string>\n#include <unordered_set>\nusing namespace std;\n\nbool solution(vector<vector<string>>& board) {\n    unordered_set<string> seen;\n    for (int r = 0; r < 9; r++) {\n        for (int c = 0; c < 9; c++) {\n            string val = board[r][c];\n            if (val == \".\") continue;\n            string rowKey = val + \" in row \" + to_string(r);\n            string colKey = val + \" in col \" + to_string(c);\n            string boxKey = val + \" in box \" + to_string(r/3) + \"-\" + to_string(c/3);\n            if (seen.count(rowKey) || seen.count(colKey) || seen.count(boxKey)) return false;\n            seen.insert(rowKey); seen.insert(colKey); seen.insert(boxKey);\n        }\n    }\n    return true;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(String[][] board) {\n        Set<String> seen = new HashSet<>();\n        for (int r = 0; r < 9; r++) {\n            for (int c = 0; c < 9; c++) {\n                String val = board[r][c];\n                if (val.equals(\".\")) continue;\n                if (!seen.add(val + \" in row \" + r) ||\n                    !seen.add(val + \" in col \" + c) ||\n                    !seen.add(val + \" in box \" + (r/3) + \"-\" + (c/3))) {\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n}`
    },
    acceptanceRate: 59,
    points: 200,
    hints: ['Check row uniqueness, column uniqueness, and 3x3 block uniqueness using 3 sets or encoding string keys.']
  },
  {
    title: 'Search a 2D Matrix',
    slug: 'search-a-2d-matrix',
    difficulty: 'Medium',
    topicTags: ['Searching & Sorting', 'Arrays'],
    description: `You are given an \`m x n\` integer matrix \`matrix\` with the following two properties:\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer \`target\`, return \`true\` if \`target\` is in \`matrix\` or \`false\` otherwise. You must write a solution in \`O(log(m * n))\` time complexity.`,
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 100', '-10^4 <= matrix[i][j], target <= 10^4'],
    sampleTestCases: [
      { input: '[[[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 3]', expectedOutput: 'true', explanation: '3 is present at (0, 1).' },
      { input: '[[[[1,3,5,7],[10,11,16,20],[23,30,34,60]]], 13]', expectedOutput: 'false', explanation: '13 is not in matrix.' }
    ],
    hiddenTestCases: [
      { input: '[[[[1]]], 1]', expectedOutput: 'true' },
      { input: '[[[[1]]], 0]', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(matrix, target) {\n  const m = matrix.length, n = matrix[0].length;\n  let low = 0, high = m * n - 1;\n  while (low <= high) {\n    const mid = Math.floor((low + high) / 2);\n    const val = matrix[Math.floor(mid / n)][mid % n];\n    if (val === target) return true;\n    if (val < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return false;\n}`,
      python: `def solution(matrix, target):\n    m, n = len(matrix), len(matrix[0])\n    low, high = 0, m * n - 1\n    while low <= high:\n        mid = (low + high) // 2\n        val = matrix[mid // n][mid % n]\n        if val == target: return True\n        elif val < target: low = mid + 1\n        else: high = mid - 1\n    return False`,
      cpp: `#include <vector>\nusing namespace std;\n\nbool solution(vector<vector<int>>& matrix, int target) {\n    int m = matrix.size(), n = matrix[0].size();\n    int low = 0, high = m * n - 1;\n    while (low <= high) {\n        int mid = (low + high) / 2;\n        int val = matrix[mid / n][mid % n];\n        if (val == target) return true;\n        if (val < target) low = mid + 1;\n        else high = mid - 1;\n    }\n    return false;\n}`,
      java: `public class Solution {\n    public boolean solution(int[][] matrix, int target) {\n        int m = matrix.length, n = matrix[0].length;\n        int low = 0, high = m * n - 1;\n        while (low <= high) {\n            int mid = (low + high) / 2;\n            int val = matrix[mid / n][mid % n];\n            if (val == target) return true;\n            if (val < target) low = mid + 1;\n            else high = mid - 1;\n        }\n        return false;\n    }\n}`
    },
    acceptanceRate: 49,
    points: 200,
    hints: ['Treat the 2D matrix as a virtual 1D sorted array of length m * n and binary search. Index mapping: row = mid / n, col = mid % n.']
  },
  {
    title: 'Min Cost Climbing Stairs',
    slug: 'min-cost-climbing-stairs',
    difficulty: 'Easy',
    topicTags: ['Dynamic Programming', 'Arrays'],
    description: `You are given an integer array \`cost\` where \`cost[i]\` is the cost of \`i\`th step on a staircase. Once you pay the cost, you can either climb one or two steps.\n\nYou can either start from the step with index \`0\`, or the step with index \`1\`.\n\nReturn the minimum cost to reach the top of the floor.`,
    constraints: ['2 <= cost.length <= 1000', '0 <= cost[i] <= 999'],
    sampleTestCases: [
      { input: '[[10,15,20]]', expectedOutput: '15', explanation: 'Start at index 1, pay 15 and climb two steps to reach top.' },
      { input: '[[1,100,1,1,1,100,1,1,100,1]]', expectedOutput: '6', explanation: 'Step on 1s, paying 6 total.' }
    ],
    hiddenTestCases: [
      { input: '[[0,0]]', expectedOutput: '0' },
      { input: '[[0,1,2,2]]', expectedOutput: '2' }
    ],
    starterTemplates: {
      javascript: `function solution(cost) {\n  let first = cost[0];\n  let second = cost[1];\n  for (let i = 2; i < cost.length; i++) {\n    const curr = cost[i] + Math.min(first, second);\n    first = second;\n    second = curr;\n  }\n  return Math.min(first, second);\n}`,
      python: `def solution(cost):\n    first, second = cost[0], cost[1]\n    for i in range(2, len(cost)):\n        first, second = second, cost[i] + min(first, second)\n    return min(first, second)`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& cost) {\n    int first = cost[0], second = cost[1];\n    for (size_t i = 2; i < cost.size(); i++) {\n        int curr = cost[i] + min(first, second);\n        first = second; second = curr;\n    }\n    return min(first, second);\n}`,
      java: `public class Solution {\n    public int solution(int[] cost) {\n        int first = cost[0], second = cost[1];\n        for (int i = 2; i < cost.length; i++) {\n            int curr = cost[i] + Math.min(first, second);\n            first = second; second = curr;\n        }\n        return Math.min(first, second);\n    }\n}`
    },
    acceptanceRate: 65,
    points: 100,
    hints: ['dp[i] = cost[i] + min(dp[i-1], dp[i-2]). Keep only previous two states for O(1) space.']
  },
  {
    title: 'Longest Common Subsequence',
    slug: 'longest-common-subsequence',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Strings'],
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return \`0\`.\n\nA subsequence of a string is a new string generated from the original string with some characters (can be none) deleted without changing the relative order of the remaining characters.`,
    constraints: ['1 <= text1.length, text2.length <= 1000', 'text1 and text2 consist of only lowercase English characters.'],
    sampleTestCases: [
      { input: '["abcde", "ace"]', expectedOutput: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
      { input: '["abc", "abc"]', expectedOutput: '3', explanation: 'Identical strings.' }
    ],
    hiddenTestCases: [
      { input: '["abc", "def"]', expectedOutput: '0' },
      { input: '["bsbininm", "jmjkbkjkv"]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n  return dp[m][n];\n}`,
      python: `def solution(text1, text2):\n    m, n = len(text1), len(text2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if text1[i - 1] == text2[j - 1]: dp[i][j] = 1 + dp[i - 1][j - 1]\n            else: dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])\n    return dp[m][n]`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(string text1, string text2) {\n    int m = text1.length(), n = text2.length();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (text1[i - 1] == text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];\n            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);\n        }\n    }\n    return dp[m][n];\n}`,
      java: `public class Solution {\n    public int solution(String text1, String text2) {\n        int m = text1.length(), n = text2.length();\n        int[][] dp = new int[m + 1][n + 1];\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (text1.charAt(i - 1) == text2.charAt(j - 1)) dp[i][j] = 1 + dp[i - 1][j - 1];\n                else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n            }\n        }\n        return dp[m][n];\n    }\n}`
    },
    acceptanceRate: 58,
    points: 200,
    hints: ['If characters match, 1 + LCS(i-1, j-1); otherwise max(LCS(i-1, j), LCS(i, j-1)).']
  }
];
