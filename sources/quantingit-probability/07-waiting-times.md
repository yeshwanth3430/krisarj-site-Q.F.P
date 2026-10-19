# Module 7 — Waiting times & processes

## Reason about the wait

_Use geometric trials, memorylessness, and small state models._

Source: https://quantingit.com/learn/waiting-times · 20 min

**Prerequisites:** independence, expectation

## Learning objectives

- State which convention a geometric variable uses.
- Use the memoryless property only when assumptions hold.
- Build a recurrence when a pattern requires multiple states.

## Concepts

### 01. First success after repeated attempts

Suppose trials are independent with fixed success probability p>0, and T counts trials through the first success. Then $P(T=k)=(1-p)^{k-1}p$ for k≥1, and E[T]=1/p. If instead you count failures before success, that variable is T−1 and its mean is (1−p)/p. Naming the convention prevents an off-by-one error.

### 02. Past failures do not make success due

For geometric T, $P(T>m+n|T>m)=P(T>n)$. Given m failures, the remaining wait follows the same model because future trials remain independent with the same p. This does not apply to sampling without replacement, a changing success chance, or a mechanism that learns from failures.

### 03. A pattern needs a state

Waiting for consecutive successes is different from waiting for a single success. Track the useful suffix of the history: for two heads in a row, either you have no trailing head or one trailing head. Write 'one trial plus the expected remaining work' for each state, then solve the simultaneous equations.

## Worked examples

### Example 1: A 20% success chance

Independent trials succeed with probability 0.2. T counts attempts through the first success. Find E[T] and P(T>3).

1. **Use the trial-count convention** — The successful trial is included, so T starts at 1 and E[T]=1/0.2=5.
2. **Translate the tail event** — T>3 means that all of the first three attempts fail. The fourth attempt need not be the success.
3. **Multiply independent failures** — P(T>3)=0.8³=0.512. A mean wait of 5 does not make the wait exactly five trials.

### Example 2: Two heads in a row

Toss an independent fair coin until HH first appears. What is the expected number of tosses from the start?

1. **Name the two unfinished states** — Let E₀ be the remaining mean wait with no trailing head, and E₁ with one trailing head. The completed HH state has zero remaining wait.
2. **Write first-step equations** — From no trailing head: E₀=1+(1/2)E₀+(1/2)E₁. From one head: E₁=1+(1/2)E₀, since a head finishes and a tail resets the useful suffix.
3. **Solve and interpret** — The first equation gives E₀=2+E₁. Substitute the second to get E₀=3+E₀/2, hence E₀=6. Treating disjoint pairs as single trials would answer a different stopping rule.

## Concept checks

_Answer keys are graded server-side and not included._

1. Each independent attempt succeeds with probability 1/5. What is the expected number of failures before the first success?
   - 4
   - 5
   - 6

2. A fixed-p independent trial process has failed ten times. What is the chance the next trial succeeds?
   - More than p, because success is due.
   - p
   - Less than p, because the process is unlucky.

3. While waiting for two consecutive heads, the current last toss is H. A tail arrives. What state should a first-step recurrence use next?
   - The completed state
   - One trailing head
   - No trailing head

## Key results

- Say whether you count trials or failures.
- A geometric tail means several failures in a row.
- Memorylessness comes from the model, not from intuition about luck.
- For patterns, model the useful history as states.
