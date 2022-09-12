import 'assets/blocks/navbar.assets.css';
import 'assets/blocks/mobile/navbar.assets.css'
import 'assets/global.assets.css';
import React from "react";
import Logo from 'assets/img/crest-icon.png'
import LogoName from 'assets/img/crest-name.png'
import Web3 from 'web3'
// import Web3ContextProvider from 'components/pages/test2';
import { ethers } from 'ethers'
import Notiflix from 'notiflix';
import Web3Modal from 'web3modal'
import WalletConnectProvider from "@walletconnect/web3-provider";
import network from 'contract/network.contract.js'
import { LoginActions } from 'store/actions/login.actions.js'
import { connect } from 'react-redux'
import AxiosRequest from 'request/axios.request.js' 

const MapStateToProps = (state) => 
{
    return { address: state.login.address, }; 
};

const mapDispatchToProps = (dispatch) => 
{
    return { loginAction: (data) => { dispatch(LoginActions(data)); }, };
};


class Navbar extends React.Component 
{

  constructor(props) 
  {
      super(props);

      this.state = 
      {
        address: this.props.address,
        isMetamaskSupported: false,
        isLoggedIn: false,
        provider: null,
      };

  }

  async UNSAFE_componentWillMount() 
  {
    if (window.ethereum) { this.state.isMetamaskSupported = true }
  }

  componentDidUpdate(prevProps, prevState, snapshot) 
  {
    if (prevProps.address !== this.props.address)
    { 
      this.state.address = this.props.address 
      this.forceUpdate();

    }else if(prevProps.tweeted !== this.props.tweeted)
    {   
      this.state.tweeted = this.props.tweeted 
      this.forceUpdate();
    }
  }

  connectWallet = async () => 
  {
      if (this.state.isMetamaskSupported) 
      {
        const providerOptions = { walletconnect: { package: WalletConnectProvider, options: { rpc: { [network.chainId]: network.rpcUrls[0] } } } }
        let web3Modal = new Web3Modal( { cacheProvider: false, providerOptions, disableInjectedProvider: false, theme: "dark" })
        const instance = await web3Modal.connect()
        const newProvider = new ethers.providers.Web3Provider(instance);
        const chainId = (await newProvider.getNetwork()).chainId

        if (chainId == network.chainId) 
        {
          let axiosRequest = new AxiosRequest()
          this.state.provider = newProvider
          this.state.address = await newProvider.getSigner().getAddress()
          this.state.isLoggedIn = true

          await axiosRequest.sendAddress(this.state.address)
          this.props.loginAction({address : this.state.address, action: "address"})
          

        }else 
        {
          Notiflix.Notify.failure(
          "Required Network - " + network.chainName, { timeout: 2500, width: '300px', position: 'right-top' });
        }

      }else if (window.web3) window.web3 = new Web3(window.web3.currentProvider)
      else window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')

      
      this.forceUpdate();

  }

  render()
    {
      return(
        <div className="navbar flex row">

        <div className="navbar-logo flex row">
          <div className="navbar-logo-core">
            <img className="logo-crest" src={Logo} alt={Logo} />  
          </div>
        </div>

    

        <div className="navbar-title flex row center">
          <img className="title-crest" src={LogoName} alt={LogoName} />
        </div>

        <div className="navbar-button flex row">
            {
              this.state.address !== null
              ?<div className="navbar-address-core flex row center"><p className='navbar-address'>{this.state.address}</p></div>
              :<button className="button dapp-button flex row center" onClick={() => this.connectWallet()}> <p>Connect Wallet</p> </button>
            }
        </div>

      </div>

      );
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(Navbar);
