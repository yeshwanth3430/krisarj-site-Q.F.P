# Module 2 — Conditional probability

## Update on the evidence

_Choose the right denominator, then use Bayes naturally._

Source: https://quantingit.com/learn/conditioning · 18 min

**Prerequisites:** counting

## Learning objectives

- Read a conditional probability as a restricted sample space.
- Use total probability to account for every way evidence can occur.
- Explain why a rare cause can remain unlikely after a positive signal.

## Concepts

### 01. The given event becomes your world

If you know B occurred, discard outcomes outside B and renormalize the remaining weights. For $P(B)>0$, $P(A|B)=P(A\cap B)/P(B)$. The denominator is the event after the vertical bar. Swapping A and B usually changes the question.

### 02. Reverse a signal with Bayes

Both $P(A|B)P(B)$ and $P(B|A)P(A)$ describe the same intersection. Equating them gives $P(A|B)=P(B|A)P(A)/P(B)$. Think 'prior weight × compatibility with evidence, then normalize'. The denominator must include signals from every possible cause, including false positives.

### 03. Build the denominator by cases

If H and its complement exhaust the possibilities, $P(B)=P(B|H)P(H)+P(B|H^c)P(H^c)$. This is a weighted average, not an unweighted average of the two signal rates. A frequency table over an imagined population often makes the same calculation easier to audit.

### 04. Translate odds before using a probability

Odds in favor of H compare H with its complement. Odds a:b therefore mean $P(H)=a/(a+b)$, not a/b. For example, 2:3 odds mean a probability of 2/5. When both likelihoods are positive, Bayes also says posterior odds equal prior odds multiplied by the likelihood ratio $P(B|H)/P(B|H^c)$. Keep odds and probability as different quantities when interpreting a signal.

## Worked examples

### Example 1: Which machine made it?

Machine A makes 60% of a factory's parts and has a 2% defect rate. Machine B makes 40% and has a 5% defect rate. A random part is defective. What is the probability it came from B?

1. **Count an imagined batch** — Among 1,000 parts, A contributes 600 and B contributes 400. Their expected defective counts are 12 and 20 respectively. These are weighted counts, not a claim about one exact batch.
2. **Restrict to defective parts** — The defective pool has expected size 12+20=32. Of that pool, 20 come from B.
3. **Normalize** — $P(B|D)=20/32=5/8=62.5\%$. B makes fewer total parts but contributes more defects.

### Example 2: A coin chosen before a toss

A fair coin and a double-headed coin are equally likely to be selected. The chosen coin is tossed once and shows heads. What is the probability it is the double-headed coin?

1. **Weight the evidence under each choice** — Fair-and-heads has probability $(1/2)(1/2)=1/4$. Double-headed-and-heads has probability $(1/2)(1)=1/2$.
2. **Find the total heads probability** — $P(H)=1/4+1/2=3/4$. Both coin types can produce the observed result.
3. **Restrict and divide** — $P(\text{double-headed}|H)=(1/2)/(3/4)=2/3$. One head is evidence, not certainty.

## Concept checks

_Answer keys are graded server-side and not included._

1. In P(A|B), which event supplies the denominator?
   - A
   - B
   - The union of A and B

2. A source is type H with probability 0.25. It emits a signal with probability 0.8 if H and 0.2 otherwise. What is the signal probability?
   - 0.35
   - 0.50
   - 0.80

3. Holding sensitivity and false-positive rate fixed and nonzero, what happens to P(H|positive) when H becomes rarer?
   - It always remains equal to sensitivity.
   - It increases.
   - It decreases.

## Key results

- Read 'given' before calculating.
- Bayes reverses a conditional using prior weights.
- Include every route into the evidence.
- Use imagined counts when proportions feel abstract.
