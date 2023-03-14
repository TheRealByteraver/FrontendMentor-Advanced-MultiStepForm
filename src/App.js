import { useState } from "react";
import OnBoarding from "./Components/OnBoarding";

function App() {
  const onboardingCompleteHandler = (userFormData) => {
    console.log('The user finished filling in the form with the following data: ', userFormData);
  }

  return (
    <div className="App">
      <OnBoarding submitHandler={onboardingCompleteHandler} />
    </div>
  );
}

export default App;
