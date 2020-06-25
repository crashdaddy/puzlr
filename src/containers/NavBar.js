import { connect } from 'react-redux'
    import NavBar from '../components/NavBar'
    import {clearPuzzle} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            player: state.player
        }
    }
    const mapDispatchToProps = (dispatch) => {
        return {
            clearPuzzle: () => dispatch(clearPuzzle())
        }
    }
    

    export default connect(mapStateToProps,mapDispatchToProps)(NavBar)