import ImageRender from './ImageRender_screen';
import Detail_screen from './Detail_screen'
import {  createAppContainer, createStackNavigator } from 'react-navigation';

const applicationLayer = createStackNavigator(
    {
    ImageRender:{ screen: ImageRender },
    detailScreen: { screen: Detail_screen },
    }
  );
  
  const RootNavigator = createAppContainer(applicationLayer);

  export default RootNavigator;