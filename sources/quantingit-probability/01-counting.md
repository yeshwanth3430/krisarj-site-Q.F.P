# Module 1 — Counting & sample spaces

## Count the right things

_Turn a story into an equally likely sample space._

Source: https://quantingit.com/learn/counting · 14 min

## Learning objectives

- Specify the elementary outcomes before dividing counts.
- Distinguish selections from arrangements.
- Use a complement when counting the unwanted event is easier.

## Concepts

### 01. Start underneath the story

A probability model begins with possible outcomes and their weights. Counting favorable outcomes and dividing by all outcomes works only when the elementary outcomes are equally likely. Two fair dice have 36 ordered face pairs. Their eleven possible sums are not equally likely: a sum of 7 has six supporting pairs, while a sum of 2 has one.

### 02. Does order change the outcome?

Fill ordered positions one at a time. Choosing a captain and a deputy from n people gives n(n−1) outcomes when one person cannot hold both roles. A two-person committee has no roles; each committee was counted twice, so divide by 2. In general, ordered selections of k distinct items number n!/(n−k)!, and unordered selections number $\binom{n}{k}=n!/[k!(n-k)!]$. State whether replacement is allowed before using either.

### 03. Count the simpler side

Every event and its complement divide the sample space into two disjoint parts. Therefore $P(A)=1-P(A^c)$. For an 'at least one' question, 'none' is often a single product. This shortcut still needs the right dependence assumptions: multiply fixed probabilities across trials only when that is justified.

## Worked examples

### Example 1: Two different jobs

Seven distinct applicants are equally likely to receive two different roles: lead and reviewer. Nobody can fill both. How many assignments are possible, and what is the probability that Mira is selected for either role?

1. **Define an assignment** — An outcome is an ordered pair (lead, reviewer), so there are $7\times6=42$ assignments.
2. **Count the two disjoint cases** — Mira can lead with any of six reviewers, or review for any of six leads. These cases cannot overlap. Favorable assignments: 6+6=12.
3. **Form the ratio** — The probability is $12/42=2/7$. As a check, exactly two of seven symmetric applicants are chosen.

### Example 2: Exactly one six

Two independent fair six-sided dice are rolled. What is the probability that exactly one die shows six?

1. **Keep the dice distinguishable** — There are 36 ordered pairs. A six on the first die and a six on the second die are different placements.
2. **Exclude the double six** — First die six, second not six gives five pairs. Second die six, first not six gives five more. The pair (6,6) belongs to neither case.
3. **Add disjoint counts** — There are ten favorable pairs, so the probability is $10/36=5/18$. The word 'exactly' prevents counting (6,6).

## Concept checks

_Answer keys are graded server-side and not included._

1. Three distinct roles are assigned to different people from seven applicants. How many assignments?
   - 35
   - 210
   - 343

2. Three independent fair coins are tossed. What is the probability of at least one head?
   - 1/2
   - 3/8
   - 7/8

3. Why can you not assign probability 1/11 to every sum of two fair dice?
   - The sums have different numbers of equally likely ordered pairs.
   - The dice are dependent.
   - A sum can never be used as a random variable.

## Key results

- Choose the elementary outcome first.
- Multiply along a sequence of choices; add mutually exclusive cases.
- Divide out rearrangements only when order does not matter.
- Try the complement for 'at least one'.
