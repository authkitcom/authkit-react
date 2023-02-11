import {ITokens} from '@authkitcom/core';
import {render, screen} from "@testing-library/react";
import * as React from 'react'
import { AuthKitProvider } from '../AuthKitProvider'

const mockCreateAuthKitForDom = jest.fn()
jest.mock('@authkitcom/core', () => ({
  createAuthKitForDOM: mockCreateAuthKitForDom
}))

const StubConsumer: React.FC = () => {
  return (<p>test</p>)
}

beforeEach(() => {
  jest.resetModules();
});

describe('<AuthKitProvider/>', () => {

  const issuer = 'test-issuer'
  const clientId = 'test-client-id'
  const scope = ['test-scope']


  const mockAuthKit = {
    authorize: jest.fn(),
  }

  beforeEach(async () => {

    const createParams = {
      clientId,
      issuer,
      scope,
    }

    const tokens: ITokens = {
      expiresIn: 1000
    }

    mockCreateAuthKitForDom.mockImplementation(() => mockAuthKit).mockReturnValue(tokens)



    render(<AuthKitProvider createParams={createParams} scope={[]}><StubConsumer /></AuthKitProvider>)

  })

  // TODO - Figure out how to test the actual authorize call
  it('renders something', () => {
    expect(screen.getByRole('p').textContent).toBe(('Loading...'));
  })
})
