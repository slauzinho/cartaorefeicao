import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { material } from 'react-native-typography';
import { FunctionComponent } from 'react';

interface Props {
    value: string;
    description: string;
    date: string;
}

const Row: FunctionComponent<Props> = props => (
    <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
            <Icon
                name={parseInt(props.value, 10) < 0 ? 'angle-down' : 'angle-up'}
                size={20}
                color={parseInt(props.value, 10) < 0 ? 'red' : 'green'}
            />
        </View>
        <View style={{ flex: 0.75 }}>
            <Text style={material.body1}>{props.description}</Text>
            <Text style={material.caption}>{props.date}</Text>
        </View>
        <View style={{ flex: 0.15 }}>
            <Text style={parseInt(props.value, 10) < 0 ? { color: 'red' } : { color: 'green' }}>{props.value}</Text>
        </View>
    </View>
);

export default Row;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 20,
        borderBottomWidth: 1,
        paddingBottom: 25,
        borderBottomColor: 'rgba(220,220,220, 0.8)',
    },
});
