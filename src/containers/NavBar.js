import { connect } from 'react-redux'
    import NavBar from '../components/NavBar'

    const mapStateToProps = (state) => {
        return {
            player: state.player
        }
    }

    export default connect(mapStateToProps)(NavBar)