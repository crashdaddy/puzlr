import { connect } from 'react-redux';
    import LandingPage from '../components/LandingPage/LandingPage'
    import {sendMessage} from '../redux/actions'

    const mapStateToProps = (state) => {
        return {
            navTalk: state.navTalk
        }
    }
 
     // added this function so we can send data FROM our component
     const mapDispatchToProps = (dispatch) => {
        return {
            sendMessage: (navText) => dispatch(sendMessage(navText))            
        }
    }

    export default connect(mapStateToProps,mapDispatchToProps)(LandingPage)