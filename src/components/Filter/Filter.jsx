import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { updateFilter } from '../../redux/contacts/slice';
import { getFilter } from '../../redux/contacts/selectors';
import css from './Filter.module.css';

function Filter() {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const changeFieldFilter = e => dispatch(updateFilter(e.currentTarget.value));

  return (
    <label className={css.label}>
      <p className={css.text}>Find contacts by name</p>
      <input
        className={css.input}
        type="text"
        value={filter}
        onChange={changeFieldFilter}
      />
    </label>
  );
}

Filter.prototype = {
  filter: PropTypes.string.isRequired,
  updateFilter: PropTypes.func.isRequired,
};

export default Filter;
