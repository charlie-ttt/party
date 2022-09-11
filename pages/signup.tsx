import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const About: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [inputs, setInputs] = React.useState<{
    email: string;
    password: string;
    password_confirmation: string;
  }>({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { password, password_confirmation } = inputs;
    if (password !== password_confirmation) {
      setErrorMessage("รหัสผ่านไม่ตรงกัน");
      return;
    }
    const { user, error } = await supabaseClient.auth.signUp({
      email: inputs.email,
      password: inputs.password,
    });
    if (error) setErrorMessage(error.message);
    if (user) router.push("/login");
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          สร้างบัญชีผู้ใช้
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              mt: 4,
            }}
          >
            <Box>
              <TextField
                required
                name="email"
                value={inputs.email}
                label="อีเมล"
                placeholder="demo@email.com"
                autoComplete="username"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <TextField
                required
                name="password"
                value={inputs.password}
                label="รหัสผ่าน"
                type="password"
                placeholder="*****"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <TextField
                required
                name="password_confirmation"
                value={inputs.password_confirmation}
                label="ยืนยันรหัสผ่าน"
                type="password"
                placeholder="*****"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <FormControlLabel
                control={<Checkbox required />}
                label="ฉันยอมรับเงื่อนไข"
                labelPlacement="end"
              />
            </Box>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <Button variant="contained" size="medium" type="submit">
              ยืนยัน
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default About;
