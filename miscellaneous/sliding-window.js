//BRUTE FORCE METHOD
const max_sub_array_of_size_k = function(k, arr) {
    maxSum = -1;
    // windowSums = [];
    for(i=0;i<=arr.length-k;i++) {
      windowSum = 0;
      for(j=i;j<i+k;j++){
          windowSum+=arr[j];
      }
      // windowSums.push(windowSum);
      if(windowSum > maxSum) {
          maxSum = windowSum;
      }
    }
    // console.log(windowSums);
    return maxSum;
  };

  console.log(max_sub_array_of_size_k(3, [1,5,2,3,4])); //10
  console.log(max_sub_array_of_size_k(5, [9,-3,2,22,-9,8,1,2])); //24