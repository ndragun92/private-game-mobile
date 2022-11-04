import WebView from 'react-native-webview';

const Game = () => {
    return (
        <WebView
                scalesPageToFit={true}
                bounces={false}
                javaScriptEnabled
                scollEnabled={false}
                style={{ height: '100%', width: '100%' }}
                source={{ uri: 'https://heroes-of-the-universe-ui.herokuapp.com/login' }}
                automaticallyAdjustContentInsets={false}
                javaScriptCanOpenWindowsAutomatically={true}
                applicationNameForUserAgent="Heroes Of The Universe"
            />
    );
};

export default Game;
