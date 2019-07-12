---
layout: post
title: Subset Generation Problem
---

# This technique shows how a nested for loop in few problems can be converted to single for loop and hence reducing the time complexity.

Given an array of integers of size 'n'. Our aim is to calculate the maximum sum of 'k' consecutive elements in the array.

```c
#include<stdio.h>
int maxKsum(int arr[],int k, int size)
{
int max_sum=0, curr_sum=0, win_sum=0;    
if(size>=k)
//initialize maximum sum
{
for(int i=0;i<k;i++) {win_sum+= arr[i];}
max_sum = win_sum;
curr_sum = win_sum;
// printf("%d\n",max_sum);
for(int i = 1; i<=(size-k) ;i++) {
// {   a b c d e f
//     0 1 2 3 4 5
// i=1   | | i+k-1 = 1+2-1= 2   
    curr_sum = curr_sum - arr[i-1] + arr[i+k-1];
    if(curr_sum>max_sum) max_sum = curr_sum;
}
    printf("%d\n",max_sum);
}
else return;
}

int main()
{
    
    int arr[5]={1,9,3,3,0};
    int sizeOfArray = sizeof(arr)/sizeof(arr[0]);
    printf("The size of array is %d\n",sizeOfArray);
    int k = 2;
    maxKsum(arr,k,sizeOfArray);
    return 0;
}
```


Result

```
The size of array is 5
12
```
