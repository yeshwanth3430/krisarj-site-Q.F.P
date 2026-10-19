# Lesson 1 sources: The Geometry of Linear Equations

Research material for rewriting `public/linear-algebra/01_geometry-of-linear-equations.html`.
This folder is outside `public/`, so none of it is deployed.

## Where it comes from

MIT OpenCourseWare **18.06SC Linear Algebra, Fall 2011** (Prof. Gilbert Strang), Unit I "Ax = b and the Four Subspaces", Session 1.
Licence: CC BY-NC-SA 4.0.

- Session page: https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/pages/ax-b-and-the-four-subspaces/the-geometry-of-linear-equations/
- Lecture video (Strang, filmed 1999 as 18.06 Lecture 1): https://www.youtube.com/watch?v=J7DzL2_Na80
- Recitation video (Linan Zhang, about 8 min): https://www.youtube.com/watch?v=My5w4MXWBew
- Suggested reading: *Introduction to Linear Algebra* (Strang), 4th or 5th edition, Sections **1.1** (vectors and linear combinations), **1.2** (lengths and dot products), **2.1** (vectors and linear equations). The textbook is copyrighted and not included here.

| File in `mit-ocw/` | What it is |
|---|---|
| `lecture-summary.pdf` / `.txt` | MIT's 3-page written summary of the lecture |
| `lecture-transcript.pdf` / `.txt` | Full transcript of Strang's lecture (about 5,000 words) |
| `recitation-transcript.pdf` / `.txt` | Transcript of the recitation (worked problem) |
| `problems.pdf` / `.txt` | 3 "check yourself" problems |
| `solutions.pdf` / `.txt` | Worked solutions to those problems |

The `.txt` files come from `pdftotext`. The matrices in them are garbled, so use the PDFs for the math.

## The lecture, in Strang's order

