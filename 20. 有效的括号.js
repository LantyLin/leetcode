/* 
给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
每个右括号都有一个对应的相同类型的左括号。
 
示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false
 

提示：
1 <= s.length <= 104
s 仅由括号 '()[]{}' 组成

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/valid-parentheses
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
*/


/**
 * @param {string} s
 * @return {boolean}
 */

// 根据题目所得：字符串长度一定是偶数
// 思路：记录偶数字符串中未被处理的左括号和最新的左括号，每遇到一个左括号就加入数组，每匹配到一个相应的右括号就移出数组
// 过程中：如果有与最新左括号不匹配的右括号，直接跳出循环，判断为无效字符。执行到最后如果还有未被处理左括号也视作无效字符
var isValid = function (s) {
    // 过滤s长度为奇数的字符
    if (s.length % 2 !== 0) {
        return false
    } else {
        let leftArr = [], // 记录左括号个数
            latestLeft = '', // 最新的左括号
            isValid = true // 是否有效
        for (let i = 0; i < s.length; i++) {
            if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
                // 左括号
                leftArr.push(s[i])
                latestLeft = s[i]
            } else if (
                !latestLeft
                || latestLeft === '(' && s[i] !== ')'
                || latestLeft === '[' && s[i] !== ']'
                || latestLeft === '{' && s[i] !== '}'
            ) {
                // 没有左括号，或者上一个是左括号，当前不是对应的右括号
                isValid = false
                break
            } else {
                // 匹配到对应的右括号
                leftArr.pop()
                latestLeft = leftArr[leftArr.length - 1]
            }
        }
        // 还有未处理的左括号
        if(leftArr.length) {
            return false
        }
        return isValid
    }
};

/* 
执行用时：80 ms, 在所有 JavaScript 提交中击败了22.03%的用户
内存消耗：41.8 MB, 在所有 JavaScript 提交中击败了31.32%的用户
通过测试用例：93 / 93
 */

// 别人的思路： 采用替换法，采用while循环，替换[],{},()，直到字符中不存在任何对称括号，循环结束后若字符不为空，则视为无效字符