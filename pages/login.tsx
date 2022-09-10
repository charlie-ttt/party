import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../src/Link";
import type { NextPage } from "next";
import TextField from "@mui/material/TextField";

const About: NextPage = () => {
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
    console.log(inputs);
    event.preventDefault();
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
          <Button type="submit">เข้าสู่ระบบ</Button>
          {/* <Button variant="contained" component={Link} noLinkStyle href="/signup">
          สร้างบัญชีผู้ใช้
        </Button> */}
        </form>
      </Box>
    </Container>
  );
};

export default About;
