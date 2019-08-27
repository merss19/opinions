import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from '../styles.scss';

const cx = classNames.bind(styles);

export default class Overlay extends React.PureComponent {
  handleContainerClick = (event) => {
    const { onClose } = this.props;
    if (event.target === event.currentTarget) onClose();
  };

  render() {
    const { children, isOpen, className } = this.props;
    return isOpen ? (
      <div className={cx('overlay', className)} onClick={this.handleContainerClick} role="presentation">
        {children}
      </div>
    ) : null;
  }
}

Overlay.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Overlay.defaultProps = {
  isOpen: false,
  className: '',
};
