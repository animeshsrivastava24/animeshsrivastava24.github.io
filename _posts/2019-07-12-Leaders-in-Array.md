---
layout: post
title: Leaders in the array
---

# Given an array of positive integers. Your task is to find the leaders in the array.

Note: An element of array is leader if it is greater than or equal to all the elements to its right side. Also, the rightmost element is always a leader. 

## 1. O(n^2) Complexity

```c
#include<stdio.h>
int leaders(int arr[], int size)
{
    
for(int i = 0 ; i<=size-2; i++)

{
 for(int j = i+1; j<size-1;j++)
 if(arr[i]>=arr[j]) if(j==size-2) printf("Leader %d\n",arr[i]);
 else break;
}


}

int main()
{
    
    int arr[5]={5,4,7,6,0};
    int sizeOfArray = sizeof(arr)/sizeof(arr[0]);
    leaders(arr,sizeOfArray);
    printf("Leader %d",arr[sizeOfArray-1]);
}
```


Result

```
Leader 7
Leader 0
```

## 2. O(n) Complexity 

```c
#include<stdio.h>
int leaders(int arr[], int size)
{
int max = arr[size-1];
for (int i = size-1; i >=0; i--) {
    // printf("The value of arr[%d] is %d and max is %d\n",i,arr[i],max);
    if(arr[i]>=max) {printf("Leader is %d\n",arr[i]); max =arr[i];}}

}

int main()
{
    
    int arr[5]={5,4,7,6,0};
    int sizeOfArray = sizeof(arr)/sizeof(arr[0]);
    leaders(arr,sizeOfArray);
}
```


Result

```
Leader is 0
Leader is 6
Leader is 7
```
