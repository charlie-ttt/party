import * as React from "react";

import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../src/Link";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";

const About: NextPage = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [inputs, setInputs] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { user, error } = await supabaseClient.auth.signIn({
      email: inputs.email,
      password: inputs.password,
    });
    if (error) setErrorMessage(error.message);
    if (user) router.push("/parties");
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
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Button variant="contained" type="submit">
                เข้าสู่ระบบ
              </Button>
              <Button
                variant="contained"
                component={Link}
                noLinkStyle
                href="/signup"
              >
                สร้างบัญชีผู้ใช้
              </Button>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default About;
