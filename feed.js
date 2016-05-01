
var React = require('react-native');
var AuthService = require('./AuthService');
var {
  Component,
  Text,
  View,
  ListView,
} = React;


class Feed extends Component {
  constructor(props){
    super(props)
    var ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    })
    this.state={
      dataSource: ds.cloneWithRows(['A','B','C'])
    }
  }
  componentDidMount(){
    this.fetchFeed();
  }
  renderRow(rowData){
    return (<Text style={{color: '#333',backgroundColor: '#fff', alignSelf:'center'}}>
        {rowData}
      </Text>
    )
  }
  fetchFeed(){
    AuthService.getAuthInfo((err, authInfo)=>{
      var url = 'https://api.github.com/users/'+authInfo.user.login+'/received_events';
      fetch(url,{
        headers: authInfo.header
      })
      .then((r)=>{
        return r.json()
      })
      .then((data)=>{
        var feedItems = data.filter((ev)=>ev.type=='PushEvent');
        this.setState({dataSource: this.state.dataSource.cloneWithRows(feedItems)});
      })
    })
  }
  render(){
    return(
        <View style={{flex:1,justifyContent:'flex-start'}}>
          <ListView dataSource={this.state.dataSource}
            renderRow={this.renderRow.bind(this)}
          />
        </View>
    )
  }
}

module.exports = Feed;