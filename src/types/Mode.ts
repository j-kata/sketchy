export enum Mode {
  IDLE = 'idle', // tool is SELECT, no figures selected
  SELECT = 'select', // tool is SELECT, figure selected
  DRAGGING = 'dragging', // tool is SELECT, selected figure is dragged
  RESIZING = 'resizing', // tool is SELECT, selected figure is resized
  READY_TO_DRAW = 'ready to draw', // tool is not SELECT, can draw
  DRAWING = 'drawing', // drawing an element
}
