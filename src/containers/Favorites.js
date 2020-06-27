import { connect } from 'react-redux'
    import Favorites from '../components/favorites/Favorites'
    import {sendMessage, clearPuzzle} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            player: state.player,
            navTalk: state.navTalk,
            puzzle: state.puzzle
        }
    }

     // added this function so we can send data FROM our component
     const mapDispatchToProps = (dispatch) => {
        return {
            sendMessage: (navText) => dispatch(sendMessage(navText)),
            clearPuzzle: () => dispatch(clearPuzzle())
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Favorites)