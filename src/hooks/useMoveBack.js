import React from 'react';
import { useNavigation } from 'react-router-dom';

export default function useMoveBack() {
const navigate=useNavigation();
return()=>navigate(-1);
}
