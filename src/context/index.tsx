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
