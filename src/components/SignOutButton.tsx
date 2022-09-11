import Button from "@mui/material/Button";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const SignOut = () => {
  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) console.log(error);
  };
  return <Button onClick={() => handleSignOut()}>Sign Out</Button>;
};

export default SignOut;
