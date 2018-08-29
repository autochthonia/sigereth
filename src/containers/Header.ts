import HeaderView from 'organisms/Header';
import { compose } from 'recompose';
import { withRouter, WithRouter } from 'found';
import { WithAuthStatus, WithActions } from 'store/HoC';

const HeaderContainer = compose<WithRouter & WithAuthStatus, {}>(
  withRouter,
  WithAuthStatus,
  WithActions(['logout']),
)(HeaderView);

export default HeaderContainer;
