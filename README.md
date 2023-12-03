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

