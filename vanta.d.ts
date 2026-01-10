declare module 'vanta/dist/vanta.dots.min.js' {
  interface VantaEffect {
    destroy: () => void;
  }

  interface VantaOptions {
    el: HTMLElement | null;
    THREE: typeof import('three');
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
  }

  function DOTS(options: VantaOptions): VantaEffect;
  export default DOTS;
}

