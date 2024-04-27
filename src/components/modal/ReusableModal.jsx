import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

const ReusableModal = ({ open, onClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div>
          {children}
        </div>
      </Fade>
    </Modal>
  );
};

export default ReusableModal;