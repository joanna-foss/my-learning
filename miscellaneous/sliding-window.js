//BRUTE FORCE METHOD O(n*k)
const max_sub_array_of_size_k = function(k, arr) {
    maxSum = -1;
    // windowSums = [];
    for(i=0;i<=arr.length-k;i++) {
      windowSum = 0;
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

  //SLIDING WINDOW METHOD O(n)
  const max_sub_array_of_size_l = (l, arr) => {
    maxSum = 0;
    windowSum = 0;
    windowStart = 0;

    for(windowEnd = 0; windowEnd < arr.length; windowEnd++) {
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