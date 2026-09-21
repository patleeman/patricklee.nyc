(() => {
  const dialog = document.querySelector('#lightbox');
  const dialogImage = document.querySelector('#lightbox-image');
  const dialogCaption = document.querySelector('#lightbox-caption');
  const closeButton = document.querySelector('.lightbox-close');

  if (!dialog || !dialogImage || !dialogCaption || !closeButton) return;

  const openImage = (trigger) => {
    const image = trigger.querySelector('img');
    const caption = trigger.closest('figure')?.querySelector('figcaption');

    if (!image) return;

    dialogImage.src = image.currentSrc || image.src;
    dialogImage.alt = image.alt;
    dialogCaption.textContent = caption ? caption.textContent : image.alt;
    dialog.showModal();
    closeButton.focus();
  };

  document.querySelectorAll('.image-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => openImage(trigger));
  });

  closeButton.addEventListener('click', () => dialog.close());

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.addEventListener('close', () => {
    dialogImage.src = '';
    dialogCaption.textContent = '';
  });
})();
