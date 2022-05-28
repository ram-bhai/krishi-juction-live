var num = Math.floor(Math.random() * 4) + 1;
$("#card").wScratchPad({
  size: 100, // The size of the brush/scratch.
  bg: `./assets/img/archana.jpg`, // Background (image path or hex color).
  fg: `./assets/img/front.jpg`, // Foreground (image path or hex color) hii.
  realtime :true,
  scrathDown: null,
  scarhMove: null,
  scratchUp: null,
  cursor: "pointer", // Set cursor.
});

