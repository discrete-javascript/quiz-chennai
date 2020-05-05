import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BasicButtonGroup(props) {
  const classes = useStyles();
  const [disabledPrevious, setDisabledPrevious] = useState(false);
  const [disabledNext, setDisabledNext] = useState(false);

  const handlePrevious = (e) => {
    let currentPage = props.currentPage;
    if (props.currentPage === 1) {
      setDisabledPrevious(true);
      setDisabledNext(false);
    } else {
      setDisabledNext(false);
      setDisabledPrevious(false);
      props.paginationRef.current.handleClick(--currentPage, e);
    }
  };
  const handleNext = (e) => {
    let currentPage = props.currentPage;
    if (props.currentPage === props.pageLength) {
      setDisabledNext(true);
      setDisabledPrevious(false);
    } else {
      setDisabledNext(false);
      setDisabledPrevious(false);
      props.paginationRef.current.handleClick(++currentPage, e);
    }
  };

  return (
    <div className={classes.root}>
      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        <Button disabled={disabledPrevious} onClick={handlePrevious}>
          Previous
        </Button>
        <Button disabled={disabledNext} onClick={handleNext}>
          Next
        </Button>
      </ButtonGroup>
    </div>
  );
}
