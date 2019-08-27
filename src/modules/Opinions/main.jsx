import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import classNames from 'classnames/bind';
import Popup from 'components/Popup';
import Button from 'components/Button';
import Loader from 'components/Loader';
import ItemOpinion from './components/ItemOpinion/index';
import * as ducks from './ducks';
import * as selectors from './selectors';
import styles from './styles.scss';

const cx = classNames.bind(styles);

class Opinions extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.btnMore = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { opinionsData } = this.props;
    if (opinionsData !== prevProps.opinionsData && this.btnMore.current) {
      this.btnMore.current.scrollIntoView();
    }
  }

  showOpinions = () => {
    this.toggleModal(true);
    this.loadMoreOpinions();
  }

  loadMoreOpinions = () => {
    const {
      getCategories,
      getOpinions,
      modelId,
      page,
      count,
    } = this.props;

    if (!modelId) {
      return getCategories();
    }
    return getOpinions({ page, count, id: modelId });
  }

  toggleModal = (value) => {
    this.setState({ isOpen: value });
  }

  closeModal = () => {
    const { resetOpinions } = this.props;
    this.toggleModal(false);
    resetOpinions();
  }


  renderOpinions = () => {
    const { opinionsData, isFetching, error } = this.props;
    if (error.isError) {
      return error.errMsg;
    }
    const opinions = opinionsData?.data?.map((opinion) => (
      <ItemOpinion key={opinion.id} opinion={opinion} />
    ));
    return (
      <>
        {opinions}

        <div ref={this.btnMore}>
          <Button
            onClick={this.loadMoreOpinions}
            kind="simple"
            disabble={isFetching}
            className={cx({
              hide: opinionsData.lastPage || isFetching,
            })}
          >
            Загрузить еще
          </Button>
        </div>

        {isFetching && <Loader />}
      </>
    );
  }

  render() {
    const { isOpen } = this.state;

    return (
      <div className={cx('opinions')}>
        <Button
          onClick={this.showOpinions}
        >
          Загрузить отзывы
        </Button>
        <Popup
          opened={isOpen}
          onClose={this.closeModal}
        >
          {this.renderOpinions()}
        </Popup>
      </div>
    );
  }
}

Opinions.defaultProps = {
  isFetching: false,
  modelId: null,
  error: {
    isError: false,
    errMsg: '',
  },
};

Opinions.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  opinionsData: PropTypes.shape({
    isFetching: PropTypes.bool,
    isError: PropTypes.bool,
    errMsg: PropTypes.string,
    isLoad: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.object),
    lastPage: PropTypes.bool,
  }).isRequired,
  getCategories: PropTypes.func.isRequired,
  getOpinions: PropTypes.func.isRequired,
  resetOpinions: PropTypes.func.isRequired,
  modelId: PropTypes.string,
  isFetching: PropTypes.bool,
  error: PropTypes.shape({
    isError: PropTypes.bool,
    errMsg: PropTypes.string,
  }),
};

const mapStateToProps = (state) => ({
  page: selectors.page(state),
  count: selectors.count(state),
  opinionsData: selectors.opinionsDataSelector(state),
  modelId: selectors.modelId(state),
  isFetching: selectors.isFetchingSelector(state),
  error: selectors.errorSelector(state),
});
export default compose(
  connect(mapStateToProps, {
    getCategories: ducks.getCategories,
    resetOpinions: ducks.resetOpinions,
    getOpinions: ducks.getOpinions,
  })
)(Opinions);
