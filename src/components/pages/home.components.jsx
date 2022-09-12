import 'assets/pages/index.assets.css';
import 'assets/pages/mobile/index.assets.css';
import 'assets/global.assets.css';
import React from "react";
import Navbar from "components/blocks/navbar.components.jsx"
import Sphere from "assets/img/sphere.svg"
import { LoginActions } from 'store/actions/login.actions.js'
import { connect } from 'react-redux'

const MapStateToProps = (state) => 
{
    return { address: state.login.address, tweeted: state.login.tweeted}; 
};

const mapDispatchToProps = (dispatch) => 
{
    return { loginAction: (data) => { dispatch(LoginActions(data)); }, };
};

class Index extends React.Component 
{

  constructor(props) 
  {
      super(props);

      this.state = 
      {
        address: this.props.address,
        tweeted : this.props.tweeted,
        textTweet: "Just submitted my WL request to @playCrest, let's !pray 🤲 $CREST"
      };
      console.log("state : ", this.state.address)
      console.log("tweeted : ", this.state.tweeted)
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


  sendMessageTwitter = async () => 
  {
    window.open(`https://twitter.com/intent/tweet?text=${this.state.textTweet}`)
    this.props.loginAction({tweeted: true, action: 'tweeted'})
  }

  render()
    {
      return(
        <div className="home p1">

          <Navbar></Navbar>

          <div className="home-body flex column">
            

              {
                this.state.tweeted == false ?
                (
                  <div className="home-body-card flex column">
                    <h1 className="home-title"><span className="gradient-crest">DEAR VISITOR,</span> INTERACT WITH THIS AND GET WAITLIST ACCESS</h1>
                    <p className="home-description">CONNECT WALLET {"->"} CLICK ON BUTTON {"->"} RETWEET</p>
                    <div className="home-button-core flex row center">
                    {
                      this.state.address !== null &&
                      (
                        <button className="home-button flex row center" onClick={() => this.sendMessageTwitter()}>Access to the whitelist</button>
                      )
                    }
                    </div>
                  </div>

                ):(
                  <div className="home-body-card-winner flex column">
                    <h1 className="home-title-winner"><span className="gradient-crest">CONGRATULATIONS</span> DEAR COLLECTOR</h1>
                    <div className="home-winner-bar-large"></div>
                    <p className="home-description-winner">You are now on the waitin list to become a <span className="gradient-orange">Maven</span></p>
                    <div className="home-winner-bar-short"></div>
                    <p className="home-description2">Retweet, like and comment under our tweets to have higher chance to be seen by and admin</p>
                  </div>
                )
              }
          </div>

          <div className="home-sphere flex column center flex row center">
              <img src={Sphere} alt={Sphere} className="sphere-img" />
          </div>

        </div>

      );
    }
}

export default connect(MapStateToProps, mapDispatchToProps)(Index);
