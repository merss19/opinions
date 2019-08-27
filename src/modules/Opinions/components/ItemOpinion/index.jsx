import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './styles.scss';

const cx = classNames.bind(styles);

const ItemOpinion = ({ opinion }) => (
  <div key={opinion.id} className={cx('opinion')}>
    <div>{ opinion.author.name }</div>
    <div>{ opinion.text }</div>
  </div>
);

ItemOpinion.propTypes = {
  opinion: PropTypes.shape({
    id: PropTypes.number,
    author: PropTypes.object,
    text: PropTypes.string,
  }).isRequired,
};

export default ItemOpinion;
