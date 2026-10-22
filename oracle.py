import json, random
def dec(n, p=2):
    b = 10**p
    w, f = divmod(n, b)
    fs = str(f).zfill(p).rstrip("0")
    return str(w) + "." + fs if fs else str(w)
def money(c): return str(c//100) + "." + str(c%100).zfill(2)
def pl(n, one, many): return f"{n}" + (one if n == 1 else many)
def studs(w, sp, ex):
    base = -(-(w*12)//sp) + 1
    return f"The {w} ft of wall at {sp} inches takes {pl(base,' stud',' studs')}, plus {ex} extra, {pl(base+ex,' stud',' studs')} in all."
def plates(w, p, b):
    n = -(-(w*p)//b)
    return f"The {pl(p,' plate',' plates')} of {w} ft in {b} ft boards take {pl(n,' board',' boards')}, leaving {n*b-w*p} ft."
def boards(s, pb, p):
    t = s + pb
    return f"The {pl(s,' stud',' studs')} and {pl(pb,' plate board',' plate boards')} are {pl(t,' board',' boards')}, at ${dec(p)} cost ${money(t*p)}."
def bundles(n, z):
    k = -(-n//z)
    return f"The {pl(n,' board',' boards')} in bundles of {z} take {pl(k,' bundle',' bundles')}, leaving {pl(k*z-n,' board',' boards')}."
random.seed(762)
R=random.randint
cases = [
 dict(fn="studs", args=["26","16","6"], expect=studs(26,16,6)),
 dict(fn="plates", args=["26","3","8"], expect=plates(26,3,8)),
 dict(fn="boards", args=["27","10","3.85"], expect=boards(27,10,385)),
 dict(fn="bundles", args=["37","10"], expect=bundles(37,10)),
 dict(fn="studs", args=["1","48","0"], expect=studs(1,48,0)),
 dict(fn="bundles", args=["1","1"], expect=bundles(1,1)),
]
for _ in range(25):
    w,sp,ex=R(1,100000),R(1,48),R(0,100000); cases.append(dict(fn="studs", args=[str(w),str(sp),str(ex)], expect=studs(w,sp,ex)))
for _ in range(25):
    w,p,b=R(1,100000),R(1,10),R(1,50); cases.append(dict(fn="plates", args=[str(w),str(p),str(b)], expect=plates(w,p,b)))
for _ in range(20):
    s,pb,p=R(1,1000000),R(1,100000),R(1,1000000); cases.append(dict(fn="boards", args=[str(s),str(pb),dec(p)], expect=boards(s,pb,p)))
for _ in range(20):
    n,z=R(1,1000000),R(1,1000); cases.append(dict(fn="bundles", args=[str(n),str(z)], expect=bundles(n,z)))
errs=[["studs",["0","16","6"]],["studs",["100001","16","6"]],["studs",["26","0","6"]],["studs",["26","49","6"]],["studs",["26","16","-1"]],["studs",["26","16","100001"]],
 ["plates",["0","3","8"]],["plates",["26","0","8"]],["plates",["26","11","8"]],["plates",["26","3","0"]],["plates",["26","3","51"]],
 ["boards",["0","10","3.85"]],["boards",["27","0","3.85"]],["boards",["27","10","0"]],["boards",["27","10","10000.01"]],
 ["bundles",["0","10"]],["bundles",["37","0"]],["bundles",["37","1001"]]]
json.dump(dict(cases=cases, errors=errs), open("expected.json","w"), indent=1)
print(len(cases),"cases,",len(errs),"errcases")
