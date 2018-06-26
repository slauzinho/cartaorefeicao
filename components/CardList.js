import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ListView,
  AsyncStorage,
  Image
} from "react-native";
import { Input, Button } from "react-native-elements";
import CardRow from "./CardRow";


// TODO: SHOULD IMPLEMENT FLATLIST !!!!!!!!!!!
export default class CardList extends React.Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.state = {
      dataSource: ds.cloneWithRows([])
    };
  }

  state = {
    dataSource: null
  };

  componentDidMount() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.setState({
      loading: false,
      dataSource: ds.cloneWithRows(this.props.cards)
    });
  }

  onPressCard(rowData) {
    return this.props.navigation.navigate("Transactions", {
      cardNumber: rowData.cardNumber,
      cardPassword: rowData.cardPassword
    });
  }

  render() {
    return (
      <View style={{ marginTop: 80, flex: 1 }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={rowData => {
            return (
              <View>
                <CardRow
                  cardNumber={rowData.cardNumber}
                  nav={() => this.onPressCard(rowData)}
                />
              </View>
            );
          }}
          enableEmptySections={true}
        />
        <Button
          buttonStyle={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: "#b7c2c6",
            borderRadius: 5,
            backgroundColor: "white"
          }}
          onPress={() => this.props.navigation.navigate('Adding')}
          title={"ola"}
        />
      </View>
    );
  }
}
