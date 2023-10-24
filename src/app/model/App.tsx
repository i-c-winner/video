
import { useSelector } from 'react-redux';
import { Loginin } from '../../page/model/Loginin';
import { useState } from 'react';
import { IConfig } from '../index';
function App() {
const loginin=useSelector((state: {config: IConfig})=>state.config.conference)

console.log(loginin)
    return !false? <Loginin />: <p>ddsf</p>

   }

export { App };
