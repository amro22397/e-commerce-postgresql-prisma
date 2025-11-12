import { getCurrentUser } from "@/actions/getCurrentUser";
import Container from "../../components/Container";
import FormWrap from "../../components/FormWrap";
import CheckoutClient from "./CheckoutClient";

const Checkout = async () => {

  const currentUser = await getCurrentUser();

  return (
    <div className="p-8 max-md:px-0 md:px-2 lg:px-8">
      {/* <pre className="">{JSON.stringify(currentUser, null, 2)}</pre> */}
      <Container>
        <FormWrap>
          <CheckoutClient user={currentUser?.user} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default Checkout;
