/**
给定一个含有 n 个正整数的数组和一个正整数 target 。
找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

示例 1：
输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。

示例 2：
输入：target = 4, nums = [1,4,4]
输出：1

示例 3：
输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0

提示：
1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 105
 
进阶：

如果你已经实现 O(n) 时间复杂度的解法, 请尝试设计一个 O(n log(n)) 时间复杂度的解法。

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/minimum-size-subarray-sum
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

 */


/**
 * @param {number} target 正整数目标值
 * @param {number[]} nums 含有 n 个正整数的数组
 * @return {number}
 */

/**
 * 根据题目所得：
 * 1. 结果是长度最小的连续子数组
 * 1. 若数组总值不超过目标值，结果为0，
 * 2. 若数组总值超过目标值，最小的长度值为1，所以若数组中有大于等于目标值的，长度可以视为1，并跳出循环返回结果
 * 
 * 思路: 由于是连续的子数组，所以可以将数组视作贪吃蛇（arr），挑战至少吃几个撑死（极限值arrLen，默认为0），
 * 贪吃蛇容量(total)有限，最大容量为（target）,遍历数组，贪吃蛇每吃下去一个值都判断，
 * 容量(total)是否超过最大容量（target），若超过，记录撑死的极限值
 * 1. 不超过，贪吃蛇吃吃吃!!直到撑死为止，若遍历结束都吃不饱，则极限值未知，默认0
 * 2. 超过，判断贪吃蛇刚吃下去的东西，需要拉出多少东西才能保证不撑死，并且更新会撑死的极限值
 * 
 * 解题过程：数组[2,3,1,2,4,3]，目标值7
 * [2..........]: 吃掉2，贪吃蛇[2] = 2, 小于7, 极限未知
 * [2,3........]：吃掉3，贪吃蛇[2,3] = 5, 小于7, 极限未知
 * [2,3,1......]：吃掉1，贪吃蛇[2,3,1] = 6, 小于7, 极限未知
 * [2,3,1,2....]：吃掉2，贪吃蛇[2,3,1,2] = 8, 大于7, 拉出[2]，贪吃蛇[3,1,2]，极限吃4个（2,3,1,2）
 * [2,3,1,2,4..]：吃掉4，贪吃蛇[3,1,2,4] = 10, 大于7, 拉出[3,1]，贪吃蛇[2,4]，极限吃3个（1,2,4）
 * [2,3,1,2,4,3]：吃掉3，贪吃蛇[2,4,3] = 9, 大于7, 拉出[2,4], 贪吃蛇[3], 极限吃2个（4,3）
*/

/*
var minSubArrayLen = function(target, nums) {
    let total = 0,arr = [], arrLen = 0
    for(let i = 0;i<nums.length;i++) {
        let val = nums[i]
        total += val
        arr.push(val) // 我吃

        // 白吃（吃完达到极限值了，还需要再吃，极限值会增加，无意义）
        if(arr.length === arrLen && total < target) {
            total -= arr[0]
            arr.shift() // 我拉
        } else {
            // 吃撑
            // 拉肚子时间，拉到不撑退出循环
            while(total >= target) {
                
                // 更新当前撑死的极限值
                if(total >= target) {
                    arrLen = arr.length
                }
                total -= arr[0]
                arr.shift() // 我拉
            }

            // 极限值若有值，最小为1，此时可直接退出循环
            if(arrLen === 1){
                break;
            }
        }
    }
    return arrLen
};
*/

// 优化，与贪吃蛇思想一致，使用数组增加和移除太耗性能，所以改为了标记下标，即贪吃蛇头尾arr标记为tailIndex和headIndex
var minSubArrayLen = function (target, nums) {
    let total = 0,
        tailIndex = 0, // 尾巴下标
        headIndex = 0, // 头部下标
        arrLen = 0
    for (let i = 0; i < nums.length; i++) {
        // 白吃（已经知道极限值，吃完还需要再吃，无意义）
        if (arrLen && total + nums[i] <= target) {
            // 吃一个拉一个
            total = total - nums[tailIndex] + nums[i]
            headIndex = i // 更新头部的下标
            tailIndex++ // 更新尾巴的下标
        } else {
            total += nums[i] // 吃
            // 吃撑
            if (total >= target) {
                headIndex = i // 更新头部的下标

                // 拉肚子时间，拉到不撑退出循环
                for (let j = tailIndex; j <= i; j++) {
                    total -= nums[tailIndex] // 拉
                    tailIndex++ // 更新尾巴的下标
                    
                    // 拉完不撑，记录极限值
                    if (total < target) {
                         // +2 原因: 一个是拉完的长度要+1才是极限值，一个是下标从0开始的，个数要+1
                        arrLen = i - tailIndex + 2
                        break;
                    }
                }
            }
            // 极限值若有值，最小为1，此时可直接退出循环
            if (arrLen === 1) {
                break;
            }
        }
    }
    return arrLen
};


/**
 * 执行用时：64 ms, 在所有 JavaScript 提交中击败了81.56%的用户
 * 内存消耗：45.1 MB, 在所有 JavaScript 提交中击败了78.92%的用户
 * 通过测试用例：21 / 21
 */