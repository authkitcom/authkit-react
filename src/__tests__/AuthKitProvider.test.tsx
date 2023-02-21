import {ITokens} from '@authkitcom/core';
import { render, screen} from "@testing-library/react";
import * as React from 'react'
import { AuthKitProvider } from '../AuthKitProvider'


const mockAuthentication = {
  logout: jest.fn(() => {}),
  getTokens: jest.fn(() => ({})),
  isAuthenticated: jest.fn(() => {}),
  getUserinfo: jest.fn(() => {})
}
const mockAuthKit = {
  authorize: jest.fn(() => mockAuthentication),
}
jest.mock('@authkitcom/core', () => {
  return {
    createAuthKitForDOM: jest.fn(() => mockAuthKit)
  }
})

const StubConsumer: React.FC = () => {
  return (<p data-testid="content">test</p>)
}

beforeEach(() => {
  jest.resetModules();
});

describe('<AuthKitProvider/>', () => {

  const issuer = 'test-issuer'
  const clientId = 'test-client-id'
  const redirectUri = ''
  const scope = ['test-scope']


  beforeEach( () => {

    const createParams = {
      clientId,
      issuer,
      redirectUri
    }

    const tokens: ITokens = {
      expiresIn: 1000
    }
    mockAuthentication.getTokens.mockReturnValue(tokens)
    mockAuthKit.authorize.mockReturnValue(mockAuthentication)


    render(<AuthKitProvider createParams={createParams} scope={scope}
                                            authorizeOnMount><StubConsumer/></AuthKitProvider>)

  })

  // TODO - Figure out how to test the actual authorize call
  it('renders something', async () => {
    expect(await screen.getByTestId('content').textContent).toBe(('Loading...'));
  })
})
