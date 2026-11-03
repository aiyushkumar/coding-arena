import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { SkillProfile } from '../models/SkillProfile.js';
import { Problem } from '../models/Problem.js';
import { AssessmentQuestion } from '../models/AssessmentQuestion.js';
import { Contest } from '../models/Contest.js';
import { connectDB, closeDB } from '../config/db.js';

export const assessmentQuestionsData = [
  {
    topic: 'Arrays',
    difficulty: 'Easy',
    question: 'Given an unsorted array of integers, which approach finds if two numbers sum to a specific target in optimal $O(N)$ time?',
    codeSnippet: 'function hasPairWithSum(arr, target) {\n  // What data structure provides O(1) average lookup?\n}',
    options: [
      'Two nested loops checking every pair (Brute Force)',
      'A Hash Set / Hash Map storing seen complements',
      'Sorting the array then running linear search from both ends in O(N^2)',
      'Converting array to a linked list'
    ],
    correctOptionIndex: 1,
    explanation: 'A Hash Set allows checking whether target - current_val was already encountered in O(1) average time, resulting in overall O(N) time complexity.',
    weight: 20
  },
  {
    topic: 'Strings',
    difficulty: 'Medium',
    question: 'To verify whether a string containing parentheses, braces, and brackets is valid, which data structure is most appropriate?',
    codeSnippet: 'const s = "{[()]}";\n// How to match the most recently opened symbol first?',
    options: [
      'First-In First-Out Queue',
      'Last-In First-Out Stack',
      'Binary Search Tree',
      'Priority Heap'
    ],
    correctOptionIndex: 1,
    explanation: 'A Stack (LIFO) ensures that the most recently opened bracket is the first one closed and matched against its counterpart.',
    weight: 20
  },
  {
    topic: 'Dynamic Programming',
    difficulty: 'Medium',
    question: 'In the classic 0/1 Knapsack problem with weights and values, what characterizes the optimal substructure?',
    codeSnippet: 'dp[i][w] = Math.max(\n  dp[i-1][w],\n  val[i-1] + dp[i-1][w - wt[i-1]]\n);',
    options: [
      'Greedy choice at each step always yields global optimum',
      'Subproblems are independent and never overlap',
      'The optimal solution for capacity w either includes the i-th item or excludes it, built from optimal solutions of sub-capacities',
      'Binary search over the weights array directly computes max value'
    ],
    correctOptionIndex: 2,
    explanation: 'For each item, we have binary choices: either include it (taking capacity and adding value) or exclude it, memoizing answers to overlapping subproblems.',
    weight: 25
  },
  {
    topic: 'Graphs',
    difficulty: 'Medium',
    question: 'Which algorithm is best suited to find the shortest path between two nodes in an unweighted directed graph?',
    codeSnippet: 'function shortestPath(graph, start, target) {\n  // Which traversal explores level by level?\n}',
    options: [
      'Breadth-First Search (BFS)',
      'Depth-First Search (DFS)',
      'Floyd-Warshall Algorithm',
      'Kruskal Minimum Spanning Tree'
    ],
    correctOptionIndex: 0,
    explanation: 'Breadth-First Search traverses nodes level-by-level (by edge distance), guaranteeing the shortest path in unweighted graphs in O(V + E) time.',
    weight: 25
  },
  {
    topic: 'Trees',
    difficulty: 'Easy',
    question: 'In a Binary Search Tree (BST), what traversal order outputs the node values in strictly ascending sorted order?',
    codeSnippet: 'function traverse(root) {\n  if (!root) return;\n  // What sequence?\n}',
    options: [
      'Pre-order traversal (Root, Left, Right)',
      'Post-order traversal (Left, Right, Root)',
      'In-order traversal (Left, Root, Right)',
      'Level-order traversal (Breadth first)'
    ],
    correctOptionIndex: 2,
    explanation: 'In-order traversal visits left subtree (all smaller values), then root, then right subtree (all larger values), resulting in non-decreasing order.',
    weight: 20
  },
  {
    topic: 'Searching & Sorting',
    difficulty: 'Easy',
    question: 'Binary search can only be applied when which precondition is satisfied?',
    codeSnippet: 'function binarySearch(arr, target) {\n  let low = 0, high = arr.length - 1;\n  // Precondition?\n}',
    options: [
      'The elements are all positive integers',
      'The collection is sorted and supports O(1) random access',
      'The length of the array is a power of 2',
      'The array contains no duplicate values'
    ],
    correctOptionIndex: 1,
    explanation: 'Binary search relies on monotonic ordering (sorted) and random index access to divide the search space in half at each step.',
    weight: 20
  },
  {
    topic: 'Math & Logic',
    difficulty: 'Medium',
    question: 'Which bitwise operation allows finding the single non-duplicate number in an array where every other element appears exactly twice?',
    codeSnippet: 'let res = 0;\nfor (let num of nums) {\n  res = res ? num; // Which operator?\n}',
    options: [
      'Bitwise AND (&)',
      'Bitwise OR (|)',
      'Bitwise XOR (^)',
      'Left Shift (<<)'
    ],
    correctOptionIndex: 2,
    explanation: 'Because a ^ a = 0 and a ^ 0 = a, XORing all elements together cancels out all pairs, leaving solely the unique element in O(N) time and O(1) space.',
    weight: 20
  },
  {
    topic: 'Greedy',
    difficulty: 'Medium',
    question: 'In the Activity Selection Problem (scheduling non-overlapping meetings), what is the optimal greedy strategy?',
    codeSnippet: 'activities.sort((a, b) => /* Which metric? */);',
    options: [
      'Sort by earliest start time',
      'Sort by shortest duration',
      'Sort by earliest finish time',
      'Sort by latest finish time'
    ],
    correctOptionIndex: 2,
    explanation: 'Sorting by earliest finish time leaves the maximum possible free time for subsequent activities, which guarantees maximum compatible activities.',
    weight: 20
  }
];

