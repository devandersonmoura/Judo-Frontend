import { RegistrationPage } from './form/RegistrationPage.jsx';
import { OptionsProvider } from './options/OptionsContext.jsx';
import { ProfessorPage } from './professor/ProfessorPage.jsx';

export function App() {
  const isProfessor = window.location.pathname.startsWith('/professor');
  return <OptionsProvider>{isProfessor ? <ProfessorPage /> : <RegistrationPage />}</OptionsProvider>;
}
