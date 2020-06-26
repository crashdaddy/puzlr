import { connect } from 'react-redux'
    import Favorites from '../components/favorites/Favorites'
    import {sendMessage} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            player: state.player,
            navTalk: state.navTalk
        }
    }

     // added this function so we can send data FROM our component
     const mapDispatchToProps = (dispatch) => {
        return {
            sendMessage: (navText) => dispatch(sendMessage(navText))            
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Favorites)