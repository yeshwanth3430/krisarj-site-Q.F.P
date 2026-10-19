# Module 8 — Statistical estimation

## Quantify what you do not know

_Connect sample size, uncertainty, and honest conclusions._

Source: https://quantingit.com/learn/estimation · 20 min

**Prerequisites:** distributions, variance

## Learning objectives

- Distinguish sample spread from uncertainty in a sample mean.
- Estimate a proportion and its standard error.
- State the assumptions and interpretation of a confidence interval.

## Concepts

### 01. A sample mean is also random

For n independent identically distributed observations with mean μ and finite variance σ², the sample mean has expectation μ and variance σ²/n. Its standard deviation, called its standard error, is σ/√n. Four times as much data halves this standard error; it does not quarter it. Dependence can invalidate the independent-sample calculation.

### 02. Estimate a chance with a proportion

For n independent Bernoulli observations, the fraction of successes estimates p. Its true standard error is √[p(1−p)/n]. Replacing p by the observed proportion gives a plug-in estimate. A normal approximation is useful with enough expected successes and failures, but becomes unreliable near 0 or 1 or with very small samples.

### 03. Separate uncertainty from bias

Under suitable normal or large-sample assumptions, an approximate 95% confidence interval is estimate ±1.96 standard errors. The 95% refers to long-run coverage of the procedure over repeated samples; it is not a frequentist probability assigned to a fixed parameter after seeing one interval. More observations can reduce sampling noise while leaving selection bias untouched.

## Worked examples

### Example 1: Precision of a sample mean

Sixty-four independent observations from a normal population have sample mean 12. The population standard deviation is known to be 4. Find the standard error and a 95% confidence interval for the population mean.

1. **Scale the population spread** — The standard error is 4/√64=4/8=0.5. This describes uncertainty in the sample mean, not spread of individual observations.
2. **Find the margin** — Using the standard normal 97.5th percentile, approximately 1.96, the margin is 1.96×0.5=0.98.
3. **Center the interval** — The interval is [12−0.98,12+0.98]=[11.02,12.98]. Normality and known population spread justify the normal-based procedure here.

### Example 2: Estimating a success probability

A fixed process produces 96 successes in 400 independent trials. Estimate p and its standard error, and form an approximate 95% normal interval.

1. **Compute the observed proportion** — The estimate is 96/400=0.24. Both observed success and failure counts are comfortably away from zero.
2. **Plug into the standard-error formula** — The estimated standard error is √[0.24×0.76/400]≈0.02135.
3. **State the approximation** — The margin is about 1.96×0.02135≈0.04185, giving approximately [0.198,0.282]. This is a large-sample approximation under the independent, fixed-probability model.

## Concept checks

_Answer keys are graded server-side and not included._

1. Under the iid model with unchanged population variance, sample size grows from 100 to 400. What happens to the mean's standard error?
   - It quarters.
   - It halves.
   - It stays the same.

2. What does 95% confidence describe in the usual frequentist interpretation?
   - A 95% probability that every future observation is inside the interval.
   - A guarantee that this particular interval contains the mean.
   - The long-run fraction of intervals from this procedure that cover the fixed parameter.

3. An estimate uses only self-selected survey respondents. Does collecting many more respondents by the same mechanism guarantee removal of selection bias?
   - No
   - Yes, by the law of large numbers
   - Yes, once n exceeds 30

## Key results

- Standard error describes an estimator's sampling variation.
- More data helps at a square-root rate under independence.
- Label approximations and check their assumptions.
- Precision does not guarantee lack of bias.
