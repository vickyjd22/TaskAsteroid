import * as React from 'react';
import { StyleSheet, TextInput, View, Button, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


var name: any;
var response_url: any;
var response_hazard: any;

function HomeScreen({ navigation }) {
  const [inputId, onChangeText] = React.useState('');
  const [isLoading, setLoading] = React.useState(true);
  const [data, setData] = React.useState([]);
  const getAsteroidInfo = async () => {
    try {
      const response = await fetch('https://api.nasa.gov/neo/rest/v1/neo/' + inputId + '?api_key=uT7qBDGPxFK6ObmRtT8uHrxxSHZ3TylB8QPO9cnV');
      const json = await response.json();
      setData(json);
      console.log("API response", json.name);
      name = json.name;
      response_url = json.nasa_jpl_url;
      response_hazard = json.is_potentially_hazardous;
      navigation.navigate('Details');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getRandomAsteroidInfo = async () => {
    try {
      const response = await fetch('https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=uT7qBDGPxFK6ObmRtT8uHrxxSHZ3TylB8QPO9cnV');
      const json = await response.json();
      setData(json);
      console.log("Random API response", json.name);
      const randomNumber = Math.floor(Math.random() * json.near_earth_objects.length);
      name = json.near_earth_objects[randomNumber].name;
      response_url = json.near_earth_objects[randomNumber].nasa_jpl_url;
      response_hazard = json.near_earth_objects[randomNumber].is_potentially_hazardous_asteroid;
      navigation.navigate('Details');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }


  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Asteroid ID"
        style={{ padding: 20, margin: 30, height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeText(text)}
        value={inputId}
      />
      <View style={{ margin: 10 }}>
        <Button
          disabled={!inputId.length}
          title="Submit"
          color="black"
          onPress={getAsteroidInfo}
        />
      </View>
      <View style={{ margin: 10 }}>
        <Button
          title="Random Asteroid"
          color="gold"
          onPress={getRandomAsteroidInfo}
        />
      </View>
    </View>
  );
}


function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'flex-start', padding: 20 }}>
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> Name:</Text> {name}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> NASA JPL URL: </Text>{response_url}
      <Text style={{ fontWeight: 'bold', marginTop: 10 }}> IS Hazardous: </Text>{response_hazard}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{
          title: 'Asteroid App',
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{
          title: 'Information',
          headerStyle: {
            backgroundColor: 'tomato',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignContent: 'center',
    padding: 50,
    justifyContent: 'center',
  },
  baseText: {
    fontWeight: 'bold'
  },
  innerText: {
    color: 'red'
  }
});

export default App;
