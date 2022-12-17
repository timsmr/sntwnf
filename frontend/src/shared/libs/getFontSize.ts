const FIGMA_FRAME = {
  width: 1360,
  height: 650,
};

const FONT_SIZE = 10;

export const getFontSize = () => {
  return (
    Math.floor(
      ((document.documentElement.clientWidth * FONT_SIZE) / FIGMA_FRAME.width) *
        100
    ) / 100
  );
};
