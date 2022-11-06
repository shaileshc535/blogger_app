import React from "react";
import styles from "./Modal.module.css";
import { Typography, Grid, Button } from "@mui/material";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <Grid className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <Grid className={styles.centered}>
        <Grid className={styles.modal}>
          <Grid className={styles.modalHeader}>
            <Typography variant="h5" className={styles.heading}>
              Dialog
            </Typography>
          </Grid>

          <Grid className={styles.modalContent}>
            Are you sure you want to Close the item?
          </Grid>
          <Grid className={styles.modalActions}>
            <Grid className={styles.actionsContainer}>
              <Button
                className={styles.deleteBtn}
                onClick={() => setIsOpen(false)}
              >
                Close
              </Button>
              <Button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Modal;
