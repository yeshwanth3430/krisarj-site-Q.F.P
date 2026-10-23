#!/usr/bin/env python3
"""Sync public/linear-algebra/index.html (and the roadmap count) to the lesson files on disk.

Any NN_slug.html present becomes a live <a class="ch">; the rest stay <span class="ch off"> with SOON.
"""
import os, re, glob
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LA = os.path.join(ROOT, "public", "linear-algebra")
IDX = os.path.join(LA, "index.html")

live = {}
for f in glob.glob(os.path.join(LA, "[0-9][0-9]_*.html")):
    n = os.path.basename(f)[:2]
    live[n] = os.path.basename(f)

s = open(IDX).read()
ROW = re.compile(r'(?:<a class="ch" href="[^"]*">|<span class="ch off">)<span class="cn">(\d\d)</span>(.*?)(?:<span class="soon">SOON</span></span>|</a>)', re.S)

def repl(m):
    n, title = m.group(1), m.group(2)
    title = re.sub(r'<span class="soon">.*?</span>', '', title).strip()
    if n in live:
        return '<a class="ch" href="%s"><span class="cn">%s</span>%s</a>' % (live[n], n, title)
    return '<span class="ch off"><span class="cn">%s</span>%s<span class="soon">SOON</span></span>' % (n, title)

s, cnt = ROW.subn(repl, s)
total = cnt
nlive = len(live)
pct = round(nlive * 100 / total)
s = re.sub(r'<p class="la-progress-k">\d+ of \d+ lessons live',
           '<p class="la-progress-k">%d of %d lessons live' % (nlive, total), s)
s = re.sub(r'(\.la-progress i \{[^}]*?width: )\d+%', r'\g<1>%d%%' % pct, s)
s = re.sub(r'(<div class="la-stat"><b>)\d+(</b><span>written so far)', r'\g<1>%d\g<2>' % nlive, s)
open(IDX, "w").write(s)

RM = os.path.join(ROOT, "public", "assets", "roadmap.js")
r = open(RM).read()
r2 = re.sub(r'lessons: \[\d+, 31\]', 'lessons: [%d, 31]' % nlive, r)
if r2 != r: open(RM, "w").write(r2)

print("rows rewritten: %d | live: %d | bar: %d%%" % (cnt, nlive, pct))
print("live lessons:", " ".join(sorted(live)))
