import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const paperStyle = {
  backgroundColor: "white",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  padding: "16px",
};

const ReusableModal = ({ open, onClose, title, children }) => {
  return (
    <Modal
      style={modalStyle}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div style={paperStyle}>
          <h2>{title}</h2>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default ReusableModal;
