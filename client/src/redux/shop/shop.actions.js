import {shopActionTypes} from './shop.types';
import {firestore,convertCollectionsToMap} from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionsSuccess = (collections) => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collections
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: errorMessage
});

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionsStart());
        collectionRef.get().then(snapshot => {
            const collectionsMap=  convertCollectionsToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap));
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
};