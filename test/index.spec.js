// importamos la funcion que vamos a testear
import { GetPost } from '../src/Component/post/GetPost.js';

describe('GetPost', () => {
  it('debería ser una función', () => {
    expect(typeof GetPost).toBe('function');
  });
});
