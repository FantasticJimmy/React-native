'use strict';

var React = require('react-native');
var buffer = require('buffer');
var {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS,
} = React;

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF',
        flex: 1,   
        paddingTop: 50,
        alignItems: 'center',
        padding: 10,
    },
    logo: {
        width: 66,
        height: 55,
    },
    heading: {
        fontSize: 30,
        marginTop: 10,
    },
    input:{
        padding: 4,
        height: 50,
        marginTop: 10,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec',
    },
    button:{
        height: 50,
        backgroundColor: '#48bbec',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center',
    },
    loader: {
        marginTop: 20,
    },
    error: {
        color: 'red',
        padding: 20,
    }

})

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            showProgress: false,
        }
    }
    onLoginPressed(){
        this.setState({showProgress: true});
        var authService = require('./AuthService');
        authService.login({
            username: this.state.username,
            password: this.state.password
        },(results)=>{
            var wtf = this
            this.setState(Object.assign({
                showProgress: false
            },results));
            if(results.success && this.props.onLogIn){
                this.props.onLogIn();
            }

        });
    }
    render(){
        var errorCtrl = <View />;

        if(!this.state.success && this.state.badCredentials){
            errorCtrl = <Text style={styles.error}>Bad credential</Text>;
        }
        if(!this.state.success && this.state.iDontKnowBro){
            errorCtrl = <Text style={styles.error}>I dont know bro</Text>;
        }
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={require('image!images')} />
                <Text style={styles.heading}>GitHub Browser</Text>
                <TextInput 
                    style={styles.input} 
                    placeholder='Github username' 
                    onChangeText={(text)=>this.setState({username: text})}
                    />
                <TextInput 
                    style={styles.input} 
                    placeholder='Github password' 
                    onChangeText={(text)=>this.setState({password: text})}
                    secureTextEntry="true"/>
                <TouchableHighlight style={styles.button} onPress={this.onLoginPressed.bind(this)} >
                    <Text style={styles.buttonText}>Log in</Text>
                </TouchableHighlight>
                {errorCtrl}
                <ActivityIndicatorIOS
                    animating={this.state.showProgress} size='large' style={styles.loader}
                />
            </View>
            )
    }
}

module.exports = Login;