// @flow
import * as React from "react";
import { Icon } from "react-native-elements";
import type { NavigationState, NavigationScreenProp, NavigationStateRoute } from 'react-navigation';
import AddCard from "../components/AddCard";

type Props = {
  children: ?React.Node,
  navigation: NavigationScreenProp<NavigationState>,
}

type Params = {
  otherParam: ?string
}

class AddCardScreen extends React.Component<Props> {
  static navigationOptions = ({ navigation }: { navigation: NavigationScreenProp<NavigationStateRoute> }) => ({
    title: navigation.state.params
      ? navigation.state.params.otherParam
      : "Adicionar cartão",
    headerStyle: {
      paddingRight: 20
    },
    headerRight: (
      <Icon
        onPress={() => navigation.navigate("Help")}
        title="Info"
        color="#111"
        name="info-with-circle"
        type="entypo"
      />
    )
  });

  render() {
    return <AddCard {...this.props} />;
  }
}

export default AddCardScreen;
