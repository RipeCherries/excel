import { $ } from '@core/dom';

export const resizeHandler = ($root, event) => {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    $resizer.css({
      opacity: 1,
      [$resizer.data.resize === 'column' ? 'bottom' : 'right']: '-5000px'
    });

    const $parent = $resizer.closest('[data-type="resizable"]');

    let value = 0;

    document.onmousemove = (e) => {
      if ($resizer.data.resize === 'column') {
        const delta = e.pageX - $parent.getCoords().right;
        value = $parent.getCoords().width + delta;

        $resizer.css({ right: -delta + 'px' });
      } else {
        const delta = e.pageY - $parent.getCoords().bottom;
        value = $parent.getCoords().height + delta;

        $resizer.css({ bottom: -delta + 'px' });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if ($resizer.data.resize === 'column') {
        $parent.css({ width: value + 'px' });
        $root
          .findAll(`[data-column="${$parent.data.column}"]`)
          .forEach((element) => (element.style.width = value + 'px'));
      } else {
        $parent.css({ height: value + 'px' });
      }

      resolve({
        value,
        type: $resizer.data.resize,
        id: $resizer.data.resize === 'column' ? $parent.data.column : $parent.data.row
      });

      $resizer.css({ opacity: 0, bottom: 0, right: 0 });
    };
  });
};
