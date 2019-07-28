---
layout: post
title: Insertion Sort Loop Concept
---

The code which I thought to simplify

```c
void InsertionSort(int arr[], int n)
{
for(int i = 1; i< n; i++)
{
int k = arr[i], j; // the element to be inserted
printf("The element from the unsorted array is %d\n",k);
for(j = i-1; j>=0 && k<arr[j];j--) arr[j+1] = arr[j];
arr[j+1] = k;
}}
```

I thought I could modify the inner loop to be
```c
for(j = i-1; j>=0;j--) if(k<arr[j]) arr[j+1] = arr[j];
arr[j+1] = k;
```

But this is wrong.

### Explanation

The foor loop only decrements the j when both condition `j>=0` and `k<arr[j]` ia true and executes shift
but in second method the loop decrements j when `j>=0` despite of the fact whether `k<arr[j]` and then  `k<arr[j]` determines shifting

So we need to take such care.
I am working to simplify the loop.
