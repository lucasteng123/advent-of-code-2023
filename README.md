# advent-of-code-2022

# Day 1
It's good to be back. 

Part one was fairly easy, just some string manipulation. Forgot how to convert to numbers for a bit, but that wasn't so bad in the end.

Part 2 took me far too long to realize the overlap. My original solution involved using regex to find all of the digits, but it wouldn't find something like `eightwo` (82)
swapped to using a frame to look through the string, and that worked out. 

Also had some fun with my typescript setup, I am happy to be doing this to shake off the rust. 

# Day 2

I think I way overcomplicated this, it works but it is pretty complex for the fairly simple task. 
I will want to come back to this at some point, but hey, at least it's readable. 

EDIT - Day 2.1

I really did overcomplicate this, refactored it to be much simpler
- Each game only cares about the highest value across the game for legality
- this makes much more of the code reusable for pt2
- instead of the complicated string manipulation, I can instead split the number and color by the space that is between them. `2 red`
- instead of looking at the round as any number of `number color` pairs, splitting each pair into it's own "round" made things a lot easier as well. 

# Day 5
Today was fairly difficult, I went through the process of writing out an implementation before I went ahead and implemented it. This was a great help, as it allowed me to quickly find out that one of the assumptions I was making was quit incorrect. 

Part 2 was a huge undertaking, that will be something I return to and optimize, but for now the feature functions. 

[Day 5 Design](src/design/day5.md)

# Day 6
Day 6 was suspiciously easy. Quick regex to get the values, then solve for the roots of a quadratic, the difference of which is the amount of times I would win. The only thing that tripped me up is I `.floor()`'d the values of the roots to get integer ms. Some of the roots were already integers, so were high by 1. 
