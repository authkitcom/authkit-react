import { Tokens } from '@authkitcom/core';
import { configure } from 'enzyme';
import { mount, ReactWrapper } from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16';
import * as React from 'react'
const mockCreateAuthKit = jest.fn()
jest.mock('@authkitcom/core', () => ({
  createAuthKit: mockCreateAuthKit
}))
import { AuthKitProvider } from '../AuthKitProvider'
import { getTokens } from '../getTokens';

configure({ adapter: new Adapter() });

const StubConsumer: React.FC = () => {
  const tokens = getTokens()
  return (<p>{tokens!.expiresIn}</p>)
}

beforeEach(() => {
  jest.resetModules();
});

describe('<AuthKitProvider/>', () => {

  const issuer = 'test-issuer'
  const clientId = 'test-client-id'
  const scope = ['test-scope']

  let wrapper: ReactWrapper

  const mockAuthKit = {
    getTokens: jest.fn(),
    authorize: jest.fn(),
  }

  beforeEach(async () => {

    const createParams = {
      clientId,
      issuer,
      scope,
    }

    mockCreateAuthKit.mockImplementation(() => mockAuthKit)

    const tokens: Tokens = {
      expiresIn: 1000
    }

    mockAuthKit.getTokens.mockReturnValue(tokens)

    wrapper = mount(<AuthKitProvider createParams={createParams}><StubConsumer /></AuthKitProvider>)

  })

  // TODO - Figure out how to test the actual authorize call
  it('renders something', () => {
    expect(wrapper.find('p').first().text()).toBe('Loading...')
  })
})
