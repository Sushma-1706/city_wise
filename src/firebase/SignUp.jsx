import { signUpCitizen, signUpOfficial } from "../firebase/auth";

function SignUpForm() {
  const handleCitizenSignUp = () => {
    signUpCitizen("user@example.com", "password123", "Sushma");
  };

  const handleOfficialSignUp = () => {
    signUpOfficial("govuser@gov.in", "password123", "Officer Name");
  };

  return (
    <div>
      <button onClick={handleCitizenSignUp}>Sign Up as Citizen</button>
      <button onClick={handleOfficialSignUp}>Sign Up as Official</button>
    </div>
  );
}
