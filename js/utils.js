const randomValue = (min, max) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

const clampValue = ( value, min, max ) => {
  return Math.min( Math.max( min, value ), max);
}
