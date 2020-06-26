import { connect } from 'react-redux'
    import NavBar from '../components/NavBar'
    import {clearPuzzle, sendMessage} from '../redux/actions'
    
    const mapStateToProps = (state) => {
        return {
            player: state.player,
            navTalk: state.navTalk
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            clearPuzzle: () => dispatch(clearPuzzle()),
            sendMessage: (navText) => dispatch(sendMessage(navText))
        }
    }
    

    export default connect(mapStateToProps,mapDispatchToProps)(NavBar)