let [hasFullscreen, prefix] = [false, ''];

const prefixFor = function (): [boolean, string] {
  if ('webkitFullscreenEnabled' in document) return [true, 'webkit'];
  if ('mozFullScreenEnabled' in document) return [true, 'moz'];
  if ('msFullscreenEnabled' in document) return [true, 'ms'];
  if ('fullscreenEnabled' in document) return [true, ''];
  return [false, ''];
};

const exitFullscreen = function (): void {
  // @ts-ignore
  document[!prefix ? 'exitFullscreen' : `${prefix}ExitFullscreen`]();
};

const isElementFullscreen = function () {
  // @ts-ignore
  const {fullscreenElement, msFullscreenElement, mozFullScreenElement, webkitFullscreenElement} = document;
  return Boolean(fullscreenElement || msFullscreenElement || mozFullScreenElement || webkitFullscreenElement);
};

export default function (element: HTMLElement) {
  [hasFullscreen, prefix] = prefixFor();
  if (!hasFullscreen) throw new Error('Current browsers do not support fullScreen');
  // @ts-ignore
  element[!prefix ? 'requestFullscreen' : `${prefix}RequestFullscreen`]();
  return {close: exitFullscreen, has: isElementFullscreen};
}
