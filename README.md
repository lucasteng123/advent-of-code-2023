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

# Day 3

Todays problem mostly consisted of finding symbols that were adjacent to numbers in a 2d grid. My first implementation of this for part one involved grabbing a box around each number in the grid that was 1 grid space larger in each direction, flattening it, and then searching for symbols within that. It was quite efficient and straight forward. It allowed me to abstract the 2d grid portion of the problem, as we did not care about the relative positions of the numbers and strings, only that they were adjacent. It also meant that we could functionally ignore the size of the number. The other approach of searching for the symbol first, then finding the number from that could end up more complex as you will have to keep track of the length of each number within the grid. 

### Part 2

Hey, look, we need to find each number adjacent to specific symbols. Now we will have to add the complexity we avoided in Part 2. This was not too bad, we just had to store the locations and lengths of each number as objects, then find each symbol and compare. Too bad we chose to go down the other path for part 1, this might have been an incredibly easy part 2. 

# Day 4

This was more an excercise in parsing than anything else. I have a flight to catch in the morning, so it is a very good thing it was an easier day. 

Part 2 could quite easily start ballooning in ram usage, but luckily we could just store the amount of copies of each card we should have, rather than copying the actual card. We get away with this as we don't actually have to mutate the values of any of the copies, they are all identical to the original.

# Day 5
Today was fairly difficult, I went through the process of writing out an implementation before I went ahead and implemented it. This was a great help, as it allowed me to quickly find out that one of the assumptions I was making was quit incorrect. 

Part 2 was a huge undertaking, that will be something I return to and optimize, but for now the feature functions. 

[Day 5 Design](src/design/day5.md)

# Day 6
Day 6 was suspiciously easy. Quick regex to get the values, then solve for the roots of a quadratic, the difference of which is the amount of times I would win. The only thing that tripped me up is I `.floor()`'d the values of the roots to get integer ms. Some of the roots were already integers, so were high by 1. 

# Day 7

These card hands remind me of the fantastic TCG/LCG (Doomtown)[https://pineboxentertainment.com/doomtown/]. These hands definitely are not legal poker hands. With that I do have some effects to resolve

!(Cheatin')[https://d1rw89lz12ur5s.cloudfront.net/photo/categoryonegames/file/b1ae47b00a4911e980d6e7465a739109/ata_snakebite.jpg]

With that out of the way, and some of your `dudes` `aced`, we get to the problem at hand.

We are given a hand of 5 cards (Aces high), and need to sort them by their relative strength. There are various hand types in a hierarchy to look for, and then if the hands match ties are broken by each card in the hand sequentially (rather than highest->lowest in more traditional card games).

My original concept was to parse each hand, sort out the type, then compare, falling back on the array of cards in the hand if needed. 

It turns out if you sort the hand by the frequencies of each card, then sort each hand by those frequencies sequentially, it will match the order of the hand ranks. 
Example:
```
Hand 1: Five of a kind
Frequencies: [5]

Hand 2: 2 pair: [2, 2, 1]

checking through the frequencies:
Index 0:
5>2
5 of a kind is better than 2 pair
```
You can see through the frequencies of all of the hand types, this holds true:

```
5         Five of a kind
4 1       Four of a kind
3 2       Full House
3 1 1     Three of a kind
2 2 1     Two Pair
2 1 1 1   One Pair
1 1 1 1 1 High Card
```

Next, to deal with the tiebreakers

If you append the values of each of the cards to the end of the frequencies, you can keep comparing until you find a higher value

Example:
```
                    | Freq | Hand
Hand 1: 3 5 5 5 4 => 3 1 1   3 5 5 5 4
Hand 2: 3 7 9 9 9 => 3 1 1   3 7 9 9 9 

We can step through it, seeing these hands are the same until the second card of the hands where Hand 2 wins with a 7. 


### Part 2

My implementation of part 1 made this incredibly easy
We can just store the frequency of the jokers, remove them from the frequency object, then add it to the remaining highest frequency. There is one edge case that came up was the hand `JJJJJ`. If this happened, I removed that whole item from the object, which caused it to be empty. This was fairly easily fixed by checking to see if that object was empty, and if it was, just adding it back in. It would also be a good solution to just manually checking for this edge case and directly returning [5]

```
# Day 8

# Day 9