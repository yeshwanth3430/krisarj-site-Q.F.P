# Options Playbook: strategy reference

Key facts from the public pages at https://www.optionsplaybook.com/option-strategies, collected 2026-10-19 for personal study.
Fields are trimmed to the rule itself. For the full write-up (The strategy, Options guys tips, The sweet spot, As time goes by, Implied volatility), open the source link.

## Rookies

| # | Strategy | Outlook | Source |
|---|---|---|---|
| 1 | [Covered Call](#covered-call) | Bull / Neutral | [link](https://www.optionsplaybook.com/option-strategies/covered-call) |
| 2 | [Protective Put](#protective-put) | Bull | [link](https://www.optionsplaybook.com/option-strategies/protective-put) |
| 3 | [Collar](#collar-option) | Bull / Question | [link](https://www.optionsplaybook.com/option-strategies/collar-option) |
| 4 | [Cash-Secured Put](#cash-secured-put) | Bearish / Bull | [link](https://www.optionsplaybook.com/option-strategies/cash-secured-put) |

## Veterans

| # | Strategy | Outlook | Source |
|---|---|---|---|
| 1 | [Long Call](#long-call) | Bull | [link](https://www.optionsplaybook.com/option-strategies/long-call) |
| 2 | [Long Put](#long-put) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/long-put) |
| 3 | [Fig Leaf](#leveraged-covered-call) | Bull | [link](https://www.optionsplaybook.com/option-strategies/leveraged-covered-call) |
| 4 | [Long Call Spread](#long-call-spread) | Bull | [link](https://www.optionsplaybook.com/option-strategies/long-call-spread) |
| 5 | [Long Put Spread](#long-put-spread) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/long-put-spread) |

## Seasoned Veterans

| # | Strategy | Outlook | Source |
|---|---|---|---|
| 1 | [Short Call Spread](#short-call-spread) | Bearish / Neutral | [link](https://www.optionsplaybook.com/option-strategies/short-call-spread) |
| 2 | [Short Put Spread](#short-put-spread) | Bull / Neutral | [link](https://www.optionsplaybook.com/option-strategies/short-put-spread) |
| 3 | [Long Straddle](#long-straddle) | Question | [link](https://www.optionsplaybook.com/option-strategies/long-straddle) |
| 4 | [Long Strangle](#long-strangle) | Question | [link](https://www.optionsplaybook.com/option-strategies/long-strangle) |
| 5 | [Back Spread w/Calls](#call-backspread) | Bull | [link](https://www.optionsplaybook.com/option-strategies/call-backspread) |
| 6 | [Back Spread w/Puts](#put-backspread) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/put-backspread) |
| 7 | [Long Calendar Spread w/Calls](#calendar-call-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/calendar-call-spread) |
| 8 | [Long Calendar Spread w/Puts](#calendar-put-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/calendar-put-spread) |
| 9 | [Diagonal Spread w/Calls](#diagonal-call-spread) | Neutral / Bearish | [link](https://www.optionsplaybook.com/option-strategies/diagonal-call-spread) |
| 10 | [Diagonal Spread w/Puts](#diagonal-put-spread) | Neutral / Bull | [link](https://www.optionsplaybook.com/option-strategies/diagonal-put-spread) |
| 11 | [Long Butterfly w/Calls](#long-call-butterfly-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/long-call-butterfly-spread) |
| 12 | [Long Butterfly w/Puts](#long-put-butterfly-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/long-put-butterfly-spread) |
| 13 | [Iron Butterfly](#iron-butterfly) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/iron-butterfly) |
| 14 | [Skip Strike Butterfly w/Calls](#broken-wing-butterfly-call) | Bull | [link](https://www.optionsplaybook.com/option-strategies/broken-wing-butterfly-call) |
| 15 | [Skip Strike Butterfly w/Puts](#broken-wing-butterfly-put) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/broken-wing-butterfly-put) |
| 16 | [Inverse Skip Strike Butterfly w/Calls](#inverse-broken-wing-butterfly-call) | Bull | [link](https://www.optionsplaybook.com/option-strategies/inverse-broken-wing-butterfly-call) |
| 17 | [Inverse Skip Strike Butterfly w/Puts](#inverse-broken-wing-butterfly-put) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/inverse-broken-wing-butterfly-put) |
| 18 | [Christmas Tree Butterfly w/Calls](#christmas-tree-butterfly-call) | Bull | [link](https://www.optionsplaybook.com/option-strategies/christmas-tree-butterfly-call) |
| 19 | [Christmas Tree Butterfly w/Puts](#christmas-tree-butterfly-put) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/christmas-tree-butterfly-put) |
| 20 | [Long Condor Spread w/Calls](#long-call-condor-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/long-call-condor-spread) |
| 21 | [Long Condor Spread w/Puts](#long-put-condor-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/long-put-condor-spread) |
| 22 | [Iron Condor](#iron-condor) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/iron-condor) |

## All-Stars

| # | Strategy | Outlook | Source |
|---|---|---|---|
| 1 | [Short Call](#short-call) | Bearish / Neutral | [link](https://www.optionsplaybook.com/option-strategies/short-call) |
| 2 | [Short Put](#short-put) | Bull / Neutral | [link](https://www.optionsplaybook.com/option-strategies/short-put) |
| 3 | [Short Straddle](#short-straddle) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/short-straddle) |
| 4 | [Short Strangle](#short-strangle) | Question | [link](https://www.optionsplaybook.com/option-strategies/short-strangle) |
| 5 | [Long Combination](#synthetic-long-stock) | Bull | [link](https://www.optionsplaybook.com/option-strategies/synthetic-long-stock) |
| 6 | [Short Combination](#synthetic-short-stock) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/synthetic-short-stock) |
| 7 | [Front Spread w/Calls](#call-ratio-vertical-spread) | Bull | [link](https://www.optionsplaybook.com/option-strategies/call-ratio-vertical-spread) |
| 8 | [Front Spread w/Puts](#put-ratio-vertical-spread) | Bearish | [link](https://www.optionsplaybook.com/option-strategies/put-ratio-vertical-spread) |
| 9 | [Double Diagonal](#double-diagonal-spread) | Neutral | [link](https://www.optionsplaybook.com/option-strategies/double-diagonal-spread) |

---

<a id="covered-call"></a>
## Covered Call

**Level:** Rookies · **Outlook:** Bull / Neutral · [source](https://www.optionsplaybook.com/option-strategies/covered-call)

- **The setup:** You own the stock; Sell a call, strike price A; Generally, the stock price will be below strike A
- **Who should run it:** Rookies and higher
- **When to run it:** You’re neutral to bullish, and you’re willing to sell stock if it reaches a specific price.
- **Break-even at expiration:** Current stock price minus the premium received for selling the call.
- **Maximum potential profit:** When the call is first sold, potential profit is limited to the strike price minus the current stock price plus the premium received for selling the call.
- **Maximum potential loss:** … (see source)
- **Margin requirement:** Because you own the stock, no additional margin is required.

<a id="protective-put"></a>
## Protective Put

**Level:** Rookies · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/protective-put)

- **The setup:** You own the stock; Buy a put, strike price A; Generally, the stock price will be above strike A
- **Who should run it:** Rookies and higher
- **When to run it:** You’re bullish but nervous.
- **Break-even at expiration:** From the point the protective put is established, the break-even point is the current stock price plus the premium paid for the put.
- **Maximum potential profit:** Potential profit is theoretically unlimited, because you’ll still own the stock and you have not capped the upside.
- **Maximum potential loss:** Risk is limited to the “deductible” plus the premium paid for the put.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="collar-option"></a>
## Collar

**Level:** Rookies · **Outlook:** Bull / Question · [source](https://www.optionsplaybook.com/option-strategies/collar-option)

- **The setup:** You own the stock; Buy a put, strike price A; Sell a call, strike price B; Generally, the stock price will be between strikes Aand B
- **Who should run it:** Rookies and higher
- **When to run it:** You’re bullish but nervous.
- **Break-even at expiration:** From the point the collar is established, there are two break-even points: If established for a net credit, the break-even is current stock price minus net credit received. … (see source)
- **Maximum potential profit:** From the point the collar is established, potential profit is limited to strike B minus current stock price minus the net debit paid, or plus net credit received.
- **Maximum potential loss:** From the point the collar is established, risk is limited to the current stock price minus strike A plus the net debit paid, or minus the net credit received.
- **Margin requirement:** Because you own the stock, the call you sold is considered “covered.” So no additional margin is required after the trade is established.

<a id="cash-secured-put"></a>
## Cash-Secured Put

**Level:** Rookies · **Outlook:** Bearish / Bull · [source](https://www.optionsplaybook.com/option-strategies/cash-secured-put)

- **The setup:** Sell a put, strike price A; Keep enough cash on hand to buy the stock if the put is assigned; Generally, the stock price will be above strike A
- **Who should run it:** Rookies and higher
- **When to run it:** You’re slightly bearish short-term, bullish long-term.
- **Break-even at expiration:** Strike A minus the premium received for the put.
- **Maximum potential profit:** Potential profit is limited to the premium received from selling the put.
- **Maximum potential loss:** Potential loss is substantial, but limited to the strike price if the stock goes to zero.
- **Margin requirement:** You must have enough cash to cover the cost of purchasing the stock at the strike price.

<a id="long-call"></a>
## Long Call

**Level:** Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/long-call)

- **The setup:** Buy a call, strike price A; Generally, the stock price will be at or above strike A
- **Who should run it:** Veterans and higher
- **When to run it:** You’re bullish as a matador.
- **Break-even at expiration:** Strike A plus the cost of the call.
- **Maximum potential profit:** There’s a theoretically unlimited profit potential, if the stock goes to infinity.
- **Maximum potential loss:** Risk is limited to the premium paid for the call option.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-put"></a>
## Long Put

**Level:** Veterans · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/long-put)

- **The setup:** Buy a put, strike price A; Generally, the stock price will be at or below strike A
- **Who should run it:** Veterans and higher
- **When to run it:** You’re bearish as a grizzly.
- **Break-even at expiration:** Strike A minus the cost of the put.
- **Maximum potential profit:** There’s a substantial profit potential. If the stock goes to zero you make the entire strike price minus the cost of the put contract.
- **Maximum potential loss:** Risk is limited to the premium paid for the put.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="leveraged-covered-call"></a>
## Fig Leaf

**Level:** Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/leveraged-covered-call)

- **The setup:** Buy an in-the-money LEAPS call, strike price A; Sell an out-of-the-money short-term call, strike price B; Generally, the stock price will be closer to strike B than strike A
- **Who should run it:** Veterans and higher
- **When to run it:** You’re mildly bullish
- **Break-even at expiration:** It is possible to approximate break-even points, but there are too many variables to give an exact formula. … (see source)
- **Maximum potential profit:** Potential profit is limited to the premium received for sale of the front-month call plus the performance of the LEAPS call.
- **Maximum potential loss:** Potential risk is limited to the debit paid to establish the strategy.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-call-spread"></a>
## Long Call Spread

**Level:** Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/long-call-spread)

- **The setup:** Buy a call, strike price A; Sell a call, strike price B; Generally, the stock will be at or above strike A and below strike B
- **Who should run it:** Veterans and higher
- **When to run it:** You’re bullish, but you have an upside target.
- **Break-even at expiration:** Strike A plus net debit paid.
- **Maximum potential profit:** Potential profit is limited to the difference between strike A and strike B minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-put-spread"></a>
## Long Put Spread

**Level:** Veterans · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/long-put-spread)

- **The setup:** Sell a put, strike price A; Buy a put, strike price B; Generally, the stock will be at or below strike B and above strike A
- **Who should run it:** Veterans and higher
- **When to run it:** You’re bearish, with a downside target.
- **Break-even at expiration:** Strike B minus the net debit paid.
- **Maximum potential profit:** Potential profit is limited to the difference between strike A and strike B, minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="short-call-spread"></a>
## Short Call Spread

**Level:** Seasoned Veterans · **Outlook:** Bearish / Neutral · [source](https://www.optionsplaybook.com/option-strategies/short-call-spread)

- **The setup:** Sell a call, strike price A; Buy a call, strike price B; Generally, the stock will be below strike A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re bearish. You may also be expecting neutral activity if strike A is out-of-the-money.
- **Break-even at expiration:** Strike A plus the net credit received when opening the position.
- **Maximum potential profit:** Potential profit is limited to the net credit received when opening the position.
- **Maximum potential loss:** Risk is limited to the difference between strike A and strike B, minus the net credit received.
- **Margin requirement:** Margin requirement is the difference between the strike prices.

<a id="short-put-spread"></a>
## Short Put Spread

**Level:** Seasoned Veterans · **Outlook:** Bull / Neutral · [source](https://www.optionsplaybook.com/option-strategies/short-put-spread)

- **The setup:** Buy a put, strike price A; Sell a put, strike price B; Generally, the stock will be above strike B
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You're bullish. You may also be anticipating neutral activity if strike B is out-of-the-money.
- **Break-even at expiration:** Strike B minus the net credit received when selling thespread.
- **Maximum potential profit:** Potential profit is limited to the net credit you receive when you set up the strategy.
- **Maximum potential loss:** Risk is limited to the difference between strike A andstrike B, minus the net credit received.
- **Margin requirement:** Margin requirement is the difference between the strike prices.

<a id="long-straddle"></a>
## Long Straddle

**Level:** Seasoned Veterans · **Outlook:** Question · [source](https://www.optionsplaybook.com/option-strategies/long-straddle)

- **The setup:** Buy a call, strike price A; Buy a put, strike price A; Generally, the stock price will be at strike A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re anticipating a swing in stock price, but you’re not sure which direction it will go.
- **Break-even at expiration:** There are two break-even points: Strike A plus the net debit paid.; Strike A minus the net debit paid.
- **Maximum potential profit:** Potential profit is theoretically unlimited if the stock goes up.; If the stock goes down, potential profit may be substantial but limited to the strike price minus the net debit paid.
- **Maximum potential loss:** Potential losses are limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-strangle"></a>
## Long Strangle

**Level:** Seasoned Veterans · **Outlook:** Question · [source](https://www.optionsplaybook.com/option-strategies/long-strangle)

- **The setup:** Buy a put, strike price A; Buy a call, strike price B; Generally, the stock price will be between strikes A and B
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re anticipating a swing in stock price, but you’re not sure which direction it will go.
- **Break-even at expiration:** There are two break-even points: Strike A minus the net debit paid.; Strike B plus the net debit paid.
- **Maximum potential profit:** Potential profit is theoretically unlimited if the stock goes up.; If the stock goes down, potential profit may be substantial but limited to strike A minus the net debit paid.
- **Maximum potential loss:** Potential losses are limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="call-backspread"></a>
## Back Spread w/Calls

**Level:** Seasoned Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/call-backspread)

- **The setup:** Sell a call, strike price A; Buy two calls, strike price B; Generally, the stock will be at or around strike price A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re extremely bullish on a highly volatile stock.
- **Break-even at expiration:** If established for a net debit, the break-even point is equal to strike B plus the maximum risk.; If established for a net credit, there are two break-even points for this play: Strike A plus the net credit received … (see source)
- **Maximum potential profit:** There’s a theoretically unlimited profit potential if the stock goes to infinity. But since the real world doesn’t always operate like a theoretical one, let’s just say “a lot.”
- **Maximum potential loss:** Risk is limited to strike B minus strike A, minus the net credit received or plus the net debit paid.
- **Margin requirement:** Margin requirement is the difference between the strike prices of the short call spread embedded into this strategy.

<a id="put-backspread"></a>
## Back Spread w/Puts

**Level:** Seasoned Veterans · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/put-backspread)

- **The setup:** Sell a put, strike price B; Buy two puts, strike price A; Generally, the stock will be at or around strike price B
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re extremely bearish on a highly volatile stock.
- **Break-even at expiration:** If established for a net debit, the break-even point is strike A minus the maximum risk.; If established for a net credit, there are two break-even points for this play: Strike A minus the maximum risk … (see source)
- **Maximum potential profit:** There is a substantial profit potential if the stock goes to zero. But keep in mind stocks don’t go to zero very often.
- **Maximum potential loss:** Risk is limited to strike B minus strike A, minus the net credit received or plus the net debit paid.
- **Margin requirement:** Margin requirement is the difference between the strike prices of the short put spread embedded into this strategy.

<a id="calendar-call-spread"></a>
## Long Calendar Spread w/Calls

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/calendar-call-spread)

- **The setup:** Sell a call, strike price A; Buy a call, strike price A; Generally, the stock will be at or around strike A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** It is possible to approximate break-even points, but there are too many variables to give an exact formula. … (see source)
- **Maximum potential profit:** Potential profit is limited to the premium received for the back-month call minus the cost to buy back the front-month call, minus the net debit paid to establish the position.
- **Maximum potential loss:** Limited to the net debit paid to establish the trade.
- **Margin requirement:** After the trade is paid for, no additional margin isrequired if the position is closed at expiration of the front-month option.

<a id="calendar-put-spread"></a>
## Long Calendar Spread w/Puts

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/calendar-put-spread)

- **The setup:** Sell a put, strike price A; Buy a put, strike price A; Generally, the stock will be at or around strike A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** It is possible to approximate break-even points, but there are too many variables to give an exact formula. … (see source)
- **Maximum potential profit:** Potential profit is limited to the premium received for the back-month put minus the cost to buy back the front-month put, minus the net debit paid to establish the position.
- **Maximum potential loss:** Limited to the net debit paid to establish the trade.
- **Margin requirement:** After the trade is paid for, no additional margin is required if the position is closed at expiration of the front-month option.

<a id="diagonal-call-spread"></a>
## Diagonal Spread w/Calls

**Level:** Seasoned Veterans · **Outlook:** Neutral / Bearish · [source](https://www.optionsplaybook.com/option-strategies/diagonal-call-spread)

- **The setup:** Sell an out-of-the-money call, strike price A; Buy a further out-of-the-money call, strike price B; At expiration of the front-month call, sell another call with strike A and the same expiration as the back-month call … (see source)
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re expecting neutral activity during the front month, then neutral to bearish activity during the back month.
- **Break-even at expiration:** It is possible to approximate break-even points, but there are too many variables to give an exact formula. … (see source)
- **Maximum potential profit:** Potential profit is limited to the net credit received for selling both calls with strike A, minus the premium paid for the call with strike B.
- **Maximum potential loss:** If established for a net credit, risk is limited to the difference between strike A and strike B, minus the net credit received. … (see source)
- **Margin requirement:** Margin requirement is the difference between the strike prices.

<a id="diagonal-put-spread"></a>
## Diagonal Spread w/Puts

**Level:** Seasoned Veterans · **Outlook:** Neutral / Bull · [source](https://www.optionsplaybook.com/option-strategies/diagonal-put-spread)

- **The setup:** Sell an out-of-the-money put, strike price B; Buy a further out-of-the-money put, strike price A; At expiration of the front-month put, sell another put with strike B and the same expiration as the back-month put … (see source)
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re expecting neutral activity during the front month, then neutral to bullish activity during the back month.
- **Break-even at expiration:** It is possible to approximate break-even points, but there are too many variables to give an exact formula. … (see source)
- **Maximum potential profit:** Profit is limited to the net credit received for selling bothputs with strike B, minus the premium paid for the putwith strike A.
- **Maximum potential loss:** If established for a net credit, risk is limited to the difference between strike A and strike B, minus the net credit received. … (see source)
- **Margin requirement:** Margin requirement is the difference between the strike prices.

<a id="long-call-butterfly-spread"></a>
## Long Butterfly w/Calls

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/long-call-butterfly-spread)

- **The setup:** Buy a call, strike price A; Sell two calls, strike price B; Buy a call, strike price C; Generally, the stock will be at strike B
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** Typically, investors will use butterfly spreads when anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** There are two break-even points for this play: Strike A plus the net debit paid.; Strike C minus the net debit paid.
- **Maximum potential profit:** Potential profit is limited to strike B minus strike A minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-put-butterfly-spread"></a>
## Long Butterfly w/Puts

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/long-put-butterfly-spread)

- **The setup:** Buy a put, strike price A; Sell two puts, strike price B; Buy a put, strike price C; Generally, the stock will be at strike B
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** Typically, investors will use butterfly spreads when anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** There are two break-even points for this play: Strike A plus the net debit paid.; Strike C minus the net debit paid.
- **Maximum potential profit:** Potential profit is limited to strike C minus strike B minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="iron-butterfly"></a>
## Iron Butterfly

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/iron-butterfly)

- **The setup:** Buy a put, strike price A; Sell a put, strike price B; Sell a call, strike price B; Buy a call, strike price C; Generally, the stock will be at strike B
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** Typically, investors will use butterfly spreads when anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** There are two break-even points for this play: Strike B plus net credit received.; Strike B minus net credit received.
- **Maximum potential profit:** Potential profit is limited to the net credit received.
- **Maximum potential loss:** Risk is limited to strike B minus strike A, minus the net credit received when establishing the position.
- **Margin requirement:** Margin requirement is the short call spread requirement or short put spread requirement.

<a id="broken-wing-butterfly-call"></a>
## Skip Strike Butterfly w/Calls

**Level:** Seasoned Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/broken-wing-butterfly-call)

- **The setup:** Buy a call, strike price A; Sell two calls, strike price B; Skip over strike price C; Buy a call, strike price D; Generally, the stock will be at or below strike A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re slightly bullish. You want the stock to rise to strike B and then stop.
- **Break-even at expiration:** If established for a net credit then the break-even point is strike C plus the net credit received when establishing the strategy.; If established for a net debit, then there are two break-even points: Strike A plus net debit paid. … (see source)
- **Maximum potential profit:** Potential profit is limited to strike B minus strike A minus the net debit paid, or plus the net credit received.
- **Maximum potential loss:** Risk is limited to the difference between strike C and strike D minus the net credit received or plus the net debit paid.
- **Margin requirement:** Margin requirement is equal to the difference between the strike prices of the short call spread embedded into this strategy.

<a id="broken-wing-butterfly-put"></a>
## Skip Strike Butterfly w/Puts

**Level:** Seasoned Veterans · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/broken-wing-butterfly-put)

- **The setup:** Buy a put, strike price A; Skip strike price B; Sell two puts, strike price C; Buy a put, strike price D; Generally, the stock will be at or above strike D
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re slightly bearish. You want the stock to go down to strike C and then stop.
- **Break-even at expiration:** If established for a net credit then the break-even point is strike B minus the net credit received when establishing the strategy.; If established for a net debit, then there are two break-even points: Strike D minus net debit paid. … (see source)
- **Maximum potential profit:** Potential profit is limited to strike D minus strike C minus the net debit paid, or plus the net credit received.
- **Maximum potential loss:** Risk is limited to the difference between strike A and strike B, minus the net credit received or plus the net debit paid.
- **Margin requirement:** Margin requirement is equal to the difference between the strike prices of the short put spread embedded into this strategy.

<a id="inverse-broken-wing-butterfly-call"></a>
## Inverse Skip Strike Butterfly w/Calls

**Level:** Seasoned Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/inverse-broken-wing-butterfly-call)

- **The setup:** Sell a call with strike price A; Buy two calls with strike price B; Skip over strike price C; Sell a call with strike price D; Generally, the stock will be at or around strike price A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re extremely bullish on a highly volatile stock.
- **Break-even at expiration:** If established for a net debit, the break-even point is strike C plus the net debit paid.; If established for a net credit, there are two break-even points: Strike A plus the net credit received … (see source)
- **Maximum potential profit:** Potential profit is limited to strike D minus strike C minus the net debit paid, or plus the net credit received.
- **Maximum potential loss:** Potential risk is limited to strike B minus strike A plus the net debit paid, or minus the net credit received.
- **Margin requirement:** Margin requirement is equal to the difference between the strike prices of the short call spread embedded into this strategy.

<a id="inverse-broken-wing-butterfly-put"></a>
## Inverse Skip Strike Butterfly w/Puts

**Level:** Seasoned Veterans · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/inverse-broken-wing-butterfly-put)

- **The setup:** Sell a put with strike price D; Buy two puts with strike price C; Skip over strike price B; Sell a put with strike price A; Generally, the stock will be at or around strike price D
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re extremely bearish on a highly volatile stock.
- **Break-even at expiration:** If established for a net debit, the break-even point is strike B minus the net debit paid.; If established for a net credit, there are two break-even points: Strike D minus the net credit received … (see source)
- **Maximum potential profit:** Potential profit is limited to strike B minus strike A minus the net debit paid, or plus the net credit received.
- **Maximum potential loss:** Potential risk is limited to strike D minus strike C plus the net debit paid, or minus the net credit received.
- **Margin requirement:** Margin requirement is equal to the difference between the strike prices of the short put spread embedded into this strategy.

<a id="christmas-tree-butterfly-call"></a>
## Christmas Tree Butterfly w/Calls

**Level:** Seasoned Veterans · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/christmas-tree-butterfly-call)

- **The setup:** Buy a call, strike price A; Skip over strike price B; Sell three calls, strike price C; Buy two calls, strike price D; Generally, the stock will be at or around strike A
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re slightly bullish. You want the stock to rise to strike C and then stop.
- **Break-even at expiration:** There are two break-even points for this strategy: Strike A plus the net debit paid; Strike D minus one-half of the net debit paid
- **Maximum potential profit:** Potential profit is limited to strike C minus strike A minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="christmas-tree-butterfly-put"></a>
## Christmas Tree Butterfly w/Puts

**Level:** Seasoned Veterans · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/christmas-tree-butterfly-put)

- **The setup:** Buy a put, strike price D; Skip over strike price C; Sell three puts, strike price B; Buy two puts, strike price A; Generally, the stock will be at or around strike D
- **Who should run it:** Seasoned Veterans and higher
- **When to run it:** You’re slightly bearish. You want the stock to fall to strike B and then stop.
- **Break-even at expiration:** There are two break-even points for this strategy: Strike D minus the net debit paid; Strike A plus half the net debit paid
- **Maximum potential profit:** Potential profit is limited to strike D minus strike B minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-call-condor-spread"></a>
## Long Condor Spread w/Calls

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/long-call-condor-spread)

- **The setup:** Buy a call, strike price A; Sell a call, strike price B; Sell a call, strike price C; Buy a call, strike price D; Generally, the stock will be between strike price Band strike price C
- **Who should run it:** Veterans and higher
- **When to run it:** You’re anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** There are two break-even points: Strike A plus the net debit paid; Strike D minus the net debit paid
- **Maximum potential profit:** Potential profit is limited to strike B minus strike A minus the net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid to establish the condor.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="long-put-condor-spread"></a>
## Long Condor Spread w/Puts

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/long-put-condor-spread)

- **The setup:** Buy a put, strike price A; Sell a put, strike price B; Sell a put, strike price C; Buy a put, strike price D; Generally, the stock will be between strike price Band strike price C
- **Who should run it:** Veterans and higher
- **When to run it:** You’re anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** There are two break-even points: Strike A plus the net debit paid; Strike D minus the net debit paid
- **Maximum potential profit:** Potential profit is limited to strike D minus strike C minusthe net debit paid.
- **Maximum potential loss:** Risk is limited to the net debit paid to establish the condor.
- **Margin requirement:** After the trade is paid for, no additional margin is required.

<a id="iron-condor"></a>
## Iron Condor

**Level:** Seasoned Veterans · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/iron-condor)

- **The setup:** Buy a put, strike A; Sell a put, strike B; Sell a call, strike C; Buy a call, strike D; Generally, the stock will be between strike price Band strike price C
- **Who should run it:** Veterans and higher
- **When to run it:** You’re anticipating minimal movement on the stock within a specific time frame.
- **Break-even at expiration:** There are two break-even points: Strike B minus the net credit received.; Strike C plus the net credit received.
- **Maximum potential profit:** Profit is limited to the net credit received.
- **Maximum potential loss:** Risk is limited to strike B minus strike A, minus the netcredit received.
- **Margin requirement:** Margin requirement is the short call spread requirement or short put spread requirement.

<a id="short-call"></a>
## Short Call

**Level:** All-Stars · **Outlook:** Bearish / Neutral · [source](https://www.optionsplaybook.com/option-strategies/short-call)

- **The setup:** Sell a call, strike price A; Generally, the stock price will be below strike A
- **Who should run it:** All-Stars only
- **When to run it:** You’re bearish to neutral.
- **Break-even at expiration:** Strike A plus the premium received for the call.
- **Maximum potential profit:** Potential profit is limited to the premium received for selling the call.; If the stock keeps rising above strike A, you keep losing money.
- **Maximum potential loss:** Risk is theoretically unlimited. If the stock keeps rising, you keep losing money.
- **Margin requirement:** Margin requirement is the greater of the following: 25% of the underlying security value minus the out-of-the-money amount, plus the premium received; OR 10% of the underlying security value plus the premium received

<a id="short-put"></a>
## Short Put

**Level:** All-Stars · **Outlook:** Bull / Neutral · [source](https://www.optionsplaybook.com/option-strategies/short-put)

- **The setup:** Sell a put, strike price A; Generally, the stock price will be above strike A
- **Who should run it:** All-Stars only
- **When to run it:** You’re bullish to neutral.
- **Break-even at expiration:** Strike A minus the premium received for the put.
- **Maximum potential profit:** Potential profit is limited to the premium received for selling the put.
- **Maximum potential loss:** Potential loss is substantial, but limited to the strike price minus the premium received if the stock goes to zero.
- **Margin requirement:** Margin requirement is the greater of the following: 25% of the underlying security value minus the out-of-the-money amount, plus the premium received; OR 10% of the underlying security value plus the premium received

<a id="short-straddle"></a>
## Short Straddle

**Level:** All-Stars · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/short-straddle)

- **The setup:** Sell a call, strike price A; Sell a put, strike price A; Generally, the stock price will be at strike A
- **Who should run it:** All-Stars only
- **When to run it:** You’re expecting minimal movement on the stock.
- **Break-even at expiration:** There are two break-even points: Strike A minus the net credit received.; Strike A plus the net credit received.
- **Maximum potential profit:** Potential profit is limited to the net credit received for selling the call and the put.
- **Maximum potential loss:** If the stock goes up, your losses could be theoretically unlimited.; If the stock goes down, your losses may be substantial but limited to the strike price minus net credit received for selling the straddle.
- **Margin requirement:** Margin requirement is the short call or short put requirement, plus the premium received from the other side.

<a id="short-strangle"></a>
## Short Strangle

**Level:** All-Stars · **Outlook:** Question · [source](https://www.optionsplaybook.com/option-strategies/short-strangle)

- **The setup:** Sell a put, strike price A; Sell a call, strike price B; Generally, the stock price will be between strikes Aand B
- **Who should run it:** All-Stars only
- **When to run it:** You are anticipating minimal movement on the stock.
- **Break-even at expiration:** There are two break-even points: Strike A minus the net credit received.; Strike B plus the net credit received.
- **Maximum potential profit:** Potential profit is limited to the net credit received.
- **Maximum potential loss:** If the stock goes up, your losses could be theoretically unlimited.; If the stock goes down, your losses may be substantia but limited to strike A minus the net credit received.
- **Margin requirement:** Margin requirement is the short call or short put requirement, plus the premium received from the other side.

<a id="synthetic-long-stock"></a>
## Long Combination

**Level:** All-Stars · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/synthetic-long-stock)

- **The setup:** Buy a call, strike price A; Sell a put, strike price A; The stock should be at or very near strike A
- **Who should run it:** All-Stars only
- **When to run it:** You’re bullish.
- **Break-even at expiration:** Strike A plus the net debit paid or minus the net credit received to establish the strategy.
- **Maximum potential profit:** There is a theoretically unlimited profit potential if the stock price keeps rising.
- **Maximum potential loss:** Potential loss is substantial, but limited to strike price A plus the net debit paid or minus net credit received.
- **Margin requirement:** Margin requirement is the short put requirement.

<a id="synthetic-short-stock"></a>
## Short Combination

**Level:** All-Stars · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/synthetic-short-stock)

- **The setup:** Sell a call, strike price A; Buy a put, strike price A; The stock should be at or very near strike A
- **Who should run it:** All-Stars only
- **When to run it:** You’re bearish.
- **Break-even at expiration:** Strike A plus the net credit received or minus the net debit paid to establish the strategy.
- **Maximum potential profit:** Potential profit is substantial if stock goes to zero, but limited to strike price A plus the net credit received or minus the net debit paid to establish the strategy.
- **Maximum potential loss:** Risk is theoretically unlimited if the stock price keeps rising.
- **Margin requirement:** Margin requirement is the short call requirement.

<a id="call-ratio-vertical-spread"></a>
## Front Spread w/Calls

**Level:** All-Stars · **Outlook:** Bull · [source](https://www.optionsplaybook.com/option-strategies/call-ratio-vertical-spread)

- **The setup:** Buy a call, strike price A; Sell two calls, strike price B; Generally, the stock will be below or at strike A
- **Who should run it:** All-Stars only
- **When to run it:** You’re slightly bullish. You want the stock to rise to strike B and then stop.
- **Break-even at expiration:** If established for a net debit, there are two break-even points: Strike A plus net debit paid to establish the position.; Strike B plus the maximum profit potential.; If established for a net credit, there is only one break-even point: … (see source)
- **Maximum potential profit:** If established for a net debit, potential profit is limited to the difference between strike A and strike B, minus the net debit paid. … (see source)
- **Maximum potential loss:** If established for a net debit: Risk is limited to the debit paid for the spread if the stock price goes down.; Risk is unlimited if the stock price goes way, way up.; If established for a net credit: … (see source)
- **Margin requirement:** Margin requirement is the requirement for the uncovered short call portion of the front spread.

<a id="put-ratio-vertical-spread"></a>
## Front Spread w/Puts

**Level:** All-Stars · **Outlook:** Bearish · [source](https://www.optionsplaybook.com/option-strategies/put-ratio-vertical-spread)

- **The setup:** Sell two puts, strike price A; Buy a put, strike price B; Generally, the stock will be at or above strike B.
- **Who should run it:** All-Stars only
- **When to run it:** You’re slightly bearish. You want the stock to go down to strike A and then stop.
- **Break-even at expiration:** If established for a net debit, there are two break-even points: Strike B minus the net debit paid to establish the position.; Strike A minus the maximum profit potential. … (see source)
- **Maximum potential profit:** If established for a net debit, potential profit is limited to the difference between strike A and strike B, minus the net debit paid. … (see source)
- **Maximum potential loss:** If established for a net debit: Risk is limited to the net debit paid if the stock price goes up.; Risk is substantial but limited to strike A plus the net debit paid if the stock goes to zero. … (see source)
- **Margin requirement:** Margin requirement is the requirement for the uncovered short put portion of the front spread.

<a id="double-diagonal-spread"></a>
## Double Diagonal

**Level:** All-Stars · **Outlook:** Neutral · [source](https://www.optionsplaybook.com/option-strategies/double-diagonal-spread)

- **The setup:** Buy an out-of-the-money put, strike price A; Sell an out-of-the-money put, strike price B; Sell an out-of-the-money call, strike price C; Buy an out-of-the-money call, strike price D … (see source)
- **Who should run it:** All-Stars only
- **When to run it:** You’re anticipating minimal movement on the stock over at least two option expiration cycles.
- **Break-even at expiration:** It is possible to approximate your break-even points, but there are too many variables to give an exact formula. … (see source)
- **Maximum potential profit:** … (see source)
- **Maximum potential loss:** … (see source)
- **Margin requirement:** Margin requirement is the diagonal call spread requirement or the diagonal put spread requirement.
