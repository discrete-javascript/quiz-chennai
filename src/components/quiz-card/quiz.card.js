import React, { PureComponent } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardFooter,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { FormGroup, Label, Input } from "reactstrap";

class QuizCard extends PureComponent {
  renderAnswers = () => {
    const { answers } = this.props;
    return (
      <FormGroup tag="fieldset">
        <legend>Answers</legend>
        {!!answers.length &&
          answers.map((i) => (
            <FormGroup check>
              <Label check>
                <Input type="radio" name="radio1" /> {i.answer}
              </Label>
            </FormGroup>
          ))}
      </FormGroup>
    );
  };
  render() {
    const { questionSerialNo, question, answers } = this.props;
    return (
      <Card>
        {/* <CardHeader>Question number: {questionSerialNo}</CardHeader> */}
        <CardBody>
          <CardTitle>{question}</CardTitle>
          <CardText>{this.renderAnswers()}</CardText>
          {/* <Button>Go somewhere</Button> */}
        </CardBody>
        {/* <CardFooter>Footer</CardFooter> */}
      </Card>
    );
  }
}

export default QuizCard;
