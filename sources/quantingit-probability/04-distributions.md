# Module 4 — Random variables & distributions

## Choose a model that fits

_Translate random experiments into useful distributions._

Source: https://quantingit.com/learn/distributions · 18 min

**Prerequisites:** counting, independence

## Learning objectives

- Distinguish an outcome from the value of a random variable.
- Recognize the assumptions behind a binomial model.
- Use area, rather than point height, for continuous probabilities.

## Concepts

### 01. A random variable summarizes an outcome

A random variable assigns a number to each outcome. The same experiment can support several variables: number of heads, longest run, or total payoff. A probability mass function assigns weights to discrete values; those weights must be nonnegative and sum to one.

### 02. Count successes in a fixed window

A Bernoulli variable is 1 for success and 0 for failure. A binomial count X uses n independent Bernoulli trials with the same success chance p. Then $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$ for k=0,…,n. The combination counts placements; the product weights each placement. Changing p across trials or drawing without replacement generally breaks this model.

### 03. A density is not a point probability

For a continuous variable, probabilities are areas under its density. A single point has probability zero even when the density there is positive. For a uniform variable on [a,b], the density is 1/(b−a), and an interval inside the support has probability equal to its length divided by b−a. A density may exceed one; its total area must equal one.

## Worked examples

### Example 1: Two wins in three trials

Three independent trials each succeed with probability 1/2. What is the probability of exactly two successes?

1. **Confirm the model** — There is a fixed number of independent trials, and all have the same success probability: X is binomial with n=3 and p=1/2.
2. **Choose the successful positions** — There are $\binom{3}{2}=3$ placements: SSF, SFS, and FSS. Each has probability 1/8.
3. **Add the weights** — The placements are disjoint, so P(X=2)=3/8. A single ordered sequence would give only 1/8.

### Example 2: Uniform waiting window

A simulated arrival time X is uniform from 2 to 8 minutes. What are P(3≤X≤5) and P(X=4)?

1. **Measure the support** — The full interval has length 8−2=6. Its constant density is 1/6 per minute.
2. **Measure the event** — The interval from 3 to 5 has length 2, so its probability is 2/6=1/3.
3. **Separate a point from a neighborhood** — P(X=4)=0 because one exact point has zero width. This does not say that times near 4 are impossible.

## Concept checks

_Answer keys are graded server-side and not included._

1. Which experiment is directly binomial?
   - Count red balls in five draws without replacement.
   - Count successes in five independent trials, each with p=0.3.
   - Wait until the fifth success.

2. A variable has a continuous density. What is the probability of any one exact value?
   - Zero
   - The density at that value
   - One divided by the maximum density

3. A discrete variable only takes 0, 1, or 2. P(X=0)=0.2 and P(X=1)=0.5. What must P(X=2) be?
   - 0.7
   - 0.5
   - 0.3

## Key results

- Identify what is being counted or measured.
- Check distribution assumptions before using its formula.
- A PMF gives point probabilities; a PDF gives density.
- A model must assign total probability one.
