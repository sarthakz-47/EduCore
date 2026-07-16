import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const RichTextEditor = ({ input, setInput }) => {
  const handelChange = (content) => {
    setInput({ ...input, description: content });
  };
  return (
    <ReactQuill
      theme="snow"
      value={input.description}
      onChange={handelChange}
    />
  );
};
export default RichTextEditor;
