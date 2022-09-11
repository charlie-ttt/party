import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../../src/Link";
import type { NextPage } from "next";
import NoAuth from "../../src/components/NoAuth";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";

const CreateParty: NextPage = () => {
  const { user } = useUser();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [inputs, setInputs] = useState<{
    name: string;
    capacity: string;
  }>({
    name: "",
    capacity: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const rawResponse = await fetch("/api/parties/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: inputs.name, capacity: +inputs.capacity }),
    });
    const { data, error } = await rawResponse.json();
    if (error) {
      setErrorMessage(error);
    }
    if (data) {
      alert("Party created successfully");
      setErrorMessage("");
      setInputs({ name: "", capacity: "" });
    }
  };

  if (!user) return <NoAuth />;

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button component={Link} noLinkStyle href="/parties">
          See All Parties
        </Button>
      </Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Create Party
        <form onSubmit={handleSubmit}>
          <Box>
            <TextField
              required
              name="name"
              value={inputs.name}
              label="Party Name"
              placeholder="Demo Name"
              onChange={handleChange}
            />
          </Box>
          <Box>
            <TextField
              required
              name="capacity"
              value={inputs.capacity}
              onChange={handleChange}
              defaultValue={1}
              label="Capacity (people)"
              placeholder="only number is allowed"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" type="submit">
              Create
            </Button>
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreateParty;
