import { connect } from 'react-redux'
    import LeftPanel from '../components/gameBoard/LeftPanel'
    import {sendMessage} from '../redux/actions'
    const mapStateToProps = (state) => {
        return {
            player: state.player,
            puzzle: state.puzzle,
            navTalk: state.navTalk
        }
    }

    const mapDispatchToProps = (dispatch) => {
        return {
            sendMessage: (navText) => dispatch(sendMessage(navText))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(LeftPanel)