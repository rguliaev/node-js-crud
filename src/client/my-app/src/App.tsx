import React, {useEffect, useState} from 'react';
import './App.css';
import {list} from "./endpoints/endoints";
import {User} from "./user/UserEditor";
import {Users} from "./user/Users";


export default function App() {
  return (
    <div className="App">
      <Users/>
    </div>
  );
}