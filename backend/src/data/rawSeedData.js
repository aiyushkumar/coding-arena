import { extraProblemsData } from './extraProblemsData.js';

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
      'Bitwise NOT (~)'
    ],
    correctOptionIndex: 2,
    explanation: 'XOR has two key properties: a ^ a = 0 and a ^ 0 = a. XORing all elements eliminates duplicates and leaves the single unique element in O(N) time and O(1) space.',
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

const baseProblemsData = [
  // ==========================================
  // ARRAYS & HASHING (1-10)
  // ==========================================
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9'],
    sampleTestCases: [
      { input: '[[2,7,11,15], 9]', expectedOutput: '[0,1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: '[[3,2,4], 6]', expectedOutput: '[1,2]', explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].' }
    ],
    hiddenTestCases: [
      { input: '[[3,3], 6]', expectedOutput: '[0,1]' },
      { input: '[[1,5,8,12,17], 20]', expectedOutput: '[2,3]' },
      { input: '[[-1,-2,-3,-4,-5], -8]', expectedOutput: '[2,4]' }
    ],
    starterTemplates: {
      javascript: `function solution(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def solution(nums, target):\n    mapping = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in mapping:\n            return [mapping[diff], i]\n        mapping[num] = i\n    return []`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nvector<int> solution(vector<int>& nums, int target) {\n    unordered_map<int, int> seen;\n    for (int i = 0; i < nums.size(); ++i) {\n        int diff = target - nums[i];\n        if (seen.count(diff)) return {seen[diff], i};\n        seen[nums[i]] = i;\n    }\n    return {};\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[] solution(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[]{map.get(diff), i};\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}`
    },
    acceptanceRate: 51,
    points: 100,
    hints: ['Can you solve it in a single pass using a hash map to look up previous elements?']
  },
  {
    title: 'Contains Duplicate',
    slug: 'contains-duplicate',
    difficulty: 'Easy',
    topicTags: ['Arrays'],
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    sampleTestCases: [
      { input: '[[1,2,3,1]]', expectedOutput: 'true', explanation: '1 appears twice.' },
      { input: '[[1,2,3,4]]', expectedOutput: 'false', explanation: 'All elements are distinct.' }
    ],
    hiddenTestCases: [
      { input: '[[1,1,1,3,3,4,3,2,4,2]]', expectedOutput: 'true' },
      { input: '[[0]]', expectedOutput: 'false' },
      { input: '[[2,14,18,22,22]]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const set = new Set();\n  for (const n of nums) {\n    if (set.has(n)) return true;\n    set.add(n);\n  }\n  return false;\n}`,
      python: `def solution(nums):\n    return len(nums) != len(set(nums))`,
      cpp: `#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nbool solution(vector<int>& nums) {\n    unordered_set<int> s(nums.begin(), nums.end());\n    return s.size() < nums.size();\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(int[] nums) {\n        Set<Integer> s = new HashSet<>();\n        for (int x : nums) if (!s.add(x)) return true;\n        return false;\n    }\n}`
    },
    acceptanceRate: 62,
    points: 100,
    hints: ['A Hash Set stores elements and lets you check membership in O(1).']
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    topicTags: ['Strings', 'Arrays'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.\n\nAn Anagram is a word formed by rearranging the letters of a different word using all original letters exactly once.`,
    constraints: ['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
    sampleTestCases: [
      { input: '["anagram", "nagaram"]', expectedOutput: 'true', explanation: 'Same frequency of every letter.' },
      { input: '["rat", "car"]', expectedOutput: 'false', explanation: 'Different letters.' }
    ],
    hiddenTestCases: [
      { input: '["a", "a"]', expectedOutput: 'true' },
      { input: '["ab", "a"]', expectedOutput: 'false' },
      { input: '["listen", "silent"]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(s, t) {\n  if (s.length !== t.length) return false;\n  const count = {};\n  for (const c of s) count[c] = (count[c] || 0) + 1;\n  for (const c of t) {\n    if (!count[c]) return false;\n    count[c]--;\n  }\n  return true;\n}`,
      python: `def solution(s, t):\n    from collections import Counter\n    return Counter(s) == Counter(t)`,
      cpp: `#include <string>\n#include <vector>\nusing namespace std;\n\nbool solution(string s, string t) {\n    if (s.length() != t.length()) return false;\n    vector<int> count(26, 0);\n    for (int i = 0; i < s.length(); i++) {\n        count[s[i] - 'a']++;\n        count[t[i] - 'a']--;\n    }\n    for (int c : count) if (c != 0) return false;\n    return true;\n}`,
      java: `public class Solution {\n    public boolean solution(String s, String t) {\n        if (s.length() != t.length()) return false;\n        int[] count = new int[26];\n        for (char c : s.toCharArray()) count[c - 'a']++;\n        for (char c : t.toCharArray()) {\n            if (--count[c - 'a'] < 0) return false;\n        }\n        return true;\n    }\n}`
    },
    acceptanceRate: 64,
    points: 100,
    hints: ['Count character frequencies using an array of size 26.']
  },
  {
    title: 'Group Anagrams',
    slug: 'group-anagrams',
    difficulty: 'Medium',
    topicTags: ['Strings', 'Arrays'],
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.`,
    constraints: ['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
    sampleTestCases: [
      { input: '[["eat","tea","tan","ate","nat","bat"]]', expectedOutput: '[["eat","tea","ate"],["tan","nat"],["bat"]]', explanation: 'Strings sharing the same character distribution are grouped.' },
      { input: '[[""]]', expectedOutput: '[[""]]', explanation: 'Single empty string.' }
    ],
    hiddenTestCases: [
      { input: '[["a"]]', expectedOutput: '[["a"]]' },
      { input: '[["ab","ba","abc"]]', expectedOutput: '[["ab","ba"],["abc"]]' }
    ],
    starterTemplates: {
      javascript: `function solution(strs) {\n  const map = {};\n  for (const s of strs) {\n    const key = s.split("").sort().join("");\n    if (!map[key]) map[key] = [];\n    map[key].push(s);\n  }\n  return Object.values(map);\n}`,
      python: `def solution(strs):\n    from collections import defaultdict\n    mp = defaultdict(list)\n    for s in strs:\n        mp["".join(sorted(s))].append(s)\n    return list(mp.values())`,
      cpp: `#include <vector>\n#include <string>\n#include <unordered_map>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<string>> solution(vector<string>& strs) {\n    unordered_map<string, vector<string>> mp;\n    for (string& s : strs) {\n        string k = s;\n        sort(k.begin(), k.end());\n        mp[k].push_back(s);\n    }\n    vector<vector<string>> res;\n    for (auto& p : mp) res.push_back(p.second);\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<List<String>> solution(String[] strs) {\n        Map<String, List<String>> map = new HashMap<>();\n        for (String s : strs) {\n            char[] ca = s.toCharArray();\n            Arrays.sort(ca);\n            String key = String.valueOf(ca);\n            map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);\n        }\n        return new ArrayList<>(map.values());\n    }\n}`
    },
    acceptanceRate: 67,
    points: 200,
    hints: ['Sort each word alphabetically to use as a canonical hash key.']
  },
  {
    title: 'Top K Frequent Elements',
    slug: 'top-k-frequent-elements',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in range [1, number of unique elements]'],
    sampleTestCases: [
      { input: '[[1,1,1,2,2,3], 2]', expectedOutput: '[1,2]', explanation: '1 occurs 3 times, 2 occurs 2 times.' },
      { input: '[[1], 1]', expectedOutput: '[1]', explanation: 'Only element 1.' }
    ],
    hiddenTestCases: [
      { input: '[[4,1,-1,2,-1,2,3], 2]', expectedOutput: '[-1,2]' },
      { input: '[[3,0,1,0], 1]', expectedOutput: '[0]' }
    ],
    starterTemplates: {
      javascript: `function solution(nums, k) {\n  const freq = {};\n  for (const n of nums) freq[n] = (freq[n] || 0) + 1;\n  const sorted = Object.keys(freq).sort((a, b) => freq[b] - freq[a]);\n  return sorted.slice(0, k).map(Number);\n}`,
      python: `def solution(nums, k):\n    from collections import Counter\n    return [x[0] for x in Counter(nums).most_common(k)]`,
      cpp: `#include <vector>\n#include <unordered_map>\n#include <queue>\nusing namespace std;\n\nvector<int> solution(vector<int>& nums, int k) {\n    unordered_map<int, int> count;\n    for (int n : nums) count[n]++;\n    priority_queue<pair<int, int>> pq;\n    for (auto& p : count) pq.push({p.second, p.first});\n    vector<int> res;\n    while (k--) { res.push_back(pq.top().second); pq.pop(); }\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[] solution(int[] nums, int k) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int n : nums) map.put(n, map.getOrDefault(n, 0) + 1);\n        PriorityQueue<Integer> pq = new PriorityQueue<>((a, b) -> map.get(b) - map.get(a));\n        pq.addAll(map.keySet());\n        int[] res = new int[k];\n        for (int i = 0; i < k; i++) res[i] = pq.poll();\n        return res;\n    }\n}`
    },
    acceptanceRate: 64,
    points: 200,
    hints: ['Bucket sort based on frequencies can achieve O(N) time complexity.']
  },
  {
    title: 'Product of Array Except Self',
    slug: 'product-of-array-except-self',
    difficulty: 'Medium',
    topicTags: ['Arrays'],
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.\n\nYou must write an algorithm that runs in \`O(n)\` time and without using the division operation.`,
    constraints: ['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums fits in a 32-bit integer.'],
    sampleTestCases: [
      { input: '[[1,2,3,4]]', expectedOutput: '[24,12,8,6]', explanation: '24 = 2*3*4, 12 = 1*3*4, 8 = 1*2*4, 6 = 1*2*3.' },
      { input: '[[-1,1,0,-3,3]]', expectedOutput: '[0,0,9,0,0]', explanation: 'Zero at index 2 makes others zero except itself.' }
    ],
    hiddenTestCases: [
      { input: '[[2,3]]', expectedOutput: '[3,2]' },
      { input: '[[1,1,1]]', expectedOutput: '[1,1,1]' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const res = new Array(nums.length).fill(1);\n  let prefix = 1;\n  for (let i = 0; i < nums.length; i++) {\n    res[i] = prefix;\n    prefix *= nums[i];\n  }\n  let suffix = 1;\n  for (let i = nums.length - 1; i >= 0; i--) {\n    res[i] *= suffix;\n    suffix *= nums[i];\n  }\n  return res;\n}`,
      python: `def solution(nums):\n    res = [1] * len(nums)\n    prefix = 1\n    for i in range(len(nums)):\n        res[i] = prefix\n        prefix *= nums[i]\n    suffix = 1\n    for i in range(len(nums) - 1, -1, -1):\n        res[i] *= suffix\n        suffix *= nums[i]\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> res(n, 1);\n    int prefix = 1;\n    for (int i = 0; i < n; i++) {\n        res[i] = prefix;\n        prefix *= nums[i];\n    }\n    int suffix = 1;\n    for (int i = n - 1; i >= 0; i--) {\n        res[i] *= suffix;\n        suffix *= nums[i];\n    }\n    return res;\n}`,
      java: `public class Solution {\n    public int[] solution(int[] nums) {\n        int n = nums.length;\n        int[] res = new int[n];\n        int prefix = 1;\n        for (int i = 0; i < n; i++) {\n            res[i] = prefix;\n            prefix *= nums[i];\n        }\n        int suffix = 1;\n        for (int i = n - 1; i >= 0; i--) {\n            res[i] *= suffix;\n            suffix *= nums[i];\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 65,
    points: 200,
    hints: ['Calculate prefix products from left to right, then suffix products from right to left in-place.']
  },
  {
    title: 'Longest Consecutive Sequence',
    slug: 'longest-consecutive-sequence',
    difficulty: 'Medium',
    topicTags: ['Arrays'],
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.\n\nYou must write an algorithm that runs in \`O(n)\` time.`,
    constraints: ['0 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
    sampleTestCases: [
      { input: '[[100,4,200,1,3,2]]', expectedOutput: '4', explanation: 'The longest consecutive sequence is [1, 2, 3, 4], length 4.' },
      { input: '[[0,3,7,2,5,8,4,6,0,1]]', expectedOutput: '9', explanation: 'Sequence is 0,1,2,3,4,5,6,7,8.' }
    ],
    hiddenTestCases: [
      { input: '[[]]', expectedOutput: '0' },
      { input: '[[1,2,0,1]]', expectedOutput: '3' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const set = new Set(nums);\n  let maxLen = 0;\n  for (const n of set) {\n    if (!set.has(n - 1)) {\n      let curr = n;\n      let count = 1;\n      while (set.has(curr + 1)) {\n        curr++;\n        count++;\n      }\n      maxLen = Math.max(maxLen, count);\n    }\n  }\n  return maxLen;\n}`,
      python: `def solution(nums):\n    num_set = set(nums)\n    longest = 0\n    for n in num_set:\n        if n - 1 not in num_set:\n            length = 1\n            while n + length in num_set:\n                length += 1\n            longest = max(longest, length)\n    return longest`,
      cpp: `#include <vector>\n#include <unordered_set>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    unordered_set<int> s(nums.begin(), nums.end());\n    int maxLen = 0;\n    for (int n : s) {\n        if (!s.count(n - 1)) {\n            int curr = n, len = 1;\n            while (s.count(curr + 1)) { curr++; len++; }\n            maxLen = max(maxLen, len);\n        }\n    }\n    return maxLen;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[] nums) {\n        Set<Integer> set = new HashSet<>();\n        for (int n : nums) set.add(n);\n        int maxLen = 0;\n        for (int n : set) {\n            if (!set.contains(n - 1)) {\n                int curr = n, len = 1;\n                while (set.contains(curr + 1)) { curr++; len++; }\n                maxLen = Math.max(maxLen, len);\n            }\n        }\n        return maxLen;\n    }\n}`
    },
    acceptanceRate: 48,
    points: 200,
    hints: ['Only begin counting a sequence if n - 1 is not in the set (i.e. n is a sequence start).']
  },
  {
    title: 'Valid Palindrome',
    slug: 'valid-palindrome',
    difficulty: 'Easy',
    topicTags: ['Strings', 'Arrays'],
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    constraints: ['1 <= s.length <= 2 * 10^5', 's consists only of printable ASCII characters.'],
    sampleTestCases: [
      { input: '["A man, a plan, a canal: Panama"]', expectedOutput: 'true', explanation: 'amanaplanacanalpanama is a palindrome.' },
      { input: '["race a car"]', expectedOutput: 'false', explanation: 'raceacar is not a palindrome.' }
    ],
    hiddenTestCases: [
      { input: '[" "]', expectedOutput: 'true' },
      { input: '["0P"]', expectedOutput: 'false' },
      { input: '["ab_a"]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {\n  const clean = s.toLowerCase().replace(/[^a-z0-9]/g, "");\n  let l = 0, r = clean.length - 1;\n  while (l < r) {\n    if (clean[l] !== clean[r]) return false;\n    l++; r--;\n  }\n  return true;\n}`,
      python: `def solution(s):\n    clean = [c.lower() for c in s if c.isalnum()]\n    return clean == clean[::-1]`,
      cpp: `#include <string>\n#include <cctype>\nusing namespace std;\n\nbool solution(string s) {\n    int l = 0, r = s.length() - 1;\n    while (l < r) {\n        while (l < r && !isalnum(s[l])) l++;\n        while (l < r && !isalnum(s[r])) r--;\n        if (tolower(s[l]) != tolower(s[r])) return false;\n        l++; r--;\n    }\n    return true;\n}`,
      java: `public class Solution {\n    public boolean solution(String s) {\n        int l = 0, r = s.length() - 1;\n        while (l < r) {\n            while (l < r && !Character.isLetterOrDigit(s.charAt(l))) l++;\n            while (l < r && !Character.isLetterOrDigit(s.charAt(r))) r--;\n            if (Character.toLowerCase(s.charAt(l)) != Character.toLowerCase(s.charAt(r))) return false;\n            l++; r--;\n        }\n        return true;\n    }\n}`
    },
    acceptanceRate: 45,
    points: 100,
    hints: ['Two pointers starting at both ends skipping non-alphanumeric characters.']
  },
  {
    title: '3Sum',
    slug: '3sum',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.\n\nNotice that the solution set must not contain duplicate triplets.`,
    constraints: ['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
    sampleTestCases: [
      { input: '[[-1,0,1,2,-1,-4]]', expectedOutput: '[[-1,-1,2],[-1,0,1]]', explanation: 'The distinct triplets that sum to 0.' },
      { input: '[[0,1,1]]', expectedOutput: '[]', explanation: 'No triplet sums to 0.' }
    ],
    hiddenTestCases: [
      { input: '[[0,0,0]]', expectedOutput: '[[0,0,0]]' },
      { input: '[[-2,0,1,1,2]]', expectedOutput: '[[-2,0,2],[-2,1,1]]' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  nums.sort((a, b) => a - b);\n  const res = [];\n  for (let i = 0; i < nums.length - 2; i++) {\n    if (i > 0 && nums[i] === nums[i - 1]) continue;\n    let l = i + 1, r = nums.length - 1;\n    while (l < r) {\n      const sum = nums[i] + nums[l] + nums[r];\n      if (sum === 0) {\n        res.push([nums[i], nums[l], nums[r]]);\n        while (l < r && nums[l] === nums[l + 1]) l++;\n        while (l < r && nums[r] === nums[r - 1]) r--;\n        l++; r--;\n      } else if (sum < 0) l++;\n      else r--;\n    }\n  }\n  return res;\n}`,
      python: `def solution(nums):\n    nums.sort()\n    res = []\n    for i in range(len(nums) - 2):\n        if i > 0 and nums[i] == nums[i - 1]:\n            continue\n        l, r = i + 1, len(nums) - 1\n        while l < r:\n            s = nums[i] + nums[l] + nums[r]\n            if s == 0:\n                res.append([nums[i], nums[l], nums[r]])\n                while l < r and nums[l] == nums[l + 1]: l += 1\n                while l < r and nums[r] == nums[r - 1]: r -= 1\n                l += 1; r -= 1\n            elif s < 0:\n                l += 1\n            else:\n                r -= 1\n    return res`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> solution(vector<int>& nums) {\n    sort(nums.begin(), nums.end());\n    vector<vector<int>> res;\n    int n = nums.size();\n    for (int i = 0; i < n - 2; i++) {\n        if (i > 0 && nums[i] == nums[i - 1]) continue;\n        int l = i + 1, r = n - 1;\n        while (l < r) {\n            int sum = nums[i] + nums[l] + nums[r];\n            if (sum == 0) {\n                res.push_back({nums[i], nums[l], nums[r]});\n                while (l < r && nums[l] == nums[l + 1]) l++;\n                while (l < r && nums[r] == nums[r - 1]) r--;\n                l++; r--;\n            } else if (sum < 0) l++;\n            else r--;\n        }\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> solution(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> res = new ArrayList<>();\n        for (int i = 0; i < nums.length - 2; i++) {\n            if (i > 0 && nums[i] == nums[i - 1]) continue;\n            int l = i + 1, r = nums.length - 1;\n            while (l < r) {\n                int sum = nums[i] + nums[l] + nums[r];\n                if (sum == 0) {\n                    res.add(Arrays.asList(nums[i], nums[l], nums[r]));\n                    while (l < r && nums[l] == nums[l + 1]) l++;\n                    while (l < r && nums[r] == nums[r - 1]) r--;\n                    l++; r--;\n                } else if (sum < 0) l++;\n                else r--;\n            }\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 33,
    points: 200,
    hints: ['Sort the array and run two pointers for every fixed first element. Skip duplicates!']
  },
  {
    title: 'Container With Most Water',
    slug: 'container-with-most-water',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Greedy'],
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.`,
    constraints: ['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
    sampleTestCases: [
      { input: '[[1,8,6,2,5,4,8,3,7]]', expectedOutput: '49', explanation: 'The max area is between index 1 and index 8: min(8, 7) * (8 - 1) = 49.' },
      { input: '[[1,1]]', expectedOutput: '1', explanation: 'Area is 1 * 1 = 1.' }
    ],
    hiddenTestCases: [
      { input: '[[4,3,2,1,4]]', expectedOutput: '16' },
      { input: '[[1,2,1]]', expectedOutput: '2' },
      { input: '[[2,3,4,5,18,17,6]]', expectedOutput: '17' }
    ],
    starterTemplates: {
      javascript: `function solution(height) {\n  let l = 0, r = height.length - 1;\n  let maxArea = 0;\n  while (l < r) {\n    const h = Math.min(height[l], height[r]);\n    maxArea = Math.max(maxArea, h * (r - l));\n    if (height[l] < height[r]) l++;\n    else r--;\n  }\n  return maxArea;\n}`,
      python: `def solution(height):\n    l, r = 0, len(height) - 1\n    max_area = 0\n    while l < r:\n        h = min(height[l], height[r])\n        max_area = max(max_area, h * (r - l))\n        if height[l] < height[r]:\n            l += 1\n        else:\n            r -= 1\n    return max_area`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& height) {\n    int l = 0, r = height.size() - 1;\n    int maxArea = 0;\n    while (l < r) {\n        int h = min(height[l], height[r]);\n        maxArea = max(maxArea, h * (r - l));\n        if (height[l] < height[r]) l++;\n        else r--;\n    }\n    return maxArea;\n}`,
      java: `public class Solution {\n    public int solution(int[] height) {\n        int l = 0, r = height.length - 1;\n        int maxArea = 0;\n        while (l < r) {\n            int h = Math.min(height[l], height[r]);\n            maxArea = Math.max(maxArea, h * (r - l));\n            if (height[l] < height[r]) l++;\n            else r--;\n        }\n        return maxArea;\n    }\n}`
    },
    acceptanceRate: 54,
    points: 200,
    hints: ['Always advance the pointer with the smaller height, since the width decreases.']
  },

  // ==========================================
  // SLIDING WINDOW (11-15)
  // ==========================================
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Easy',
    topicTags: ['Arrays', 'Greedy'],
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.\n\nYou want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    constraints: ['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
    sampleTestCases: [
      { input: '[[7,1,5,3,6,4]]', expectedOutput: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.' },
      { input: '[[7,6,4,3,1]]', expectedOutput: '0', explanation: 'No transactions are done and max profit = 0.' }
    ],
    hiddenTestCases: [
      { input: '[[2,4,1]]', expectedOutput: '2' },
      { input: '[[1,2]]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(prices) {\n  let minPrice = Infinity;\n  let maxProfit = 0;\n  for (const p of prices) {\n    minPrice = Math.min(minPrice, p);\n    maxProfit = Math.max(maxProfit, p - minPrice);\n  }\n  return maxProfit;\n}`,
      python: `def solution(prices):\n    min_price = float('inf')\n    max_profit = 0\n    for p in prices:\n        min_price = min(min_price, p)\n        max_profit = max(max_profit, p - min_price)\n    return max_profit`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& prices) {\n    int minPrice = 1e9, maxProfit = 0;\n    for (int p : prices) {\n        minPrice = min(minPrice, p);\n        maxProfit = max(maxProfit, p - minPrice);\n    }\n    return maxProfit;\n}`,
      java: `public class Solution {\n    public int solution(int[] prices) {\n        int minPrice = Integer.MAX_VALUE, maxProfit = 0;\n        for (int p : prices) {\n            minPrice = Math.min(minPrice, p);\n            maxProfit = Math.max(maxProfit, p - minPrice);\n        }\n        return maxProfit;\n    }\n}`
    },
    acceptanceRate: 54,
    points: 100,
    hints: ['Keep track of the minimum price encountered so far in one pass.']
  },
  {
    title: 'Longest Substring Without Repeating Characters',
    slug: 'longest-substring-without-repeating-characters',
    difficulty: 'Medium',
    topicTags: ['Strings', 'Arrays'],
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
    sampleTestCases: [
      { input: '["abcabcbb"]', expectedOutput: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: '["bbbbb"]', expectedOutput: '1', explanation: 'The answer is "b", with the length of 1.' }
    ],
    hiddenTestCases: [
      { input: '["pwwkew"]', expectedOutput: '3' },
      { input: '[""]', expectedOutput: '0' },
      { input: '["au"]', expectedOutput: '2' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {\n  let maxLen = 0, left = 0;\n  const charMap = new Map();\n  for (let right = 0; right < s.length; right++) {\n    if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {\n      left = charMap.get(s[right]) + 1;\n    }\n    charMap.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
      python: `def solution(s):\n    char_map = {}\n    max_len = left = 0\n    for right, c in enumerate(s):\n        if c in char_map and char_map[c] >= left:\n            left = char_map[c] + 1\n        char_map[c] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(string s) {\n    vector<int> last(256, -1);\n    int maxLen = 0, left = 0;\n    for (int right = 0; right < s.length(); ++right) {\n        if (last[(unsigned char)s[right]] >= left) left = last[(unsigned char)s[right]] + 1;\n        last[(unsigned char)s[right]] = right;\n        maxLen = max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(String s) {\n        int maxLen = 0, left = 0;\n        Map<Character, Integer> map = new HashMap<>();\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c) && map.get(c) >= left) left = map.get(c) + 1;\n            map.put(c, right);\n            maxLen = Math.max(maxLen, right - left + 1);\n        }\n        return maxLen;\n    }\n}`
    },
    acceptanceRate: 34,
    points: 200,
    hints: ['Use sliding window with two pointers left and right, storing last seen character index.']
  },
  {
    title: 'Longest Repeating Character Replacement',
    slug: 'longest-repeating-character-replacement',
    difficulty: 'Medium',
    topicTags: ['Strings', 'Arrays'],
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.\n\nReturn the length of the longest substring containing the same letter you can get after performing the above operations.`,
    constraints: ['1 <= s.length <= 10^5', 's consists of only uppercase English letters.', '0 <= k <= s.length'],
    sampleTestCases: [
      { input: '["ABAB", 2]', expectedOutput: '4', explanation: 'Replace the two "A"s with two "B"s or vice versa.' },
      { input: '["AABABBA", 1]', expectedOutput: '4', explanation: 'Replace the middle "A" with "B" to get "AABBBBA".' }
    ],
    hiddenTestCases: [
      { input: '["AAAA", 2]', expectedOutput: '4' },
      { input: '["ABBB", 2]', expectedOutput: '4' }
    ],
    starterTemplates: {
      javascript: `function solution(s, k) {\n  const count = {};\n  let l = 0, maxF = 0, maxLen = 0;\n  for (let r = 0; r < s.length; r++) {\n    count[s[r]] = (count[s[r]] || 0) + 1;\n    maxF = Math.max(maxF, count[s[r]]);\n    while ((r - l + 1) - maxF > k) {\n      count[s[l]]--;\n      l++;\n    }\n    maxLen = Math.max(maxLen, r - l + 1);\n  }\n  return maxLen;\n}`,
      python: `def solution(s, k):\n    count = {}\n    l = max_f = max_len = 0\n    for r in range(len(s)):\n        count[s[r]] = count.get(s[r], 0) + 1\n        max_f = max(max_f, count[s[r]])\n        while (r - l + 1) - max_f > k:\n            count[s[l]] -= 1\n            l += 1\n        max_len = max(max_len, r - l + 1)\n    return max_len`,
      cpp: `#include <string>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(string s, int k) {\n    vector<int> count(26, 0);\n    int l = 0, maxF = 0, maxLen = 0;\n    for (int r = 0; r < s.length(); r++) {\n        count[s[r] - 'A']++;\n        maxF = max(maxF, count[s[r] - 'A']);\n        while ((r - l + 1) - maxF > k) {\n            count[s[l] - 'A']--;\n            l++;\n        }\n        maxLen = max(maxLen, r - l + 1);\n    }\n    return maxLen;\n}`,
      java: `public class Solution {\n    public int solution(String s, int k) {\n        int[] count = new int[26];\n        int l = 0, maxF = 0, maxLen = 0;\n        for (int r = 0; r < s.length(); r++) {\n            maxF = Math.max(maxF, ++count[s.charAt(r) - 'A']);\n            while ((r - l + 1) - maxF > k) {\n                count[s.charAt(l) - 'A']--;\n                l++;\n            }\n            maxLen = Math.max(maxLen, r - l + 1);\n        }\n        return maxLen;\n    }\n}`
    },
    acceptanceRate: 53,
    points: 200,
    hints: ['Window is valid as long as window_size - max_frequency <= k.']
  },
  {
    title: 'Minimum Window Substring',
    slug: 'minimum-window-substring',
    difficulty: 'Hard',
    topicTags: ['Strings', 'Arrays'],
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
    constraints: ['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
    sampleTestCases: [
      { input: '["ADOBECODEBANC", "ABC"]', expectedOutput: '"BANC"', explanation: 'The minimum window substring "BANC" includes A, B, and C from string t.' },
      { input: '["a", "a"]', expectedOutput: '"a"', explanation: 'Entire string a is the min window.' }
    ],
    hiddenTestCases: [
      { input: '["a", "aa"]', expectedOutput: '""' },
      { input: '["ab", "b"]', expectedOutput: '"b"' }
    ],
    starterTemplates: {
      javascript: `function solution(s, t) {\n  if (!t.length || !s.length) return "";\n  const tCount = {}, window = {};\n  for (const c of t) tCount[c] = (tCount[c] || 0) + 1;\n  let have = 0, need = Object.keys(tCount).length;\n  let res = [-1, -1], resLen = Infinity;\n  let l = 0;\n  for (let r = 0; r < s.length; r++) {\n    const c = s[r];\n    window[c] = (window[c] || 0) + 1;\n    if (tCount[c] && window[c] === tCount[c]) have++;\n    while (have === need) {\n      if (r - l + 1 < resLen) {\n        res = [l, r];\n        resLen = r - l + 1;\n      }\n      window[s[l]]--;\n      if (tCount[s[l]] && window[s[l]] < tCount[s[l]]) have--;\n      l++;\n    }\n  }\n  return resLen === Infinity ? "" : s.substring(res[0], res[1] + 1);\n}`,
      python: `def solution(s, t):\n    if not t or not s: return ""\n    from collections import Counter\n    t_count = Counter(t)\n    window = {}\n    have, need = 0, len(t_count)\n    res, res_len = [-1, -1], float("inf")\n    l = 0\n    for r, c in enumerate(s):\n        window[c] = window.get(c, 0) + 1\n        if c in t_count and window[c] == t_count[c]: have += 1\n        while have == need:\n            if (r - l + 1) < res_len:\n                res = [l, r]\n                res_len = r - l + 1\n            window[s[l]] -= 1\n            if s[l] in t_count and window[s[l]] < t_count[s[l]]: have -= 1\n            l += 1\n    return "" if res_len == float("inf") else s[res[0]:res[1]+1]`,
      cpp: `#include <string>\n#include <unordered_map>\nusing namespace std;\n\nstring solution(string s, string t) {\n    if (s.empty() || t.empty()) return "";\n    unordered_map<char, int> tCount, window;\n    for (char c : t) tCount[c]++;\n    int have = 0, need = tCount.size();\n    int minLen = 1e9, start = 0, l = 0;\n    for (int r = 0; r < s.length(); r++) {\n        char c = s[r];\n        window[c]++;\n        if (tCount.count(c) && window[c] == tCount[c]) have++;\n        while (have == need) {\n            if (r - l + 1 < minLen) {\n                minLen = r - l + 1;\n                start = l;\n            }\n            window[s[l]]--;\n            if (tCount.count(s[l]) && window[s[l]] < tCount[s[l]]) have--;\n            l++;\n        }\n    }\n    return minLen == 1e9 ? "" : s.substr(start, minLen);\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public String solution(String s, String t) {\n        if (s.length() == 0 || t.length() == 0) return "";\n        Map<Character, Integer> tCount = new HashMap<>(), window = new HashMap<>();\n        for (char c : t.toCharArray()) tCount.put(c, tCount.getOrDefault(c, 0) + 1);\n        int have = 0, need = tCount.size();\n        int minLen = Integer.MAX_VALUE, start = 0, l = 0;\n        for (int r = 0; r < s.length(); r++) {\n            char c = s.charAt(r);\n            window.put(c, window.getOrDefault(c, 0) + 1);\n            if (tCount.containsKey(c) && window.get(c).intValue() == tCount.get(c).intValue()) have++;\n            while (have == need) {\n                if (r - l + 1 < minLen) {\n                    minLen = r - l + 1;\n                    start = l;\n                }\n                window.put(s.charAt(l), window.get(s.charAt(l)) - 1);\n                if (tCount.containsKey(s.charAt(l)) && window.get(s.charAt(l)) < tCount.get(s.charAt(l))) have--;\n                l++;\n            }\n        }\n        return minLen == Integer.MAX_VALUE ? "" : s.substring(start, start + minLen);\n    }\n}`
    },
    acceptanceRate: 41,
    points: 300,
    hints: ['Keep track of characters count and expand right pointer until window is valid, then shrink left.']
  },
  {
    title: 'Trapping Rain Water',
    slug: 'trapping-rain-water',
    difficulty: 'Hard',
    topicTags: ['Arrays', 'Dynamic Programming'],
    description: `Given \`n\` non-negative integers representing an elevation map where the width of each bar is \`1\`, compute how much water it can trap after raining.`,
    constraints: ['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
    sampleTestCases: [
      { input: '[[0,1,0,2,1,0,1,3,2,1,2,1]]', expectedOutput: '6', explanation: 'The 6 units of rain water are trapped between the bars.' },
      { input: '[[4,2,0,3,2,5]]', expectedOutput: '9', explanation: 'Water trapped across all valleys sums to 9.' }
    ],
    hiddenTestCases: [
      { input: '[[3,0,2,0,4]]', expectedOutput: '7' },
      { input: '[[2,0,2]]', expectedOutput: '2' },
      { input: '[[1]]', expectedOutput: '0' }
    ],
    starterTemplates: {
      javascript: `function solution(height) {\n  let left = 0, right = height.length - 1;\n  let maxLeft = 0, maxRight = 0;\n  let totalWater = 0;\n  while (left < right) {\n    if (height[left] <= height[right]) {\n      if (height[left] >= maxLeft) maxLeft = height[left];\n      else totalWater += maxLeft - height[left];\n      left++;\n    } else {\n      if (height[right] >= maxRight) maxRight = height[right];\n      else totalWater += maxRight - height[right];\n      right--;\n    }\n  }\n  return totalWater;\n}`,
      python: `def solution(height):\n    left, right = 0, len(height) - 1\n    max_left = max_right = 0\n    water = 0\n    while left < right:\n        if height[left] <= height[right]:\n            if height[left] >= max_left: max_left = height[left]\n            else: water += max_left - height[left]\n            left += 1\n        else:\n            if height[right] >= max_right: max_right = height[right]\n            else: water += max_right - height[right]\n            right -= 1\n    return water`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& height) {\n    int l = 0, r = height.size() - 1;\n    int maxL = 0, maxR = 0, total = 0;\n    while (l < r) {\n        if (height[l] <= height[r]) {\n            if (height[l] >= maxL) maxL = height[l];\n            else total += maxL - height[l];\n            l++;\n        } else {\n            if (height[r] >= maxR) maxR = height[r];\n            else total += maxR - height[r];\n            r--;\n        }\n    }\n    return total;\n}`,
      java: `public class Solution {\n    public int solution(int[] height) {\n        int l = 0, r = height.length - 1;\n        int maxL = 0, maxR = 0, total = 0;\n        while (l < r) {\n            if (height[l] <= height[r]) {\n                if (height[l] >= maxL) maxL = height[l];\n                else total += maxL - height[l];\n                l++;\n            } else {\n                if (height[r] >= maxR) maxR = height[r];\n                else total += maxR - height[r];\n                r--;\n            }\n        }\n        return total;\n    }\n}`
    },
    acceptanceRate: 59,
    points: 300,
    hints: ['The water above any bar is min(max_left, max_right) - height[i].']
  },

  // ==========================================
  // STACK (16-19)
  // ==========================================
  {
    title: 'Valid Parentheses',
    slug: 'valid-parentheses',
    difficulty: 'Easy',
    topicTags: ['Strings'],
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets in the correct order.`,
    constraints: ['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
    sampleTestCases: [
      { input: '["()"]', expectedOutput: 'true', explanation: 'Simple matching bracket pair.' },
      { input: '["()[]{}"]', expectedOutput: 'true', explanation: 'All pairs properly closed.' }
    ],
    hiddenTestCases: [
      { input: '["(]"]', expectedOutput: 'false' },
      { input: '["([)]"]', expectedOutput: 'false' },
      { input: '["{[]}"]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(s) {\n  const stack = [];\n  const map = { ")": "(", "}": "{", "]": "[" };\n  for (const c of s) {\n    if (map[c]) {\n      if (!stack.length || stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}`,
      python: `def solution(s):\n    stack = []\n    mapping = {")": "(", "}": "{", "]": "["}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else:\n            stack.append(char)\n    return not stack`,
      cpp: `#include <string>\n#include <stack>\nusing namespace std;\n\nbool solution(string s) {\n    stack<char> st;\n    for (char c : s) {\n        if (c == '(' || c == '{' || c == '[') st.push(c);\n        else {\n            if (st.empty()) return false;\n            char top = st.top(); st.pop();\n            if (c == ')' && top != '(') return false;\n            if (c == '}' && top != '{') return false;\n            if (c == ']' && top != '[') return false;\n        }\n    }\n    return st.empty();\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}`
    },
    acceptanceRate: 40,
    points: 100,
    hints: ['Push expected closing brackets onto a LIFO stack.']
  },
  {
    title: 'Evaluate Reverse Polish Notation',
    slug: 'evaluate-reverse-polish-notation',
    difficulty: 'Medium',
    topicTags: ['Math & Logic', 'Arrays'],
    description: `You are given an array of strings \`tokens\` that represents an arithmetic expression in a Reverse Polish Notation.\n\nEvaluate the expression. Return an integer that represents the value of the expression.\n\nValid operators are \`+\`, \`-\`, \`*\`, and \`/\`. Each operand may be an integer or another expression. Division between two integers should truncate toward zero.`,
    constraints: ['1 <= tokens.length <= 10^4', 'tokens[i] is either an operator or an integer in range [-200, 200]'],
    sampleTestCases: [
      { input: '[["2","1","+","3","*"]]', expectedOutput: '9', explanation: '((2 + 1) * 3) = 9' },
      { input: '[["4","13","5","/","+"]]', expectedOutput: '6', explanation: '(4 + (13 / 5)) = 6' }
    ],
    hiddenTestCases: [
      { input: '[["10","6","9","3","+","-11","*","/","*","17","+","5","+"]]', expectedOutput: '22' }
    ],
    starterTemplates: {
      javascript: `function solution(tokens) {\n  const stack = [];\n  for (const t of tokens) {\n    if (t === "+") stack.push(stack.pop() + stack.pop());\n    else if (t === "-") { const b = stack.pop(), a = stack.pop(); stack.push(a - b); }\n    else if (t === "*") stack.push(stack.pop() * stack.pop());\n    else if (t === "/") { const b = stack.pop(), a = stack.pop(); stack.push(Math.trunc(a / b)); }\n    else stack.push(Number(t));\n  }\n  return stack[0];\n}`,
      python: `def solution(tokens):\n    stack = []\n    for t in tokens:\n        if t == "+": stack.append(stack.pop() + stack.pop())\n        elif t == "-": b, a = stack.pop(), stack.pop(); stack.append(a - b)\n        elif t == "*": stack.append(stack.pop() * stack.pop())\n        elif t == "/": b, a = stack.pop(), stack.pop(); stack.append(int(a / b))\n        else: stack.append(int(t))\n    return stack[0]`,
      cpp: `#include <vector>\n#include <string>\n#include <stack>\nusing namespace std;\n\nint solution(vector<string>& tokens) {\n    stack<int> st;\n    for (string& t : tokens) {\n        if (t == "+" || t == "-" || t == "*" || t == "/") {\n            int b = st.top(); st.pop();\n            int a = st.top(); st.pop();\n            if (t == "+") st.push(a + b);\n            if (t == "-") st.push(a - b);\n            if (t == "*") st.push(a * b);\n            if (t == "/") st.push(a / b);\n        } else st.push(stoi(t));\n    }\n    return st.top();\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(String[] tokens) {\n        Stack<Integer> st = new Stack<>();\n        for (String t : tokens) {\n            if (t.equals("+")) st.push(st.pop() + st.pop());\n            else if (t.equals("-")) { int b = st.pop(), a = st.pop(); st.push(a - b); }\n            else if (t.equals("*")) st.push(st.pop() * st.pop());\n            else if (t.equals("/")) { int b = st.pop(), a = st.pop(); st.push(a / b); }\n            else st.push(Integer.parseInt(t));\n        }\n        return st.peek();\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['Operands go onto a stack. When an operator is met, pop the top two operands, evaluate, and push result back.']
  },
  {
    title: 'Daily Temperatures',
    slug: 'daily-temperatures',
    difficulty: 'Medium',
    topicTags: ['Arrays'],
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`i\`th day to get a warmer temperature. If there is no future day for which this is possible, keep \`answer[i] == 0\` instead.`,
    constraints: ['1 <= temperatures.length <= 10^5', '30 <= temperatures[i] <= 100'],
    sampleTestCases: [
      { input: '[[73,74,75,71,69,72,76,73]]', expectedOutput: '[1,1,4,2,1,1,0,0]', explanation: 'Next warmer day counts from each day.' },
      { input: '[[30,40,50,60]]', expectedOutput: '[1,1,1,0]', explanation: 'Strictly increasing.' }
    ],
    hiddenTestCases: [
      { input: '[[30,60,90]]', expectedOutput: '[1,1,0]' },
      { input: '[[50,40,30]]', expectedOutput: '[0,0,0]' }
    ],
    starterTemplates: {
      javascript: `function solution(temperatures) {\n  const res = new Array(temperatures.length).fill(0);\n  const stack = []; // indices\n  for (let i = 0; i < temperatures.length; i++) {\n    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {\n      const prev = stack.pop();\n      res[prev] = i - prev;\n    }\n    stack.push(i);\n  }\n  return res;\n}`,
      python: `def solution(temperatures):\n    res = [0] * len(temperatures)\n    stack = [] # (index)\n    for i, t in enumerate(temperatures):\n        while stack and t > temperatures[stack[-1]]:\n            prev = stack.pop()\n            res[prev] = i - prev\n        stack.append(i)\n    return res`,
      cpp: `#include <vector>\n#include <stack>\nusing namespace std;\n\nvector<int> solution(vector<int>& temperatures) {\n    int n = temperatures.size();\n    vector<int> res(n, 0);\n    stack<int> st;\n    for (int i = 0; i < n; i++) {\n        while (!st.empty() && temperatures[i] > temperatures[st.top()]) {\n            int prev = st.top(); st.pop();\n            res[prev] = i - prev;\n        }\n        st.push(i);\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[] solution(int[] temperatures) {\n        int[] res = new int[temperatures.length];\n        Stack<Integer> st = new Stack<>();\n        for (int i = 0; i < temperatures.length; i++) {\n            while (!st.isEmpty() && temperatures[i] > temperatures[st.peek()]) {\n                int prev = st.pop();\n                res[prev] = i - prev;\n            }\n            st.push(i);\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 66,
    points: 200,
    hints: ['Maintain a monotonic decreasing stack storing indices of temperatures.']
  },

  // ==========================================
  // BINARY SEARCH (20-24)
  // ==========================================
  {
    title: 'Binary Search',
    slug: 'binary-search',
    difficulty: 'Easy',
    topicTags: ['Searching & Sorting', 'Arrays'],
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`. You must write an algorithm with \`O(log n)\` runtime complexity.`,
    constraints: ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4', 'All the integers in nums are unique.', 'nums is sorted in ascending order.'],
    sampleTestCases: [
      { input: '[[-1,0,3,5,9,12], 9]', expectedOutput: '4', explanation: '9 exists in nums and its index is 4.' },
      { input: '[[-1,0,3,5,9,12], 2]', expectedOutput: '-1', explanation: '2 does not exist in nums so return -1.' }
    ],
    hiddenTestCases: [
      { input: '[[5], 5]', expectedOutput: '0' },
      { input: '[[5], -5]', expectedOutput: '-1' }
    ],
    starterTemplates: {
      javascript: `function solution(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) l = mid + 1;\n    else r = mid - 1;\n  }\n  return -1;\n}`,
      python: `def solution(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: l = mid + 1\n        else: r = mid - 1\n    return -1`,
      cpp: `#include <vector>\nusing namespace std;\n\nint solution(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) l = mid + 1;\n        else r = mid - 1;\n    }\n    return -1;\n}`,
      java: `public class Solution {\n    public int solution(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[mid] < target) l = mid + 1;\n            else r = mid - 1;\n        }\n        return -1;\n    }\n}`
    },
    acceptanceRate: 56,
    points: 100,
    hints: ['Standard binary search dividing search range in half each step.']
  },
  {
    title: 'Search in Rotated Sorted Array',
    slug: 'search-in-rotated-sorted-array',
    difficulty: 'Medium',
    topicTags: ['Searching & Sorting', 'Arrays'],
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values). Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index.\n\nGiven the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.`,
    constraints: ['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.'],
    sampleTestCases: [
      { input: '[[4,5,6,7,0,1,2], 0]', expectedOutput: '4', explanation: '0 is at index 4.' },
      { input: '[[4,5,6,7,0,1,2], 3]', expectedOutput: '-1', explanation: '3 is not in array.' }
    ],
    hiddenTestCases: [
      { input: '[[1], 0]', expectedOutput: '-1' },
      { input: '[[3,1], 1]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(nums, target) {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[l] <= nums[mid]) {\n      if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n      else l = mid + 1;\n    } else {\n      if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n      else r = mid - 1;\n    }\n  }\n  return -1;\n}`,
      python: `def solution(nums, target):\n    l, r = 0, len(nums) - 1\n    while l <= r:\n        mid = (l + r) // 2\n        if nums[mid] == target: return mid\n        if nums[l] <= nums[mid]:\n            if nums[l] <= target < nums[mid]: r = mid - 1\n            else: l = mid + 1\n        else:\n            if nums[mid] < target <= nums[r]: l = mid + 1\n            else: r = mid - 1\n    return -1`,
      cpp: `#include <vector>\nusing namespace std;\n\nint solution(vector<int>& nums, int target) {\n    int l = 0, r = nums.size() - 1;\n    while (l <= r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[l] <= nums[mid]) {\n            if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n            else l = mid + 1;\n        } else {\n            if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n            else r = mid - 1;\n        }\n    }\n    return -1;\n}`,
      java: `public class Solution {\n    public int solution(int[] nums, int target) {\n        int l = 0, r = nums.length - 1;\n        while (l <= r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] == target) return mid;\n            if (nums[l] <= nums[mid]) {\n                if (target >= nums[l] && target < nums[mid]) r = mid - 1;\n                else l = mid + 1;\n            } else {\n                if (target > nums[mid] && target <= nums[r]) l = mid + 1;\n                else r = mid - 1;\n            }\n        }\n        return -1;\n    }\n}`
    },
    acceptanceRate: 39,
    points: 200,
    hints: ['At least one half of the array will always be strictly sorted. Determine which half is sorted!']
  },
  {
    title: 'Find Minimum in Rotated Sorted Array',
    slug: 'find-minimum-in-rotated-sorted-array',
    difficulty: 'Medium',
    topicTags: ['Searching & Sorting', 'Arrays'],
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times. Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].\n\nGiven the sorted rotated array \`nums\` of unique elements, return the minimum element of this array.`,
    constraints: ['n == nums.length', '1 <= n <= 5000', '-5000 <= nums[i] <= 5000', 'All the integers of nums are unique.'],
    sampleTestCases: [
      { input: '[[3,4,5,1,2]]', expectedOutput: '1', explanation: 'The original array was [1,2,3,4,5] rotated 3 times.' },
      { input: '[[4,5,6,7,0,1,2]]', expectedOutput: '0', explanation: 'Min element is 0.' }
    ],
    hiddenTestCases: [
      { input: '[[11,13,15,17]]', expectedOutput: '11' },
      { input: '[[2,1]]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  let l = 0, r = nums.length - 1;\n  while (l < r) {\n    const mid = Math.floor((l + r) / 2);\n    if (nums[mid] > nums[r]) l = mid + 1;\n    else r = mid;\n  }\n  return nums[l];\n}`,
      python: `def solution(nums):\n    l, r = 0, len(nums) - 1\n    while l < r:\n        mid = (l + r) // 2\n        if nums[mid] > nums[r]: l = mid + 1\n        else: r = mid\n    return nums[l]`,
      cpp: `#include <vector>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    int l = 0, r = nums.size() - 1;\n    while (l < r) {\n        int mid = l + (r - l) / 2;\n        if (nums[mid] > nums[r]) l = mid + 1;\n        else r = mid;\n    }\n    return nums[l];\n}`,
      java: `public class Solution {\n    public int solution(int[] nums) {\n        int l = 0, r = nums.length - 1;\n        while (l < r) {\n            int mid = l + (r - l) / 2;\n            if (nums[mid] > nums[r]) l = mid + 1;\n            else r = mid;\n        }\n        return nums[l];\n    }\n}`
    },
    acceptanceRate: 49,
    points: 200,
    hints: ['Compare nums[mid] with nums[right] to decide which half contains the inflection point.']
  },

  // ==========================================
  // DYNAMIC PROGRAMMING (25-35)
  // ==========================================
  {
    title: 'Climbing Stairs',
    slug: 'climbing-stairs',
    difficulty: 'Easy',
    topicTags: ['Dynamic Programming', 'Math & Logic'],
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    constraints: ['1 <= n <= 45'],
    sampleTestCases: [
      { input: '[2]', expectedOutput: '2', explanation: 'There are two ways: (1+1) and (2).' },
      { input: '[3]', expectedOutput: '3', explanation: 'Three ways: (1+1+1), (1+2), (2+1).' }
    ],
    hiddenTestCases: [
      { input: '[4]', expectedOutput: '5' },
      { input: '[5]', expectedOutput: '8' },
      { input: '[1]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(n) {\n  if (n <= 2) return n;\n  let prev = 1, curr = 2;\n  for (let i = 3; i <= n; i++) {\n    const next = prev + curr;\n    prev = curr;\n    curr = next;\n  }\n  return curr;\n}`,
      python: `def solution(n):\n    if n <= 2: return n\n    a, b = 1, 2\n    for _ in range(3, n + 1):\n        a, b = b, a + b\n    return b`,
      cpp: `int solution(int n) {\n    if (n <= 2) return n;\n    int a = 1, b = 2;\n    for (int i = 3; i <= n; i++) {\n        int c = a + b;\n        a = b; b = c;\n    }\n    return b;\n}`,
      java: `public class Solution {\n    public int solution(int n) {\n        if (n <= 2) return n;\n        int a = 1, b = 2;\n        for (int i = 3; i <= n; i++) {\n            int c = a + b;\n            a = b; b = c;\n        }\n        return b;\n    }\n}`
    },
    acceptanceRate: 52,
    points: 100,
    hints: ['To reach step n, you must arrive from step n-1 or n-2 (Fibonacci sequence).']
  },
  {
    title: 'Coin Change',
    slug: 'coin-change',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming'],
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.`,
    constraints: ['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
    sampleTestCases: [
      { input: '[[1,2,5], 11]', expectedOutput: '3', explanation: '11 = 5 + 5 + 1 (3 coins).' },
      { input: '[[2], 3]', expectedOutput: '-1', explanation: 'Cannot make 3 using only 2s.' }
    ],
    hiddenTestCases: [
      { input: '[[1], 0]', expectedOutput: '0' },
      { input: '[[1], 1]', expectedOutput: '1' },
      { input: '[[2,5,10,1], 27]', expectedOutput: '4' }
    ],
    starterTemplates: {
      javascript: `function solution(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (let i = 1; i <= amount; i++) {\n    for (const coin of coins) {\n      if (i - coin >= 0) {\n        dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n      }\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
      python: `def solution(coins, amount):\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for coin in coins:\n            if i - coin >= 0:\n                dp[i] = min(dp[i], dp[i - coin] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[] coins, int amount) {\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, amount + 1);\n        dp[0] = 0;\n        for (int i = 1; i <= amount; i++) {\n            for (int c : coins) {\n                if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n            }\n        }\n        return dp[amount] > amount ? -1 : dp[amount];\n    }\n}`
    },
    acceptanceRate: 42,
    points: 200,
    hints: ['dp[i] represents the minimum coins needed for amount i. dp[i] = min(dp[i - c] + 1).']
  },
  {
    title: 'House Robber',
    slug: 'house-robber',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Arrays'],
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.\n\nGiven an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    constraints: ['1 <= nums.length <= 100', '0 <= nums[i] <= 400'],
    sampleTestCases: [
      { input: '[[1,2,3,1]]', expectedOutput: '4', explanation: 'Rob house 1 (money = 1) and house 3 (money = 3). Total = 4.' },
      { input: '[[2,7,9,3,1]]', expectedOutput: '12', explanation: 'Rob house 1 (2), house 3 (9), house 5 (1). Total = 12.' }
    ],
    hiddenTestCases: [
      { input: '[[2,1,1,2]]', expectedOutput: '4' },
      { input: '[[0]]', expectedOutput: '0' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  let rob1 = 0, rob2 = 0;\n  for (const n of nums) {\n    const temp = Math.max(n + rob1, rob2);\n    rob1 = rob2;\n    rob2 = temp;\n  }\n  return rob2;\n}`,
      python: `def solution(nums):\n    rob1 = rob2 = 0\n    for n in nums:\n        temp = max(n + rob1, rob2)\n        rob1 = rob2\n        rob2 = temp\n    return rob2`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    int rob1 = 0, rob2 = 0;\n    for (int n : nums) {\n        int temp = max(n + rob1, rob2);\n        rob1 = rob2;\n        rob2 = temp;\n    }\n    return rob2;\n}`,
      java: `public class Solution {\n    public int solution(int[] nums) {\n        int rob1 = 0, rob2 = 0;\n        for (int n : nums) {\n            int temp = Math.max(n + rob1, rob2);\n            rob1 = rob2;\n            rob2 = temp;\n        }\n        return rob2;\n    }\n}`
    },
    acceptanceRate: 49,
    points: 200,
    hints: ['For each house, either rob it + rob1, or skip it and keep rob2.']
  },
  {
    title: 'Word Break',
    slug: 'word-break',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Strings'],
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.`,
    constraints: ['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20', 's and wordDict[i] consist of only lowercase English letters.'],
    sampleTestCases: [
      { input: '["leetcode", ["leet","code"]]', expectedOutput: 'true', explanation: 'Return true because "leetcode" can be segmented as "leet code".' },
      { input: '["applepenapple", ["apple","pen"]]', expectedOutput: 'true', explanation: 'Can be segmented as "apple pen apple".' }
    ],
    hiddenTestCases: [
      { input: '["catsandog", ["cats","dog","sand","and","cat"]]', expectedOutput: 'false' },
      { input: '["a", ["a"]]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(s, wordDict) {\n  const wordSet = new Set(wordDict);\n  const dp = new Array(s.length + 1).fill(false);\n  dp[s.length] = true;\n  for (let i = s.length - 1; i >= 0; i--) {\n    for (const w of wordSet) {\n      if (i + w.length <= s.length && s.substring(i, i + w.length) === w) {\n        if (dp[i + w.length]) {\n          dp[i] = true;\n          break;\n        }\n      }\n    }\n  }\n  return dp[0];\n}`,
      python: `def solution(s, wordDict):\n    dp = [False] * (len(s) + 1)\n    dp[len(s)] = True\n    for i in range(len(s) - 1, -1, -1):\n        for w in wordDict:\n            if i + len(w) <= len(s) and s[i:i + len(w)] == w:\n                if dp[i + len(w)]:\n                    dp[i] = True\n                    break\n    return dp[0]`,
      cpp: `#include <string>\n#include <vector>\n#include <unordered_set>\nusing namespace std;\n\nbool solution(string s, vector<string>& wordDict) {\n    unordered_set<string> dict(wordDict.begin(), wordDict.end());\n    int n = s.length();\n    vector<bool> dp(n + 1, false);\n    dp[0] = true;\n    for (int i = 1; i <= n; i++) {\n        for (int j = 0; j < i; j++) {\n            if (dp[j] && dict.count(s.substr(j, i - j))) {\n                dp[i] = true;\n                break;\n            }\n        }\n    }\n    return dp[n];\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(String s, List<String> wordDict) {\n        Set<String> set = new HashSet<>(wordDict);\n        boolean[] dp = new boolean[s.length() + 1];\n        dp[0] = true;\n        for (int i = 1; i <= s.length(); i++) {\n            for (int j = 0; j < i; j++) {\n                if (dp[j] && set.contains(s.substring(j, i))) {\n                    dp[i] = true;\n                    break;\n                }\n            }\n        }\n        return dp[s.length()];\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['dp[i] is true if s[0...i] can be broken into valid words.']
  },
  {
    title: 'Longest Increasing Subsequence',
    slug: 'longest-increasing-subsequence',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Searching & Sorting'],
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.\n\nA subsequence is an array that can be derived by deleting some or no elements without changing the order of remaining elements.`,
    constraints: ['1 <= nums.length <= 2500', '-10^4 <= nums[i] <= 10^4'],
    sampleTestCases: [
      { input: '[[10,9,2,5,3,7,101,18]]', expectedOutput: '4', explanation: 'The longest increasing subsequence is [2, 3, 7, 101], length 4.' },
      { input: '[[0,1,0,3,2,3]]', expectedOutput: '4', explanation: '[0, 1, 2, 3]' }
    ],
    hiddenTestCases: [
      { input: '[[7,7,7,7,7,7,7]]', expectedOutput: '1' },
      { input: '[[1,3,6,7,9,4,10,5,6]]', expectedOutput: '6' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const dp = new Array(nums.length).fill(1);\n  let maxLen = 1;\n  for (let i = 1; i < nums.length; i++) {\n    for (let j = 0; j < i; j++) {\n      if (nums[i] > nums[j]) {\n        dp[i] = Math.max(dp[i], dp[j] + 1);\n      }\n    }\n    maxLen = Math.max(maxLen, dp[i]);\n  }\n  return maxLen;\n}`,
      python: `def solution(nums):\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    int n = nums.size();\n    vector<int> dp(n, 1);\n    int maxLen = 1;\n    for (int i = 1; i < n; i++) {\n        for (int j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) dp[i] = max(dp[i], dp[j] + 1);\n        }\n        maxLen = max(maxLen, dp[i]);\n    }\n    return maxLen;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int[] nums) {\n        int[] dp = new int[nums.length];\n        Arrays.fill(dp, 1);\n        int maxLen = 1;\n        for (int i = 1; i < nums.length; i++) {\n            for (int j = 0; j < i; j++) {\n                if (nums[i] > nums[j]) dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n            maxLen = Math.max(maxLen, dp[i]);\n        }\n        return maxLen;\n    }\n}`
    },
    acceptanceRate: 53,
    points: 200,
    hints: ['dp[i] represents length of longest increasing subsequence ending at index i.']
  },
  {
    title: 'Unique Paths',
    slug: 'unique-paths',
    difficulty: 'Medium',
    topicTags: ['Dynamic Programming', 'Math & Logic'],
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner (i.e., \`grid[0][0]\`). The robot tries to move to the bottom-right corner (i.e., \`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.\n\nGiven the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    constraints: ['1 <= m, n <= 100'],
    sampleTestCases: [
      { input: '[3, 7]', expectedOutput: '28', explanation: 'Total 28 unique paths.' },
      { input: '[3, 2]', expectedOutput: '3', explanation: '3 paths: Right->Down->Down, Down->Down->Right, Down->Right->Down.' }
    ],
    hiddenTestCases: [
      { input: '[1, 1]', expectedOutput: '1' },
      { input: '[10, 10]', expectedOutput: '48620' }
    ],
    starterTemplates: {
      javascript: `function solution(m, n) {\n  let row = new Array(n).fill(1);\n  for (let i = 1; i < m; i++) {\n    const newRow = new Array(n).fill(1);\n    for (let j = 1; j < n; j++) {\n      newRow[j] = newRow[j - 1] + row[j];\n    }\n    row = newRow;\n  }\n  return row[n - 1];\n}`,
      python: `def solution(m, n):\n    row = [1] * n\n    for _ in range(1, m):\n        new_row = [1] * n\n        for j in range(1, n):\n            new_row[j] = new_row[j - 1] + row[j]\n        row = new_row\n    return row[n - 1]`,
      cpp: `#include <vector>\nusing namespace std;\n\nint solution(int m, int n) {\n    vector<int> row(n, 1);\n    for (int i = 1; i < m; i++) {\n        for (int j = 1; j < n; j++) {\n            row[j] += row[j - 1];\n        }\n    }\n    return row[n - 1];\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int solution(int m, int n) {\n        int[] row = new int[n];\n        Arrays.fill(row, 1);\n        for (int i = 1; i < m; i++) {\n            for (int j = 1; j < n; j++) {\n                row[j] += row[j - 1];\n            }\n        }\n        return row[n - 1];\n    }\n}`
    },
    acceptanceRate: 63,
    points: 200,
    hints: ['dp[i][j] = dp[i-1][j] + dp[i][j-1]. Can be reduced to a single 1D array.']
  },
  {
    title: 'Maximum Subarray',
    slug: 'maximum-subarray',
    difficulty: 'Easy',
    topicTags: ['Dynamic Programming', 'Arrays'],
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.`,
    constraints: ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
    sampleTestCases: [
      { input: '[[-2,1,-3,4,-1,2,1,-5,4]]', expectedOutput: '6', explanation: 'The subarray [4,-1,2,1] has the largest sum 6.' },
      { input: '[[1]]', expectedOutput: '1', explanation: 'Single element.' }
    ],
    hiddenTestCases: [
      { input: '[[5,4,-1,7,8]]', expectedOutput: '23' },
      { input: '[[-1]]', expectedOutput: '-1' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  let maxSoFar = nums[0];\n  let curr = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    maxSoFar = Math.max(maxSoFar, curr);\n  }\n  return maxSoFar;\n}`,
      python: `def solution(nums):\n    max_so_far = curr = nums[0]\n    for x in nums[1:]:\n        curr = max(x, curr + x)\n        max_so_far = max(max_so_far, curr)\n    return max_so_far`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    int maxSoFar = nums[0], curr = nums[0];\n    for (size_t i = 1; i < nums.size(); ++i) {\n        curr = max(nums[i], curr + nums[i]);\n        maxSoFar = max(maxSoFar, curr);\n    }\n    return maxSoFar;\n}`,
      java: `public class Solution {\n    public int solution(int[] nums) {\n        int maxSoFar = nums[0], curr = nums[0];\n        for (int i = 1; i < nums.length; i++) {\n            curr = Math.max(nums[i], curr + nums[i]);\n            maxSoFar = Math.max(maxSoFar, curr);\n        }\n        return maxSoFar;\n    }\n}`
    },
    acceptanceRate: 50,
    points: 100,
    hints: ['Kadane’s Algorithm: if current running sum becomes negative, reset it to the current element.']
  },

  // ==========================================
  // GRAPHS (36-42)
  // ==========================================
  {
    title: 'Course Schedule',
    slug: 'course-schedule',
    difficulty: 'Medium',
    topicTags: ['Graphs'],
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.\n\nReturn \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    constraints: ['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', 'All prerequisite pairs are unique.'],
    sampleTestCases: [
      { input: '[2, [[1,0]]]', expectedOutput: 'true', explanation: 'Course 0 then 1 can be completed.' },
      { input: '[2, [[1,0],[0,1]]]', expectedOutput: 'false', explanation: 'Cycle between 0 and 1.' }
    ],
    hiddenTestCases: [
      { input: '[3, [[0,1],[1,2],[2,0]]]', expectedOutput: 'false' },
      { input: '[1, []]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(numCourses, prerequisites) {\n  const adj = Array.from({ length: numCourses }, () => []);\n  const inDegree = new Array(numCourses).fill(0);\n  for (const [course, pre] of prerequisites) {\n    adj[pre].push(course);\n    inDegree[course]++;\n  }\n  const queue = [];\n  for (let i = 0; i < numCourses; i++) {\n    if (inDegree[i] === 0) queue.push(i);\n  }\n  let count = 0;\n  while (queue.length > 0) {\n    const node = queue.shift();\n    count++;\n    for (const next of adj[node]) {\n      inDegree[next]--;\n      if (inDegree[next] === 0) queue.push(next);\n    }\n  }\n  return count === numCourses;\n}`,
      python: `def solution(numCourses, prerequisites):\n    from collections import deque\n    adj = [[] for _ in range(numCourses)]\n    in_degree = [0] * numCourses\n    for course, pre in prerequisites:\n        adj[pre].append(course)\n        in_degree[course] += 1\n    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])\n    count = 0\n    while queue:\n        node = queue.popleft()\n        count += 1\n        for nxt in adj[node]:\n            in_degree[nxt] -= 1\n            if in_degree[nxt] == 0: queue.append(nxt)\n    return count == numCourses`,
      cpp: `#include <vector>\n#include <queue>\nusing namespace std;\n\nbool solution(int numCourses, vector<vector<int>>& prerequisites) {\n    vector<vector<int>> adj(numCourses);\n    vector<int> inDegree(numCourses, 0);\n    for (auto& p : prerequisites) {\n        adj[p[1]].push_back(p[0]);\n        inDegree[p[0]]++;\n    }\n    queue<int> q;\n    for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.push(i);\n    int count = 0;\n    while (!q.empty()) {\n        int u = q.front(); q.pop();\n        count++;\n        for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n    }\n    return count == numCourses;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public boolean solution(int numCourses, int[][] prerequisites) {\n        List<Integer>[] adj = new List[numCourses];\n        for (int i = 0; i < numCourses; i++) adj[i] = new ArrayList<>();\n        int[] inDegree = new int[numCourses];\n        for (int[] p : prerequisites) {\n            adj[p[1]].add(p[0]);\n            inDegree[p[0]]++;\n        }\n        Queue<Integer> q = new LinkedList<>();\n        for (int i = 0; i < numCourses; i++) if (inDegree[i] == 0) q.add(i);\n        int count = 0;\n        while (!q.isEmpty()) {\n            int u = q.poll();\n            count++;\n            for (int v : adj[u]) if (--inDegree[v] == 0) q.push(v);\n        }\n        return count == numCourses;\n    }\n}`
    },
    acceptanceRate: 46,
    points: 200,
    hints: ['Check if the directed graph contains a cycle using Kahn’s Topological Sort (BFS) or DFS recursion stack.']
  },
  {
    title: 'Number of Islands',
    slug: 'number-of-islands',
    difficulty: 'Medium',
    topicTags: ['Graphs'],
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    constraints: ['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is "0" or "1"'],
    sampleTestCases: [
      { input: '[[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]]', expectedOutput: '1', explanation: 'One continuous island.' },
      { input: '[[["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]]', expectedOutput: '3', explanation: 'Three separate islands.' }
    ],
    hiddenTestCases: [
      { input: '[[["1","0"],["0","1"]]]', expectedOutput: '2' },
      { input: '[[["0"]]]', expectedOutput: '0' }
    ],
    starterTemplates: {
      javascript: `function solution(grid) {\n  if (!grid.length) return 0;\n  let islands = 0;\n  const m = grid.length, n = grid[0].length;\n  function dfs(r, c) {\n    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] !== "1") return;\n    grid[r][c] = "0";\n    dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1);\n  }\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (grid[r][c] === "1") {\n        islands++;\n        dfs(r, c);\n      }\n    }\n  }\n  return islands;\n}`,
      python: `def solution(grid):\n    if not grid: return 0\n    m, n = len(grid), len(grid[0])\n    islands = 0\n    def dfs(r, c):\n        if r < 0 or c < 0 or r >= m or c >= n or grid[r][c] != '1': return\n        grid[r][c] = '0'\n        dfs(r + 1, c); dfs(r - 1, c); dfs(r, c + 1); dfs(r, c - 1)\n    for r in range(m):\n        for c in range(n):\n            if grid[r][c] == '1':\n                islands += 1\n                dfs(r, c)\n    return islands`,
      cpp: `#include <vector>\nusing namespace std;\n\nvoid dfs(vector<vector<char>>& grid, int r, int c) {\n    int m = grid.size(), n = grid[0].size();\n    if (r < 0 || c < 0 || r >= m || c >= n || grid[r][c] != '1') return;\n    grid[r][c] = '0';\n    dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n}\n\nint solution(vector<vector<char>>& grid) {\n    if (grid.empty()) return 0;\n    int islands = 0;\n    for (int r = 0; r < grid.size(); r++) {\n        for (int c = 0; c < grid[0].size(); c++) {\n            if (grid[r][c] == '1') {\n                islands++;\n                dfs(grid, r, c);\n            }\n        }\n    }\n    return islands;\n}`,
      java: `public class Solution {\n    public int solution(char[][] grid) {\n        if (grid.length == 0) return 0;\n        int islands = 0;\n        for (int r = 0; r < grid.length; r++) {\n            for (int c = 0; c < grid[0].length; c++) {\n                if (grid[r][c] == '1') {\n                    islands++;\n                    dfs(grid, r, c);\n                }\n            }\n        }\n        return islands;\n    }\n    private void dfs(char[][] grid, int r, int c) {\n        if (r < 0 || c < 0 || r >= grid.length || c >= grid[0].length || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r + 1, c); dfs(grid, r - 1, c); dfs(grid, r, c + 1); dfs(grid, r, c - 1);\n    }\n}`
    },
    acceptanceRate: 58,
    points: 200,
    hints: ['Traverse the grid. For each unvisited "1", increment island count and DFS/BFS to sink all connected land cells.']
  },

  // ==========================================
  // GREEDY & INTERVALS (43-48)
  // ==========================================
  {
    title: 'Jump Game',
    slug: 'jump-game',
    difficulty: 'Medium',
    topicTags: ['Greedy', 'Dynamic Programming'],
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn \`true\` if you can reach the last index, or \`false\` otherwise.`,
    constraints: ['1 <= nums.length <= 10^4', '0 <= nums[i] <= 10^5'],
    sampleTestCases: [
      { input: '[[2,3,1,1,4]]', expectedOutput: 'true', explanation: 'Jump 1 step from 0 to 1, then 3 steps to the last index.' },
      { input: '[[3,2,1,0,4]]', expectedOutput: 'false', explanation: 'You will always arrive at index 3 where jump length is 0.' }
    ],
    hiddenTestCases: [
      { input: '[[0]]', expectedOutput: 'true' },
      { input: '[[2,0,0]]', expectedOutput: 'true' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  let maxReach = 0;\n  for (let i = 0; i < nums.length; i++) {\n    if (i > maxReach) return false;\n    maxReach = Math.max(maxReach, i + nums[i]);\n  }\n  return true;\n}`,
      python: `def solution(nums):\n    max_reach = 0\n    for i, jump in enumerate(nums):\n        if i > max_reach: return False\n        max_reach = max(max_reach, i + jump)\n    return True`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nbool solution(vector<int>& nums) {\n    int maxReach = 0;\n    for (int i = 0; i < nums.size(); ++i) {\n        if (i > maxReach) return false;\n        maxReach = max(maxReach, i + nums[i]);\n    }\n    return true;\n}`,
      java: `public class Solution {\n    public boolean solution(int[] nums) {\n        int maxReach = 0;\n        for (int i = 0; i < nums.length; i++) {\n            if (i > maxReach) return false;\n            maxReach = Math.max(maxReach, i + nums[i]);\n        }\n        return true;\n    }\n}`
    },
    acceptanceRate: 39,
    points: 200,
    hints: ['Track the maximum reachable index so far greedily.']
  },
  {
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Searching & Sorting'],
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    constraints: ['1 <= intervals.length <= 10^4', 'intervals[i].length == 2', '0 <= start_i <= end_i <= 10^4'],
    sampleTestCases: [
      { input: '[[[1,3],[2,6],[8,10],[15,18]]]', expectedOutput: '[[1,6],[8,10],[15,18]]', explanation: 'Since intervals [1,3] and [2,6] overlap, merge them into [1,6].' },
      { input: '[[[1,4],[4,5]]]', expectedOutput: '[[1,5]]', explanation: 'Intervals [1,4] and [4,5] are considered overlapping.' }
    ],
    hiddenTestCases: [
      { input: '[[[1,4],[0,4]]]', expectedOutput: '[[0,4]]' },
      { input: '[[[1,4],[2,3]]]', expectedOutput: '[[1,4]]' }
    ],
    starterTemplates: {
      javascript: `function solution(intervals) {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = merged[merged.length - 1];\n    if (intervals[i][0] <= last[1]) {\n      last[1] = Math.max(last[1], intervals[i][1]);\n    } else {\n      merged.push(intervals[i]);\n    }\n  }\n  return merged;\n}`,
      python: `def solution(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for current in intervals[1:]:\n        last = merged[-1]\n        if current[0] <= last[1]:\n            last[1] = max(last[1], current[1])\n        else:\n            merged.append(current)\n    return merged`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> solution(vector<vector<int>>& intervals) {\n    if (intervals.empty()) return {};\n    sort(intervals.begin(), intervals.end());\n    vector<vector<int>> merged = {intervals[0]};\n    for (size_t i = 1; i < intervals.size(); i++) {\n        if (intervals[i][0] <= merged.back()[1]) {\n            merged.back()[1] = max(merged.back()[1], intervals[i][1]);\n        } else {\n            merged.push_back(intervals[i]);\n        }\n    }\n    return merged;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public int[][] solution(int[][] intervals) {\n        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));\n        List<int[]> merged = new ArrayList<>();\n        merged.add(intervals[0]);\n        for (int i = 1; i < intervals.length; i++) {\n            int[] last = merged.get(merged.size() - 1);\n            if (intervals[i][0] <= last[1]) {\n                last[1] = Math.max(last[1], intervals[i][1]);\n            } else {\n                merged.add(intervals[i]);\n            }\n        }\n        return merged.toArray(new int[merged.size()][]);\n    }\n}`
    },
    acceptanceRate: 47,
    points: 200,
    hints: ['Sort intervals by start time, then merge adjacent ones if current start <= previous end.']
  },

  // ==========================================
  // MATH & LOGIC (49-55)
  // ==========================================
  {
    title: 'Single Number',
    slug: 'single-number',
    difficulty: 'Easy',
    topicTags: ['Math & Logic'],
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.`,
    constraints: ['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element in the array appears twice except for one element.'],
    sampleTestCases: [
      { input: '[[2,2,1]]', expectedOutput: '1', explanation: '1 appears once.' },
      { input: '[[4,1,2,1,2]]', expectedOutput: '4', explanation: '4 appears once.' }
    ],
    hiddenTestCases: [
      { input: '[[1]]', expectedOutput: '1' },
      { input: '[[7,3,5,3,7]]', expectedOutput: '5' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  let res = 0;\n  for (const n of nums) res ^= n;\n  return res;\n}`,
      python: `def solution(nums):\n    res = 0\n    for n in nums: res ^= n\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    int res = 0;\n    for (int n : nums) res ^= n;\n    return res;\n}`,
      java: `public class Solution {\n    public int solution(int[] nums) {\n        int res = 0;\n        for (int n : nums) res ^= n;\n        return res;\n    }\n}`
    },
    acceptanceRate: 72,
    points: 100,
    hints: ['Bitwise XOR: A ^ A = 0 and A ^ 0 = A. XORing all numbers leaves the unique one.']
  },
  {
    title: 'Counting Bits',
    slug: 'counting-bits',
    difficulty: 'Easy',
    topicTags: ['Math & Logic', 'Dynamic Programming'],
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the number of \`1\`'s in the binary representation of \`i\`.`,
    constraints: ['0 <= n <= 10^5'],
    sampleTestCases: [
      { input: '[2]', expectedOutput: '[0,1,1]', explanation: '0 -> 0, 1 -> 1, 2 -> 10 (one 1).' },
      { input: '[5]', expectedOutput: '[0,1,1,2,1,2]', explanation: '0 to 5 in binary 1s count.' }
    ],
    hiddenTestCases: [
      { input: '[0]', expectedOutput: '[0]' },
      { input: '[1]', expectedOutput: '[0,1]' }
    ],
    starterTemplates: {
      javascript: `function solution(n) {\n  const ans = new Array(n + 1).fill(0);\n  for (let i = 1; i <= n; i++) {\n    ans[i] = ans[i >> 1] + (i & 1);\n  }\n  return ans;\n}`,
      python: `def solution(n):\n    ans = [0] * (n + 1)\n    for i in range(1, n + 1):\n        ans[i] = ans[i >> 1] + (i & 1)\n    return ans`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(int n) {\n    vector<int> ans(n + 1, 0);\n    for (int i = 1; i <= n; i++) {\n        ans[i] = ans[i >> 1] + (i & 1);\n    }\n    return ans;\n}`,
      java: `public class Solution {\n    public int solution(int n) {\n        int[] ans = new int[n + 1];\n        for (int i = 1; i <= n; i++) {\n            ans[i] = ans[i >> 1] + (i & 1);\n        }\n        return ans;\n    }\n}`
    },
    acceptanceRate: 77,
    points: 100,
    hints: ['ans[i] = ans[i >> 1] + (i & 1). Shifting right removes the lowest bit.']
  },
  {
    title: 'Missing Number',
    slug: 'missing-number',
    difficulty: 'Easy',
    topicTags: ['Math & Logic', 'Arrays'],
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    constraints: ['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All the numbers of nums are unique.'],
    sampleTestCases: [
      { input: '[[3,0,1]]', expectedOutput: '2', explanation: 'n = 3, numbers [0,3] are 0,1,2,3. 2 is missing.' },
      { input: '[[0,1]]', expectedOutput: '2', explanation: '2 is missing.' }
    ],
    hiddenTestCases: [
      { input: '[[9,6,4,2,3,5,7,0,1]]', expectedOutput: '8' },
      { input: '[[0]]', expectedOutput: '1' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const n = nums.length;\n  const expected = (n * (n + 1)) / 2;\n  const actual = nums.reduce((a, b) => a + b, 0);\n  return expected - actual;\n}`,
      python: `def solution(nums):\n    n = len(nums)\n    return (n * (n + 1)) // 2 - sum(nums)`,
      cpp: `#include <vector>\n#include <numeric>\nusing namespace std;\n\nint solution(vector<int>& nums) {\n    int n = nums.size();\n    int expected = n * (n + 1) / 2;\n    int actual = accumulate(nums.begin(), nums.end(), 0);\n    return expected - actual;\n}`,
      java: `public class Solution {\n    public int solution(int[] nums) {\n        int n = nums.length;\n        int expected = n * (n + 1) / 2;\n        int actual = 0;\n        for (int x : nums) actual += x;\n        return expected - actual;\n    }\n}`
    },
    acceptanceRate: 64,
    points: 100,
    hints: ['Gauss sum formula: n * (n + 1) / 2 minus actual sum gives the missing number in O(1) space.']
  },

  // ==========================================
  // MORE ADVANCED PROBLEMS (56-75)
  // ==========================================
  {
    title: 'Subsets',
    slug: 'subsets',
    difficulty: 'Medium',
    topicTags: ['Arrays'],
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).\n\nThe solution set must not contain duplicate subsets. Return the solution in any order.`,
    constraints: ['1 <= nums.length <= 10', '-10 <= nums[i] <= 10', 'All the numbers of nums are unique.'],
    sampleTestCases: [
      { input: '[[1,2,3]]', expectedOutput: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]', explanation: 'All 8 subsets.' },
      { input: '[[0]]', expectedOutput: '[[],[0]]', explanation: 'Power set of single element.' }
    ],
    hiddenTestCases: [
      { input: '[[1,2]]', expectedOutput: '[[],[1],[2],[1,2]]' }
    ],
    starterTemplates: {
      javascript: `function solution(nums) {\n  const res = [];\n  function backtrack(idx, current) {\n    res.push([...current]);\n    for (let i = idx; i < nums.length; i++) {\n      current.push(nums[i]);\n      backtrack(i + 1, current);\n      current.pop();\n    }\n  }\n  backtrack(0, []);\n  return res;\n}`,
      python: `def solution(nums):\n    res = []\n    def backtrack(idx, current):\n        res.append(list(current))\n        for i in range(idx, len(nums)):\n            current.append(nums[i])\n            backtrack(i + 1, current)\n            current.pop()\n    backtrack(0, [])\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvoid backtrack(vector<int>& nums, int idx, vector<int>& curr, vector<vector<int>>& res) {\n    res.push_back(curr);\n    for (int i = idx; i < nums.size(); i++) {\n        curr.push_back(nums[i]);\n        backtrack(nums, i + 1, curr, res);\n        curr.pop_back();\n    }\n}\n\nvector<vector<int>> solution(vector<int>& nums) {\n    vector<vector<int>> res;\n    vector<int> curr;\n    backtrack(nums, 0, curr, res);\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> solution(int[] nums) {\n        List<List<Integer>> res = new ArrayList<>();\n        backtrack(nums, 0, new ArrayList<>(), res);\n        return res;\n    }\n    private void backtrack(int[] nums, int idx, List<Integer> curr, List<List<Integer>> res) {\n        res.add(new ArrayList<>(curr));\n        for (int i = idx; i < nums.length; i++) {\n            curr.add(nums[i]);\n            backtrack(nums, i + 1, curr, res);\n            curr.remove(curr.size() - 1);\n        }\n    }\n}`
    },
    acceptanceRate: 77,
    points: 200,
    hints: ['At each element, you have two choices: include it or exclude it.']
  },
  {
    title: 'Combination Sum',
    slug: 'combination-sum',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Dynamic Programming'],
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`. You may return the combinations in any order.\n\nThe same number may be chosen from \`candidates\` an unlimited number of times. Two combinations are unique if the frequency of at least one of the chosen numbers is different.`,
    constraints: ['1 <= candidates.length <= 30', '2 <= candidates[i] <= 40', 'All elements of candidates are distinct.', '1 <= target <= 40'],
    sampleTestCases: [
      { input: '[[2,3,6,7], 7]', expectedOutput: '[[2,2,3],[7]]', explanation: '2 and 3 are candidates, and 2 + 2 + 3 = 7. 7 is a candidate, and 7 = 7.' },
      { input: '[[2,3,5], 8]', expectedOutput: '[[2,2,2,2],[2,3,3],[3,5]]', explanation: 'Three combinations.' }
    ],
    hiddenTestCases: [
      { input: '[[2], 1]', expectedOutput: '[]' }
    ],
    starterTemplates: {
      javascript: `function solution(candidates, target) {\n  const res = [];\n  function dfs(idx, curr, total) {\n    if (total === target) { res.push([...curr]); return; }\n    if (total > target || idx >= candidates.length) return;\n    curr.push(candidates[idx]);\n    dfs(idx, curr, total + candidates[idx]);\n    curr.pop();\n    dfs(idx + 1, curr, total);\n  }\n  dfs(0, [], 0);\n  return res;\n}`,
      python: `def solution(candidates, target):\n    res = []\n    def dfs(idx, curr, total):\n        if total == target:\n            res.append(list(curr))\n            return\n        if total > target or idx >= len(candidates):\n            return\n        curr.append(candidates[idx])\n        dfs(idx, curr, total + candidates[idx])\n        curr.pop()\n        dfs(idx + 1, curr, total)\n    dfs(0, [], 0)\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvoid dfs(vector<int>& c, int target, int idx, vector<int>& curr, int total, vector<vector<int>>& res) {\n    if (total == target) { res.push_back(curr); return; }\n    if (total > target || idx >= c.size()) return;\n    curr.push_back(c[idx]);\n    dfs(c, target, idx, curr, total + c[idx], res);\n    curr.pop_back();\n    dfs(c, target, idx + 1, curr, total, res);\n}\n\nvector<vector<int>> solution(vector<int>& candidates, int target) {\n    vector<vector<int>> res;\n    vector<int> curr;\n    dfs(candidates, target, 0, curr, 0, res);\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<List<Integer>> solution(int[] candidates, int target) {\n        List<List<Integer>> res = new ArrayList<>();\n        dfs(candidates, target, 0, new ArrayList<>(), 0, res);\n        return res;\n    }\n    private void dfs(int[] c, int target, int idx, List<Integer> curr, int total, List<List<Integer>> res) {\n        if (total == target) { res.add(new ArrayList<>(curr)); return; }\n        if (total > target || idx >= c.length) return;\n        curr.add(c[idx]);\n        dfs(c, target, idx, curr, total + c[idx], res);\n        curr.remove(curr.size() - 1);\n        dfs(c, target, idx + 1, curr, total, res);\n    }\n}`
    },
    acceptanceRate: 71,
    points: 200,
    hints: ['DFS branching: either include candidate[i] again or move on to candidate[i+1].']
  },
  {
    title: 'Rotate Image',
    slug: 'rotate-image',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Math & Logic'],
    description: `You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\n\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.`,
    constraints: ['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
    sampleTestCases: [
      { input: '[[[1,2,3],[4,5,6],[7,8,9]]]', expectedOutput: '[[7,4,1],[8,5,2],[9,6,3]]', explanation: '90 degree clockwise rotation.' },
      { input: '[[[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]]', expectedOutput: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', explanation: 'Rotated 4x4.' }
    ],
    hiddenTestCases: [
      { input: '[[[1]]]', expectedOutput: '[[1]]' },
      { input: '[[[1,2],[3,4]]]', expectedOutput: '[[3,1],[4,2]]' }
    ],
    starterTemplates: {
      javascript: `function solution(matrix) {\n  const n = matrix.length;\n  for (let i = 0; i < n; i++) {\n    for (let j = i + 1; j < n; j++) {\n      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];\n    }\n  }\n  for (let i = 0; i < n; i++) {\n    matrix[i].reverse();\n  }\n  return matrix;\n}`,
      python: `def solution(matrix):\n    n = len(matrix)\n    for i in range(n):\n        for j in range(i + 1, n):\n            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]\n    for i in range(n):\n        matrix[i].reverse()\n    return matrix`,
      cpp: `#include <vector>\n#include <algorithm>\nusing namespace std;\n\nvector<vector<int>> solution(vector<vector<int>>& matrix) {\n    int n = matrix.size();\n    for (int i = 0; i < n; i++) {\n        for (int j = i + 1; j < n; j++) {\n            swap(matrix[i][j], matrix[j][i]);\n        }\n    }\n    for (int i = 0; i < n; i++) reverse(matrix[i].begin(), matrix[i].end());\n    return matrix;\n}`,
      java: `public class Solution {\n    public int[][] solution(int[][] matrix) {\n        int n = matrix.length;\n        for (int i = 0; i < n; i++) {\n            for (int j = i + 1; j < n; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[j][i];\n                matrix[j][i] = temp;\n            }\n        }\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n / 2; j++) {\n                int temp = matrix[i][j];\n                matrix[i][j] = matrix[i][n - 1 - j];\n                matrix[i][n - 1 - j] = temp;\n            }\n        }\n        return matrix;\n    }\n}`
    },
    acceptanceRate: 72,
    points: 200,
    hints: ['Transpose the matrix (swap matrix[i][j] with matrix[j][i]), then reverse each row.']
  },
  {
    title: 'Spiral Matrix',
    slug: 'spiral-matrix',
    difficulty: 'Medium',
    topicTags: ['Arrays', 'Math & Logic'],
    description: `Given an \`m x n\` matrix, return all elements of the matrix in spiral order.`,
    constraints: ['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 10', '-100 <= matrix[i][j] <= 100'],
    sampleTestCases: [
      { input: '[[[1,2,3],[4,5,6],[7,8,9]]]', expectedOutput: '[1,2,3,6,9,8,7,4,5]', explanation: 'Traverse right, down, left, up.' },
      { input: '[[[1,2,3,4],[5,6,7,8],[9,10,11,12]]]', expectedOutput: '[1,2,3,4,8,12,11,10,9,5,6,7]', explanation: 'Spiral order.' }
    ],
    hiddenTestCases: [
      { input: '[[[1]]]', expectedOutput: '[1]' },
      { input: '[[[1,2],[3,4]]]', expectedOutput: '[1,2,4,3]' }
    ],
    starterTemplates: {
      javascript: `function solution(matrix) {\n  const res = [];\n  let top = 0, bottom = matrix.length - 1;\n  let left = 0, right = matrix[0].length - 1;\n  while (top <= bottom && left <= right) {\n    for (let i = left; i <= right; i++) res.push(matrix[top][i]);\n    top++;\n    for (let i = top; i <= bottom; i++) res.push(matrix[i][right]);\n    right--;\n    if (top <= bottom) {\n      for (let i = right; i >= left; i--) res.push(matrix[bottom][i]);\n      bottom--;\n    }\n    if (left <= right) {\n      for (let i = bottom; i >= top; i--) res.push(matrix[i][left]);\n      left++;\n    }\n  }\n  return res;\n}`,
      python: `def solution(matrix):\n    res = []\n    top, bottom = 0, len(matrix) - 1\n    left, right = 0, len(matrix[0]) - 1\n    while top <= bottom and left <= right:\n        for i in range(left, right + 1): res.append(matrix[top][i])\n        top += 1\n        for i in range(top, bottom + 1): res.append(matrix[i][right])\n        right -= 1\n        if top <= bottom:\n            for i in range(right, left - 1, -1): res.append(matrix[bottom][i])\n            bottom -= 1\n        if left <= right:\n            for i in range(bottom, top - 1, -1): res.append(matrix[i][left])\n            left += 1\n    return res`,
      cpp: `#include <vector>\nusing namespace std;\n\nvector<int> solution(vector<vector<int>>& matrix) {\n    vector<int> res;\n    int top = 0, bottom = matrix.size() - 1;\n    int left = 0, right = matrix[0].size() - 1;\n    while (top <= bottom && left <= right) {\n        for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);\n        top++;\n        for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);\n        right--;\n        if (top <= bottom) {\n            for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);\n            bottom--;\n        }\n        if (left <= right) {\n            for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);\n            left++;\n        }\n    }\n    return res;\n}`,
      java: `import java.util.*;\n\npublic class Solution {\n    public List<Integer> solution(int[][] matrix) {\n        List<Integer> res = new ArrayList<>();\n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        while (top <= bottom && left <= right) {\n            for (int i = left; i <= right; i++) res.add(matrix[top][i]);\n            top++;\n            for (int i = top; i <= bottom; i++) res.add(matrix[i][right]);\n            right--;\n            if (top <= bottom) {\n                for (int i = right; i >= left; i--) res.add(matrix[bottom][i]);\n                bottom--;\n            }\n            if (left <= right) {\n                for (int i = bottom; i >= top; i--) res.add(matrix[i][left]);\n                left++;\n            }\n        }\n        return res;\n    }\n}`
    },
    acceptanceRate: 48,
    points: 200,
    hints: ['Maintain 4 boundaries: top, bottom, left, right, shrinking each after processing its side.']
  }
];

export const problemsData = [...baseProblemsData, ...extraProblemsData];
