# Module 5 — Expected value

## Add up the average

_Use weighted outcomes and indicators to avoid case explosions._

Source: https://quantingit.com/learn/expectation · 18 min

**Prerequisites:** distributions

## Learning objectives

- Calculate a weighted average of possible payoffs.
- Use linearity even when terms are dependent.
- Break counting problems into indicator variables.

## Concepts

### 01. Expectation is a weighted average

For a discrete variable, $E[X]=\sum_x xP(X=x)$ when the expectation exists. It describes a model average, not a promise for the next outcome and not necessarily a value X can take. Keep losses negative and distinguish a gross payout from a net payoff after fees.

### 02. Linearity is the workhorse

$E[aX+bY+c]=aE[X]+bE[Y]+c$ for variables with finite expectations. Independence is not required. This often avoids finding the entire distribution of a complicated total. In contrast, $E[XY]=E[X]E[Y]$ is not generally valid without additional assumptions such as independence.

### 03. Count with indicators

An indicator I is 1 when an event occurs and 0 otherwise, so E[I]=P(event). If a total counts how many events occur, write it as a sum of indicators and add their probabilities. You can also average conditional means: split the model into exhaustive cases and weight each conditional expectation by its case probability.

## Worked examples

### Example 1: A signed payoff

A game gives a net payoff of +8 units with probability 1/4 and −2 units otherwise. What is its expected net payoff?

1. **List all net outcomes** — The payoffs already include any costs, so use +8 and −2 directly. Their probabilities are 1/4 and 3/4.
2. **Weight and add** — $E[X]=8(1/4)+(-2)(3/4)=2-1.5=0.5$.
3. **Interpret the answer** — The model average is +0.5 units per game. No individual game pays 0.5, and a positive mean does not remove risk.

### Example 2: Correctly returned badges

Ten named badges are randomly permuted among their ten owners, with every permutation equally likely. How many owners get their own badge, on average?

1. **Use one indicator per owner** — Let I_i be 1 if owner i receives the correct badge. The total correct returns is X=I_1+⋯+I_10.
2. **Use symmetry for one owner** — Each owner is equally likely to receive any of ten badges, so E[I_i]=P(I_i=1)=1/10.
3. **Add without requiring independence** — E[X]=10×(1/10)=1. Correct-return events are dependent, but linearity still applies.

## Concept checks

_Answer keys are graded server-side and not included._

1. X and Y are dependent and have finite means. Is E[X+Y]=E[X]+E[Y] valid?
   - Yes
   - Only if they are positively correlated
   - No

2. An indicator equals 1 with probability 0.12 and 0 otherwise. What is its expected value?
   - 0.88
   - 0.12
   - 1

3. A process is in state A 30% of the time, with conditional mean output 10; otherwise its conditional mean is 4. What is the overall mean?
   - 7
   - 14
   - 5.8

## Key results

- Keep payoff signs and fees consistent.
- Add expectations before seeking a full distribution.
- Write counts as sums of indicators.
- Average conditional means with the correct weights.
