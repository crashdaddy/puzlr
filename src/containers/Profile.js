import { connect } from 'react-redux'
    import Profile from '../components/profile/Profile'
    import {addUser, addPuzzle, sendMessage} from '../redux/actions'

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
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Profile)