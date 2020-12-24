import {createSelector} from 'reselect';

export const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsPreview = createSelector(
    [selectShopCollections],
    collections => collections? Object.keys(collections).map(key => collections[key]) : []
);

export const selectCollection = collectionUrlParam =>
    createSelector(
        [selectShopCollections],
        collections => collections? collections[collectionUrlParam] : []
);

export const selectIsFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionFetched = createSelector(
    [selectShop],
    shop => !!shop.collections
);