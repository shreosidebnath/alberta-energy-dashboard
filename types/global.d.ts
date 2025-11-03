declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module 'mapbox-gl/dist/mapbox-gl.css';