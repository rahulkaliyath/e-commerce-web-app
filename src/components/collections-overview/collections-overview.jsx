import React from 'react';
import './collections-overview.styles.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview.jsx';
import {selectCollectionspreview} from '../../redux/shop/shop.selectors';


const CollectionsOverview = ({collections})=> (
    <div className='collections-overview'>
        {collections.map(({id,...otherprops}) => (
            <CollectionPreview  key ={id} {...otherprops} />
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections:  selectCollectionspreview
});

export default connect(mapStateToProps)(CollectionsOverview);