# Module 3 — Independence

## Know when to multiply

_Separate independence, exclusion, and conditioning._

Source: https://quantingit.com/learn/independence · 16 min

**Prerequisites:** conditioning

## Learning objectives

- Test independence with an intersection probability.
- Recognize that disjoint positive-probability events are dependent.
- Distinguish pairwise independence from mutual independence.

## Concepts

### 01. Independence is an equation

Events A and B are independent when $P(A\cap B)=P(A)P(B)$. If P(B)>0, this means learning B does not change the chance of A. Independence is a property of the probability model, not something established because two events sound unrelated.

### 02. Different from mutually exclusive

Mutually exclusive events cannot both happen: their intersection probability is zero. If each has positive probability, their product is positive, so they cannot be independent. Learning one occurred rules out the other. By contrast, independent events can occur together.

### 03. A group needs more than pairwise checks

For three events, mutual independence requires every pairwise factorization and the triple factorization. Pairwise independence alone can hide a constraint linking all three. Conditioning can also create dependence: independent dice become dependent once their sum is known.

## Worked examples

### Example 1: Parity on two dice

Roll two independent fair dice. Let A mean the first die is even and B mean the sum is odd. Are A and B independent?

1. **Find the marginal probabilities** — Half the first-die faces are even, so P(A)=1/2. The sum is odd when one die is even and the other odd, so P(B)=1/2.
2. **Count their intersection** — For A and B together, the first die is even and the second odd. There are 3×3=9 ordered pairs out of 36: P(A∩B)=1/4.
3. **Compare with the product** — $1/4=(1/2)(1/2)$, so the events are independent. An event involving both dice can still be independent of an event on one die.

### Example 2: Pairwise is not the whole story

Toss two independent fair coins. A is first coin heads, B is second coin heads, and C is both coins matching. Are the three events mutually independent?

1. **Check each pair** — Each event has probability 1/2. A∩B, A∩C, and B∩C each occur only on HH, with probability 1/4. Every pair is independent.
2. **Check the triple** — A∩B∩C is still HH, with probability 1/4. But P(A)P(B)P(C)=1/8.
3. **Identify the hidden relation** — The events are pairwise independent but not mutually independent. Once both individual coin outcomes are known, matching is determined.

## Concept checks

_Answer keys are graded server-side and not included._

1. Two mutually exclusive events each have probability strictly between 0 and 1. Can they be independent?
   - Yes, because they cannot influence each other.
   - No, because their intersection is zero but their probability product is positive.
   - Only when their probabilities are equal.

2. P(A)=0.4, P(B)=0.5, and P(A∩B)=0.2. Are A and B independent?
   - Yes
   - No
   - There is not enough information

3. An urn has two red and two blue balls. Two draws are made without replacement. Does a red first draw change the probability of a red second draw?
   - No; both colors began equally likely.
   - Yes; it increases to 2/3.
   - Yes; it decreases from 1/2 to 1/3.

## Key results

- Independence means probabilities factor.
- Disjoint is usually the opposite of independent.
- Check the full collection, not only each pair.
- State whether conditioning changes the model.
