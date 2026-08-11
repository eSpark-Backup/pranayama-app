import { StyleSheet, Dimensions } from 'react-native';
import metrics from './metrics';
import colors from './colors';
import { Fonts } from '../utils/fonts';

export { metrics, colors };

const { width, height } = Dimensions.get('window');

const Slider = StyleSheet.create({
  slider: {
    overflow: 'visible',
  },
});

const Pagination = StyleSheet.create({
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 8,
  },
});

const Layout = StyleSheet.create({
  safeArea: {
    flex: 1,
    //backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    //backgroundColor: 'white',
  },
  backgroundImage: {
    width: width * 1,
    height: height * 1,
    position: 'absolute',
    // backgroundColor: '#75c3ff',
  },
});

const Gradient = StyleSheet.create({
  gradientAbsoluteFill: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Select = StyleSheet.create({
  Select: {
    maxHeight: 380,
    paddingHorizontal: 16,
    borderTopColor: colors.white,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderBottomColor: colors.white,
  },
  SelectItem: {
    backgroundColor: colors.white,
    padding: 16,
    paddingHorizontal: 24,
    marginVertical: 8,
    borderRadius: 32,
    flex: 1,
    maxHeight: 380,

    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const Button = StyleSheet.create({
  PlayButton: {
    backgroundColor: colors.red,
    height: 100,
    width: 100,
    borderRadius: 48,
  },
});
const Modal = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: width * 0.9,
    padding: height * 0.02,
    marginBottom:height * 0.04,
    borderRadius: 16,
  },
  root: {
    flexGrow: 1,
    alignItems: 'center',
    padding: height * 0.2,
    justifyContent: 'center',
  },
  textStyle:{
    fontSize:18,
    fontFamily: Fonts.Handlee,
  },
  headingStyle:{
    fontSize:20,
    textAlign:'center',
    color:colors.activeSwitch,
    fontFamily: Fonts.Handlee,
    fontWeight:'bold',
    paddingVertical: height * 0.02,
  }
});
export default { Layout, Slider, Pagination, Gradient, Select, Button, Modal };
