import { createContext} from "react";
import { initial } from "./data";

export const initialRows = initial

export const dataReducer = (state, action) => {
    switch(action.type) {
        case "delete":
            return (
                 state.filter((row) => 
                    row.id !== action.id)
            )
        
        case "modify":
            return(
                state.map((row) => {
                    if(row.id === action.id){
                        row.email = action.email === ''? row.email :  action.email;
                        row.role = action.role === '' ? row.role: action.role;
                        row.name = action.name === '' ? row.name : action.name
                    }
                    return row
                })
            )
        case "delete selected":
            return (
                state.filter((row) => {
                    if (action.start <= row.id <= action.end) {
                        return false
                    }
                    return true
                })
            )
        default:
            return state;
    }
}

export const Context = createContext()
