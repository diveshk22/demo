const header=document.querySelector('#header');
const menu=document.querySelector('.menu-toggle');
const body=document.body;
const cursor=document.querySelector('.cursor');

window.addEventListener('scroll',()=>{
  header.classList.toggle('scrolled',window.scrollY>30);
  document.querySelectorAll('.parallax').forEach(el=>{
    const speed=parseFloat(el.dataset.speed||0);
    const rect=el.parentElement.getBoundingClientRect();
    if(rect.bottom>0&&rect.top<innerHeight) el.style.transform=`translate3d(0,${-rect.top*speed}px,0)`;
  });
},{passive:true});

menu?.addEventListener('click',()=>{
  const open=body.classList.toggle('menu-open');
  menu.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>body.classList.remove('menu-open')));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

if(matchMedia('(pointer:fine)').matches){
  window.addEventListener('mousemove',e=>{
    cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px';
  });
  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.addEventListener('mouseenter',()=>cursor.classList.add('active'));
    item.addEventListener('mouseleave',()=>cursor.classList.remove('active'));
  });
}

const lightbox=document.querySelector('.lightbox');
const lbImg=lightbox.querySelector('img');
const lbTitle=lightbox.querySelector('span');
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    const img=item.querySelector('img');
    lbImg.src=img.src;lbImg.alt=img.alt;lbTitle.textContent=item.dataset.title||'ÁLAMOS';
    lightbox.classList.add('open');lightbox.setAttribute('aria-hidden','false');body.style.overflow='hidden';
  });
});
function closeLightbox(){lightbox.classList.remove('open');lightbox.setAttribute('aria-hidden','true');body.style.overflow='';}
document.querySelector('.lightbox-close').addEventListener('click',closeLightbox);
lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLightbox()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLightbox();body.classList.remove('menu-open')}});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const target=document.querySelector(a.getAttribute('href'));
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});}
  });
});
