import { Ripple } from '../dist/index';

describe('Ripple', () => {

  it('ripple should be created', () => {
    const button = document.createElement('button');

    const ripple = new Ripple(
      {
        element: button,
      }
    );

    expect(ripple).toBeInstanceOf(Ripple);
  });

});