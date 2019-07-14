---
layout: post
title: Sieve of Eratosthenes
---

# Given a number n, print all primes smaller than or equal to n. It is also given that n is a small number.

To summarise this question, we have following **parts** and then we join them together to form the answer

## Part 1
Generate a list from **0** to **n** {We need to start the marking from number 2. So we need to generate a list from 0, so that index 2 matches with
element 2}.

## Part 2

### How to set all elements of an array to **zero** or any same value?

If array has static storage allocation, it is default set to 0
```c
int arr[10] = {0}; // all elements to be 0
int arr[10]= {5}; //only arr[0] to 5 rest all to 0
int arr[10]; // all elements to be 0
```

So let's try **memset** (it is a function from <string.h>)

**memset(ptr to list, value, length)**

Application (along with a query in app:2)

**App: 1** 

```c
char str[] = ""beautiful earth";
memset(str,'*',6);
O/P: ******ful earth
```
**App: 2** 

Can we apply this to integer? 
```c
int arr[15];
memset(arr,1,15);
```

Answer is No, we can't - A simple reason is that we don't use memeset to initialize anything else than single-byte data types.

gcc provides an alternative to initialize int arrays with a shortcut

```c
int arr[32]={[0 ... 31] = 1};
```

Don't forget space before and after ...

## Part 3

So we can use a  `boolean` array(or an `integer` array) as per requirement

* boolean array(integer array) : set all elements to initially `true`(1) and when you cut an element set it to `false`(0).

```c
bool prime[n+1]; // int prime[n+1]
memset(prime, true, sizeof(prime)); // int arr[n+1]={[0 ... n] = 1}; I need to recheck this once [Update required]

for (int p=2; p*p<=n; p++) 
    { 
        // If prime[p] is not changed, then it is a prime 
        if (prime[p] == true)  // prime[p] ==1
        { 
            // Update all multiples of p greater than or  
            // equal to the square of it 
            // numbers which are multiple of p and are 
            // less than p^2 are already been marked.  
            for (int i=p*p; i<=n; i += p) 
                prime[i] = false;  //prime[p]=0

        } 
    } 

    for (int p=2; p<=n; p++) 
       if (prime[p]) 
          printf("%d\t",p); 
} 

```






