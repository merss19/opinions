import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import styles from './styles.scss';

const cx = classNames.bind(styles);

export default class Button extends React.PureComponent {
  render() {
    const {
      className,
      children,
      disabled,
      onClick,
      type,
      kind,
    } = this.props;

    const elClassName = cx('button', className, kind);

    return (
      <div>
        <button
          disabled={disabled}
          className={elClassName}
          onClick={onClick}
          type={type}
        >
          <span>
            {children}
          </span>
        </button>
      </div>
    );
  }
}

Button.defaultProps = {
  children: 'Загрузить',
  type: 'button',
  className: '',
  kind: 'primary',
  disabled: false,
};

Button.propTypes = {
  className: PropTypes.oneOfType([ PropTypes.string, PropTypes.array ]),
  children: PropTypes.node,
  type: PropTypes.oneOf([ 'submit', 'button', 'reset' ]),
  kind: PropTypes.oneOf([ 'simple', 'primary' ]),
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};
