import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @action handleResize({ target, width, height }) {
    target.style.width = `${width}px`;
    target.style.height = `${height}px`;
  }

  @action handleDrag({ target, transform }) {
    target.style.transform = transform;
  }
}
