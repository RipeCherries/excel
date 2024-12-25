export class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = null;
  }

  select($element) {
    this.clear();
    this.group.push($element);
    $element.focus().addClass(TableSelection.className);
    this.current = $element;
  }

  get selectedIds() {
    return this.group.map(($element) => $element.id());
  }

  selectGroup($group) {
    this.clear();
    this.group = $group;
    this.group.forEach(($element) => $element.addClass(TableSelection.className));
  }

  clear() {
    this.group.forEach(($element) => $element.removeClass(TableSelection.className));
    this.group = [];
  }

  applyStyle(style) {
    this.group.forEach(($element) => $element.css(style));
  }
}
