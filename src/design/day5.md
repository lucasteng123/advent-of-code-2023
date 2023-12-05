# Problem
## Part 1
We have an almanac that lists number transformations
example: `50 98 2`
In this example, 50 and 51 must become 98 and 99

While the example input has relatively small numbers, it should be assumed the full input will be much larger. 
My original thought is to parse the translations through first, create a list of translations that cover the maximum range of the translations, but this will most likely balloon out of control. 

Instead, I will use the seeds as the starting point, running it through each translation in turn. 

A couple assumptions I will be making: 
- The transformations only apply once (i.e. there is not two "soil to x" translations)
- they always follow the same path
- I don't need to care what the translations are called

one assumption I got wrong:
- All of the mutations are applied sequentially to the seed. It is only the first one in each group.


## Part 2

The seed inputs are not individual seeds, they are ranges of seeds.
These are going to be MASSIVE

My first try at this is going to be the CPU GO BRR method, then I will try and do some optimization.
Cpu go BRR method worked, improved significantly through the power of ✨ worker threads ✨. 

first thing I want to try is to see if there is overlap in the seed numbers, so we aren't checking the same paths over and over again

Second thing, the outputs are generally sequential, until you get to the next threshold. We can use this to our advantage, skipping large amounts of numbers by also returning what the next threshold seed number would be for each group. 
