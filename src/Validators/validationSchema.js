import * as Yup from "yup";

export const taskSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  priority: Yup.string().oneOf(["Low", "Medium", "High"], "Invalid priority"),
  state: Yup.string().oneOf(["todo", "doing", "done"], "Invalid state"),
  image: Yup.mixed().nullable(),
});
