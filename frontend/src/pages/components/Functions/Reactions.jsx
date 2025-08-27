import React from "react";
import { useSubmit } from "react-router-dom";

const Reactions = ({actionType, content, id}) => {
  const submit = useSubmit();
  const formData = new FormData();
    formData.append("actionType", "revibe");
    formData.append("content", "");
    formData.append("id", id);
    submit(formData, { method: "POST" });
};

export default Reactions;
