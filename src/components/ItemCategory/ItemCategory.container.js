import { connect } from 'react-redux';
import { ItemCategory } from './ItemCategory'

const mapToState = state => ({
  keySearchProduct: state.keySearchProduct,
});

export const ItemCategoryContainer = connect(
  mapToState,
  null,
)(ItemCategory);