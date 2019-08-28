import ImageRender from './ImageRender';
import UserGallaryscreen from "./UserGallaryscreen";
import { createAppContainer, createStackNavigator } from 'react-navigation';

const applicationLayer = createStackNavigator(
  {
    ImageRender: { screen: ImageRender },
    detailScreen: { screen: UserGallaryscreen },
  }
);

const RootNavigator = createAppContainer(applicationLayer);

export default RootNavigator;