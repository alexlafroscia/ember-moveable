const ELEMENT_TO_MOVEABLE = new WeakMap();

export function mapTargetToMoveable(target, moveable) {
  ELEMENT_TO_MOVEABLE.set(target, moveable);
}

export function getMoveableForTarget(target) {
  return ELEMENT_TO_MOVEABLE.get(target);
}
