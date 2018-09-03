import * as app from './app'

const animateStub = jest.spyOn(app, 'animate')

describe('App.js', () => {
  it('should animate be called', () => {
    expect(animateStub).toHaveBeenCalled()
  })
})
