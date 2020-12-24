import React from 'react';
import {Route} from 'react-router-dom';
import CollectionsOverview from '../../components/collections-overview/collections-overview.jsx';
import CollectionPage from '../collection/collection';
import WithSpinner from '../../components/with-spinner/with-spinner'
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectIsFetching, selectIsCollectionFetched} from '../../redux/shop/shop.selectors';
import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    
    componentDidMount(){
        const {fetchCollectionsStartAsync} = this.props;
        fetchCollectionsStartAsync()
    }   

    render(){
        const {match, isFetching, isCollectionFetched} = this.props;
    return (
        <div>
            <Route 
            exact 
            path={`${match.path}`} 
            render={props => (
                <CollectionsOverviewWithSpinner isLoading={isFetching} {...props} />
            )} />

            <Route 
            path={`${match.path}/:collectionId`} 
            render={props => (
                <CollectionPageWithSpinner isLoading={!isCollectionFetched} {...props}/>
            )}
            />
        </div>
        )
}
}

const mapStateToProps = createStructuredSelector({
    isFetching: selectIsFetching,
    isCollectionFetched :selectIsCollectionFetched
})

const mapDispatchToProps = dispatch => ({
   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
});

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);