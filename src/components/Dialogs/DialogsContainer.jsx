import Dialogs from './Dialogs';
import { sendMessageActionCreator } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';


const mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageActionCreator(newMessageBody));
        }
    };
}

export default compose( //export default DialogsContainer;
    connect(mapStateToProps, mapDispatchToProps), //const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);
    withAuthRedirect //let AuthRedirectComponent = withAuthRedirect(Dialogs);
)(Dialogs);