export const problemsData = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    sampleTestCases: [
      {
        input: '[[2,7,11,15], 9]',
        expectedOutput: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: '[[3,2,4], 6]',
        expectedOutput: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    hiddenTestCases: [
      { input: '[[3,3], 6]', expectedOutput: '[0,1]' },
      { input: '[[1,5,8,12,17], 20]', expectedOutput: '[2,3]' },
      { input: '[[-1,-2,-3,-4,-5], -8]', expectedOutput: '[2,4]' }
    ],
    starterTemplates: {
      javascript: `function solution(nums, target) {
  // Use a hash map to map value -> index
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def solution(nums, target):
    mapping = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in mapping:
            return [mapping[diff], i]
        mapping[num] = i
    return []`,
      cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> solution(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        int comp = target - nums[i];
        if (seen.count(comp)) return {seen[comp], i};
        seen[nums[i]] = i;
    }
    return {};
}`,
      java: `import java.util.*;

public class Solution {
    public int[] solution(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int comp = target - nums[i];
            if (map.containsKey(comp)) return new int[]{map.get(comp), i};
            map.put(nums[i], i);
        }
        return new int[]{};
    }
}`
    },
    points: 50,
    acceptanceRate: 88,
    hints: [
      'Can you solve this without checking every pair with nested loops?',
      'As you iterate through the list, what value are you searching for?',
      'Store each number and its index in a hash map so you can lookup the complement in O(1) time.'
    ]
  },
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topicTags: ['Strings'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only "()[]{}"'
    ],
    sampleTestCases: [
      {
        input: '"()"',
        expectedOutput: 'true',
        explanation: 'Simple valid parenthesis pair.'
      },
      {
        input: '"()[]{}"',
        expectedOutput: 'true',
        explanation: 'All bracket types properly opened and closed in order.'
      },
      {
        input: '"(]"',
        expectedOutput: 'false',
        explanation: 'Mismatched closing bracket.'
      }
    ],
    hiddenTestCases: [
      { input: '"([)]"', expectedOutput: 'false' },
      { input: '"{[]}"', expectedOutput: 'true' },
      { input: '"]"', expectedOutput: 'false' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };
  for (let char of s) {
    if (char in map) {
      if (stack.length === 0 || stack.pop() !== map[char]) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length === 0;
}`,
      python: `def solution(s):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack`,
      cpp: `#include <string>
#include <stack>
using namespace std;

bool solution(string s) {
    stack<char> st;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') st.push(c);
        else {
            if (st.empty()) return false;
            if (c == ')' && st.top() != '(') return false;
            if (c == '}' && st.top() != '{') return false;
            if (c == ']' && st.top() != '[') return false;
            st.pop();
        }
    }
    return st.empty();
}`,
      java: `import java.util.Stack;

public class Solution {
    public boolean solution(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) return false;
        }
        return stack.isEmpty();
    }
}`
    },
    points: 50,
    acceptanceRate: 79,
    hints: [
      'Think about LIFO (Last-In-First-Out) order.',
      'Whenever you see an opening bracket, push it to a stack.',
      'Whenever you see a closing bracket, check if the stack is non-empty and whether the top matches.'
    ]
  },
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    topicTags: ['Dynamic Programming', 'Math & Logic'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    constraints: [
      '1 <= n <= 45'
    ],
    sampleTestCases: [
      {
        input: '2',
        expectedOutput: '2',
        explanation: 'There are two ways: 1 step + 1 step, or 2 steps.'
      },
      {
        input: '3',
        expectedOutput: '3',
        explanation: 'Three ways: (1+1+1), (1+2), (2+1).'
      }
    ],
    hiddenTestCases: [
      { input: '4', expectedOutput: '5' },
      { input: '5', expectedOutput: '8' },
      { input: '10', expectedOutput: '89' }
    ],
    starterTemplates: {
      javascript: `function solution(n) {
  if (n <= 2) return n;
  let first = 1;
  let second = 2;
  for (let i = 3; i <= n; i++) {
    let third = first + second;
    first = second;
    second = third;
  }
  return second;
}`,
      python: `def solution(n):
    if n <= 2:
        return n
    a, b = 1, 2
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,
      cpp: `int solution(int n) {
    if (n <= 2) return n;
    int a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        int c = a + b;
        a = b;
        b = c;
    }
    return b;
}`,
      java: `public class Solution {
    public int solution(int n) {
        if (n <= 2) return n;
        int a = 1, b = 2;
        for (int i = 3; i <= n; i++) {
            int c = a + b;
            a = b;
            b = c;
        }
        return b;
    }
}`
    },
    points: 60,
    acceptanceRate: 82,
    hints: [
      'To reach step n, you could have arrived from step n-1 or step n-2.',
      'Therefore ways(n) = ways(n-1) + ways(n-2).',
      'Notice this is identical to the Fibonacci sequence.'
    ]
  },
  {
    title: 'Maximum Subarray (Kadane)',
    slug: 'maximum-subarray',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Dynamic Programming'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    sampleTestCases: [
      {
        input: '[-2,1,-3,4,-1,2,1,-5,4]',
        expectedOutput: '6',
        explanation: 'The subarray [4,-1,2,1] has the largest sum 6.'
      },
      {
        input: '[1]',
        expectedOutput: '1',
        explanation: 'Single element array.'
      },
      {
        input: '[5,4,-1,7,8]',
        expectedOutput: '23',
        explanation: 'The entire array adds up to 23.'
      }
    ],
    hiddenTestCases: [
      { input: '[-1]', expectedOutput: '-1' },
      { input: '[-2,-1]', expectedOutput: '-1' },
      { input: '[1,2,3,-1,5]', expectedOutput: '10' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  return maxSoFar;
}`,
      python: `def solution(nums):
    max_so_far = nums[0]
    curr_max = nums[0]
    for num in nums[1:]:
        curr_max = max(num, curr_max + num)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int solution(vector<int>& nums) {
    int maxSoFar = nums[0];
    int currentMax = nums[0];
    for (size_t i = 1; i < nums.size(); i++) {
        currentMax = max(nums[i], currentMax + nums[i]);
        maxSoFar = max(maxSoFar, currentMax);
    }
    return maxSoFar;
}`,
      java: `public class Solution {
    public int solution(int[] nums) {
        int maxSoFar = nums[0];
        int currentMax = nums[0];
        for (int i = 1; i < nums.length; i++) {
            currentMax = Math.max(nums[i], currentMax + nums[i]);
            maxSoFar = Math.max(maxSoFar, currentMax);
        }
        return maxSoFar;
    }
}`
    },
    points: 100,
    acceptanceRate: 64,
    hints: [
      'If current contiguous sum becomes negative, would keeping it benefit future numbers?',
      'At each index i, decide whether to append to current sum or start fresh at nums[i].',
      'This linear O(N) strategy is known as Kadane Algorithm.'
    ]
  },
  {
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    sampleTestCases: [
      {
        input: '[[1,2,5], 11]',
        expectedOutput: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total).'
      },
      {
        input: '[[2], 3]',
        expectedOutput: '-1',
        explanation: 'Amount 3 cannot be made with coin 2.'
      },
      {
        input: '[[1], 0]',
        expectedOutput: '0',
        explanation: '0 amount requires 0 coins.'
      }
    ],
    hiddenTestCases: [
      { input: '[[2,5,10,1], 27]', expectedOutput: '4' },
      { input: '[[186,419,83,408], 6249]', expectedOutput: '20' }
    ],
    starterTemplates: {
      javascript: `function solution(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
      python: `def solution(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int solution(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) {
                dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      java: `import java.util.Arrays;

public class Solution {
    public int solution(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`
    },
    points: 120,
    acceptanceRate: 52,
    hints: [
      'Define dp[i] as the minimum coins needed to make amount i.',
      'Base case: dp[0] = 0, and all other amounts initialized to infinity.',
      'For each amount from 1 to total, try every coin that fits: dp[i] = min(dp[i], dp[i - coin] + 1).'
    ]
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    topicTags: ['Graphs', 'Searching & Sorting'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is "0" or "1".'
    ],
    sampleTestCases: [
      {
        input: '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        expectedOutput: '1',
        explanation: 'All lands are connected horizontally or vertically into 1 island.'
      },
      {
        input: '[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        expectedOutput: '3',
        explanation: 'Three separate islands.'
      }
    ],
    hiddenTestCases: [
      {
        input: '[["1","0","1"],["0","1","0"],["1","0","1"]]',
        expectedOutput: '5'
      }
    ],
    starterTemplates: {
      javascript: `function solution(grid) {
  if (!grid || grid.length === 0) return 0;
  let count = 0;
  const rows = grid.length;
  const cols = grid[0].length;

  function dfs(r, c) {
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}`,
      python: `def solution(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    count = 0
    def dfs(r, c):
        if r < 0 or c < 0 or r >= rows or c >= cols or grid[r][c] == '0':
            return
        grid[r][c] = '0'
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1':
                count += 1
                dfs(r, c)
    return count`,
      cpp: `#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0') return;
    grid[r][c] = '0';
    dfs(grid, r+1, c);
    dfs(grid, r-1, c);
    dfs(grid, r, c+1);
    dfs(grid, r, c-1);
}

int solution(vector<vector<char>>& grid) {
    if (grid.empty()) return 0;
    int count = 0;
    for (int r = 0; r < grid.size(); r++) {
        for (int c = 0; c < grid[0].size(); c++) {
            if (grid[r][c] == '1') {
                count++;
                dfs(grid, r, c);
            }
        }
    }
    return count;
}`,
      java: `public class Solution {
    public int solution(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;
        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == '1') {
                    count++;
                    dfs(grid, r, c);
                }
            }
        }
        return count;
    }
    void dfs(char[][] grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`
    },
    points: 100,
    acceptanceRate: 58,
    hints: [
      'Treat the grid as an undirected graph where lands "1" are connected to 4 neighbors.',
      'Whenever you encounter an unvisited land cell, trigger a traversal (DFS or BFS).',
      'Mark visited cells in-place by turning them into "0" to save auxiliary memory.'
    ]
  },
  {
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    topicTags: ['Arrays', 'Dynamic Programming', 'Greedy'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: [
      'n == height.length',
      '1 <= n <= 2 * 10^4',
      '0 <= height[i] <= 10^5'
    ],
    sampleTestCases: [
      {
        input: '[0,1,0,2,1,0,1,3,2,1,2,1]',
        expectedOutput: '6',
        explanation: 'The elevation map traps 6 units of rain water.'
      },
      {
        input: '[4,2,0,3,2,5]',
        expectedOutput: '9',
        explanation: 'Water trapped between 4 and 5 bar walls.'
      }
    ],
    hiddenTestCases: [
      { input: '[3,0,2,0,4]', expectedOutput: '7' },
      { input: '[2,0,2]', expectedOutput: '2' },
      { input: '[1,2,3,4,5]', expectedOutput: '0' }
    ],
    starterTemplates: {
      javascript: `function solution(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        totalWater += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        totalWater += rightMax - height[right];
      }
      right--;
    }
  }
  return totalWater;
}`,
      python: `def solution(height):
    left, right = 0, len(height) - 1
    left_max, right_max = 0, 0
    total = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= left_max:
                left_max = height[left]
            else:
                total += left_max - height[left]
            left += 1
        else:
            if height[right] >= right_max:
                right_max = height[right]
            else:
                total += right_max - height[right]
            right -= 1
    return total`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int solution(vector<int>& height) {
    int left = 0, right = height.size() - 1;
    int leftMax = 0, rightMax = 0, total = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else total += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else total += rightMax - height[right];
            right--;
        }
    }
    return total;
}`,
      java: `public class Solution {
    public int solution(int[] height) {
        int left = 0, right = height.length - 1;
        int leftMax = 0, rightMax = 0, total = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= leftMax) leftMax = height[left];
                else total += leftMax - height[left];
                left++;
            } else {
                if (height[right] >= rightMax) rightMax = height[right];
                else total += rightMax - height[right];
                right--;
            }
        }
        return total;
    }
}`
    },
    points: 200,
    acceptanceRate: 46,
    hints: [
      'For any index i, how much water can be stored above bar i?',
      'Water at i = min(max_left_wall, max_right_wall) - height[i].',
      'Can you maintain the maximum walls from left and right using Two Pointers in O(N) time and O(1) space?'
    ]
  }
];

export const seedDatabase = async () => {
  try {
    console.log('[Seed] Seeding database collections...');

    // 1. Assessment Questions
    await AssessmentQuestion.deleteMany({});
    await AssessmentQuestion.insertMany(assessmentQuestionsData);
    console.log(`[Seed] Seeded ${assessmentQuestionsData.length} diagnostic assessment questions.`);

    // 2. Problems
    await Problem.deleteMany({});
    const createdProblems = await Problem.insertMany(problemsData);
    console.log(`[Seed] Seeded ${createdProblems.length} algorithmic problems.`);

    // 3. Demo Users
    await User.deleteMany({});
    await SkillProfile.deleteMany({});

    const demoUsers = [
      {
        name: 'Alex Rivera',
        email: 'alex@arena.dev',
        password: 'password123',
        rating: 1980,
        points: 1250,
        hasCompletedAssessment: true,
        profile: {
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Alex',
          bio: 'Competitive programmer | Dynamic Programming fanatic',
          totalSolved: 34,
          easySolved: 14,
          mediumSolved: 16,
          hardSolved: 4
        },
        topicScores: {
          'Arrays': 88,
          'Strings': 80,
          'Dynamic Programming': 92,
          'Graphs': 74,
          'Trees': 78,
          'Searching & Sorting': 85,
          'Math & Logic': 70,
          'Greedy': 82
        }
      },
      {
        name: 'Sarah Chen',
        email: 'sarah@arena.dev',
        password: 'password123',
        rating: 1820,
        points: 980,
        hasCompletedAssessment: true,
        profile: {
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sarah',
          bio: 'Software engineer at cloud infra | Graph theory enthusiast',
          totalSolved: 26,
          easySolved: 12,
          mediumSolved: 12,
          hardSolved: 2
        },
        topicScores: {
          'Arrays': 75,
          'Strings': 70,
          'Dynamic Programming': 60,
          'Graphs': 88,
          'Trees': 82,
          'Searching & Sorting': 78,
          'Math & Logic': 65,
          'Greedy': 68
        }
      },
      {
        name: 'David Kim',
        email: 'david@arena.dev',
        password: 'password123',
        rating: 1540,
        points: 620,
        hasCompletedAssessment: true,
        profile: {
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=David',
          bio: 'Computer Science undergrad | Leveling up my data structures',
          totalSolved: 18,
          easySolved: 10,
          mediumSolved: 7,
          hardSolved: 1
        },
        topicScores: {
          'Arrays': 65,
          'Strings': 60,
          'Dynamic Programming': 35, // Weakness!
          'Graphs': 40,              // Weakness!
          'Trees': 55,
          'Searching & Sorting': 62,
          'Math & Logic': 50,
          'Greedy': 48
        }
      },
      {
        name: 'Demo Student',
        email: 'demo@codingarena.io',
        password: 'password123',
        rating: 1250,
        points: 150,
        hasCompletedAssessment: false, // Needs assessment onboarding!
        profile: {
          avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=Student',
          bio: 'Exploring competitive algorithms with Coding Arena AI tutor',
          totalSolved: 3,
          easySolved: 2,
          mediumSolved: 1,
          hardSolved: 0
        },
        topicScores: {
          'Arrays': 45,
          'Strings': 40,
          'Dynamic Programming': 25,
          'Graphs': 30,
          'Trees': 35,
          'Searching & Sorting': 50,
          'Math & Logic': 35,
          'Greedy': 30
        }
      }
    ];

    const insertedUsers = [];
    for (const u of demoUsers) {
      const user = await User.create({
        name: u.name,
        email: u.email,
        password: u.password,
        rating: u.rating,
        points: u.points,
        hasCompletedAssessment: u.hasCompletedAssessment,
        profile: u.profile
      });

      const skillProfile = await SkillProfile.create({
        user: user._id,
        topicScores: u.topicScores
      });
      skillProfile.updateStrengthsAndWeaknesses();
      await skillProfile.save();

      insertedUsers.push(user);
    }
    console.log(`[Seed] Seeded ${insertedUsers.length} sample users with skill profiles.`);

    // 4. Contests
    await Contest.deleteMany({});
    const now = new Date();

    const activeStart = new Date(now.getTime() - 45 * 60 * 1000); // started 45 mins ago
    const activeEnd = new Date(now.getTime() + 75 * 60 * 1000);   // ends in 75 mins

    const upcomingStart = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days later
    const upcomingEnd = new Date(upcomingStart.getTime() + 120 * 60 * 1000);

    const pastStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const pastEnd = new Date(pastStart.getTime() + 120 * 60 * 1000);

    const contests = [
      {
        title: 'ByteBlitz Speed Challenge 2026',
        description: 'High-intensity 2-hour algorithmic showdown testing dynamic programming, graph traversal, and two-pointer optimizations.',
        startTime: activeStart,
        endTime: activeEnd,
        problems: [
          { problem: createdProblems[0]._id, points: 100, order: 1 },
          { problem: createdProblems[3]._id, points: 200, order: 2 },
          { problem: createdProblems[5]._id, points: 300, order: 3 }
        ],
        registeredUsers: [
          { user: insertedUsers[0]._id },
          { user: insertedUsers[1]._id },
          { user: insertedUsers[2]._id }
        ],
        scoreboard: [
          {
            user: insertedUsers[0]._id,
            username: insertedUsers[0].name,
            avatar: insertedUsers[0].profile.avatar,
            score: 600,
            penaltyTime: 42,
            rank: 1,
            problemStats: [
              { problem: createdProblems[0]._id, solved: true, wrongAttempts: 0, pointsAwarded: 100 },
              { problem: createdProblems[3]._id, solved: true, wrongAttempts: 1, pointsAwarded: 200 },
              { problem: createdProblems[5]._id, solved: true, wrongAttempts: 0, pointsAwarded: 300 }
            ]
          },
          {
            user: insertedUsers[1]._id,
            username: insertedUsers[1].name,
            avatar: insertedUsers[1].profile.avatar,
            score: 300,
            penaltyTime: 38,
            rank: 2,
            problemStats: [
              { problem: createdProblems[0]._id, solved: true, wrongAttempts: 0, pointsAwarded: 100 },
              { problem: createdProblems[3]._id, solved: true, wrongAttempts: 0, pointsAwarded: 200 }
            ]
          },
          {
            user: insertedUsers[2]._id,
            username: insertedUsers[2].name,
            avatar: insertedUsers[2].profile.avatar,
            score: 100,
            penaltyTime: 14,
            rank: 3,
            problemStats: [
              { problem: createdProblems[0]._id, solved: true, wrongAttempts: 0, pointsAwarded: 100 }
            ]
          }
        ]
      },
      {
        title: 'Weekly Arena Grand Prix #48',
        description: 'Our flagship weekly tournament featuring four progressively challenging problems. Climb the global rankings!',
        startTime: upcomingStart,
        endTime: upcomingEnd,
        problems: [
          { problem: createdProblems[1]._id, points: 100, order: 1 },
          { problem: createdProblems[2]._id, points: 200, order: 2 },
          { problem: createdProblems[4]._id, points: 300, order: 3 },
          { problem: createdProblems[6]._id, points: 500, order: 4 }
        ],
        registeredUsers: [
          { user: insertedUsers[0]._id },
          { user: insertedUsers[1]._id }
        ],
        scoreboard: []
      },
      {
        title: 'Dynamic Programming Invitational Cup',
        description: 'Targeted tournament focused exclusively on memoization, 2D state transitions, and knapsack variants.',
        startTime: pastStart,
        endTime: pastEnd,
        problems: [
          { problem: createdProblems[2]._id, points: 100, order: 1 },
          { problem: createdProblems[3]._id, points: 250, order: 2 },
          { problem: createdProblems[4]._id, points: 400, order: 3 }
        ],
        registeredUsers: [
          { user: insertedUsers[0]._id },
          { user: insertedUsers[1]._id },
          { user: insertedUsers[2]._id }
        ],
        scoreboard: [
          {
            user: insertedUsers[0]._id,
            username: insertedUsers[0].name,
            avatar: insertedUsers[0].profile.avatar,
            score: 750,
            penaltyTime: 65,
            rank: 1
          },
          {
            user: insertedUsers[1]._id,
            username: insertedUsers[1].name,
            avatar: insertedUsers[1].profile.avatar,
            score: 350,
            penaltyTime: 50,
            rank: 2
          }
        ]
      }
    ];

    await Contest.insertMany(contests);
    console.log(`[Seed] Seeded ${contests.length} contests (Active, Upcoming, Past).`);
    console.log('[Seed] Database seeding completed successfully!');
  } catch (err) {
    console.error('[Seed] Error during seeding:', err);
    throw err;
  }
};

// If run directly via node seedData.js
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  (async () => {
    try {
      await connectDB();
      await seedDatabase();
      await closeDB();
      process.exit(0);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  })();
}
