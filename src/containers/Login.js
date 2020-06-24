import { connect } from 'react-redux'
    import Login from '../components/login/Login'
    import {addUser, addPuzzle} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            player: state.player,
            puzzle: state.puzzle
        }
    }

     // added this function so we can send data FROM our component
     const mapDispatchToProps = (dispatch) => {
        return {
            addUser: (user) => dispatch(addUser(user)),
            addPuzzle: (puzzle) => dispatch(addPuzzle(puzzle))
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(Login)