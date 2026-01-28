import {useContext} from 'react';
import { AuthContext } from './AuthContext';

export default function Home() {
  const { user } = useContext(AuthContext);
    return (
        <div>
            <h2>Home</h2>
            <p>Id: {user?.id}</p>
            <p>Opening Balance: {user?.opbal}</p>
        </div>
    );
}