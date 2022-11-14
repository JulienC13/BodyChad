import {
  IonContent,
  IonPage,
} from "@ionic/react";
import MonApp from "../components/MonApp";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <MonApp />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
