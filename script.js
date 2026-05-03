window.addEventListener("load", () => {
    const p = document.getElementById("preloader");
    if (p) { p.style.opacity = "0"; setTimeout(() => p.style.display = "none", 500); }
});
setTimeout(() => {
    const p = document.getElementById("preloader");
    if (p && p.style.display !== "none") { p.style.opacity = "0"; setTimeout(() => p.style.display = "none", 500); }
}, 3000);
document.addEventListener("DOMContentLoaded", () => {
    const h = document.querySelector("header"), b = document.getElementById("burger-toggle"), n = document.getElementById("nav-overlay");
    window.addEventListener("scroll", () => {
        if (h) window.scrollY > 50 ? h.classList.add("scrolled") : h.classList.remove("scrolled");
    });
    if (b && n) {
        b.addEventListener("click", () => {
            b.classList.toggle("active"); n.classList.toggle("active");
            const active = n.classList.contains("active");
            if (active) h.classList.add("scrolled");
            else if (window.scrollY <= 50) h.classList.remove("scrolled");
            document.body.style.overflow = active ? "hidden" : "auto";
        });
    }
    const s = document.querySelectorAll(".hero-slide");
    let cur = 0;
    if (s.length > 1) {
        setInterval(() => {
            s[cur].classList.remove("active");
            cur = (cur + 1) % s.length;
            s[cur].classList.add("active");
        }, 5000);
    }
    const imgs = document.querySelectorAll(".album-card img, .gallery-item img"), lb = document.getElementById("lightbox");
    if (imgs.length > 0 && lb) {
        const lImg = document.getElementById("lightbox-img"), lCnt = document.getElementById("lightbox-counter"), 
              cl = document.querySelector(".lightbox-close"), pr = document.querySelector(".lightbox-prev"), nx = document.querySelector(".lightbox-next");
        let idx = 0, arr = Array.from(imgs).map(i => i.src);
        const up = () => { if (lImg) lImg.src = arr[idx]; if (lCnt) lCnt.textContent = `${idx + 1} / ${arr.length}`; };
        imgs.forEach((img, i) => img.addEventListener("click", (e) => { 
            if (img.closest('.album-card') && !img.closest('.gallery-page')) return;
            e.preventDefault(); idx = i; up(); lb.classList.add("active"); document.body.style.overflow = "hidden"; 
        }));
        if (cl) cl.addEventListener("click", () => { lb.classList.remove("active"); document.body.style.overflow = "auto"; });
        if (nx) nx.addEventListener("click", () => { idx = (idx + 1) % arr.length; up(); });
        if (pr) pr.addEventListener("click", () => { idx = (idx - 1 + arr.length) % arr.length; up(); });
        document.addEventListener("keydown", (e) => {
            if (!lb.classList.contains("active")) return;
            if (e.key === "Escape") { lb.classList.remove("active"); document.body.style.overflow = "auto"; }
            if (e.key === "ArrowRight") { idx = (idx + 1) % arr.length; up(); }
            if (e.key === "ArrowLeft") { idx = (idx - 1 + arr.length) % arr.length; up(); }
        });
    }
    const obs = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }), { threshold: 0.1 });
    document.querySelectorAll(".fade-in-up").forEach(el => obs.observe(el));
});
