import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Img from './image.svg';
import styles from './styles.scss';

const cx = classNames.bind(styles);

export default class Loader extends React.PureComponent {
  render() {
    const { size, className } = this.props;

    return (
      <div className={cx('component', className)}>
        <Img
          width={size}
          height={size}
          className={cx('image')}
        />
      </div>
    );
  }
}


Loader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
};

Loader.defaultProps = {
  size: '48',
  className: '',
};
