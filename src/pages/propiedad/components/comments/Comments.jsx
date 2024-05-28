import { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import CommentCards from "./CommentCards";
import PostComment from "./PostComment";

const Comments = ({ user, comments, propertyId }) => {
  const [open, setOpen] = useState(0);
  const handleOpen = (value) => setOpen(open === value ? 1 : value);

  return (
    <div className="p-6 rounded-md shadow-lg bg-gray-50">
      <Accordion open={open === 1}>
        <AccordionHeader
          className="flex items-center justify-between p-4 transition duration-300 rounded-md cursor-pointer hover:bg-gray-200"
          onClick={() => handleOpen(0)}
        >
          Ver comentarios
        </AccordionHeader>
        <AccordionBody>
          <section className="w-full p-6 bg-white rounded-md shadow-md">
            {/* <div className="p-4 overflow-y-auto bg-white rounded-md shadow-md max-h-96"> */}
              <CommentCards comments={comments} className="mb-4" />
           {/*  </div> */}
          </section>
        </AccordionBody>
      </Accordion>
      <PostComment user={user} propertyId={propertyId} className="mt-6" />
    </div>
  );
};

export default Comments;
