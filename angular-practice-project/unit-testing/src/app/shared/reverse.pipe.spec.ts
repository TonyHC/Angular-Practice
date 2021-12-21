import { ReversePipe } from './reverse.pipe';

describe('Reverse Pipe', () => {
  // Isolated Test: doesn't have a dependency on Angular and its features
  it('should reverse the string provided', () => {
      let reversePipe = new ReversePipe();
      expect(reversePipe.transform('hello')).toEqual('olleh');
  });
});
