import { Component, createContext, ReactNode} from 'react';
import { ContextProps, handleContext } from '../react-app-env';

export const ContextPersistKey = 'context'

const initialState:ContextProps = {
    handleContext: () => {},
}

const StoreContext = createContext<ContextProps>(initialState);


interface Props { 
    children?:ReactNode
}

class StoreProvider extends Component<Props>{

    state = {};
      
    handleContext:handleContext = (key,value,callback) => {
        this.setState(
            { [key] : value }, 
            () => {
                if(callback)
                callback()
                // Persist the state with localstorage
                localStorage.setItem(ContextPersistKey,JSON.stringify(this.state))
            }
        );
    }

    componentDidMount(){
        const ctx = localStorage.getItem(ContextPersistKey)
        
        if(ctx){
            this.setState(JSON.parse(ctx))
        }

        const params = new URLSearchParams(window.location.search)

        const token = params.get('token')
        const resetToken = params.get('reset')

        if(token){
            // authenticate the token and check if its valid
            // Async Function

            // if the token is valid, then save token
            localStorage.setItem('token',token)
            this.handleContext(
                'token',
                token, 
                () => {
                    //redirect the user to homepage
                    window.location.assign('/home')
                } 
            )

            
        }else if(resetToken){
            // if the token is valid, then save token
            localStorage.setItem('token',resetToken)
            this.handleContext(
                'token',
                resetToken, 
                () => {
                    //redirect the user to reset password page
                    window.location.assign('/reset-password')
                } 
            )
        }

    }

    logout = (callback?:()=>void) => {
        this.setState({},() =>{ if(callback)callback() })
    }

    render(){
        return(
            <StoreContext.Provider 
                    value = {{
                        ...this.state,
                        handleContext: this.handleContext,
                    }}
                >
                {this.props.children}
            </StoreContext.Provider>
        )
    }
} 

export { StoreContext,StoreProvider }
