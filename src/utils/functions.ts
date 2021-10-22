export const makeScrollOfPage = (isScroll: boolean) => {
  if (typeof document !== 'undefined')
    document.documentElement.style.overflowY = isScroll ? 'auto' : 'hidden';
};
