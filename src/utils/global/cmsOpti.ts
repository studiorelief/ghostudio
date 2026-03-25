export const cmsOpti = () => {
  const embeds = document.querySelectorAll<HTMLElement>('.w-richtext .w-embed');

  embeds.forEach((embed) => {
    const video = embed.querySelector('video');
    if (!video) return;

    if (video.classList.contains('is-right')) {
      embed.classList.add('w-richtext-align-floatright');
    } else if (video.classList.contains('is-left')) {
      embed.classList.add('w-richtext-align-floatleft');
    }
  });
};
