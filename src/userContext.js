import React, { Component } from 'react'

const UserContext = React.createContext()

class UserProvider extends Component 
{
  state = { address: "", twitted: false }

  setAddress = (address) => { this.setState((prevState) => ({ address })) }
  setTwitted = (twitted) => { this.setState((prevState) => ({ twitted })) }

  render() 
  {
    const { children } = this.props
    const { address } = this.state
    const { setAddress } = this
    const { twitted } = this.state
    const { setTwitted } = this

    return (
      <UserContext.Provider value={{ address, setAddress, twitted, setTwitted, }} >
            {children}
      </UserContext.Provider>
    )
  }
}
export default UserContext
const UserConsumer = UserContext.Consumer
export { UserProvider, UserConsumer }