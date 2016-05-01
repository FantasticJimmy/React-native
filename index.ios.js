/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

var React = require('react-native');
var AuthService = require('./AuthService');
var AppContainer = require('./AppContainer');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS,
} = React;

var Login = require('./login')
class GithubBrwoser extends Component {
  constructor(props){
    super(props)
    this.state={
      isLoggedIn: false,
      checkingAuth: true,
    }
  }

  componentDidMount(){
    AuthService.getAuthInfo((err,authInfo)=>{
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo!=null,
      })
    });
  }

  onLogIn(){
    console.log('good')
    this.setState({isLoggedIn: true})
  } 
  render() {
    if(this.state.checkingAuth){
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS style={styles.loader} size='large' animating={true} />
        </View>
        )
    }

    if(this.state.isLoggedIn){
      return (
        <AppContainer />
      )
    }
    else{
      return (
        <Login onLogIn={this.onLogIn.bind(this)}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrwoser', () => GithubBrwoser);
