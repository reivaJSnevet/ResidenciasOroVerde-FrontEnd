import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Sort } from "@mui/icons-material";
import CommentCards from "./CommentCards";
import PostComment from "./PostComment";
import sortByDate from "./services/sortByDate";

const Comments = ({ user, comments, propertyId, refresh, setRefresh }) => {
  const [openAccordion, setOpenAccordion] = useState(0);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleSort = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [sortedComments, setSortedComments] = useState([]);

  // Actualizar sortedComments cuando comments cambie
  useEffect(() => {
    setSortedComments(comments);
  }, [comments]);

  const handleOpen = (value) =>
    setOpenAccordion(openAccordion === value ? 1 : value);

  const sortAsc = () => setSortedComments(sortByDate([...comments], "asc"));
  const sortDesc = () => setSortedComments(sortByDate([...comments], "desc"));

  return (
    <>
      <Accordion open={openAccordion === 1}>
        <AccordionHeader
          className="flex items-center justify-between p-2 transition duration-300 rounded-md cursor-pointer md:p-4 hover:bg-gray-200"
          onClick={() => handleOpen(0)}
        >
         {
              openAccordion === 1
              ? <h3 className="text-lg font-semibold text-gray-800">Ocultar comentarios</h3>
              : <h3 className="text-lg font-semibold text-gray-800">Ver comentarios</h3>
         }
        </AccordionHeader>
        <AccordionBody>
          <section className="w-full p-6 bg-white rounded-md shadow-md">
            <div className="flex flex-wrap items-center justify-between mb-4">
              <h3 className="pr-2 mb-4 text-base font-semibold text-gray-800 md:text-lg lg:text-xl"
                onClick={() => handleOpen(0)}
              >
                Comentarios
              </h3>
              <div className="flex items-center justify-end mb-4">
                <span className="text-sm font-semibold text-gray-800 md:text-base lg:text-lg">
                  Ordenar por
                </span>
                <Button
                  aria-controls="sort-menu"
                  aria-haspopup="true"
                  onClick={handleSort}
                  className="p-1 ml-2"
                  sx={{
                    backgroundColor: "(255, 255, 255, 0.1)",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "(255, 255, 255, 0.2)",
                    },
                    "&:focus": {
                      backgroundColor: "(255, 255, 255, 0.1)",
                    },
                    transition: "none", // Desactivar animación
                    "& .MuiTouchRipple-root": {
                      display: "none", // Desactivar el efecto ripple
                    },
                  }}
                >
                  <Sort className="text-gray-800" />
                </Button>
                <Menu
                  id="sort-menu"
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleClose}
                  className="w-40 mt-4"
                >
                  <MenuItem onClick={sortAsc}>Más antiguos</MenuItem>
                  <MenuItem onClick={sortDesc}>Más recientes</MenuItem>
                </Menu>
              </div>
            </div>

            {comments.length === 0 && (
              <div className="text-center">
                <p className="text-gray-500">No hay comentarios</p>
                <p className="text-gray-500">
                  Sé el primero en comentar tu experiencia
                </p>
              </div>
            )}
            <CommentCards comments={sortedComments} className="mb-4" />
          </section>
        </AccordionBody>
      </Accordion>
      <PostComment
        user={user}
        propertyId={propertyId}
        refresh={refresh}
        setRefresh={setRefresh}
        className="mt-6"
      />
    </>
  );
};

export default Comments;
