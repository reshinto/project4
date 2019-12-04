import React from "react";
// core components
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardHeader from "./CardHeader.js";
import Quote from "../Typography/Quote.js";

export default function CardQuote() {
  return (
    <Card>
      <CardHeader color="primary">Quote</CardHeader>
      <CardBody>
        <Quote
          text="They call for dates and quinces in the pastry."
          author="Shakespeare, Henry IV Part II: Act 2, Scene 4"
        />
      </CardBody>
    </Card>
  );
}