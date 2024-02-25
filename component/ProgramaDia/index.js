import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ProgramacaoHorario from '../ProgramaHorario';
import { scale } from '../../assets/scaling';
const ProgramacaoDia = (props) => {
    return(
        <View style={styles.programacaoSemana}>
            <View style={{flexDirection: "row"}}>
                <Icon name='clock' style={styles.iconTime} />
                <Text style={styles.semanaTitle}>{props.days.name}</Text>
            </View>
            { props.days.schedule.map((prog, index) => <ProgramacaoHorario key={`horario-${index}`} prog={prog} /> ) }
        </View>
    );
}
export default ProgramacaoDia;
const styles = StyleSheet.create({
    programacaoSemana: {
        backgroundColor:"#fff",
        paddingVertical: scale(10),
        marginHorizontal: scale(20),
        borderRadius: scale(20),
        marginBottom: scale(10)
    },
    iconTime: {
        fontSize: scale(20),
        color: '#000',
        marginLeft: scale(20),
        marginVertical: scale(15),
        lineHeight: scale(22),
    },
    semanaTitle: {
        fontSize: scale(22),
        lineHeight: scale(22),
        marginLeft: scale(10),
        marginVertical: scale(15),
        fontWeight: "700",
        color: '#666'
    }
})