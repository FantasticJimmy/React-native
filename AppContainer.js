
var React = require('react-native');
var AuthService = require('./AuthService');
var {
  Component,
  StyleSheet,
  Text,
  View,
  TabBarIOS,
} = React;
var Feed = require('./feed')

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
});

class AppContainer extends Component {
  constructor(props){
    super(props)
    this.state={
      selectedTab: 'feed',
    }
  }
  render(){
    return(
        <TabBarIOS style={styles.container}>
          <TabBarIOS.Item
            title = "Feed" 
            selected = {this.state.selectedTab=='feed'} 
            icon = {require('image!feed')} 
            onPress={() => this.setState({selectedTab:'feed'} )}
          >
            <Feed />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title = "Search" 
            selected = {this.state.selectedTab=='search'} 
            icon = {require('image!feed')} 
            onPress={() => this.setState({selectedTab:'search'} )}
          >
            <Text style={styles.welcome}>Tab 2</Text>
          </TabBarIOS.Item>
        </TabBarIOS>
    )
  }
}

module.exports = AppContainer;