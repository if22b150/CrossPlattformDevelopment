import {createContext, useState} from 'react';
import {AstronautModel} from "../models/astronaut.model";
import axios from "axios";
import LoggerService from "../services/LoggerService";

export const AstronautContext = createContext<AstronautContextType | null>(null);

const AstronautProvider = (props: AstronautProviderProps) => {
    const {children, initialValue} = props;
    const [astronauts, setAstronauts] = useState(initialValue);
    const [loading, setLoading] = useState(true);

    const fetchAstronauts = (): void => {
        setLoading(true);
        axios.get(
            "http://api.open-notify.org/astros.json"
        )
            .then((res) => {
                setAstronauts(res.data.people);
            })
            .catch((error) => {
                console.error("Error fetching astronauts:", error);
                LoggerService.error(error)
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (<AstronautContext.Provider value={{astronauts, loading, fetchAstronauts}}>
        {children}
    </AstronautContext.Provider>);
}

export default AstronautProvider;

export type AstronautContextType = {
    astronauts?: AstronautModel[];
    fetchAstronauts: () => void;
    loading: boolean;
}

type AstronautProviderProps = {
    children: JSX.Element;
    initialValue: AstronautModel[] | undefined;
}
