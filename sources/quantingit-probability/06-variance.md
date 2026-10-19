# Module 6 — Variance & covariance

## Measure what the mean hides

_Track spread, scale, and the way variables move together._

Source: https://quantingit.com/learn/variance · 18 min

**Prerequisites:** expectation

## Learning objectives

- Calculate variance using a second moment.
- Handle translations and scaling correctly.
- Include covariance when adding dependent quantities.

## Concepts

### 01. Spread around a mean

Variance is $\operatorname{Var}(X)=E[(X-E[X])^2]=E[X^2]-E[X]^2$ for finite second moments. It uses squared units. Standard deviation is the nonnegative square root and has the original units. Two distributions can share a mean while carrying very different uncertainty.

### 02. Shifting does not spread; scaling does

Adding a constant moves every outcome and the mean equally, leaving deviations unchanged. Multiplying by a changes each deviation by a and its square by a²: $\operatorname{Var}(aX+b)=a^2\operatorname{Var}(X)$. A negative multiplier also squares, so variance cannot become negative.

### 03. The missing cross-term

$\operatorname{Var}(X+Y)=\operatorname{Var}(X)+\operatorname{Var}(Y)+2\operatorname{Cov}(X,Y)$. Covariance records whether deviations tend to align. Independence implies zero covariance when second moments exist, but zero covariance does not generally imply independence. For a weighted sum, the cross-term becomes 2ab Cov(X,Y).

## Worked examples

### Example 1: Spread of a fair die

Find the variance of a fair six-sided die value X.

1. **Find the mean** — E[X]=(1+2+3+4+5+6)/6=7/2.
2. **Find the second moment** — E[X²]=(1+4+9+16+25+36)/6=91/6. Square the outcomes before averaging.
3. **Subtract the squared mean** — $\operatorname{Var}(X)=91/6-(7/2)^2=182/12-147/12=35/12$. This is distinct from E[X²].

### Example 2: Two quantities moving against each other

X and Y have variances 4 and 9, and covariance −1. What is the variance of X+Y?

1. **Keep the covariance term** — The problem supplies dependence information, so do not simply add 4 and 9.
2. **Substitute into the sum rule** — Var(X+Y)=4+9+2(−1)=11.
3. **Check the direction** — Negative covariance reduces the total spread relative to the zero-covariance value 13. It does not make the variance negative.

## Concept checks

_Answer keys are graded server-side and not included._

1. Var(X)=5. What is Var(X+100)?
   - 105
   - 5
   - 10005

2. Var(X)=2. What is Var(−3X)?
   - −6
   - 6
   - 18

3. Which statement is valid for variables with finite second moments?
   - Independence implies zero covariance.
   - Zero covariance always implies independence.
   - Covariance is always nonnegative.

## Key results

- Average squares before subtracting the squared mean.
- Constant shifts do not affect variance.
- Scale factors are squared.
- Look for a covariance term before adding spreads.
