import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "../../src/Link";

const NoAuth = () => {
  return (
    <Container maxWidth="lg">
      Please log in first
      <>
        <Button variant="contained" component={Link} noLinkStyle href="/login">
          Log In
        </Button>
      </>
    </Container>
  );
};

export default NoAuth;
