import { connect } from 'react-redux'
    import Profile from '../components/profile/Profile'
    import {addUser, logOff, clearPuzzle, sendMessage} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            player: state.player,
            navTalk: state.navTalk
        }
    }

     // added this function so we can send data FROM our component
     const mapDispatchToProps = (dispatch) => {
        return {
            addUser: (user) => dispatch(addUser(user)),
            logOff: () => dispatch(logOff()),
            sendMessage: (navText) => dispatch(sendMessage(navText)),
            clearPuzzle: () => dispatch(clearPuzzle())
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Profile)