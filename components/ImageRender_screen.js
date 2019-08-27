import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import MasonryList from "react-native-masonry-list";
import OverlayComponent from './overlayComponent';



export default class ImageRender extends Component {

    static navigationOptions = {
        header: null,
    }
    constructor(props) {
        super(props);
        this.loadMoreData = this.loadMoreData.bind(this)
        this.state = {
            search: '',
            data: "",
            isLoading: true,
            onEndReached: true,
            id: "",
            pageNumber: 1,
        };
    }
    updateSearch = () => {
        if (this.state.search != null)
            fetch('https://api.unsplash.com/photos/search?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&query=' + this.state.search)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log("data", responseJson);
                    var imagedata = [];
                    responseJson.forEach(element => {
                        imagedata.push(element)

                    });
                    console.log("image url", imagedata)

                    this.setState({
                        data: imagedata,
                        isLoading: false
                    })
                })
                .catch((error) => {
                    console.error(error);
                });

    };

    updateText = search => {
        this.setState({ search });

    }


    loadMoreData() {
        fetch('https://api.unsplash.com/photos/search?client_id=27188885043579c212fdbf88c97812be03382d3a0e2b2f986dfa2b0719897d0a&query=' + this.state.search + '&page=' + this.state.pageNumber)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log("data", responseJson);
                var imagedata = [];
                responseJson.forEach(element => {
                    imagedata.push(element)
                });
                console.log("image", imagedata)

                this.setState({
                    data: this.state.data.concat(imagedata),
                    isLoading: false
                })
            })
            .catch((error) => {
                console.error(error);
            });

    }

    renderImage() {

        return this.state.data.map((element) => {
            return ({
                uri: element.urls.thumb,
                id: element.id,
                user: element.user,
                likes: element.likes
            })

        });
    }

    _onLongPress = (index, id, user) => {
        this.setState({ id: index })

        console.log("this is one", user);
        return (
            <overlayComponent />
        );

    }
    renderCostomeComponent() {
        return (
            <Image >
                <Text>hello</Text>
            </Image>
        )
    }
    render() {
        const { search, data } = this.state;
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.header}>
                    <TextInput
                        style={styles.input}
                        placeholder={'Search for image'}
                        onChangeText={this.updateText}
                        value={search}
                        onSubmitEditing={this.updateSearch}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.searchButton}
                        onPress={this.updateSearch}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>

                </View>
                <MasonryList
                    images={this.state.isLoading ? [] : this.renderImage()}
                    masonryFlatListColProps={{ onEndReached: this.loadMoreData }}
                    onEndReachedThreshold={0.5}
                    onLongPressImage={(item, index) => this._onLongPress(index, item.id, item.user)}
                    onPressImage={(item) => this.props.navigation.navigate("detailScreen", { name: item.user.username })}
                    renderIndividualHeader={(data, index) => {
                        return this.state.id == index ? (
                            <OverlayComponent data={data} />) : <View />
                    }
                    }

                />
            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        height: 70,
        backgroundColor: 'rgb(100, 74, 255)',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        height: '50%',
        width: '75%',
        backgroundColor: 'white',
        borderRadius: 5,
        paddingLeft: 10
    },
    searchButton: {
        height: '50%',
        width: '20%',
        backgroundColor: 'rgb(0, 217, 161)',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
