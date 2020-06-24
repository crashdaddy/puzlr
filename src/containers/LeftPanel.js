import { connect } from 'react-redux'
    import LeftPanel from '../components/gameBoard/LeftPanel'

    const mapStateToProps = (state) => {
        return {
            player: state.player,
            puzzle: state.puzzle
        }
    }

    export default connect(mapStateToProps)(LeftPanel)