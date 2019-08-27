import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './styles.scss';
import Overlay from './Overlay/index';

const cx = classNames.bind(styles);

const Popup = ({
  children,
  opened,
  onClose,
  className,
}) => (
  <Overlay isOpen={opened} onClose={onClose} className={cx('overlay')}>
    <div className={cx('wrap')}>
      <button className={cx('cross')} onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 32 30">
          <g fill="none" fillRule="evenodd" stroke="currentColor" vectorEffect="non-scaling-stroke">
            <path d="M1 0l30 30L1 0zM31 0L1 30 31 0z" />
          </g>
        </svg>
      </button>
      <div className={cx('block', className)}>
        <div className={cx('content')}>{children}</div>
      </div>
    </div>
  </Overlay>
);


Popup.propTypes = {
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
};
Popup.defaultProps = {
  className: '',
};
export default Popup;
