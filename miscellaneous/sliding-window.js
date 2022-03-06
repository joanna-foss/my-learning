//BRUTE FORCE METHOD O(n*k)
const max_sub_array_of_size_k = function(k, arr) {
    let maxSum = -1;
    // windowSums = [];
    for(i=0;i<=arr.length-k;i++) {
      let windowSum = 0;
      for(j=i;j<i+k;j++){
          windowSum+=arr[j];
      }
      // windowSums.push(windowSum);
      maxSum = Math.max(windowSum, maxSum);
    }
    // console.log(windowSums);
    return maxSum;
  };

  console.log(max_sub_array_of_size_k(3, [1,5,2,3,4])); //10
  console.log(max_sub_array_of_size_k(5, [9,-3,2,22,-9,8,1,2])); //24

  //OPTIMAL SOLUTION O(n)
  const max_sub_array_of_size_l = (l, arr) => {
    let maxSum = 0;
    let windowSum = 0;
    let windowStart = 0;

    for(let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
      windowSum += arr[windowEnd];

      if(windowEnd >= l-1) {
        maxSum = Math.max(maxSum, windowSum);
        windowSum -= arr[windowStart];
        windowStart++;
      }
    }

    return maxSum;
  }

  console.log(max_sub_array_of_size_l(3, [1,5,2,3,4])); //10
  console.log(max_sub_array_of_size_l(5, [9,-3,2,22,-9,8,1,2])); //24

  //OPTIMAL SOLUTION
  const smallest_subarray_length = (arr, target) => {
    let smallest_length = Infinity;
    let subarray_sum = 0;
    let windowStart = 0;

    for(let windowEnd = 0; windowEnd<arr.length; windowEnd++) {
      subarray_sum += arr[windowEnd];
      while(subarray_sum >= target) {
        smallest_length = Math.min(smallest_length, windowEnd-windowStart + 1);
        subarray_sum -= arr[windowStart];
        windowStart += 1;
      }
    }
    if (smallest_length === Infinity) {
      return 0;
    }
    return smallest_length;
  }

  console.log(smallest_subarray_length([2, 1, 5, 2, 3, 2], 7)); //2
  console.log(smallest_subarray_length([2, 1, 5, 2, 8], 7)) //1
  console.log(smallest_subarray_length([3, 4, 1, 1, 6], 8)); //3