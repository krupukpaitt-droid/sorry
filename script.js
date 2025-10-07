// Basic slide navigation
const showSlide = (id) => {
  document.querySelectorAll('.slide').forEach(s => {
    if (s.id === id) {
      s.classList.add('active');
      s.setAttribute('aria-hidden','false');
    } else {
      s.classList.remove('active');
      s.setAttribute('aria-hidden','true');
    }
  });
};

// initial bindings
document.addEventListener('DOMContentLoaded', () => {
  // welcome buttons
  document.getElementById('btn-yes').addEventListener('click', () => showSlide('slide-menu'));
  document.getElementById('btn-no').addEventListener('click', () => showSlide('slide-try'));
  document.getElementById('btn-tryagain').addEventListener('click', () => showSlide('slide-welcome'));
  document.getElementById('btn-back-to-welcome').addEventListener('click', () => showSlide('slide-welcome'));

  // choices in menu
  document.querySelectorAll('.choice').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.target;
      if (target) showSlide(target);
    });
  });

  // data-target buttons (generic back)
  document.querySelectorAll('[data-target]').forEach(b => {
    b.addEventListener('click', (e) => {
      const t = e.currentTarget.dataset.target;
      if (t) showSlide(t);
    });
  });

  // share poem button (example: open poem slide)
  const sharePoem = document.getElementById('btn-share-poem');
  if (sharePoem) sharePoem.addEventListener('click', () => showSlide('slide-letter'));

  // download message (simple text file download)
  const btnDownload = document.getElementById('btn-download');
  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      const text = document.querySelector('.message-text').innerText;
      const blob = new Blob([text], {type: 'text/plain'});
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'message-for-you.txt';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    });
  }

  // allow clicking photos to enlarge (simple)
  document.querySelectorAll('.photo').forEach(p => {
    p.addEventListener('click', () => {
      // simulate open: show full-screen modal with same content
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.inset = 0;
      modal.style.background = 'rgba(0,0,0,0.6)';
      modal.style.display = 'flex';
      modal.style.alignItems = 'center';
      modal.style.justifyContent = 'center';
      modal.style.zIndex = 9999;
      const inner = document.createElement('div');
      inner.style.width = '80%';
      inner.style.maxWidth = '700px';
      inner.style.height = '70%';
      inner.style.background = '#fff';
      inner.style.borderRadius = '12px';
      inner.style.display = 'flex';
      inner.style.alignItems = 'center';
      inner.style.justifyContent = 'center';
      inner.style.boxShadow = '0 20px 40px rgba(0,0,0,.2)';
      inner.innerHTML = `<div style="padding:20px;text-align:center;color:#444">This is an enlarged photo placeholder.<br/><small>Replace with your own image by editing index.html</small></div>`;
      modal.appendChild(inner);
      modal.addEventListener('click', () => modal.remove());
      document.body.appendChild(modal);
    });
  });
});