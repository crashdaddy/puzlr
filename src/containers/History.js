import { connect } from 'react-redux'
    import History from '../components/profile/History'
    import {addUser, addPuzzle, sendMessage, clearPuzzle} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            player: state.player,
            puzzle: state.puzzle,
            navTalk: state.navTalk
        }
    }

     // added this function so we can send data FROM our component
     const mapDispatchToProps = (dispatch) => {
        return {
            addUser: (user) => dispatch(addUser(user)),
            addPuzzle: (puzzle) => dispatch(addPuzzle(puzzle)),
            clearPuzzle: () => dispatch(clearPuzzle()),
            sendMessage: (navText) => dispatch(sendMessage(navText))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(History)