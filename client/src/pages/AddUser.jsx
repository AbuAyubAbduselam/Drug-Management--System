import { FormRow, SubmitBtn } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useOutletContext } from "react-router-dom";
import { ROLE } from "../../../utils/constant";
import { Form, redirect } from "react-router-dom";
import FormRowSelect from "../components/FormSelect";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/users/admin/app-stats", data);
    toast.success("User added successfully");
    return redirect("../admin");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddUser = () => {
  const { user } = useOutletContext();

  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add pharmacist</h4>
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            labelText="first name"
            defaultValue="Abduselam"
          />
          <FormRow
            type="text"
            labelText="last name"
            name="lastName"
            defaultValue="Idris"
          />
          <FormRow
            type="tel"
            labelText="phone number"
            name="phone"
            defaultValue="092350"
          />
          <FormRow
            type="password"
            labelText="password"
            name="password"
            defaultValue="092350"
          />
          <FormRow
            type="email"
            labelText="email"
            name="email"
            defaultValue="a@gmail.com"
          />
          <FormRowSelect
            name="role"
            labelText="role"
            defaultValue={ROLE.PHARMACIST}
            list={Object.values(ROLE)}
          />

          <SubmitBtn formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};

export default AddUser;
