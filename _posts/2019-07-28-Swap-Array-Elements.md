---
layout: post
title: Swapping Elements in an array
---

# How to Swap Elements of an Array

There are different versions of this code but the most easiest one which I found is

```c
void swap(int arr[], int a, int b) // or void swap(int *arr, int a , int b)
{
arr[a] = arr[a]+arr[b];
arr[b] = arr[a]- arr[b];
arr[a] = arr[a]-arr[b];
}
```

The above implementation is easiest one.

Now let's look to a different one. But before that remember:

`A+1 = &A[1]`

and

`*(A+1) = *&A[1] = A[1]`


```c
void swap(int *a, int *b)
{
*a = *a + *b;
*b = *a - *b;
*a = *a - *b;
}
```
To use the above function on an array elements we need to pass them a pointer variables, to understand it better, if a function needs an
`int` vairable you directly pass an `int` variable say `a`. So, if a function needs an `int*` variable you can directly pass to an `int*`
declared `pointer to integer variable`.

So to call the above function we need to call `swap(A+0,A+1)`




