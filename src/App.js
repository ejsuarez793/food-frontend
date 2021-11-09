import { 
  IonApp,
  IonToolbar,
  IonButton, 
  IonHeader, 
  IonIcon, 
  IonTitle, 
  IonToast, 
  IonContent,
  IonGrid, IonRow, IonCol
} from '@ionic/react';
import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import { play as playIcon } from 'ionicons/icons';

import { Recommendations } from './components/recommendations';

function App() {
  return (
    <IonApp>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Food Frontend </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
          <Recommendations />
      </IonContent>
    </IonApp>
  );
}

export default App;