1. **The fundamental problem:** solve $n$ linear equations in $n$ unknowns. Three ways to see it: the **row picture**, the **column picture ★** (Strang's favourite, "the key point") and the **matrix form** $Ax = b$.
2. **The 2×2 example:** $2x - y = 0$ and $-x + 2y = 3$, so $A = \begin{bmatrix}2&-1\\-1&2\end{bmatrix}$ and $b = (0, 3)$. Strang writes the matrix form first, before any picture.
3. **Row picture:** plot one equation at a time.
   - Line 1 passes through the origin ($(0,0)$ and $(1,2)$, also $(\tfrac12, 1)$).
   - Line 2 does not ($(-3,0)$ and $(-1,1)$). "Do we go through the origin or not?" is always worth asking.
   - The lines meet at $(1,2)$. Check: $-1 + 4 = 3$.
   - "Linear" has "line" in it.
4. **Column picture:** $x\begin{bmatrix}2\\-1\end{bmatrix} + y\begin{bmatrix}-1\\2\end{bmatrix} = \begin{bmatrix}0\\3\end{bmatrix}$.
   - A **linear combination** of the columns is "the most fundamental operation in the whole course".
   - Draw 1 × column 1, then tack 2 × column 2 onto its tip, and you land on $b = (0,3)$.
   - First component: $2 - 2 = 0$. Second: $-1 + 4 = 3$.
5. **All combinations:** the combinations of these two columns fill the **whole plane**, so every $b$ can be reached. Strang flags this as "basic" and as coming back all course.
6. **The 3×3 example:** $2x - y = 0$, $\;-x + 2y - z = -1$, $\;-3y + 4z = 4$, so $A = \begin{bmatrix}2&-1&0\\-1&2&-1\\0&-3&4\end{bmatrix}$ and $b = (0,-1,4)$.
   - **Row picture:** each equation is a plane. Two planes meet in a line, and the third plane cuts that line in one point. Strang notes this is already hard to see in 3D and harder in 4D, and he gives up drawing it.
   - **Column picture:** $b$ equals column 3, so $x = 0$, $y = 0$, $z = 1$. "Specially chosen by the lecturer."
   - In general you won't always see the answer this way. **Elimination**, the next lecture, is how you solve these systematically.
7. **Change only the right-hand side:** $b = (1, 1, -3)$ is column 1 plus column 2, so $x = 1$, $y = 1$, $z = 0$. The row picture gives three new planes. The column picture keeps the same three columns, combined differently.
8. **The big question:** can we solve $Ax = b$ for **every** $b$? In combination language: do the combinations of the columns fill 3D space?
   - Yes for this $A$. It is **non-singular**, or **invertible**.
   - It fails when the 3 columns lie in **one plane**, for example if column 3 = column 1 + column 2. Then only the $b$ in that plane can be reached. Such a matrix is **singular** (not invertible).
9. **Nine dimensions:** 9 columns in $\mathbb{R}^9$.
   - A random matrix is almost surely invertible ("if I picked a random matrix… I guarantee it would be good").
   - If column 9 = column 8, the combinations fill only "an eight-dimensional plane inside nine-dimensional space".
10. **Matrix × vector, two ways:** $\begin{bmatrix}2&5\\1&3\end{bmatrix}\begin{bmatrix}1\\2\end{bmatrix}$.
    - **By columns** (Strang's favourite): $1\begin{bmatrix}2\\1\end{bmatrix} + 2\begin{bmatrix}5\\3\end{bmatrix} = \begin{bmatrix}12\\7\end{bmatrix}$.
    - **By rows**, using dot products: $2\cdot1 + 5\cdot2 = 12$ and $1\cdot1 + 3\cdot2 = 7$.
    - The takeaway: **"$Ax$ is a combination of the columns of $A$."**

### Lecture summary (MIT PDF): what it adds or phrases differently
- It calls the three views "row method", "column method" and "matrix method", and names $A$ the **coefficient matrix**.
- It defines a linear combination formally: for vectors $c$, $d$ and scalars $x$, $y$, the sum $xc + yd$.
- **Linear independence** section: if $Ax = b$ can't be solved for every $b$, then $A$ is **singular** and its columns are **linearly dependent**.
  - In 2D, all combinations lie on a point or a line.
  - In 3D, all combinations lie on a point, a line or a plane.

### Transcript glitches (the auto-transcript drops plus signs)
- "-x 2y=3" means $-x + 2y = 3$.
- The 3×3 system reads correctly only as written above.

## Recitation (Linan Zhang): one more worked 2×2 system
$2x + y = 3$, $\;x - 2y = -1$.
- **Solve by substitution:** $x = 2y - 1$, so $5y - 2 = 3$, giving $y = 1$ and $x = 1$.
- **Row picture:** line 1 passes through $(0,3)$ and $(1,1)$. Line 2 passes through $(0,\tfrac12)$ and $(1,1)$. They meet at $(1,1)$.
- **Column picture:** $v_1 = (2,1)$ and $v_2 = (1,-2)$. Then $1\cdot v_1 + 1\cdot v_2 = (3,-1)$, shown as the diagonal of the **parallelogram** on $v_1$ and $v_2$.
- **Matrix form:** $A = \begin{bmatrix}2&1\\1&-2\end{bmatrix}$, and $Ax = (3,-1)$.
- **Preview of inverses:** for numbers, $ax = b$ gives $x = a^{-1}b$. For matrices, $x = A^{-1}b$ when an $A^{-1}$ with $A^{-1}A = I$ exists. This is covered later in the course.

## Problems and solutions (MIT "check yourself")
1. **(Strang 1.3 #4)** $w_1 = (1,2,3)$, $w_2 = (4,5,6)$, $w_3 = (7,8,9)$. Find a combination that gives the zero vector.
   - Answer: $w_1 - 2w_2 + w_3 = 0$.
   - So the vectors are **dependent**, they lie in a **plane**, and the matrix $W$ with these columns is not invertible.
   - The solution reaches this by elimination: eq2 − 2·eq1 gives $-3x_2 - 6x_3 = 0$, and eq3 − 3·eq1 gives $-6x_2 - 12x_3 = 0$, the same equation.
2. **Multiply** $\begin{bmatrix}1&2&0\\2&0&3\\4&1&1\end{bmatrix}\begin{bmatrix}3\\-2\\1\end{bmatrix} = \begin{bmatrix}-1\\9\\11\end{bmatrix}$.
3. **True or false:** a (3×2) matrix times a (2×3) matrix is a 3×3 matrix.
   - **True.** The rule is $(m\times n)(n\times p) = (m\times p)$: the number of columns of $A$ must equal the number of rows of $B$.

All numbers above were re-checked by hand.

## How this compares with the current Lesson 1 page
- **Already covered:** every lecture idea. That includes the same 2×2 and 3×3 examples, the change of right-hand side, singular cases, $n$ dimensions, and matrix × vector both ways. The page also adds span, column space and the finance/replication material, which are our own.
- **Not on the page yet:**
  - the recitation's system ($2x + y = 3$, $x - 2y = -1$) and its parallelogram view;
  - MIT's Problem 1.1 (the dependent vectors 1-2-3 / 4-5-6 / 7-8-9);
  - the general $(m\times n)(n\times p)$ shape rule (the page has only the matrix × vector size rule);
  - the "random matrix is almost always invertible" remark;
  - the $A^{-1}$ preview.
