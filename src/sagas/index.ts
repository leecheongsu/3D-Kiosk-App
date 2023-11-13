import { all, fork } from 'redux-saga/effects';

import globalSaga from './global';
import musicSaga from './music';
import chatSaga from './chat';
import exhibitionSaga from './exhibition';
import collectionSaga from './collection';
import roomSaga from './room';
import menuSaga from './menu';
import layerSaga from './layer';

export default function* rootSaga() {
  yield all([
    fork(globalSaga),
    fork(musicSaga),
    fork(chatSaga),
    fork(exhibitionSaga),
    fork(collectionSaga),
    fork(roomSaga),
    fork(menuSaga),
    fork(layerSaga),
  ]);
}
