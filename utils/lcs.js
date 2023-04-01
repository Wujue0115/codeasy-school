// LCS 指的是 Longest Common Subsequence，中文為最長共同子序列，是一種用於求解兩個序列之間最長的共同子序列的演算法。
// 所謂最長共同子序列，指的是兩個序列中，不一定要在同一位置、也不要求連續的公共序列。例如序列 "ABCDGH" 和 "AEDFHR" 的 LCS 就是 "ADH"。其中，"ADH" 是這兩個序列中一個可能的 LCS，而它的長度是 3。

export default (a, b) => {
  const dp = [];
  for (let i = 0; i < 2; ++i) {
    dp.push(new Array(b.length + 1));
    for (let j = 0; j <= b.length; ++j) {
      dp[i][j] = 0;
    }
  }
  
  for (let i = 0; i < a.length; ++i) {
    for (let j = 0; j < b.length; ++j) {
      a[i] === b[j] ?
        dp[1][j + 1] = dp[0][j] + 1 :
        dp[1][j + 1] = Math.max(dp[1][j], dp[0][j + 1]);
    }
    dp[0] = [...dp[1]];
  }
  
  return dp[1][b.length];
}