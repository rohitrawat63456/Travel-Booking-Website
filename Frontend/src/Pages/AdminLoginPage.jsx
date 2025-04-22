import { useParams, redirect } from "react-router-dom";
import { toast} from "react-toastify";
import axios from "axios";
import { LoginSignUpFrom } from "../Components/CommonComponents/LoginSignUpForm";
export const AdminLoginPage = () => {
  const {activity} = useParams();
  return (
    <LoginSignUpFrom activity={activity} isUser={false}/>
  );
};
export const postAdminLoginAction = async ({request}) => {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    console.log("Post Login called for this ", userData);
    const response = await axios.post( "http://localhost:8000/admin/login", userData, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    const result = response.data;
    if (result.success) {
      console.log("login result", response.data);
      toast.success("Login successful!");
      return redirect("/admin/home");
    } else {
      toast.error(result.message);
    }
  } catch (error) {
    console.log("error in post login action", error);
    toast.error(error.message);
  }
};

export const postAdminRegisterAction = async ({request}) => {
  try {
    const formData = await request.formData();
    const userData = Object.fromEntries(formData);
    const response = await fetch(
      "http://localhost:8000/admin/register",
      {
        method: "POST",
        withCredentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }
    );
    const result = await response.json();
    console.log(result.success);
    console.log(response.cookies);
    if (result.success) {
      toast.success("Register successful!");
      return redirect("/admin/login");
    } else {
      toast.error("Login Failed");
    }
  } catch (error) {
    console.log("error in post register action", error);
    toast.error("some error occured");
  }
};
