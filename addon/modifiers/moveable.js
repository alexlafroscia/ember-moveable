import Modifier from 'ember-modifier';
import Moveable, {
  EVENTS as EMITTED_EVENTS_ARRAY,
  PROPERTIES as ALLOWED_PROPERTIES_ARRAY,
} from 'moveable';

const ALLOWED_EVENTS = new Set(EMITTED_EVENTS_ARRAY);
const ALLOWED_PROPERTIES = new Set(ALLOWED_PROPERTIES_ARRAY);

/**
 * @param {string} eventName
 * @return {string}
 */
function normalizeEventName(eventName) {
  const withoutOn = eventName.substr(2);
  const [firstChar, ...rest] = withoutOn.split('');

  return firstChar.toLowerCase() + rest.join('');
}

export default class MoveableModifier extends Modifier {
  /** @prop {Moveable} **/
  moveable;

  get properties() {
    const properties = {};

    for (const arg in this.args.named) {
      if (ALLOWED_PROPERTIES.has(arg)) {
        properties[arg] = this.args.named[arg];
      }
    }

    return properties;
  }

  get events() {
    const events = {};

    for (const arg in this.args.named) {
      const event = normalizeEventName(arg);
      if (ALLOWED_EVENTS.has(event)) {
        events[event] = this.args.named[arg];
      }
    }

    return events;
  }

  didInstall() {
    this.moveable = new Moveable(document.body, {
      target: this.element,

      // Apply whitelisted properties to constructor
      ...this.properties,
    });

    const events = this.events;

    for (const event in events) {
      this.moveable.on(event, events[event]);
    }
  }

  willDestroy() {
    this.moveable.destroy();
  }
}
