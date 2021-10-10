import React, { Component } from 'react';
import { View, SafeAreaView , ScrollView, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';
import NewsAticleLine from '../../Component/NewsArticleLine';
import { displayPlayer } from "../../Actions/HomePageAction";
import { scale } from '../../assets/scaling';

const { height } = Dimensions.get('window');

const DATA = [
    {
        title: "Dica Olímpica: Skate Leading Stars",
        subTitle: "Com os Jogos Olímpicos de Tóquio a todo vapor, a Blast traz mais uma dica de animes que são inspirados em jogos, dessa vez com um esporte estreante nos jogos.",
        thumb: 'https://redeblast.com/super/uploads/post/7f9d36d288aa817674cdb1acf7b3ed7f.jpg',
        time: "2 meses atrás",
        text: `
A primeira medalha do Brasil nos Jogos Olímpicos de Tóquio 2020 veio  no Skate, com o grande e talentoso Kevin Hoefler, que conseguiu a medalha de Prata, ficando atrás apenas do japonês Yuto Horigome.

Esta é a primeira vez que a modalidade skate ocorre em uma edição dos Jogos Olímpicos. Logo na primeira vez do esporte na competição, já tivemos um brasileiro no pódio. 

Esta conquista me inspirou nesta edição do "Dica Olímpica", onde trazemos sugestões de animes inspirados em modalidades dos Jogos Olímpicos de Tóquio 2020. 

Hoje falaremos de Skate-Leading☆Stars!

O anime conta a história de Kensei Maeshima, um prodígio do skate que desiste do esporte após ser humilhado pelo rival, Reo Shinozaki. Após alguns anos, Kensei utiliza sua expertise no skate para auxiliar a equipe de skate do Colégio Inodai, porém ainda sem competir oficialmente.

Tudo muda quando Reo, seu arqui-inimigo, anuncia que irá competir na modalidade de Equipes e se unirá ao Colégio Clavis Gakuin. Assim, um amigo de Kensei, Hayato Sasugai, convence Kensei a voltar ao esporte e enfim derrotar seu arqui-inimigo em uma competição.

Embora talentoso, Kensei carece de espírito de equipe e conta com um temperamento peculiar, de forma que deve aprender a confiar em sua equipe, para que possa derrotar seu arqui-inimigo, Reo Shinozaki.

Assim como o esporte é novo nos Jogos Olímpicos, o anime também é novo no mundo oriental: tendo sua estreia entre 10 de Janeiro de 2021 e 28 de Março de 2021, o anime contou com 12 episódios de 21-23 minutos cada. Produzido pelo estúdio J.C.Staff (Bakuman), é possível ver traços típicos desse estúdio, que lida bem com animes do gênero dramédia escolar.

Vendo a competição recentemente, vejo que o anime tentou explorar as manobras para gerar ação, mas é algo que eu sinto que podia ser melhorado. De toda forma, é um anime que vale muito a pena ser assistido, especialmente se você acompanhou o Kevin e agora se vê como um expert no mundo dos skates. 
        `
    },
    {
        title: "Blast Explica: \"Spokon\"",
        subTitle: "É novo na cultura oriental e não compreende muito bem os termos? Se aproxime, pois a Blast vai te explicar com detalhes cada um destes termos.",
        thumb: "https://redeblast.com/super/uploads/post/fcd66cbda390e73b30e4fdcaa2df9ef9.jpg",
        time: "2 meses atrás"
    },
    {
        title: "Dica Olímpica: The Prince of Tennis",
        subTitle: "Com os Jogos Olímpicos de Tokyo se aproximando, que tal nos aventurarmos por obras japonesas inspiradas em jogos?",
        thumb: "https://redeblast.com/super/uploads/post/53dc2eff0eb24ca90a9411779e408fd6.jpeg",
        time: "3 meses atrás"
    },
    {
        title: "A queda de Shingeki no Kyojin",
        subTitle: "Shingeki no Kyojin foi de uma das obras mais aclamadas da atualidade para uma piada na Internet, mas como diabos isso aconteceu tão rápido?",
        thumb: "https://redeblast.com/super/uploads/post/7100765136886dfd74f7ac6afcef5e05.png",
        time: "3 meses atrás"
    },
    {
        title: "Histórias que podemos ver no filme de Dragon Ball",
        subTitle: "Já tivemos a confirmação de que um novo filme de Dragon Ball Super está em desenvolvimento, mas qual seria a história explorada nesse longa? Confira agora algumas possibilidades!",
        thumb: "https://redeblast.com/super/uploads/post/66784c22986a5b3f3887db8599666da5.png",
        time: "3 meses atrás"
    },
    {
        title: "TOP 10: Shoujo Openings",
        subTitle: "Confira as dez aberturas imperdíveis de animes estilo shoujo. Mesmo que você não seja fã de animes deste tipo, com certeza vai se empolgar com esta lista!",
        thumb: "https://redeblast.com/super/uploads/post/ac8a29e6b9f23a3c129cfc2f8a9290c4.png",
        time: "3 meses atrás"
    },
    {
        title: "Dica Olímpica: Run with the Wind",
        subTitle: "Com menos de 60 dias para os Jogos Olímpicos,  vamos assistir alguns animes inspirados em esportes?",
        thumb: "https://redeblast.com/super/uploads/post/131e97d4be3c3f58e2e97606fa484a5e.jpg",
        time: "4 meses atrás"
    },
    {
        title: "Animes curtos",
        subTitle: "Você aí, com a agenda apertada, ou que tem tantas tarefas que mal sobra tempo para assistir um anime. Você mesmo. Esse post é feito para você. Confira a seleção da Blast para animes curtos.",
        thumb: "https://redeblast.com/super/uploads/post/51531c9962fef96ccc0dab4a735fd7da.jpg",
        time: "4 meses atrás"
    }
];
class Secao extends Component {
    state = {
        screenHeight: 0,
    }
    onContentSizeChange = (contentWidth, contentHeight) => {
        this.setState({screenHeight: contentHeight})
    }
    render(){
        const scrollEnabled = this.state.screenHeight > height;
        return(
            <View style={styles.content}>
                <ScrollView 
                    style={{flex:1}}
                    scrollEnabled={scrollEnabled}
                    onContentSizeChange={this.onContentSizeChange}
                >
                    <View style={styles.newsContent}>
                        {
                            DATA.map((news, index) => <NewsAticleLine key={`dia-${index}`} news={news}/>)
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    statusDisplayPlay:         state.HomePageReducer.statusDisplayPlay,
});

export default connect(mapStateToProps, { displayPlayer })(Secao);

const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flex: 1,
    },
    newsContent:{
        flex:1,
        overflow:'hidden',
        paddingTop: scale(20),
    },
    newsLine: {
        backgroundColor: "#ffffff",
        flexDirection: 'row',
        minHeight: scale(30),
        padding: scale(5),
        borderRadius: scale(10),
        marginVertical: scale(5)
    },
    newsImage: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(5),
        resizeMode: 'cover',
    },
    newsTime: {
        fontSize: scale(12),
        lineHeight: scale(18),
    },
    newsTitle: {
        fontSize: scale(16),
        lineHeight: scale(24),
        fontWeight: 'bold'
    },
    newsDescription: {
        display: 'flex',
        flex: 1,
        fontSize: scale(14),
        lineHeight: scale(19),
    },
})