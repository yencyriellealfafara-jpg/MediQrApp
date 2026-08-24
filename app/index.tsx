/*
  What: App index route component.
  Which: Redirects the root path to the default login route for citizens.
  Why: Keeps the root URL simple and ensures users land on the intended entry screen.
  How: Uses expo-router's Redirect component to perform a client-side redirect to /login/citizen.
*/
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/login/citizen" />;
}