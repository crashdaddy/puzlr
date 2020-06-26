import { connect } from 'react-redux'
    import Talker from '../components/Talker'
    
    const mapStateToProps = (state) => {
        return {
            navTalk: state.navTalk
        }
    }
    
    export default connect(mapStateToProps)(Talker)